"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import Link from "next/link";

type Category = "Web" | "Mobile" | "Backend" | "DevOps" | "AI";

type Project = {
  title: string;
  category: Category;
  summary: string;
  problem: string;
  whatWeDid: string;
  outcomes: string[];
  tech: string[];
};

const PROJECTS: Project[] = [
  {
    title: "B2B Analytics Dashboard",
    category: "Web",
    summary: "Role-based portal with admin workflows and performance-first UI.",
    problem:
      "Stakeholders needed faster reporting and clearer access control across teams.",
    whatWeDid:
      "Built a clean data layer, RBAC, and a modular dashboard UI for fast iteration.",
    outcomes: [
      "Reduced reporting friction",
      "Improved UI performance and consistency",
    ],
    tech: ["Next.js", "TypeScript", "RBAC", "Postgres"],
  },
  {
    title: "Marketplace Mobile App",
    category: "Mobile",
    summary:
      "Multi-sided mobile product with a smooth onboarding and purchase flow.",
    problem:
      "A complex funnel needed to feel simple and reliable for real users.",
    whatWeDid:
      "Delivered core journeys, stability improvements, and release-ready architecture.",
    outcomes: ["Higher funnel completion", "More predictable releases"],
    tech: ["React Native", "API Design", "Payments", "CI/CD"],
  },
  {
    title: "API Modernization & Auth",
    category: "Backend",
    summary:
      "Cleaner endpoints, better security posture, and easier integrations.",
    problem: "Legacy APIs were difficult to extend and error-prone under load.",
    whatWeDid:
      "Refactored services, improved auth/roles, and stabilized integration surfaces.",
    outcomes: ["Lower error rate", "Clearer integration patterns"],
    tech: ["Node.js", "REST", "Auth", "Postgres"],
  },
  {
    title: "CI/CD & Observability Setup",
    category: "DevOps",
    summary:
      "Safer deployments with monitoring, alerting, and release discipline.",
    problem: "Releases were risky and production visibility was limited.",
    whatWeDid:
      "Implemented pipelines, dashboards, and alerting with practical runbooks.",
    outcomes: ["Safer deploys", "Faster incident response"],
    tech: ["CI/CD", "Docker", "Monitoring", "Alerts"],
  },
  {
    title: "AI-Assisted Operations Tool",
    category: "AI",
    summary: "Automation and summaries to reduce manual ops load.",
    problem: "Internal workflows were repetitive and slowed down decisions.",
    whatWeDid:
      "Added pragmatic AI features, routing, and integrations to streamline ops.",
    outcomes: ["Less manual work", "Faster internal turnaround"],
    tech: ["AI", "Automation", "Integrations", "Observability"],
  },
  {
    title: "Design System Foundation",
    category: "Web",
    summary:
      "Reusable UI patterns across multiple apps for consistent delivery.",
    problem: "Inconsistent UI slowed teams and created UX drift.",
    whatWeDid:
      "Defined component standards and a scalable UI kit with clear patterns.",
    outcomes: ["Faster UI delivery", "More consistent UX"],
    tech: ["Design System", "Tailwind", "Components", "Accessibility"],
  },
];

const ALL: (Category | "All")[] = [
  "All",
  "Web",
  "Mobile",
  "Backend",
  "DevOps",
  "AI",
];

export default function ProjectsClient() {
  const [active, setActive] = useState<(typeof ALL)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-content px-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {ALL.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={[
                  "h-10 rounded-full border px-4 text-sm font-medium transition",
                  isActive
                    ? "border-accent bg-accent-soft text-trust shadow-glow"
                    : "border-honest/20 bg-honest-soft text-slate hover:text-trust hover:border-accent/40",
                ].join(" ")}
                aria-pressed={isActive}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Card key={p.title} interactive className="h-full">
              <CardContent className="p-6 flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{p.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {p.summary}
                    </CardDescription>
                  </div>
                  <Badge>{p.category}</Badge>
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <p className="text-xs font-medium tracking-[0.14em] uppercase text-slate">
                      Problem
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate">
                      {p.problem}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-[0.14em] uppercase text-slate">
                      What we did
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate">
                      {p.whatWeDid}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-[0.14em] uppercase text-slate">
                      Outcomes
                    </p>
                    <ul className="mt-2 space-y-2">
                      {p.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-2 text-sm text-slate"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          <span className="leading-relaxed">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-1 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href="/#contact"
                    className="text-sm font-medium text-accent hover:text-trust transition"
                  >
                    Talk about a similar project →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-borders-elevated bg-honest-soft p-6 shadow-card">
          <div>
            <p className="text-base font-semibold text-trust">
              Have a project in mind?
            </p>
            <p className="mt-1 text-sm text-slate">
              Share a quick summary — we'll reply with a clear next step.
            </p>
          </div>

          <Button href="/#contact" variant="secondary">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
