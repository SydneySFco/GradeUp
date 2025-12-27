import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Tech", href: "#tech" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-surface-soft bg-bg">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <h3 className="text-xl font-bold tracking-tight text-trust mb-4">
              Grade Up Solutions
            </h3>
            <p className="text-base leading-relaxed text-text-secondary max-w-md mb-6">
              Modern engineering, calm execution, and premium delivery — for
              startups and digital teams.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                Book a call →
              </a>
              <span className="h-4 w-px bg-borders-elevated" />
              <Link
                href="/projects"
                className="text-sm font-semibold text-text-secondary hover:text-trust transition-colors"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-text-muted mb-6">
              Navigation
            </h4>
            <nav>
              <ul className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-base text-text-secondary hover:text-trust transition-colors inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact & Social Section */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-text-muted mb-6">
              Connect
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-muted mb-1">Email</p>
                <a
                  href="mailto:info@gradeup.solutions"
                  className="text-base font-medium text-trust hover:text-accent transition-colors block"
                >
                  info@gradeup.solutions
                </a>
              </div>
              <div className="pt-2">
                <p className="text-xs text-text-muted mb-3">Social</p>
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                  <span className="h-4 w-px bg-borders-elevated" />
                  <a
                    href="#"
                    className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                    aria-label="GitHub"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surface-soft">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              © {year} Grade Up Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="#"
                className="text-text-muted hover:text-trust transition-colors"
              >
                Privacy Policy
              </a>
              <span className="h-4 w-px bg-borders-elevated" />
              <a
                href="#"
                className="text-text-muted hover:text-trust transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
