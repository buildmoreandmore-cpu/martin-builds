"use client";

import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Francis didn't just build us a website — he built us a system. The AI tools he integrated have completely changed how we handle client intake and proposals.",
    initials: "RN",
    name: "Ruthie Norton",
    role: "2KB Energy Engineering — Energy Services",
  },
  {
    quote:
      "He understands the business side and the tech side — that's rare. He translated what I needed into something my team could actually use, in less time than I expected.",
    initials: "CA",
    name: "Camisha Alford",
    role: "Kingly Consulting — Business Consulting",
  },
  {
    quote:
      "Fast, clear communication, and the final product was exactly what we needed. No scope creep, no guessing. Francis ships.",
    initials: "BC",
    name: "Birdhouse Coffee Room",
    role: "Web Design Client — Atlanta, GA",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        background: "#1a1a1a",
        borderTop: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <ScrollReveal>
        <p style={sectionTag}>What Clients Say</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={{ ...sectionTitle, maxWidth: "800px" }}>
          They had the same question you do.
          <br />
          Here&apos;s what happened.
        </h2>
      </ScrollReveal>

      {/* Results at a glance */}
      <ScrollReveal>
        <div
          className="results-counter"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "4rem",
            marginTop: "3rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "10+", label: "products shipped" },
            { num: "14 days", label: "avg delivery" },
            { num: "$5K", label: "starting price" },
            { num: "0", label: "clients ghosted" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "2.2rem", fontWeight: 700, color: "#c8ff00" }}>{s.num}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "#888", marginTop: "0.3rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 600px) {
          .results-counter {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name}>
            <div
              style={{
                padding: "3rem 0",
                textAlign: "center",
                borderBottom: i < testimonials.length - 1 ? "1px solid rgba(245,245,240,0.04)" : "none",
              }}
            >
              {/* Large quote mark */}
              <span
                style={{
                  fontSize: "5rem",
                  color: "rgba(200,255,0,0.12)",
                  fontFamily: "Georgia, serif",
                  lineHeight: 0.5,
                  display: "block",
                  userSelect: "none",
                  marginBottom: "1rem",
                }}
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  color: "#f5f5f0",
                  lineHeight: 1.8,
                  maxWidth: "700px",
                  margin: "0 auto 1.5rem",
                }}
              >
                {t.quote}
              </p>

              {/* Accent divider */}
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  background: "#c8ff00",
                  opacity: 0.4,
                  margin: "0 auto 1.5rem",
                }}
              />

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(200,255,0,0.12)",
                    border: "2px solid rgba(200,255,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#c8ff00",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 600, fontSize: "1rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "#888" }}>{t.role}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <p style={{ textAlign: "center", marginTop: "3rem", fontSize: "1rem", color: "#888" }}>
          Want to be the next one?{" "}
          <a href="/discovery-call" style={{ color: "#c8ff00", fontWeight: 600, textDecoration: "none" }}>
            Book a discovery call
          </a>{" "}
          and let&apos;s build something.
        </p>
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
};
