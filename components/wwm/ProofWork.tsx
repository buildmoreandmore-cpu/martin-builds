"use client";

import ScrollReveal from "../ScrollReveal";

const projects = [
  {
    label: "ESPC",
    sublabel: "Platform",
    bg: "linear-gradient(135deg, #0d2a1a 0%, #0a1a10 100%)",
    accent: "#00e87a",
    title: "ESPC Management Platform",
    desc: "End-to-end energy savings contract platform with client dashboards, proposal generation, and compliance tracking.",
    tags: ["AI Platform", "Energy", "SaaS"],
    client: "2KB Energy Engineering",
  },
  {
    label: "Sketch",
    sublabel: "Haus",
    bg: "linear-gradient(135deg, #1a0d2a 0%, #110a1a 100%)",
    accent: "#b066ff",
    title: "SketchHaus AI Studio",
    desc: "AI-powered design configurator for real-time creative concept visualization.",
    tags: ["AI Design", "Web App", "Creative"],
    client: null,
  },
  {
    label: "Lock",
    sublabel: "In",
    bg: "linear-gradient(135deg, #2a1a00 0%, #1a1000 100%)",
    accent: "#ff9500",
    title: "LockIn Focus Timer",
    desc: "Productivity app shipped to iOS App Store and Google Play. Full design and development.",
    tags: ["Mobile App", "iOS", "Android"],
    client: null,
  },
  {
    label: "Site",
    sublabel: "Scout",
    bg: "linear-gradient(135deg, #0d1a2a 0%, #0a1020 100%)",
    accent: "#00aaff",
    title: "SiteScout Lead Engine",
    desc: "Automated lead prospecting tool that identifies and scores businesses for outreach.",
    tags: ["Lead Gen", "Automation", "AI"],
    client: null,
  },
];

export default function ProofWork() {
  return (
    <section style={{ padding: "6rem 3rem", background: "#111", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
      <ScrollReveal>
        <p style={sectionTag}>Proof</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          Real tools.
          <br />
          Real businesses. Shipped.
        </h2>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          marginTop: "4rem",
        }}
      >
        {projects.map((p) => (
          <ScrollReveal key={p.title}>
            <div
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(245,245,240,0.06)",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.4s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${p.accent}33`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ height: "180px", background: p.bg, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${p.accent}22 0%, transparent 70%)` }} />
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "3rem", lineHeight: 0.9, letterSpacing: "-3px", color: p.accent, opacity: 0.9 }}>{p.label}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "3rem", lineHeight: 0.9, letterSpacing: "-3px", color: "rgba(245,245,240,0.15)" }}>{p.sublabel}</div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50px", background: "linear-gradient(to top, #1a1a1a, transparent)" }} />
              </div>
              <div style={{ padding: "1.5rem 2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{p.title}</h3>
                {p.client && (
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#c8ff00", letterSpacing: "1px", marginBottom: "0.6rem", textTransform: "uppercase" }}>
                    {p.client}
                  </p>
                )}
                <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.5 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#c8ff00", background: "rgba(200,255,0,0.08)", padding: "0.3rem 0.65rem", borderRadius: "100px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

const sectionTag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const sectionTitle: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };
