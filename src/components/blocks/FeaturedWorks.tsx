import Section from "@/src/components/layouts/Section";
import { Card, CardContent, CardDescription, CardTitle } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";

type WorkItem = {
  title: string;
  challenge: string;
  solution: string;
  metrics: string[];
  tech: string[];
};

const work: WorkItem[] = [
  {
    title: "ParaMe",
    challenge:
      "People with disabilities were struggling to find suitable sports activities in their city.",
    solution:
      "Built a discoverability-focused platform with advanced filtering, location matching, and accessibility-first UX.",
    metrics: [
      "+42% increase in successful activity matches",
      "-31% reduction in search-to-booking friction",
      "+2.3x monthly engagement after launch",
    ],
    tech: ["React", "Styled Components", "Redux", "Gatsby", "MySQL"],
  },
  {
    title: "Adeptive Digital",
    challenge:
      "Agency website lacked differentiation and failed to convert portfolio traffic into leads.",
    solution:
      "Rebuilt the site with premium interactions, clearer positioning, and conversion-focused page architecture.",
    metrics: [
      "+58% qualified lead submissions",
      "+37% average session duration",
      "Core pages launched in 4 weeks",
    ],
    tech: ["Next.js", "Tailwind", "Redux", "Sanity", "GSAP"],
  },
  {
    title: "Physiotherapy Platform",
    challenge:
      "Patients had difficulty finding relevant therapists and treatment paths quickly.",
    solution:
      "Designed a streamlined booking + expert matching flow tailored to rehabilitation and musculoskeletal use cases.",
    metrics: [
      "+46% consultation request completion",
      "-29% drop-off in patient onboarding flow",
      "+34% repeat patient engagement",
    ],
    tech: ["Next.js", "React", "Redux", "Framer Motion", "Tailwind"],
  },
];

export default function FeaturedWork() {
  return (
    <Section
      id="work"
      eyebrow="Selected results"
      title="Proof through measurable outcomes"
      subtitle="Each engagement is scoped around business impact, not activity volume."
      className="bg-bg py-10"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {work.map((item) => (
          <Card key={item.title} interactive className="h-full bg-surface border-border-subtle box-shadow-card">
            <CardContent className="p-8 flex h-full flex-col">
              <CardTitle className="text-xl mb-5">{item.title}</CardTitle>

              <div className="space-y-5 flex-grow">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">Challenge</p>
                  <CardDescription>{item.challenge}</CardDescription>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">Solution</p>
                  <CardDescription>{item.solution}</CardDescription>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">Outcomes</p>
                  <ul className="space-y-2">
                    {item.metrics.map((metric) => (
                      <li key={metric} className="rounded-lg border border-border-subtle bg-bg px-3 py-2 text-sm font-semibold text-trust">
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <Badge key={t} variant="neutral" className="bg-secondary text-text-secondary rounded-full">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-borders-subtle">
                <a
                  href="/projects"
                  className="text-sm font-bold text-accent hover:text-accent-hover transition-colors duration-200 inline-flex items-center gap-2"
                >
                  View related projects <span>→</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-8 items-center border-2 border-borders-elevated bg-surface p-10 shadow-card rounded-2xl">
        <div>
          <p className="text-2xl font-bold text-trust mb-3">Need a roadmap before committing?</p>
          <p className="text-lg text-text-secondary">We can review your constraints and send a scoped delivery plan after a short call.</p>
        </div>
        <div className="flex justify-end gap-3 flex-wrap">
          <Button href="/projects" variant="ghost" size="lg" className="rounded-full border border-border-subtle text-trust">
            View all projects
          </Button>
          <Button href="#contact" variant="primary" size="lg" className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover">
            Book a call
          </Button>
        </div>
      </div>
    </Section>
  );
}
