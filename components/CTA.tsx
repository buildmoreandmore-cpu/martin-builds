"use client";

import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <section
      id="cta"
      style={{
        padding: "8rem 3rem",
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
          Your business needs AI that{" "}
          <span style={{ color: "#c8ff00", position: "relative", display: "inline-block" }}>
            works
            <span
              style={{
                position: "absolute",
                bottom: "5px",
                left: 0,
                right: 0,
                height: "4px",
                background: "#c8ff00",
                opacity: 0.4,
                borderRadius: "2px",
                display: "block",
              }}
            />
          </span>
          ,<br />
          not AI that <em>talks</em>.
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={{ ...sectionSub, margin: "1.5rem auto 0" }}>
          Book a free 30-minute discovery call. I&apos;ll tell you exactly what I&apos;d build, what it costs, and how fast we can ship it.
        </p>
      </ScrollReveal>

      <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        <a
          href="mailto:francis@martin.builds"
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
          Book a Discovery Call
        </a>
        <a
          href="#work"
          style={secondaryBtnStyle}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00";
            (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)";
            (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0";
          }}
        >
          See More Work
        </a>
      </div>
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
  maxWidth: "500px",
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
};

const secondaryBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#f5f5f0",
  padding: "1rem 2.5rem",
  borderRadius: "100px",
  fontWeight: 600,
  fontSize: "1rem",
  border: "1px solid rgba(245,245,240,0.2)",
  transition: "all 0.3s",
  display: "inline-block",
};
