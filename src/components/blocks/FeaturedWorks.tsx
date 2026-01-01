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
    title: "ParaMe",
    problem:
      "People with disabilities struggled to find accessible sports and training opportunities tailored to their needs in their local area.",
    whatWeDid:
      "Built a user-friendly platform connecting individuals with disabilities to suitable sports activities and training programs with comprehensive filtering and location-based search.",
    outcomes: [
      "Improved access to sports activities for people with disabilities",
      "Better matching between individuals and opportunities",
      "Enhanced community engagement",
    ],
    tech: ["React", "Styled Components", "Redux", "Gatsby", "MySQL"],
  },
  {
    title: "Adeptive Digital",
    problem:
      "Adeptive needed a modern, engaging website that demonstrates their ability to transform complex software and digital needs into user-friendly, sustainable systems.",
    whatWeDid:
      "Created a dynamic, visually appealing website with smooth animations and modern design that showcases the agency's portfolio and services effectively.",
    outcomes: [
      "Enhanced brand presence and credibility",
      "Better client engagement and lead generation",
      "Showcase of technical capabilities",
    ],
    tech: ["Next.js", "Tailwind", "Redux", "Sanity", "GSAP"],
  },
  {
    title: "Physiotherapy Website",
    problem:
      "Individuals seeking physical therapy services needed easier access to expert physiotherapists and personalized treatment programs for musculoskeletal disorders and rehabilitation.",
    whatWeDid:
      "Developed an online platform connecting patients with expert physiotherapists, enabling personalized treatment programs and easy access to reliable expertise.",
    outcomes: [
      "Improved access to physiotherapy services",
      "Personalized treatment programs",
      "Better patient-physiotherapist matching",
    ],
    tech: ["Next.js", "React", "Redux", "Framer Motion", "Tailwind"],
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
                  <CardDescription>{item.problem}</CardDescription>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">
                    What we did
                  </p>
                  <CardDescription>{item.whatWeDid}</CardDescription>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">
                    Outcomes
                  </p>
                  <ul className="space-y-3">
                    {item.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span className="mt-1.5 h-2 w-2 bg-accent flex-shrink-0 rounded-full" aria-hidden="true" />
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
                  className="text-sm font-bold text-accent hover:text-accent-hover transition-colors duration-200 inline-flex items-center gap-2"
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
