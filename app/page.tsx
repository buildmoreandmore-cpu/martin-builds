import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { ProfessionalServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "martin.builds — AI-Powered Tools for Small Business",
  description:
    "Custom AI tools, websites, and platforms — scoped, built, and live in 2 weeks. Starting at $5K. Based in Atlanta, GA.",
  openGraph: {
    title: "martin.builds — AI-Powered Tools for Small Business",
    description:
      "Custom AI tools, websites, and platforms — scoped, built, and live in 2 weeks. Built by Francis Martin in Atlanta.",
  },
};
import Hero from "@/components/Hero";
import Proof from "@/components/Proof";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ProfessionalServiceJsonLd />
      <Nav />
      <Hero />
      <Proof />
      <CTA />
      <Footer />
    </>
  );
}
