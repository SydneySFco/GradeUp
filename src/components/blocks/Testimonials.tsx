import Section from "@/src/components/layouts/Section";
import { Card, CardContent } from "@/src/components/ui/Card";

const testimonials = [
  {
    quote:
      "They brought calm structure to a messy roadmap. We shipped in weeks, not months.",
    name: "Founder",
    role: "B2B SaaS",
  },
  {
    quote:
      "Weekly demos and written updates made collaboration predictable and low-stress.",
    name: "Product Lead",
    role: "Digital Agency",
  },
  {
    quote:
      "Senior-level decisions from day one saved us from expensive rework later.",
    name: "CTO",
    role: "HealthTech Startup",
  },
];

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Testimonials"
      title="What teams say after shipping with us"
      subtitle="Founder-focused collaboration with measurable delivery impact."
      className="bg-surface py-10"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.quote} className="h-full border-border-subtle bg-bg">
            <CardContent className="p-7">
              <p className="text-base leading-relaxed text-trust">“{item.quote}”</p>
              <div className="mt-6 border-t border-border-subtle pt-4">
                <p className="text-sm font-semibold text-trust">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-slate">{item.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
