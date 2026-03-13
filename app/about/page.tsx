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
  description:
    "Francis Martin. Self-taught AI builder shipping AI tools for small businesses from Atlanta, GA. 10+ products shipped.",
  alternates: { canonical: "https://martinbuilds.ai/about" },
  openGraph: {
    title: "About — martin.builds",
    description:
      "Francis Martin is an AI developer based in Atlanta, GA. I learned AI by shipping real products for real businesses.",
    url: "https://martinbuilds.ai/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — martin.builds",
    description: "Francis Martin is an AI developer based in Atlanta, GA.",
    images: ["/og-image.png"],
  },
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
