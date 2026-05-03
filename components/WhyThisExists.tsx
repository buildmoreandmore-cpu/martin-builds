"use client";

import ScrollReveal from "./ScrollReveal";

export default function WhyThisExists() {
  return (
    <section
      style={{
        padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tagStyle}>The Reason</p>
          <h2 style={titleStyle}>
            Why this <span style={{ color: "#c8ff00" }}>exists.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p style={bodyStyle}>
            Most agencies treat custom software like a six-month construction project &mdash; discovery phases, account managers, change orders, retainers. By the time it ships, the problem has changed.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p style={bodyStyle}>
            <strong style={{ color: "#f5f5f0" }}>martin.builds</strong> is one operator who scopes, designs, builds, and deploys &mdash; typically in 14 days. Fixed price before we start. You own the code on day one.
          </p>
        </ScrollReveal>

        {/* Stat callout */}
        <ScrollReveal>
          <div
            style={{
              marginTop: "2.5rem",
              padding: "clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 3vw, 2.25rem)",
              background: "linear-gradient(135deg, rgba(200,255,0,0.08), rgba(200,255,0,0.02))",
              border: "1px solid rgba(200,255,0,0.25)",
              borderLeft: "3px solid #c8ff00",
              borderRadius: 12,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1.25rem",
            }}
          >
            <div style={{ flex: "1 1 280px", minWidth: 0 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 800, color: "#c8ff00", lineHeight: 1.1, letterSpacing: "-1px" }}>
                $30K&ndash;$50K
              </div>
              <p style={{ fontSize: "0.9rem", color: "#888", margin: "6px 0 0 0", lineHeight: 1.5 }}>
                Typical agency quote for a custom platform.
              </p>
            </div>
            <div style={{ flex: "1 1 280px", minWidth: 0, paddingLeft: "clamp(0px, 2vw, 16px)", borderLeft: "1px solid rgba(245,245,240,0.08)" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 800, color: "#f5f5f0", lineHeight: 1.1, letterSpacing: "-1px" }}>
                from $5,000
              </div>
              <p style={{ fontSize: "0.9rem", color: "#888", margin: "6px 0 0 0", lineHeight: 1.5 }}>
                martin.builds builds start here.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  marginBottom: "2rem",
};

const bodyStyle: React.CSSProperties = {
  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
  color: "#ccc",
  lineHeight: 1.8,
  marginBottom: "1.25rem",
};
