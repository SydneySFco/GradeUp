"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NavItem = { label: string; href: string };

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

export default function Navbar() {
  const items: NavItem[] = useMemo(
    () => [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Tech", href: "#tech" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  const [alpha, setAlpha] = useState(0); // Scroll ile opacity artar

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      // 0px -> 0, 200px -> 1
      const a = clamp(y / 200, 0, 1);
      setAlpha(a);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sayfa background'u ile eşleşen gradient (scroll ile biraz daha opak)
  const backgroundOpacity = 0.95 + (alpha * 0.05); // 0.95 -> 1.0
  const background = `linear-gradient(180deg, 
    rgba(255, 255, 255, ${backgroundOpacity}) 0%, 
    rgba(47, 107, 255, ${0.06 * backgroundOpacity}) 42%, 
    rgba(0, 179, 164, ${0.05 * backgroundOpacity}) 100%
  )`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="transition-all duration-300 ease-out"
        style={{
          background: alpha > 0.1 ? background : "transparent",
          backdropFilter: alpha > 0.1 ? "blur(20px) saturate(180%)" : "",
          WebkitBackdropFilter:
            alpha > 0.1 ? "blur(20px) saturate(180%)" : "",
          boxShadow: alpha > 0.3 ? "0 8px 32px rgba(0, 0, 0, 0.08) border-b border-border-subtle" : "",
        }}
      >
        <div className="mx-auto max-w-content px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo */}
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-trust transition-colors duration-300 hover:text-accent"
            >
              Logo
            </Link>

            {/* Right: nav */}
            <nav className="hidden md:flex items-center gap-6">
              {items.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  className="text-sm text-text-secondary transition-colors duration-300 hover:text-trust"
                >
                  {it.label}
                </a>
              ))}

              {/* Modern CTA - Matching image style */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-accent bg-accent text-white px-5 py-2.5 text-sm font-semibold transition-all rounded-full
                           hover:bg-accent-hover hover:border-accent-hover hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]"
              >
                Let&apos;s Talk
              </a>
            </nav>

            {/* Mobile: minimal */}
            <a
              href="#contact"
              className="md:hidden inline-flex items-center border-2 border-accent bg-accent text-white px-3 py-2 text-sm font-semibold transition-all hover:bg-accent-hover hover:border-accent-hover"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
