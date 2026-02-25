import type { Metadata } from "next";
import Navbar from "@/src/components/layouts/Navbar";
import Section from "@/src/components/layouts/Section";
import { Button } from "@/src/components/ui/Button";
import Footer from "@/src/components/layouts/Footer";

export const metadata: Metadata = {
  title: "React & Next.js Development Services",
  description:
    "Senior React and Next.js product delivery with performance, accessibility, and maintainable architecture for startup teams.",
};

export default function ReactNextPage() {
  return (
    <div className="bg-background text-trust">
      <Navbar />
      <main className="pt-20">
        <Section
          eyebrow="React / Next.js"
          title="Ship premium web experiences with React + Next.js"
          subtitle="Senior-led frontend execution focused on performance, UX quality, and maintainable code standards."
          className="bg-bg py-12"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border-subtle bg-surface p-6">
              <h3 className="text-xl font-bold">Delivery outcomes</h3>
              <ul className="mt-4 space-y-2 text-text-secondary">
                <li>• Faster release cycles with predictable QA</li>
                <li>• Better Core Web Vitals and UX consistency</li>
                <li>• Reusable component patterns and design system alignment</li>
                <li>• Lower frontend maintenance risk</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-surface p-6">
              <h3 className="text-xl font-bold">Best fit</h3>
              <p className="mt-4 text-text-secondary">
                Product teams scaling a React/Next.js codebase that need velocity and quality without adding roadmap chaos.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/#contact" variant="primary" className="rounded-full bg-accent text-white">Book a call</Button>
                <Button href="/projects" variant="ghost" className="rounded-full border border-border-subtle text-trust">See projects</Button>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
