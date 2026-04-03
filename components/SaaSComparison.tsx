"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const platforms = [
  {
    name: "Salesforce",
    logo: "SF",
    color: "#00A1E0",
    price: "$300/user/mo",
    priceNote: "Enterprise — 5 users = $1,500/mo",
    annualCost: "$18,000",
    cons: [
      "6-12 month implementation",
      "Requires certified admin ($80K+ salary)",
      "80% of features unused",
      "Data locked in their ecosystem",
      "Price increases every renewal",
    ],
  },
  {
    name: "Monday.com",
    logo: "M",
    color: "#FF3D57",
    price: "$48/seat/mo",
    priceNote: "Pro plan — 10 seats = $480/mo",
    annualCost: "$5,760",
    cons: [
      "Generic project boards",
      "No real business intelligence",
      "Dashboards are just widget grids",
      "You customize it — they don't",
      "Can't integrate your actual workflow",
    ],
  },
  {
    name: "HighLevel",
    logo: "HL",
    color: "#4CAF50",
    price: "$497/mo",
    priceNote: "SaaS Pro plan",
    annualCost: "$5,964",
    cons: [
      "White-label CRM, not custom",
      "Same templates as every competitor",
      "Learning curve for your team",
      "Feature bloat — 90% irrelevant",
      "You're renting, not owning",
    ],
  },
];

const customBenefits = [
  { label: "Built for your workflow", desc: "Not a template — designed around how your team actually works" },
  { label: "You own everything", desc: "Your code, your data, your domain. No vendor lock-in, ever" },
  { label: "Only the features you need", desc: "6 pages instead of 200. Your team uses it because it's simple" },
  { label: "Live in 2 weeks", desc: "Not 6 months. Scoped, built, and deployed — on your timeline" },
  { label: "One-time investment", desc: "No per-seat pricing. No surprise renewals. Pay once, own forever" },
  { label: "Real business intelligence", desc: "Metrics that matter to you — not generic widgets everyone gets" },
];

