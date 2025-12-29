"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/Card";
import Section from "@/src/components/layouts/Section";
import { Gauge, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  details: string[];
};

const items: Item[] = [
  {
    icon: Sparkles,
    title: "Clarity, not chaos",
    subtitle:
      "We transform complex requirements into streamlined, actionable roadmaps. No ambiguity, just a clear path to production ready code.",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    imageAlt: "Clear roadmap and planning process",
    details: [
      "Requirements analysis and technical discovery",
      "Structured roadmaps with clear milestones",
      "No scope creep or ambiguous deliverables",
      "Production-ready code from day one",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Senior level execution",
    subtitle:
      "Direct access to elite engineers. No junior trainees or hidden outsourcing—just seasoned experts solving your toughest challenges.",
    imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    imageAlt: "Senior engineering team collaboration",
    details: [
      "Elite engineers with 10+ years experience",
      "No junior developers or hidden outsourcing",
      "Direct access to decision-makers",
      "Proven track record with complex systems",
    ],
  },
  {
    icon: Workflow,
    title: "Predictable delivery",
    subtitle:
      "Reliable sprints and transparent velocity. We hit deadlines with precision, ensuring your go-to-market strategy stays on track.",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    imageAlt: "Predictable delivery and sprint planning",
    details: [
      "Transparent sprint planning and velocity",
      "Reliable deadlines with precision",
      "Clear communication and regular updates",
      "Go-to-market strategy stays on track",
    ],
  },
  {
    icon: Gauge,
    title: "Performance UI built-in",
    subtitle:
      "Speed isn't an afterthought. We bake performance budgets into the design phase, delivering interfaces that feel instant and luxurious.",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    imageAlt: "High performance user interface",
    details: [
      "Performance budgets in design phase",
      "Core Web Vitals optimization",
      "Instant and luxurious user experience",
      "Mobile-first performance approach",
    ],
  },
];

export default function Differentiators() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Default: ilk kutu
  const activeItem = hoveredIndex !== null ? items[hoveredIndex] : null;

  return (
    <>
      <Section
        id="why"
        eyebrow="WHY US"
        title="Our Difference"
        subtitle="We move beyond the transactional vendor relationship to become a strategic extension of your core team, delivering excellence at every layer of the stack."
        className="pt-10 sm:pt-12 lg:pt-14 py-10 bg-bg"
        subtitleClassName="max-w-full"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Cards List - Vertical */}
          <div className="space-y-4">
            {items.map((it, index) => {
              const Icon = it.icon;
              const isActive = hoveredIndex === index;
              return (
                <Card
                  key={it.title}
                  interactive
                  className={`group bg-surface border-secondary/30 transition-all ${
                    isActive ? "border-secondary" : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <CardContent className="p-6 flex items-start gap-6">
                    <div className="flex-shrink-0">
                      {/* Icon container with white background */}
                      <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border p-3 bg-accent-soft border-border-subtle">
                        <Icon className="h-8 w-8 text-accent" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <CardTitle className="mb-3 text-xl">{it.title}</CardTitle>
                      <CardDescription className="text-base">
                        {it.subtitle}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Right: Details */}
          <div className="lg:sticky lg:top-24 lg:h-fit flex items-center">
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.div
                  key={activeItem.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-full flex justify-center items-center"
                >
                  <div className="p-4 lg:p-8">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-trust mb-8 text-start">
                      {activeItem.title}
                    </h3>
                    <ul className="space-y-6 max-w-2xl mx-auto">
                      {activeItem.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-4 text-lg sm:text-xl text-text-secondary"
                        >
                          <span
                            className="mt-2 h-3 w-3 bg-secondary flex-shrink-0 rounded-full"
                            aria-hidden="true"
                          />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </>
  );
}
