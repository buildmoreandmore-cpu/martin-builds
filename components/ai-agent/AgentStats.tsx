"use client";

import ScrollReveal from "../ScrollReveal";

const stats = [
  { value: "24/7", label: "Always working" },
  { value: "5 min", label: "Average response time" },
  { value: "90%", label: "Tasks handled without you" },
  { value: "$0", label: "Setup fee" },
];

export default function AgentStats() {
  return (
    <section style={{ padding: "4rem 3rem", background: "rgba(200,255,0,0.02)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 900, color: "#c8ff00", lineHeight: 1, marginBottom: "0.5rem" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "1rem", color: "#888", fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}