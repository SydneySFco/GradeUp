import Section from "@/src/components/layouts/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { MessageSquare, Route, Hammer, Rocket } from "lucide-react";

type Step = {
  step: string;
  title: string;
  subtitle: string;
  bullets: string[];
  icon: React.ElementType;
};

const steps: Step[] = [
  {
    step: "01",
    title: "Discovery",
    subtitle: "Align on goals, constraints, and success metrics.",
    bullets: [
      "Clarify scope & priorities",
      "Define success & risks",
      "Agree on communication cadence",
    ],
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Plan",
    subtitle: "Turn clarity into milestones and a predictable path.",
    bullets: [
      "Delivery roadmap",
      "Technical approach",
      "Milestones & acceptance criteria",
    ],
    icon: Route,
  },
  {
    step: "03",
    title: "Build",
    subtitle: "Ship in small increments with weekly demos.",
    bullets: [
      "Implementation + code reviews",
      "Quality & performance checks",
      "Tight feedback loop",
    ],
    icon: Hammer,
  },
  {
    step: "04",
    title: "Launch & Improve",
    subtitle: "Release, monitor, and iterate based on real usage.",
    bullets: [
      "Deployment & observability",
      "Post-launch improvements",
      "Retainer options if needed",
    ],
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <Section
      id="process"
      eyebrow="Process"
      title="A simple process that ships."
      subtitle="Clear steps, calm execution, and visible progress — built for startups and digital teams."
      className="bg-surface py-10"
    >
      {/* Timeline line (desktop) */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 right-0 top-6 hidden lg:block">
          <div className="mx-auto max-w-content px-6">
            <div className="h-px w-full bg-accent/30" />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.step} interactive className="relative bg-bg border-border-subtle">
                <CardContent className="p-6">
                  {/* Top row: step + icon */}
                  <div className="flex items-start justify-between">
                    <Badge variant="neutral" className="bg-secondary text-text-secondary rounded-full">{s.step}</Badge>

                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border transition group-hover:border-accent group-hover:bg-accent-soft bg-accent-soft border-border-subtle">
                      <Icon className="h-5 w-5 text-trust" />
                    </div>
                  </div>

                  <CardTitle className="mt-4">{s.title}</CardTitle>
                  <CardDescription>{s.subtitle}</CardDescription>

                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-slate"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* Desktop timeline dot */}
                <div className="pointer-events-none absolute -top-[10px] left-6 hidden lg:block">
                  <div className="h-5 w-5 rounded-full border-2 border-border-subtle bg-surface-elevated" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-borders-elevated bg-honest-soft p-6 shadow-card rounded-2xl">
        <div>
          <p className="text-base font-semibold text-trust">
            Want a plan for your project?
          </p>
          <p className="mt-1 text-sm text-slate">
            We can outline scope, milestones, and a delivery approach in a short
            call.
          </p>
        </div>

        <Button href="#contact" variant="secondary" className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover">
          Book a call
        </Button>
      </div>
    </Section>
  );
}
