"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

/* ── SVG Icons ── */

const KpiIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const InvoiceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClientsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* ── Feature modules a prospect can toggle on/off ── */

const features = [
  { id: "kpis", label: "KPIs", icon: <KpiIcon /> },
  { id: "chart", label: "Revenue Chart", icon: <ChartIcon /> },
  { id: "activity", label: "Activity Feed", icon: <ActivityIcon /> },
  { id: "invoices", label: "Invoicing", icon: <InvoiceIcon /> },
  { id: "calendar", label: "Scheduling", icon: <CalendarIcon /> },
  { id: "clients", label: "Client List", icon: <ClientsIcon /> },
];

export default function DashboardPreview() {
  const [active, setActive] = useState<Set<string>>(new Set(["kpis"]));
  const [paused, setPaused] = useState(false);
  const cycleIndex = useRef(1); // start after kpis which is already on

  const toggle = useCallback((id: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Auto-cycle: add features one by one, pause on hover
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      const idx = cycleIndex.current;
      if (idx < features.length) {
        const feature = features[idx];
        setActive((prev) => new Set([...prev, feature.id]));
        cycleIndex.current = idx + 1;
      } else {
        clearInterval(interval);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      style={{
        padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,5vw,3rem)",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <ScrollReveal>
        <p style={tagStyle}>How I Scope It</p>
        <h2 style={titleStyle}>
          Toggle what you want.<br />
          <span style={{ color: "#c8ff00" }}>That&rsquo;s the scope.</span>
        </h2>
        <p style={subStyle}>
          Every build starts as a list of features. You pick what&rsquo;s in, I quote the build. No proposal docs, no &ldquo;phase 2&rdquo; surprises.
        </p>
      </ScrollReveal>

      {/* Feature toggles */}
      <ScrollReveal>
        <div
          className="dp-toggles"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "2.5rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {features.map((f) => {
            const on = active.has(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggle(f.id)}
                style={{
                  padding: "0.55rem 1.2rem",
                  borderRadius: "100px",
                  border: "1px solid",
                  borderColor: on
                    ? "rgba(200,255,0,0.35)"
                    : "rgba(245,245,240,0.1)",
                  background: on ? "rgba(200,255,0,0.08)" : "transparent",
                  color: on ? "#c8ff00" : "#666",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: on ? "scale(1.04)" : "scale(1)",
                }}
              >
                <span style={{ marginRight: "0.4rem", display: "inline-flex", verticalAlign: "middle" }}>{f.icon}</span>
                {f.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Dashboard mock */}
      <div
        style={{ maxWidth: "900px", margin: "0 auto" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(200,255,0,0.12)",
            background: "#1a1a1a",
            display: "flex",
            minHeight: "460px",
          }}
        >
          {/* Sidebar */}
          <div
            className="dp-sidebar"
            style={{
              width: "170px",
              background: "#111",
              borderRight: "1px solid rgba(200,255,0,0.06)",
              padding: "1rem 0",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: "0 1rem 1rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#c8ff00",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Your Business
            </div>
            {[
              "Dashboard",
              ...features
                .filter((f) => active.has(f.id) && f.id !== "kpis" && f.id !== "chart" && f.id !== "activity")
                .map((f) => f.label),
              "Settings",
            ].map((item, i) => {
              const isFirst = i === 0;
              return (
                <div
                  key={item}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    color: isFirst ? "#c8ff00" : "#888",
                    fontWeight: isFirst ? 600 : 400,
                    background: isFirst
                      ? "rgba(200,255,0,0.06)"
                      : "transparent",
                    borderRadius: "6px",
                    margin: "0 0.5rem 0.15rem",
                    animation: `dpStagger 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms both`,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Top bar */}
            <div
              style={{
                padding: "0.75rem 1.25rem",
                borderBottom: "1px solid rgba(200,255,0,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f5f5f0" }}>
                Good morning, Owner
              </div>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#c8ff00",
                }}
              />
            </div>

            {/* Content area */}
            <div style={{ padding: "1.25rem", flex: 1, overflowY: "auto" }}>
              {active.size === 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "#555",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.8rem",
                    textAlign: "center",
                    padding: "3rem",
                    lineHeight: 1.8,
                  }}
                >
                  Toggle features above to build your dashboard.
                </div>
              )}

              {/* KPIs */}
              {active.has("kpis") && (
                <div
                  key="kpis"
                  className="dp-metric-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                    animation: "dpFadeIn 0.35s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {[
                    { label: "Revenue", value: "$24.8K", sub: "this month", accent: true },
                    { label: "Expenses", value: "$9.2K", sub: "↓ 12% vs last" },
                    { label: "Net Profit", value: "$15.6K", sub: "63% margin" },
                    { label: "Open Tasks", value: "7", sub: "3 due today" },
                  ].map((m, i) => (
                    <div
                      key={m.label}
                      style={{
                        padding: "1rem",
                        borderRadius: "10px",
                        background: "rgba(245,245,240,0.02)",
                        border: "1px solid rgba(245,245,240,0.06)",
                        animation: `dpMetricIn 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.6rem",
                          color: "#666",
                          fontFamily: "'Space Mono', monospace",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {m.label}
                      </div>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 800,
                          color: m.accent ? "#c8ff00" : "#f5f5f0",
                          fontFamily: "'Space Mono', monospace",
                          lineHeight: 1,
                        }}
                      >
                        {m.value}
                      </div>
                      <div
                        style={{
                          fontSize: "0.65rem",
                          color: m.sub.startsWith("↓") ? "#c8ff00" : "#555",
                          marginTop: "0.35rem",
                        }}
                      >
                        {m.sub}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Chart */}
              {active.has("chart") && (
                <div
                  key="chart"
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    background: "rgba(245,245,240,0.02)",
                    border: "1px solid rgba(245,245,240,0.06)",
                    marginBottom: "1rem",
                    animation: "dpFadeIn 0.35s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.6rem",
                      color: "#666",
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    Revenue by Week
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "6px",
                      height: "100px",
                    }}
                  >
                    {[35, 52, 48, 60, 45, 72, 82].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: `${h}%`,
                          background:
                            i === 6
                              ? "#c8ff00"
                              : "rgba(200,255,0,0.15)",
                          borderRadius: "4px 4px 0 0",
                          transformOrigin: "bottom",
                          animation: `dpBarGrow 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 50}ms both`,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "0.5rem",
                    }}
                  >
                    {["W1", "W2", "W3", "W4", "W5", "W6", "W7"].map((l) => (
                      <span
                        key={l}
                        style={{
                          flex: 1,
                          textAlign: "center",
                          fontSize: "0.55rem",
                          color: "#555",
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity feed */}
              {active.has("activity") && (
                <div
                  key="activity"
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    background: "rgba(245,245,240,0.02)",
                    border: "1px solid rgba(245,245,240,0.06)",
                    marginBottom: "1rem",
                    animation: "dpFadeIn 0.35s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.6rem",
                      color: "#666",
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Recent Activity
                  </div>
                  {[
                    { text: "New lead submitted — Contact form", time: "2m ago" },
                    { text: "Invoice #1042 paid — $2,400", time: "1h ago" },
                    { text: "Task completed — Update landing page", time: "3h ago" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.5rem 0",
                        borderBottom:
                          i < 2
                            ? "1px solid rgba(245,245,240,0.04)"
                            : "none",
                        fontSize: "0.75rem",
                        animation: `dpRowSlide 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`,
                      }}
                    >
                      <span style={{ color: "#ccc" }}>{item.text}</span>
                      <span
                        style={{
                          color: "#555",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.65rem",
                          whiteSpace: "nowrap",
                          marginLeft: "1rem",
                        }}
                      >
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Invoicing */}
              {active.has("invoices") && (
                <div
                  key="invoices"
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    background: "rgba(245,245,240,0.02)",
                    border: "1px solid rgba(245,245,240,0.06)",
                    marginBottom: "1rem",
                    animation: "dpFadeIn 0.35s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        fontSize: "0.6rem",
                        color: "#666",
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      Recent Invoices
                    </div>
                    <span
                      style={{
                        padding: "0.3rem 0.7rem",
                        background: "rgba(200,255,0,0.08)",
                        border: "1px solid rgba(200,255,0,0.15)",
                        borderRadius: "8px",
                        color: "#c8ff00",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      + New Invoice
                    </span>
                  </div>
                  {[
                    { id: "#1042", client: "Acme Corp", amount: "$2,400", status: "Paid" },
                    { id: "#1041", client: "Peak Design", amount: "$1,800", status: "Sent" },
                    { id: "#1040", client: "Bloom Studio", amount: "$3,200", status: "Draft" },
                  ].map((inv, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.5rem 0",
                        borderBottom:
                          i < 2
                            ? "1px solid rgba(245,245,240,0.04)"
                            : "none",
                        fontSize: "0.75rem",
                        animation: `dpRowSlide 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`,
                      }}
                    >
                      <span style={{ color: "#888", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", width: "50px" }}>{inv.id}</span>
                      <span style={{ color: "#ccc", flex: 1, marginLeft: "0.5rem" }}>{inv.client}</span>
                      <span style={{ color: "#f5f5f0", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", fontWeight: 600, marginRight: "0.75rem" }}>{inv.amount}</span>
                      <span
                        style={{
                          fontSize: "0.55rem",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "100px",
                          fontFamily: "'Space Mono', monospace",
                          background:
                            inv.status === "Paid"
                              ? "rgba(200,255,0,0.08)"
                              : inv.status === "Sent"
                              ? "rgba(100,180,255,0.08)"
                              : "rgba(245,245,240,0.04)",
                          color:
                            inv.status === "Paid"
                              ? "#c8ff00"
                              : inv.status === "Sent"
                              ? "#64b4ff"
                              : "#888",
                        }}
                      >
                        {inv.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Scheduling */}
              {active.has("calendar") && (
                <div
                  key="calendar"
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    background: "rgba(245,245,240,0.02)",
                    border: "1px solid rgba(245,245,240,0.06)",
                    marginBottom: "1rem",
                    animation: "dpFadeIn 0.35s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.6rem",
                      color: "#666",
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Today&apos;s Schedule
                  </div>
                  {[
                    { time: "9:00 AM", title: "Team standup", tag: "Internal" },
                    { time: "11:30 AM", title: "Client walkthrough — Acme Corp", tag: "Meeting" },
                    { time: "2:00 PM", title: "Design review", tag: "Internal" },
                  ].map((evt, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.5rem 0",
                        borderBottom:
                          i < 2
                            ? "1px solid rgba(245,245,240,0.04)"
                            : "none",
                        animation: `dpRowSlide 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.65rem",
                          color: "#888",
                          width: "65px",
                          flexShrink: 0,
                        }}
                      >
                        {evt.time}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#ccc", flex: 1 }}>
                        {evt.title}
                      </span>
                      <span
                        style={{
                          fontSize: "0.55rem",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "100px",
                          fontFamily: "'Space Mono', monospace",
                          background:
                            evt.tag === "Meeting"
                              ? "rgba(100,180,255,0.08)"
                              : "rgba(245,245,240,0.04)",
                          color:
                            evt.tag === "Meeting" ? "#64b4ff" : "#888",
                        }}
                      >
                        {evt.tag}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Clients */}
              {active.has("clients") && (
                <div
                  key="clients"
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    background: "rgba(245,245,240,0.02)",
                    border: "1px solid rgba(245,245,240,0.06)",
                    marginBottom: "1rem",
                    animation: "dpFadeIn 0.35s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        fontSize: "0.6rem",
                        color: "#666",
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      Clients
                    </div>
                    <span
                      style={{
                        padding: "0.3rem 0.7rem",
                        background: "rgba(200,255,0,0.08)",
                        border: "1px solid rgba(200,255,0,0.15)",
                        borderRadius: "8px",
                        color: "#c8ff00",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      + Add Client
                    </span>
                  </div>
                  {[
                    { name: "Acme Corp", status: "Active", revenue: "$12.4K" },
                    { name: "Peak Design", status: "Active", revenue: "$8.7K" },
                    { name: "Bloom Studio", status: "Onboarding", revenue: "$3.2K" },
                    { name: "Vantage Media", status: "Active", revenue: "$6.1K" },
                  ].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.5rem 0",
                        borderBottom:
                          i < 3
                            ? "1px solid rgba(245,245,240,0.04)"
                            : "none",
                        fontSize: "0.75rem",
                        animation: `dpRowSlide 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`,
                      }}
                    >
                      <span style={{ color: "#ccc", flex: 1 }}>{c.name}</span>
                      <span
                        style={{
                          fontSize: "0.55rem",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "100px",
                          fontFamily: "'Space Mono', monospace",
                          marginRight: "0.75rem",
                          background:
                            c.status === "Active"
                              ? "rgba(200,255,0,0.08)"
                              : "rgba(255,200,0,0.08)",
                          color:
                            c.status === "Active" ? "#c8ff00" : "#ffc800",
                        }}
                      >
                        {c.status}
                      </span>
                      <span
                        style={{
                          color: "#f5f5f0",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                        }}
                      >
                        {c.revenue}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Link to full demos */}
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            padding: "1.25rem 2rem",
            background: "rgba(200,255,0,0.04)",
            border: "1px solid rgba(200,255,0,0.12)",
            borderRadius: "12px",
            maxWidth: "540px",
            margin: "2rem auto 0",
          }}
        >
          <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#f5f5f0", marginBottom: "0.5rem" }}>
            See full dashboards built for real industries
          </p>
          <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: "1rem" }}>
            Staffing, restaurant, HVAC, production, ecommerce, and more — explore live demos.
          </p>
          <a
            href="/demo"
            style={{
              display: "inline-block",
              padding: "0.65rem 2rem",
              background: "#c8ff00",
              color: "#0a0a0a",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            Explore All Demos →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes dpFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dpMetricIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dpBarGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes dpRowSlide {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes dpStagger {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .dp-sidebar { display: none !important; }
          .dp-metric-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dp-toggles { gap: 0.35rem !important; }
          .dp-toggles button { font-size: 0.6rem !important; padding: 0.45rem 0.8rem !important; }
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
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
  margin: "0 auto",
  textAlign: "center",
};

const subStyle: React.CSSProperties = {
  fontSize: "clamp(1rem, 2vw, 1.2rem)",
  fontWeight: 300,
  color: "#888",
  marginTop: "1rem",
  lineHeight: 1.7,
  textAlign: "center",
};
