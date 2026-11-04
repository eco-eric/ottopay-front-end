import { useState, useEffect, useRef } from "react";
import { Mail, Phone, Clock, MessageCircle, Send, ChevronDown, Wrench } from "lucide-react";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
const topics = [
  { id: "general", label: "General", icon: "💬" },
  { id: "billing", label: "Billing", icon: "💳" },
  { id: "bug", label: "Bug Report", icon: "🐛" },
  { id: "feature", label: "Feature Idea", icon: "💡" },
  { id: "partnership", label: "Partnership", icon: "🤝" },
];

const faqs = [
  { q: "Is Otto Pay really free to start?", a: "Yep! The Free plan gives one user unlimited invoices and estimates with no monthly cost. Upgrade to Pro ($29/month) to take card payments online, add a teammate and use the full Otto AI." },
  { q: "I'm not in HVAC. Can I still use Otto?", a: "Absolutely! We built Otto with HVAC pros in mind, but plumbers, electricians, roofers, and other field service contractors love it too. If you fix, install, or maintain things — Otto works for you." },
  { q: "How fast is your support?", a: "We aim to respond to all inquiries within a few hours during business days. Pro plan members get priority support with even faster response times." },
  { q: "Can I switch plans anytime?", a: "Of course. Upgrade, downgrade, or cancel whenever you want. No contracts, no cancellation charges. We believe you should stay because Otto is awesome, not because you're locked in." },
];

const contactCards = [
  { icon: Mail, iconBg: "bg-primary/10 text-primary", title: "Email Us", line1: "support@ottopay.pro", line1Href: "mailto:support@ottopay.pro", line2: "We typically reply within a few hours." },
  { icon: Clock, iconBg: "bg-info/15 text-info", title: "Business Hours", line1: "Mon – Fri: 8am – 6pm CT", line2: "We know you start early. So do we." },
  { icon: MessageCircle, iconBg: "bg-destructive/10 text-destructive", title: "Social Media", line1: "Follow us @workedgepro on Facebook, Instagram & TikTok", line2: "Tips, updates, and the occasional Otto meme." },
];

