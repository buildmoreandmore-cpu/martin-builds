import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { FAQJsonLd } from "@/components/JsonLd";
import BookingCard from "@/components/power-hour/BookingCard";
import WhatToExpect from "@/components/power-hour/WhatToExpect";
import WhoItsFor from "@/components/power-hour/WhoItsFor";
import PowerHourFAQ from "@/components/power-hour/PowerHourFAQ";
import PowerHourBottomCTA from "@/components/power-hour/BottomCTA";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Power Hour — 1-on-1 AI Strategy Session | $500",
  description:
    "60 minutes. Your business. Your AI game plan. $500. Book a 1-on-1 AI strategy session with Francis Martin, Atlanta AI developer, and leave with a clear action plan.",
  alternates: { canonical: "https://martin.builds/power-hour" },
  openGraph: {
    title: "AI Power Hour — 1-on-1 AI Strategy Session | $500",
    description: "60-minute 1-on-1 AI strategy session with Francis Martin. $500. Leave with a clear action plan.",
    url: "https://martin.builds/power-hour",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Power Hour — 1-on-1 AI Strategy Session | $500",
    description: "60-minute 1-on-1 AI strategy session with Francis Martin. $500.",
    images: ["/og-image.png"],
  },
};

const powerHourFaqs = [
  { question: "What happens after I book?", answer: "You'll get a confirmation email with a calendar invite and Zoom link. I'll review the question you submitted so we can skip the small talk and dive straight into your business." },
  { question: "Can I get a refund if it's not helpful?", answer: "If you leave the session feeling like you didn't get value, I'll refund you in full. No forms, no questions. I've never had to do this, but the offer stands." },
  { question: "Do I need to prepare anything?", answer: "Just fill in the 'biggest AI question' when you book. That's all I need. If you want to go deeper, have your current workflow or tools list handy — but it's not required." },
  { question: "What if I want you to build something after?", answer: "Many Power Hour clients end up hiring me for a full build. If that happens, I'll credit your $500 session fee toward any project. The consultation is never wasted money." },
  { question: "Is this virtual or in-person?", answer: "Virtual via Zoom. The session is recorded and sent to you after so you can reference it anytime. If you're in the Atlanta area and prefer in-person, we can arrange that too." },
];

export default function PowerHourPage() {
  return (
    <>
      <FAQJsonLd faqs={powerHourFaqs} />
      <Nav />

      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "8rem 3rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "4rem",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
          className="power-hero-grid"
        >
          {/* LEFT */}
          <div>
            <div className="animate-fade-up-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              AI Power Hour
            </div>
            <h1
              className="animate-fade-up-2"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-2px" }}
            >
              60 minutes.
              <br />
              Your business.
              <br />
              Your AI game plan.{" "}
              <span style={{ color: "#c8ff00" }}>$500.</span>
            </h1>
            <p
              className="animate-fade-up-3"
              style={{ fontSize: "1.15rem", fontWeight: 300, color: "#888", marginTop: "1.5rem", lineHeight: 1.7, maxWidth: "520px" }}
            >
              Stop googling &ldquo;best AI tools for my business.&rdquo; Book a 1-on-1 session and I&apos;ll show you exactly what to use, how to use it, and what to build — for your specific situation.
            </p>

            {/* Proof stats */}
            <div className="animate-fade-up-4" style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {[
                { num: "10+", label: "AI products shipped" },
                { num: "50+", label: "businesses advised" },
                { num: "14 day", label: "avg. build time" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.8rem", fontWeight: 700, color: "#c8ff00", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.3rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: BOOKING CARD */}
          <div className="animate-fade-up-3">
            <BookingCard />
          </div>
        </div>
      </section>

      <div style={{ borderTop: "1px solid rgba(245,245,240,0.06)" }} />
      <WhatToExpect />
      <WhoItsFor />
      <PowerHourFAQ />
      <PowerHourBottomCTA />
      <NewsletterFooter />
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .power-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </>
  );
}
