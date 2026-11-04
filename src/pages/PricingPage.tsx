import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { PLANS, EXTRA_USER_MONTHLY_PRICE, EXTRA_USER_YEARLY_PRICE, TRIAL_DAYS, MAX_CARD_SURCHARGE_PERCENT, type PlanId } from "@/lib/plans";
import { appUrl } from "@/lib/appUrl";

const planCards: { id: PlanId; tagline: string; features: string[]; cta: string }[] = [
  {
    id: "free",
    tagline: "For getting your paperwork in order",
    features: [
      "Unlimited invoices and estimates",
      "Create, track and send by text or email",
      "Customers, jobs and catalog",
      "Record cash, check and other payments",
      "10 Otto AI tries",
      "1 user",
    ],
    cta: "Get started free",
  },
  {
    id: "pro",
    tagline: "For contractors who want to get paid online",
    features: [
      "Everything in Free",
      "Card payments into your own Stripe account",
      "Charge a card on site",
      "Otto AI included",
      "Reports and data export",
      `2 users included, $${EXTRA_USER_MONTHLY_PRICE}/mo per extra user`,
    ],
    cta: `Start ${TRIAL_DAYS}-day free trial`,
  },
  {
    id: "team",
    tagline: "For crews and office staff",
    features: [
      "Everything in Pro",
      "10 users included",
      `$${EXTRA_USER_MONTHLY_PRICE}/mo per extra user after 10`,
      "One bill for the whole team",
    ],
    cta: "Get started",
  },
];

const aiFeatures = [
  "Smart line item descriptions: describe a job in plain English and Otto writes the professional version",
  "Estimate builder: describe the job and Otto drafts line items from your catalog",
  "Receipt and parts scanning: snap a photo and Otto fills in the details",
];

