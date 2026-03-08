"use client";

import ScrollReveal from "./ScrollReveal";

const PlatformIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const SprintIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const RetainerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const services = [
  {
    icon: <PlatformIcon />,
    title: "AI Platform Build",
    price: "From $8,000",
    description: "Full-stack AI platforms — client portals, admin dashboards, automated workflows, and integrations. Scoped, built, and live in 2-3 weeks.",
    tags: "Platforms · Dashboards · Portals",
  },
  {
    icon: <SprintIcon />,
    title: "AI Build Sprint",
    price: "From $5,000",
    description: "A defined AI-powered tool or website — designed, built, and deployed fast. Perfect for your first AI integration or a system your team needs yesterday.",
    tags: "Websites · Tools · Integrations",
  },
  {
    icon: <RetainerIcon />,
    title: "AI Retainer",
    price: "$2,500 – $5,000/mo",
    description: "Your AI builder on call. New features, iterations, and system upgrades every month. Your operations evolve — your tools should too.",
    tags: "Ongoing · Growth · Priority",
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <ScrollReveal>
        <p style={sectionTag}>What I Build</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          AI systems for businesses
          <br />
          that are ready to scale.
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={sectionSub}>
          I don&apos;t build templates. I build custom tools that plug into your operations and start working on day one.
        </p>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "2rem",
          marginTop: "4rem",
        }}
      >
        {services.map((s) => (
          <ScrollReveal key={s.title}>
            <ServiceCard {...s} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <a
            href="/discovery-call"
            style={{
              background: "#c8ff00",
              color: "#0a0a0a",
              padding: "1rem 2.5rem",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.5px",
              transition: "all 0.3s",
              display: "inline-block",
              textDecoration: "none",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Book a Free Discovery Call
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ maxWidth: "600px", margin: "3rem auto 0", textAlign: "center" }}>
          <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.7 }}>
            Running a small business and just getting started with AI? Check out the{" "}
            <a href="/power-hour" style={{ color: "#c8ff00", textDecoration: "none" }}>AI Power Hour ($500)</a>
            {" "}or{" "}
            <a href="/ai-agent" style={{ color: "#c8ff00", textDecoration: "none" }}>AI Agent ($300/mo)</a>
            {" "}— built for businesses that want results without a big upfront investment.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  price,
  tags,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  tags: string;
}) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid rgba(245,245,240,0.06)",
        borderRadius: "16px",
        padding: "2.5rem",
        transition: "all 0.4s",
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(200,255,0,0.15)";
        el.style.transform = "translateY(-4px)";
        const bar = el.querySelector(".top-bar") as HTMLDivElement;
        if (bar) bar.style.transform = "scaleX(1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(245,245,240,0.06)";
        el.style.transform = "translateY(0)";
        const bar = el.querySelector(".top-bar") as HTMLDivElement;
        if (bar) bar.style.transform = "scaleX(0)";
      }}
    >
      <div
        className="top-bar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "#c8ff00",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s",
        }}
      />
      <div
        style={{
          width: "48px",
          height: "48px",
          background: "rgba(200,255,0,0.1)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.8rem", letterSpacing: "-0.5px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.6, marginBottom: "1rem" }}>{description}</p>
      <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: "1.5rem" }}>{tags}</p>
      <div
        style={{
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(245,245,240,0.06)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.85rem",
          color: "#c8ff00",
        }}
      >
        {price}
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
  fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
};

const sectionSub: React.CSSProperties = {
  fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
  fontWeight: 300,
  color: "#888",
  maxWidth: "600px",
  marginTop: "1.5rem",
  lineHeight: 1.7,
};
