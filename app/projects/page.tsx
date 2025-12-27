import Link from "next/link";
import Navbar from "@/src/components/layouts/Navbar";
import Footer from "@/src/components/layouts/Footer";
import ProjectsClient from "@/src/components/projects/ProjectsClient";

export const metadata = {
  title: "Projects — Grade Up Solutions",
  description:
    "Selected work across product, web, mobile, backend, and automation.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-background text-trust">
      <Navbar />

      <main className="pt-16">
        {/* Header */}
        <section className="border-b border-borders-elevated">
          <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm text-slate">
                  <Link
                    href="/"
                    className="hover:text-trust transition-colors"
                  >
                    Home
                  </Link>
                  <span className="text-slate/60">/</span>
                  <span className="text-slate/60">Projects</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-trust text-balance">
                  Projects
                </h1>
                <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate">
                  A selection of outcomes-driven work across product
                  engineering, web, mobile, backend, DevOps, and pragmatic AI.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center rounded-xl border border-accent/30 bg-accent-soft px-4 py-2 text-sm font-medium text-trust transition hover:border-accent hover:shadow-glow hover:bg-accent-muted"
                >
                  Book a call
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Client grid + filters */}
        <ProjectsClient />

        <Footer />
      </main>
    </div>
  );
}
