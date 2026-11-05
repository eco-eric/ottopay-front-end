import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { RotateCcw, Send, X } from "lucide-react";
import { APP_URL, appUrl } from "@/lib/appUrl";
import { MAX_MESSAGE_CHARS, loadMessages, safeHref, saveMessages, sendChat, track, type ChatMessage } from "./chatClient";

const STARTERS = [
  "What does Pro cost?",
  "Does OttoPay take a cut of card payments?",
  "Can my crew use it too?",
  "How do estimates work?",
];

const GREETING =
  "Hi, I'm Otto. Ask me anything about OttoPay: plans, getting paid, estimates, or whether it fits your business.";

export default function ChatPanel({ page, onClose }: { page: string; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadMessages());
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      abortRef.current?.abort();
    };
  }, [onClose]);

  useEffect(() => {
    saveMessages(messages);
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  const ask = async (question: string) => {
    const text = question.trim().slice(0, MAX_MESSAGE_CHARS);
    if (!text || busy) return;
    const history: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setDraft("");
    setError(null);
    setBusy(true);
    track("site_chat_message");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      await sendChat(history, page, (soFar) => setMessages([...history, { role: "assistant", content: soFar }]), controller.signal);
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return;
      setMessages(history.slice(0, -1));
      setDraft(text);
      setError((e as Error)?.message || "Sorry, something went wrong. Please try again.");
    } finally {
      setBusy(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(draft);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void ask(draft);
    }
  };

  const newChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setDraft("");
    inputRef.current?.focus();
  };

  return (
    <div
      role="dialog"
      aria-label="Chat with Otto, the OttoPay assistant"
      className="fixed inset-x-2 bottom-2 z-50 flex h-[min(620px,calc(100dvh-1rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[380px]"
    >
      <div className="flex items-center justify-between gap-2 bg-primary px-4 py-3 text-primary-foreground">
        <div className="flex min-w-0 items-center gap-2.5">
          <img src="/assets/otto-logo-800.png" alt="" className="h-8 w-auto shrink-0" width={60} height={32} />
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight">Ask Otto</p>
            <p className="text-xs leading-tight opacity-80">AI assistant for OttoPay questions</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {messages.length > 0 && (
            <button type="button" onClick={newChat} className="rounded-md p-2 hover:bg-white/15" aria-label="Start a new chat" title="New chat">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <button type="button" onClick={onClose} className="rounded-md p-2 hover:bg-white/15" aria-label="Close chat">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        <Bubble role="assistant" content={GREETING} />
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {STARTERS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => void ask(q)}
                className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-left text-xs font-medium text-foreground hover:border-primary hover:bg-primary/10"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} content={m.content} typing={busy && i === messages.length - 1 && !m.content} />
        ))}
        {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
      </div>

      <form onSubmit={onSubmit} className="border-t border-border px-3 pb-2 pt-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_MESSAGE_CHARS))}
            onKeyDown={onKeyDown}
            rows={1}
            maxLength={MAX_MESSAGE_CHARS}
            placeholder="Type your question…"
            aria-label="Your question"
            className="max-h-28 min-h-[42px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] leading-snug text-muted-foreground">
          AI answers can be wrong. Check <Link to="/pricing" className="underline">Pricing</Link> or email{" "}
          <a href="mailto:support@ottopay.pro" className="underline">support@ottopay.pro</a>. Don't share card or account details here.{" "}
          <a href={appUrl("/auth?mode=signup")} className="font-semibold text-primary underline">Start free</a>
        </p>
      </form>
    </div>
  );
}

function Bubble({ role, content, typing }: { role: "user" | "assistant"; content: string; typing?: boolean }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground">{content}</p>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="prose prose-sm max-w-[90%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-sm text-foreground dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-a:text-primary">
        {typing ? (
          <span className="inline-flex gap-1 py-1" aria-label="Otto is typing">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
          </span>
        ) : (
          <ReactMarkdown
            skipHtml
            components={{
              a: ({ href, children }) => {
                const link = safeHref(href, APP_URL);
                if (!link) return <span>{children}</span>;
                if (link.internal) return <Link to={link.href}>{children}</Link>;
                return <a href={link.href}>{children}</a>;
              },
              img: () => null,
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
