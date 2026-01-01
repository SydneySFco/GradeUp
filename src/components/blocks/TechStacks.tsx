import Section from "@/src/components/layouts/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import {
  Code2,
  Smartphone,
  Database,
  Cloud,
  ShieldCheck,
  Gauge,
  GitBranch,
  MonitorCheck,
} from "lucide-react";

type StackGroup = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  items: string[];
};

const groups: StackGroup[] = [
  {
    title: "Frontend",
    subtitle:
      "Modern UI engineering with performance and accessibility in mind.",
    icon: Code2,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Design Systems"],
  },
  {
    title: "Mobile",
    subtitle: "Cross-platform delivery that feels native and ships clean.",
    icon: Smartphone,
    items: [
      "React Native",
      "App Architecture",
      "Release Pipelines",
      "Performance",
    ],
  },
  {
    title: "Backend & Data",
    subtitle: "Clean APIs, strong data modeling, and scalable foundations.",
    icon: Database,
    items: [
      "Node.js",
      "REST / GraphQL",
      "Postgres",
      "Auth (RBAC)",
      "Integrations",
    ],
  },
  {
    title: "Cloud & Quality",
    subtitle:
      "Shipping confidence through CI/CD, observability, and reliable ops.",
    icon: Cloud,
    items: [
      "Docker",
      "CI/CD",
      "Observability",
      "Monitoring & Alerts",
      "Security basics",
    ],
  },
];

const standards = [
  {
    icon: GitBranch,
    title: "Clean delivery workflow",
    desc: "Code reviews, branching strategy, and predictable releases.",
  },
  {
    icon: Gauge,
    title: "Performance-first mindset",
    desc: "Core Web Vitals, mobile performance, and UX polish.",
  },
  {
    icon: ShieldCheck,
    title: "Security-aware foundations",
    desc: "Auth, roles, and sensible defaults from day one.",
  },
  {
    icon: MonitorCheck,
    title: "Visibility & ownership",
    desc: "Monitoring, logging, and operational readiness.",
  },
];

export default function TechStack() {
  return (
    <Section
      id="tech"
      eyebrow="Tech Stack"
      title="Modern tools. Pragmatic choices."
      subtitle="Tools change — standards don’t. We choose tech that keeps teams fast today and safe tomorrow."
      className="bg-bg py-10"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map((g) => {
          const Icon = g.icon;
          return (
            <Card key={g.title} interactive className="h-full bg-surface border-border-subtle">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent-soft">
                    <Icon className="h-5 w-5 text-trust" />
                  </div>
                </div>

                <CardTitle className="mt-4">{g.title}</CardTitle>
                <CardDescription>{g.subtitle}</CardDescription>

                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <Badge key={it} className="bg-accent text-white rounded-full">{it}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {standards.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="border border-borders-elevated bg-surface-elevated p-6 shadow-card hover:shadow-card-hover transition-all duration-200 rounded-2xl"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-honest/20 bg-honest-soft">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-4 text-sm font-semibold text-trust">
                {s.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
