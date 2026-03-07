"use client";

import ScrollReveal from "../ScrollReveal";

export default function AboutCTA() {
  return (
    <section style={{ padding: "8rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70vw", height: "70vw", background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />

      <ScrollReveal>
        <p style={tag}>Let&apos;s Build</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px", margin: "0 auto" }}>
          Ready to see what AI can do for your business?
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={{ fontSize: "1.15rem", fontWeight: 300, color: "#888", maxWidth: "480px", margin: "1.5rem auto 0", lineHeight: 1.7 }}>
          Whether you need a Power Hour, a full build, or just want to talk — I&apos;m here.
        </p>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "3rem", flexWrap: "wrap" }}>
          <a
            href="/work-with-me"
            style={{ display: "inline-block", background: "#c8ff00", color: "#0a0a0a", padding: "1rem 2.5rem", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", transition: "all 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Book a Discovery Call
          </a>
          <a
            href="/power-hour"
            style={{ display: "inline-block", background: "transparent", color: "#f5f5f0", padding: "1rem 2.5rem", borderRadius: "100px", fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(245,245,240,0.2)", transition: "all 0.3s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"; }}
          >
            AI Power Hour — $500
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
