"use client";

import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    label: "ESPC",
    sublabel: "Platform",
    bg: "linear-gradient(135deg, #0d2a1a 0%, #0a1a10 100%)",
    accent: "#00e87a",
    title: "ESPC Management Platform",
    desc: "End-to-end energy savings performance contract platform with client dashboards, proposal generation, and compliance tracking.",
    tags: ["AI Platform", "Energy", "SaaS"],
  },
  {
    label: "Sketch",
    sublabel: "Haus",
    bg: "linear-gradient(135deg, #1a0d2a 0%, #110a1a 100%)",
    accent: "#b066ff",
    title: "SketchHaus AI Studio",
    desc: "AI-powered design configurator that lets clients visualize and iterate on creative concepts in real time.",
    tags: ["AI Design", "Web App", "Creative"],
  },
  {
    label: "Site",
    sublabel: "Scout",
    bg: "linear-gradient(135deg, #0d1a2a 0%, #0a1020 100%)",
    accent: "#00aaff",
    title: "SiteScout Lead Engine",
    desc: "Automated lead prospecting tool that identifies businesses needing web design and scores them for outreach.",
    tags: ["Lead Gen", "Automation", "AI"],
  },
  {
    label: "Lock",
    sublabel: "In",
    bg: "linear-gradient(135deg, #2a1a00 0%, #1a1000 100%)",
    accent: "#ff9500",
    title: "LockIn Focus Timer",
    desc: "Productivity app shipped to both App Store and Google Play. Built, designed, and deployed end-to-end.",
    tags: ["Mobile App", "iOS", "Android"],
  },
];

export default function Work() {
  return (
    <section id="work" style={{ padding: "clamp(3rem,8vw,6rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <ScrollReveal>
        <p style={sectionTag}>Selected Work</p>
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
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "1.5rem",
          marginTop: "4rem",
        }}
      >
        {projects.map((p) => (
          <ScrollReveal key={p.title}>
            <WorkCard {...p} />
          </ScrollReveal>
        ))}

      </div>
    </section>
  );
}

function WorkCard({
  label,
  sublabel,
  bg,
  accent,
  title,
  desc,
  tags,
}: {
  label: string;
  sublabel: string;
  bg: string;
  accent: string;
  title: string;
  desc: string;
  tags: string[];
}) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid rgba(245,245,240,0.06)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.4s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}33`;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          height: "200px",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Noise texture */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        {/* Radial glow */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${accent}22 0%, transparent 70%)` }} />
        {/* Big type */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "3.5rem", lineHeight: 0.9, letterSpacing: "-3px", color: accent, opacity: 0.9 }}>
            {label}
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "3.5rem", lineHeight: 0.9, letterSpacing: "-3px", color: "rgba(245,245,240,0.15)" }}>
            {sublabel}
          </div>
        </div>
        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, #1a1a1a, transparent)" }} />
      </div>
      <div style={{ padding: "1.5rem 2rem" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.4rem" }}>{title}</h3>
        <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.5 }}>{desc}</p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                color: "#c8ff00",
                background: "rgba(200,255,0,0.08)",
                padding: "0.3rem 0.7rem",
                borderRadius: "100px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
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
