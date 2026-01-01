"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/Card";
import Section from "@/src/components/layouts/Section";
import {
  Compass,
  ShieldCheck,
  CalendarClock,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Item = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  details: string[];
};

const items: Item[] = [
  {
    icon: Compass,
    title: "Clarity over complexity",
    subtitle:
      "We reduce ambiguity fast so teams can move with confidence.",
    details: [
      "Tight scope, success metrics, clear \"definition of done\"",
      "Early risk identification (tech, timeline, dependencies)",
      "Decisions documented so nothing gets lost",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Senior-level engineering",
    subtitle:
      "Production-grade quality with maintainable foundations.",
    details: [
      "Clean architecture and readable, consistent patterns",
      "Performance + accessibility treated as defaults",
      "Reviews and standards that keep velocity sustainable",
    ],
  },
  {
    icon: CalendarClock,
    title: "Predictable collaboration",
    subtitle:
      "You always know what's happening and what's next.",
    details: [
      "Weekly demos + written updates",
      "Async-friendly communication, fewer meetings",
      "Fast feedback loops, no surprises",
    ],
  },
  {
    icon: TrendingUp,
    title: "Outcomes, not activity",
    subtitle:
      "We optimize for impact — not busywork.",
    details: [
      "Incremental releases with visible progress",
      "Focus on speed, reliability, UX quality",
      "Pragmatic decisions that compound over time",
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
        eyebrow="WHY GRADE UP"
        title="Delivery standards you can rely on"
        subtitle="Calm execution, senior decisions, and predictable momentum — built for startups and digital teams."
        className="pt-10 sm:pt-12 lg:pt-14 py-10 bg-bg"
        subtitleClassName="max-w-full"
      >
        <div className="grid gap-8 md:grid-cols-2">
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

          <div className="hidden md:flex lg:sticky lg:top-24 lg:h-fit flex-col items-center">
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
