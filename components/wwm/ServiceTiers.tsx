"use client";

import ScrollReveal from "../ScrollReveal";

const growingTiers = [
  {
    featured: false,
    label: "Fast Start",
    title: "AI Build Sprint",
    price: "From $5,000",
    desc: "A defined AI-powered tool or website — designed, built, and deployed fast. Perfect for your first AI integration or a system your team needs yesterday.",
    includes: [
      "Custom AI-powered website or business tool",
      "AI integrations (chat, automation, smart forms)",
      "Mobile-responsive design",
      "2 rounds of revisions",
      "Deployed and live in 2 weeks",
    ],
    cta: "Book a Discovery Call",
    href: "/discovery-call",
  },
  {
    featured: true,
    label: "Full Platform",
    title: "AI Platform Build",
    price: "From $8,000",
    desc: "Full-stack AI platforms — client portals, admin dashboards, automated workflows, and integrations. Scoped, built, and live in 2-3 weeks.",
    includes: [
      "Full-stack AI platform or dashboard",
      "Multiple AI integrations and automations",
      "Client-facing portals or admin panels",
      "Custom database architecture",
      "Deployed in 2–3 weeks",
    ],
    cta: "Book a Discovery Call",
    href: "/discovery-call",
  },
  {
    featured: false,
    label: "Ongoing Partnership",
    title: "AI Retainer",
    price: "$2,500 – $5,000/mo",
    desc: "Your AI builder on call. New features, iterations, and system upgrades every month. Your operations evolve — your tools should too.",
    includes: [
      "Monthly feature builds and improvements",
      "AI model updates and optimization",
      "Priority support and communication",
      "Strategy sessions on what to build next",
      "Cancel anytime",
    ],
    cta: "Book a Discovery Call",
    href: "/discovery-call",
  },
];

const smallBizOptions = [
  {
    title: "AI Power Hour",
    price: "$500",
    desc: "1-on-1, 60 minutes, Zoom. I show you exactly which AI tools fit your business — with live demos and a personalized game plan.",
    includes: [
      "AI tool recommendations for your specific business",
      "Live demos and walkthroughs",
      "Recorded session + 30-day follow-up",
      "$500 credited toward any future build",
    ],
    cta: "Book a Power Hour",
    href: "/power-hour",
  },
  {
    title: "AI Chat Agent",
    price: "From $300/mo",
    desc: "A custom-trained AI agent that answers customer questions, captures leads, and books appointments — 24/7, branded to your business.",
    includes: [
      "Custom-trained on your business",
      "Answers customer questions 24/7",
      "Captures leads and books appointments",
      "Branded to match your site",
      "Live in 48 hours",
    ],
    cta: "See the Demo",
    href: "/ai-agent",
  },
];

export default function ServiceTiers() {
  return (
    <>
      {/* Section A: Growing Businesses */}
      <section id="services" style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
        <ScrollReveal>
          <p style={sectionTag}>For Growing Businesses ($1M+)</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={sectionTitle}>Custom AI systems built for your operations.</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p style={sectionSub}>
            Platforms, dashboards, and tools designed to save your team time and scale with your business.
          </p>
        </ScrollReveal>

        <div
          className="tiers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginTop: "4rem",
            alignItems: "start",
          }}
        >
          {growingTiers.map((tier) => (
            <ScrollReveal key={tier.title}>
              <TierCard {...tier} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Section B: Small Businesses */}
      <section style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#1a1a1a", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
        <ScrollReveal>
          <p style={sectionTag}>For Small Businesses (Getting Started)</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={{ ...sectionTitle, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            Not ready for a full build? Start here.
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <p style={sectionSub}>
            These options are designed for small businesses that want to start using AI without a big upfront investment.
          </p>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginTop: "3rem",
            maxWidth: "700px",
          }}
        >
          {smallBizOptions.map((opt) => (
            <ScrollReveal key={opt.title}>
              <SmallBizCard {...opt} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
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
  href,
}: {
  featured: boolean;
  label: string;
  title: string;
  price: string;
  desc: string;
  includes: string[];
  cta: string;
  href: string;
}) {
  return (
    <div
      style={{
        background: featured ? "#141a0a" : "#1a1a1a",
        border: featured ? "1px solid rgba(200,255,0,0.3)" : "1px solid rgba(245,245,240,0.06)",
        borderRadius: "16px",
        padding: "clamp(1.5rem, 4vw, 2.5rem)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...(featured && { boxShadow: "0 0 40px rgba(200,255,0,0.06)" }),
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = featured ? "rgba(200,255,0,0.5)" : "rgba(200,255,0,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = featured ? "rgba(200,255,0,0.3)" : "rgba(245,245,240,0.06)";
      }}
    >
      {featured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00" }} />}
      <div style={{
        display: "inline-block", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
        letterSpacing: "2px", textTransform: "uppercase",
        color: featured ? "#0a0a0a" : "#c8ff00",
        background: featured ? "#c8ff00" : "rgba(200,255,0,0.08)",
        padding: "0.3rem 0.75rem", borderRadius: "100px", marginBottom: "1.5rem", alignSelf: "flex-start",
      }}>{label}</div>
      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>{title}</h3>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, color: "#c8ff00", marginBottom: "1.25rem" }}>{price}</div>
      <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.65, marginBottom: "2rem" }}>{desc}</p>
      <div style={{ borderTop: "1px solid rgba(245,245,240,0.06)", paddingTop: "1.5rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        {includes.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span style={{ fontSize: "0.9rem", color: "rgba(245,245,240,0.75)", lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
      <a href={href} style={{
        display: "block", textAlign: "center",
        background: featured ? "#c8ff00" : "transparent",
        color: featured ? "#0a0a0a" : "#f5f5f0",
        border: featured ? "none" : "1px solid rgba(245,245,240,0.2)",
        padding: "0.9rem 1.5rem", borderRadius: "100px", fontWeight: 700, fontSize: "0.95rem",
        transition: "all 0.3s", textDecoration: "none",
      }}>{cta}</a>
    </div>
  );
}

function SmallBizCard({ title, price, desc, includes, cta, href }: {
  title: string; price: string; desc: string; includes: string[]; cta: string; href: string;
}) {
  return (
    <div style={{
      background: "#0a0a0a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "16px",
      padding: "clamp(1.5rem, 4vw, 2.5rem)", height: "100%", display: "flex", flexDirection: "column",
      transition: "all 0.4s",
    }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.15)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)"; }}
    >
      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>{title}</h3>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, color: "#c8ff00", marginBottom: "1rem" }}>{price}</div>
      <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.65, marginBottom: "1.5rem" }}>{desc}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1, marginBottom: "1.5rem" }}>
        {includes.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span style={{ fontSize: "0.9rem", color: "rgba(245,245,240,0.75)", lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
      <a href={href} style={{
        display: "block", textAlign: "center", background: "transparent", color: "#f5f5f0",
        border: "1px solid rgba(245,245,240,0.2)", padding: "0.9rem 1.5rem", borderRadius: "100px",
        fontWeight: 700, fontSize: "0.95rem", transition: "all 0.3s", textDecoration: "none",
      }}>{cta}</a>
    </div>
  );
}

const sectionTag: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00",
  letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem",
};
const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1,
  letterSpacing: "-2px", maxWidth: "700px",
};
const sectionSub: React.CSSProperties = {
  fontSize: "clamp(0.95rem, 2vw, 1.15rem)", fontWeight: 300, color: "#888",
  maxWidth: "600px", marginTop: "1.5rem", lineHeight: 1.7,
};
