"use client";

import ScrollReveal from "../ScrollReveal";

export default function PowerHourBottomCTA() {
  return (
    <section style={{ padding: "6rem 3rem", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />

      <ScrollReveal>
        <p style={tag}>One Hour. Total Clarity.</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px", margin: "0 auto" }}>
          Stop wondering what AI can do for your business. Find out.
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={{ fontSize: "1.1rem", color: "#888", maxWidth: "500px", margin: "1rem auto 2rem", lineHeight: 1.7, fontWeight: 300 }}>
          Book your AI Power Hour and leave with a plan you can execute on immediately.
        </p>
      </ScrollReveal>
      <ScrollReveal>
        <a
          href="#book"
          style={{
            display: "inline-block",
            padding: "1.1rem 3rem",
            background: "#c8ff00",
            color: "#0a0a0a",
            borderRadius: "100px",
            fontWeight: 700,
            fontSize: "1.05rem",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          Book Your Power Hour — $500
        </a>
      </ScrollReveal>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
