"use client";

import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    before: "We were replacing a fragmented process involving multiple systems, manual steps, and legacy limitations. This wasn't 'just a website,' it was workflow strategy + product build + business infrastructure.",
    after: "Faster client and candidate intake. Cleaner screening submission workflow. Stronger client experience and trust. A new platform ready for client rollout — and the foundation for automation and scale we didn't have before.",
    metric: "From 'I have an idea' to 'I have a platform.'",
    quote:
      "Martin helped me architect and launch a new client-facing screening platform — modern employer dashboard, candidate intake workflow, package selection logic, admin-side operational tools, and the foundation for a scalable screening portal. He helped me move from 'I have an idea' to 'I have a platform.'",
    initials: "GB",
    name: "Gwendolyn Brandon",
    role: "PCG Screening Services — Background Screening, Cumming GA",
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
          Here&apos;s what their business looked like before.
          <br />
          <span style={{ color: "#c8ff00" }}>Here&apos;s after.</span>
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
            { num: "14 days", label: "avg delivery" },
            { num: "$5K", label: "starting price" },
            { num: "$0", label: "monthly fees (you own it)" },
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
          .before-after-grid {
            grid-template-columns: 1fr !important;
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
              {/* Key metric */}
              {t.metric && (
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#c8ff00", background: "rgba(200,255,0,0.08)", padding: "0.35rem 1rem", borderRadius: "100px", letterSpacing: "0.5px" }}>
                    {t.metric}
                  </span>
                </div>
              )}

              {/* Before / After context */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  textAlign: "left",
                }}
                className="before-after-grid"
              >
                <div style={{ background: "rgba(255,68,68,0.04)", border: "1px solid rgba(255,68,68,0.1)", borderRadius: "10px", padding: "1rem 1.2rem" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#ff4444", letterSpacing: "2px", textTransform: "uppercase" }}>Before</span>
                  <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.6, marginTop: "0.4rem", marginBottom: 0 }}>{t.before}</p>
                </div>
                <div style={{ background: "rgba(200,255,0,0.04)", border: "1px solid rgba(200,255,0,0.1)", borderRadius: "10px", padding: "1rem 1.2rem" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#c8ff00", letterSpacing: "2px", textTransform: "uppercase" }}>After</span>
                  <p style={{ fontSize: "0.85rem", color: "#ccc", lineHeight: 1.6, marginTop: "0.4rem", marginBottom: 0 }}>{t.after}</p>
                </div>
              </div>

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
