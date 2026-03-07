import type { Metadata } from "next";
import Nav from "@/components/Nav";
import AboutHero from "@/components/about/AboutHero";
import Journey from "@/components/about/Journey";
import Philosophy from "@/components/about/Philosophy";
import Stats from "@/components/about/Stats";
import AboutCTA from "@/components/about/AboutCTA";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — martin.builds",
  description: "Francis Martin — AI builder based in Atlanta, GA. I didn't learn AI in a classroom. I learned it by shipping.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <AboutHero />
      <Journey />
      <Philosophy />
      <Stats />
      <AboutCTA />
      <NewsletterFooter />
      <Footer />
    </>
  );
}
