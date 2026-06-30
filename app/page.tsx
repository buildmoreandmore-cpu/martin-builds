import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { ProfessionalServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "martin.builds — Custom Websites & Dashboards",
  description:
    "Custom websites with built-in admin dashboards — scoped, built, and live in 2 weeks. You own everything. Based in Atlanta, GA.",
  openGraph: {
    title: "martin.builds — Custom Websites & Dashboards",
    description:
      "Every site ships with a custom admin dashboard. No templates. No monthly fees. Built by Martin Francis in Atlanta.",
  },
};
import Hero from "@/components/Hero";
import LiveBuilds from "@/components/LiveBuilds";
import ObjectionHandler from "@/components/ObjectionHandler";
import Services from "@/components/Services";
import AuthorityStack from "@/components/AuthorityStack";
import DashboardPreview from "@/components/DashboardPreview";
import Process from "@/components/Process";
import Founder from "@/components/Founder";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ProfessionalServiceJsonLd />
      <Nav />
      <Hero />
      {/* PROOF FIRST — real shipped demos right under the hero */}
      <LiveBuilds />
      {/* Strongest trust signal — named client, named outcome */}
      <Testimonials />
      <AuthorityStack />
      <Services />
      {/* Sharp comparison — sits between Services (here's what I sell)
          and Process (here's what happens after you buy). */}
      <ObjectionHandler />
      <Process />
      {/* "How I scope it" — the configurable preview anchors the
          how-we-work narrative. */}
      <DashboardPreview />
      <Founder />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
