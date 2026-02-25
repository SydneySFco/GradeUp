import React from "react";
import type { Metadata } from "next";
import Navbar from "@/src/components/layouts/Navbar";
import Hero from "@/src/components/blocks/Hero";
import TrustStrip from "@/src/components/blocks/TrustStrip";
import FeaturedWorks from "@/src/components/blocks/FeaturedWorks";
import Process from "@/src/components/blocks/Process";
import Services from "@/src/components/blocks/Services";
import FAQ from "@/src/components/blocks/FAQ";
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
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
