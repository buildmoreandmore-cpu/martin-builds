import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { ProfessionalServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "martin.builds — AI Tools for Small Business",
  description:
    "I build AI-powered tools, websites, and products for small businesses. Custom builds shipped in 2 weeks. Based in Atlanta, GA.",
  openGraph: {
    title: "martin.builds — AI Tools for Small Business",
    description:
      "Custom AI tools, websites, and products shipped in 2 weeks. Built by Francis Martin in Atlanta.",
  },
};
import Hero from "@/components/Hero";
import ObjectionHandler from "@/components/ObjectionHandler";
import TwoPaths from "@/components/TwoPaths";
import BuiltWith from "@/components/BuiltWith";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
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
      <TwoPaths />
      <BuiltWith />
      <Services />
      <Process />
      <Industries />
      <Testimonials />
      <CTA />
      <NewsletterFooter />
      <Footer />
    </>
  );
}
