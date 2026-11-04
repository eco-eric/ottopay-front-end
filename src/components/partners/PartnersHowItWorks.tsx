const steps = [
  {
    num: "1",
    title: "Apply",
    desc: "Submit your application below. We review all applications within 2 business days.",
  },
  {
    num: "2",
    title: "Get Your Link",
    desc: "Once approved, you'll receive your unique referral link and access to your partner dashboard.",
  },
  {
    num: "3",
    title: "Share",
    desc: "Send your link to HVAC techs and field service contractors in your network.",
  },
  {
    num: "4",
    title: "Get Paid",
    desc: "When your referral processes $25,000 in card payments, you earn $100 — paid within 30 days.",
  },
];

export default function PartnersHowItWorks() {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          How It Works
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-extrabold text-xl">
                {step.num}
              </div>
              <h3 className="text-base font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
