import React from "react";
import Navbar from "@/src/components/layouts/Navbar";
import Hero from "@/src/components/blocks/Hero";
import Differentiators from "@/src/components/blocks/Differentiators";
import FeaturedWorks from "@/src/components/blocks/FeaturedWorks";
import Process from "@/src/components/blocks/Process";
import Services from "@/src/components/blocks/Services";
import TechStacks from "@/src/components/blocks/TechStacks";
import FAQ from "@/src/components/blocks/FAQ";
import Contact from "@/src/components/blocks/Contact";
import Footer from "@/src/components/layouts/Footer";

export default function Home() {
  return (
    <div id="top" className="bg-background text-trust">
      <Navbar />
      <main>
        <Hero />
        <Differentiators />
        <FeaturedWorks />
        <Process />
        <Services />
        <TechStacks />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
