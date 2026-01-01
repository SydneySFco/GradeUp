"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Briefcase, Route, Settings, Code, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type NavItem = { label: string; href: string; icon?: React.ElementType };

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

export default function Navbar() {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";

  const items: NavItem[] = useMemo(
    () => [
      { label: "Work", href: "#work", icon: Briefcase },
      { label: "Process", href: "#process", icon: Route },
      { label: "Services", href: "#services", icon: Settings },
      { label: "Tech", href: "#tech", icon: Code },
    ],
    []
  );

  // On projects page, start with visible navbar (white background)
  const [alpha, setAlpha] = useState(isProjectsPage ? 0.5 : 0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  // Close menu handler
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  // Get navigation href - if on projects page, go to home page first
  const getNavHref = (href: string) => {
    if (isProjectsPage && href.startsWith("#")) {
      return `/${href}`;
    }
    return href;
  };

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
    <>
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
                      href={getNavHref(it.href)}
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
                  href={isProjectsPage ? "/#contact" : "#contact"}
                  className="inline-flex items-center gap-2 border-2 border-accent bg-accent text-white px-5 py-2.5 text-sm font-semibold transition-all rounded-full
                             hover:bg-accent-hover hover:border-accent-hover hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]"
                >
                  Book a call
                </a>
              </nav>

              <nav className="md:hidden flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`relative p-2.5 rounded-xl transition-all duration-200 z-[60] ${
                    shouldUseDarkText
                      ? "text-trust hover:bg-accent-soft active:scale-95"
                      : "text-white hover:bg-white/10 active:scale-95"
                  }`}
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay & Panel - Outside header for proper z-index */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-surface-elevated border-l border-border-subtle shadow-2xl z-[60] md:hidden overflow-y-auto"
              style={{
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
              }}
            >
              <div className="pt-20 px-6 pb-8">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-trust mb-2">Menu</h2>
                  <p className="text-sm text-slate">Navigate to sections</p>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2 mb-8">
                  {items.map((it, index) => {
                    const Icon = it.icon || ArrowRight;
                    const isActive = activeSection === it.href;
                    return (
                      <motion.a
                        key={it.href}
                        href={getNavHref(it.href)}
                        onClick={() => {
                          // Close menu immediately
                          closeMenu();
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className={`group flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-accent text-white shadow-lg shadow-accent/30"
                            : "bg-surface text-trust hover:bg-accent-soft hover:text-accent hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 p-2.5 rounded-xl transition-all ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="flex-1">{it.label}</span>
                        <ArrowRight
                          className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                            isActive ? "text-white" : "text-slate/40"
                          }`}
                        />
                      </motion.a>
                    );
                  })}
                </nav>

                {/* CTA Button */}
                <motion.a
                  href={isProjectsPage ? "/#contact" : "#contact"}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: items.length * 0.1, duration: 0.3 }}
                  className="block w-full text-center px-6 py-4 bg-gradient-to-r from-accent to-accent-hover text-white rounded-2xl text-base font-bold transition-all shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book a call
                </motion.a>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (items.length + 1) * 0.1, duration: 0.3 }}
                  className="mt-8 pt-6 border-t border-border-subtle"
                >
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block text-center text-sm text-slate hover:text-accent transition-colors"
                  >
                    Back to Home
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
