import { useEffect } from "react";

export default function GHLChatWidget() {
  useEffect(() => {
    let loaded = false;
    let timerId: number | undefined; // eslint-disable-line prefer-const

    const loadChat = () => {
      if (loaded) return;
      loaded = true;
      cleanupTriggers();

      const script = document.createElement("script");
      script.src = "https://widgets.leadconnectorhq.com/loader.js";
      script.setAttribute(
        "data-resources-url",
        "https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      );
      script.setAttribute("data-widget-id", "699715c5d5f5db7cd73b4939");
      script.async = true;
      script.id = "ghl-chat-loader";
      document.body.appendChild(script);
    };

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight * 0.5;
      if (scrolled >= threshold) loadChat();
    };

    const cleanupTriggers = () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
      window.removeEventListener("scroll", onScroll);
    };

    // Always defer: 3s timer OR 50% scroll, whichever fires first
    timerId = window.setTimeout(loadChat, 3000);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cleanupTriggers();
      const script = document.getElementById("ghl-chat-loader");
      if (script) script.remove();
      const widget = document.querySelector(
        "chat-widget, #chat-widget, [id^='chat-widget']"
      );
      if (widget) widget.remove();
    };
  }, []);

  return null;
}
