import { Link, useLocation } from "react-router-dom";
import OttoLogoPicture from "@/components/marketing/OttoLogoPicture";

export default function MarketingFooter() {
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/" && location.pathname !== "/welcome") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary text-muted-foreground">
      <div className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <OttoLogoPicture className="h-10 w-auto" loading="lazy" />
              <span className="text-foreground font-bold text-xl">Otto<span className="text-foreground">Pay</span></span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              The ultimate invoicing tool built for professional technicians who want to spend less time on paperwork.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2 list-none p-0">
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/mobile-app" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Mobile App
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 list-none p-0">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Refer &amp; Earn
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm no-underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm opacity-60">&copy; 2026 OttoPay, a subsidiary of EcosourceIQ, DBA WorkEdge Pro. All rights reserved.</p>
          <p className="text-sm opacity-60">Designed for professionals who get things done</p>
        </div>
      </div>
    </footer>
  );
}
