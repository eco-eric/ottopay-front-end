import { Link } from "react-router-dom";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { Smartphone, Wifi, WifiOff, Camera, Zap, Bell, Download, ArrowRight } from "lucide-react";

const currentFeatures = [
  { icon: WifiOff, title: "Full Offline Mode", desc: "Create invoices with zero bars. Everything saves locally and syncs the moment you get signal back." },
  { icon: Smartphone, title: "Thumb-Friendly Design", desc: "Big buttons, simple flows, designed for one-handed use — because your other hand is holding a flashlight." },
  { icon: Zap, title: "Fast on Any Phone", desc: "Runs smooth on any modern smartphone. No lag, no crashes, no app store download required." },
  { icon: Camera, title: "Camera Integration", desc: "Snap photos of equipment, model numbers, or completed work directly from the app." },
  { icon: Bell, title: "Push Notifications", desc: "Get notified instantly when a customer views or pays an invoice." },
  { icon: Download, title: "Install to Home Screen", desc: "Add Otto Pay to your phone's home screen from your browser — works just like a native app." },
];

const nativeFeatures = [
  "Faster performance with native code",
  "Enhanced push notifications",
  "Background sync & data refresh",
  "Deeper camera & file system access",
  "Apple Pay & Google Pay integration",
  "App Store & Google Play availability",
];

export default function MobileAppPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section
        className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 md:px-12 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(165deg, #042f2e 0%, #0a3d38 50%, hsl(var(--primary-hover)) 100%)" }}
      >
        <div
          className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 60%)" }}
        />
        <div className="relative z-10 max-w-[650px] mx-auto animate-[fadeUp_0.6s_ease-out_both]">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.1em] text-[#2DD4BF] mb-3 font-mono">
            📱 Mobile App
          </span>
          <h1 className="text-[clamp(2rem,6vw,3.25rem)] font-extrabold leading-[1.1] text-white tracking-tight mb-4">
            Your office fits<br />
            <span className="text-[#2DD4BF]">in your pocket.</span>
          </h1>
          <p className="text-[clamp(1rem,2.5vw,1.2rem)] text-white/60 leading-relaxed max-w-[500px] mx-auto">
            Otto Pay works beautifully on any phone — right now, in your browser. Native iOS & Android apps are on the way.
          </p>
        </div>
      </section>

      {/* Current Web App */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold mb-3 bg-primary/10 text-primary">
              ✅ Available Now
            </span>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-tight leading-[1.15] text-foreground mb-2">
              A full-featured mobile experience — today
            </h2>
            <p className="text-base text-muted-foreground max-w-[550px]">
              No app store needed. Open Otto Pay in your phone's browser and you're ready to invoice from anywhere — basements, rooftops, or the truck.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="p-5 bg-card border border-border rounded-[14px] hover:border-primary/20 hover:shadow-md hover:-translate-y-px transition-all"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-accent rounded-[10px] mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 p-5 rounded-[14px] flex items-start gap-3 border border-primary/10"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--primary) / 0.02))" }}
          >
            <span className="text-xl shrink-0 mt-0.5">💡</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-accent-foreground">Pro tip:</strong> On iPhone, tap <strong>Share → Add to Home Screen</strong>. On Android, tap <strong>Menu → Install App</strong>. Otto Pay will launch full-screen like a native app — no browser bar, instant access.
            </p>
          </div>
        </div>
      </section>

      {/* Native Apps Coming Soon */}
      <section
        className="py-16 md:py-20 px-6 md:px-12 text-white"
        style={{ background: "linear-gradient(165deg, #042f2e 0%, #0a3d38 100%)" }}
      >
        <div className="max-w-[700px] mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.1em] text-[#2DD4BF] mb-3 font-mono">
            🚀 Coming Q2 2026
          </span>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-tight leading-[1.15] text-white mb-2">
            Native iOS & Android apps
          </h2>
          <p className="text-white/50 text-base mb-10">
            We're building dedicated apps for iPhone and Android with even deeper device integration. Expected by end of Q2 2026.
          </p>

          <div className="space-y-3">
            {nativeFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-sm"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="text-[#2DD4BF] font-bold">✓</span>
                <span className="text-white/80 font-medium">{feature}</span>
                <span className="ml-auto shrink-0 px-2 py-0.5 bg-warning/15 text-warning rounded-md text-[0.65rem] font-bold uppercase tracking-wide">
                  Planned
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-[14px] border border-white/10 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
            <p className="text-white/70 text-sm mb-3">
              Want early access to the native app? Drop us a line and we'll add you to the beta list.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[#2DD4BF] font-bold text-sm no-underline hover:underline"
            >
              Join the Beta List <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 md:py-24 px-6 md:px-12 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-hover)) 100%)" }}
      >
        <div className="relative z-10 max-w-[600px] mx-auto">
          <h2 className="text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            Don't wait for the app store.
          </h2>
          <p className="text-lg text-white/75 mb-8">
            Otto Pay works on your phone right now. Start invoicing from the field today.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-[14px] font-bold text-lg no-underline transition-all hover:-translate-y-0.5 bg-warning text-foreground shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)]"
          >
            Get Started Free →
          </Link>
          <p className="mt-5 text-sm text-white/50">No credit card · No contracts · Cancel anytime</p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
