"use client";

import { useState, useMemo } from "react";

/*
  Ads Engine — managed paid ads + client-owned command center.
  Sales demo for martin.builds. Seeded fake business: Magnolia Home Care.
  Positioning: "Agencies hide your ad account. We hand you the keys."

  This is the DEMO surface only — interactive, seeded data, no real
  backend. See MASTER BUILD PROMPT for the production spec (Supabase,
  Meta/Google OAuth, Stripe, cron sync).
*/

/* ── palette (shared martin-builds demo convention) ── */
const bg = "#FAFAF8";
const card = "#ffffff";
const cardSubtle = "#FBFAF7";
const border = "#E8E3DC";
const track = "#F1ECDF";
const muted = "#78716c";
const textDark = "#1a1a1a";
const ink = "#1c1917";
const green = "#16a34a";
const greenSoft = "#EAF7EE";
const amber = "#d97706";
const red = "#dc2626";
const redSoft = "#FDEDEC";
const blue = "#2563eb";
const fontDisplay = "'Fraunces', serif";
const fontBody = "'DM Sans', sans-serif";

/* ── seeded data: Magnolia Home Care ── */
const BUSINESS = { name: "Magnolia Home Care", owner: "Denise Okafor", plan: "Growth" };

type Provider = "Meta" | "Google";
type CampaignStatus = "live" | "paused" | "review";

type Campaign = {
  id: string;
  provider: Provider;
  name: string;
  objective: string; // plain-English
  status: CampaignStatus;
  dailyBudget: number;
  guardrailMin: number;
  guardrailMax: number;
  spendMonth: number;
  leadsMonth: number;
};

const CAMPAIGNS: Campaign[] = [
  { id: "c1", provider: "Meta", name: "Home Care — Local Families", objective: "Get more client inquiries", status: "live", dailyBudget: 45, guardrailMin: 25, guardrailMax: 70, spendMonth: 1180, leadsMonth: 38 },
  { id: "c2", provider: "Google", name: "Search — \"home care near me\"", objective: "Capture people searching right now", status: "live", dailyBudget: 60, guardrailMin: 40, guardrailMax: 90, spendMonth: 1540, leadsMonth: 22 },
  { id: "c3", provider: "Meta", name: "Hire Caregivers — Metro Atlanta", objective: "Hire more caregivers", status: "live", dailyBudget: 30, guardrailMin: 15, guardrailMax: 50, spendMonth: 720, leadsMonth: 14 },
  { id: "c4", provider: "Google", name: "Brand — Magnolia Home Care", objective: "Stay top of mind with past inquiries", status: "paused", dailyBudget: 15, guardrailMin: 10, guardrailMax: 25, spendMonth: 210, leadsMonth: 3 },
  { id: "c5", provider: "Meta", name: "Win-Back — Past Inquiries", objective: "Bring back people who didn't book", status: "review", dailyBudget: 20, guardrailMin: 10, guardrailMax: 35, spendMonth: 0, leadsMonth: 0 },
];

// 30-day spend/leads series
const TREND = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 105 + Math.sin(i / 4) * 30 + (i > 20 ? 25 : 0);
  const spend = Math.max(40, Math.round(base + (i % 7 === 0 ? -35 : 0)));
  const leads = Math.max(0, Math.round(spend / 42 + Math.sin(i / 3) * 1.2));
  return { day, spend, leads };
});

const ACTIONS = [
  { id: "a1", when: "2 days ago", text: "Lowered budget on the Google Brand campaign that was costing $41/lead — moved $15/day to Facebook, where leads are coming in at $12.", type: "budget" as const },
  { id: "a2", when: "4 days ago", text: "Launched \"Win-Back — Past Inquiries\" targeting people who requested info but didn't book a tour. In review with Meta, expected live within 24 hours.", type: "launch" as const },
  { id: "a3", when: "6 days ago", text: "Swapped the lead photo on \"Home Care — Local Families\" after the old one slowed down over 2 weeks. New version is already outperforming it by 30%.", type: "creative" as const },
  { id: "a4", when: "9 days ago", text: "Paused \"Senior Living Transition\" — spent $340 with zero leads in 5 days. Redirected that budget to the search campaign, which is converting.", type: "pause" as const },
  { id: "a5", when: "12 days ago", text: "Raised the daily budget on the search campaign from $45 to $60 after 3 straight days of leads under $18 each — capturing more of that demand.", type: "budget" as const },
];

