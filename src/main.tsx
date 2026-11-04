import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Strip Lovable-injected preview OG/Twitter images so Helmet/page_meta can manage them.
// Only remove tags NOT managed by react-helmet-async (which marks its tags with data-rh).
document
  .querySelectorAll('meta[property="og:image"]:not([data-rh]), meta[name="twitter:image"]:not([data-rh])')
  .forEach((el) => el.remove());

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
