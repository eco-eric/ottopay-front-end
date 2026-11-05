/**
 * Site chat for ottopay.pro. Runs on Vercel next to the marketing site.
 *
 *   GET  /api/chat  -> { enabled }  (the chat button only shows when this says true)
 *   POST /api/chat  -> streamed plain-text answer, or { error } with a status code
 *
 * Settings (Vercel → ottopay-front-end → Settings → Environment Variables):
 *   OPENROUTER_API_KEY    required; the chat stays hidden without it. Never sent to the browser.
 *   CHAT_MODEL            optional OpenRouter model id (default anthropic/claude-haiku-5.5)
 *   CHAT_FALLBACK_MODEL   optional model used when the first is down (default google/gemini-2.5-flash-lite)
 *   CHAT_ENABLED          optional; "false" turns the chat off without a code change
 *   CHAT_ALLOWED_ORIGINS  optional extra site hostnames, comma separated
 *   VITE_APP_URL          already set; used for the sign-up link
 */
import { buildSystemPrompt } from "./_lib/knowledge";
import { LIMITS, RateLimiter, SLOW_DOWN, clientIp, originAllowed, parseChatBody } from "./_lib/limits";
import { DEFAULT_FALLBACK, DEFAULT_MODEL, ProviderError, friendlyError, pickModel, streamChat } from "./_lib/openrouter";

export const config = { runtime: "edge" };

const limiter = new RateLimiter();

const env = (name: string) => (typeof process !== "undefined" ? process.env[name] : undefined)?.trim() || undefined;

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extra },
  });

function chatEnabled(): boolean {
  return Boolean(env("OPENROUTER_API_KEY")) && env("CHAT_ENABLED")?.toLowerCase() !== "false";
}

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get("origin");
  const allowed = originAllowed(origin, env("CHAT_ALLOWED_ORIGINS"));
  const cors: Record<string, string> = allowed && origin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {};

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: allowed ? 204 : 403,
      headers: { ...cors, "Access-Control-Allow-Methods": "GET, POST", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" },
    });
  }
  if (req.method === "GET") return json({ enabled: chatEnabled() }, 200, cors);
  if (req.method !== "POST") return json({ error: "Not allowed." }, 405, { Allow: "GET, POST" });

  if (!allowed) return json({ error: "Not allowed." }, 403);
  if (!chatEnabled()) return json({ error: "Chat is off right now. Please email support@ottopay.pro." }, 503, cors);

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > LIMITS.maxBodyBytes) return json({ error: "That message is too long." }, 413, cors);
  const text = await req.text();
  if (text.length > LIMITS.maxBodyBytes) return json({ error: "That message is too long." }, 413, cors);
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return json({ error: "That message couldn't be read." }, 400, cors);
  }
  const parsed = parseChatBody(raw);
  if (!parsed.ok) return json({ error: parsed.error }, parsed.status, cors);

  if (!limiter.allow(clientIp(req.headers), [LIMITS.perIpBurst, LIMITS.perIpDay])) {
    return json({ error: SLOW_DOWN }, 429, { ...cors, "Retry-After": "300" });
  }

  const appUrl = (env("VITE_APP_URL") ?? "https://app.ottopay.pro").replace(/\/$/, "");
  const model = pickModel(env("CHAT_MODEL"), DEFAULT_MODEL);
  const fallback = pickModel(env("CHAT_FALLBACK_MODEL"), DEFAULT_FALLBACK);
  const started = Date.now();

  try {
    const stream = await streamChat({
      key: env("OPENROUTER_API_KEY") as string,
      model,
      fallback,
      maxTokens: LIMITS.maxOutputTokens,
      referer: "https://ottopay.pro",
      messages: [{ role: "system", content: buildSystemPrompt({ appUrl, page: parsed.value.page }) }, ...parsed.value.messages],
      onDone: (u) =>
        // One line per answer for Vercel's logs: cost and size only, never what the visitor wrote.
        console.log(JSON.stringify({ evt: "site_chat", model: u.model, in: u.input_tokens, out: u.output_tokens, cost_usd: u.cost_usd, ms: Date.now() - started, turns: parsed.value.messages.length })),
    });
    return new Response(stream, {
      status: 200,
      headers: { ...cors, "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
    });
  } catch (e) {
    const status = e instanceof ProviderError ? e.status : 500;
    console.error(JSON.stringify({ evt: "site_chat_error", status, message: e instanceof Error ? e.message.slice(0, 300) : "unknown" }));
    return json({ error: friendlyError(status) }, status === 429 ? 429 : 502, cors);
  }
}
