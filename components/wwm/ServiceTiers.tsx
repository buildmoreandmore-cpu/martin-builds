"use client";

import ScrollReveal from "../ScrollReveal";

const tiers = [
  {
    featured: true,
    label: "Most Popular",
    title: "AI Starter Build",
    price: "$5,000",
    desc: "A defined-scope AI-powered website or tool — designed, built, and deployed. Perfect for your first AI integration or a complete site rebuild with AI baked in.",
    includes: [
      "Custom AI-powered website or tool",
      "AI chat, smart forms, or automated workflows",
      "Mobile-responsive design",
      "2 rounds of revisions",
      "Deployed and live in 2 weeks",
    ],
    cta: "Start Here",
  },
  {
    featured: false,
    label: "For Complex Builds",
    title: "AI Build Sprint",
    price: "$8,000 – $12,000",
    desc: "Multi-feature platforms, dashboards, and internal tools. When you need more than a site — you need a system.",
    includes: [
      "Full-stack AI platform or dashboard",
      "Multiple AI integrations and automations",
      "Client-facing portals or admin panels",
      "Custom database architecture",
      "Deployed in 2–3 weeks",
    ],
    cta: "Let's Scope It",
  },
  {
    featured: false,
    label: "Ongoing Partnership",
    title: "AI Retainer",
    price: "$2,500 – $5,000/mo",
    desc: "Your AI builder on call. New features, iterations, maintenance, and upgrades every month. Your business evolves — your tools should too.",
    includes: [
      "Monthly feature builds and improvements",
      "AI model updates and optimization",
      "Priority support and communication",
      "Strategy sessions on what to build next",
      "Cancel anytime",
    ],
    cta: "Lock In a Spot",
  },
];

export default function ServiceTiers() {
  return (
    <section id="services" style={{ padding: "6rem 3rem", background: "#0a0a0a" }}>
      <ScrollReveal>
        <p style={sectionTag}>How We Work Together</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>Three ways to start building.</h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={sectionSub}>
          Whether you need a quick win or a full platform, there&apos;s a lane for you.
        </p>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          marginTop: "4rem",
          alignItems: "start",
        }}
      >
        {tiers.map((tier) => (
          <ScrollReveal key={tier.title}>
            <TierCard {...tier} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function TierCard({
  featured,
  label,
  title,
  price,
  desc,
  includes,
  cta,
}: {
  featured: boolean;
  label: string;
  title: string;
  price: string;
  desc: string;
  includes: string[];
  cta: string;
}) {
  return (
    <div
      style={{
        background: featured ? "#141a0a" : "#1a1a1a",
        border: featured ? "1px solid rgba(200,255,0,0.3)" : "1px solid rgba(245,245,240,0.06)",
        borderRadius: "16px",
        padding: "2.5rem",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s",
        ...(featured && { boxShadow: "0 0 40px rgba(200,255,0,0.06)" }),
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = featured ? "rgba(200,255,0,0.5)" : "rgba(200,255,0,0.15)";
        const bar = el.querySelector(".top-bar") as HTMLDivElement;
        if (bar) bar.style.transform = "scaleX(1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = featured ? "rgba(200,255,0,0.3)" : "rgba(245,245,240,0.06)";
        const bar = el.querySelector(".top-bar") as HTMLDivElement;
        if (bar && !featured) bar.style.transform = "scaleX(0)";
      }}
    >
      {/* Top accent bar */}
      <div
        className="top-bar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "#c8ff00",
          transform: featured ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s",
        }}
      />

      {/* Label badge */}
      <div
        style={{
          display: "inline-block",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: featured ? "#0a0a0a" : "#c8ff00",
          background: featured ? "#c8ff00" : "rgba(200,255,0,0.08)",
          padding: "0.3rem 0.75rem",
          borderRadius: "100px",
          marginBottom: "1.5rem",
        }}
      >
        {label}
      </div>

      <h3
        style={{
          fontSize: "1.4rem",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#c8ff00",
          marginBottom: "1.25rem",
        }}
      >
        {price}
      </div>

      <p
        style={{
          fontSize: "0.95rem",
          color: "#888",
          lineHeight: 1.65,
          marginBottom: "2rem",
        }}
      >
        {desc}
      </p>

      <div
        style={{
          borderTop: "1px solid rgba(245,245,240,0.06)",
          paddingTop: "1.5rem",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {includes.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <span
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "rgba(200,255,0,0.1)",
                border: "1px solid rgba(200,255,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path d="M1 3.5L3.5 6L8 1" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ fontSize: "0.9rem", color: "rgba(245,245,240,0.75)", lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>

      <a
        href="#book-call"
        style={{
          display: "block",
          textAlign: "center",
          background: featured ? "#c8ff00" : "transparent",
          color: featured ? "#0a0a0a" : "#f5f5f0",
          border: featured ? "none" : "1px solid rgba(245,245,240,0.2)",
          padding: "0.9rem 1.5rem",
          borderRadius: "100px",
          fontWeight: 700,
          fontSize: "0.95rem",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          if (featured) {
            el.style.boxShadow = "0 6px 24px rgba(200,255,0,0.25)";
            el.style.transform = "translateY(-2px)";
          } else {
            el.style.borderColor = "#c8ff00";
            el.style.color = "#c8ff00";
          }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.boxShadow = "none";
          el.style.transform = "translateY(0)";
          if (!featured) {
            el.style.borderColor = "rgba(245,245,240,0.2)";
            el.style.color = "#f5f5f0";
          }
        }}
      >
        {cta}
      </a>
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

const sectionSub: React.CSSProperties = {
  fontSize: "1.15rem",
  fontWeight: 300,
  color: "#888",
  maxWidth: "600px",
  marginTop: "1.5rem",
  lineHeight: 1.7,
};
