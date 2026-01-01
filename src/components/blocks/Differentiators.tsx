"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/Card";
import Section from "@/src/components/layouts/Section";
import {
  Hammer,
  MessageSquareText,
  Rocket,
  Route,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
    icon: MessageSquareText,
    title: "Working Session First",
    subtitle:
      "We start with a hands-on session to align fast and remove uncertainty.",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    imageAlt: "Clear roadmap and planning process",
    details: [
      "Clarify goals, constraints, and 'definition of done'",
      "Identify risks early (tech, scope, timeline)",
      "Turn the problem into a shared, executable plan",
    ],
  },
  {
    icon: Route,
    title: "Strategy + Plan with Milestones",
    subtitle: "A simple roadmap with clear priorities and acceptance criteria.",
    imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    imageAlt: "Senior engineering team collaboration",
    details: [
      "Break scope into milestones and deliverables",
      "Define acceptance criteria and success metrics",
      "Set cadence: demos, updates, and feedback loop",
    ],
  },
  {
    icon: Hammer,
    title: "Senior-Level Build",
    subtitle:
      "Production-grade delivery with quality built in — not bolted on.",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    imageAlt: "Predictable delivery and sprint planning",
    details: [
      "Clean architecture, readable code, consistent patterns",
      "Performance + accessibility as defaults",
      "Review discipline and stable delivery workflow",
    ],
  },
  {
    icon: Rocket,
    title: "Excellent Outcomes",
    subtitle:
      "We ship in increments, measure impact, and improve what matters.",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    imageAlt: "High performance user interface",
    details: [
      "Visible progress through incremental releases",
      "Outcomes focused: speed, reliability, UX quality",
      "Launch-ready mindset: monitoring, ownership, follow-ups",
    ],
  },
];

export default function Differentiators() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Default: ilk kutu
  const activeItem = hoveredIndex !== null ? items[hoveredIndex] : null;

  return (
    <>
      <Section
        id="why"
        eyebrow=""
        title="Grade Up. Because..."
        subtitle="From the first working session to launch — we keep execution clear, predictable, and outcome-driven."
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
                  className={`group bg-surface border-border-subtle transition-all duration-200 ${
                    isActive ? "border-accent/40" : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <CardContent className="p-6 flex items-start gap-6">
                    <div className="flex-shrink-0">
                      {/* Icon container with white background */}
                      <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border p-3 bg-accent-soft border-border-subtle group-hover:bg-[color:var(--color-accent-2-soft)]">
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
          <div className="lg:sticky lg:top-24 lg:h-fit flex flex-col items-center">
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.div
                  key={activeItem.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                  }
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
