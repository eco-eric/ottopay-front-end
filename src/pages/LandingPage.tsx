import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Check, HardHat, BadgePercent, Landmark } from "lucide-react";

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Otto Pay",
  url: "https://ottopay.pro/",
  logo: "https://ottopay.pro/assets/otto-logo-1200.png",
  description:
    "Professional invoicing built for HVAC contractors. Create invoices in 30 seconds, accept payments instantly.",
};

const SOFTWARE_APP_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Otto Pay",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://ottopay.pro/",
  description:
    "Smart invoicing for HVAC contractors — invoice in 30 seconds, accept payments instantly, offer customer financing.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const painPoints = [
  { emoji: "📝", title: "Handwriting invoices at 9pm", desc: "You finished the job at 3. You're still doing paperwork after dinner. That's broken." },
  { emoji: "📱", title: '"Can you send that again?"', desc: "Texting photos of handwritten invoices. Customers lose them. You look unprofessional." },
  { emoji: "⏳", title: "Net 30? More like net never", desc: "The longer the gap between job done and invoice sent, the harder it is to collect." },
  { emoji: "💸", title: "Overpaying for software", desc: "ServiceTitan and Housecall Pro are built for big companies. You just need to get paid." },
];

const steps = [
  { num: "1", title: "Finish the job", desc: "Snap photos of the work, select from your saved services (AC tune-up, furnace repair, duct cleaning — whatever you do), and Otto fills in the line items.", time: "⚡ 15 seconds" },
  { num: "2", title: "Hit send", desc: "Text or email a professional invoice directly from your phone. Your customer gets it before you pull out of the driveway. Your branding, your terms, done.", time: "⚡ 10 seconds" },
  { num: "3", title: "Get paid", desc: "Customers pay by card right from the invoice link. No chasing, no \"I'll mail a check,\" no awkward conversations. Money hits your account.", time: "💰 Instant" },
];

const features = [
  { emoji: "⚡", title: "30-Second Invoices", desc: "Service templates pre-loaded with your prices. Tap, customize, send. Done before the customer closes the front door." },
  { emoji: "💳", title: "Card Payments Built In", desc: "Stripe-powered online payments. Customer taps a link, enters their card, you get paid. No extra hardware." },
  { emoji: "📡", title: "Works Offline", desc: "Basements, attics, crawlspaces — places with zero signal. Create invoices offline, they send when you're back in range." },
  { emoji: "📸", title: "Photo Documentation", desc: "Attach before/after photos to invoices. Shows customers what you did. Protects you if there's ever a question." },
  { emoji: "🔧", title: "Equipment Tracking", desc: "Log the units you install and service. Know the brand, model, and warranty status for every customer." },
  { emoji: "📊", title: "Know Your Numbers", desc: "Revenue reports, tax summaries, payment tracking. See exactly how your business is doing without a spreadsheet." },
  { emoji: "financing", title: "Built-in Customer Financing", desc: "Every invoice automatically offers Klarna, Affirm, and Afterpay at checkout. Give customers flexibility on $3K–$15K jobs and stop losing bids to 'I need to think about it.'" },
];

const personas = [
  { emoji: "🔧", title: "The Solo Operator", desc: "It's your van, your tools, your hustle. You don't need a $300/month platform. You need to get paid faster.", tag: "Most popular" },
  { emoji: "👷", title: "Owner + 1 or 2 Guys", desc: "You're still on the jobsite every day. Your helper is great with ductwork but terrible with paperwork. Otto handles it.", tag: null },
  { emoji: "🚀", title: "Just Getting Started", desc: "Freshly licensed and building your customer base. Look professional from day one without the enterprise price tag.", tag: null },
];

