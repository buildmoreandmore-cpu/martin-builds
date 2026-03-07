"use client";

import ScrollReveal from "../ScrollReveal";

export default function AgentFinalCTA() {
  return (
    <section style={{ padding: "8rem 3rem", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />

      <ScrollReveal><p style={tag}>Your Customers Are Visiting Right Now</p></ScrollReveal>
      <ScrollReveal>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "800px", margin: "0 auto" }}>
          Every hour your site doesn&apos;t have an AI agent, you&apos;re losing leads to silence.
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "#888", maxWidth: "500px", margin: "1rem auto 2.5rem", lineHeight: 1.7 }}>
          Get a custom AI agent trained on your business, live on your site in 48 hours, for less than you spend on coffee this month.
        </p>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#pricing"
            style={{ display: "inline-block", padding: "1rem 2.5rem", background: "#c8ff00", color: "#0a0a0a", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", transition: "all 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Get Your Agent — From $300/mo
          </a>
          <a
            href="mailto:francis@martin.builds"
            style={{ display: "inline-block", padding: "1rem 2.5rem", background: "transparent", color: "#f5f5f0", borderRadius: "100px", fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(245,245,240,0.2)", transition: "all 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"; }}
          >
            Questions? Email Me
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