const faqs = [
  {
    q: "Does OttoPay take a cut of my card payments?",
    a: "No. You connect your own Stripe account and card payments go straight into it. Stripe charges its standard processing fee to your account (2.9% + 30¢ for most US cards). OttoPay adds nothing on top.",
  },
  {
    q: "Can I pass the card fee to my customers?",
    a: `Yes, if you want to. Turn on the card fee and customers who pay by card see a separate fee of up to ${MAX_CARD_SURCHARGE_PERCENT}%. Cash, check and bank transfer stay at the invoice total. Some states limit or ban card surcharges, so check your state's rules first.`,
  },
  {
    q: "I don't have a Stripe account. Is that a problem?",
    a: "No. When you connect, Stripe lets you sign in to an existing account or open a free one in a few minutes. Your Stripe account is yours, and Stripe pays out to your bank.",
  },
  {
    q: "What's included in the free trial?",
    a: `Everything in Pro for ${TRIAL_DAYS} days, no card needed. Add a card before the trial ends to keep Pro. If you don't, you move to Free and keep all your invoices and estimates.`,
  },
  {
    q: "How do extra users work?",
    a: `Pro includes 2 users and Team includes 10. Each extra user is $${EXTRA_USER_MONTHLY_PRICE}/month, or $${EXTRA_USER_YEARLY_PRICE}/year on yearly plans, added to the same bill. Free is for one person.`,
  },
  {
    q: "Can I change or cancel anytime?",
    a: "Yes. Switch plans or between monthly and yearly from Settings. If you cancel, you keep your plan until the end of the billing period, then move to Free.",
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketingHeader />

      {/* ── HERO ── */}
      <section className="text-center pt-24 pb-12 px-6 max-w-[760px] mx-auto">
        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-[13px] font-semibold tracking-wide mb-5">
          💳 No fees on your payments
        </span>
        <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight mb-4">
          Simple pricing.<br /><span className="text-primary">Your money stays yours.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-[580px] mx-auto leading-relaxed">
          One flat monthly price. Card payments go into your own Stripe account and OttoPay never takes a cut.
        </p>
      </section>

      {/* ── PLANS ── */}
      <section className="px-6 pb-16">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setYearly(false)}
              className={cn("px-4 py-2 rounded-lg text-sm font-semibold transition-colors", !yearly ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn("px-4 py-2 rounded-lg text-sm font-semibold transition-colors", yearly ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
            >
              Yearly <span className="ml-1 text-[11px] opacity-80">2 months free</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {planCards.map(({ id, tagline, features, cta }) => {
              const plan = PLANS[id];
              const price = yearly ? plan.yearlyMonthlyPrice : plan.monthlyPrice;
              const featured = id === "pro";
              return (
                <div
                  key={id}
                  className={cn(
                    "bg-card rounded-2xl p-6 flex flex-col",
                    featured ? "border-2 border-primary bg-gradient-to-br from-primary/5 to-transparent" : "border border-border"
                  )}
                >
                  <div className={cn("text-xs font-bold uppercase tracking-wider mb-2", featured ? "text-primary" : "text-muted-foreground")}>
                    {plan.name}{featured && " · Most popular"}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-extrabold tracking-tight">${price}</span>
                    {id !== "free" && <span className="text-sm text-muted-foreground">/mo</span>}
                  </div>
                  <div className="text-xs text-muted-foreground mb-4 min-h-[16px]">
                    {id === "free" ? "Free forever" : yearly ? `Billed $${plan.yearlyMonthlyPrice * 12} a year` : "Billed monthly"}
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">{tagline}</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={appUrl("/auth?mode=signup")}
                    className={cn(
                      "inline-flex items-center justify-center px-5 py-3 rounded-xl font-bold text-sm no-underline transition-all hover:-translate-y-0.5",
                      featured ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    )}
                  >
                    {cta}
                  </a>
                  {id === "pro" && <p className="text-[11px] text-muted-foreground text-center mt-2">No card needed for the trial</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── YOUR PAYMENTS, YOUR STRIPE ── */}
      <section className="py-16 px-6 bg-accent/30">
        <div className="max-w-[860px] mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-3">Your payments. Your Stripe account.</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-[620px] mx-auto leading-relaxed">
            Connect the Stripe account you already have, or open one in minutes. Customers pay you directly and Stripe pays out to your bank.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">OttoPay fee</div>
              <div className="text-3xl font-extrabold tracking-tight mb-2">$0</div>
              <p className="text-sm text-muted-foreground">No platform fee on any payment, on any plan.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Stripe card fee</div>
              <div className="text-3xl font-extrabold tracking-tight mb-2">2.9% + 30¢</div>
              <p className="text-sm text-muted-foreground">Stripe's standard US rate, charged by Stripe to your own account.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-success mb-2">Optional card fee</div>
              <div className="text-3xl font-extrabold tracking-tight mb-2">Up to {MAX_CARD_SURCHARGE_PERCENT}%</div>
              <p className="text-sm text-muted-foreground">Pass the cost to customers who pay by card. On a $500 invoice they pay $515; cash stays $500.</p>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            Card surcharges are limited or not allowed in some states. Check your state's rules before turning on the card fee.
          </p>
        </div>
      </section>

      {/* ── AI ── */}
      <section className="py-16 px-6">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">Otto AI, included in Pro and Team</h2>
            <p className="text-muted-foreground max-w-[500px] mx-auto">Try it free 10 times on any plan.</p>
          </div>
          <div className="space-y-3 max-w-[560px] mx-auto">
            {aiFeatures.map((f) => (
              <div key={f} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                </span>
                <p className="text-sm text-foreground leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6 bg-accent/30">
        <div className="max-w-[760px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-8">Questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="bg-card border border-border rounded-2xl p-5">
                <p className="font-semibold text-sm mb-1.5">{f.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-20 md:py-24 px-6 md:px-12 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-hover)) 100%)" }}>
        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 60%)" }} />
        <span className="absolute -right-5 -top-5 text-[120px] opacity-[0.08] pointer-events-none">🐙</span>
        <div className="relative z-10 max-w-[550px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2.5">
            Start free. Upgrade when you're ready.
          </h2>
          <p className="text-base text-white/80 mb-7 max-w-[480px] mx-auto">
            Join contractors across the trades who get paid faster with Otto Pay.
          </p>
          <a
            href={appUrl("/auth?mode=signup")}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-[14px] font-bold text-[15px] no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Create your free account →
          </a>
          <p className="mt-5 text-sm text-white/50">Free plan forever · {TRIAL_DAYS}-day Pro trial, no card needed · Your data is always yours</p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
