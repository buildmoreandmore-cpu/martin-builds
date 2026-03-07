import type { Metadata } from "next";
import Nav from "@/components/Nav";
import WWMHero from "@/components/wwm/Hero";
import TheGap from "@/components/wwm/TheGap";
import ServiceTiers from "@/components/wwm/ServiceTiers";
import ProofWork from "@/components/wwm/ProofWork";
import Testimonials from "@/components/wwm/Testimonials";
import FAQ from "@/components/wwm/FAQ";
import FinalCTA from "@/components/wwm/FinalCTA";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";
import { FAQJsonLd, ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Work With Me — martin.builds",
  description:
    "One builder. Clear scope. Live in 2 weeks. AI-powered sites, platforms, and tools for Atlanta small businesses — from $5,000.",
  alternates: { canonical: "https://martin.builds/work-with-me" },
  openGraph: {
    title: "Work With Me — martin.builds",
    description:
      "One builder. Clear scope. Live in 2 weeks. AI-powered tools for small businesses — from $5,000.",
    url: "https://martin.builds/work-with-me",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work With Me — martin.builds",
    description: "One builder. Clear scope. Live in 2 weeks. From $5,000.",
    images: ["/og-image.png"],
  },
};

const wwmFaqs = [
  { question: "What does the process actually look like?", answer: "We start with a 30-minute discovery call — you tell me the problem, I tell you exactly what I'd build and what it costs. If we're a fit, I send a scope document, you approve, and I start building. You get daily progress updates and a live deployment within 2 weeks." },
  { question: "I'm not technical. Will I understand what you're building?", answer: "That's the whole point. I bridge the gap between what AI can do and what your business needs. No jargon, no black boxes. You'll see it come together in plain English with daily screen recordings." },
  { question: "What if I need changes after it's done?", answer: "Every project includes 2 rounds of revisions. After that, most clients move to a retainer so I can keep building and improving. But you're never locked in — if it's done, it's done." },
  { question: "Do you work with businesses outside of Atlanta?", answer: "Yes. Most of my clients are remote. I build, deploy, and hand off everything digitally. If you're local, we can meet in person — but it's not required." },
  { question: "What makes you different from an agency?", answer: "Agencies give you a team of 12, a 40-page proposal, and a 6-month timeline. I give you one builder, a clear scope, and a live product in 2 weeks. No layers. No overhead. Just the work." },
  { question: "Can you build mobile apps too?", answer: "Yes. I've shipped apps to both the App Store and Google Play. LockIn Focus Timer is one example. I build with React Native/Expo so you get both iOS and Android from a single codebase." },
];

export default function WorkWithMePage() {
  return (
    <>
      <FAQJsonLd faqs={wwmFaqs} />
      <ServiceJsonLd />
      <Nav />
      <WWMHero />
      <TheGap />
      <ServiceTiers />
      <ProofWork />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <NewsletterFooter />
      <Footer />
    </>
  );
}
