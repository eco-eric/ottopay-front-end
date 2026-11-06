/**
 * OpenRouter chat completions, streamed. Same approach as the Total Mini Split site
 * (lib/ai/openrouter.ts there): one small fetch client, a main model with a fallback through
 * OpenRouter's `models` list, and the real cost returned in `usage`.
 */

export const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/** Defaults; override with CHAT_MODEL and CHAT_FALLBACK_MODEL in Vercel. */
export const DEFAULT_MODEL = "anthropic/claude-haiku-5.5";
export const DEFAULT_FALLBACK = "google/gemini-2.5-flash-lite";

const MODEL_ID = /^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._:-]*$/i;
export const pickModel = (value: string | undefined, fallback: string) =>
  value && value.length <= 100 && MODEL_ID.test(value.trim()) ? value.trim() : fallback;

export type ModelMessage = { role: "system" | "user" | "assistant"; content: string };
export type Usage = { model: string; input_tokens: number; output_tokens: number; cost_usd: number };

export class ProviderError extends Error {
  constructor(message: string, readonly status = 502) {
    super(message);
  }
}

/** A visitor-safe sentence for an OpenRouter failure. Details go to the server log only. */
export function friendlyError(status: number): string {
  if (status === 402) return "Chat is resting right now. Please email support@ottopay.pro.";
  if (status === 429) return "Chat is busy right now. Please try again in a minute.";
  return "Sorry, I couldn't answer just now. Please try again, or email support@ottopay.pro.";
}

type StreamArgs = {
  key: string;
  model: string;
  fallback: string;
  messages: ModelMessage[];
  maxTokens: number;
  referer: string;
  onDone?: (usage: Usage) => void;
  fetchImpl?: typeof fetch;
};

/**
 * Starts the call and returns a stream of plain answer text. Throws ProviderError before any text
 * is sent if OpenRouter refuses the call, so the browser gets a clean error instead of half a reply.
 */
export async function streamChat(a: StreamArgs): Promise<ReadableStream<Uint8Array>> {
  const doFetch = a.fetchImpl ?? fetch;
  let res: Response;
  try {
    res = await doFetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${a.key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": a.referer,
        "X-Title": "OttoPay site chat",
      },
      body: JSON.stringify({
        model: a.model,
        ...(a.fallback && a.fallback !== a.model ? { models: [a.model, a.fallback] } : {}),
        messages: a.messages,
        max_tokens: a.maxTokens,
        temperature: 0.3,
        stream: true,
        usage: { include: true },
      }),
      signal: AbortSignal.timeout(40_000),
    });
  } catch {
    throw new ProviderError("Couldn't reach OpenRouter.");
  }
  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new ProviderError(`OpenRouter HTTP ${res.status}: ${detail.slice(0, 300)}`, res.status);
  }
  return sseToText(res.body, a.model, a.onDone);
}

/** Turns OpenRouter's server-sent events into the answer's text, and reports usage at the end. */
export function sseToText(body: ReadableStream<Uint8Array>, model: string, onDone?: (u: Usage) => void): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const usage: Usage = { model, input_tokens: 0, output_tokens: 0, cost_usd: 0 };
  let buffer = "";
  let sentAny = false;

  const handleLine = (line: string, out: TransformStreamDefaultController<Uint8Array>) => {
    if (!line.startsWith("data:")) return; // comments such as ": OPENROUTER PROCESSING"
    const data = line.slice(5).trim();
    if (!data || data === "[DONE]") return;
    let evt: {
      model?: string;
      error?: { message?: string };
      choices?: { delta?: { content?: string | null } }[];
      usage?: { prompt_tokens?: number; completion_tokens?: number; cost?: number };
    };
    try {
      evt = JSON.parse(data);
    } catch {
      return;
    }
    if (evt.model) usage.model = evt.model;
    if (evt.error) {
      console.error(JSON.stringify({ evt: "site_chat_stream_error", message: String(evt.error.message ?? "").slice(0, 300) }));
      out.enqueue(encoder.encode(sentAny ? "\n\n(Sorry, the answer was cut off. Please ask again.)" : friendlyError(500)));
      sentAny = true;
      return;
    }
    const text = evt.choices?.[0]?.delta?.content;
    if (text) {
      out.enqueue(encoder.encode(text));
      sentAny = true;
    }
    if (evt.usage) {
      usage.input_tokens = Number(evt.usage.prompt_tokens ?? 0);
      usage.output_tokens = Number(evt.usage.completion_tokens ?? 0);
      usage.cost_usd = Number(evt.usage.cost ?? 0);
    }
  };

  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, out) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) handleLine(line.trimEnd(), out);
      },
      flush(out) {
        buffer += decoder.decode();
        if (buffer) handleLine(buffer.trimEnd(), out);
        if (!sentAny) out.enqueue(encoder.encode(friendlyError(500)));
        onDone?.(usage);
      },
    }),
  );
}