export default function ContactPage() {
  const [topic, setTopic] = useState("general");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [trade, setTrade] = useState("");
  const [message, setMessage] = useState("");
  const animRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("opacity-100", "translate-y-0")),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    animRef.current?.querySelectorAll(".anim-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      // 1. Save to database
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          topic,
          trade: trade || null,
          message: message.trim(),
        });

      if (dbError) throw dbError;

      // 2. Send email notification to support
      await supabase.functions.invoke("send-email", {
        body: {
          to: "eric@ecosourceIQ.com",
          subject: `[Contact Form - ${topic.toUpperCase()}] ${firstName} ${lastName}`,
          body: `New contact form submission:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nTopic: ${topic}\nTrade: ${trade || "Not specified"}\n\nMessage:\n${message}`,
        },
      });

      setShowSuccess(true);
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setTrade("");
    setMessage("");
    setTopic("general");
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-20 pb-28 text-center text-primary-foreground overflow-hidden">
        {/* Decorative tentacle SVGs */}
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

        <div className="relative z-10 mx-auto max-w-[600px] px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Otto's <span className="border-b-4 border-primary-foreground/40 pb-1">All Ears</span>
          </h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Got a question, idea, or just want to say hello?<br />
            We've got eight arms ready to help.
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-[80px]">
            <path className="fill-background" d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z">
              <animate attributeName="d" values="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z;M0,50 C200,10 400,70 600,30 C800,60 1000,20 1200,50 L1200,80 L0,80 Z;M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" dur="8s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20" ref={animRef}>
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 items-start">

            {/* Left: Contact Info Cards */}
            <div className="flex flex-col gap-6">
              <div className="anim-in opacity-0 translate-y-6 transition-all duration-600 mb-2">
                <h2 className="text-2xl font-bold text-foreground mb-2">Ways to Reach Us</h2>
                <p className="text-muted-foreground text-sm">Pick whichever arm is most convenient.</p>
              </div>

              {contactCards.map((card, i) => (
                <div
                  key={card.title}
                  className="anim-in opacity-0 translate-y-6 transition-all duration-600 group bg-card border border-border rounded-2xl p-6 flex items-start gap-5 hover:border-primary hover:shadow-lg hover:translate-x-1 relative overflow-hidden"
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom rounded-r" />
                  <div className={`w-13 h-13 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${card.iconBg}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                    {card.line1Href ? (
                      <p className="text-sm"><a href={card.line1Href} className="text-primary hover:underline font-medium">{card.line1}</a></p>
                    ) : (
                      <p className="text-sm text-muted-foreground">{card.line1}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{card.line2}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Form */}
            <div className="anim-in opacity-0 translate-y-6 transition-all duration-600 bg-card rounded-2xl p-8 md:p-11 shadow-xl border border-primary/10 relative" style={{ transitionDelay: "150ms" }}>
              <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-b" />

              <h2 className="text-2xl font-bold text-foreground mb-1">Send Otto a Message</h2>
              <p className="text-sm text-muted-foreground mb-8">Fill this out and we'll get back to you faster than a compressor swap.</p>

              <form onSubmit={handleSubmit}>
                {/* Topic pills */}
                <label className="block text-sm font-semibold text-foreground mb-3 tracking-wide">What can we help with?</label>
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTopic(t.id)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${
                        topic === t.id
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary bg-background"
                      }`}
                    >
                      <span className="mr-1.5">{t.icon}</span>{t.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">First Name</label>
                    <Input placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Last Name</label>
                    <Input placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="h-12" />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                  <Input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Your Trade <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                  </label>
                  <Select value={trade} onValueChange={setTrade}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your trade..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hvac">🌡️ HVAC</SelectItem>
                      <SelectItem value="plumbing">🔧 Plumbing</SelectItem>
                      <SelectItem value="electrical">⚡ Electrical</SelectItem>
                      <SelectItem value="roofing">🏠 Roofing</SelectItem>
                      <SelectItem value="general">🔨 General Contracting</SelectItem>
                      <SelectItem value="other">📋 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                  <Textarea
                    placeholder="Tell us what's on your mind. No question is too small — unless it's about quantum physics. We'll try, though."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="min-h-[130px]"
                  />
                </div>

                <Button type="submit" disabled={submitting} className="w-full h-13 text-base font-semibold gap-2.5 rounded-xl">
                  {submitting ? "Sending…" : "Send Message"} <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-[900px] px-5">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">Before You Ask...</h2>
            <p className="text-muted-foreground">Some quick answers Otto gets asked about a lot.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="bg-card rounded-2xl p-6 border border-border cursor-pointer transition-all hover:shadow-md hover:border-primary/30"
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-sm font-semibold text-foreground">{faq.q}</h3>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    openFaq === i ? "bg-primary text-primary-foreground rotate-45" : "bg-primary/10 text-primary"
                  }`}>
                    <span className="text-lg leading-none">+</span>
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-400 ${openFaq === i ? "max-h-[200px] pt-4" : "max-h-0"}`}>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-foreground text-background py-10 text-center relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[600px] px-5">
          <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
            <Wrench className="w-5 h-5" /> Need Urgent Help with Your Account?
          </h3>
          <p className="opacity-80 text-sm">
            If you're having a payment emergency, email{" "}
            <a href="mailto:urgent@ottopay.pro" className="text-primary font-semibold hover:underline">urgent@ottopay.pro</a>
            {" "}and we'll prioritize your case.
          </p>
        </div>
      </section>

      <MarketingFooter />

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-[420px] text-center p-10">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 text-5xl">
            🐙
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Otto's On It!</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your message has been received. We'll reach back with all eight arms ASAP.
          </p>
          <Button onClick={resetForm} className="w-full rounded-xl h-12">Sounds Good</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
