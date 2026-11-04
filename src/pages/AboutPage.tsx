import { Link } from "react-router-dom";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";

const storyBoxes = [
  { icon: "📝", title: "Evening Paperwork", desc: "Spending 2-3 hours every night entering handwritten invoices into QuickBooks instead of relaxing with family." },
  { icon: "💸", title: "Slow Payments", desc: "Waiting 2-3 weeks to get paid because paper invoices sat in the truck or got lost in the mail." },
  { icon: "🔍", title: "Lost Revenue", desc: "Forgetting to bill for parts or labor because notes were illegible or incomplete." },
  { icon: "😰", title: "Chasing Money", desc: "Having awkward conversations with customers about overdue payments because there was no organized tracking system." },
];

const ottoArms = [
  { icon: "🔧", title: "Service Work", desc: "Repairs and maintenance" },
  { icon: "📞", title: "Customer Calls", desc: "Scheduling and questions" },
  { icon: "💰", title: "Invoicing", desc: "Getting paid" },
  { icon: "📊", title: "Bookkeeping", desc: "Tracking finances" },
  { icon: "🚗", title: "Driving", desc: "Job to job" },
  { icon: "📦", title: "Parts Orders", desc: "Inventory management" },
  { icon: "📱", title: "Marketing", desc: "Finding new customers" },
  { icon: "👨‍👩‍👧", title: "Family Time", desc: "What matters most" },
];

const values = [
  { icon: "🎯", title: "Simplicity First", desc: "If it takes more than 3 clicks, we redesign it. You're standing in a customer's driveway, not sitting at a desk. Every feature is built for speed and ease of use." },
  { icon: "💪", title: "Built for the Field", desc: "Basements, attics, rooftops—places with terrible cell signal. That's why Otto works offline and syncs automatically when you're back online. Because real HVAC work doesn't happen in coffee shops." },
  { icon: "💸", title: "Fair Pricing", desc: "We're contractors too. We know what $29/month means to a solo operator. No hidden charges, no forced upgrades, no nickel-and-diming. Just honest pricing for honest work." },
  { icon: "🤝", title: "We Have Your Back", desc: "When you email support, you talk to real people who understand HVAC. Not a chatbot, not a script-reader in another country. Real contractors who've been there." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Built by Contractors, For Contractors</h1>
          <p className="text-lg md:text-xl opacity-95">The story of how Otto Pay came to be</p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-[1200px] px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">The Problem We Solved</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-[800px]">
            Otto Pay was born from frustration. Real frustration felt by real HVAC contractors who were tired of:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {storyBoxes.map((s) => (
              <div key={s.title} className="bg-card p-8 rounded-xl shadow-sm border border-border">
                <h4 className="text-primary text-xl font-bold mb-3">{s.icon} {s.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-primary mt-12 mb-6">We knew there had to be a better way.</h3>
          <p className="text-lg text-muted-foreground mb-4">Sure, there were invoicing apps out there. But they were either:</p>
          <ul className="text-lg text-muted-foreground ml-8 space-y-2 max-w-[800px] list-disc">
            <li>Too complicated (designed for enterprises, not solo operators)</li>
            <li>Too expensive ($99-$299/month for features we didn't need)</li>
            <li>Too generic (no HVAC-specific templates or equipment tracking)</li>
            <li>Too unreliable in the field (required constant internet connection)</li>
          </ul>
          <p className="text-lg text-muted-foreground mt-8">So we built Otto Pay. An invoicing app that actually understands the HVAC business.</p>
        </div>
      </section>

      {/* Why Otto */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-[1200px] px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why "Otto"?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-[800px]">
            Meet Otto the Octopus. He's got 8 arms, just like you need to handle everything in your business:
          </p>
          <div className="max-w-[400px] mx-auto my-8">
            <img src="/assets/otto-logo-800.png" alt="Otto the Octopus" width={800} height={427} loading="lazy" className="w-full h-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ottoArms.map((a) => (
              <div key={a.title} className="text-center p-6">
                <div className="text-5xl mb-3">{a.icon}</div>
                <h4 className="text-primary font-bold text-lg mb-1">{a.title}</h4>
                <p className="text-muted-foreground text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-lg text-muted-foreground mt-8">Otto takes invoicing off your plate so you can focus on the other seven.</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-[1200px] px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Our Values</h2>
          <div className="space-y-10">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="text-2xl font-bold text-primary mb-3">{v.icon} {v.title}</h3>
                <p className="text-lg text-muted-foreground max-w-[800px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-[1200px] px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who We Serve</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-[800px]">
            Otto Pay was built for solo HVAC contractors—one-person shops doing $80K-$250K in annual revenue. But we welcome anyone in the field service trades:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-primary font-bold text-lg mb-4">✅ You'll love Otto if you:</h4>
              <ul className="text-lg text-muted-foreground space-y-2">
                <li>Do your own service work</li>
                <li>Invoice immediately after jobs</li>
                <li>Want to get paid faster</li>
                <li>Work in areas with poor cell signal</li>
                <li>Need equipment tracking</li>
                <li>Value simplicity over features</li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary font-bold text-lg mb-4">👥 Other trades welcome:</h4>
              <ul className="text-lg text-muted-foreground space-y-2">
                <li>Plumbers</li>
                <li>Electricians</li>
                <li>Handymen</li>
                <li>Landscapers</li>
                <li>Appliance repair</li>
                <li>Any mobile service business</li>
              </ul>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mt-8">We're HVAC-focused in our marketing, but trade-agnostic in our product. If you fix, install, or maintain things, Otto Pay works for you.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-background">
        <div className="mx-auto max-w-[1200px] px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Try Otto?</h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto mb-8">Start with our free plan. No credit card needed. Upgrade when you're ready.</p>
          <Link
            to="/pricing"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-lg no-underline hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
