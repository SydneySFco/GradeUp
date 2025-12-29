"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/src/components/ui/Button";

type HeroSlide = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  titleSecondLine: string; // Gradient için ikinci satır
  subtitle: string;
};

export default function Hero() {
  // Şimdilik component içinde; sonra data layer'a taşırız.
  const slides: HeroSlide[] = useMemo(
    () => [
      {
        imageSrc:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
        imageAlt: "Team collaboration and successful product work",
        title: "Ship faster, scale smarter",
        titleSecondLine: "without the chaos.",
        subtitle: "We transform ambitious ideas into production-ready products. No fluff, just execution that moves the needle.",
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        imageAlt: "Collaborative team working on a project",
        title: "Elite engineering",
        titleSecondLine: "on your timeline.",
        subtitle:
          "Senior-level talent, predictable delivery, and zero handoffs. We're the extension of your team that actually delivers.",
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
        imageAlt: "Successful team working on a project",
        title: "We build what matters",
        titleSecondLine: "not what's trendy.",
        subtitle:
          "We cut through the noise. Modern stack, proven patterns, and outcomes that matter—not buzzwords that fade.",
      },
    ],
    []
  );

  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = slides.length;
  const active = slides[index];

  const intervalRef = useRef<number | null>(null);

  const goTo = (i: number) => setIndex((i + total) % total);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

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

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Height: premium hero */}
      <div className="relative h-[86vh] min-h-[560px] w-full">
        {/* Background slider (cross-fade) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.imageSrc}
            className="absolute inset-0 z-0"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <Image
              src={active.imageSrc}
              alt={active.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay - Soldan sağa transparent (0->100) */}
        {/* <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #1f1f1f 0%, rgba(31, 31, 31, 0.95) 20%, rgba(31, 31, 31, 0.7) 40%, rgba(31, 31, 31, 0.3) 70%, transparent 100%)",
          }}
        /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-accent-soft)] via-white/40 to-[color:var(--color-accent-2-soft)]" />

        {/* Content */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 pt-32 lg:pt-40 h-full flex flex-col justify-between">
          <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.title}-${active.titleSecondLine}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="max-w-4xl"
              >
                {/* Eyebrow */}
                {/* <div className="mb-6 inline-flex items-center gap-3">
                  <span className="h-0.5 w-16 bg-accent" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                    Grade Up Solutions
                  </span>
                </div> */}

                <h1 className="text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
                  <span className="text-text-primary block">
                    {active.title}
                  </span>
                  <span
                    className="block bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #0066ff, #0080ff, #00a3ff, #0066ff)",
                    }}
                  >
                    {active.titleSecondLine}
                  </span>
                </h1>

                <p
                  className="mt-8 max-w-3xl text-xl sm:text-2xl leading-relaxed font-light"
                  style={{ color: "#d4d4d8" }}
                >
                  {active.subtitle}
                </p>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Button href="#contact" variant="primary" size="lg" className="bg-accent text-white rounded-full hover:bg-accent-hover hover:border-accent-hover">
                    Schedule Consultation
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </MotionConfig>

          <div className="mt-16 mb-16 flex items-center justify-between">
            <div
              className="flex items-center gap-3"
              aria-label="Hero slide indicators"
            >
              {slides.map((_, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={[
                      "h-1 transition-all duration-300",
                      isActive
                        ? "w-12 bg-accent"
                        : "w-3 bg-borders-elevated hover:bg-accent/50",
                    ].join(" ")}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={isActive ? "true" : "false"}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                className="h-12 w-12 border-2 border-borders-elevated bg-surface text-text-primary transition-all hover:border-accent hover:bg-accent-soft active:scale-95"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="h-12 w-12 border-2 border-borders-elevated bg-surface text-text-primary transition-all hover:border-accent hover:bg-accent-soft active:scale-95"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="absolute inset-x-0 bottom-0 h-px border-t border-secondary/20" />
      </div>
      <hr className="border-t border-secondary/20 mt-0" />
    </section>
  );
}
