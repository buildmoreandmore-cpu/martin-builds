import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Demos — martin.builds",
  description:
    "See what a custom dashboard looks like for your industry. Staffing, restaurant, inspection, and real estate demos — built by martin.builds.",
  alternates: { canonical: "https://martinbuilds.ai/demo" },
};

const demos = [
  {
    title: "Coverage Command",
    vertical: "Staffing Agency",
    description:
      "Real-time shift coverage, worker dispatch, and revenue-at-risk tracking for staffing operators.",
    href: "/demo/staffing",
    accent: "#16a34a",
  },
  {
    title: "Restaurant Owner Dashboard",
    vertical: "Restaurant",
    description:
      "Food cost breakdowns, weekly projections, SMS ordering stats, and best/worst night analysis.",
    href: "/demo/restaurant",
    accent: "#d97706",
  },
  {
    title: "Inspection & Compliance Portal",
    vertical: "Inspection Services",
    description:
      "Certificate expiry tracking, violation remediation, inspector workload, and revenue by service type.",
    href: "/demo/inspection",
    accent: "#1e3a5f",
  },
  {
    title: "Investor Command Center",
    vertical: "Real Estate Investor",
    description:
      "Deal pipeline, wholesale spread analysis, skip tracing, cash buyer matching, and assignment tracking for real estate investors.",
    href: "/demo/realestate",
    accent: "#14532d",
  },
  {
    title: "Ecommerce Profit Dashboard",
    vertical: "DTC / Ecommerce",
    description:
      "True profit tracking, ad channel ROAS, CAC analysis, and ad set watchlist for DTC and dropshipping brands.",
    href: "/demo/ecommerce",
    accent: "#7c3aed",
  },
  {
    title: "Junk Removal Operations",
    vertical: "Junk Removal / Hauling",
    description:
      "Job board, crew dispatch, revenue by service area, estimates pipeline, and Google review tracking for junk removal operators.",
    href: "/demo/junk-removal",
    accent: "#14532d",
  },
  {
    title: "Production Company Command Center",
    vertical: "Production Company",
    description:
      "Project pipeline, profit per shoot, crew scheduling, and revenue gap forecasting for production companies.",
    href: "/demo/production",
    accent: "#7c3aed",
  },
];

export default function DemoIndex() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f5f5f0",
        fontFamily: "'Outfit', sans-serif",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem) 2rem",
          textAlign: "center",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-block",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            color: "#c8ff00",
            letterSpacing: "3px",
            textTransform: "uppercase",
            textDecoration: "none",
            marginBottom: "1.5rem",
          }}
        >
          martin.builds
        </Link>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: "1rem",
          }}
        >
          Live Dashboard Demos
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
            color: "#888",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Pick your industry. See what your custom dashboard could look like —
          built for how you actually run your business.
        </p>
      </div>

      {/* Demo Cards */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {demos.map((demo) => (
          <Link
            key={demo.href}
            href={demo.href}
            style={{
              display: "block",
              background: "#1a1a1a",
              border: "1px solid rgba(245,245,240,0.06)",
              borderRadius: "16px",
              padding: "2rem 1.75rem",
              textDecoration: "none",
              color: "#f5f5f0",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent top border */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: demo.accent,
              }}
            />

            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                color: demo.accent,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {demo.vertical}
            </div>

            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                letterSpacing: "-0.5px",
              }}
            >
              {demo.title}
            </h2>

            <p
              style={{
                fontSize: "0.875rem",
                color: "#888",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              {demo.description}
            </p>

            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#c8ff00",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              View demo
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          textAlign: "center",
          padding: "2rem 1.25rem 4rem",
        }}
      >
        <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
          Don&apos;t see your industry?
        </p>
        <Link
          href="/discovery-call"
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            background: "#c8ff00",
            color: "#0a0a0a",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          Book a Discovery Call
        </Link>
      </div>
    </main>
  );
}
