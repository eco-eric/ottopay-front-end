import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, LogIn } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import OttoLogoPicture from "@/components/marketing/OttoLogoPicture";
import { appUrl } from "@/lib/appUrl";

export default function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { dark, toggleDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/" && location.pathname !== "/welcome") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3 text-primary font-bold text-2xl no-underline">
          <OttoLogoPicture className="h-[50px] w-auto" fetchPriority="high" loading="eager" />
          <span>Otto<span className="text-foreground">Pay</span></span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-8 list-none">
          <li>
            <Link to="/features" className="text-muted-foreground font-medium hover:text-primary transition-colors no-underline text-sm xl:text-base whitespace-nowrap">
              Features
            </Link>
          </li>
          <li>
            <Link to="/why-us" className="text-muted-foreground font-medium hover:text-primary transition-colors no-underline text-sm xl:text-base whitespace-nowrap">
              Why Us
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="text-muted-foreground font-medium hover:text-primary transition-colors no-underline text-sm xl:text-base whitespace-nowrap">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/blog" className="text-muted-foreground font-medium hover:text-primary transition-colors no-underline text-sm xl:text-base whitespace-nowrap">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-muted-foreground font-medium hover:text-primary transition-colors no-underline text-sm xl:text-base whitespace-nowrap">
              Contact
            </Link>
          </li>
          <li>
            <a href={appUrl("/auth")} className="text-muted-foreground font-medium hover:text-primary transition-colors no-underline text-sm xl:text-base whitespace-nowrap">
              Login
            </a>
          </li>
          <li>
            <button
              onClick={toggleDark}
              className="bg-transparent border-none cursor-pointer text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </li>
          <li>
            <a
              href={appUrl("/auth?mode=signup")}
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm xl:text-[0.95rem] no-underline hover:opacity-90 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              Get Started
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={appUrl("/auth")}
            className="flex items-center justify-center p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Login"
          >
            <LogIn className="h-5 w-5" />
          </a>
          <button
            onClick={toggleDark}
            className="bg-transparent border-none cursor-pointer text-muted-foreground hover:text-primary transition-colors p-2"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-transparent border-none cursor-pointer text-foreground p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-background border-t px-5 py-4 space-y-3">
          <Link to="/features" onClick={() => setMenuOpen(false)} className="block w-full text-left text-muted-foreground font-medium py-2 no-underline text-base">
            Features
          </Link>
          <Link to="/why-us" onClick={() => setMenuOpen(false)} className="block w-full text-left text-muted-foreground font-medium py-2 no-underline text-base">
            Why Us
          </Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)} className="block w-full text-left text-muted-foreground font-medium py-2 no-underline text-base">
            Pricing
          </Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)} className="block w-full text-left text-muted-foreground font-medium py-2 no-underline text-base">
            Blog
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block w-full text-left text-muted-foreground font-medium py-2 no-underline text-base">
            Contact
          </Link>
          <a href={appUrl("/auth")} onClick={() => setMenuOpen(false)} className="block w-full text-left text-muted-foreground font-medium py-2 no-underline text-base">
            Login
          </a>
          <a
            href={appUrl("/auth?mode=signup")}
            onClick={() => setMenuOpen(false)}
            className="inline-block bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold no-underline mt-2"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
