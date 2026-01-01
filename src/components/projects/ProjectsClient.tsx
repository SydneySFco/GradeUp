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
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
    title: "Panel and Dashboard",
    category: "Web",
    summary:
      "Charging Unit Management Panel for monitoring transactions, user activities, and service stations.",
    problem:
      "Institutions managing electric vehicle charging infrastructure needed a centralized platform to monitor daily operations, charging unit status, and service station performance efficiently.",
    whatWeDid:
      "Developed a comprehensive management tool with real-time monitoring capabilities, transaction tracking, and service station analytics from a centralized dashboard.",
    outcomes: [
      "Increased operational efficiency",
      "Centralized monitoring and management",
      "Better visibility into charging infrastructure performance",
    ],
    tech: ["Next.js", "RTK Query", "Tailwind", "PostgreSQL"],
  },
  {
    title: "ParaMe",
    category: "Web",
    summary:
      "Digital platform enabling people with disabilities to find suitable sports-activity or training opportunities in their area.",
    problem:
      "People with disabilities (physical, visual, hearing, mental, etc.) struggled to find accessible sports and training opportunities tailored to their needs in their local area.",
    whatWeDid:
      "Built a user-friendly platform that connects individuals with disabilities to suitable sports activities and training programs, with comprehensive filtering and location-based search.",
    outcomes: [
      "Improved access to sports activities for people with disabilities",
      "Better matching between individuals and opportunities",
      "Enhanced community engagement",
    ],
    tech: ["React", "Styled Components", "Redux", "Gatsby", "MySQL"],
  },
  {
    title: "Adeptive Digital",
    category: "Web",
    summary:
      "Digital agency website showcasing custom web solutions for businesses—corporate websites, e-commerce sites, web applications, and digital experiences.",
    problem:
      "Adeptive needed a modern, engaging website that demonstrates their ability to transform complex software and digital needs into user-friendly, sustainable, and efficient systems.",
    whatWeDid:
      "Created a dynamic, visually appealing website with smooth animations and a modern design that showcases the agency's portfolio and services effectively.",
    outcomes: [
      "Enhanced brand presence and credibility",
      "Better client engagement and lead generation",
      "Showcase of technical capabilities",
    ],
    tech: ["Next.js", "Tailwind", "Redux", "Sanity", "GSAP"],
  },
  {
    title: "Physiotherapy Website",
    category: "Web",
    summary:
      "tedavifizik.com is a digital platform providing personalized treatment programs through expert physiotherapists for physical therapy and rehabilitation services.",
    problem:
      "Individuals seeking physical therapy services needed easier access to expert physiotherapists and personalized treatment programs for musculoskeletal disorders, pain, limited mobility, and post-injury rehabilitation.",
    whatWeDid:
      "Developed an online platform that connects patients with expert physiotherapists, enabling personalized treatment programs and easy access to reliable expertise.",
    outcomes: [
      "Improved access to physiotherapy services",
      "Personalized treatment programs",
      "Better patient-physiotherapist matching",
    ],
    tech: ["Next.js", "React", "Redux", "Framer Motion", "Tailwind"],
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

  const projectCount = filtered.length;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header with stats */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-trust mb-2">
              Our Work
            </h2>
            <p className="text-slate text-base">
              {projectCount} {projectCount === 1 ? "project" : "projects"}
              {active !== "All" && ` in ${active}`}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {ALL.map((c) => {
              const isActive = c === active;
              const count =
                c === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === c).length;

              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={[
                    "h-11 rounded-full border-2 px-5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "border-accent bg-accent text-white shadow-lg shadow-accent/30 scale-105"
                      : "border-border-subtle bg-surface-elevated text-slate hover:border-accent/50 hover:bg-accent-soft hover:text-trust",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {c}
                  {count > 0 && (
                    <span
                      className={[
                        "ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-accent-soft text-accent",
                      ].join(" ")}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {filtered.map((p) => (
            <Card
              key={p.title}
              interactive
              className="group h-full overflow-hidden border-2 border-border-subtle bg-surface-elevated transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1"
            >
              <CardContent className="p-8 flex h-full flex-col">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-trust group-hover:text-accent transition-colors">
                      {p.title}
                    </CardTitle>
                    <Badge
                      variant="accent"
                      className="shrink-0 border-2 border-accent/30 bg-accent-soft text-accent font-semibold"
                    >
                      {p.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed text-slate mt-2">
                    {p.summary}
                  </CardDescription>
                </div>

                {/* Content */}
                <div className="flex-grow space-y-6">
                  {/* Problem */}
                  <div className="relative pl-6 border-l-2 border-accent/20">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/40 to-accent/10 group-hover:from-accent group-hover:to-accent/40 transition-all" />
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">
                      Challenge
                    </p>
                    <p className="text-sm leading-relaxed text-slate">
                      {p.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="relative pl-6 border-l-2 border-accent-2/20">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-2/40 to-accent-2/10 group-hover:from-accent-2 group-hover:to-accent-2/40 transition-all" />
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent-2 mb-2">
                      Solution
                    </p>
                    <p className="text-sm leading-relaxed text-slate">
                      {p.whatWeDid}
                    </p>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate mb-3">
                      Key Outcomes
                    </p>
                    <ul className="space-y-2.5">
                      {p.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-3 text-sm text-slate group/item"
                        >
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform" />
                          <span className="leading-relaxed">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-2">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate mb-3">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="neutral"
                          className="bg-surface border-border-subtle text-text-secondary font-medium hover:border-accent/50 hover:text-accent transition-colors"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-8 pt-6 border-t-2 border-border-subtle">
                  <Link
                    href="/#contact"
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-all"
                  >
                    <span>Discuss a similar project</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-slate mb-2">No projects found</p>
            <p className="text-sm text-text-muted">
              Try selecting a different category
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent-soft via-surface-soft to-accent-2-soft p-8 sm:p-10 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-trust mb-3">
                Ready to start your project?
              </h3>
              <p className="text-base leading-relaxed text-slate">
                Share your vision with us — we&apos;ll help you turn it into
                reality. Let&apos;s discuss how we can bring your ideas to
                life.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button
                href="/#contact"
                variant="primary"
                size="lg"
                className="bg-accent text-white rounded-full hover:bg-accent-hover hover:shadow-[0_20px_50px_rgba(47,107,255,0.3)]"
              >
                Book a call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
