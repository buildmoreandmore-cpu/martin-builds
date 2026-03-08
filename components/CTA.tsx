"use client";

import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <section
      id="cta"
      style={{
        padding: "clamp(5rem,10vw,8rem) clamp(1.25rem,5vw,3rem)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "80vw",
          background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <ScrollReveal>
        <p style={sectionTag}>Let&apos;s Build</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={{ ...sectionTitle, margin: "0 auto" }}>
          You&apos;ve scrolled this far.
          <br />
          That means something.{" "}
          <span style={{ color: "#c8ff00" }}>Let&apos;s talk.</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={{ ...sectionSub, margin: "1.5rem auto 0" }}>
          30 minutes. Free. You tell me the problem, I tell you exactly what I&apos;d build, what it costs, and when you&apos;d have it. No pitch deck. No follow-up spam. Just a real conversation.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ marginTop: "2.5rem" }}>
          <a
            href="/discovery-call"
            style={primaryBtnStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Book a Free Discovery Call
          </a>
          <p style={{ marginTop: "1.2rem", fontSize: "0.9rem", color: "#888" }}>
            Or email me directly →{" "}
            <a href="mailto:francis@martin.builds" style={{ color: "#c8ff00", textDecoration: "none" }}>
              francis@martin.builds
            </a>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

const sectionTag: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "800px",
};

const sectionSub: React.CSSProperties = {
  fontSize: "1.15rem",
  fontWeight: 300,
  color: "#888",
  maxWidth: "550px",
  lineHeight: 1.7,
};

const primaryBtnStyle: React.CSSProperties = {
  background: "#c8ff00",
  color: "#0a0a0a",
  padding: "1rem 2.5rem",
  borderRadius: "100px",
  fontWeight: 700,
  fontSize: "1rem",
  letterSpacing: "0.5px",
  transition: "all 0.3s",
  display: "inline-block",
  textDecoration: "none",
};
