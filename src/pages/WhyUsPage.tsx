import { Link } from "react-router-dom";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Check, X, ArrowRight, Smartphone, Zap, Shield, BarChart3, Bot, MessageSquare, Search, FileText, Megaphone, Brain, Clock, DollarSign, Wrench, Gift, Landmark } from "lucide-react";
import { appUrl } from "@/lib/appUrl";

const valueProps = [
  { icon: Smartphone, title: "Mobile-First, Field-Ready", desc: "Built for phones, not desktops. Create and send an invoice from the job site before you pull out of the driveway." },
  { icon: Zap, title: "Get Paid Faster", desc: "Send professional invoices via text or email the moment the job is done. Customers pay online — no chasing checks." },
  { icon: Shield, title: "Stripe-Powered Payments", desc: "Bank-level security on every transaction. Card payments, ACH, and manual recording all in one place." },
  { icon: BarChart3, title: "Built for Your Trade", desc: "Equipment tracking, service history, and estimates designed around how HVAC, plumbing, and electrical contractors actually work." },
  { icon: Landmark, title: "Help Customers Say Yes", desc: "Klarna, Affirm, and Afterpay are built into every invoice link. Customers split large jobs into payments — you get paid in full, upfront. No paperwork. No separate account. Just more closed jobs." },
];

const aiFeatures = [
  { icon: Bot, title: "AI Invoice Descriptions", desc: "Describe the job in plain English, Otto writes the professional line items." },
  { icon: MessageSquare, title: "Customer Message Writer", desc: "AI-drafted texts and emails that sound professional, not robotic." },
  { icon: Search, title: "Invoice Analyzer", desc: "Spot patterns in your invoices and get suggestions to improve cash flow." },
  { icon: FileText, title: "Estimate Builder", desc: "Turn job notes into detailed estimates in seconds." },
  { icon: Megaphone, title: "Follow-Up Generator", desc: "Automatically craft polite payment reminders that get results." },
  { icon: Brain, title: "Business Insights", desc: "Plain-English summaries of your revenue trends and top customers." },
];

