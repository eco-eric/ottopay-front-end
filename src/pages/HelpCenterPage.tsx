import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, Play, BookOpen, FileText, CreditCard, Users, Settings, Rocket, ArrowRight } from "lucide-react";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { id: "getting-started", label: "Getting Started", icon: Rocket, emoji: "🚀", desc: "Set up your account and send your first invoice" },
  { id: "invoicing", label: "Invoicing", icon: FileText, emoji: "📄", desc: "Create, send, and manage professional invoices" },
  { id: "estimates", label: "Estimates", icon: BookOpen, emoji: "📝", desc: "Win more jobs with polished estimates" },
  { id: "payments", label: "Payments", icon: CreditCard, emoji: "💳", desc: "Accept payments and track your income" },
  { id: "customers", label: "Customers", icon: Users, emoji: "👥", desc: "Manage contacts, equipment, and history" },
  { id: "account", label: "Account & Settings", icon: Settings, emoji: "⚙️", desc: "Customize your profile and preferences" },
];

const guides = [
  {
    title: "Creating Your First Invoice",
    steps: [
      "Navigate to Invoices from the sidebar and click 'New Invoice'.",
      "Select an existing customer or add a new one with their name, email, and phone.",
      "Add line items for your services — description, quantity, and unit price.",
      "Review the subtotal, tax, and total. Add any notes or terms.",
      "Click 'Send' to deliver the invoice via email or copy the payment link to text it.",
    ],
  },
  {
    title: "Adding a New Customer",
    steps: [
      "Go to Customers from the sidebar and click 'Add Customer'.",
      "Enter the customer's name, email, phone, and address.",
      "Optionally add equipment records (brand, model, serial number, install date).",
      "Save the customer — they'll now appear in dropdowns when creating invoices or estimates.",
    ],
  },
  {
    title: "Setting Up Stripe Payments",
    steps: [
      "Go to Settings → Payments and click 'Connect Stripe'.",
      "Follow the Stripe onboarding flow to verify your identity and bank account.",
      "Once connected, your invoices will automatically include a 'Pay Now' button.",
      "Customers can pay by card directly from the invoice link — funds go to your bank.",
    ],
  },
  {
    title: "Sending an Estimate & Converting to Invoice",
    steps: [
      "Navigate to Estimates and click 'New Estimate'.",
      "Add your customer, line items, and an expiration date.",
      "Send the estimate — your customer receives a link to review and accept online.",
      "Once accepted, open the estimate and click 'Convert to Invoice' to create an invoice with all the details carried over.",
    ],
  },
  {
    title: "Customizing Your Business Profile",
    steps: [
      "Go to Settings → Business Profile.",
      "Upload your logo, set your business name, address, and contact info.",
      "Choose your brand color — it'll appear on invoices, estimates, and payment pages.",
      "Set default payment terms, tax rates, and invoice notes to save time on every document.",
    ],
  },
];

const videoPlaceholders = [
  { title: "Quick Start: Your First Invoice", duration: "3:45", category: "Getting Started" },
  { title: "Setting Up Online Payments", duration: "5:20", category: "Payments" },
  { title: "Managing Customers & Equipment", duration: "4:15", category: "Customers" },
  { title: "Estimates to Invoices Workflow", duration: "6:00", category: "Invoicing" },
  { title: "Reports & Tax Summaries", duration: "3:30", category: "Business Tools" },
  { title: "Mobile Tips & Offline Mode", duration: "4:50", category: "Mobile" },
];

