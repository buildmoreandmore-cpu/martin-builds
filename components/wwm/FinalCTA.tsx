"use client";

import ScrollReveal from "../ScrollReveal";

export default function FinalCTA() {
  return (
    <section
      id="book-call"
      style={{
        padding: "clamp(5rem,10vw,8rem) clamp(1.25rem,5vw,3rem)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(245,245,240,0.06)",
      }}
    >
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vw", height: "80vw", background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />

      <ScrollReveal>
        <p style={sectionTag}>Let&apos;s Build</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "800px", margin: "0 auto" }}>
          Whether you&apos;re doing $500K or $50M —
          <br />
          if AI can help, <span style={{ color: "#c8ff00" }}>I&apos;ll show you how.</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", fontWeight: 300, color: "#888", maxWidth: "500px", margin: "1.5rem auto 0", lineHeight: 1.7 }}>
          Book a free 30-minute discovery call. I&apos;ll tell you exactly what I&apos;d build, what it costs, and how fast you&apos;d have it. No pitch deck. No follow-up spam.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ marginTop: "2.5rem" }}>
          <a href="/discovery-call" style={primaryBtnStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >Book a Free Discovery Call</a>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#888" }}>
            Or{" "}
            <a href="/contact" style={{ color: "#c8ff00", textDecoration: "none", fontWeight: 600 }}>send me a message</a>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

const sectionTag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };

const primaryBtnStyle: React.CSSProperties = {
  background: "#c8ff00", color: "#0a0a0a", padding: "1rem 2.5rem", borderRadius: "100px",
  fontWeight: 700, fontSize: "1rem", letterSpacing: "0.5px", transition: "all 0.3s",
  display: "inline-block", textDecoration: "none",
};