const trades = ["Plumbing", "Electrical", "Appliance Repair", "Handyman", "Landscaping", "Pest Control"];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <meta property="og:image" content="https://ottopay.pro/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Otto Pay — Smart Invoicing for HVAC Contractors" />
        <meta name="twitter:image" content="https://ottopay.pro/og-image.png" />
        <meta name="twitter:image:alt" content="Otto Pay — Smart Invoicing for HVAC Contractors" />
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_JSONLD)}</script>
        <script type="application/ld+json">{JSON.stringify(SOFTWARE_APP_JSONLD)}</script>
      </Helmet>
      <MarketingHeader />

      {/* Hero */}
      <section className="relative flex flex-col justify-end md:justify-center px-6 md:px-12 pt-24 pb-20 md:min-h-[100svh] md:py-32 overflow-hidden"
        style={{ background: "linear-gradient(165deg, #042f2e 0%, #0a3d38 35%, hsl(var(--primary-hover)) 100%)" }}>
        {/* Glow orb */}
        <div className="absolute -top-1/2 -right-[30%] w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-[720px] animate-[fadeUp_0.6s_ease-out_both]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-6"
            style={{ background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.2)", color: "#2DD4BF" }}>
            <HardHat className="h-3.5 w-3.5" /> Built for Field Service Contractors
          </div>
          <h1 className="text-[clamp(2.25rem,7vw,4rem)] font-extrabold leading-[1.08] text-white tracking-tight mb-5">
            Invoice sent.<br />
            <span className="text-[#2DD4BF]">Paid before you<br />leave the driveway.</span>
          </h1>
          <p className="text-[clamp(1.05rem,2.5vw,1.3rem)] text-white/70 leading-relaxed mb-8 max-w-[520px]">
            You just fixed the AC. Don't go home and do paperwork too. Otto Pay lets you invoice in 30 seconds and get paid on the spot.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link to="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[14px] font-bold text-lg no-underline transition-all hover:-translate-y-0.5 bg-warning text-foreground shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)]">
              Start Free — No Card Needed
            </Link>
            <Link to="/why-us" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] font-semibold no-underline transition-all text-white/90 border border-white/15 hover:border-white/30"
              style={{ background: "rgba(255,255,255,0.08)" }}>
              See How It Works
            </Link>
          </div>
          <div className="flex flex-wrap gap-5 text-white/50 text-sm">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#2DD4BF]" /> Free to start</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#2DD4BF]" /> Works offline</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#2DD4BF]" /> Accept cards instantly</span>
          </div>
        </div>
      </section>

      {/* Financing Announcement Banner */}
      <div className="w-full bg-accent text-center py-2 px-4">
        <p className="text-sm font-medium text-accent-foreground">
          ✦ New — Customer financing now available on all invoices. Powered by Klarna, Affirm & Afterpay.
        </p>
      </div>

      {/* Pain Points */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-background">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[clamp(1.6rem,4.5vw,2.5rem)] font-extrabold tracking-tight leading-[1.15] text-foreground mb-4">
            You didn't become a contractor to <span className="text-primary">chase payments</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-[600px]">
            You got into the trades because you're good with your hands. But somehow half your evening goes to invoicing, texting customers, and wondering if that check is ever coming.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {painPoints.map((p) => (
              <div key={p.title} className="flex items-start gap-4 p-5 bg-secondary rounded-2xl border border-border hover:border-primary/20 hover:shadow-md transition-all">
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl text-xl"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-hover)))" }}>
                  {p.emoji}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-accent/30">
        <div className="max-w-[900px] mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.1em] text-primary mb-3 font-mono">How Otto Works</span>
          <h2 className="text-[clamp(1.6rem,4.5vw,2.5rem)] font-extrabold tracking-tight leading-[1.15] text-foreground mb-12">
            Three taps. Invoice sent. Money coming.
          </h2>
          <div className="relative">
            {steps.map((s, i) => (
              <div key={s.num} className="grid grid-cols-[56px_1fr] gap-5 pb-10 last:pb-0 relative">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground rounded-2xl font-mono font-bold text-xl shrink-0">
                    {s.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 mt-2"
                      style={{ background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary) / 0.1))" }} />
                  )}
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-primary/10 rounded-md text-xs font-bold text-primary font-mono">
                    {s.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Quote */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="text-[clamp(1.2rem,3vw,1.6rem)] font-medium text-foreground leading-relaxed italic relative">
            <span className="text-5xl font-extrabold text-primary leading-none not-italic relative top-3 mr-1">"</span>
            I used to spend Sunday evenings catching up on invoices. Now I send them from the truck. My wife noticed before I did.
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <strong className="text-foreground">Mike R.</strong> · Solo HVAC contractor, Dallas TX
          </div>
        </div>
      </section>

      {/* Customer Financing */}
      <section className="py-20 md:py-24 px-6 md:px-12 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(165deg, #042f2e 0%, #0a3d38 35%, hsl(var(--primary-hover)) 100%)" }}>
        <div className="absolute -top-1/3 -right-[20%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.1) 0%, transparent 65%)" }} />
        <div className="relative z-10 max-w-[900px] mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-6"
            style={{ background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.25)", color: "#2DD4BF" }}>
            <Landmark className="h-3.5 w-3.5" /> Game Changer for Small Contractors
          </span>
          <h2 className="text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold tracking-tight leading-[1.1] text-white mb-4">
            Offer customer financing.<br /><span className="text-[#2DD4BF]">No bank. No credit check on you.</span>
          </h2>
          <p className="text-[clamp(1rem,2.5vw,1.2rem)] text-white/65 leading-relaxed max-w-[600px] mb-10">
            Big companies offer payment plans. Now you can too. Every Otto Pay invoice automatically gives your customers the option to pay over time — while <strong className="text-white">you get paid in full, upfront</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="text-base font-bold text-white mb-1">Win bigger jobs</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                A $5,000 HVAC install is a big ask. But "$208/month for 24 months" closes deals. Stop losing bids to "let me think about it."
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-base font-bold text-white mb-1">You get paid in full — immediately</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                The financing company pays you. The customer pays them back over time. Zero risk to your cash flow.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-base font-bold text-white mb-1">Zero setup for you</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                No merchant accounts, no applications, no credit checks on your end. It's built into every invoice link automatically.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-base font-bold text-white mb-1">Look like the big guys</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                Most solo contractors can't offer financing. You can. That's a competitive edge that builds trust and wins referrals.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Klarna", "Affirm", "Afterpay", "Cash App Pay"].map((provider) => (
              <span key={provider} className="px-4 py-2 rounded-xl text-sm font-semibold border border-[#2DD4BF]/25 text-[#2DD4BF]"
                style={{ background: "rgba(45,212,191,0.08)" }}>
                {provider}
              </span>
            ))}
          </div>

          <div className="p-5 rounded-2xl border border-[#2DD4BF]/15 text-center max-w-[600px] mx-auto"
            style={{ background: "rgba(45,212,191,0.06)" }}>
            <p className="text-sm text-white/70 leading-relaxed">
              <strong className="text-[#2DD4BF]">Real talk:</strong> Most small contractors lose jobs on price because they can't offer payment plans. 
              With Otto Pay, a $4,500 furnace replacement becomes "$187/month" — and the customer says yes on the spot.
            </p>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-20 md:py-24 px-6 md:px-12 text-white"
        style={{ background: "linear-gradient(165deg, #042f2e 0%, #0a3d38 100%)" }}>
        <div className="max-w-[1000px] mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.1em] text-[#2DD4BF] mb-3 font-mono">What You Get</span>
          <h2 className="text-[clamp(1.6rem,4.5vw,2.5rem)] font-extrabold tracking-tight leading-[1.15] text-white mb-3">
            Everything a one-man shop needs. Nothing you don't.
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-[500px]">
            No bloated feature lists. No enterprise nonsense. Just the tools that keep money flowing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border transition-all hover:border-[#2DD4BF]/30"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-3">
                  {f.emoji === "financing" ? <BadgePercent className="h-8 w-8 text-[#2DD4BF]" /> : f.emoji}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/features" className="text-[#2DD4BF] font-semibold no-underline border-b border-[#2DD4BF]/30 pb-0.5 hover:text-white hover:border-white transition-colors">
              See all features →
            </Link>
          </div>
        </div>
      </section>

      {/* Built For You */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-background">
        <div className="max-w-[800px] mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.1em] text-primary mb-3 font-mono">Who It's For</span>
          <h2 className="text-[clamp(1.6rem,4.5vw,2.5rem)] font-extrabold tracking-tight leading-[1.15] text-foreground mb-10">
            Built for the contractor, not the corporation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {personas.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl border border-border bg-secondary hover:border-primary/25 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{p.emoji}</div>
                <h3 className="text-lg font-bold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                {p.tag && (
                  <span className="inline-block mt-3 px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold">
                    {p.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-accent/30 rounded-2xl text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">HVAC is our home base</strong> — but Otto works for any field service pro.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {trades.map((t) => (
                <span key={t} className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-muted-foreground font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 px-6 md:px-12 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-hover)) 100%)" }}>
        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-[600px] mx-auto">
          <h2 className="text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            Stop chasing payments.<br />Start getting paid.
          </h2>
          <p className="text-lg text-white/75 mb-8">
            Set up Otto Pay in 5 minutes. Send your first invoice today. Free to start, no credit card required.
          </p>
          <Link to="/pricing" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-[14px] font-bold text-lg no-underline transition-all hover:-translate-y-0.5 bg-warning text-foreground shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)]">
            Get Started Free →
          </Link>
          <p className="mt-5 text-sm text-white/50">No contracts · Cancel anytime · Your data is always yours</p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
