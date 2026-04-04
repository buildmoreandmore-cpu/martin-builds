"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

/* ══════════════════════════════════════════════
   Industry Definitions
   ══════════════════════════════════════════════ */

type IndustryKey = "staffing" | "restaurant" | "realestate" | "cpg" | "consulting" | "cpa";

interface IndustryConfig {
  label: string;
  sidebar: string[];
  greeting: string;
  pages: Record<string, React.ReactNode>;
}

/* ── Staffing ── */
const staffingConfig: IndustryConfig = {
  label: "Staffing",
  sidebar: ["Dashboard", "Candidates", "Screenings", "Placements", "Clients"],
  greeting: "Good morning, Jessica",
  pages: {
    Dashboard: <StaffingDashboard />,
    Candidates: <StaffingCandidates />,
    Screenings: <StaffingScreenings />,
    Placements: <StaffingPlacements />,
    Clients: <StaffingClients />,
  },
};

/* ── Restaurant ── */
const restaurantConfig: IndustryConfig = {
  label: "Restaurant",
  sidebar: ["Dashboard", "COGS", "Receipts", "Menu Pricing", "Projections"],
  greeting: "Good morning, Chef",
  pages: {
    Dashboard: <RestaurantDashboard />,
    COGS: <RestaurantCOGS />,
    Receipts: <RestaurantReceipts />,
    "Menu Pricing": <RestaurantMenu />,
    Projections: <RestaurantProjections />,
  },
};

/* ── Real Estate ── */
const realEstateConfig: IndustryConfig = {
  label: "Real Estate",
  sidebar: ["Dashboard", "Properties", "Deal Analyzer", "Scope Builder", "Photos"],
  greeting: "Good morning, Marcus",
  pages: {
    Dashboard: <RealEstateDashboard />,
    Properties: <RealEstateProperties />,
    "Deal Analyzer": <RealEstateDealAnalyzer />,
    "Scope Builder": <RealEstateScopeBuilder />,
    Photos: <RealEstatePhotos />,
  },
};

/* ── E-Commerce ── */
const cpgConfig: IndustryConfig = {
  label: "E-Commerce",
  sidebar: ["Dashboard", "Leads", "Orders", "Projections", "Territories"],
  greeting: "Good morning, Dana",
  pages: {
    Dashboard: <CPGDashboard />,
    Leads: <CPGLeads />,
    Orders: <CPGOrders />,
    Projections: <CPGProjections />,
    Territories: <CPGTerritories />,
  },
};

/* ── Consulting ── */
const consultingConfig: IndustryConfig = {
  label: "Consulting",
  sidebar: ["Dashboard", "Engagements", "Proposals", "Time Tracking", "Billing"],
  greeting: "Good morning, Alex",
  pages: {
    Dashboard: <ConsultingDashboard />,
    Engagements: <ConsultingEngagements />,
    Proposals: <ConsultingProposals />,
    "Time Tracking": <ConsultingTimeTracking />,
    Billing: <ConsultingBilling />,
  },
};

/* ── CPA / Tax ── */
const cpaConfig: IndustryConfig = {
  label: "CPA",
  sidebar: ["Dashboard", "Clients", "Tax Returns", "Documents", "Billing"],
  greeting: "Good morning, Rachel",
  pages: {
    Dashboard: <CPADashboard />,
    Clients: <CPAClients />,
    "Tax Returns": <CPATaxReturns />,
    Documents: <CPADocuments />,
    Billing: <CPABilling />,
  },
};

const industries: Record<IndustryKey, IndustryConfig> = {
  staffing: staffingConfig,
  restaurant: restaurantConfig,
  realestate: realEstateConfig,
  cpg: cpgConfig,
  consulting: consultingConfig,
  cpa: cpaConfig,
};

const industryOrder: IndustryKey[] = ["staffing", "restaurant", "realestate", "cpg", "consulting", "cpa"];

/* ══════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════ */

