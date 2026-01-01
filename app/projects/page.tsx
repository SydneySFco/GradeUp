import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/src/components/layouts/Navbar";
import Footer from "@/src/components/layouts/Footer";
import ProjectsClient from "@/src/components/projects/ProjectsClient";
import { Button } from "@/src/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work across product engineering, web, mobile, backend, DevOps, and pragmatic AI. Proof through outcomes — not buzzwords.",
  openGraph: {
    title: "Projects — Grade Up Solutions",
    description:
      "Selected work across product engineering, web, mobile, backend, DevOps, and pragmatic AI. Proof through outcomes — not buzzwords.",
    url: "/projects",
  },
  twitter: {
    title: "Projects — Grade Up Solutions",
    description:
      "Selected work across product engineering, web, mobile, backend, DevOps, and pragmatic AI. Proof through outcomes — not buzzwords.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="bg-background text-trust">
      <Navbar />

      <main className="pt-16">
        {/* Modern Header */}
        <section className="relative overflow-hidden border-b-2 border-border-subtle bg-gradient-to-br from-surface-soft via-bg to-accent-soft/30">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-2/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative mx-auto max-w-7xl px-6 py-12 sm:py-28 lg:py-32">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="mb-8 flex items-center gap-2 text-sm">
                <Link
                  href="/"
                  className="text-slate hover:text-accent transition-colors font-medium"
                >
                  Home
                </Link>
                <span className="text-slate/40">/</span>
                <span className="text-slate/60 font-medium">Projects</span>
              </nav>

              {/* Eyebrow Badge */}
              <div className="mb-6 inline-block">
                <span className="inline-flex items-center gap-2 border-2 border-accent bg-accent px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase text-white rounded-full shadow-lg shadow-accent/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  Our Portfolio
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-trust text-balance leading-[1.1] mb-6">
                <span className="block">Projects</span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #2f6bff, #0080ff, #00b3a4, #2f6bff)",
                  }}
                >
                  That Deliver
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-slate max-w-3xl font-light mb-10">
                A selection of outcomes-driven work across product engineering,
                web, mobile, backend, DevOps, and pragmatic AI.{" "}
                <span className="text-trust font-medium">
                  Proof through outcomes — not buzzwords.
                </span>
              </p>

              {/* CTA Button */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href="/#contact"
                  variant="primary"
                  size="lg"
                  className="bg-accent text-white rounded-full hover:bg-accent-hover hover:shadow-[0_20px_50px_rgba(47,107,255,0.3)]"
                >
                  Book a call
                </Button>
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate hover:text-accent transition-colors group"
                >
                  <span>Explore projects</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Stats or highlights */}
              <div className="mt-12 pt-8 border-t border-border-subtle grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-trust mb-1 sm:mb-2">
                    4+
                  </div>
                  <div className="text-xs sm:text-sm text-slate font-medium">
                    Completed Projects
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-trust mb-1 sm:mb-2">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-slate font-medium">
                    Client Satisfaction
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-trust mb-1 sm:mb-2">
                    5+
                  </div>
                  <div className="text-xs sm:text-sm text-slate font-medium">
                    Tech Stacks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client grid + filters */}
        <div id="projects">
          <ProjectsClient />
        </div>

        <Footer />
      </main>
    </div>
  );
}
