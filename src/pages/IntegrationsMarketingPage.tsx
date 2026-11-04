import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Check, ArrowRight, Zap, Database, Cloud, BarChart3, Users, Link2, Star } from "lucide-react";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredIntegrations = [
  {
    name: "WorkEdge Pro",
    emoji: "🔧",
    badge: "Featured",
    badgeClass: "bg-primary text-primary-foreground",
    borderClass: "border-primary",
    desc: "The ultimate field service companion. Sync customers, service properties, equipment records, and job photos directly into Otto Pay — no manual uploads needed.",
    features: [
      "Auto-sync customers, contacts & addresses",
      "Pull job photos directly into invoices",
      "Equipment & service history tracking",
      "Real-time background sync",
      "Project history & media gallery",
    ],
  },
  {
    name: "QuickBooks Online",
    emoji: "📊",
    badge: "Accounting",
    badgeClass: "bg-warning/15 text-warning",
    borderClass: "border-warning/30",
    desc: "Keep your books in sync effortlessly. Otto Pay connects with QuickBooks Online to push invoices, payments, and customer data — so your accountant always has the latest numbers.",
    features: [
      "Auto-export invoices & payments",
      "Sync customer records both ways",
      "Tax-ready reporting & summaries",
      "Eliminate double data entry",
    ],
  },
];

const crmPartners = [
  {
    name: "Zoho CRM",
    emoji: "🔷",
    desc: "Sync contacts, deals, and invoices with your Zoho workspace. Two-way data flow keeps everything in sync.",
  },
  {
    name: "Go High Level",
    emoji: "🚀",
    desc: "Connect your GHL funnels, contacts, and automations. Perfect for contractors running marketing campaigns.",
  },
  {
    name: "HubSpot",
    emoji: "🟠",
    desc: "Two-way sync with HubSpot contacts and deals. Great for teams managing sales pipelines alongside field work.",
  },
  {
    name: "Salesforce",
    emoji: "☁️",
    desc: "Enterprise-grade CRM integration for larger teams and multi-location operations.",
  },
];

const additionalTools = [
  { name: "Google Drive", emoji: "📁", desc: "Back up invoices and documents automatically." },
  { name: "Zapier", emoji: "⚡", desc: "Connect Otto Pay to 5,000+ apps with custom automations." },
  { name: "Stripe", emoji: "💳", desc: "Accept card payments directly from invoices — built in." },
  { name: "Resend", emoji: "📧", desc: "Professional transactional email delivery for invoices and reminders." },
];

const benefits = [
  { icon: Zap, title: "5-Minute Setup", desc: "No developers needed. Connect your tools in minutes with guided setup wizards." },
  { icon: Cloud, title: "Real-Time Sync", desc: "Data flows automatically between Otto Pay and your connected apps — always up to date." },
  { icon: Database, title: "One Source of Truth", desc: "Stop switching between apps. Your customers, invoices, and payments live in one place." },
  { icon: BarChart3, title: "Smarter Reporting", desc: "Combined data means better insights. See the full picture across all your tools." },
];

