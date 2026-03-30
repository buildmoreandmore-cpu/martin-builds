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
        <h2 style={titleStyle}>
          Ready to build?
        </h2>
      </ScrollReveal>

      <ScrollReveal>
        <p style={subStyle}>
          30-minute call. No pitch deck. No follow-up spam. Just a real conversation about what you need.
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
            Or{" "}
            <a href="/contact" style={{ color: "#c8ff00", textDecoration: "none", fontWeight: 600 }}>
              send me a message
            </a>
          </p>

          {/* Availability signal */}
          <div
            style={{
              marginTop: "2rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "rgba(200,255,0,0.06)",
              border: "1px solid rgba(200,255,0,0.12)",
              borderRadius: "100px",
              padding: "0.5rem 1.2rem",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#c8ff00", display: "inline-block", animation: "pulse-dot 2s infinite" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#888", letterSpacing: "0.5px" }}>
              2 spots per month — <span style={{ color: "#c8ff00", fontWeight: 600 }}>1 open for April</span>
            </span>
          </div>
        </div>
      </ScrollReveal>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "600px",
  margin: "0 auto",
};

const subStyle: React.CSSProperties = {
  fontSize: "1.15rem",
  fontWeight: 300,
  color: "#888",
  maxWidth: "450px",
  lineHeight: 1.7,
  margin: "1.5rem auto 0",
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
