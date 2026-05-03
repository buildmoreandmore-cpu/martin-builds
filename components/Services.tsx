"use client";

import ScrollReveal from "./ScrollReveal";

const SprintIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const PlatformIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const AgentIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="10" r="1" fill="#c8ff00" />
    <circle cx="15" cy="10" r="1" fill="#c8ff00" />
    <path d="M9 16h6" />
  </svg>
);

const RetainerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

// Phase 1 + 2 — unchanged
const phaseOne = {
  icon: <SprintIcon />,
  title: "Foundation",
  description: "Custom website with a built-in admin dashboard — scoped, built, and live in 14 days. Your data, your metrics, your layout. No templates. No monthly fees.",
  tags: "Phase 1 · Website · Dashboard · 14 Days",
};
const phaseTwo = {
  icon: <PlatformIcon />,
  title: "Full Stack",
  description: "Everything in Phase 1, plus client portals, automated workflows, integrations, and AWS infrastructure. The full system — from first click to signed deal.",
  tags: "Phase 2 · Portals · Workflows · Integrations",
};

// Phase 3 — two paths
const utilityAgent = {
  icon: <AgentIcon />,
  title: "Utility Agent",
  price: "From [set price]/mo",
  badge: "Most popular",
  description: "A trained AI agent embedded in your dashboard. Handles day-to-day questions, small fixes, content updates, and routine data work — 24/7. Available on your dashboard, by Telegram, or wherever your team already communicates.",
  bullets: [
    "Answers questions about your data on demand",
    "Routine updates (copy changes, small UI tweaks, content swaps)",
    "Scheduled reports and reminders",
    "Lead intake and triage",
    "Custom workflows you train it on",
  ],
  link: { label: "Learn about Utility Agents →", href: "/utility" },
};

const monthlyRetainer = {
  icon: <RetainerIcon />,
  title: "Monthly Retainer",
  price: "From [set price]/mo · Flexible scope",
  description: "Me, on call. New features, deeper iterations, integrations, performance work, and strategy as your business grows. For clients who want a builder in their corner — not just an agent. Cancel anytime.",
  bullets: [
    "New features and dashboard expansions",
    "Integrations with new tools as you adopt them",
    "Performance optimization and refactors",
    "Strategic input on what to build next",
    "Direct access — text or call",
  ],
};

export default function Services() {
  return (
    <section id="services" style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <ScrollReveal>
        <p style={sectionTag}>What I Build</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          A custom website.
          <br />
          A custom dashboard.
          <br />
          <span style={{ color: "#c8ff00" }}>One builder. Your vision.</span>
        </h2>
      </ScrollReveal>

      {/* Phases 1 + 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "2rem",
          marginTop: "4rem",
        }}
      >
        <ScrollReveal>
          <ServiceCard {...phaseOne} />
        </ScrollReveal>
        <ScrollReveal>
          <ServiceCard {...phaseTwo} />
        </ScrollReveal>
      </div>

      {/* Phase 3 — After the build */}
      <div style={{ marginTop: "clamp(4rem, 8vw, 6rem)" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ ...sectionTag, marginBottom: "1rem" }}>Phase 3 · After the Build</p>
            <h3 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-1px", maxWidth: "720px", margin: "0 auto" }}>
              After the build: <span style={{ color: "#c8ff00" }}>two ways to keep moving.</span>
            </h3>
            <p style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)", color: "#888", maxWidth: "620px", margin: "1rem auto 0", lineHeight: 1.6 }}>
              Every build ships fully owned and ready to run. From there, you choose how much support you want — automated, hands-on, or both.
            </p>
          </div>
        </ScrollReveal>

        {/* Two side-by-side cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "2rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <ScrollReveal>
            <PathCard {...utilityAgent} />
          </ScrollReveal>
          <ScrollReveal>
            <PathCard {...monthlyRetainer} />
          </ScrollReveal>
        </div>

        {/* Combined line */}
        <ScrollReveal>
          <p
            style={{
              maxWidth: "1000px",
              margin: "2rem auto 0",
              padding: "1.25rem 1.5rem",
              background: "rgba(245,245,240,0.03)",
              border: "1px solid rgba(245,245,240,0.06)",
              borderRadius: 10,
              fontSize: "0.95rem",
              color: "#ccc",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Most clients combine both. <strong style={{ color: "#f5f5f0" }}>The Utility Agent handles the daily stuff. I handle the bigger moves.</strong>
          </p>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <a
              href="/discovery-call"
              style={{ color: "#c8ff00", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(200,255,0,0.4)", paddingBottom: 2 }}
            >
              Talk through what fits →
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom CTA — original */}
      <ScrollReveal>
        <div style={{ marginTop: "4rem", textAlign: "center" }}>
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
          <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "#888", fontFamily: "'Space Mono', monospace" }}>
            Financing available — payments as low as $300/mo
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
  tags,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
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
      <div className="top-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s" }} />
      <div style={{ width: "48px", height: "48px", background: "rgba(200,255,0,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
        {icon}
      </div>
      <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.8rem", letterSpacing: "-0.5px" }}>{title}</h3>
      <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.6, marginBottom: "1rem" }}>{description}</p>
      <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: 0 }}>{tags}</p>
    </div>
  );
}

function PathCard({
  icon,
  title,
  price,
  badge,
  description,
  bullets,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  price: string;
  badge?: string;
  description: string;
  bullets: string[];
  link?: { label: string; href: string };
}) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid rgba(245,245,240,0.06)",
        borderRadius: "16px",
        padding: "2.25rem",
        transition: "all 0.4s",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
      <div className="top-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s" }} />

      {/* Badge */}
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: "0.65rem",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "1px",
            textTransform: "uppercase",
            padding: "4px 10px",
            background: "rgba(200,255,0,0.12)",
            color: "#c8ff00",
            borderRadius: 100,
            fontWeight: 600,
          }}
        >
          {badge}
        </span>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
        <div style={{ width: "44px", height: "44px", background: "rgba(200,255,0,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {icon}
        </div>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>{title}</h3>
      </div>

      <p style={{ fontSize: "0.85rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", marginBottom: "1.25rem", letterSpacing: "0.3px" }}>{price}</p>

      <p style={{ fontSize: "0.95rem", color: "#bbb", lineHeight: 1.7, marginBottom: "1.5rem" }}>{description}</p>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.9rem", color: "#aaa", lineHeight: 1.5 }}>
            <span style={{ flexShrink: 0, marginTop: 5, width: 14, height: 14, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {link && (
        <a href={link.href} style={{ color: "#c8ff00", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(200,255,0,0.4)", paddingBottom: 2, alignSelf: "flex-start", marginTop: "auto" }}>
          {link.label}
        </a>
      )}
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
