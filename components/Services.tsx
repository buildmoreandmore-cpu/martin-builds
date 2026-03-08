"use client";

import ScrollReveal from "./ScrollReveal";

const LightningIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const GearIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const RocketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const services = [
  {
    icon: <LightningIcon />,
    title: "AI Starter Build",
    description:
      "A defined-scope AI-powered site or tool — built to show you exactly what I can do. The fastest way to get something real into your business without a massive commitment.",
    price: "$5,000 setup fee",
  },
  {
    icon: <GearIcon />,
    title: "AI Build Sprint",
    description:
      "Platforms, dashboards, and multi-feature tools. More complex than a starter build — for clients who need more than a site but aren't ready for a full SaaS product.",
    price: "$8,000 – $12,000",
  },
  {
    icon: <RefreshIcon />,
    title: "AI Retainer",
    description:
      "Ongoing iteration, new features, and AI upgrades on a monthly cadence. $2,500/month is easy math once you've seen the work. Even 10 clients is $25K/month recurring.",
    price: "$2,500 – $5,000/mo",
  },
  {
    icon: <RocketIcon />,
    title: "Full Product Build",
    description:
      "App Store deployments and full SaaS builds from zero. Designed for real users, not pitch decks. This is the top of the stack.",
    price: "From $15,000",
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
          You don&apos;t need more AI advice.
          <br />
          You need someone who builds.
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={sectionSub}>
          You&apos;ve seen the demos. You&apos;ve read the articles. You&apos;re ready for someone to actually build the tool your business needs — not talk about it for 6 months.
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
            Book a Free Discovery Call — I&apos;ll Match You to the Right Option
          </a>
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
}: {
  icon: React.ReactNode;
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
