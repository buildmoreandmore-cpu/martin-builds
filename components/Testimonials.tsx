"use client";

import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Francis didn't just build us a website — he built us a system. The AI tools he integrated have completely changed how we handle client intake and proposals.",
    initials: "RN",
    name: "Ruthie Norton",
    role: "2KB Energy Engineering",
  },
  {
    quote:
      "He understands the business side and the tech side — that's rare. He translated what I needed into something my team could actually use, in less time than I expected.",
    initials: "CA",
    name: "Camisha Alford",
    role: "Kingly Consulting",
  },
  {
    quote:
      "Fast, clear communication, and the final product was exactly what we needed. No scope creep, no guessing. Francis ships.",
    initials: "BC",
    name: "Birdhouse Coffee",
    role: "Web Design Client",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        padding: "clamp(3rem,8vw,6rem) clamp(1.25rem,5vw,3rem)",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(245,245,240,0.06)",
      }}
    >
      <ScrollReveal>
        <p style={sectionTag}>Results</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>Don&apos;t take my word for it.</h2>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
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
                  color: "rgba(200,255,0,0.1)",
                  fontFamily: "Georgia, serif",
                  position: "absolute",
                  top: "10px",
                  left: "20px",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                &ldquo;
              </span>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "rgba(245,245,240,0.85)",
                  marginBottom: "1.5rem",
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
                    background: "rgba(200,255,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "#c8ff00",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#888" }}>{t.role}</div>
                </div>
              </div>
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