export default function SaaSComparison() {
  const [activePlatform, setActivePlatform] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => setShowCustom(true), 600);
    return () => clearTimeout(t);
  }, [isVisible]);

  const platform = platforms[activePlatform];

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,3rem)",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(200,255,0,0.06)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={tagStyle}>The Comparison</p>
            <h2 style={titleStyle}>
              They charge monthly.
              <br />
              <span style={{ color: "#c8ff00" }}>You own yours.</span>
            </h2>
            <p style={subStyle}>
              See what you&apos;re actually getting for that subscription.
            </p>
          </div>
        </ScrollReveal>

        {/* Platform selector tabs */}
        <div
          className="saas-tabs"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {platforms.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActivePlatform(i)}
              style={{
                padding: "0.6rem 1.4rem",
                borderRadius: "100px",
                border: "1px solid",
                borderColor:
                  activePlatform === i
                    ? p.color
                    : "rgba(245,245,240,0.1)",
                background:
                  activePlatform === i
                    ? `${p.color}15`
                    : "transparent",
                color: activePlatform === i ? p.color : "#666",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.72rem",
                fontWeight: activePlatform === i ? 700 : 500,
                letterSpacing: "0.5px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Side-by-side comparison */}
        <div
          className="saas-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 60px 1fr",
            gap: "0",
            alignItems: "stretch",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* SaaS side */}
          <div
            key={platform.name}
            style={{
              background: "#141414",
              borderRadius: "16px 0 0 16px",
              border: `1px solid ${platform.color}30`,
              borderRight: "none",
              padding: "2rem",
              animation: "saasSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Logo + name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: `${platform.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  color: platform.color,
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {platform.logo}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#f5f5f0",
                  }}
                >
                  {platform.name}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#666",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {platform.priceNote}
                </div>
              </div>
            </div>

            {/* Price */}
            <div
              style={{
                padding: "1.25rem",
                background: `${platform.color}08`,
                borderRadius: "12px",
                border: `1px solid ${platform.color}15`,
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: platform.color,
                  lineHeight: 1,
                }}
              >
                {platform.price}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#888",
                  marginTop: "0.5rem",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {platform.annualCost}/yr — and you own nothing
              </div>
            </div>

            {/* What you get */}
            <div
              style={{
                fontSize: "0.7rem",
                color: "#666",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              What you&apos;re paying for
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {platform.cons.map((con, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    fontSize: "0.82rem",
                    color: "#888",
                    lineHeight: 1.5,
                    animation: `saasItemIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both`,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: "3px" }}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {con}
                </div>
              ))}
            </div>
          </div>

          {/* VS divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#0a0a0a",
                border: "2px solid rgba(200,255,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#c8ff00",
                letterSpacing: "1px",
              }}
            >
              VS
            </div>
          </div>

          {/* Custom side */}
          <div
            style={{
              background: "#141414",
              borderRadius: "0 16px 16px 0",
              border: "1px solid rgba(200,255,0,0.15)",
              borderLeft: "none",
              padding: "2rem",
              opacity: showCustom ? 1 : 0,
              transform: showCustom
                ? "translateX(0)"
                : "translateX(16px)",
              transition:
                "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Logo + name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(200,255,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  color: "#c8ff00",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                mb
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#f5f5f0",
                  }}
                >
                  Custom Dashboard
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#666",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  Built for your business
                </div>
              </div>
            </div>

            {/* Price */}
            <div
              style={{
                padding: "1.25rem",
                background: "rgba(200,255,0,0.04)",
                borderRadius: "12px",
                border: "1px solid rgba(200,255,0,0.12)",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "#c8ff00",
                  lineHeight: 1,
                }}
              >
                One-time
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#888",
                  marginTop: "0.5rem",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                Pay once — own it forever. No subscriptions.
              </div>
            </div>

            {/* What you get */}
            <div
              style={{
                fontSize: "0.7rem",
                color: "#666",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              What you actually get
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {customBenefits.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    fontSize: "0.82rem",
                    color: "#ccc",
                    lineHeight: 1.5,
                    opacity: showCustom ? 1 : 0,
                    transform: showCustom
                      ? "translateY(0)"
                      : "translateY(8px)",
                    transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${
                      i * 80 + 200
                    }ms`,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c8ff00"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: "3px" }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <span style={{ fontWeight: 600, color: "#f5f5f0" }}>
                      {b.label}
                    </span>
                    <span style={{ color: "#888" }}> — {b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile view */}
        <div
          className="saas-mobile"
          style={{ display: "none", maxWidth: "500px", margin: "0 auto" }}
        >
          {/* Platform tabs (mobile) */}
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              marginBottom: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {platforms.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActivePlatform(i)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "100px",
                  border: `1px solid ${
                    activePlatform === i ? p.color : "rgba(245,245,240,0.1)"
                  }`,
                  background:
                    activePlatform === i ? `${p.color}15` : "transparent",
                  color: activePlatform === i ? p.color : "#666",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* SaaS card */}
          <div
            key={`mobile-${platform.name}`}
            style={{
              background: "#141414",
              borderRadius: "14px",
              border: `1px solid ${platform.color}30`,
              padding: "1.5rem",
              marginBottom: "1rem",
              animation: "saasSlideIn 0.3s ease-out",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: `${platform.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  color: platform.color,
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {platform.logo}
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#f5f5f0" }}>
                {platform.name}
              </div>
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: platform.color,
                marginBottom: "0.25rem",
              }}
            >
              {platform.price}
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "#888",
                marginBottom: "1rem",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {platform.annualCost}/yr
            </div>
            {platform.cons.slice(0, 3).map((con, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  color: "#888",
                  marginBottom: "0.4rem",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                {con}
              </div>
            ))}
          </div>

          {/* VS */}
          <div
            style={{
              textAlign: "center",
              margin: "0.5rem 0",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#c8ff00",
              letterSpacing: "2px",
            }}
          >
            VS
          </div>

          {/* Custom card */}
          <div
            style={{
              background: "#141414",
              borderRadius: "14px",
              border: "1px solid rgba(200,255,0,0.15)",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(200,255,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  color: "#c8ff00",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                mb
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#f5f5f0" }}>
                Custom Dashboard
              </div>
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#c8ff00",
                marginBottom: "0.25rem",
              }}
            >
              One-time
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "#888",
                marginBottom: "1rem",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Own forever. No subscriptions.
            </div>
            {customBenefits.slice(0, 4).map((b, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  color: "#ccc",
                  marginBottom: "0.4rem",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {b.label}
              </div>
            ))}
          </div>
        </div>

        {/* Annual cost comparison bar */}
        <ScrollReveal>
          <div
            style={{
              marginTop: "3rem",
              background: "#141414",
              borderRadius: "16px",
              border: "1px solid rgba(245,245,240,0.06)",
              padding: "2rem",
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                color: "#666",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              What you&apos;d spend in 3 years
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {platforms.map((p) => {
                const annual = parseInt(p.annualCost.replace(/[$,]/g, ""));
                const threeYear = annual * 3;
                const maxCost = 54000; // Salesforce 3yr
                const width = (threeYear / maxCost) * 100;
                return (
                  <div key={p.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#f5f5f0",
                        }}
                      >
                        {p.name}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: p.color,
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        ${threeYear.toLocaleString()}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "8px",
                        background: "rgba(245,245,240,0.04)",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="saas-cost-bar"
                        style={{
                          height: "100%",
                          width: `${width}%`,
                          background: p.color,
                          borderRadius: "4px",
                          opacity: 0.6,
                          transition:
                            "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              {/* Custom */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.3rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#c8ff00",
                    }}
                  >
                    Custom Dashboard
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#c8ff00",
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    One-time
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "rgba(245,245,240,0.04)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="saas-cost-bar"
                    style={{
                      height: "100%",
                      width: "12%",
                      background: "#c8ff00",
                      borderRadius: "4px",
                      transition:
                        "width 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes saasSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes saasItemIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .saas-grid { display: none !important; }
          .saas-mobile { display: block !important; }
          .saas-tabs { display: none !important; }
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
  margin: "0 auto",
};

const subStyle: React.CSSProperties = {
  fontSize: "clamp(1rem, 2vw, 1.2rem)",
  fontWeight: 300,
  color: "#888",
  marginTop: "1rem",
  lineHeight: 1.7,
};
