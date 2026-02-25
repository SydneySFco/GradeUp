import Section from "@/src/components/layouts/Section";

const logos = ["Early-stage SaaS", "HealthTech", "Marketplaces", "Agencies", "B2B Platforms"];

const proof = [
  { label: "Avg. launch acceleration", value: "30–45% faster" },
  { label: "Weekly delivery rhythm", value: "1 demo / week" },
  { label: "Typical team model", value: "Senior-only pod" },
];

export default function TrustStrip() {
  return (
    <Section
      id="trust"
      eyebrow="Trusted delivery"
      title="Built for founders who need predictable momentum"
      subtitle="Calm collaboration, senior decisions, and transparent weekly progress — so roadmap risk goes down as execution speed goes up."
      className="bg-bg py-8"
    >
      <div className="rounded-2xl border border-border-subtle bg-surface p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate">Teams we commonly support</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {logos.map((logo) => (
            <span
              key={logo}
              className="inline-flex items-center rounded-full border border-border-subtle bg-bg px-3 py-1.5 text-xs font-semibold text-text-secondary"
            >
              {logo}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {proof.map((item) => (
            <div key={item.label} className="rounded-xl border border-border-subtle bg-bg p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate">{item.label}</p>
              <p className="mt-2 text-xl font-bold text-trust">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