export default function IntegrationsMarketingPage() {
  const animRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("opacity-100", "translate-y-0")),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    animRef.current?.querySelectorAll(".anim-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-20 pb-28 text-center text-primary-foreground overflow-hidden">
        <svg className="absolute left-[-40px] bottom-10 w-[200px] opacity-10 animate-pulse" viewBox="0 0 200 300" fill="none">
          <path d="M160 10 C140 60, 100 80, 80 140 S40 220, 60 280" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
          <path d="M180 30 C160 90, 140 100, 130 160 S100 240, 90 290" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
          <circle cx="160" cy="10" r="12" fill="currentColor" />
        </svg>
        <svg className="absolute right-[-30px] top-5 w-[180px] opacity-10 animate-pulse" viewBox="0 0 180 280" fill="none">
          <path d="M20 10 C40 70, 80 80, 100 140 S140 220, 120 270" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
          <path d="M10 40 C30 90, 60 110, 70 170 S100 230, 80 280" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
          <circle cx="20" cy="10" r="10" fill="currentColor" />
        </svg>

        <div className="relative z-10 mx-auto max-w-[650px] px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Connect Your <span className="border-b-4 border-primary-foreground/40 pb-1">Favorite Tools</span>
          </h1>
          <p className="text-lg opacity-90 leading-relaxed mb-8">
            Otto Pay integrates with the apps you already use — from CRMs to accounting software. Set up in minutes, sync in real time.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 bg-warning text-foreground px-8 py-3.5 rounded-full font-bold text-base no-underline hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-[80px]">
            <path className="fill-background" d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z">
              <animate attributeName="d" values="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z;M0,50 C200,10 400,70 600,30 C800,60 1000,20 1200,50 L1200,80 L0,80 Z;M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" dur="8s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </section>

      <div ref={animRef}>
        {/* Why Integrate */}
        <section className="py-16 px-5">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2 anim-in opacity-0 translate-y-6 transition-all duration-600">Why Connect Your Tools?</h2>
            <p className="text-muted-foreground text-center mb-10 anim-in opacity-0 translate-y-6 transition-all duration-600" style={{ transitionDelay: "50ms" }}>
              Stop juggling apps. Let Otto handle the data flow.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="anim-in opacity-0 translate-y-6 transition-all duration-600 bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-md hover:-translate-y-1"
                    style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Integrations */}
        <section className="py-16 px-5 bg-secondary">
          <div className="mx-auto max-w-[900px]">
            <div className="anim-in opacity-0 translate-y-6 transition-all duration-600 mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold mb-3 bg-primary/10 text-primary">
                <Star className="h-3 w-3 fill-current" /> Featured
              </span>
              <h2 className="text-2xl font-bold text-foreground mb-2">Deep Integrations</h2>
              <p className="text-muted-foreground">Purpose-built connections with the tools that matter most to field service pros.</p>
            </div>

            <div className="space-y-6">
              {featuredIntegrations.map((int, i) => (
                <div
                  key={int.name}
                  className={`anim-in opacity-0 translate-y-6 transition-all duration-600 bg-card border ${int.borderClass} rounded-2xl p-6 md:p-8 relative overflow-hidden`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-4xl shrink-0">
                      {int.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{int.name}</h3>
                        <Badge className={int.badgeClass}>{int.badge}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{int.desc}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {int.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-3.5 w-3.5 text-primary shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CRM Partners */}
        <section className="py-16 px-5">
          <div className="mx-auto max-w-[1000px]">
            <div className="anim-in opacity-0 translate-y-6 transition-all duration-600 mb-10">
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">CRM Ecosystem</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Works With Your CRM</h2>
              <p className="text-muted-foreground">
                Otto Pay connects with the most popular CRMs in minutes. Sync contacts, deals, and invoices — no developer needed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {crmPartners.map((crm, i) => (
                <div
                  key={crm.name}
                  className="anim-in opacity-0 translate-y-6 transition-all duration-600 group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                  style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                      {crm.emoji}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{crm.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{crm.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Tools */}
        <section className="py-16 px-5 bg-secondary">
          <div className="mx-auto max-w-[1000px]">
            <div className="anim-in opacity-0 translate-y-6 transition-all duration-600 mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">More Tools, More Power</h2>
              <p className="text-muted-foreground">Payments, storage, messaging, and automation — Otto connects to them all.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {additionalTools.map((tool, i) => (
                <div
                  key={tool.name}
                  className="anim-in opacity-0 translate-y-6 transition-all duration-600 bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/30 hover:shadow-md hover:-translate-y-1"
                  style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                >
                  <span className="text-3xl block mb-2">{tool.emoji}</span>
                  <h3 className="text-sm font-bold text-foreground mb-1">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>

            <div className="anim-in opacity-0 translate-y-6 transition-all duration-600 mt-8 bg-card border border-dashed border-border rounded-2xl p-6 text-center" style={{ transitionDelay: "400ms" }}>
              <p className="text-sm text-muted-foreground mb-1">
                <span className="font-semibold text-foreground">Don't see your app?</span> We're adding new integrations all the time.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Otto Pay is built to work with virtually any CRM, accounting tool, or field service platform.
              </p>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link to="/contact">
                  Request an Integration <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background py-14 text-center relative overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[600px] px-5">
            <h3 className="text-2xl font-bold mb-3">Ready to Connect Everything?</h3>
            <p className="opacity-80 text-sm mb-6">
              Sign up free, connect your tools, and start saving hours every week. Otto's eight arms do the heavy lifting.
            </p>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-sm no-underline hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      <MarketingFooter />
    </div>
  );
}
