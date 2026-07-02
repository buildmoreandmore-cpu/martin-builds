import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/JsonLd";
import TeamPage from "@/components/team/TeamPage";

export const metadata: Metadata = {
  title: "Build Your Team — martin.builds",
  description:
    "A productized hiring system for legacy service businesses. We build the hiring machine — job pages, candidate ads, screening, scheduling, pipeline dashboard — and run it. Your people, your payroll, our system.",
  alternates: { canonical: "https://martinbuilds.ai/team" },
  openGraph: {
    title: "Build Your Team — martin.builds",
    description: "Your people. Your payroll. Our system. Fill three roles for less than an agency charges for one.",
    url: "https://martinbuilds.ai/team",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Team — martin.builds",
    description: "Your people. Your payroll. Our system.",
    images: ["/og-image.png"],
  },
};

const teamFaqs = [
  { question: "Are you a staffing agency?", answer: "No. We never employ your team and never mark up labor. You hire directly onto your own payroll, or contract directly with the people we introduce. We charge for the hiring machine and its operation — never a cut of anyone's salary." },
  { question: "How is this different from a recruiter?", answer: "A recruiter is episodic — you pay per placement and get nothing when they leave. We build a system: job pages, candidate ads, screening, scheduling, a pipeline dashboard. You keep it for every hire after the first." },
  { question: "How fast can we fill roles?", answer: "The install ships in about 14 days. Team Launch engagements run 60 days of intensive operation until the roster is filled. Ongoing Hiring Engine retainers run continuously." },
  { question: "What if we only need one specialist hire?", answer: "That's a Sourced Introduction — $1,500–2,500 per role, no system build required. We source, vet, and introduce 2–3 candidates with written briefs." },
];

export default function BuildYourTeamPage() {
  return (
    <>
      <FAQJsonLd faqs={teamFaqs} />
      <Nav />
      <TeamPage />
      <Footer />
    </>
  );
}
