"use client";

import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: "⚡",
    title: "2-Week AI Build Sprint",
    description:
      "A complete AI-powered tool, platform, or internal system — designed, built, and deployed in two weeks. Not a prototype. The real thing.",
    price: "From $15,000",
  },
  {
    icon: "↻",
    title: "AI Retainer",
    description:
      "Ongoing iteration, new features, maintenance, and AI upgrades. Your business evolves — your tools should too. I stay on as your AI builder.",
    price: "$5,000 – $10,000/mo",
  },
  {
    icon: "⚙",
    title: "AI-Powered Websites",
    description:
      "Not just a site that looks good — one that works. AI chat, smart forms, automated workflows, and conversion tools baked in from day one.",
    price: "From $8,000",
  },
  {
    icon: "🚀",
    title: "SaaS & App Development",
    description:
      "Full product builds from zero to App Store. Mobile apps, web apps, dashboards — designed for real users, not pitch decks.",
    price: "From $20,000",
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: "6rem 3rem", background: "#0a0a0a" }}>
      <ScrollReveal>
        <p style={sectionTag}>What I Build</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          Less hype.
          <br />
          More shipped products.
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={sectionSub}>
          I translate what AI can do into tools your team will actually use. Custom-built. Fast. No bloat.
        </p>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginTop: "4rem",
        }}
      >
        {services.map((s) => (
          <ScrollReveal key={s.title}>
            <ServiceCard {...s} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  price,
}: {
  icon: string;
  title: string;
  description: string;
  price: string;
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
          fontSize: "1.4rem",
          marginBottom: "1.5rem",
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.8rem", letterSpacing: "-0.5px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.6 }}>{description}</p>
      <div
        style={{
          marginTop: "1.5rem",
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
