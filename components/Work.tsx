"use client";

import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    label: "ESPC Platform",
    title: "ESPC Management Platform",
    desc: "End-to-end energy savings performance contract platform with client dashboards, proposal generation, and compliance tracking.",
    tags: ["AI Platform", "Energy", "SaaS"],
  },
  {
    label: "SketchHaus",
    title: "SketchHaus AI Studio",
    desc: "AI-powered design configurator that lets clients visualize and iterate on creative concepts in real time.",
    tags: ["AI Design", "Web App", "Creative"],
  },
  {
    label: "SiteScout",
    title: "SiteScout Lead Engine",
    desc: "Automated lead prospecting tool that identifies businesses needing web design and scores them for outreach.",
    tags: ["Lead Gen", "Automation", "AI"],
  },
  {
    label: "LockIn",
    title: "LockIn Focus Timer",
    desc: "Productivity app shipped to both App Store and Google Play. Built, designed, and deployed end-to-end.",
    tags: ["Mobile App", "iOS", "Android"],
  },
];

export default function Work() {
  return (
    <section id="work" style={{ padding: "6rem 3rem", background: "#0a0a0a" }}>
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
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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
  title,
  desc,
  tags,
}: {
  label: string;
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
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.2)";
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
          background: "#2a2a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Space Mono', monospace",
          fontSize: "2rem",
          color: "rgba(200,255,0,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {label}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(200,255,0,0.05) 0%, transparent 50%)",
          }}
        />
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
