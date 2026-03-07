import ScrollReveal from "../ScrollReveal";

const stats = [
  { num: "10+", label: "AI products shipped" },
  { num: "14 days", label: "average build time" },
  { num: "6+", label: "industries served" },
  { num: "2026", label: "building every day" },
];

export default function Stats() {
  return (
    <section style={{ background: "#1a1a1a", borderTop: "1px solid rgba(245,245,240,0.06)", borderBottom: "1px solid rgba(245,245,240,0.06)" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "4rem 3rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
        }}
        className="stats-grid"
      >
        {stats.map((s) => (
          <ScrollReveal key={s.label}>
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#c8ff00",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#888", letterSpacing: "0.5px" }}>{s.label}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
