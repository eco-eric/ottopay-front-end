import { Link } from "react-router-dom";
import { Landmark } from "lucide-react";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Check, X } from "lucide-react";

type BadgeType = "core" | "payments" | "mobile" | "pro";

const badgeStyles: Record<BadgeType, string> = {
  core: "bg-primary/10 text-primary",
  payments: "bg-warning/10 text-warning",
  mobile: "bg-info/10 text-info",
  pro: "bg-success/10 text-success",
};

interface FeatureSection {
  badge: { type: BadgeType; label: string };
  title: string;
  subtitle: string;
  details: { emoji: string; title: string; desc: string; pills?: string[] }[];
  highlight?: { icon: string; text: string };
}

const sections: FeatureSection[] = [
  {
    badge: { type: "core", label: "⚡ Core" },
    title: "Invoicing that takes seconds, not hours",
    subtitle: "The job's done. Now get paid. Otto turns your service into a professional invoice before you're back in the truck.",
    details: [
      { emoji: "📋", title: "Service Templates", desc: "Pre-load your common jobs — AC tune-up, furnace repair, duct cleaning — with your prices. One tap to add them to an invoice." },
      { emoji: "✏️", title: "Custom Line Items", desc: "Add materials, labor, trip charges. Adjust quantities and pricing on the fly. Everything calculates automatically." },
      { emoji: "🎨", title: "Your Branding", desc: "Your logo, your colors, your terms. Invoices look like they came from a company 10x your size." },
      { emoji: "📸", title: "Photo Attachments", desc: "Snap before/after shots. Attach them to invoices. Customers see the work, you have documentation." },
      { emoji: "📤", title: "Send via Email", desc: "One tap — customer gets a professional invoice with a pay button. Email delivery means they actually see it." },
      { emoji: "🔢", title: "Auto-Numbering", desc: "Sequential invoice numbers, custom prefixes, year formatting. Organized without thinking about it." },
    ],
    highlight: { icon: "💡", text: "Most solo contractors create invoices 2-3 days after the job. With Otto, the average is under 2 minutes. That's not marketing — that's math." },
  },
  {
    badge: { type: "core", label: "📝 Core" },
    title: "Estimates that close deals",
    subtitle: "Send professional estimates from the customer's kitchen. They accept on their phone. You convert it to an invoice with one tap.",
    details: [
      { emoji: "✅", title: "Online Acceptance", desc: "Customer gets a link, reviews line items, and accepts with their name. No printing, scanning, or playing phone tag." },
      { emoji: "🔄", title: "One-Tap Convert", desc: "Accepted estimate? Convert it to a live invoice instantly. All line items, notes, and terms carry over." },
      { emoji: "⏰", title: "Expiration Dates", desc: "Set validity periods so customers know to act. Expired estimates auto-update their status." },
      { emoji: "📊", title: "Track Every Status", desc: "Draft, sent, accepted, declined, expired, converted — always know exactly where each estimate stands." },
    ],
  },
  {
    badge: { type: "payments", label: "💳 Payments" },
    title: "Get paid right from the invoice",
    subtitle: "Customers tap a link and pay with their card. No hardware. No app for them to download. Money goes to your bank.",
    details: [
      { emoji: "💳", title: "Card Payments via Stripe", desc: "Powered by Stripe Connect — the same platform Shopify and Lyft use. Secure, reliable, industry standard." },
      { emoji: "🔗", title: "Pay-by-Link", desc: "Every invoice has a unique payment link. Send via text and customers can pay in 30 seconds from their phone." },
      { emoji: "financing", title: "Customer Financing", desc: "Offer Klarna, Affirm, Afterpay, and Cash App Pay directly from the invoice link. Customers pay over time — you get paid in full, upfront.", pills: ["Klarna", "Affirm", "Afterpay", "Cash App Pay"] },
      { emoji: "💵", title: "Record Cash & Checks", desc: "Not every payment is digital. Log cash, check, and other payment methods to keep your books complete." },
      { emoji: "📑", title: "Partial Payments", desc: "Customer wants to pay half now, half on completion? Otto tracks partial payments and remaining balances automatically." },
      { emoji: "🧾", title: "Auto Receipts", desc: "Payments trigger automatic receipts via email or text. Professional, branded, no extra work from you." },
      { emoji: "📈", title: "Payment History", desc: "Full audit trail of every payment, when it came in, and how. Tax season just got easier." },
    ],
    highlight: { icon: "📊", text: "Contractors who offer card payments get paid 3x faster on average. Your customers already pay for everything else on their phone — why not your invoice?" },
  },
  {
    badge: { type: "mobile", label: "📱 Mobile First" },
    title: "Built for basements, attics, and dead zones",
    subtitle: "Real HVAC work happens where cell towers can't reach. Otto was designed for the field, not the office. Available as a mobile web app and native iOS & Android apps.",
    details: [
      { emoji: "📡", title: "Full Offline Mode", desc: "Create invoices with zero bars. Everything saves locally and syncs the moment you get signal back. No data lost." },
      { emoji: "👆", title: "Thumb-Friendly Design", desc: "Big buttons, simple flows, designed for one-handed use. Because your other hand is holding a flashlight." },
      { emoji: "🚀", title: "Fast on Any Phone", desc: "Not everyone has the latest iPhone. Otto runs smooth on any modern smartphone — no lag, no crashes." },
      { emoji: "📷", title: "Camera Integration", desc: "Snap photos of equipment, model numbers, or completed work directly from the app. No switching between apps." },
    ],
  },
  {
    badge: { type: "pro", label: "🔧 Professional" },
    title: "Know your customers' equipment cold",
    subtitle: "Mrs. Johnson's Trane XR15? Installed 2019, warranty expires next year. You'll know before you knock on the door.",
    details: [
      { emoji: "👤", title: "Customer Profiles", desc: "Name, address, phone, email, full invoice history. Everything in one place, searchable in seconds." },
      { emoji: "🔧", title: "Equipment Records", desc: "Track brand, model, serial, capacity, install date, and warranty for every unit at every address." },
      { emoji: "📦", title: "Materials Catalog", desc: "Build your parts and materials list with costs and markup. Add items to invoices with accurate pricing every time." },
      { emoji: "📜", title: "Service History", desc: "See every invoice, every estimate, every visit for each customer. Walk in informed, look professional." },
    ],
  },
  {
    badge: { type: "pro", label: "📊 Business Tools" },
    title: "Run your business by the numbers",
    subtitle: "You don't need an accountant to know if you're having a good month. Otto shows you.",
    details: [
      { emoji: "📊", title: "Revenue Reports", desc: "See income by week, month, or quarter. Spot trends, slow seasons, and growth at a glance." },
      { emoji: "🏛️", title: "Tax Summaries", desc: "Total collected tax broken down by period. Hand it to your accountant and save hours of back-and-forth." },
      { emoji: "🔔", title: "Payment Reminders", desc: "Automated follow-ups for unpaid invoices. Set the schedule, Otto does the nagging so you don't have to." },
      { emoji: "📥", title: "Data Export", desc: "Export invoices and reports as CSV. Works with QuickBooks, Excel, or whatever your accountant uses." },
    ],
  },
];

