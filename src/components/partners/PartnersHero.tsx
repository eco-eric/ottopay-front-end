import { ArrowRight } from "lucide-react";

export default function PartnersHero() {
  return (
    <section
      className="relative px-6 md:px-12 pt-24 pb-20 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, #042f2e 0%, #0a3d38 35%, hsl(var(--primary-hover)) 100%)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute -top-1/2 -right-[30%] w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 max-w-[720px] mx-auto text-center animate-[fadeUp_0.6s_ease-out_both]">
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1.1] text-white tracking-tight mb-5">
          Refer Contractors.{" "}
          <span className="text-[#2DD4BF]">Earn $100.</span>
        </h1>

        <p className="text-[clamp(1rem,2.2vw,1.12rem)] text-white/70 leading-relaxed mb-10 max-w-[560px] mx-auto">
          Know an HVAC tech or field service contractor who could use a better
          way to get paid? Refer them to Otto Pay. When they process $25,000 in
          card payments, you earn $100 — paid within 30 days.
        </p>

        {/* Stat callouts */}
        <div className="flex justify-center gap-6 mb-10">
          <div className="px-8 py-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-[#2DD4BF]">$100</div>
            <div className="text-white/50 text-sm mt-1">Per qualifying referral</div>
          </div>
          <div className="px-8 py-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-[#2DD4BF]">$25K</div>
            <div className="text-white/50 text-sm mt-1">Processing threshold</div>
          </div>
        </div>

        <a
          href="https://referral.ottopay.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-warning text-foreground font-bold text-lg px-8 py-4 rounded-[14px] shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 transition-all no-underline"
        >
          Apply to Become a Partner <ArrowRight className="ml-2 h-5 w-5" />
        </a>

        <p className="mt-5 text-white/40 text-sm">
          Already a partner?{" "}
          <a
            href="https://referral.ottopay.pro"
            className="text-[#2DD4BF] underline hover:no-underline"
          >
            Sign in to your dashboard →
          </a>
        </p>
      </div>
    </section>
  );
}
