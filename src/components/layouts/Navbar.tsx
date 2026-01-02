"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Briefcase,
  Route,
  Settings,
  Code,
  ArrowRight,
} from "lucide-react";
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
    rgba(47, 107, 255, ${0.06 *backgroundOpacity}) 0%, 
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
            backdropFilter: shouldShowBackground
              ? "blur(20px) saturate(180%)"
              : "",
            WebkitBackdropFilter: shouldShowBackground
              ? "blur(20px) saturate(180%)"
              : "",
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
                className={`text-sm font-semibold tracking-tight transition-colors duration-200 text-accent ${
                  shouldUseDarkText
                    ? "hover:text-accent/80"
                    : "hover:text-accent/70"
                }`}
              >
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="64"
                  viewBox="0 0 500.000000 500.000000"
                  preserveAspectRatio="xMidYMid meet"
                  className=""
                >
                  <g
                    transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                    fill="currentColor"
                    stroke="none"
                  >
                    <path d="M3943 3212 l-132 -207 105 -3 104 -3 0 -417 c0 -275 -4 -431 -11 -457 -7 -23 -28 -57 -53 -81 -52 -53 -128 -72 -214 -55 -80 16 -117 43 -149 109 l-28 57 -3 323 -4 322 -54 0 -54 0 0 -305 c0 -381 9 -431 95 -517 124 -123 384 -122 501 4 44 46 71 105 84 179 5 36 10 233 10 451 l0 387 103 3 104 3 -127 197 c-69 109 -130 202 -135 207 -6 6 -59 -68 -142 -197z" />
                    <path d="M546 2936 c-60 -22 -108 -67 -141 -131 -26 -50 -30 -70 -30 -134 1 -158 98 -266 251 -279 157 -12 294 108 294 260 l0 38 -145 0 -145 0 0 -25 0 -25 111 0 111 0 -7 -32 c-11 -49 -30 -82 -69 -116 -40 -35 -85 -47 -156 -40 -161 16 -237 225 -133 366 35 46 91 72 158 72 71 0 115 -19 151 -64 24 -30 35 -36 67 -36 20 0 37 4 37 8 0 23 -64 94 -106 118 -39 23 -61 28 -128 31 -53 2 -94 -2 -120 -11z" />
                    <path d="M1030 2671 l0 -281 30 0 30 0 0 115 0 115 49 0 49 0 56 -98 c78 -136 76 -134 118 -130 l36 3 -68 114 -69 114 42 21 c23 12 52 37 65 56 33 49 28 146 -8 186 -46 48 -77 57 -207 62 l-123 4 0 -281z m243 208 c32 -14 48 -44 49 -88 1 -82 -40 -113 -150 -115 l-77 -1 -3 108 -3 107 80 0 c44 0 91 -5 104 -11z" />
                    <path d="M2060 2671 l0 -281 88 0 c105 0 192 15 243 41 138 70 173 299 65 426 -56 64 -117 85 -268 91 l-128 5 0 -282z m278 200 c77 -39 112 -104 112 -203 -1 -148 -79 -218 -245 -218 l-85 0 0 220 0 220 90 0 c70 0 100 -4 128 -19z" />
                    <path d="M2630 2670 l0 -280 145 0 145 0 0 30 0 30 -115 0 -115 0 0 100 0 100 105 0 105 0 0 25 0 25 -105 0 -105 0 0 95 0 95 115 0 115 0 0 30 0 30 -145 0 -145 0 0 -280z" />
                    <path d="M1677 2933 c-6 -9 -197 -533 -197 -539 0 -2 15 -4 34 -4 33 0 35 2 57 65 l23 66 125 -3 126 -3 21 -60 c20 -57 23 -60 58 -63 l36 -3 -32 88 c-17 48 -62 171 -98 273 l-67 185 -41 3 c-22 2 -43 -1 -45 -5z m97 -218 c25 -71 46 -133 46 -137 0 -5 -45 -8 -100 -8 -65 0 -100 4 -100 11 0 22 95 278 101 271 4 -4 27 -65 53 -137z" />
                    <path d="M4340 2335 l0 -455 60 0 60 0 0 194 0 194 148 4 c162 4 209 17 266 74 52 53 71 101 70 184 0 89 -21 137 -83 193 -63 57 -114 67 -333 67 l-188 0 0 -455z m421 337 c47 -28 69 -75 69 -144 0 -70 -25 -116 -80 -145 -38 -20 -57 -23 -167 -23 l-123 0 0 171 0 171 133 -4 c116 -3 136 -6 168 -26z" />
                    <path d="M342 2069 c-52 -11 -82 -45 -82 -94 0 -53 25 -78 104 -100 63 -18 96 -44 96 -74 0 -66 -114 -90 -148 -31 -11 19 -25 30 -40 30 -21 0 -21 -2 -9 -32 29 -74 154 -91 209 -29 32 35 37 84 13 118 -9 12 -43 31 -82 43 -38 13 -76 29 -85 38 -40 34 -5 102 51 102 17 0 42 -11 59 -25 45 -38 72 -33 56 9 -13 33 -87 57 -142 45z" />
                    <path d="M2890 2070 c-74 -18 -106 -105 -56 -155 13 -13 47 -31 77 -39 74 -22 99 -41 99 -75 0 -30 -21 -54 -57 -65 -29 -9 -90 17 -98 43 -9 28 -45 28 -45 1 0 -29 45 -68 86 -76 86 -16 154 27 154 98 0 51 -30 81 -104 102 -90 26 -120 72 -76 116 29 29 85 27 114 -5 23 -25 66 -34 66 -14 0 18 -57 69 -78 69 -11 0 -26 2 -34 4 -7 2 -29 0 -48 -4z" />
                    <path d="M654 2051 c-65 -40 -102 -119 -90 -196 20 -124 152 -190 266 -132 133 66 132 264 -1 333 -41 21 -137 18 -175 -5z m172 -36 c14 -9 35 -37 46 -62 29 -66 18 -125 -32 -175 -35 -35 -42 -38 -93 -38 -48 0 -61 4 -91 30 -55 49 -66 148 -23 214 36 54 133 70 193 31z" />
                    <path d="M1000 1885 l0 -185 91 0 c81 0 90 2 87 18 -3 14 -16 18 -71 20 l-67 3 0 164 c0 158 -1 165 -20 165 -19 0 -20 -7 -20 -185z" />
                    <path d="M1230 1938 c0 -107 4 -140 18 -168 43 -88 193 -93 239 -8 14 26 18 62 21 171 l4 137 -26 0 -26 0 0 -140 c0 -136 -1 -142 -25 -165 -35 -36 -102 -35 -136 1 -23 24 -24 33 -27 165 -3 129 -5 139 -23 139 -18 0 -19 -8 -19 -132z" />
                    <path d="M1570 2055 c0 -11 12 -15 50 -15 l50 0 0 -170 0 -170 25 0 25 0 0 170 0 170 50 0 c38 0 50 4 50 15 0 13 -21 15 -125 15 -104 0 -125 -2 -125 -15z" />
                    <path d="M1880 1885 l0 -185 25 0 25 0 0 185 0 185 -25 0 -25 0 0 -185z" />
                    <path d="M2095 2051 c-89 -55 -119 -152 -76 -246 22 -48 44 -69 94 -90 110 -46 234 23 253 140 12 78 -30 166 -97 200 -41 22 -137 19 -174 -4z m151 -27 c48 -23 74 -70 74 -133 0 -95 -49 -151 -132 -151 -64 0 -103 23 -128 75 -26 53 -25 90 3 145 36 72 110 98 183 64z" />
                    <path d="M2440 1885 c0 -178 1 -185 20 -185 18 0 20 8 22 152 l3 151 100 -151 c79 -120 105 -152 123 -152 l22 0 0 185 0 185 -25 0 -25 0 0 -147 0 -148 -98 147 c-77 117 -102 148 -119 148 l-23 0 0 -185z" />
                  </g>
                </svg>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                {items.map((it) => {
                  const isActive = activeSection === it.href;
                  return (
                    <a
                      key={it.href}
                      href={getNavHref(it.href)}
                      className={`text-lg font-bold transition-colors duration-200 ${
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
                  transition={{
                    delay: (items.length + 1) * 0.1,
                    duration: 0.3,
                  }}
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
