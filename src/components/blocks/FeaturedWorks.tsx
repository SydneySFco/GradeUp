import Section from "@/src/components/layouts/Section";
import { Card, CardContent, CardDescription, CardTitle } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";

type WorkItem = {
  title: string;
  problem: string;
  whatWeDid: string;
  outcomes: string[];
  tech: string[];
};

const work: WorkItem[] = [
  {
    title: "B2B Analytics Dashboard",
    problem: "Stakeholders needed faster, clearer reporting across teams and roles.",
    whatWeDid: "Designed a role-based portal with a clean data layer and admin workflows.",
    outcomes: ["Reduced reporting friction", "Improved performance and UX consistency"],
    tech: ["Next.js", "TypeScript", "Postgres", "RBAC"],
  },
  {
    title: "Marketplace Mobile App",
    problem: "A multi-sided product needed reliable onboarding and a smooth purchase flow.",
    whatWeDid: "Built core user journeys with scalable architecture and release-ready stability.",
    outcomes: ["Higher funnel completion", "More predictable releases"],
    tech: ["React Native", "Payments", "API Design", "CI/CD"],
  },
  {
    title: "AI-Assisted Operations Tool",
    problem: "Manual internal workflows were slowing down operations and decision-making.",
    whatWeDid: "Automated summaries, routing, and repetitive tasks with pragmatic AI features.",
    outcomes: ["Less manual work", "Faster internal response time"],
    tech: ["AI", "Automation", "Integrations", "Observability"],
  },
];

export default function FeaturedWork() {
  return (
    <Section
      id="work"
      eyebrow="Selected Work"
      title="Proof through outcomes — not buzzwords."
      subtitle="A few examples of how we help teams move faster, stay stable, and ship with confidence."
      className="bg-bg py-10"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {work.map((item) => (
          <Card key={item.title} interactive className="h-full bg-surface border-border-subtle box-shadow-card">
            <CardContent className="p-8 flex h-full flex-col">
              <CardTitle className="text-xl mb-6">{item.title}</CardTitle>

              <div className="space-y-6 flex-grow">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">
                    Problem
                  </p>
                  <CardDescription className="text-base">{item.problem}</CardDescription>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">
                    What we did
                  </p>
                  <CardDescription className="text-base">{item.whatWeDid}</CardDescription>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">
                    Outcomes
                  </p>
                  <ul className="space-y-3">
                    {item.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span className="mt-1.5 h-2 w-2 bg-secondary flex-shrink-0" aria-hidden="true" />
                        <span className="leading-relaxed">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  {item.tech.map((t, idx) => (
                    <Badge 
                      key={t} 
                      variant="neutral" 
                      className={"bg-secondary text-text-secondary rounded-full"}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-borders-subtle">
                <a
                  href="/projects"
                  className="text-sm font-bold text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-2"
                >
                  View related projects <span>→</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8 items-center border-2 border-borders-elevated bg-surface p-10 shadow-card rounded-2xl">
        <div>
          <p className="text-2xl font-bold text-trust mb-3">Want the full list?</p>
          <p className="text-lg text-text-secondary">
            Explore more projects and the outcomes behind them.
          </p>
        </div>
        <div className="flex justify-end">
          <Button href="/projects" variant="primary" size="lg" className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover">
            View all projects
          </Button>
        </div>
      </div>
    </Section>
  );
}
