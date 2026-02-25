import Section from "@/src/components/layouts/Section";
import { Card, CardContent, CardDescription, CardTitle } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Rocket, TrendingUp, Wrench } from "lucide-react";

type Package = {
  title: string;
  subtitle: string;
  timeline: string;
  fit: string;
  outcomes: string[];
  href: string;
  popular?: boolean;
  icon: React.ElementType;
};

const packages: Package[] = [
  {
    title: "MVP Sprint",
    subtitle: "Launch a production-ready MVP with clear scope and weekly demos.",
    timeline: "6–8 weeks",
    fit: "Best for founders validating product-market fit.",
    outcomes: [
      "Roadmap + architecture decisions in week 1",
      "Core user journeys shipped with QA",
      "Launch checklist and handover documentation",
    ],
    href: "/services/mvp-development",
    icon: Rocket,
  },
  {
    title: "Scale Pod",
    subtitle: "Senior product pod that extends your team and keeps releases predictable.",
    timeline: "Monthly",
    fit: "Best for teams with traction and aggressive roadmap targets.",
    outcomes: [
      "Feature velocity with lower delivery risk",
      "Performance and reliability improvements",
      "Weekly demos and decision transparency",
    ],
    href: "/services/react-nextjs-development",
    popular: true,
    icon: TrendingUp,
  },
  {
    title: "Rescue & Stabilize",
    subtitle: "Fix unstable delivery, untangle technical debt, and regain momentum fast.",
    timeline: "4–6 weeks",
    fit: "Best for projects missing deadlines or struggling with quality.",
    outcomes: [
      "Technical bottleneck audit + remediation plan",
      "High-impact fixes in first 2 weeks",
      "Stability baseline for future roadmap",
    ],
    href: "/services/devops-cloud-delivery",
    icon: Wrench,
  },
];

function Services() {
  return (
    <Section
      id="services"
      eyebrow="Engagement models"
      title="Choose the delivery model that fits your stage"
      subtitle="Productized packages to make scope, timeline, and outcomes obvious before work starts."
      className="bg-bg py-10"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <Card
              key={pkg.title}
              interactive
              className={`h-full border-border-subtle bg-surface box-shadow-card ${
                pkg.popular ? "ring-2 ring-accent/40" : ""
              }`}
            >
              <CardContent className="p-8 flex h-full flex-col">
                <div className="mb-5 flex items-center justify-between">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-border-subtle bg-accent-soft">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  {pkg.popular ? (
                    <Badge variant="accent" className="rounded-full bg-accent text-white">
                      Most Popular
                    </Badge>
                  ) : null}
                </div>

                <CardTitle className="text-2xl mb-2">{pkg.title}</CardTitle>
                <CardDescription className="mb-4">{pkg.subtitle}</CardDescription>

                <div className="mb-5 flex flex-wrap gap-2">
                  <Badge variant="neutral" className="rounded-full bg-secondary text-text-secondary">
                    Timeline: {pkg.timeline}
                  </Badge>
                </div>

                <p className="text-sm text-text-secondary mb-5">{pkg.fit}</p>

                <ul className="space-y-3 flex-grow">
                  {pkg.outcomes.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={pkg.href}
                  variant="ghost"
                  className="mt-6 w-full rounded-full border border-border-subtle text-trust hover:bg-bg"
                >
                  View package details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-borders-elevated bg-honest-soft p-6 shadow-card">
        <div>
          <p className="text-body font-semibold text-trust">Not sure which package fits?</p>
          <p className="mt-1 text-sm text-slate">Share your stage + constraints. We’ll recommend the fastest low-risk path.</p>
        </div>
        <Button href="#contact" variant="secondary" className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover">
          Book a call
        </Button>
      </div>
    </Section>
  );
}

export default Services;
