"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/src/components/ui/Button";
import { trackEvent } from "@/src/lib/analytics";

const optimizeUnsplashUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("q", "80");
    urlObj.searchParams.set("w", "2400");
    urlObj.searchParams.set("auto", "format");
    urlObj.searchParams.set("fit", "crop");
    return urlObj.toString();
  } catch {
    return url;
  }
};

type HeroSlide = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  titleSecondLine: string;
  subtitle: string;
};

export default function Hero() {
  const slides: HeroSlide[] = useMemo(
    () => [
      {
        imageSrc: optimizeUnsplashUrl(
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952"
        ),
        imageAlt: "Senior product team planning roadmap with founder",
        title: "Senior-led product engineering",
        titleSecondLine: "for startup founders.",
        subtitle:
          "From MVP to scale, we ship production-ready web and mobile products in clear weekly milestones — without delivery chaos.",
      },
      {
        imageSrc: optimizeUnsplashUrl(
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
        ),
        imageAlt: "Collaborative team working on a project",
        title: "Senior engineering",
        titleSecondLine: "that fits your team.",
        subtitle:
          "We work as an extension of your team, reduce handoffs, and deliver with the standards your roadmap depends on.",
      },
      {
        imageSrc: optimizeUnsplashUrl(
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
        ),
        imageAlt: "Successful team working on a project",
        title: "Build what matters.",
        titleSecondLine: "Measure the impact.",
        subtitle:
          "Modern stack, proven patterns, and outcomes you can track — performance, reliability, and UX quality.",
      },
    ],
    []
  );

  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ctaVariant, setCtaVariant] = useState<"A" | "B">("A");
  const [headlineVariant, setHeadlineVariant] = useState<"A" | "B">("A");

  const total = slides.length;
  const active = slides[index];

  const displayTitle =
    index === 0 && headlineVariant === "B"
      ? "Build your startup roadmap"
      : active.title;

  const displayTitleSecondLine =
    index === 0 && headlineVariant === "B"
      ? "with senior delivery from week one."
      : active.titleSecondLine;

  const displaySubtitle =
    index === 0 && headlineVariant === "B"
      ? "We turn founder goals into weekly milestones, clear scope, and production-ready releases your team can trust."
      : active.subtitle;

  const intervalRef = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => setIndex((i + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    slides.forEach((slide) => {
      const link = document.createElement("link");

      link.rel = "preload";
      link.as = "image";
      link.href = slide.imageSrc;

      document.head.appendChild(link);

      links.push(link);
    });

    return () => {
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [slides]);

  useEffect(() => {
    const savedCta = window.localStorage.getItem("hero_cta_variant");
    if (savedCta === "A" || savedCta === "B") {
      setCtaVariant(savedCta);
    } else {
      const assignedCta: "A" | "B" = Math.random() < 0.5 ? "A" : "B";
      window.localStorage.setItem("hero_cta_variant", assignedCta);
      setCtaVariant(assignedCta);
    }

    const savedHeadline = window.localStorage.getItem("hero_headline_variant");
    if (savedHeadline === "A" || savedHeadline === "B") {
      setHeadlineVariant(savedHeadline);
      trackEvent("hero_headline_variant_view", { variant: savedHeadline });
    } else {
      const assignedHeadline: "A" | "B" = Math.random() < 0.5 ? "A" : "B";
      window.localStorage.setItem("hero_headline_variant", assignedHeadline);
      setHeadlineVariant(assignedHeadline);
      trackEvent("hero_headline_variant_view", { variant: assignedHeadline });
    }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return; // reduced-motion: otomatik akmasın
    if (paused) return;

    intervalRef.current = window.setInterval(() => {
      setIndex((v) => (v + 1) % total);
    }, 5500);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [paused, total, shouldReduceMotion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const heroSection = document.querySelector(
        '[aria-label="Hero carousel"]'
      );
      if (!heroSection?.contains(document.activeElement)) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo, prev, next, total]);

  return (
    <section
      aria-label="Hero carousel"
      className="relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[82vh] min-h-[500px] sm:min-h-[560px] w-full">
        <div className="absolute inset-0 z-0">
          {slides.map((slide, i) => {
            const isActive = i === index;
            return (
              <motion.div
                key={slide.imageSrc}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 1 : 0,
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
                }
              >
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                  quality={85}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            );
          })}
        </div>

        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(31, 31, 31, 0.95) 0%, rgba(31, 31, 31, 0.9) 20%, rgba(31, 31, 31, 0.75) 40%, rgba(31, 31, 31, 0.5) 70%, rgba(31, 31, 31, 0.2) 100%)",
          }}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-accent-soft)] via-white/40 to-[color:var(--color-accent-2-soft)]" /> */}

        <div className="relative z-20 mx-auto max-w-7xl px-6 pt-20 lg:pt-40 h-full flex flex-col justify-between md:justify-end">
          <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.title}-${active.titleSecondLine}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                }
                className="max-w-4xl"
              >
                <h1 className="text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
                  <span className="text-white block">{displayTitle}</span>
                  <span
                    className="block bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #0066ff, #0080ff, #00a3ff, #0066ff)",
                    }}
                  >
                    {displayTitleSecondLine}
                  </span>
                </h1>

                <p
                  className="mt-8 max-w-3xl text-xl sm:text-2xl leading-relaxed font-light"
                  style={{ color: "#d4d4d8" }}
                >
                  {displaySubtitle}
                </p>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Button
                    href="#contact"
                    variant="primary"
                    size="lg"
                    className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover"
                    onClick={() =>
                      trackEvent("hero_primary_cta_click", {
                        variant: ctaVariant,
                        headline_variant: headlineVariant,
                        location: "hero",
                      })
                    }
                  >
                    {ctaVariant === "A"
                      ? "Book a 20-min call"
                      : "Book your roadmap call"}
                  </Button>
                  <Button
                    href="#process"
                    variant="ghost"
                    size="lg"
                    className="rounded-full border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60"
                    onClick={() =>
                      trackEvent("hero_secondary_cta_click", {
                        variant: ctaVariant,
                        headline_variant: headlineVariant,
                        location: "hero",
                      })
                    }
                  >
                    Get a sample roadmap
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap gap-2 text-xs sm:text-sm">
                  {[
                    "Founder-friendly planning",
                    "Weekly demos + written updates",
                    "Senior-only engineering pod",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/30 bg-white/5 px-3 py-1.5 text-white/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </MotionConfig>

          <div className="mt-10 mb-10 hidden sm:flex items-center justify-between">
            <div
              className="flex items-center gap-3"
              aria-label="Slide indicators"
            >
              {slides.map((_, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={[
                      "h-1 transition-all duration-200 rounded-full",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f1f]",
                      isActive
                        ? "w-12 bg-accent"
                        : "w-3 bg-white/40 hover:bg-white/60",
                    ].join(" ")}
                    aria-label={`Go to slide ${i + 1} of ${total}`}
                    aria-current={isActive ? "true" : "false"}
                  />
                );
              })}
            </div>

            <div
              className="flex items-center gap-3"
              role="group"
              aria-label="Carousel controls"
            >
              <button
                type="button"
                onClick={prev}
                className="h-12 w-12 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white transition-all hover:border-white/50 hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f1f] rounded-lg"
                aria-label="Previous slide"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={next}
                className="h-12 w-12 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white transition-all hover:border-white/50 hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f1f] rounded-lg"
                aria-label="Next slide"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px border-t border-secondary/20" />
      </div>
      <hr className="border-t border-secondary/20 mt-0" />
    </section>
  );
}
