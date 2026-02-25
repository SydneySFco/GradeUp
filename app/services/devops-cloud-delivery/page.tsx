import type { Metadata } from "next";
import Navbar from "@/src/components/layouts/Navbar";
import Section from "@/src/components/layouts/Section";
import { Button } from "@/src/components/ui/Button";
import Footer from "@/src/components/layouts/Footer";

export const metadata: Metadata = {
  title: "DevOps & Cloud Delivery Services",
  description:
    "DevOps and cloud delivery for startup products: CI/CD, observability, reliability, and safer releases with less operational overhead.",
};

export default function DevOpsCloudPage() {
  return (
    <div className="bg-background text-trust">
      <Navbar />
      <main className="pt-20">
        <Section
          eyebrow="DevOps / Cloud"
          title="Deploy with confidence through CI/CD and observability"
          subtitle="We build release pipelines and operational visibility so your team can ship faster with fewer incidents."
          className="bg-bg py-12"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border-subtle bg-surface p-6">
              <h3 className="text-xl font-bold">What we improve</h3>
              <ul className="mt-4 space-y-2 text-text-secondary">
                <li>• CI/CD pipeline reliability and release speed</li>
                <li>• Monitoring, alerting, and incident response clarity</li>
                <li>• Docker/deploy process hardening</li>
                <li>• Environment consistency across teams</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-surface p-6">
              <h3 className="text-xl font-bold">Best fit</h3>
              <p className="mt-4 text-text-secondary">
                Teams experiencing release friction, unstable environments, or poor production visibility.
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