type CreativeStatus = "pending_approval" | "approved" | "live" | "retired";
type Creative = {
  id: string;
  campaignId: string;
  headline: string;
  body: string;
  status: CreativeStatus;
  cpl: number | null;
  thumbnailTone: string;
};
const CREATIVES: Creative[] = [
  { id: "cr1", campaignId: "c1", headline: "Compassionate care, right at home.", body: "Licensed caregivers for your loved one — flexible hours, background-checked, local to Atlanta.", status: "live", cpl: 12, thumbnailTone: "#DCEFE2" },
  { id: "cr2", campaignId: "c1", headline: "You shouldn't have to choose between work and caring for mom.", body: "We handle the day-to-day so your family doesn't have to do it alone.", status: "live", cpl: 15, thumbnailTone: "#E6E0F5" },
  { id: "cr3", campaignId: "c3", headline: "Caregivers wanted — flexible schedule, weekly pay.", body: "Join a team that treats you like family. Apply in 2 minutes.", status: "live", cpl: 19, thumbnailTone: "#FCE8D6" },
  { id: "cr4", campaignId: "c5", headline: "Still thinking it over? Let's talk — no pressure.", body: "A free 15-minute call to answer your questions about home care options.", status: "pending_approval", cpl: null, thumbnailTone: "#FDEEDC" },
  { id: "cr5", campaignId: "c1", headline: "24/7 support for the people who matter most.", body: "Round-the-clock care plans built around your family's schedule.", status: "pending_approval", cpl: null, thumbnailTone: "#DCE8F5" },
];

type Lead = { id: string; name: string; phone: string; source: string; when: string; status: "new" | "contacted" | "booked" | "client" };
const LEADS: Lead[] = [
  { id: "l1", name: "Sharon Whitfield", phone: "(404) 555-0142", source: "Home Care — Local Families", when: "Today, 9:14am", status: "new" },
  { id: "l2", name: "Marcus Reed", phone: "(770) 555-0198", source: "Search — \"home care near me\"", when: "Today, 7:52am", status: "new" },
  { id: "l3", name: "Angela Duval", phone: "(678) 555-0163", source: "Home Care — Local Families", when: "Yesterday", status: "contacted" },
  { id: "l4", name: "Tyrell Banks", phone: "(404) 555-0117", source: "Hire Caregivers — Metro Atlanta", when: "Yesterday", status: "contacted" },
  { id: "l5", name: "Patricia Loomis", phone: "(770) 555-0184", source: "Search — \"home care near me\"", when: "2 days ago", status: "booked" },
  { id: "l6", name: "Denise Carr", phone: "(404) 555-0129", source: "Home Care — Local Families", when: "4 days ago", status: "client" },
  { id: "l7", name: "Willie Foster", phone: "(678) 555-0155", source: "Home Care — Local Families", when: "5 days ago", status: "client" },
];

const fmt = (n: number) => n.toLocaleString("en-US");
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

type Tab = "overview" | "campaigns" | "creative" | "leads" | "reports";

