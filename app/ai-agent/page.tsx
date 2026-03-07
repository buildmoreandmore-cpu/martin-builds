import type { Metadata } from "next";
import Nav from "@/components/Nav";
import AgentHero from "@/components/ai-agent/AgentHero";
import UseCases from "@/components/ai-agent/UseCases";
import AgentStats from "@/components/ai-agent/AgentStats";
import HowItWorks from "@/components/ai-agent/HowItWorks";
import AgentPricing from "@/components/ai-agent/AgentPricing";
import AgentFAQ from "@/components/ai-agent/AgentFAQ";
import AgentFinalCTA from "@/components/ai-agent/AgentFinalCTA";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Agent for Your Business — martin.builds",
  description: "A custom AI chat agent trained on your business — answers questions, captures leads, and books appointments 24/7. Live on your site in 48 hours. From $300/mo.",
};

export default function AIAgentPage() {
  return (
    <>
      <Nav />
      <AgentHero />
      <UseCases />
      <AgentStats />
      <HowItWorks />
      <AgentPricing />
      <AgentFAQ />
      <AgentFinalCTA />
      <NewsletterFooter />
      <Footer />
    </>
  );
}
