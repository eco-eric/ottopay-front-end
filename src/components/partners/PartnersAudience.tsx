import { Wrench, Users, Megaphone } from "lucide-react";

const audiences = [
  {
    icon: Wrench,
    title: "Industry Insiders",
    desc: "HVAC distributors, supply house reps, trade association members, and equipment dealers.",
  },
  {
    icon: Users,
    title: "Networked Professionals",
    desc: "Business coaches, bookkeepers, accountants, and field service consultants.",
  },
  {
    icon: Megaphone,
    title: "Content Creators",
    desc: "YouTube channels, podcasts, social media accounts with a trades audience.",
  },
];

export default function PartnersAudience() {
  return (
    <section className="py-20 px-6 md:px-12 bg-muted/30">
      <div className="max-w-[900px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Who Makes a Great Partner?
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-card border shadow-sm text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <a.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{a.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
