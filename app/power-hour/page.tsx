import type { Metadata } from "next";
import Nav from "@/components/Nav";
import BookingCard from "@/components/power-hour/BookingCard";
import WhatToExpect from "@/components/power-hour/WhatToExpect";
import WhoItsFor from "@/components/power-hour/WhoItsFor";
import PowerHourFAQ from "@/components/power-hour/PowerHourFAQ";
import PowerHourBottomCTA from "@/components/power-hour/BottomCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Power Hour — martin.builds",
  description: "60 minutes. Your business. Your AI game plan. $500. Book a 1-on-1 session with Francis and leave with a clear action plan.",
};

export default function PowerHourPage() {
  return (
    <>
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