export default function DashboardsContent({ embedded = false }: { embedded?: boolean }) {
  const [activeIndustry, setActiveIndustry] = useState<IndustryKey>("staffing");
  const [activePage, setActivePage] = useState("Dashboard");
  const [animKey, setAnimKey] = useState(0);

  const config = industries[activeIndustry];

  const switchIndustry = (key: IndustryKey) => {
    setActiveIndustry(key);
    setActivePage("Dashboard");
    setAnimKey(k => k + 1);
  };

  const switchPage = (page: string) => {
    setActivePage(page);
    setAnimKey(k => k + 1);
  };

  return (
    <main>
      {/* Hero — hidden when embedded on homepage */}
      {!embedded && <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(8rem,12vw,10rem) clamp(1.25rem,5vw,3rem) clamp(4rem,6vw,5rem)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "50vw",
            height: "50vw",
            background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2rem" }}>
          Custom Dashboards
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-3px",
            maxWidth: "800px",
          }}
        >
          Built for how you
          <br />
          <span style={{ color: "#c8ff00" }}>actually work.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
            fontWeight: 300,
            color: "#888",
            maxWidth: "550px",
            marginTop: "2rem",
            lineHeight: 1.7,
          }}
        >
          Every dashboard is scoped to your industry, your workflow, your team. Click through live demos below.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <a
            href="/discovery-call"
            style={primaryBtnStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Book a Free Discovery Call
          </a>
        </div>
      </section>}

      {/* Industry Dashboards */}
      <section
        style={{
          padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,5vw,3rem)",
          background: "#0a0a0a",
          borderTop: "1px solid rgba(200,255,0,0.08)",
        }}
      >
        <ScrollReveal>
          <p style={tagStyle}>Interactive Demos</p>
          <h2 style={titleStyle}>
            Pick your industry.
            <br />
            <span style={{ color: "#c8ff00" }}>Explore the dashboard.</span>
          </h2>
          <p style={subStyle}>Click through real dashboard layouts built for each vertical.</p>
        </ScrollReveal>

        {/* Industry tabs */}
        <ScrollReveal>
          <div className="industry-tabs" style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "3rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {industryOrder.map((key) => (
              <button
                key={key}
                onClick={() => switchIndustry(key)}
                style={{
                  padding: "0.6rem 1.4rem",
                  borderRadius: "100px",
                  border: "1px solid",
                  borderColor: activeIndustry === key ? "rgba(200,255,0,0.3)" : "rgba(245,245,240,0.1)",
                  background: activeIndustry === key ? "rgba(200,255,0,0.08)" : "transparent",
                  color: activeIndustry === key ? "#c8ff00" : "#888",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: activeIndustry === key ? "scale(1.05)" : "scale(1)",
                }}
              >
                {industries[key].label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Dashboard mock */}
        <div className="dash-demo-desktop" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            key={activeIndustry}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(200,255,0,0.12)",
              background: "#1a1a1a",
              display: "flex",
              minHeight: "500px",
              animation: "dashSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Sidebar */}
            <div
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
                {config.label}
              </div>
              {config.sidebar.map((item, i) => {
                const isActive = item === activePage;
                return (
                  <div
                    key={item}
                    onClick={() => switchPage(item)}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.75rem",
                      color: isActive ? "#c8ff00" : "#888",
                      fontWeight: isActive ? 600 : 400,
                      background: isActive ? "rgba(200,255,0,0.06)" : "transparent",
                      borderRadius: "6px",
                      margin: "0 0.5rem 0.15rem",
                      cursor: "pointer",
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      animation: `dashStaggerItem 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms both`,
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLDivElement).style.background = "rgba(200,255,0,0.03)";
                        (e.currentTarget as HTMLDivElement).style.color = "#ccc";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateX(3px)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLDivElement).style.background = "transparent";
                        (e.currentTarget as HTMLDivElement).style.color = "#888";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
                      }
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            {/* Main content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
                <div
                  key={`${activeIndustry}-${activePage}`}
                  style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f5f5f0", animation: "dashFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  {activePage === "Dashboard" ? config.greeting : activePage}
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
                <div key={`${activeIndustry}-${activePage}-${animKey}`} style={{ animation: "dashContentIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  {config.pages[activePage]}
                </div>
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.75rem", color: "#555", fontFamily: "'Space Mono', monospace" }}>
            Click the sidebar to explore →
          </p>
        </div>

        {/* Mobile: stacked cards */}
        <div className="dash-demo-mobile" style={{ display: "none", maxWidth: "400px", margin: "0 auto" }}>
          <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid rgba(200,255,0,0.12)", padding: "1.25rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#c8ff00", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Space Mono', monospace", marginBottom: "1rem" }}>
              {config.label}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#f5f5f0", fontWeight: 600, marginBottom: "1rem" }}>{config.greeting}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
              {config.sidebar.map((item) => (
                <span key={item} style={{ fontSize: "0.6rem", color: "#888", padding: "0.3rem 0.6rem", background: "rgba(245,245,240,0.03)", borderRadius: "6px", border: "1px solid rgba(245,245,240,0.06)" }}>{item}</span>
              ))}
            </div>
            <div style={{ padding: "1rem", background: "rgba(200,255,0,0.04)", borderRadius: "10px", border: "1px solid rgba(200,255,0,0.15)" }}>
              <div style={{ fontSize: "0.6rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>Preview</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#c8ff00" }}>Live Demo</div>
              <div style={{ fontSize: "0.65rem", color: "#888", marginTop: "0.2rem" }}>View on desktop for full interactive experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA — hidden when embedded */}
      {!embedded && <section
        style={{
          padding: "clamp(5rem,10vw,8rem) clamp(1.25rem,5vw,3rem)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vw",
            background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <ScrollReveal>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Your dashboard is next.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <a
            href="/discovery-call"
            style={primaryBtnStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Start a Project
          </a>
        </ScrollReveal>
      </section>}

      <style>{`
        @keyframes dashFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dashSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dashContentIn {
          from { opacity: 0; transform: translateY(8px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dashStaggerItem {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes dashMetricIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dashBarGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes dashRowSlide {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes dashPulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,255,0,0); }
          50% { box-shadow: 0 0 12px 2px rgba(200,255,0,0.08); }
        }
        @keyframes dashStatusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @media (max-width: 768px) {
          .dash-demo-desktop { display: none !important; }
          .dash-demo-mobile { display: block !important; }
        }
      `}</style>
    </main>
  );
}

/* ══════════════════════════════════════════════
   STAFFING PAGES
   ══════════════════════════════════════════════ */

function StaffingDashboard() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Pipeline", value: "34", sub: "candidates", accent: true },
        { label: "Open Roles", value: "12", sub: "across 6 clients" },
        { label: "Placements MTD", value: "8", sub: "↑ 3 vs last month" },
        { label: "Billings", value: "$86K", sub: "this month" },
      ]} />
      <ChartWidget title="Placements by Week" heights={[35, 48, 62, 45, 70, 58, 82]} labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]} />
      <ActivityWidget items={[
        "Background check cleared — Tamika R.",
        "New candidate submitted — Senior Dev role",
        "Placement confirmed — $14K billing",
      ]} />
    </>
  );
}

function StaffingCandidates() {
  const candidates = [
    { name: "Tamika Robinson", role: "Senior Developer", status: "Screening", stage: "Background Check" },
    { name: "Derek Chen", role: "Project Manager", status: "Submitted", stage: "Client Review" },
    { name: "Aisha Williams", role: "Data Analyst", status: "Interview", stage: "2nd Round" },
    { name: "James Torres", role: "DevOps Engineer", status: "Offer", stage: "Pending Accept" },
    { name: "Maria Santos", role: "UX Designer", status: "Onboarding", stage: "Day 1 — Apr 7" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>34 Candidates in Pipeline</div>
        <MockButton label="+ Add Candidate" />
      </div>
      <TableView
        headers={["Name", "Role", "Status", "Stage"]}
        rows={candidates.map(c => [
          c.name,
          <span key="r" style={{ color: "#888", fontSize: "0.75rem" }}>{c.role}</span>,
          <StatusBadge key="s" status={c.status} />,
          <span key="st" style={{ color: "#888", fontSize: "0.7rem" }}>{c.stage}</span>,
        ])}
      />
    </>
  );
}

function StaffingScreenings() {
  const screenings = [
    { name: "Tamika Robinson", type: "Background Check", status: "In Progress", eta: "2 days" },
    { name: "Derek Chen", type: "Credential Verification", status: "Complete", eta: "—" },
    { name: "James Torres", type: "Drug Screen", status: "Pending", eta: "5 days" },
    { name: "Aisha Williams", type: "Background Check", status: "Complete", eta: "—" },
  ];
  return (
    <>
      <MetricGrid metrics={[
        { label: "In Progress", value: "6", sub: "screenings" },
        { label: "Completed Today", value: "3", sub: "100% pass rate" },
        { label: "Avg Turnaround", value: "2.1d", sub: "↓ from 3.4d", accent: true },
      ]} cols={3} />
      <TableView
        headers={["Candidate", "Type", "Status", "ETA"]}
        rows={screenings.map(s => [
          s.name,
          <span key="t" style={{ color: "#888", fontSize: "0.75rem" }}>{s.type}</span>,
          <StatusBadge key="s" status={s.status} />,
          <span key="e" style={{ color: "#888", fontSize: "0.7rem" }}>{s.eta}</span>,
        ])}
      />
    </>
  );
}

function StaffingPlacements() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Placements MTD", value: "8", sub: "↑ 60% vs last month", accent: true },
        { label: "Avg Time to Fill", value: "18d", sub: "↓ 4 days" },
        { label: "Retention Rate", value: "94%", sub: "90-day" },
      ]} cols={3} />
      <ChartWidget title="Placements by Month" heights={[40, 55, 48, 62, 70, 82]} labels={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]} />
    </>
  );
}