const comparisonRows = [
  { feature: "Invoices", old: "Paper / Excel", otto: true },
  { feature: "Estimates", old: false, otto: true },
  { feature: "Accept card payments", old: false, otto: true },
  { feature: "Send via email", old: false, otto: true },
  { feature: "Customer & equipment history", old: false, otto: true },
  { feature: "Equipment catalog", old: false, otto: true },
  { feature: "Otto AI tools", old: false, otto: true },
  { feature: "WorkEdge Pro sync", old: false, otto: true },
  { feature: "Cost", old: "—", otto: "Free" },
];

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1628] via-[#1a1a2e] to-[#0d2137] pt-28 pb-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230D9488' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="mb-6 inline-block rounded-full bg-teal-500/20 px-5 py-2 text-sm font-semibold text-teal-300">
            🎉 Free to Start — No Credit Card Required
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Why Contractors Choose<br />
            <span className="text-teal-400">Otto Pay</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            The only invoicing app built for the field. Free to start. Powerful to grow.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={appUrl("/auth?mode=signup")} className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-500/25 transition hover:bg-teal-600">
              Start Free Today <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-lg border border-slate-500 px-8 py-3.5 text-base font-semibold text-slate-200 transition hover:border-slate-300 hover:text-white">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FREE CALLOUT */}
      <section className="bg-teal-50 py-16 dark:bg-teal-950/30">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-extrabold text-foreground sm:text-4xl">
            Start Invoicing for <span className="text-teal-600">Free</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { emoji: "✅", text: "Unlimited invoices & estimates — no caps, no expiration" },
              { emoji: "✅", text: "No credit card required — sign up in 60 seconds" },
              { emoji: "✅", text: "Upgrade anytime: online card payments into your own Stripe account, extra users and the full Otto AI suite" },
            ].map((item) => (
              <div key={item.text} className="rounded-xl border border-teal-200 bg-white p-6 dark:border-teal-800 dark:bg-slate-900">
                <span className="text-2xl">{item.emoji}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Pro is $29/month — or $24/month billed annually. Pays for itself after one invoice.
          </p>
        </div>
      </section>

      {/* 3. VALUE PROPS */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-extrabold text-foreground sm:text-4xl">
            Why Otto Pay <span className="text-teal-600">Wins</span>
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-card p-6 transition hover:shadow-lg hover:shadow-teal-500/5">
                <v.icon className="h-10 w-10 text-teal-500" />
                <h3 className="mt-4 text-lg font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OTTO AI */}
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
            Otto AI — Your Smartest <span className="text-teal-400">Crew Member</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Get access to 6 AI-powered tools that save time and make you look more professional.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aiFeatures.map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 transition hover:border-teal-700">
                <f.icon className="h-8 w-8 text-teal-400" />
                <h3 className="mt-4 text-base font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={appUrl("/auth?mode=signup")} className="inline-flex items-center gap-2 text-teal-400 font-semibold hover:text-teal-300 transition">
              Try Otto AI Free <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-slate-500">
              Free users get 10 free AI description suggestions to try it out. Pro unlocks the full suite.
            </p>
          </div>
        </div>
      </section>

      {/* 5. COMPARISON TABLE */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-3xl font-extrabold text-foreground sm:text-4xl">
            Otto Pay vs. <span className="text-muted-foreground">The Old Way</span>
          </h2>
          <div className="mt-10 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-muted/50 px-6 py-4 text-left font-semibold text-foreground">Feature</th>
                  <th className="bg-muted/50 px-6 py-4 text-center font-semibold text-muted-foreground">The Old Way</th>
                  <th className="bg-teal-600 px-6 py-4 text-center font-bold text-white">Otto Pay</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="px-6 py-3.5 font-medium text-foreground">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center">
                      {row.old === false ? <X className="mx-auto h-5 w-5 text-red-400" /> : <span className="text-muted-foreground">{row.old}</span>}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      {row.otto === true ? <Check className="mx-auto h-5 w-5 text-teal-500" /> : <span className="font-bold text-teal-600">{row.otto}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Pro adds online card payments with no OttoPay fee, extra users and the full Otto AI suite, starting at $29/month.
          </p>
        </div>
      </section>

      {/* 6. WORKEDGE PRO LAUNCH BONUS */}
      <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Gift className="mx-auto h-12 w-12 text-amber-900/80" />
          <h2 className="mt-4 text-3xl font-extrabold text-amber-950 sm:text-4xl">
            Launch Bonus: 25% Off WorkEdge Pro for 1 Year
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-amber-900">
            Sign up for Otto Pay and receive 25% off your first year of WorkEdge Pro — the field documentation platform that syncs directly with your invoices. Track jobs, photos, notes, and equipment all in one connected ecosystem.
          </p>
          <Link to="/pricing" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-900 px-8 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-amber-950">
            Claim Your Bonus <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-amber-800">
            Offer valid for new Otto Pay subscribers during launch period.
          </p>
        </div>
      </section>

      {/* 7. TESTIMONIAL / SOCIAL PROOF */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-3xl font-extrabold text-foreground sm:text-4xl">
            Built by a Contractor,<br />for <span className="text-teal-600">Contractors</span>
          </h2>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-sm">
            <span className="text-5xl leading-none text-teal-400">"</span>
            <p className="mt-2 text-lg italic leading-relaxed text-foreground">
              I used to spend Sunday nights catching up on invoices. Now I send them from the truck before I start the next job. Otto Pay paid for itself the first week.
            </p>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">— Eric L., HVAC Contractor</p>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            {[
              { icon: Clock, stat: "< 60 seconds", label: "to create an invoice" },
              { icon: DollarSign, stat: "$0", label: "to get started" },
              { icon: Wrench, stat: "Built", label: "for the trades" },
            ].map((s) => (
              <div key={s.label}>
                <s.icon className="mx-auto h-7 w-7 text-teal-500" />
                <p className="mt-2 text-2xl font-extrabold text-foreground">{s.stat}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Start Getting Paid Smarter
          </h2>
          <p className="mt-4 text-lg text-teal-100">
            Free to start. No contracts. Cancel anytime.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={appUrl("/auth?mode=signup")} className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-bold text-teal-700 shadow-lg transition hover:bg-teal-50">
              Create Your Free Account <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-lg border border-teal-300 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-teal-500">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
