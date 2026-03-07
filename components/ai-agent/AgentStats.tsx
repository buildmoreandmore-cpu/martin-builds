import ScrollReveal from "../ScrollReveal";

const stats = [
  { num: "24/7", label: "Always online" },
  { num: "48hr", label: "Setup time" },
  { num: "100+", label: "Languages supported" },
  { num: "$0", label: "Setup fee" },
];

export default function AgentStats() {
  return (
    <div style={{ borderTop: "1px solid rgba(245,245,240,0.06)", borderBottom: "1px solid rgba(245,245,240,0.06)", padding: "4rem 3rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }} className="agent-stats-grid">
        {stats.map((s) => (
          <ScrollReveal key={s.label}>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700, color: "#c8ff00", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.4rem" }}>{s.label}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <style>{`@media (max-width: 600px) { .agent-stats-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </div>
  );
}
