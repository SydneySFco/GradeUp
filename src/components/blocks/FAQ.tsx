import Section from "@/src/components/layouts/Section";
import { Card, CardContent } from "@/src/components/ui/Card";

type FAQItem = {
  q: string;
  a: string;
};

const faqs: FAQItem[] = [
  {
    q: "How do engagements work?",
    a: "We offer project-based delivery or a retainer model. In both cases, we align on goals, scope, milestones, and a clear definition of done before building.",
  },
  {
    q: "How quickly can we start?",
    a: "Typically within 1–2 weeks depending on scope and availability. For urgent needs, we can start with a short discovery to unblock priorities quickly.",
  },
  {
    q: "Can you work with our existing team and codebase?",
    a: "Yes. We can integrate with your team, pick up an existing product, modernize parts of the stack, or deliver new features end-to-end with clean handover.",
  },
  {
    q: "What does communication look like?",
    a: "Async-friendly with clear weekly touchpoints. Expect written updates, a visible plan, and regular demos — so progress is never a mystery.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We can support releases, monitoring, bugfixing, and iterative improvements. Retainer options are available for ongoing work.",
  },
  {
    q: "How do you handle security and NDAs?",
    a: "We’re NDA-friendly and follow sensible security practices (access control, least-privilege, and clean environments). We can align with your internal policies as needed.",
  },
];

export default function FAQ() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Quick answers"
      subtitle="A few common questions — so you can move forward with confidence."
      className="bg-surface py-10"
    >
      <div className="grid gap-4">
        {faqs.map((item) => (
          <Card key={item.q} className="h-full bg-bg border-surface-soft">
            <CardContent className="p-6">
              <details className="group">
                <summary className="cursor-pointer list-none select-none">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-trust">
                      {item.q}
                    </p>

                    {/* chevron */}
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg border border-honest/20 bg-honest-soft text-trust transition group-open:rotate-180 group-open:bg-accent-soft group-open:border-accent/40"
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  </div>
                </summary>

                <p className="mt-4 text-sm leading-relaxed text-slate">
                  {item.a}
                </p>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