export default function AdsEngineDemo() {
  const [tab, setTab] = useState<Tab>("overview");
  const [showVideo, setShowVideo] = useState(false);
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  const [creatives, setCreatives] = useState(CREATIVES);
  const [leads, setLeads] = useState(LEADS);
  const [toast, setToast] = useState<string | null>(null);

  const totals = useMemo(() => {
    const spend = campaigns.reduce((a, c) => a + c.spendMonth, 0);
    const leadCount = campaigns.reduce((a, c) => a + c.leadsMonth, 0);
    const cpl = leadCount > 0 ? spend / leadCount : 0;
    const booked = leads.filter((l) => l.status === "booked" || l.status === "client").length;
    return { spend, leadCount, cpl, booked };
  }, [campaigns, leads]);

  function fireToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  function toggleCampaign(id: string) {
    setCampaigns((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      const next: CampaignStatus = c.status === "live" ? "paused" : c.status === "paused" ? "live" : c.status;
      fireToast(next === "paused" ? `Paused "${c.name}"` : `Resumed "${c.name}"`);
      return { ...c, status: next };
    }));
  }

  function adjustBudget(id: string, delta: number) {
    setCampaigns((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      const next = Math.min(c.guardrailMax, Math.max(c.guardrailMin, c.dailyBudget + delta));
      return { ...c, dailyBudget: next };
    }));
  }

  function decideCreative(id: string, approve: boolean) {
    setCreatives((prev) => prev.map((cr) => {
      if (cr.id !== id) return cr;
      fireToast(approve ? "Creative approved — going live" : "Change requested — operator notified");
      return { ...cr, status: approve ? "approved" : "pending_approval" };
    }));
  }

  function updateLeadStatus(id: string, status: Lead["status"]) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  return (
    <div style={{ background: bg, color: textDark, minHeight: "100vh", fontFamily: fontBody }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        html body { background: ${bg} !important; color: ${textDark} !important; font-family: ${fontBody} !important; }
        body::before { display: none !important; }
        @keyframes rise { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        .rise { animation: rise .4s ease both }
        .ae-tab { transition: all .15s ease; cursor: pointer; }
        .ae-card-hover { transition: transform .15s ease, box-shadow .15s ease; }
        .ae-card-hover:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,0.05); }
        input[type=range] { accent-color: ${green}; }
      `}</style>

      {/* Top bar */}
      <div style={{ background: ink, color: "#fff", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontFamily: fontDisplay, fontSize: 17, fontWeight: 700 }}>
            Ads Engine <span style={{ color: green }}>·</span> <span style={{ opacity: 0.65, fontWeight: 500, fontSize: 13 }}>{BUSINESS.name}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(22,163,74,0.2)", color: "#7ee2a0", padding: "3px 9px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 0.5 }}>Demo</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, opacity: 0.85 }}>
          <button
            onClick={() => setShowVideo(true)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(200,255,0,0.12)",
              border: "1px solid rgba(200,255,0,0.35)", color: green, borderRadius: 100, padding: "6px 12px",
              fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: fontBody,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill={green}><polygon points="6 3 20 12 6 21" /></svg>
            Watch 30s overview
          </button>
          <span style={{ opacity: 0.75 }}>Owner: {BUSINESS.owner}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, opacity: 0.75 }}>
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: green, display: "inline-block" }} />
            Synced 40 min ago
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: card, borderBottom: `1px solid ${border}`, padding: "0 20px", display: "flex", gap: 4, overflowX: "auto" }}>
        {([
          { id: "overview", label: "Overview" },
          { id: "campaigns", label: "Campaigns" },
          { id: "creative", label: "Creative Studio" },
          { id: "leads", label: "Leads" },
          { id: "reports", label: "Reports" },
        ] as { id: Tab; label: string }[]).map((t) => (
          <button
            key={t.id}
            className="ae-tab"
            onClick={() => setTab(t.id)}
            style={{
              padding: "14px 16px",
              fontSize: 13,
              fontWeight: 600,
              background: "transparent",
              border: "none",
              borderBottom: tab === t.id ? `2px solid ${green}` : "2px solid transparent",
              color: tab === t.id ? textDark : muted,
              whiteSpace: "nowrap",
              fontFamily: fontBody,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 20px 60px" }}>
        {tab === "overview" && (
          <OverviewTab totals={totals} campaigns={campaigns} />
        )}
        {tab === "campaigns" && (
          <CampaignsTab campaigns={campaigns} onToggle={toggleCampaign} onAdjust={adjustBudget} />
        )}
        {tab === "creative" && (
          <CreativeTab creatives={creatives} campaigns={campaigns} onDecide={decideCreative} />
        )}
        {tab === "leads" && (
          <LeadsTab leads={leads} onUpdate={updateLeadStatus} />
        )}
        {tab === "reports" && (
          <ReportsTab totals={totals} campaigns={campaigns} />
        )}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", background: ink, color: "#fff", padding: "10px 18px", borderRadius: 9999, fontSize: 13, fontWeight: 500, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 50, animation: "rise .2s ease both" }}>
          {toast}
        </div>
      )}

      {showVideo && (
        <div
          onClick={() => setShowVideo(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(90vw, 480px)" }}>
            <video src="/ads-engine-promo.mp4" controls autoPlay playsInline style={{ width: "100%", borderRadius: 16, display: "block", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
            <button
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
              style={{ position: "absolute", top: -14, right: -14, width: 32, height: 32, borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700, color: ink, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Overview ───────────────────────── */

function OverviewTab({ totals, campaigns }: { totals: { spend: number; leadCount: number; cpl: number; booked: number }; campaigns: Campaign[] }) {
  const maxSpend = Math.max(...TREND.map((d) => d.spend));
  const maxLeads = Math.max(...TREND.map((d) => d.leads));

  return (
    <div className="rise">
      <p style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: 0 }}>This Month</p>
      <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, margin: "4px 0 6px 0", letterSpacing: "-0.5px" }}>What did my money do?</h1>
      <p style={{ fontSize: 13, color: muted, margin: "0 0 24px 0" }}>Every dollar spent, every lead it brought in — plain English, updated every 3 hours.</p>

      {/* Big numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
        <BigStat label="Spent this month" value={money(totals.spend)} sub="across Meta + Google" />
        <BigStat label="Leads this month" value={fmt(totals.leadCount)} sub="people who reached out" tone={green} />
        <BigStat label="Cost per lead" value={`$${totals.cpl.toFixed(0)}`} sub="what each lead cost, on average" />
        <BigStat label="Booked so far" value={fmt(totals.booked)} sub="turned into real business" tone={green} />
      </div>

      {/* Trend chart */}
      <Panel title="Spend vs. leads — last 30 days" sub="Bars: daily spend · Line: leads">
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 140, marginTop: 8 }}>
          {TREND.map((d) => (
            <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", position: "relative" }} title={`Day ${d.day} · ${money(d.spend)} · ${d.leads} leads`}>
              <div style={{ width: "100%", height: `${(d.spend / maxSpend) * 100}%`, background: track, borderRadius: "2px 2px 0 0", position: "relative" }}>
                <div style={{ position: "absolute", bottom: `${(d.leads / maxLeads) * 100}%`, left: "50%", transform: "translate(-50%, 50%)", width: 4, height: 4, borderRadius: 9999, background: green }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: muted }}>
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </Panel>

      {/* What we did this week */}
      <div style={{ marginTop: 20 }}>
        <Panel title="What we did this week" sub="Every change we make, in plain English — nothing hidden">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ACTIONS.map((a) => (
              <div key={a.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderTop: `1px solid ${border}` }}>
                <ActionIcon type={a.type} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0, color: textDark }}>{a.text}</p>
                  <span style={{ fontSize: 11, color: muted }}>{a.when}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Live campaign snapshot */}
      <div style={{ marginTop: 20 }}>
        <Panel title="Campaigns at a glance" sub={`${campaigns.filter((c) => c.status === "live").length} live · ${campaigns.filter((c) => c.status === "paused").length} paused · ${campaigns.filter((c) => c.status === "review").length} in review`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {campaigns.map((c) => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: cardSubtle, border: `1px solid ${border}`, borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <StatusDot status={c.status} />
                  <span style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                </div>
                <span style={{ fontSize: 12, color: muted, flexShrink: 0 }}>{c.leadsMonth > 0 ? `$${(c.spendMonth / c.leadsMonth).toFixed(0)}/lead` : "—"}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ───────────────────────── Campaigns ───────────────────────── */

function CampaignsTab({ campaigns, onToggle, onAdjust }: { campaigns: Campaign[]; onToggle: (id: string) => void; onAdjust: (id: string, delta: number) => void }) {
  return (
    <div className="rise">
      <p style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: 0 }}>Control Center</p>
      <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, margin: "4px 0 6px 0", letterSpacing: "-0.5px" }}>Campaigns</h1>
      <p style={{ fontSize: 13, color: muted, margin: "0 0 24px 0" }}>Pause anything, anytime. Move budgets within the range we've agreed on — go further and it becomes a request, not a change.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {campaigns.map((c) => {
          const cpl = c.leadsMonth > 0 ? c.spendMonth / c.leadsMonth : null;
          const pct = ((c.dailyBudget - c.guardrailMin) / (c.guardrailMax - c.guardrailMin)) * 100;
          return (
            <div key={c.id} className="ae-card-hover" style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <StatusDot status={c.status} />
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</span>
                    <ProviderPill provider={c.provider} />
                  </div>
                  <p style={{ fontSize: 12, color: muted, margin: 0 }}>{c.objective}</p>
                </div>
                <button
                  onClick={() => onToggle(c.id)}
                  disabled={c.status === "review"}
                  style={{
                    fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 9999, cursor: c.status === "review" ? "not-allowed" : "pointer",
                    background: c.status === "live" ? redSoft : c.status === "paused" ? greenSoft : track,
                    color: c.status === "live" ? red : c.status === "paused" ? green : muted,
                    border: "none", flexShrink: 0, opacity: c.status === "review" ? 0.6 : 1,
                  }}
                >
                  {c.status === "live" ? "Pause" : c.status === "paused" ? "Resume" : "In review"}
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10, marginTop: 14 }}>
                <MiniStat label="Spend (mo)" value={money(c.spendMonth)} />
                <MiniStat label="Leads (mo)" value={fmt(c.leadsMonth)} />
                <MiniStat label="Cost/lead" value={cpl ? `$${cpl.toFixed(0)}` : "—"} />
              </div>

              {/* Budget slider with guardrail band */}
              <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Daily budget</span>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: fontDisplay }}>${c.dailyBudget}/day</span>
                </div>
                <div style={{ position: "relative", height: 8, background: track, borderRadius: 9999 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: green, borderRadius: 9999, transition: "width .2s ease" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: muted }}>
                  <span>${c.guardrailMin} min</span>
                  <span>${c.guardrailMax} max (owner range)</span>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => onAdjust(c.id, -5)} style={budgetBtnStyle}>−$5</button>
                  <button onClick={() => onAdjust(c.id, 5)} style={budgetBtnStyle}>+$5</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── Creative Studio ───────────────────────── */

function CreativeTab({ creatives, campaigns, onDecide }: { creatives: Creative[]; campaigns: Campaign[]; onDecide: (id: string, approve: boolean) => void }) {
  const campaignName = (id: string) => campaigns.find((c) => c.id === id)?.name || "—";
  return (
    <div className="rise">
      <p style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: 0 }}>Creative Studio</p>
      <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, margin: "4px 0 6px 0", letterSpacing: "-0.5px" }}>Ad creative</h1>
      <p style={{ fontSize: 13, color: muted, margin: "0 0 24px 0" }}>We write and design every ad. You just approve — or ask for a change.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {creatives.map((cr) => (
          <div key={cr.id} className="ae-card-hover" style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
            {/* Ad-style mock preview */}
            <div style={{ background: cr.thumbnailTone, height: 140, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 600, color: ink, textAlign: "center", padding: "0 20px", lineHeight: 1.3 }}>
                {cr.headline}
              </span>
              {cr.status === "pending_approval" && (
                <span style={{ position: "absolute", top: 10, right: 10, fontSize: 10, fontWeight: 700, background: amber, color: "#fff", padding: "3px 8px", borderRadius: 100, textTransform: "uppercase" }}>Needs review</span>
              )}
            </div>
            <div style={{ padding: 14 }}>
              <p style={{ fontSize: 13, color: textDark, margin: "0 0 6px 0", lineHeight: 1.5 }}>{cr.body}</p>
              <p style={{ fontSize: 11, color: muted, margin: "0 0 10px 0" }}>{campaignName(cr.campaignId)}</p>
              {cr.status === "pending_approval" ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => onDecide(cr.id, true)} style={{ ...budgetBtnStyle, flex: 1, background: green, color: "#fff", border: "none" }}>Approve</button>
                  <button onClick={() => onDecide(cr.id, false)} style={{ ...budgetBtnStyle, flex: 1 }}>Request change</button>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: green, textTransform: "uppercase" }}>
                    {cr.status === "approved" ? "Approved — going live" : "Live"}
                  </span>
                  {cr.cpl && <span style={{ fontSize: 12, color: muted }}>${cr.cpl}/lead</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Leads ───────────────────────── */

const LEAD_STATUSES: Lead["status"][] = ["new", "contacted", "booked", "client"];
const statusColor: Record<Lead["status"], string> = { new: blue, contacted: amber, booked: green, client: green };

function LeadsTab({ leads, onUpdate }: { leads: Lead[]; onUpdate: (id: string, status: Lead["status"]) => void }) {
  function exportCsv() {
    const rows = [["Name", "Phone", "Source", "When", "Status"], ...leads.map((l) => [l.name, l.phone, l.source, l.when, l.status])];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "magnolia-leads.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rise">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
        <div>
          <p style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: 0 }}>Pipeline</p>
          <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, margin: "4px 0 6px 0", letterSpacing: "-0.5px" }}>Leads</h1>
          <p style={{ fontSize: 13, color: muted, margin: 0 }}>Every person the ads brought in. This is what turns ad spend into real business.</p>
        </div>
        <button onClick={exportCsv} style={{ ...budgetBtnStyle, whiteSpace: "nowrap" }}>Export CSV</button>
      </div>

      <div style={{ marginTop: 20, background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
        {leads.map((l, i) => (
          <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderTop: i ? `1px solid ${border}` : "none", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 160px", minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{l.name}</div>
              <div style={{ fontSize: 12, color: muted }}>{l.phone}</div>
            </div>
            <div style={{ flex: "1 1 180px", minWidth: 0, fontSize: 12, color: muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.source}</div>
            <div style={{ flex: "0 0 90px", fontSize: 11, color: muted }}>{l.when}</div>
            <select
              value={l.status}
              onChange={(e) => onUpdate(l.id, e.target.value as Lead["status"])}
              style={{
                fontSize: 12, fontWeight: 700, padding: "6px 10px", borderRadius: 8, border: `1px solid ${border}`,
                background: cardSubtle, color: statusColor[l.status], textTransform: "capitalize", cursor: "pointer", fontFamily: fontBody,
              }}
            >
              {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Reports ───────────────────────── */

function ReportsTab({ totals, campaigns }: { totals: { spend: number; leadCount: number; cpl: number; booked: number }; campaigns: Campaign[] }) {
  const best = [...campaigns].filter((c) => c.leadsMonth > 0).sort((a, b) => (a.spendMonth / a.leadsMonth) - (b.spendMonth / b.leadsMonth))[0];
  return (
    <div className="rise">
      <p style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: 0 }}>This Week's Digest</p>
      <h1 style={{ fontFamily: fontDisplay, fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, margin: "4px 0 6px 0", letterSpacing: "-0.5px" }}>Reports</h1>
      <p style={{ fontSize: 13, color: muted, margin: "0 0 24px 0" }}>Written for you every week — plain English, numbers that trace back exactly to what happened. Also lands in your inbox.</p>

      <Panel title={`Week of ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}`} sub="Auto-generated from synced data">
        <p style={{ fontSize: 14, lineHeight: 1.7, color: textDark, margin: "0 0 16px 0" }}>
          Hi Denise — this week Magnolia spent <strong>{money(totals.spend)}</strong> across Meta and Google and brought in <strong>{fmt(totals.leadCount)} leads</strong>,
          averaging <strong>${totals.cpl.toFixed(0)} per lead</strong>. Your best performer was <strong>{best?.name}</strong>, bringing leads in at{" "}
          <strong>${best ? (best.spendMonth / best.leadsMonth).toFixed(0) : "—"}</strong> each — well under your typical range. We paused the campaign that had gone
          quiet and moved that budget toward what's actually working. {fmt(totals.booked)} of your leads have already turned into booked visits or clients.
        </p>
        <p style={{ fontSize: 13, color: muted, lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: textDark }}>Next move:</strong> the win-back campaign targeting people who inquired but didn't book should be live within a day —
          worth watching for its first week of data before making any changes. <em>(advisory only)</em>
        </p>
      </Panel>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
        <BigStat label="Spent this month" value={money(totals.spend)} sub="across Meta + Google" />
        <BigStat label="Cost per lead" value={`$${totals.cpl.toFixed(0)}`} sub="account average" />
        <BigStat label="Best campaign" value={best?.name.split(" ")[0] || "—"} sub={best ? `$${(best.spendMonth / best.leadsMonth).toFixed(0)}/lead` : ""} tone={green} />
      </div>
    </div>
  );
}

/* ───────────────────────── shared bits ───────────────────────── */

function Panel({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 16 }}>
      <div style={{ marginBottom: 10 }}>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 600, margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontSize: 11, color: muted, margin: "3px 0 0 0" }}>{sub}</p>}
      </div>
      {children}
    </div>
  );
}

function BigStat({ label, value, sub, tone }: { label: string; value: string; sub: string; tone?: string }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 14 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 700, marginTop: 4, color: tone || textDark }}>{value}</div>
      <div style={{ fontSize: 10.5, color: muted, marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: cardSubtle, border: `1px solid ${border}`, borderRadius: 8, padding: "8px 10px" }}>
      <div style={{ fontSize: 9.5, color: muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, fontFamily: fontDisplay, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function StatusDot({ status }: { status: CampaignStatus }) {
  const color = status === "live" ? green : status === "paused" ? muted : amber;
  return <span style={{ width: 8, height: 8, borderRadius: 9999, background: color, display: "inline-block", flexShrink: 0 }} />;
}

function ProviderPill({ provider }: { provider: Provider }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: provider === "Meta" ? "#E7EFFD" : "#FDEDDD", color: provider === "Meta" ? "#3B5BDB" : "#B45309" }}>
      {provider}
    </span>
  );
}

function ActionIcon({ type }: { type: "budget" | "launch" | "creative" | "pause" }) {
  const bgc = type === "pause" ? redSoft : greenSoft;
  const fg = type === "pause" ? red : green;
  const paths: Record<string, string> = {
    budget: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    launch: "M12 19V5M5 12l7-7 7 7",
    creative: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
    pause: "M10 15V9M14 15V9",
  };
  return (
    <span style={{ width: 26, height: 26, borderRadius: 8, background: bgc, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[type]} />
      </svg>
    </span>
  );
}

const budgetBtnStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  padding: "7px 12px",
  borderRadius: 8,
  background: "transparent",
  color: textDark,
  border: `1px solid ${border}`,
  cursor: "pointer",
  fontFamily: fontBody,
};