const faqData: Record<string, { q: string; a: string }[]> = {
  general: [
    { q: "What is Otto Pay?", a: "Otto Pay is an invoicing and payment platform built specifically for field service contractors like HVAC techs, plumbers, and electricians. It helps you create invoices, send estimates, accept payments, and manage customers — all from your phone or computer." },
    { q: "Is Otto Pay free to use?", a: "Yes. The Free plan gives one user unlimited invoices and estimates with no monthly cost. Pro ($29/month, 2 users) and Team ($59/month, up to 10 users) add online card payments, reports, data export and the full Otto AI. Pro comes with a 14-day free trial, no card needed." },
    { q: "Do my customers need an account to pay?", a: "Nope. Customers receive a payment link via email and can pay instantly with their card. No app download or account creation required." },
    { q: "Can I use Otto Pay on my phone?", a: "Absolutely. Otto Pay is fully responsive and works great on any smartphone browser. You can create invoices, snap photos, and send estimates right from the job site." },
  ],
  invoicing: [
    { q: "How do I create an invoice?", a: "Go to Invoices → New Invoice. Select a customer, add your line items with descriptions and prices, then send it via email. Customers can view and pay online." },
    { q: "Can I customize my invoice template?", a: "Yes! Go to Settings → Business Profile to upload your logo, set your brand color, and configure default notes, terms, and tax rates. All invoices will reflect your branding." },
    { q: "How do I send invoice reminders?", a: "Otto can send automatic payment reminders for overdue invoices. Configure your reminder schedule in Settings → Notifications. You can also send manual reminders from any invoice detail page." },
    { q: "Can I attach photos to invoices?", a: "Yes. When creating or editing an invoice, you can attach before/after photos, equipment photos, or any documentation. These appear on the invoice your customer receives." },
  ],
  payments: [
    { q: "How do I accept card payments?", a: "Card payments are part of Pro and Team. Connect your own Stripe account in Settings → Payments. Once connected, every invoice automatically includes a 'Pay Now' button. Customers pay by card and funds go directly to your bank account." },
    { q: "What payment methods are supported?", a: "Otto Pay supports credit/debit cards via Stripe, plus you can manually record cash, check, and other payment types to keep your books complete." },
    { q: "Can customers make partial payments?", a: "Yes. If enabled in your settings, customers can pay a portion of the invoice. Otto automatically tracks the remaining balance and payment history." },
    { q: "When do I receive my money?", a: "Card payments are processed through Stripe and typically arrive in your bank account within 2 business days, depending on your Stripe payout schedule." },
  ],
  account: [
    { q: "How do I change my business information?", a: "Go to Settings → Business Profile to update your business name, address, phone, email, logo, and brand color. Changes apply to all future invoices and estimates." },
    { q: "Can I export my data?", a: "Yes, on Pro and Team. Go to Reports to export your invoices, payments, and customer data as CSV files. These work with QuickBooks, Excel, or any spreadsheet tool." },
    { q: "How do I change my password?", a: "Go to Settings → Account to update your email or password. You'll receive a confirmation email for security purposes." },
    { q: "Is my data secure?", a: "Yes. Otto Pay uses industry-standard encryption, secure authentication, and Stripe for payment processing. Your data and your customers' payment information are fully protected." },
  ],
  mobile: [
    { q: "Does Otto Pay work offline?", a: "Yes! You can create and edit invoices with no internet connection. Everything saves locally and syncs automatically when you're back online." },
    { q: "Can I take photos from the app?", a: "Yes. Use your phone's camera directly from the invoice or estimate creation screen to snap and attach photos of equipment, job sites, or completed work." },
    { q: "Is there a native mobile app?", a: "Otto Pay works as a full-featured mobile web app in any browser, and native iOS and Android apps are also available for an even faster field experience." },
    { q: "How do I share invoices with customers?", a: "After creating an invoice, send it via email or copy the unique payment link to share with your customer. They can view and pay the invoice instantly from their phone." },
  ],
};

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const animRef = useRef<HTMLDivElement>(null);
  const lowerSearch = search.toLowerCase();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("opacity-100", "translate-y-0")),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    animRef.current?.querySelectorAll(".anim-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredGuides = guides.filter(
    (g) =>
      !lowerSearch ||
      g.title.toLowerCase().includes(lowerSearch) ||
      g.steps.some((s) => s.toLowerCase().includes(lowerSearch))
  );

  const filteredVideos = videoPlaceholders.filter(
    (v) =>
      !lowerSearch ||
      v.title.toLowerCase().includes(lowerSearch) ||
      v.category.toLowerCase().includes(lowerSearch)
  );

  const filteredFaqs = Object.fromEntries(
    Object.entries(faqData).map(([cat, items]) => [
      cat,
      items.filter(
        (f) =>
          !lowerSearch ||
          f.q.toLowerCase().includes(lowerSearch) ||
          f.a.toLowerCase().includes(lowerSearch)
      ),
    ])
  );

  const hasAnyFaqs = Object.values(filteredFaqs).some((arr) => arr.length > 0);

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
            Otto's <span className="border-b-4 border-primary-foreground/40 pb-1">Help Center</span>
          </h1>
          <p className="text-lg opacity-90 leading-relaxed mb-8">
            Guides, FAQs, and tutorials to help you get the most out of Otto Pay.
          </p>

          <div className="relative max-w-[500px] mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search guides, FAQs, and tutorials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-13 rounded-full bg-background text-foreground border-none shadow-lg text-base"
            />
          </div>
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
        {/* Category Cards */}
        <section className="py-16 px-5">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2 anim-in opacity-0 translate-y-6 transition-all duration-600">Browse by Topic</h2>
            <p className="text-muted-foreground text-center mb-10 anim-in opacity-0 translate-y-6 transition-all duration-600" style={{ transitionDelay: "50ms" }}>
              Jump to the section that fits your question.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat, i) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="anim-in opacity-0 translate-y-6 transition-all duration-600 group bg-card border border-border rounded-2xl p-5 text-center no-underline hover:border-primary hover:shadow-lg hover:-translate-y-1"
                  style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                >
                  <span className="text-3xl block mb-2">{cat.emoji}</span>
                  <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{cat.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started Guides */}
        <section id="getting-started" className="py-16 px-5 bg-secondary">
          <div className="mx-auto max-w-[800px]">
            <div className="anim-in opacity-0 translate-y-6 transition-all duration-600 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold mb-3 bg-primary/10 text-primary">🚀 Guides</span>
              <h2 className="text-2xl font-bold text-foreground mb-2">Getting Started</h2>
              <p className="text-muted-foreground">Step-by-step walkthroughs for the most common tasks.</p>
            </div>

            {filteredGuides.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No guides match your search.</p>
            ) : (
              <Accordion type="single" collapsible className="space-y-3">
                {filteredGuides.map((guide, i) => (
                  <AccordionItem
                    key={guide.title}
                    value={`guide-${i}`}
                    className="anim-in opacity-0 translate-y-6 transition-all duration-600 bg-card border border-border rounded-2xl px-6 overflow-hidden"
                    style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                  >
                    <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-5">
                      {guide.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="space-y-3 pb-2">
                        {guide.steps.map((step, j) => (
                          <li key={j} className="flex gap-3 items-start text-sm text-muted-foreground">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                              {j + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="py-16 px-5">
          <div className="mx-auto max-w-[1000px]">
            <div className="anim-in opacity-0 translate-y-6 transition-all duration-600 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold mb-3 bg-warning/10 text-warning">🎬 Tutorials</span>
              <h2 className="text-2xl font-bold text-foreground mb-2">Video Tutorials</h2>
              <p className="text-muted-foreground">Watch and learn — visual walkthroughs for every feature.</p>
            </div>

            {filteredVideos.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No tutorials match your search.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVideos.map((video, i) => (
                  <div
                    key={video.title}
                    className="anim-in opacity-0 translate-y-6 transition-all duration-600 group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1"
                    style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                  >
                    {/* Thumbnail placeholder */}
                    <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 text-primary fill-primary" />
                      </div>
                      {/* Coming Soon overlay */}
                      <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                        <span className="bg-warning text-warning-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          Coming Soon
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-foreground mb-1">{video.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{video.category}</span>
                        <span className="text-xs text-muted-foreground">{video.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="invoicing" className="py-16 px-5 bg-secondary">
          <div className="mx-auto max-w-[800px]">
            <div className="anim-in opacity-0 translate-y-6 transition-all duration-600 mb-8 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold mb-3 bg-info/10 text-info">❓ FAQ</span>
              <h2 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Quick answers to the most common questions.</p>
            </div>

            {!hasAnyFaqs ? (
              <p className="text-muted-foreground text-sm text-center py-8">No FAQs match your search.</p>
            ) : (
              <Tabs defaultValue="general" className="anim-in opacity-0 translate-y-6 transition-all duration-600" style={{ transitionDelay: "100ms" }}>
                <TabsList className="flex flex-wrap justify-center gap-1 bg-transparent h-auto mb-6">
                  {Object.entries({ general: "General", invoicing: "Invoicing", payments: "Payments", account: "Account", mobile: "Mobile" }).map(
                    ([key, label]) => (
                      <TabsTrigger
                        key={key}
                        value={key}
                        className="rounded-full px-4 py-2 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        {label}
                        {filteredFaqs[key]?.length > 0 && (
                          <span className="ml-1.5 text-[0.65rem] opacity-70">({filteredFaqs[key].length})</span>
                        )}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>

                {Object.entries(filteredFaqs).map(([cat, items]) => (
                  <TabsContent key={cat} value={cat}>
                    {items.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-6">No questions match your search in this category.</p>
                    ) : (
                      <Accordion type="single" collapsible className="space-y-3">
                        {items.map((faq, i) => (
                          <AccordionItem
                            key={i}
                            value={`faq-${cat}-${i}`}
                            className="bg-card border border-border rounded-2xl px-6 overflow-hidden"
                          >
                            <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-5">
                              {faq.q}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </section>

        {/* Still Need Help Banner */}
        <section className="bg-foreground text-background py-14 text-center relative overflow-hidden">
          <div className="relative z-10 mx-auto max-w-[600px] px-5">
            <h3 className="text-2xl font-bold mb-3">Still Need Help?</h3>
            <p className="opacity-80 text-sm mb-6">
              Can't find what you're looking for? Our team is ready to help — we've got eight arms, after all.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-sm no-underline hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              Contact Support <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      <MarketingFooter />
    </div>
  );
}
