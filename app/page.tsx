import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { ProfessionalServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "martin.builds — AI-Powered Customer Acquisition for Small Business",
  description:
    "I build the conversion infrastructure between the lead arriving and the deal closing. Custom AI tools, websites, and platforms shipped in 2 weeks. Based in Atlanta, GA.",
  openGraph: {
    title: "martin.builds — AI-Powered Customer Acquisition for Small Business",
    description:
      "Custom AI-powered conversion systems — intake automation, smart scheduling, proposal workflows — shipped in 2 weeks. Built by Francis Martin in Atlanta.",
  },
};
import Hero from "@/components/Hero";
import ObjectionHandler from "@/components/ObjectionHandler";
import ScanCTA from "@/components/ScanCTA";
import Services from "@/components/Services";
import ConversionFlow from "@/components/ConversionFlow";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import ClientFit from "@/components/ClientFit";
import CTA from "@/components/CTA";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ProfessionalServiceJsonLd />
      <Nav />
      <Hero />
      <ObjectionHandler />
      <ScanCTA />
      <Services />
      <ConversionFlow />
      <Process />
      <Industries />
      <Testimonials />
      <ClientFit />
      <CTA />
      <NewsletterFooter />
      <Footer />
    </>
  );
}