function StaffingClients() {
  const clients = [
    { name: "TechCorp Inc.", openRoles: 4, placements: 12, status: "Active" },
    { name: "Meridian Health", openRoles: 3, placements: 8, status: "Active" },
    { name: "Urban Logistics", openRoles: 2, placements: 5, status: "Active" },
    { name: "Apex Financial", openRoles: 0, placements: 15, status: "Paused" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>6 Active Clients</div>
        <MockButton label="+ Add Client" />
      </div>
      <TableView
        headers={["Company", "Open Roles", "Total Placed", "Status"]}
        rows={clients.map(c => [
          c.name,
          <span key="o" style={{ color: "#f5f5f0" }}>{c.openRoles}</span>,
          <span key="p" style={{ color: "#888" }}>{c.placements}</span>,
          <StatusBadge key="s" status={c.status} />,
        ])}
      />
    </>
  );
}

/* ══════════════════════════════════════════════
   RESTAURANT PAGES
   ══════════════════════════════════════════════ */

function RestaurantDashboard() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Revenue Today", value: "$8.4K", sub: "142 orders", accent: true },
        { label: "COGS", value: "28.4%", sub: "target: 30%" },
        { label: "Avg Ticket", value: "$59", sub: "↑ 8% vs last week" },
        { label: "Google Rating", value: "4.8★", sub: "312 reviews" },
      ]} />
      <ChartWidget title="Daily Revenue (7 days)" heights={[62, 71, 55, 68, 82, 74, 90]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} />
      <ActivityWidget items={[
        "Receipt captured — US Foods $2,840",
        "Menu price updated — Grilled Salmon → $34",
        "COGS alert: produce costs ↑ 6%",
      ]} />
    </>
  );
}

function RestaurantCOGS() {
  const categories = [
    { name: "Proteins", cost: "$4,200", pct: "32%", trend: "↑ 2%" },
    { name: "Produce", cost: "$1,800", pct: "14%", trend: "↑ 6%" },
    { name: "Dairy", cost: "$920", pct: "7%", trend: "↓ 1%" },
    { name: "Dry Goods", cost: "$680", pct: "5%", trend: "—" },
    { name: "Beverages", cost: "$1,100", pct: "8%", trend: "↓ 3%" },
  ];
  return (
    <>
      <MetricGrid metrics={[
        { label: "Total COGS", value: "$8.7K", sub: "this week", accent: true },
        { label: "COGS %", value: "28.4%", sub: "target: 30%" },
        { label: "Waste", value: "$340", sub: "↓ 12% vs last week" },
      ]} cols={3} />
      <TableView
        headers={["Category", "Cost", "% of Revenue", "Trend"]}
        rows={categories.map(c => [
          c.name,
          <span key="c" style={{ color: "#f5f5f0", fontWeight: 600 }}>{c.cost}</span>,
          <span key="p" style={{ color: "#888" }}>{c.pct}</span>,
          <span key="t" style={{ color: c.trend.includes("↑") ? "#ff6b6b" : c.trend.includes("↓") ? "#c8ff00" : "#888", fontSize: "0.75rem", fontFamily: "'Space Mono', monospace" }}>{c.trend}</span>,
        ])}
      />
    </>
  );
}

function RestaurantReceipts() {
  const receipts = [
    { vendor: "US Foods", amount: "$2,840", date: "Today", status: "Captured" },
    { vendor: "Sysco", amount: "$1,620", date: "Yesterday", status: "Captured" },
    { vendor: "Local Farm Co-op", amount: "$480", date: "Apr 1", status: "Pending" },
    { vendor: "Restaurant Depot", amount: "$920", date: "Mar 30", status: "Captured" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>Receipt Capture</div>
        <MockButton label="+ Scan Receipt" />
      </div>
      <div
        style={{
          padding: "1.5rem",
          border: "2px dashed rgba(245,245,240,0.1)",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "1.25rem",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.4rem" }}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p style={{ fontSize: "0.75rem", color: "#888", margin: 0 }}>Snap a photo of any receipt to auto-capture line items</p>
      </div>
      <TableView
        headers={["Vendor", "Amount", "Date", "Status"]}
        rows={receipts.map(r => [
          r.vendor,
          <span key="a" style={{ color: "#f5f5f0", fontWeight: 600 }}>{r.amount}</span>,
          <span key="d" style={{ color: "#888" }}>{r.date}</span>,
          <StatusBadge key="s" status={r.status} />,
        ])}
      />
    </>
  );
}

function RestaurantMenu() {
  const items = [
    { name: "Grilled Salmon", cost: "$8.20", price: "$34", margin: "76%", flag: false },
    { name: "Ribeye Steak", cost: "$14.50", price: "$48", margin: "70%", flag: false },
    { name: "Caesar Salad", cost: "$2.80", price: "$16", margin: "82%", flag: false },
    { name: "Lobster Pasta", cost: "$16.40", price: "$38", margin: "57%", flag: true },
    { name: "Truffle Fries", cost: "$4.20", price: "$14", margin: "70%", flag: false },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>Menu Pricing & Margins</div>
        <MockButton label="+ Add Item" />
      </div>
      <TableView
        headers={["Item", "Cost", "Price", "Margin"]}
        rows={items.map(item => [
          <span key="n" style={{ color: "#f5f5f0", fontWeight: 500 }}>
            {item.name}
            {item.flag && <span style={{ marginLeft: "0.5rem", fontSize: "0.55rem", padding: "0.15rem 0.4rem", background: "rgba(255,107,107,0.1)", color: "#ff6b6b", borderRadius: "4px", fontFamily: "'Space Mono', monospace" }}>LOW MARGIN</span>}
          </span>,
          <span key="c" style={{ color: "#888" }}>{item.cost}</span>,
          <span key="p" style={{ color: "#f5f5f0" }}>{item.price}</span>,
          <span key="m" style={{ color: parseInt(item.margin) < 65 ? "#ff6b6b" : "#c8ff00", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}>{item.margin}</span>,
        ])}
      />
    </>
  );
}

function RestaurantProjections() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Projected Monthly", value: "$252K", sub: "at current pace", accent: true },
        { label: "Projected COGS", value: "$71K", sub: "28.2% of revenue" },
        { label: "Net Margin", value: "$38K", sub: "15.1%" },
      ]} cols={3} />
      <ChartWidget title="Revenue Projection (6 months)" heights={[48, 55, 62, 68, 74, 82]} labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep"]} />
      <div style={{ padding: "1rem 1.25rem", background: "rgba(200,255,0,0.04)", borderRadius: "12px", border: "1px solid rgba(200,255,0,0.15)", marginTop: "0.5rem" }}>
        <div style={{ fontSize: "0.7rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", marginBottom: "0.3rem" }}>RECOMMENDATION</div>
        <p style={{ fontSize: "0.8rem", color: "#888", margin: 0, lineHeight: 1.6 }}>
          Lobster Pasta margin is 13pts below target. Consider raising price to $42 or renegotiating supplier cost.
        </p>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   REAL ESTATE PAGES
   ══════════════════════════════════════════════ */

function RealEstateDashboard() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Active Leads", value: "18", sub: "6 new this week", accent: true },
        { label: "Showings", value: "6", sub: "this week" },
        { label: "Under Contract", value: "3", sub: "total $1.2M" },
        { label: "Pipeline", value: "$3.8M", sub: "12 properties" },
      ]} />
      <ChartWidget title="Lead Funnel" heights={[100, 72, 45, 28, 18]} labels={["Leads", "Qualified", "Showing", "Offer", "Close"]} />
      <ActivityWidget items={[
        "New lead — 742 Maple Dr, $285K",
        "Photos uploaded — 1820 Peachtree St",
        "Deal snapshot generated — 445 Oak Ave",
      ]} />
    </>
  );
}

