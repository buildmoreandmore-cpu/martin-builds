import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { FAQJsonLd, AIAgentServiceJsonLd } from "@/components/JsonLd";
import UtilityBilling from "@/components/ai-agent/UtilityBilling";
import AgentFAQ from "@/components/ai-agent/AgentFAQ";
import AgentFinalCTA from "@/components/ai-agent/AgentFinalCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Automate — martin.builds",
  description:
    "Add an AI-powered agent to your website or dashboard. Handles leads, support, and scheduling 24/7. Pay based on usage. Live in 48 hours.",
  alternates: { canonical: "https://martinbuilds.ai/automate" },
  openGraph: {
    title: "Automate — martin.builds",
    description: "AI automation for your website. 24/7 lead capture and support. Pay based on usage. Live in 48 hours.",
    url: "https://martinbuilds.ai/automate",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automate — martin.builds",
    description: "AI automation for your website. Pay based on usage. Live in 48 hours.",
    images: ["/og-image.png"],
  },
};

const agentFaqs = [
  { question: "Is this just a basic chatbot?", answer: "No. Basic chatbots follow scripts. Your AI agent is trained on your actual business data and can handle conversations it's never seen before. It understands context, follows up naturally, and gets smarter over time." },
  { question: "What if it says something wrong?", answer: "The agent is trained with guardrails — it only answers based on the information you provide. If it doesn't know something, it says so and offers to connect the customer with you directly. No hallucinations, no made-up answers." },
  { question: "Will it match my brand?", answer: "Completely. Your colors, your logo, your tone of voice. It looks and feels like part of your site, not a third-party widget. Your customers won't know it's AI — they'll just think your support is incredibly fast." },
  { question: "How do I get the leads it captures?", answer: "Starter plan sends you an email notification for every lead. Pro plan integrates directly with your CRM, Google Sheets, or whatever tool you use. You'll never miss a lead again." },
  { question: "Can I cancel anytime?", answer: "Yes. Month-to-month. No contracts, no cancellation fees. If the agent isn't delivering value, you can pause or cancel with one email. But nobody has yet." },
  { question: "Do I need a website from you to use this?", answer: "No. The agent works on any website — WordPress, Shopify, Squarespace, custom-built, anything. It's a single script tag that drops into your existing site." },
];

export default function AIAgentPage() {
  return (
    <>
      <FAQJsonLd faqs={agentFaqs} />
      <AIAgentServiceJsonLd />
      <Nav />
      <UtilityBilling />
      <AgentFAQ />
      <AgentFinalCTA />
      <Footer />
    </>
  );
}
