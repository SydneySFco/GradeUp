import React from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string; // small label
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  subtitleClassName?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  innerClassName = "",
  subtitleClassName = "",
}: SectionProps) {
  return (
    <section id={id} className={`${className}`}>
      <div className={`mx-auto max-w-7xl px-6 sm:px-8 ${innerClassName}`}>
        {(eyebrow || title || subtitle) && (
          <header className="mb-16 sm:mb-20">
            {eyebrow && (
              <div className="mb-6">
                <span className="inline-block border-2 border-accent bg-accent px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-white">
                  {eyebrow}
                </span>
              </div>
            )}

            {title && (
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-trust text-balance leading-[1.1]">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className={`mt-6 max-w-3xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-text-secondary font-light ${subtitleClassName}`}>
                {subtitle}
              </p>
            )}
          </header>
        )}

        {children}
      </div>
      <hr className="border-t border-surface-soft mt-0 mx-auto max-w-7xl" />
    </section>
  );
}
