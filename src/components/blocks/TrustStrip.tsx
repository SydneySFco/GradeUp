import Image from "next/image";

import Section from "@/src/components/layouts/Section";

const logos = [
  { name: "Northstar", src: "/trust/logos/northstar.svg" },
  { name: "PulseHQ", src: "/trust/logos/pulsehq.svg" },
  { name: "AtlasFlow", src: "/trust/logos/atlasflow.svg" },
  { name: "Brightlane", src: "/trust/logos/brightlane.svg" },
  { name: "VectorGrid", src: "/trust/logos/vectorgrid.svg" },
  { name: "ClearOps", src: "/trust/logos/clearops.svg" },
];

const proof = [
  { label: "Median launch acceleration", value: "38% faster", detail: "Scope-to-launch vs. prior baseline" },
  { label: "On-time weekly demos", value: "%92", detail: "Delivered on agreed sprint cadence" },
  { label: "Post-launch stability", value: "99.3%", detail: "First 30 days incident-free uptime" },
];

export default function TrustStrip() {
  return (
    <Section
      id="trust"
      eyebrow="Execution you can verify"
      title="Trusted by product teams shipping under pressure"
      subtitle="Operators choose us for consistent weekly delivery, transparent progress, and measurable outcomes across product cycles."
      className="bg-bg py-8"
    >
      <div className="rounded-2xl border border-border-subtle bg-surface p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate">Selected teams we supported</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-14 items-center justify-center rounded-xl border border-border-subtle bg-bg px-3"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={132}
                height={40}
                className="h-7 w-auto opacity-80"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {proof.map((item) => (
            <div key={item.label} className="rounded-xl border border-border-subtle bg-bg p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate">{item.label}</p>
              <p className="mt-2 text-xl font-bold text-trust">{item.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-text-secondary">
          Source: Aggregated delivery records across recent client engagements (rolling 12 months).
        </p>
      </div>
    </Section>
  );
}
