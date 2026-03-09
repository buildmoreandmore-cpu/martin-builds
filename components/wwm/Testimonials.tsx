"use client";

import ScrollReveal from "../ScrollReveal";

const testimonials = [
  {
    quote: "Francis didn't just build us a website — he built us a system. The AI tools he integrated have completely changed how we handle client intake and proposals.",
    name: "Ruthie Norton",
    role: "2KB Energy Engineering",
    initials: "RN",
  },
  {
    quote: "He understands the business side and the tech side — that's rare. He translated what I needed into something my team could actually use, in less time than I expected.",
    name: "Camisha Alford",
    role: "Kingly Consulting",
    initials: "CA",
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: "6rem 3rem", background: "#0a0a0a", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
      <ScrollReveal>
        <p style={sectionTag}>Results</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>Don&apos;t take my word for it.</h2>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.5rem",
          marginTop: "4rem",
        }}
      >
        {testimonials.map((t) => (
          <ScrollReveal key={t.name}>
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(245,245,240,0.06)",
                borderRadius: "16px",
                padding: "2.5rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontSize: "5rem",
                  color: "rgba(200,255,0,0.08)",
                  fontFamily: "Georgia, serif",
                  position: "absolute",
                  top: "10px",
                  left: "20px",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                &ldquo;
              </span>
              <p
                style={{
                  fontSize: "1rem",
                  fontStyle: "italic",
                  lineHeight: 1.75,
                  color: "rgba(245,245,240,0.8)",
                  marginBottom: "2rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {t.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(200,255,0,0.1)",
                    border: "1px solid rgba(200,255,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "#c8ff00",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "2px" }}>{t.role}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="/discovery-call" style={{ background: "#c8ff00", color: "#0a0a0a", padding: "1rem 2.5rem", borderRadius: "100px", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.5px", transition: "all 0.3s", display: "inline-block", textDecoration: "none" }}>
            Book a Free Discovery Call
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

const sectionTag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const sectionTitle: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };
