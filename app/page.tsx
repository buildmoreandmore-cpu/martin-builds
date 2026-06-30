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
import WhyThisExists from "@/components/WhyThisExists";
import NamedSystem from "@/components/NamedSystem";
import AuthorityStack from "@/components/AuthorityStack";
import DashboardPreview from "@/components/DashboardPreview";
import Process from "@/components/Process";
import WhatIBuild from "@/components/WhatIBuild";
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
      <WhyThisExists />
      <AuthorityStack />
      <Services />
      <Process />
      {/* Sharp comparison — the most screenshottable section */}
      <ObjectionHandler />
      {/* "See how I scope it" — the configurable preview now anchors the
          how-we-work narrative instead of leading the page. */}
      <DashboardPreview />
      <WhatIBuild />
      <NamedSystem />
      <Founder />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
