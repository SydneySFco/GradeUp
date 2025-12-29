import Section from "@/src/components/layouts/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import {
  Layers,
  MonitorSmartphone,
  Smartphone,
  Database,
  Cloud,
  Sparkles,
} from "lucide-react";

type Service = {
  title: string;
  subtitle: string;
  bullets: string[];
  tags: string[];
  icon: React.ElementType;
};

const services: Service[] = [
  {
    title: "Product Engineering",
    subtitle: "From MVP to scale — delivery that stays maintainable.",
    bullets: [
      "MVP planning & execution",
      "Architecture that won’t collapse later",
      "Weekly demos & clear milestones",
    ],
    tags: ["MVP", "Scale"],
    icon: Layers,
  },
  {
    title: "Web Applications",
    subtitle: "Fast, accessible, premium-feeling experiences.",
    bullets: [
      "Next.js/React development",
      "Performance & UX improvements",
      "Design system-friendly UI",
    ],
    tags: ["Web", "UX"],
    icon: MonitorSmartphone,
  },
  {
    title: "Mobile Apps",
    subtitle: "React Native builds that feel native and ship clean.",
    bullets: [
      "Core journeys & onboarding",
      "Reliable release process",
      "Stability + performance focus",
    ],
    tags: ["iOS", "Android"],
    icon: Smartphone,
  },
  {
    title: "Backend & APIs",
    subtitle: "Clean services and integrations that teams can trust.",
    bullets: [
      "API design (REST/GraphQL)",
      "Auth & role-based access",
      "Data modeling & integrations",
    ],
    tags: ["APIs", "Auth"],
    icon: Database,
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Ship with confidence — CI/CD, monitoring, and sane infra.",
    bullets: [
      "CI/CD pipelines",
      "Observability & alerting",
      "Docker & deployment setup",
    ],
    tags: ["CI/CD", "Ops"],
    icon: Cloud,
  },
  {
    title: "AI & Automation",
    subtitle: "Pragmatic AI features that reduce manual work.",
    bullets: [
      "Workflow automation",
      "AI-assisted internal tools",
      "Integrations and routing",
    ],
    tags: ["AI", "Automation"],
    icon: Sparkles,
  },
];

function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What we help you deliver"
      subtitle="Outcome-focused engineering across product, web, mobile, backend, and delivery infrastructure."
      className="bg-bg py-10"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.title} interactive className="h-full group bg-surface border-border-subtle box-shadow-card">
              <CardContent className="p-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center border-2 group-hover:bg-[color:var(--color-accent-2-soft)] transition-all bg-accent-soft border-border-subtle rounded-xl text-text-secondary">
                    <Icon className="h-8 w-8 text-text-secondary" />
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {s.tags.map((t, idx) => (
                    <Badge 
                      key={t} 
                      variant="accent" 
                      className={"bg-secondary text-text-secondary rounded-full"}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <CardTitle className="mb-3 text-xl">{s.title}</CardTitle>
                <CardDescription className="text-base mb-6">{s.subtitle}</CardDescription>

                <ul className="space-y-3">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 h-2 w-2 bg-secondary flex-shrink-0" aria-hidden="true" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modern CTA strip */}
      <div className="mt-16 grid md:grid-cols-2 gap-8 items-center border-2 border-borders-elevated bg-surface p-10 shadow-card rounded-2xl">
        <div>
          <p className="text-2xl font-bold text-trust mb-3">
            Not sure where your project fits?
          </p>
          <p className="text-lg text-text-secondary">
            Tell us what you&apos;re building — we&apos;ll recommend a clear approach.
          </p>
        </div>
        <div className="flex justify-end">
          <Button href="#contact" variant="primary" size="lg" className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover">
            Book a call
          </Button>
        </div>
      </div>
    </Section>
  );
}
export default Services;
