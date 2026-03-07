"use client";

import ScrollReveal from "../ScrollReveal";

const columns = [
  {
    label: "The Symptom",
    color: "#888",
    text: "You've seen what AI can do. You've sat through the demos. You've read the articles. You know your business needs this.",
  },
  {
    label: "The Reality",
    color: "#ff6b6b",
    text: "But agencies quote $50K+ and 6 months. Freelancers ghost after the first call. And your team doesn't have the bandwidth to figure it out themselves.",
  },
  {
    label: "The Fix",
    color: "#c8ff00",
    text: "You need one person who gets your business AND the tech — someone who shows up Monday and has it live by Friday. That's what I do.",
  },
];

export default function TheGap() {
  return (
    <section
      style={{
        padding: "6rem 3rem",
        background: "#111",
        borderTop: "1px solid rgba(245,245,240,0.06)",
        borderBottom: "1px solid rgba(245,245,240,0.06)",
      }}
    >
      <ScrollReveal>
        <p style={sectionTag}>The Gap</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          You don&apos;t have an AI problem.
          <br />
          You have a building problem.
        </h2>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
          marginTop: "4rem",
        }}
      >
        {columns.map((col) => (
          <ScrollReveal key={col.label}>
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(245,245,240,0.06)",
                borderRadius: "16px",
                padding: "2.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: col.color,
                  marginBottom: "1.25rem",
                }}
              >
                {col.label}
              </div>
              <p style={{ fontSize: "1rem", color: "rgba(245,245,240,0.75)", lineHeight: 1.75, fontWeight: 300 }}>
                {col.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
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
  maxWidth: "700px",
};
