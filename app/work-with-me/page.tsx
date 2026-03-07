import type { Metadata } from "next";
import Nav from "@/components/Nav";
import WWMHero from "@/components/wwm/Hero";
import TheGap from "@/components/wwm/TheGap";
import ServiceTiers from "@/components/wwm/ServiceTiers";
import ProofWork from "@/components/wwm/ProofWork";
import Testimonials from "@/components/wwm/Testimonials";
import FAQ from "@/components/wwm/FAQ";
import FinalCTA from "@/components/wwm/FinalCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Work With Me — martin.builds",
  description:
    "One builder. Clear scope. Live in 2 weeks. AI-powered sites, platforms, and tools for small businesses — from $5,000.",
};

export default function WorkWithMePage() {
  return (
    <>
      <Nav />
      <WWMHero />
      <TheGap />
      <ServiceTiers />
      <ProofWork />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
