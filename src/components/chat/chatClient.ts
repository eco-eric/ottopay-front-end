// Browser side of the site chat: talks to /api/chat (api/chat.ts).

export type ChatMessage = { role: "user" | "assistant"; content: string };

export const CHAT_ENDPOINT = "/api/chat";
export const MAX_MESSAGE_CHARS = 800;
const STORE_KEY = "ottopay_site_chat";

/** Pages that show the chat button: the same pages the old chat widget was on. */
const CHAT_PATHS = ["/", "/welcome", "/about", "/privacy", "/terms", "/pricing", "/why-us", "/contact", "/features", "/help", "/integrations", "/mobile-app", "/partners", "/blog"];
export const showsChat = (path: string) => CHAT_PATHS.includes(path) || path.startsWith("/blog/");

/** Whether the server has chat turned on (key set, not switched off). False on any error. */
export async function fetchChatEnabled(): Promise<boolean> {
  try {
    const res = await fetch(CHAT_ENDPOINT, { method: "GET", headers: { Accept: "application/json" } });
    if (!res.ok || !(res.headers.get("content-type") ?? "").includes("application/json")) return false;
    const body = (await res.json()) as { enabled?: unknown };
    return body.enabled === true;
  } catch {
    return false;
  }
}

/**
 * Sends the conversation and calls onText with the answer as it arrives.
 * Resolves with the whole answer; rejects with a visitor-friendly message.
 */
export async function sendChat(messages: ChatMessage[], page: string, onText: (soFar: string) => void, signal?: AbortSignal): Promise<string> {
  let res: Response;
  try {
    res = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, page }),
      signal,
    });
  } catch (e) {
    if ((e as Error)?.name === "AbortError") throw e;
    throw new Error("Couldn't reach the chat. Check your connection and try again.");
  }
  if (!res.ok || !res.body) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Sorry, I couldn't answer just now. Please try again, or email support@ottopay.pro.");
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
    onText(text);
  }
  text += decoder.decode();
  onText(text);
  return text;
}

/** The conversation is kept for this browser tab only, so it survives moving between pages. */
export function loadMessages(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed)
      ? parsed.filter((m): m is ChatMessage => !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]): void {
  try {
    if (messages.length) sessionStorage.setItem(STORE_KEY, JSON.stringify(messages));
    else sessionStorage.removeItem(STORE_KEY);
  } catch {
    // Private windows can refuse storage; the chat still works for this page.
  }
}

/** Links the bot may show as links: this site's own pages, the app, and support email. */
export function safeHref(href: string | undefined, appUrl: string): { href: string; internal: boolean } | null {
  if (!href) return null;
  if (/^\/(?!\/)[a-z0-9\-/#?=&]*$/i.test(href)) return { href, internal: true };
  if (/^mailto:[a-z0-9._%+-]+@ottopay\.pro$/i.test(href)) return { href, internal: false };
  try {
    const url = new URL(href);
    const app = new URL(appUrl);
    if (url.protocol !== "https:") return null;
    if (url.hostname === "ottopay.pro" || url.hostname === "www.ottopay.pro") return { href: url.pathname + url.search + url.hash, internal: true };
    if (url.hostname === app.hostname) return { href: url.toString(), internal: false };
  } catch {
    return null;
  }
  return null;
}

/** Sends an event to Google Tag Manager if it's on the page. */
export function track(event: string): void {
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event });
}