function RealEstateProperties() {
  const properties = [
    { address: "742 Maple Dr", price: "$285,000", status: "Lead", beds: "3/2" },
    { address: "1820 Peachtree St", price: "$425,000", status: "Showing", beds: "4/3" },
    { address: "445 Oak Ave", price: "$198,000", status: "Under Contract", beds: "2/1" },
    { address: "910 Birch Ln", price: "$340,000", status: "Lead", beds: "3/2.5" },
    { address: "2105 Elm Ct", price: "$520,000", status: "Closed", beds: "5/3" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>12 Active Properties</div>
        <MockButton label="+ Add Property" />
      </div>
      <TableView
        headers={["Address", "Price", "Beds/Bath", "Status"]}
        rows={properties.map(p => [
          p.address,
          <span key="p" style={{ color: "#f5f5f0", fontWeight: 600 }}>{p.price}</span>,
          <span key="b" style={{ color: "#888" }}>{p.beds}</span>,
          <StatusBadge key="s" status={p.status} />,
        ])}
      />
    </>
  );
}

function RealEstateDealAnalyzer() {
  return (
    <>
      <div style={labelStyle}>Deal Snapshot — 445 Oak Ave</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem", marginBottom: "1.25rem" }}>
        {[
          { label: "Purchase Price", value: "$198,000" },
          { label: "ARV", value: "$265,000" },
          { label: "Rehab Estimate", value: "$32,000" },
          { label: "Projected Profit", value: "$28,400" },
          { label: "ROI", value: "14.3%" },
          { label: "Hold Time", value: "4 months" },
        ].map((m, i) => (
          <div key={m.label} style={{ padding: "1rem", background: "rgba(245,245,240,0.02)", borderRadius: "10px", border: "1px solid rgba(245,245,240,0.06)", animation: `dashMetricIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms both` }}>
            <div style={{ fontSize: "0.6rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.3rem" }}>{m.label}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: m.label === "Projected Profit" || m.label === "ROI" ? "#c8ff00" : "#f5f5f0" }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "1rem 1.25rem", background: "rgba(200,255,0,0.04)", borderRadius: "12px", border: "1px solid rgba(200,255,0,0.15)", animation: "dashMetricIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}>
        <div style={{ fontSize: "0.7rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", marginBottom: "0.3rem" }}>DEAL SCORE</div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#c8ff00" }}>B+</div>
          <p style={{ fontSize: "0.75rem", color: "#888", margin: 0, lineHeight: 1.5 }}>
            Solid margins with moderate rehab. ARV is conservative — upside possible with kitchen remodel.
          </p>
        </div>
      </div>
    </>
  );
}

function RealEstateScopeBuilder() {
  const items = [
    { task: "Kitchen Remodel", cost: "$12,000", status: "Quoted" },
    { task: "Bathroom — Master", cost: "$6,500", status: "Pending" },
    { task: "Flooring — LVP Throughout", cost: "$4,800", status: "Quoted" },
    { task: "Exterior Paint", cost: "$3,200", status: "Scheduled" },
    { task: "HVAC Replacement", cost: "$5,500", status: "Quoted" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>Scope of Work — 445 Oak Ave</div>
        <MockButton label="+ Add Item" />
      </div>
      <MetricGrid metrics={[
        { label: "Total Budget", value: "$32K", sub: "5 line items" },
        { label: "Quoted", value: "$28.8K", sub: "4 items" },
        { label: "Remaining", value: "$3.2K", sub: "1 pending", accent: true },
      ]} cols={3} />
      <TableView
        headers={["Task", "Cost", "Status"]}
        rows={items.map(item => [
          item.task,
          <span key="c" style={{ color: "#f5f5f0", fontWeight: 600 }}>{item.cost}</span>,
          <StatusBadge key="s" status={item.status} />,
        ])}
      />
    </>
  );
}

function RealEstatePhotos() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>Property Photos</div>
        <MockButton label="+ Upload Photos" />
      </div>
      <div
        style={{
          padding: "2rem",
          border: "2px dashed rgba(245,245,240,0.1)",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "1.25rem",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.5rem" }}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p style={{ fontSize: "0.8rem", color: "#888", margin: 0 }}>Drag photos or tap to capture from phone</p>
        <p style={{ fontSize: "0.65rem", color: "#555", margin: "0.25rem 0 0" }}>Auto-tagged by room • Before/after tracking</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
        {["Kitchen", "Living Room", "Master Bath", "Exterior — Front", "Exterior — Back", "Backyard"].map((room, i) => (
          <div
            key={room}
            style={{
              padding: "1.5rem 1rem",
              background: "rgba(245,245,240,0.02)",
              border: "1px solid rgba(245,245,240,0.06)",
              borderRadius: "10px",
              textAlign: "center",
              animation: `dashMetricIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms both`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.4rem" }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <div style={{ fontSize: "0.65rem", color: "#888" }}>{room}</div>
            <div style={{ fontSize: "0.55rem", color: "#555", marginTop: "0.2rem" }}>4 photos</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   E-COMMERCE PAGES
   ══════════════════════════════════════════════ */

function CPGDashboard() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Active Accounts", value: "48", sub: "across 3 territories", accent: true },
        { label: "Orders This Week", value: "12", sub: "↑ 4 vs last week" },
        { label: "Revenue MTD", value: "$34K", sub: "target: $45K" },
        { label: "Restock Alerts", value: "3", sub: "action needed" },
      ]} />
      <ChartWidget title="Weekly Sales" heights={[45, 58, 42, 65, 55, 72, 80]} labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]} />
      <ActivityWidget items={[
        "New order — Fresh Market, 24 units",
        "Restock alert — Whole Foods, SKU #4420",
        "Lead converted — Green Valley Co-op",
      ]} />
    </>
  );
}

function CPGLeads() {
  const leads = [
    { name: "Green Valley Co-op", contact: "Sarah Mitchell", status: "Qualified", value: "$8,400" },
    { name: "Metro Fresh Markets", contact: "David Kim", status: "Outreach", value: "$12,000" },
    { name: "Sunrise Grocers", contact: "Ana Rodriguez", status: "Meeting", value: "$6,200" },
    { name: "Peak Performance Nutrition", contact: "Tyler Brooks", status: "Proposal", value: "$15,800" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>Sales Pipeline</div>
        <MockButton label="+ Add Lead" />
      </div>
      <TableView
        headers={["Account", "Contact", "Status", "Est. Value"]}
        rows={leads.map(l => [
          l.name,
          <span key="c" style={{ color: "#888" }}>{l.contact}</span>,
          <StatusBadge key="s" status={l.status} />,
          <span key="v" style={{ color: "#f5f5f0", fontWeight: 600 }}>{l.value}</span>,
        ])}
      />
    </>
  );
}

function CPGOrders() {
  const orders = [
    { account: "Fresh Market", items: "24 units", total: "$1,440", date: "Today", status: "Shipped" },
    { account: "Whole Foods — Midtown", items: "48 units", total: "$2,880", date: "Yesterday", status: "Processing" },
    { account: "Sprouts — Buckhead", items: "36 units", total: "$2,160", date: "Apr 1", status: "Delivered" },
    { account: "Trader Joe's — Decatur", items: "60 units", total: "$3,600", date: "Mar 30", status: "Delivered" },
  ];
  return (
    <>
      <MetricGrid metrics={[
        { label: "Orders This Week", value: "12", sub: "168 total units" },
        { label: "Revenue", value: "$10.1K", sub: "this week", accent: true },
        { label: "Avg Order", value: "$840", sub: "↑ 12%" },
      ]} cols={3} />
      <TableView
        headers={["Account", "Items", "Total", "Status"]}
        rows={orders.map(o => [
          o.account,
          <span key="i" style={{ color: "#888" }}>{o.items}</span>,
          <span key="t" style={{ color: "#f5f5f0", fontWeight: 600 }}>{o.total}</span>,
          <StatusBadge key="s" status={o.status} />,
        ])}
      />
    </>
  );
}

function CPGProjections() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Projected Q2", value: "$142K", sub: "at current pace", accent: true },
        { label: "YoY Growth", value: "+34%", sub: "vs Q2 last year" },
        { label: "Avg Account Value", value: "$2.8K", sub: "per month" },
      ]} cols={3} />
      <ChartWidget title="Revenue Forecast (6 months)" heights={[42, 50, 58, 65, 72, 82]} labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep"]} />
      <div style={{ padding: "1rem 1.25rem", background: "rgba(200,255,0,0.04)", borderRadius: "12px", border: "1px solid rgba(200,255,0,0.15)", marginTop: "0.5rem" }}>
        <div style={{ fontSize: "0.7rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", marginBottom: "0.3rem" }}>GROWTH OPPORTUNITY</div>
        <p style={{ fontSize: "0.8rem", color: "#888", margin: 0, lineHeight: 1.6 }}>
          3 accounts are ready for reorder expansion. Increasing SKU variety at Fresh Market alone could add $4K/mo.
        </p>
      </div>
    </>
  );
}

function CPGTerritories() {
  const territories = [
    { name: "Atlanta Metro", accounts: 22, revenue: "$16.2K", growth: "+18%" },
    { name: "North Georgia", accounts: 14, revenue: "$10.4K", growth: "+24%" },
    { name: "Coastal / Savannah", accounts: 12, revenue: "$7.4K", growth: "+42%" },
  ];
  return (
    <>
      <div style={labelStyle}>Territory Performance</div>
      <div style={{ marginTop: "1rem" }}>
        {territories.map((t, i) => (
          <div
            key={t.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 1.25rem",
              background: "rgba(245,245,240,0.02)",
              borderRadius: i === 0 ? "12px 12px 0 0" : i === territories.length - 1 ? "0 0 12px 12px" : "0",
              border: "1px solid rgba(245,245,240,0.06)",
              borderTop: i > 0 ? "none" : undefined,
              animation: `dashRowSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both`,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.85rem", color: "#f5f5f0", fontWeight: 600 }}>{t.name}</div>
              <div style={{ fontSize: "0.7rem", color: "#888", marginTop: "0.2rem" }}>{t.accounts} accounts</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.9rem", color: "#f5f5f0", fontWeight: 600 }}>{t.revenue}</div>
              <div style={{ fontSize: "0.7rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace" }}>{t.growth}</div>
            </div>
          </div>
        ))}
      </div>
      <ChartWidget title="Territory Comparison" heights={[82, 65, 48]} labels={["ATL Metro", "N. Georgia", "Coastal"]} />
    </>
  );
}

/* ══════════════════════════════════════════════
   CONSULTING PAGES
   ══════════════════════════════════════════════ */

function ConsultingDashboard() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Active Engagements", value: "6", sub: "across 4 clients", accent: true },
        { label: "Billable Hours", value: "142", sub: "this month" },
        { label: "Revenue MTD", value: "$62K", sub: "target: $75K" },
        { label: "Utilization", value: "84%", sub: "↑ 6% vs last month" },
      ]} />
      <ChartWidget title="Weekly Billable Hours" heights={[32, 38, 42, 35, 44, 40, 48]} labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]} />
      <ActivityWidget items={[
        "Proposal accepted — Meridian Health, $45K",
        "Time entry — Strategy workshop, 6h",
        "Invoice sent — TechCorp Inc., $18,400",
      ]} />
    </>
  );
}

