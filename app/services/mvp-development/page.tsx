import type { Metadata } from "next";
import Navbar from "@/src/components/layouts/Navbar";
import Section from "@/src/components/layouts/Section";
import { Button } from "@/src/components/ui/Button";
import Footer from "@/src/components/layouts/Footer";

export const metadata: Metadata = {
  title: "MVP Development Services",
  description:
    "MVP development for startup founders: scoped delivery, weekly demos, and production-ready launch in 6-8 weeks.",
};

export default function MVPDevelopmentPage() {
  return (
    <div className="bg-background text-trust">
      <Navbar />
      <main className="pt-20">
        <Section
          eyebrow="MVP Development"
          title="Launch an MVP in 6–8 weeks without roadmap chaos"
          subtitle="We scope what matters, ship in weekly milestones, and hand over a production-ready foundation your team can scale."
          className="bg-bg py-12"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border-subtle bg-surface p-6">
              <h3 className="text-xl font-bold">What’s included</h3>
              <ul className="mt-4 space-y-2 text-text-secondary">
                <li>• Discovery + scope freeze</li>
                <li>• Product architecture and technical decisions</li>
                <li>• Core user journeys + QA</li>
                <li>• Launch checklist + clean handover</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-surface p-6">
              <h3 className="text-xl font-bold">Best fit</h3>
              <p className="mt-4 text-text-secondary">
                Founders validating product-market fit who need fast execution with clear communication and low delivery risk.
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
