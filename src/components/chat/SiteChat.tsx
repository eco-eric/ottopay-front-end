import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { fetchChatEnabled, showsChat, track } from "./chatClient";

const ChatPanel = lazy(() => import("./ChatPanel"));

/**
 * Floating "Ask Otto" button and chat panel. Shows only once the server says chat is on, so the
 * site looks the same as before until the OpenRouter key is added in Vercel.
 */
export default function SiteChat() {
  const { pathname } = useLocation();
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Wait a moment so the chat never slows the page's first paint.
    const timer = window.setTimeout(() => {
      fetchChatEnabled().then((on) => {
        if (!cancelled) setEnabled(on);
      });
    }, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!enabled || !showsChat(pathname)) return null;

  return (
    <>
      {open && (
        <Suspense fallback={null}>
          <ChatPanel page={pathname} onClose={() => setOpen(false)} />
        </Suspense>
      )}
      {!open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            track("site_chat_open");
          }}
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Ask Otto, the OttoPay assistant"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Ask Otto
        </button>
      )}
    </>
  );
}
