"use client";

import ScrollReveal from "./ScrollReveal";

const results = [
  {
    metric: "3 days → 10 min",
    label: "proposal turnaround",
    quote: "Francis didn't just build us a website — he built us a system.",
    name: "Ruthie Norton",
    role: "2KB Energy Engineering",
  },
  {
    metric: "12-day build",
    label: "revenue in 2 weeks",
    quote: "He understands the business side and the tech side — that's rare.",
    name: "Camisha Alford",
    role: "Kingly Consulting",
  },
  {
    metric: "2 weeks, 0 revisions",
    label: "orders day one",
    quote: "Fast, clear communication, and the final product was exactly what we needed.",
    name: "Birdhouse Coffee Room",
    role: "Atlanta, GA",
  },
];

export default function Proof() {
  return (
    <section
      style={{
        padding: "clamp(5rem,8vw,7rem) clamp(1.25rem,5vw,3rem)",
        background: "#1a1a1a",
        borderTop: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <ScrollReveal>
        <p style={tagStyle}>Results</p>
      </ScrollReveal>

      <div
        className="proof-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          maxWidth: "1000px",
          margin: "2rem auto 0",
        }}
      >
        {results.map((r) => (
          <ScrollReveal key={r.name}>
            <div
              style={{
                background: "#0a0a0a",
                border: "1px solid rgba(245,245,240,0.06)",
                borderRadius: "16px",
                padding: "2rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Metric */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#c8ff00",
                    lineHeight: 1.2,
                  }}
                >
                  {r.metric}
                </div>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.8rem",
                    color: "#888",
                    marginTop: "0.25rem",
                  }}
                >
                  {r.label}
                </div>
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "rgba(245,245,240,0.7)",
                  lineHeight: 1.7,
                  flex: 1,
                  margin: 0,
                }}
              >
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#f5f5f0" }}>{r.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#888" }}>{r.role}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .proof-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}

const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1rem",
  textAlign: "center",
};
