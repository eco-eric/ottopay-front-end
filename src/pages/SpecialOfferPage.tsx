import { useState } from "react";
import { ArrowRight } from "lucide-react";
import "./SpecialOfferPage.css";

/* ─── FAQ toggle helper ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`so-faq-item ${open ? "open" : ""}`}>
      <button className="so-faq-q" onClick={() => setOpen((v) => !v)}>
        {q}
        <span className="so-ico">+</span>
      </button>
      <div className="so-faq-a">{a}</div>
    </div>
  );
}

const faqs = [
  { q: "Do I have to use both apps?", a: "No — each app works on its own. But when both are connected you unlock the 6-month OttoPay.pro deal and the seamless workflow where job data flows directly into your invoices without any manual re-entry." },
  { q: "What happens after the 6 months?", a: "You can stay on OttoPay.pro at regular pricing, switch to a different plan, or cancel — without losing any of your historical invoices, customers, or payment records." },
  { q: "Can my techs use this if their English isn't perfect?", a: "Yes. WorkEdge supports voice-first documentation so techs can log what happened in the field without worrying about spelling or typing speed. Just speak and it captures everything into the project stream." },
  { q: "Which WorkEdge plans qualify for the free OttoPay offer?", a: 'All paid WorkEdge.pro plans — Starter ($39/mo), Professional ($79/mo), and Team ($149/mo) — qualify for the 6-month free OttoPay.pro bundle. Free trial accounts do not include the OttoPay offer.' },
  { q: "Does OttoPay.pro work without WorkEdge?", a: "Absolutely. OttoPay.pro is a fully standalone invoicing and payment platform. When connected to WorkEdge you get the integration benefits, but OttoPay works great on its own for any contractor who needs professional invoicing and payments." },
];

const plans = [
  {
    name: "Starter", price: "39", caption: "For solo contractors getting their documentation dialed in.", featured: false,
    features: ["Unlimited jobs & projects", "Unlimited photo storage", "Property & customer records", "Voice-to-text job notes", "Equipment tracking", "Offline mode"],
  },
  {
    name: "Professional", price: "79", caption: "For growing contractors who need full workflow automation.", featured: true,
    features: ["Everything in Starter", "Job scheduling & dispatch", "Project timelines", "Shopping lists per job", "Advanced reports & exports", "Priority support"],
  },
  {
    name: "Team", price: "149", caption: "For small crews. Coordinate jobs and manage the whole team.", featured: false,
    features: ["Everything in Professional", "Up to 10 team members", "Team activity feed", "Manager dashboard", "Role-based permissions", "Dedicated onboarding call"],
  },
];

export default function SpecialOfferPage() {
  return (
    <div className="so-page">
      {/* ─── NAV ─── */}
      <nav className="so-nav">
        <a href="/special-offer" className="so-nav-brand">
          WorkEdge<span className="so-sep"> + </span><span className="so-teal">OttoPay</span>
        </a>
        <ul className="so-nav-links">
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#apps">The Apps</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="https://workedge.pro" className="so-nav-cta">Get Started Free</a></li>
        </ul>
      </nav>

      {/* ─── HERO ─── */}
      <section className="so-hero">
        <div className="so-hero-bg" />
        <div className="so-hero-grid" />
        <div className="so-hero-inner">
          <div className="so-hero-eyebrow">
            <span className="so-blink" />
            WorkEdge.pro + OttoPay.pro — Unified Workflow
          </div>
          <h1>
            Run Your Jobs,<br />
            Docs &amp; Invoices
            <span className="so-line-teal">In One Workflow.</span>
          </h1>
          <p className="so-hero-sub">
            Connect WorkEdge.pro for field documentation with OttoPay.pro for invoicing and light CRM — every photo, note, and project turns into a clean professional invoice in minutes.
          </p>
          <div className="so-offer-pill">
            <div className="so-offer-pill-icon">🐙</div>
            <div className="so-offer-pill-text">
              <strong>Get 6 months of OttoPay.pro free</strong> when you join WorkEdge on any paid plan
            </div>
          </div>
          <div className="so-hero-btns so-btn-row" style={{ justifyContent: "center" }}>
            <a href="https://workedge.pro" className="so-btn so-btn-primary so-btn-lg">
              Start WorkEdge + OttoPay
              <ArrowRight className="h-[18px] w-[18px]" />
            </a>
            <a href="#how-it-works" className="so-btn so-btn-ghost so-btn-lg">See How the Deal Works</a>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <div className="so-trust-bar">
        <div className="so-trust-inner">
          {["✓ No credit card required", "📱 Mobile-first, works offline", "🔧 Built for HVAC & field trades", "🐙 OttoPay free for 6 months", "✗ Cancel anytime"].map((t) => (
            <div key={t} className="so-trust-item">{t}</div>
          ))}
        </div>
      </div>

      {/* ─── HOW THE DEAL WORKS ─── */}
      <section id="how-it-works" className="so-deal-section">
        <div className="so-container">
          <div className="so-section-tag">The Bundle Deal</div>
          <h2 className="so-section-title">How the 6‑Month<br /><span className="so-t">OttoPay.pro Deal</span> Works</h2>
          <div className="so-steps-strip">
            {[["1", "Create your\nWorkEdge account"], ["2", "Choose any\npaid plan"], ["3", "Connect\nOttoPay.pro"], ["4", "Send invoices\nwithin minutes"]].map(([n, l]) => (
              <div key={n} className="so-step">
                <div className="so-step-num">{n}</div>
                <div className="so-step-label" style={{ whiteSpace: "pre-line" }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="so-deal-bullets">
            {[
              ["Pick any paid WorkEdge.pro plan", "for field documentation and project management — all tiers qualify for the offer."],
              ["Activate the OttoPay.pro integration", "from inside your WorkEdge account in one click."],
              ["Your OttoPay.pro paid plan is free for 6 months", "— no credit card required for OttoPay during the free period."],
              ["Cancel anytime.", "Your project and invoice history stays safely stored regardless."],
            ].map(([strong, rest]) => (
              <div key={strong} className="so-deal-bullet">
                <span className="so-check">✓</span>
                <p><strong>{strong}</strong> {rest}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://workedge.pro" className="so-btn so-btn-primary">Claim 6 Months of OttoPay Free</a>
          </div>
        </div>
      </section>

      {/* ─── WHY BOTH APPS ─── */}
      <section id="apps" className="so-why-both">
        <div className="so-container">
          <div className="so-section-tag">One Source of Truth</div>
          <h2 className="so-section-title">Jobsite to Payment.<br /><span className="so-t">Fully Connected.</span></h2>
          <p className="so-section-sub">Two purpose-built apps that work better together than any all-in-one tool that tries to do everything.</p>
          <div className="so-two-col">
            <div className="so-app-card so-workedge">
              <div className="so-app-card-header">
                <div className="so-app-icon so-we">🏗️</div>
                <div>
                  <div className="so-app-name so-we-name">WorkEdge.pro</div>
                  <div className="so-app-tagline">Field Documentation + Projects</div>
                </div>
              </div>
              <ul className="so-feat-list">
                {["Property and project-centric documentation — no more texts and camera roll chaos", "Voice notes and photos captured directly into each project's timeline", "Shopping lists, site conditions, and job history tied to the property forever", "Offline-ready — works in basements, crawlspaces, and dead zones"].map((f) => (
                  <li key={f}><span className="so-dot" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="so-app-card so-ottopay">
              <div className="so-app-card-header">
                <div className="so-app-icon so-op">🐙</div>
                <div>
                  <div className="so-app-name so-op-name">OttoPay.pro</div>
                  <div className="so-app-tagline">Invoices + Payments + Light CRM</div>
                </div>
              </div>
              <ul className="so-feat-list so-feat-list-gold">
                {["Build professional HVAC-ready invoices in seconds from your project details", "Track who's paid, who's overdue, and what's scheduled next", "Accept card, ACH, or cash — all from your phone at the job site", "Store basic client info so repeat work is just a couple of taps away"].map((f) => (
                  <li key={f}><span className="so-dot" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="so-connector-band">
            <span className="so-connector-icon">⚡</span>
            <p>"When your crew finishes a job in WorkEdge, OttoPay pulls the details you need so you can send a clean invoice before you leave the driveway."</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <a href="https://workedge.pro" className="so-btn so-btn-primary">Sync WorkEdge + OttoPay</a>
          </div>
        </div>
      </section>

      {/* ─── DAY IN THE LIFE ─── */}
      <section className="so-day-section">
        <div className="so-container">
          <div className="so-section-tag">In Practice</div>
          <h2 className="so-section-title">A Day in the Life<br /><span className="so-t">With the Bundle</span></h2>
          <div className="so-moment-cards">
            {[
              { icon: "🌅", time: "Morning", title: "Dispatch", body: "Log today's properties and projects in WorkEdge, assign techs, and share notes before they roll. Everyone knows what's happening before they leave the shop.", tag: "WorkEdge.pro", gold: false },
              { icon: "📸", time: "On-Site", title: "Documentation", body: "Capture photos, damage, model and serial numbers, and voice-to-text notes directly into the property's project stream — no more texting yourself photos.", tag: "WorkEdge.pro", gold: false },
              { icon: "💸", time: "End of Job", title: "Invoicing", body: 'Tap "Create Invoice" in OttoPay, pull the job line items, and send a branded invoice via text or email in under a minute. Get paid before you leave the driveway.', tag: "OttoPay.pro", gold: true },
            ].map((m) => (
              <div key={m.title} className="so-moment-card">
                <div className="so-moment-card-header">
                  <div className="so-moment-icon">{m.icon}</div>
                  <div>
                    <div className="so-moment-time">{m.time}</div>
                    <div className="so-moment-title">{m.title}</div>
                  </div>
                </div>
                <div className="so-moment-card-body">
                  <p>{m.body}</p>
                  <span className={`so-moment-app-tag ${m.gold ? "so-moment-gold" : ""}`}>{m.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR WHO ─── */}
      <section className="so-for-who">
        <div className="so-container">
          <div className="so-section-tag">Built For</div>
          <h2 className="so-section-title">Made for Busy<br /><span className="so-t">Trade Contractors</span></h2>
          <div className="so-who-grid">
            {[
              { emoji: "🔧", title: "HVAC, Plumbing & Electrical", desc: "Juggling multiple jobs a day across different properties. One place for every photo, note, and invoice — no more chaos between apps." },
              { emoji: "📱", title: "Mobile-First Operators", desc: "Owners who never open a laptop. Everything runs from your phone — invoicing, docs, payments, and client history." },
              { emoji: "🗣️", title: "Multilingual Crews", desc: "Teams with non-native English speakers. WorkEdge supports voice-to-text so techs can log what happened without worrying about spelling or typing." },
            ].map((w) => (
              <div key={w.title} className="so-who-card">
                <span className="so-who-emoji">{w.emoji}</span>
                <div className="so-who-title">{w.title}</div>
                <p className="so-who-desc">{w.desc}</p>
              </div>
            ))}
          </div>
          <div className="so-urgency-bar">
            <p>🔥 <strong>Limited-time bundle:</strong> Lock in 6 months of OttoPay.pro free while this offer is live.</p>
            <a href="https://workedge.pro" className="so-btn so-btn-gold">Get the Bundle</a>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="so-pricing-section">
        <div className="so-container">
          <div className="so-section-tag">WorkEdge.pro Plans</div>
          <h2 className="so-section-title">Simple Pricing.<br /><span className="so-t">All Plans Include OttoPay Free.</span></h2>
          <p className="so-section-sub">Every paid WorkEdge plan qualifies for the 6-month OttoPay.pro bundle. No hidden charges. Cancel anytime.</p>
          <div className="so-plans-grid">
            {plans.map((p) => (
              <div key={p.name} className={`so-plan-card ${p.featured ? "so-featured" : ""}`}>
                {p.featured && <div className="so-plan-badge">Most Popular</div>}
                <div className="so-plan-name">{p.name}</div>
                <div className="so-plan-price">
                  <span className="so-sym">$</span>
                  <span className="so-num">{p.price}</span>
                  <span className="so-mo">/mo</span>
                </div>
                <p className="so-plan-caption">{p.caption}</p>
                <div className="so-plan-otto-tag">🐙 OttoPay.pro free for 6 months</div>
                <ul className="so-plan-features">
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a href="https://workedge.pro" className={`so-btn ${p.featured ? "so-btn-primary" : "so-btn-ghost"}`} style={{ width: "100%", justifyContent: "center" }}>
                  {p.featured ? "Start Free Trial" : "Get Started"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3 YEARS FREE PROMO ─── */}
      <section className="so-three-years">
        <div className="so-three-years-card">
          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="so-three-years-label">🚀 Extended Program</div>
            <h3 className="so-three-years-title">
              Want OttoPay.pro Free<br />for Up to <span className="so-t">3 Years?</span>
            </h3>
            <p className="so-three-years-body">
              If you're serious about scaling clean, fast invoicing, we have an extended OttoPay.pro program that can keep your invoicing free for up to 3 years. Learn how it works and see if you qualify.
            </p>
            <a href="/ottopay-3-years-free" className="so-btn so-btn-primary">Learn How to Get 3 Years Free →</a>
          </div>
          <div className="so-three-years-visual" style={{ position: "relative", zIndex: 2 }}>
            <div className="so-years-badge">3</div>
            <div className="so-years-label">Years<br />Free OttoPay</div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="so-faq-section">
        <div className="so-container">
          <div className="so-section-tag">FAQ</div>
          <h2 className="so-section-title">Common <span className="so-t">Questions</span></h2>
          <div className="so-faq-list">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="so-final-cta">
        <div className="so-container" style={{ position: "relative", zIndex: 2 }}>
          <h2>
            Ready to Run Your<br />
            <span>Business Like a Pro?</span>
          </h2>
          <p>Start your WorkEdge free trial today. No credit card required. OttoPay included free for 6 months.</p>
          <div className="so-btn-row" style={{ justifyContent: "center" }}>
            <a href="https://workedge.pro" className="so-btn so-btn-primary so-btn-lg">
              Start WorkEdge + OttoPay — Free
              <ArrowRight className="h-[18px] w-[18px]" />
            </a>
            <a href="https://ottopay.pro" className="so-btn so-btn-ghost so-btn-lg">Explore OttoPay.pro →</a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="so-footer">
        <div className="so-footer-brand">WorkEdge.pro <span className="so-t">+ OttoPay.pro</span></div>
        <ul className="so-footer-links">
          <li><a href="https://workedge.pro">WorkEdge.pro</a></li>
          <li><a href="https://ottopay.pro">OttoPay.pro</a></li>
          <li><a href="/ottopay-3-years-free">3 Years Free</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
        </ul>
        <div className="so-footer-copy">© 2025 WorkEdge Pro. All rights reserved.</div>
      </footer>
    </div>
  );
}
