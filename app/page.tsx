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
import ObjectionHandler from "@/components/ObjectionHandler";
import ScanCTA from "@/components/ScanCTA";
import Services from "@/components/Services";
import SaaSComparison from "@/components/SaaSComparison";
import DashboardsContent from "@/components/DashboardsContent";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ProfessionalServiceJsonLd />
      <Nav />
      <Hero />
      <DashboardsContent embedded />
      <SaaSComparison />
      <ScanCTA />
      <Services />
      <ObjectionHandler />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
