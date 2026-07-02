import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/JsonLd";
import AdsEnginePage from "@/components/ads-engine/AdsEnginePage";

export const metadata: Metadata = {
  title: "Ads Engine — martin.builds",
  description:
    "Managed Meta + Google ads with an owner-facing command center. You own the ad account, see every dollar and every lead, and control real guardrails. Agencies hide your ad account — we hand you the keys.",
  alternates: { canonical: "https://martinbuilds.ai/ads-engine" },
  openGraph: {
    title: "Ads Engine — martin.builds",
    description: "Agencies hide your ad account. We hand you the keys. Managed paid ads with a real owner dashboard.",
    url: "https://martinbuilds.ai/ads-engine",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ads Engine — martin.builds",
    description: "Agencies hide your ad account. We hand you the keys.",
    images: ["/og-image.png"],
  },
};

const adsFaqs = [
  { question: "Do you have access to spend our money without approval?", answer: "No. Every campaign has a budget guardrail you can see. You can move spend within the agreed range, or pause anytime — no approval needed from us." },
  { question: "What happens to my ad account if we stop working together?", answer: "It's yours. It was always in your name. You keep the account, the pixel data, the campaign history, and the creative library." },
  { question: "Do you take a percentage of ad spend?", answer: "No. Flat install, flat monthly operation fee. Ad spend goes directly from your card to Meta/Google — we never touch it." },
];

export default function AdsEngineRoute() {
  return (
    <>
      <FAQJsonLd faqs={adsFaqs} />
      <Nav />
      <AdsEnginePage />
      <Footer />
    </>
  );
}