function ConsultingEngagements() {
  const engagements = [
    { client: "TechCorp Inc.", project: "Digital Transformation", status: "Active", value: "$45,000" },
    { client: "Meridian Health", project: "Process Optimization", status: "Active", value: "$32,000" },
    { client: "Urban Logistics", project: "Supply Chain Audit", status: "Wrap-up", value: "$28,000" },
    { client: "Apex Financial", project: "Risk Framework", status: "Proposal", value: "$55,000" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>Active Engagements</div>
        <MockButton label="+ New Engagement" />
      </div>
      <TableView
        headers={["Client", "Project", "Status", "Value"]}
        rows={engagements.map(e => [
          e.client,
          <span key="p" style={{ color: "#888" }}>{e.project}</span>,
          <StatusBadge key="s" status={e.status} />,
          <span key="v" style={{ color: "#f5f5f0", fontWeight: 600 }}>{e.value}</span>,
        ])}
      />
    </>
  );
}

function ConsultingProposals() {
  const proposals = [
    { client: "Apex Financial", title: "Risk Framework Build", value: "$55,000", status: "Sent", sent: "Mar 28" },
    { client: "Nova Retail", title: "Customer Journey Mapping", value: "$22,000", status: "Draft", sent: "—" },
    { client: "Meridian Health", title: "Phase 2 — Implementation", value: "$48,000", status: "Won", sent: "Mar 15" },
  ];
  return (
    <>
      <MetricGrid metrics={[
        { label: "Open Proposals", value: "2", sub: "$77K total" },
        { label: "Win Rate", value: "72%", sub: "last 6 months", accent: true },
        { label: "Avg Deal Size", value: "$38K", sub: "↑ 14% vs last quarter" },
      ]} cols={3} />
      <TableView
        headers={["Client", "Proposal", "Value", "Status"]}
        rows={proposals.map(p => [
          p.client,
          <span key="t" style={{ color: "#888" }}>{p.title}</span>,
          <span key="v" style={{ color: "#f5f5f0", fontWeight: 600 }}>{p.value}</span>,
          <StatusBadge key="s" status={p.status} />,
        ])}
      />
    </>
  );
}

function ConsultingTimeTracking() {
  const entries = [
    { project: "TechCorp — Digital Trans.", task: "Strategy Workshop", hours: "6.0", date: "Today" },
    { project: "Meridian — Process Opt.", task: "Stakeholder Interviews", hours: "3.5", date: "Today" },
    { project: "Urban Logistics — SC Audit", task: "Final Report Drafting", hours: "4.0", date: "Yesterday" },
    { project: "TechCorp — Digital Trans.", task: "Implementation Planning", hours: "5.0", date: "Yesterday" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>Time Entries</div>
        <MockButton label="+ Log Time" />
      </div>
      <MetricGrid metrics={[
        { label: "Today", value: "9.5h", sub: "billable" },
        { label: "This Week", value: "38h", sub: "of 40h target", accent: true },
        { label: "Utilization", value: "84%", sub: "↑ 6%" },
      ]} cols={3} />
      <TableView
        headers={["Project", "Task", "Hours", "Date"]}
        rows={entries.map(e => [
          <span key="p" style={{ color: "#f5f5f0", fontSize: "0.75rem" }}>{e.project}</span>,
          <span key="t" style={{ color: "#888" }}>{e.task}</span>,
          <span key="h" style={{ color: "#c8ff00", fontFamily: "'Space Mono', monospace", fontWeight: 600 }}>{e.hours}</span>,
          <span key="d" style={{ color: "#888" }}>{e.date}</span>,
        ])}
      />
    </>
  );
}

function ConsultingBilling() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Invoiced MTD", value: "$62K", sub: "4 invoices", accent: true },
        { label: "Outstanding", value: "$18.4K", sub: "1 invoice, 12 days" },
        { label: "Collected YTD", value: "$284K", sub: "98% collection rate" },
      ]} cols={3} />
      <ChartWidget title="Monthly Billing (6 months)" heights={[52, 68, 58, 72, 64, 82]} labels={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
        {[
          { client: "TechCorp Inc.", amount: "$18,400", status: "Outstanding", due: "Apr 10" },
          { client: "Meridian Health", amount: "$16,000", status: "Paid", due: "Paid Mar 28" },
          { client: "Urban Logistics", amount: "$14,000", status: "Paid", due: "Paid Mar 15" },
        ].map((inv, i) => (
          <div key={inv.client} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", background: "rgba(245,245,240,0.02)", borderRadius: "10px", border: "1px solid rgba(245,245,240,0.06)", animation: `dashRowSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms both` }}>
            <div>
              <div style={{ fontSize: "0.8rem", color: "#f5f5f0", fontWeight: 500 }}>{inv.client}</div>
              <div style={{ fontSize: "0.65rem", color: "#555" }}>{inv.due}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.85rem", color: "#f5f5f0", fontWeight: 600 }}>{inv.amount}</div>
              <StatusBadge status={inv.status} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   CPA / TAX PAGES
   ══════════════════════════════════════════════ */

function CPADashboard() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Active Clients", value: "84", sub: "tax season", accent: true },
        { label: "Returns Filed", value: "52", sub: "62% complete" },
        { label: "Pending Review", value: "18", sub: "3 flagged" },
        { label: "Revenue MTD", value: "$124K", sub: "↑ 22% vs last year" },
      ]} />
      {/* Filing progress bar */}
      <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", padding: "1.25rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div style={{ fontSize: "0.7rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "'Space Mono', monospace" }}>Filing Progress — Tax Season 2026</div>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#c8ff00", fontFamily: "'Space Mono', monospace" }}>62%</div>
        </div>
        <div style={{ height: "8px", background: "rgba(245,245,240,0.06)", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ width: "62%", height: "100%", background: "linear-gradient(90deg, #c8ff00, #a0cc00)", borderRadius: "4px", animation: "dashBarGrow 0.6s cubic-bezier(0.16, 1, 0.3, 1)", transformOrigin: "left" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <span style={{ fontSize: "0.6rem", color: "#555" }}>52 filed</span>
          <span style={{ fontSize: "0.6rem", color: "#555" }}>14 in progress</span>
          <span style={{ fontSize: "0.6rem", color: "#555" }}>18 not started</span>
        </div>
      </div>
      <ActivityWidget items={[
        "Return filed — Johnson Family Trust",
        "W-2 uploaded — Marcus Chen via portal",
        "Refund status updated — Williams ($4,280)",
      ]} />
    </>
  );
}

function CPAClients() {
  const clients = [
    { name: "Johnson Family Trust", type: "Trust", status: "Filed", refund: "$8,420", portal: true },
    { name: "Marcus Chen", type: "Individual", status: "In Review", refund: "$3,180", portal: true },
    { name: "Apex Financial LLC", type: "Business", status: "In Progress", refund: "Owes $12,400", portal: true },
    { name: "Sarah & David Park", type: "Joint", status: "Docs Needed", refund: "—", portal: false },
    { name: "Williams Photography", type: "Sole Prop", status: "Filed", refund: "$4,280", portal: true },
    { name: "Rivera Holdings", type: "S-Corp", status: "Extension", refund: "TBD", portal: false },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>Client Directory — 84 Clients</div>
        <MockButton label="+ Add Client" />
      </div>
      {/* Client portal status indicator */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
        {[
          { label: "Portal Active", value: "68", color: "#c8ff00" },
          { label: "Pending Invite", value: "12", color: "#ffc800" },
          { label: "No Access", value: "4", color: "#888" },
        ].map((s, i) => (
          <div key={s.label} style={{ flex: 1, padding: "0.75rem", background: "rgba(245,245,240,0.02)", borderRadius: "10px", border: "1px solid rgba(245,245,240,0.06)", textAlign: "center", animation: `dashMetricIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms both` }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.55rem", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "0.5px", textTransform: "uppercase", marginTop: "0.2rem" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <TableView
        headers={["Client", "Type", "Status", "Refund / Owed"]}
        rows={clients.map(c => [
          <span key="n" style={{ color: "#f5f5f0", fontWeight: 500 }}>
            {c.name}
            {c.portal && <span style={{ marginLeft: "0.5rem", fontSize: "0.5rem", padding: "0.1rem 0.35rem", background: "rgba(200,255,0,0.06)", color: "#c8ff00", borderRadius: "3px", fontFamily: "'Space Mono', monospace", verticalAlign: "middle" }}>PORTAL</span>}
          </span>,
          <span key="t" style={{ color: "#888", fontSize: "0.75rem" }}>{c.type}</span>,
          <StatusBadge key="s" status={c.status} />,
          <span key="r" style={{ color: c.refund.startsWith("Owes") ? "#ff6b6b" : c.refund === "—" || c.refund === "TBD" ? "#888" : "#c8ff00", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem" }}>{c.refund}</span>,
        ])}
      />
    </>
  );
}

function CPATaxReturns() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Filed", value: "52", sub: "on time: 100%", accent: true },
        { label: "In Progress", value: "14", sub: "avg 3 days to complete" },
        { label: "Extensions", value: "6", sub: "deadline: Oct 15" },
        { label: "Amended", value: "2", sub: "processing" },
      ]} />
      {/* API sync status */}
      <div style={{ padding: "1rem 1.25rem", background: "rgba(200,255,0,0.04)", borderRadius: "12px", border: "1px solid rgba(200,255,0,0.15)", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c8ff00", animation: "dashStatusPulse 2s infinite" }} />
          <div>
            <div style={{ fontSize: "0.7rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", fontWeight: 600 }}>IRS E-FILE API CONNECTED</div>
            <div style={{ fontSize: "0.6rem", color: "#888", marginTop: "0.15rem" }}>Last sync: 12 minutes ago • All returns transmitted</div>
          </div>
        </div>
        <MockButton label="Sync Now" />
      </div>
      {/* Return status breakdown */}
      <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid rgba(245,245,240,0.06)" }}>
          <div style={{ fontSize: "0.6rem", color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase" }}>Recent Returns</div>
        </div>
        {[
          { client: "Johnson Family Trust", type: "1041", status: "Accepted", date: "Apr 2", refund: "$8,420" },
          { client: "Williams Photography", type: "1040-SE", status: "Accepted", date: "Apr 1", refund: "$4,280" },
          { client: "Marcus Chen", type: "1040", status: "Under Review", date: "Mar 30", refund: "$3,180" },
          { client: "Apex Financial LLC", type: "1120S", status: "Transmitted", date: "Mar 28", refund: "Owes $12,400" },
        ].map((r, i) => (
          <div key={r.client} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1.25rem", borderBottom: i < 3 ? "1px solid rgba(245,245,240,0.04)" : "none", animation: `dashRowSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms both` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.8rem", color: "#f5f5f0", fontWeight: 500 }}>{r.client}</div>
              <div style={{ fontSize: "0.6rem", color: "#555" }}>Form {r.type} • {r.date}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "0.75rem", color: r.refund.startsWith("Owes") ? "#ff6b6b" : "#c8ff00", fontFamily: "'Space Mono', monospace" }}>{r.refund}</span>
              <StatusBadge status={r.status} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CPADocuments() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={labelStyle}>Client Document Portal</div>
        <MockButton label="+ Request Docs" />
      </div>
      {/* Upload zone for client docs */}
      <div
        style={{
          padding: "1.5rem",
          border: "2px dashed rgba(245,245,240,0.1)",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "1.25rem",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.5rem" }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p style={{ fontSize: "0.8rem", color: "#888", margin: 0 }}>Clients upload W-2s, 1099s, and receipts through their portal</p>
        <p style={{ fontSize: "0.65rem", color: "#555", margin: "0.25rem 0 0" }}>Auto-categorized • OCR extraction • Secure storage</p>
      </div>
      {/* Document tracking per client */}
      <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", overflow: "hidden" }}>
        {[
          { client: "Marcus Chen", docs: ["W-2 (2)", "1099-INT", "Mortgage Interest"], missing: ["1099-DIV"], pct: 80 },
          { client: "Sarah & David Park", docs: ["W-2 (1)"], missing: ["W-2 (spouse)", "1098", "Childcare receipts"], pct: 25 },
          { client: "Apex Financial LLC", docs: ["P&L", "Balance Sheet", "1099-NEC (8)", "Payroll records"], missing: [], pct: 100 },
        ].map((c, i) => (
          <div key={c.client} style={{ padding: "1rem 1.25rem", borderBottom: i < 2 ? "1px solid rgba(245,245,240,0.06)" : "none", animation: `dashRowSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <div style={{ fontSize: "0.8rem", color: "#f5f5f0", fontWeight: 600 }}>{c.client}</div>
              <span style={{ fontSize: "0.65rem", fontFamily: "'Space Mono', monospace", color: c.pct === 100 ? "#c8ff00" : c.pct >= 50 ? "#ffc800" : "#ff6b6b" }}>{c.pct}%</span>
            </div>
            {/* Progress bar */}
            <div style={{ height: "4px", background: "rgba(245,245,240,0.06)", borderRadius: "2px", overflow: "hidden", marginBottom: "0.5rem" }}>
              <div style={{ width: `${c.pct}%`, height: "100%", background: c.pct === 100 ? "#c8ff00" : c.pct >= 50 ? "#ffc800" : "#ff6b6b", borderRadius: "2px", transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
              {c.docs.map(d => (
                <span key={d} style={{ fontSize: "0.55rem", padding: "0.15rem 0.4rem", background: "rgba(200,255,0,0.06)", color: "#c8ff00", borderRadius: "4px", fontFamily: "'Space Mono', monospace" }}>{d}</span>
              ))}
              {c.missing.map(d => (
                <span key={d} style={{ fontSize: "0.55rem", padding: "0.15rem 0.4rem", background: "rgba(255,107,107,0.06)", color: "#ff6b6b", borderRadius: "4px", fontFamily: "'Space Mono', monospace" }}>{d}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CPABilling() {
  return (
    <>
      <MetricGrid metrics={[
        { label: "Billed This Season", value: "$124K", sub: "84 clients", accent: true },
        { label: "Outstanding", value: "$18.6K", sub: "12 invoices" },
        { label: "Avg per Return", value: "$1,475", sub: "↑ 8% vs last year" },
      ]} cols={3} />
      <ChartWidget title="Monthly Billing" heights={[22, 35, 82, 95]} labels={["Jan", "Feb", "Mar", "Apr"]} />
      {/* Billing by return type */}
      <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", padding: "1.25rem", marginTop: "0.5rem" }}>
        <div style={{ fontSize: "0.7rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem", fontFamily: "'Space Mono', monospace" }}>Revenue by Return Type</div>
        {[
          { type: "Individual (1040)", count: 48, revenue: "$62K", pct: 50 },
          { type: "Business (1120/1120S)", count: 18, revenue: "$38K", pct: 31 },
          { type: "Trust (1041)", count: 8, revenue: "$14K", pct: 11 },
          { type: "Partnership (1065)", count: 6, revenue: "$10K", pct: 8 },
        ].map((r, i) => (
          <div key={r.type} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: i < 3 ? "0.75rem" : 0, animation: `dashRowSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms both` }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#f5f5f0" }}>{r.type}</span>
                <span style={{ fontSize: "0.75rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace" }}>{r.revenue}</span>
              </div>
              <div style={{ height: "4px", background: "rgba(245,245,240,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ width: `${r.pct}%`, height: "100%", background: "#c8ff00", borderRadius: "2px", opacity: 0.6 + (r.pct / 100) * 0.4 }} />
              </div>
            </div>
            <span style={{ fontSize: "0.6rem", color: "#888", fontFamily: "'Space Mono', monospace", width: "30px", textAlign: "right" }}>{r.count}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   SHARED WIDGETS (with motion design improvements)
   ══════════════════════════════════════════════ */

function MetricGrid({ metrics, cols = 4 }: { metrics: { label: string; value: string; sub: string; accent?: boolean }[]; cols?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(cols, metrics.length)}, 1fr)`, gap: "1rem", marginBottom: "1.25rem" }}>
      {metrics.map((w, i) => (
        <div
          key={w.label}
          style={{
            padding: "1.25rem",
            background: w.accent ? "rgba(200,255,0,0.04)" : "rgba(245,245,240,0.02)",
            borderRadius: "12px",
            border: `1px solid ${w.accent ? "rgba(200,255,0,0.15)" : "rgba(245,245,240,0.06)"}`,
            animation: `dashMetricIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms both`,
          }}
        >
          <div style={{ fontSize: "0.65rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem", fontFamily: "'Space Mono', monospace" }}>{w.label}</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: w.accent ? "#c8ff00" : "#f5f5f0" }}>{w.value}</div>
          <div style={{ fontSize: "0.7rem", color: w.sub.startsWith("↑") || w.sub.startsWith("+") ? "#c8ff00" : "#666", marginTop: "0.2rem" }}>{w.sub}</div>
        </div>
      ))}
    </div>
  );
}

function ChartWidget({ title, heights = [45, 62, 38, 71, 55, 82, 68], labels = ["M", "T", "W", "T", "F", "S", "S"] }: { title: string; heights?: number[]; labels?: string[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);

  return (
    <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", padding: "1.25rem", marginBottom: "1rem" }}>
      <div style={{ fontSize: "0.7rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem", fontFamily: "'Space Mono', monospace" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
        {heights.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: mounted ? `${h}%` : "0%",
              background: i === heights.length - 1 ? "#c8ff00" : "rgba(200,255,0,0.12)",
              borderRadius: "4px 4px 0 0",
              transition: `height 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms`,
              ...(i === heights.length - 1 ? { animation: "dashPulseGlow 3s ease-in-out infinite" } : {}),
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
        {labels.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "0.6rem", color: "#555" }}>{d}</div>
        ))}
      </div>
    </div>
  );
}

function ActivityWidget({ items }: { items: string[] }) {
  const times = ["2m ago", "1h ago", "3h ago"];
  return (
    <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", padding: "1rem 1.25rem" }}>
      <div style={{ fontSize: "0.7rem", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem", fontFamily: "'Space Mono', monospace" }}>Recent Activity</div>
      {items.map((row, i) => (
        <div key={i} style={{ padding: "0.5rem 0", borderBottom: i < items.length - 1 ? "1px solid rgba(245,245,240,0.04)" : "none", fontSize: "0.75rem", color: "#888", display: "flex", justifyContent: "space-between", animation: `dashRowSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${i * 50}ms both` }}>
          <span>{row}</span>
          <span style={{ color: "#555", fontSize: "0.65rem", flexShrink: 0, marginLeft: "1rem" }}>{times[i]}</span>
        </div>
      ))}
    </div>
  );
}

function TableView({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  const colTemplate = headers.length === 3 ? "2fr 1fr 1fr" : headers.length === 4 ? "2fr 1.5fr 1fr 1fr" : `repeat(${headers.length}, 1fr)`;
  return (
    <div style={{ background: "rgba(245,245,240,0.02)", borderRadius: "12px", border: "1px solid rgba(245,245,240,0.06)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: colTemplate, padding: "0.75rem 1.25rem", borderBottom: "1px solid rgba(245,245,240,0.06)" }}>
        {headers.map((h) => (
          <div key={h} style={{ fontSize: "0.6rem", color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: colTemplate,
            padding: "0.7rem 1.25rem",
            borderBottom: i < rows.length - 1 ? "1px solid rgba(245,245,240,0.04)" : "none",
            alignItems: "center",
            animation: `dashRowSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms both`,
          }}
        >
          {row.map((cell, j) => (
            <div key={j} style={{ fontSize: "0.8rem", color: "#f5f5f0", fontWeight: j === 0 ? 500 : 400 }}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Active: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Complete: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Captured: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Shipped: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Delivered: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Quoted: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Won: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Paid: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Filed: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Accepted: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Qualified: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Onboarding: { bg: "rgba(200,255,0,0.08)", text: "#c8ff00" },
    Pending: { bg: "rgba(255,200,0,0.08)", text: "#ffc800" },
    Processing: { bg: "rgba(255,200,0,0.08)", text: "#ffc800" },
    "In Progress": { bg: "rgba(255,200,0,0.08)", text: "#ffc800" },
    "In Review": { bg: "rgba(255,200,0,0.08)", text: "#ffc800" },
    "Under Review": { bg: "rgba(255,200,0,0.08)", text: "#ffc800" },
    Screening: { bg: "rgba(255,200,0,0.08)", text: "#ffc800" },
    "Docs Needed": { bg: "rgba(255,107,107,0.08)", text: "#ff6b6b" },
    Submitted: { bg: "rgba(100,180,255,0.08)", text: "#64b4ff" },
    Interview: { bg: "rgba(100,180,255,0.08)", text: "#64b4ff" },
    Showing: { bg: "rgba(100,180,255,0.08)", text: "#64b4ff" },
    Outreach: { bg: "rgba(100,180,255,0.08)", text: "#64b4ff" },
    Meeting: { bg: "rgba(100,180,255,0.08)", text: "#64b4ff" },
    Sent: { bg: "rgba(100,180,255,0.08)", text: "#64b4ff" },
    Transmitted: { bg: "rgba(100,180,255,0.08)", text: "#64b4ff" },
    Scheduled: { bg: "rgba(100,180,255,0.08)", text: "#64b4ff" },
    Draft: { bg: "rgba(245,245,240,0.04)", text: "#888" },
    Proposal: { bg: "rgba(180,130,255,0.08)", text: "#b482ff" },
    Offer: { bg: "rgba(180,130,255,0.08)", text: "#b482ff" },
    Extension: { bg: "rgba(180,130,255,0.08)", text: "#b482ff" },
    Closed: { bg: "rgba(245,245,240,0.04)", text: "#888" },
    Paused: { bg: "rgba(245,245,240,0.04)", text: "#888" },
    "Wrap-up": { bg: "rgba(255,200,0,0.08)", text: "#ffc800" },
    Lead: { bg: "rgba(100,180,255,0.08)", text: "#64b4ff" },
    "Under Contract": { bg: "rgba(180,130,255,0.08)", text: "#b482ff" },
    Outstanding: { bg: "rgba(255,200,0,0.08)", text: "#ffc800" },
  };
  const c = colors[status] || { bg: "rgba(245,245,240,0.04)", text: "#888" };
  return (
    <span style={{
      fontSize: "0.6rem",
      padding: "0.2rem 0.5rem",
      borderRadius: "100px",
      background: c.bg,
      color: c.text,
      fontFamily: "'Space Mono', monospace",
      whiteSpace: "nowrap",
    }}>{status}</span>
  );
}

function MockButton({ label }: { label: string }) {
  return (
    <button
      style={{
        padding: "0.4rem 0.9rem",
        background: "rgba(200,255,0,0.08)",
        border: "1px solid rgba(200,255,0,0.15)",
        borderRadius: "8px",
        color: "#c8ff00",
        fontSize: "0.7rem",
        fontWeight: 600,
        cursor: "default",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {label}
    </button>
  );
}

/* ══════════════════════════════════════════════
   STYLES
   ══════════════════════════════════════════════ */

const primaryBtnStyle: React.CSSProperties = {
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
};

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

const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  color: "#666",
  fontFamily: "'Space Mono', monospace",
  letterSpacing: "1px",
  textTransform: "uppercase",
};
