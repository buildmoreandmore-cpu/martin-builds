"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const builds = [
  {
    title: "Staffing Agency",
    desc: "Shift coverage, worker dispatch, revenue tracking",
    href: "/demo/staffing",
    accent: "#16a34a",
  },
  {
    title: "Restaurant",
    desc: "Food costs, projections, SMS ordering stats",
    href: "/demo/restaurant",
    accent: "#d97706",
  },
  {
    title: "HVAC",
    desc: "Dispatch board, seasonal revenue, maintenance agreements",
    href: "/demo/hvac",
    accent: "#2563eb",
  },
  {
    title: "Ecommerce / DTC",
    desc: "True profit tracking, ad ROAS, CAC analysis",
    href: "/demo/ecommerce",
    accent: "#7c3aed",
  },
  {
    title: "PI Law Firm",
    desc: "Case tracking, demand letters, medical records, e-signatures",
    href: "/demo/pi-firm",
    accent: "#1e3a5f",
  },
];

export default function WhatIBuild() {
  return (
    <section style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <ScrollReveal>
        <p style={tagStyle}>What I Build</p>
        <h2 style={titleStyle}>
          Pick your industry.{" "}
          <span style={{ color: "#c8ff00" }}>See the dashboard.</span>
        </h2>
        <p style={subStyle}>
          Every business runs differently. These are dashboard concepts designed for real industries — click any to explore.
        </p>
      </ScrollReveal>

      <div
        className="wib-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          marginTop: "3rem",
          maxWidth: "960px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {builds.map((b) => (
          <ScrollReveal key={b.href}>
            <Link
              href={b.href}
              style={{
                display: "block",
                padding: "1.5rem 1.25rem",
                background: "#1a1a1a",
                border: "1px solid rgba(245,245,240,0.06)",
                borderRadius: "14px",
                textDecoration: "none",
                color: "#f5f5f0",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: b.accent,
                }}
              />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{b.title}</h3>
              <p style={{ fontSize: "0.8rem", color: "#888", lineHeight: 1.5, margin: 0 }}>{b.desc}</p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  marginTop: "0.75rem",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#c8ff00",
                }}
              >
                View demo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            href="/demo"
            style={{
              color: "#c8ff00",
              fontWeight: 600,
              fontSize: "0.95rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            See all demos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </ScrollReveal>

      {/* Utility Agent CTA */}
      <ScrollReveal>
        <div
          style={{
            maxWidth: 960,
            margin: "3rem auto 0",
            padding: "2rem 2.5rem",
            background: "rgba(200,255,0,0.03)",
            border: "1px solid rgba(200,255,0,0.1)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#c8ff00", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Optional add-on
            </p>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.5rem" }}>
              Want your dashboard to work for you 24/7?
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.7, margin: 0 }}>
              Add a trained AI agent to your dashboard — it handles leads, answers questions, and manages your data around the clock. Embedded on your website and available via Telegram.
            </p>
          </div>
          <Link
            href="/utility"
            style={{
              padding: "0.75rem 2rem",
              background: "#c8ff00",
              color: "#0a0a0a",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "all 0.3s",
            }}
          >
            Learn about Utility Agents
          </Link>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 768px) {
          .wib-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .wib-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
};

const subStyle: React.CSSProperties = {
  fontSize: "clamp(1rem, 2vw, 1.15rem)",
  fontWeight: 300,
  color: "#888",
  marginTop: "1.5rem",
  lineHeight: 1.7,
  maxWidth: "560px",
};
