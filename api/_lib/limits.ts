/**
 * Abuse limits for the public site chat. The site is open to anyone, so every request is checked
 * here before it can cost an OpenRouter call. The hard backstop is the monthly credit limit on the
 * OpenRouter key itself (set when the key is made); these limits keep one visitor or bot from
 * using that budget up.
 */

export const LIMITS = {
  /** Longest visitor message, in characters. */
  maxMessageChars: 800,
  /** Longest earlier answer the browser may send back as history. */
  maxAnswerChars: 4000,
  /** Visitor questions per conversation before we ask them to start a new chat. */
  maxQuestionsPerChat: 12,
  /** Messages sent to the model: the newest few turns only. */
  historyForModel: 10,
  /** Biggest request body we read, in bytes. */
  maxBodyBytes: 24_000,
  /** Longest answer from the model, in tokens (about 350 words). */
  maxOutputTokens: 500,
  /** Per visitor (IP address): questions per 5 minutes and per day. */
  perIpBurst: { max: 15, windowMs: 5 * 60_000 },
  perIpDay: { max: 80, windowMs: 24 * 60 * 60_000 },
} as const;

export type ChatTurn = { role: "user" | "assistant"; content: string };
export type ParsedChat = { messages: ChatTurn[]; page: string | null };
export type ParseResult = { ok: true; value: ParsedChat } | { ok: false; status: number; error: string };

const PAGE = /^\/[a-z0-9\-/]{0,100}$/i;

/** Checks the browser's request body and returns the conversation to send on. */
export function parseChatBody(raw: unknown): ParseResult {
  const bad = (error: string, status = 400): ParseResult => ({ ok: false, status, error });
  if (!raw || typeof raw !== "object") return bad("Send a message to start.");
  const body = raw as { messages?: unknown; page?: unknown };
  if (!Array.isArray(body.messages) || body.messages.length === 0) return bad("Send a message to start.");
  if (body.messages.length > LIMITS.maxQuestionsPerChat * 2) return bad(TOO_LONG, 429);

  const messages: ChatTurn[] = [];
  for (const m of body.messages) {
    if (!m || typeof m !== "object") return bad("That message couldn't be read.");
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return bad("That message couldn't be read.");
    const text = content.trim();
    if (!text) continue;
    const max = role === "user" ? LIMITS.maxMessageChars : LIMITS.maxAnswerChars;
    if (text.length > max) return bad(role === "user" ? `Please keep messages under ${LIMITS.maxMessageChars} characters.` : "That conversation couldn't be read.");
    messages.push({ role, content: text });
  }
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") return bad("Send a message to start.");
  if (messages.filter((m) => m.role === "user").length > LIMITS.maxQuestionsPerChat) return bad(TOO_LONG, 429);

  const page = typeof body.page === "string" && PAGE.test(body.page) ? body.page : null;
  return { ok: true, value: { messages: messages.slice(-LIMITS.historyForModel), page } };
}

export const TOO_LONG = "This chat has reached its limit. Start a new chat, or email support@ottopay.pro.";
export const SLOW_DOWN = "You're sending messages quickly. Please wait a few minutes, or email support@ottopay.pro.";

/**
 * Sliding-window counter kept in memory. It is per server instance, so it is a best-effort brake
 * rather than an exact count; that is enough to stop one visitor or a simple bot from hammering it.
 */
export class RateLimiter {
  private hits = new Map<string, number[]>();
  constructor(private readonly maxKeys = 5000) {}

  /** Records a hit for `key` and says whether it is within every limit given. */
  allow(key: string, limits: readonly { max: number; windowMs: number }[], now = Date.now()): boolean {
    const longest = Math.max(...limits.map((l) => l.windowMs));
    const times = (this.hits.get(key) ?? []).filter((t) => now - t < longest);
    const over = limits.some((l) => times.filter((t) => now - t < l.windowMs).length >= l.max);
    if (!over) times.push(now);
    this.hits.delete(key);
    this.hits.set(key, times);
    if (this.hits.size > this.maxKeys) this.hits.delete(this.hits.keys().next().value as string);
    return !over;
  }
}

/** Addresses the chat answers. Anything else (other sites, scripts with no Origin) is refused. */
export function originAllowed(origin: string | null, extra: string | undefined): boolean {
  if (!origin) return false;
  let host: string;
  try {
    const url = new URL(origin);
    if (url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") return false;
    host = url.hostname.toLowerCase();
  } catch {
    return false;
  }
  if (host === "ottopay.pro" || host === "www.ottopay.pro") return true;
  if (host === "localhost" || host === "127.0.0.1") return true;
  // This project's own Vercel preview addresses.
  if (host.endsWith(".vercel.app") && host.startsWith("ottopay-front-end-")) return true;
  const allowed = (extra ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(host);
}

/** The visitor's address as Vercel reports it. */
export function clientIp(headers: Headers): string {
  return headers.get("x-real-ip") ?? headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
