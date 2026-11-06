import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { CheckCircle2, RotateCcw, Send, UserRound, X } from "lucide-react";
import { APP_URL, appUrl } from "@/lib/appUrl";
import { MAX_MESSAGE_CHARS, leadProblem, loadMessages, safeHref, saveMessages, sendChat, splitFollowUp, track, type ChatMessage, type Lead } from "./chatClient";
import { submitLead } from "./leads";

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
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

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
    // Earlier answers go back without the follow-up marker.
    const earlier = messages.map((m) => (m.role === "assistant" ? { ...m, content: splitFollowUp(m.content).text } : m));
    const history: ChatMessage[] = [...earlier, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setDraft("");
    setError(null);
    setBusy(true);
    track("site_chat_message");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const answer = await sendChat(history, page, (soFar) => setMessages([...history, { role: "assistant", content: soFar }]), controller.signal);
      if (splitFollowUp(answer).offer && !leadSent) setLeadOpen(true);
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
    setLeadOpen(false);
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
        {leadOpen && !leadSent && (
          <LeadForm
            messages={messages}
            page={page}
            onCancel={() => setLeadOpen(false)}
            onSent={() => {
              setLeadSent(true);
              setLeadOpen(false);
              track("site_chat_lead");
            }}
          />
        )}
        {leadSent && (
          <p className="flex items-start gap-2 rounded-lg bg-success/10 px-3 py-2 text-xs text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            Thanks! The OttoPay team will email you, usually within a few hours on business days.
          </p>
        )}
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
        {!leadOpen && !leadSent && (
          <button
            type="button"
            onClick={() => setLeadOpen(true)}
            className="mt-2 inline-flex w-full items-center justify-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
            Have someone from OttoPay follow up
          </button>
        )}
        <p className="mt-1.5 text-center text-[11px] leading-snug text-muted-foreground">
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
            {splitFollowUp(content).text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

function LeadForm({ messages, page, onCancel, onSent }: { messages: ChatMessage[]; page: string; onCancel: () => void; onSent: () => void }) {
  const [lead, setLead] = useState<Lead>({ name: "", email: "", note: "" });
  const [sending, setSending] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const issue = leadProblem(lead);
    if (issue) return setProblem(issue);
    setSending(true);
    setProblem(null);
    try {
      await submitLead(lead, messages, page);
      onSent();
    } catch (err) {
      setProblem((err as Error)?.message || "Sorry, that didn't go through. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm";

  return (
    <form onSubmit={submit} className="space-y-2 rounded-xl border border-primary/30 bg-primary/5 p-3" aria-label="Ask OttoPay to follow up">
      <p className="text-sm font-semibold">Have someone follow up</p>
      <input ref={nameRef} className={field} placeholder="Your name" autoComplete="name" maxLength={100} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} aria-label="Your name" />
      <input className={field} type="email" placeholder="Email" autoComplete="email" maxLength={254} value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} aria-label="Email" />
      <textarea className={`${field} resize-none`} rows={2} placeholder="Anything we should know? (optional)" maxLength={1000} value={lead.note} onChange={(e) => setLead({ ...lead, note: e.target.value })} aria-label="Note (optional)" />
      {problem && <p className="text-xs text-destructive">{problem}</p>}
      <div className="flex items-center gap-2">
        <button type="submit" disabled={sending} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">
          {sending ? "Sending…" : "Send"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
          Not now
        </button>
      </div>
      <p className="text-[11px] leading-snug text-muted-foreground">We'll include your questions from this chat so we know what you asked. See our <Link to="/privacy" className="underline">privacy policy</Link>.</p>
    </form>
  );
}
