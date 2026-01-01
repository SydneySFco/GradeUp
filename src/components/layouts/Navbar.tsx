"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

export default function Navbar() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";

  const items: NavItem[] = useMemo(
    () => [
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Services", href: "#services" },
      { label: "Tech", href: "#tech" },
    ],
    []
  );

  // On projects page, start with visible navbar (white background)
  const [alpha, setAlpha] = useState(isProjectsPage ? 0.5 : 0);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      let a = clamp(y / 200, 0, 1);
      
      // On projects page, ensure minimum alpha for visibility
      if (isProjectsPage) {
        a = Math.max(a, 0.3);
      }
      
      setAlpha(a);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [isProjectsPage]);

  useEffect(() => {
    const sections = items.map((item) => {
      const id = item.href.replace("#", "");
      const element = document.getElementById(id);
      return { id, element };
    });

    const firstSection = sections[0]?.element;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (firstSection) {
        const firstRect = firstSection.getBoundingClientRect();
        if (firstRect.top > 150) {
          setActiveSection("");
          return;
        }
      }

      const intersecting = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => {
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });

      if (intersecting.length > 0) {
        setActiveSection(`#${intersecting[0].target.id}`);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    const checkActiveSection = () => {
      if (firstSection) {
        const firstRect = firstSection.getBoundingClientRect();

        if (firstRect.top > 150) {
          setActiveSection("");

          return;
        }
      }

      const offset = 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, element } = sections[i];

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= offset && rect.bottom >= 0) {
            setActiveSection(`#${id}`);

            return;
          }
        }
      }

      setActiveSection("");
    };

    window.addEventListener("scroll", checkActiveSection, { passive: true });
    checkActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkActiveSection);
    };
  }, [items]);

  const backgroundOpacity = 0.95 + alpha * 0.05; // 0.95 -> 1.0
  const background = `linear-gradient(180deg, 
    rgba(255, 255, 255, ${backgroundOpacity}) 0%, 
    rgba(47, 107, 255, ${0.06 * backgroundOpacity}) 42%, 
    rgba(0, 179, 164, ${0.05 * backgroundOpacity}) 100%
  )`;

  // On projects page, always show background and use dark text
  const shouldShowBackground = isProjectsPage || alpha > 0.1;
  const shouldUseDarkText = isProjectsPage || alpha > 0.1;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="transition-all duration-200 ease-out"
        style={{
          background: shouldShowBackground ? background : "transparent",
          backdropFilter: shouldShowBackground ? "blur(20px) saturate(180%)" : "",
          WebkitBackdropFilter: shouldShowBackground ? "blur(20px) saturate(180%)" : "",
          boxShadow:
            alpha > 0.3
              ? "0 8px 32px rgba(0, 0, 0, 0.08) border-b border-border-subtle"
              : "",
        }}
      >
        <div className="mx-auto max-w-content px-6">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
                shouldUseDarkText
                  ? "text-trust hover:text-accent"
                  : "text-white hover:text-accent/50"
              }`}
            >
              Logo
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {items.map((it) => {
                const isActive = activeSection === it.href;
                return (
                  <a
                    key={it.href}
                    href={it.href}
                    className={`text-sm transition-colors duration-200 ${
                      shouldUseDarkText
                        ? isActive
                          ? "text-accent font-semibold"
                          : "text-trust hover:text-accent"
                        : isActive
                          ? "text-accent font-semibold"
                          : "text-white/90 hover:text-white"
                    }`}
                  >
                    {it.label}
                  </a>
                );
              })}

              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-accent bg-accent text-white px-5 py-2.5 text-sm font-semibold transition-all rounded-full
                           hover:bg-accent-hover hover:border-accent-hover hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]"
              >
                Book a call
              </a>
            </nav>

            <nav className="md:hidden flex items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center border-2 border-accent bg-accent text-white px-3 py-2 text-sm font-semibold transition-all rounded-full hover:bg-accent-hover hover:border-accent-hover"
              >
                Book a call
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
