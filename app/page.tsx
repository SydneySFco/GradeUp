import React from "react";
import type { Metadata } from "next";
import Navbar from "@/src/components/layouts/Navbar";
import Hero from "@/src/components/blocks/Hero";
import TrustStrip from "@/src/components/blocks/TrustStrip";
import FeaturedWorks from "@/src/components/blocks/FeaturedWorks";
import Process from "@/src/components/blocks/Process";
import Services from "@/src/components/blocks/Services";
import FAQ from "@/src/components/blocks/FAQ";
import Testimonials from "@/src/components/blocks/Testimonials";
import Contact from "@/src/components/blocks/Contact";
import Footer from "@/src/components/layouts/Footer";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Ship faster, stay predictable. We turn ambitious ideas into production-ready products — with clear scope, tight feedback loops, and clean execution. Senior engineering that fits your team.",
  openGraph: {
    title: "Grade Up Solutions — Modern Engineering for Startups",
    description:
      "Ship faster, stay predictable. We turn ambitious ideas into production-ready products — with clear scope, tight feedback loops, and clean execution.",
    url: "/",
  },
  twitter: {
    title: "Grade Up Solutions — Modern Engineering for Startups",
    description:
      "Ship faster, stay predictable. We turn ambitious ideas into production-ready products — with clear scope, tight feedback loops, and clean execution.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Grade Up Solutions",
      url: "https://gradeup.solutions",
      description:
        "Senior-led product engineering for startup teams shipping web, mobile, backend, and cloud products.",
    },
    {
      "@type": "Service",
      serviceType: "MVP Development",
      provider: { "@type": "Organization", name: "Grade Up Solutions" },
      areaServed: "Global",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How quickly can we start?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically within 1–2 weeks depending on scope and availability.",
          },
        },
        {
          "@type": "Question",
          name: "Can you work with our existing team and codebase?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We can integrate with your team, modernize parts of the stack, or deliver new features end-to-end.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <div id="top" className="bg-background text-trust">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <FeaturedWorks />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Footer />
    </div>
  );
}