const comparisonRows = [
  { feature: "30-second invoicing", otto: true, other: false },
  { feature: "Works offline", otto: true, other: false },
  { feature: "Built-in card payments", otto: true, other: "$$$" },
  { feature: "Equipment tracking", otto: true, other: false },
  { feature: "Email invoice delivery", otto: true, other: "~" },
  { feature: "No monthly minimum", otto: true, other: false },
  { feature: "Solo-contractor friendly", otto: true, other: false },
  { feature: "Setup in 5 minutes", otto: true, other: false },
];

const roadmapItems = [
  { emoji: "🐙", title: "AI-Powered Invoicing", desc: "Otto learns your pricing and suggests line items", tag: "Live" },
  { emoji: "📋", title: "Field Documentation Integration", desc: "Job notes → invoice automatically via WorkEdge Pro", tag: "Live" },
  { emoji: "📱", title: "Native iOS & Android Apps", desc: "Dedicated mobile apps for even faster field use", tag: "Live" },
  { emoji: "🤖", title: "Automated Follow-Ups", desc: "Smart reminders that know when and how to nudge", tag: "Live" },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 md:px-12 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(165deg, #042f2e 0%, #0a3d38 50%, hsl(var(--primary-hover)) 100%)" }}>
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-[700px] mx-auto animate-[fadeUp_0.6s_ease-out_both]">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#2DD4BF] mb-4 font-mono">
            <span className="px-2.5 py-1 rounded-full bg-[#2DD4BF]/15 border border-[#2DD4BF]/30">Free Forever</span>
            <span className="text-white/40">·</span>
            <span>No Monthly Cost</span>
          </span>
          <h1 className="text-[clamp(2rem,6vw,3.25rem)] font-extrabold leading-[1.1] text-white tracking-tight mb-4">
            Invoicing & a lite CRM.<br /><span className="text-[#2DD4BF]">$0/month. Seriously.</span>
          </h1>
          <p className="text-[clamp(1rem,2.5vw,1.2rem)] text-white/60 leading-relaxed max-w-[540px] mx-auto mb-6">
            Unlimited invoices, estimates, customer management and equipment tracking, all free. Try Otto AI free, and upgrade to Pro when you want to take card payments online.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-white/40">
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Unlimited Invoices</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Customer CRM</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Equipment Tracking</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">Cash & Check Tracking</span>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      {sections.map((section, idx) => (
        <section key={section.title} className={`py-16 md:py-20 px-6 md:px-12 ${idx % 2 === 1 ? "bg-secondary" : "bg-background"}`}>
          <div className="max-w-[900px] mx-auto">
            <div className="mb-10">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold mb-3 ${badgeStyles[section.badge.type]}`}>
                {section.badge.label}
              </span>
              <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-tight leading-[1.15] text-foreground mb-2">
                {section.title}
              </h2>
              <p className="text-base text-muted-foreground max-w-[550px]">{section.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.details.map((d) => (
                <div key={d.title} className="p-5 bg-card border border-border rounded-[14px] hover:border-primary/20 hover:shadow-md hover:-translate-y-px transition-all">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-accent rounded-[10px] text-xl mb-3">
                    {d.emoji === "financing" ? <Landmark className="w-5 h-5 text-primary" /> : d.emoji}
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  {d.pills && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {d.pills.map((pill) => (
                        <span key={pill} className="px-2 py-0.5 rounded-md text-[0.65rem] font-semibold bg-muted text-muted-foreground">{pill}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {section.highlight && (
              <div className="mt-6 p-5 rounded-[14px] flex items-start gap-3 border border-primary/10"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--primary) / 0.02))" }}>
                <span className="text-xl shrink-0 mt-0.5">{section.highlight.icon}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-accent-foreground">Real talk:</strong> {section.highlight.text}
                </p>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Financing Section */}
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
            Big companies offer payment plans. Now you can too. Every Otto Pay invoice automatically gives your customers the option to pay over time through Klarna, Affirm, Afterpay, and Cash App Pay — while <strong className="text-white">you get paid in full, upfront</strong>.
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

      {/* Comparison */}
      <section className="py-16 md:py-20 px-6 md:px-12 text-white"
        style={{ background: "linear-gradient(165deg, #042f2e 0%, #0a3d38 100%)" }}>
        <div className="max-w-[700px] mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.1em] text-[#2DD4BF] mb-3 font-mono">How We Stack Up</span>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-tight leading-[1.15] text-white mb-2">
            Otto Pay vs. "the big guys"
          </h2>
          <p className="text-white/50 text-base mb-10">Built different. Priced different. Actually built for you.</p>

          <div className="space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_60px_60px] md:grid-cols-[1fr_80px_80px] items-center gap-3 px-4 pb-2 border-b border-white/10 text-[0.7rem] font-bold uppercase tracking-wider text-white/40">
              <span />
              <span className="text-center">Otto</span>
              <span className="text-center">Others</span>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.feature} className="grid grid-cols-[1fr_60px_60px] md:grid-cols-[1fr_80px_80px] items-center gap-3 px-4 py-3 rounded-[10px] text-sm"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <span className="text-white/80 font-medium">{row.feature}</span>
                <span className="text-center text-[#2DD4BF] font-bold">
                  {row.otto === true ? "✓" : row.otto}
                </span>
                <span className="text-center text-white/30 font-bold">
                  {row.other === false ? "✗" : row.other}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background">
        <div className="max-w-[700px] mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.1em] text-primary mb-3 font-mono">What's Live</span>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-tight leading-[1.15] text-foreground mb-2">
            Everything you need, built in
          </h2>
          <p className="text-base text-muted-foreground mb-10">
            Otto Pay is part of the WorkEdge Pro ecosystem. Here's what's included:
          </p>
          <div className="space-y-3">
            {roadmapItems.map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-4 bg-secondary border border-border rounded-xl">
                <span className="text-2xl shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <span className="shrink-0 px-2 py-1 bg-success/15 text-success rounded-md text-[0.65rem] font-bold uppercase tracking-wide">
                  {item.tag}
                </span>
              </div>
            ))}
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
            Ready to see it for yourself?
          </h2>
          <p className="text-lg text-white/75 mb-8">
            Five minutes to set up. Send your first invoice today. Zero risk.
          </p>
          <Link to="/pricing" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-[14px] font-bold text-lg no-underline transition-all hover:-translate-y-0.5 bg-warning text-foreground shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)]">
            Get Started Free →
          </Link>
          <p className="mt-5 text-sm text-white/50">No credit card · No contracts · Cancel anytime</p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
