"use client";

import { useState, useMemo } from "react";

/*
  StockSense — Supply edition. Demo for ATFS Ltd / ChopSticks.
  Built under martin.builds. Upstream + source-aware.
*/

/* ── palette ── */
const bg = "#F5F2EC";
const card = "#ffffff";
const border = "#E2DCD0";
const green = "#16a34a";
const amber = "#d97706";
const red = "#dc2626";
const blue = "#2563eb";
const muted = "#78716c";
const textDark = "#1a1a1a";
const ink = "#1c1917";
const nav = "#3D2A5C";
const navAccent = "#2A1B43";
const navText = "rgba(255,255,255,0.78)";
const navTextActive = "#ffffff";
const sidebarBg = "#EFEAE0";
const sidebarText = "#5a5048";
const fontDisplay = "'Fraunces', serif";
const fontBody = "'DM Sans', sans-serif";

/* ── data ── */
type Reason = "late" | "cny" | "produce" | "watch" | "ok";
type Source = "China" | "Local" | "Thailand";

const SKUS: Array<{
  id: string;
  name: string;
  source: Source;
  leadWk: number;
  cover: number;
  sell: number;
  cost: number;
  reason: Reason;
  note: string;
}> = [
  { id: "mango", name: "Preserved Mango Tub", source: "China", leadWk: 10, cover: 1.0, sell: 14.0, cost: 7.1, reason: "late", note: "1.0 wk cover vs 10-wk import lead — already behind" },
  { id: "haw", name: "Haw Flakes (山楂餅)", source: "China", leadWk: 11, cover: 3.2, sell: 6.0, cost: 4.9, reason: "cny", note: "Order before CNY — factories shut ~3 wks" },
  { id: "pepper", name: "Pepper Sauce (house-made)", source: "Local", leadWk: 2, cover: 1.3, sell: 8.0, cost: 3.2, reason: "produce", note: "Book a production slot — raw peppers on ~1-wk lead" },
  { id: "seasoning", name: "Green Seasoning (house-made)", source: "Local", leadWk: 2, cover: 0.8, sell: 7.5, cost: 2.6, reason: "produce", note: "Below cover — schedule the next batch this week" },
  { id: "rice", name: "Thai Hom Mali Rice 25lb", source: "Thailand", leadWk: 7, cover: 4.5, sell: 200.0, cost: 168.0, reason: "watch", note: "Plan the next Thailand order within ~3 weeks" },
  { id: "lihing", name: "Li Hing Mui Cherry", source: "China", leadWk: 11, cover: 6.0, sell: 12.0, cost: 6.4, reason: "ok", note: "Adequate for now" },
  { id: "shiitake", name: "Shiitake Crisps 65g (house-made)", source: "Local", leadWk: 2, cover: 6.5, sell: 11.0, cost: 4.0, reason: "ok", note: "Comfortable cover" },
];

const TT = (n: number) => "TT$" + (n >= 100 ? n.toFixed(0) : n.toFixed(2));
const pct = (n: number) => Math.round(n * 100) + "%";

/* ── inline SVGs ── */
const Svg = ({ children, size = 14, color = "currentColor", stroke = 2 }: { children: React.ReactNode; size?: number; color?: string; stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {children}
  </svg>
);
const SearchIcon = ({ size, color }: { size?: number; color?: string }) => (
  <Svg size={size} color={color}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Svg>
);
const FactoryIcon = ({ color, size }: { color?: string; size?: number }) => <Svg size={size} color={color}><path d="M2 20V8l8 5V8l8 5V8l4 12H2Z" /></Svg>;
const ShipIcon = ({ color, size }: { color?: string; size?: number }) => <Svg size={size} color={color}><path d="M2 20a2.4 2.4 0 0 0 2 1c1.3 0 2-1 4-1s2.7 1 4 1 2-1 4-1 2.7 1 4 1a2.4 2.4 0 0 0 2-1M3 14h18l-2-5H5l-2 5Zm9-9V2" /></Svg>;
const SparkIcon = ({ color, size }: { color?: string; size?: number }) => <Svg size={size} color={color}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /></Svg>;
const BoxIcon = ({ color, size }: { color?: string; size?: number }) => <Svg size={size} color={color}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></Svg>;
const AlertIcon = ({ color, size }: { color?: string; size?: number }) => <Svg size={size} color={color}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Svg>;
const TrendIcon = ({ color, size }: { color?: string; size?: number }) => <Svg size={size} color={color}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></Svg>;
const LayersIcon = ({ color, size }: { color?: string; size?: number }) => <Svg size={size} color={color}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></Svg>;
const BellIcon = ({ color, size }: { color?: string; size?: number }) => <Svg size={size} color={color}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></Svg>;

type ActionedItem = { id: string; name: string; source: Source; verb: string; detail: string; at: number };

export default function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<null | { title: string; lead: string; rows: string[]; action: string }>(null);
  const [actioned, setActioned] = useState<ActionedItem[]>([]);
  const actionedIds = useMemo(() => new Set(actioned.map((a) => a.id)), [actioned]);
  const [toast, setToast] = useState<string | null>(null);

  const allRows = useMemo(
    () => SKUS.map((s) => ({ ...s, margin: (s.sell - s.cost) / s.sell })).sort((a, b) => a.cover - b.cover),
    []
  );
  const rows = allRows.filter((s) => !actionedIds.has(s.id));
  const act = rows.filter((s) => s.cover < s.leadWk / 4 + 0.5 || s.reason === "cny");
  const byMargin = [...rows].sort((a, b) => a.margin - b.margin);

  // KPIs
  const linesShort = act.length;
  const avgMargin = rows.reduce((acc, s) => acc + s.margin, 0) / Math.max(rows.length, 1);
  const sourceCounts = rows.reduce(
    (acc, s) => {
      acc[s.source] = (acc[s.source] || 0) + 1;
      return acc;
    },
    {} as Record<Source, number>
  );
  const worstGapWks = Math.max(...act.map((s) => s.leadWk - s.cover), 0);

  // Source health for donut: % of each source's SKUs that are not flagged
  const sources: Source[] = ["Local", "China", "Thailand"];
  const sourceHealth = sources.map((src) => {
    const inSrc = allRows.filter((s) => s.source === src);
    const ok = inSrc.filter((s) => !(s.cover < s.leadWk / 4 + 0.5 || s.reason === "cny")).length;
    return { src, total: inSrc.length, ok, pct: inSrc.length ? ok / inSrc.length : 0 };
  });
  const overallHealthPct = Math.round(
    (allRows.filter((s) => !(s.cover < s.leadWk / 4 + 0.5 || s.reason === "cny")).length / allRows.length) * 100
  );

  const examples = ["What do I need to replenish now?", "What needs a production run?", "What's affected by Chinese New Year?"];

  function ask(q: string) {
    const t = q.toLowerCase();
    setQuery(q);
    let body;
    if (t.includes("production") || t.includes("make") || t.includes("batch") || t.includes("local")) {
      const loc = rows.filter((s) => s.source === "Local");
      body = {
        title: "Local production",
        lead: "Made near Macoya — short clock, but bounded by raw materials and an open production slot:",
        rows: loc.filter((s) => s.cover < 3).map((s) => `${s.name} — ${s.cover.toFixed(1)} wks cover, book a slot now`),
        action: "Local and imported lines need different actions. Your downstream tool treats them the same.",
      };
    } else if (t.includes("chinese new year") || t.includes("cny") || t.includes("china")) {
      body = {
        title: "China supply",
        lead: "Long ocean lead plus a ~3-week CNY shutdown. These can't wait:",
        rows: rows.filter((s) => s.source === "China" && s.cover < 8).map((s) => `${s.name} — ${s.cover.toFixed(1)} wks cover, ${s.leadWk}-wk lead`),
        action: "Nothing off-the-shelf knows your China suppliers go dark for CNY.",
      };
    } else if (t.includes("margin") || t.includes("money") || t.includes("profit") || t.includes("least")) {
      body = {
        title: "True margin",
        lead: "After production cost or full landed cost — not the shelf price:",
        rows: byMargin.slice(0, 3).map((s) => `${s.name} — ${TT(s.sell)} → costs ${TT(s.cost)} → ${pct(s.margin)}`),
        action: "Lean into the high-margin lines when you plan production runs and import orders.",
      };
    } else {
      body = {
        title: "Replenish now",
        lead: act.length ? `${act.length} lines are short against their own supply clock:` : "Nothing urgent.",
        rows: act.map((s) => `${s.name} (${s.source}) — ${s.cover.toFixed(1)} wks left, ${s.leadWk}-wk lead`),
        action: "Each line is judged against its real lead time — local, China, or Thailand — not one flat rule.",
      };
    }
    setAnswer(body);
  }

  const srcColor = (s: Source) => (s === "China" ? red : s === "Local" ? green : amber);
  const tone = (r: Reason) => (r === "late" || r === "cny" || r === "produce" ? red : r === "watch" ? amber : green);
  const action = (s: { source: Source }) => (s.source === "Local" ? "Schedule run" : `Order — ${s.source}`);

  function take(s: (typeof allRows)[number]) {
    if (actionedIds.has(s.id)) return;
    const verb = s.source === "Local" ? "Production scheduled" : "PO drafted";
    const detail =
      s.source === "Local"
        ? "Slot booked at Macoya · raw materials confirmed"
        : s.source === "China"
        ? `${s.leadWk}-wk ocean lead · ETA logged, ${s.reason === "cny" ? "ahead of CNY shutdown" : "container space requested"}`
        : `${s.leadWk}-wk Thailand lead · supplier acknowledged`;
    const item: ActionedItem = { id: s.id, name: s.name, source: s.source, verb, detail, at: Date.now() };
    setActioned((p) => [item, ...p]);
    setToast(`${verb}: ${s.name}`);
    setTimeout(() => setToast(null), 2600);
  }

  function reset() {
    setActioned([]);
    setAnswer(null);
    setQuery("");
  }

  /* notifications: dynamic flags from data */
  const notifs = [
    ...act.filter((s) => s.reason === "late").map((s) => ({ tone: red, title: `${s.name} behind`, body: `${s.cover.toFixed(1)} wks cover vs ${s.leadWk}-wk lead` })),
    ...act.filter((s) => s.reason === "cny").map((s) => ({ tone: amber, title: `${s.name} — CNY risk`, body: "Factory shutdown approaching" })),
  ].slice(0, 5);

  return (
    <div style={{ background: bg, color: textDark, minHeight: "100vh", fontFamily: fontBody }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        html body { background: ${bg} !important; color: ${textDark} !important; font-family: ${fontBody} !important; }
        body::before { display: none !important; }
        section { padding-left: unset !important; padding-right: unset !important; }
        h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
        @keyframes rise { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        .rise { animation: rise .5s ease both }
        .card-hover { transition: transform .15s ease, box-shadow .15s ease } .card-hover:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.04) }
        .nav-tab { transition: background .15s ease } .nav-tab:hover { background: rgba(255,255,255,0.08) }
        .side-item { transition: background .15s ease, color .15s ease } .side-item:hover { background: rgba(255,255,255,0.5); color: ${textDark} }
        .chip { transition: all .15s ease } .chip:hover { background: ${ink}; color: ${bg} }
        input::placeholder { color: #9a9086 }
        .ss-grid { display: grid; grid-template-columns: 240px 1fr; min-height: calc(100vh - 56px); }
        .ss-kpi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .ss-row { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; }
        @media (max-width: 900px) {
          .ss-grid { grid-template-columns: 1fr; }
          .ss-kpi { grid-template-columns: repeat(2, 1fr); }
          .ss-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Top nav */}
      <div style={{ background: nav, color: navText, height: 56, display: "flex", alignItems: "center", paddingLeft: 20, paddingRight: 20, gap: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#fff", color: nav, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: fontDisplay, fontWeight: 700, fontSize: 15 }}>S</div>
          <div style={{ fontFamily: fontDisplay, fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
            Stock<span style={{ color: "#F4C95D" }}>Sense</span>
          </div>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
          {[
            { label: "Dashboard", active: true },
            { label: "Replenish" },
            { label: "Margins" },
            { label: "Suppliers" },
            { label: "Orders" },
            { label: "Reports" },
          ].map((t) => (
            <div key={t.label} className="nav-tab" style={{
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 6,
              cursor: "pointer",
              color: t.active ? navTextActive : navText,
              background: t.active ? navAccent : "transparent",
            }}>{t.label}</div>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: "#3fd96f", display: "inline-block" }} title="Sync live" />
          <div style={{ position: "relative", display: "inline-flex" }}>
            <BellIcon color="#fff" size={18} />
            {notifs.length > 0 && (
              <span style={{ position: "absolute", top: -4, right: -6, background: "#F4C95D", color: nav, fontSize: 10, fontWeight: 700, borderRadius: 9999, padding: "1px 5px", minWidth: 16, textAlign: "center" }}>{notifs.length}</span>
            )}
          </div>
          <div style={{ width: 28, height: 28, borderRadius: 9999, background: "#5A4078", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>JP</div>
        </div>
      </div>

      <div className="ss-grid">
        {/* Sidebar */}
        <aside style={{ background: sidebarBg, borderRight: `1px solid ${border}`, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 18 }}>
          <SideGroup label="Quick access" items={[
            { label: "Overview", active: true, icon: <LayersIcon size={14} color={sidebarText} /> },
            { label: "Replenish", icon: <BoxIcon size={14} color={sidebarText} /> },
            { label: "True margin", icon: <TrendIcon size={14} color={sidebarText} /> },
            { label: "Suppliers", icon: <ShipIcon size={14} color={sidebarText} /> },
          ]} />
          <SideGroup label="By source" items={[
            { label: "Local production", icon: <FactoryIcon size={14} color={green} />, badge: String(sourceCounts.Local || 0) },
            { label: "China imports", icon: <ShipIcon size={14} color={red} />, badge: String(sourceCounts.China || 0) },
            { label: "Thailand", icon: <ShipIcon size={14} color={amber} />, badge: String(sourceCounts.Thailand || 0) },
          ]} />
          <SideGroup label="Alerts" items={[
            { label: "Behind cover", icon: <AlertIcon size={14} color={red} />, badge: String(act.filter((s) => s.reason === "late").length) },
            { label: "CNY at risk", icon: <AlertIcon size={14} color={amber} />, badge: String(act.filter((s) => s.reason === "cny").length) },
          ]} />
          <div style={{ marginTop: "auto", fontSize: 11, color: muted, lineHeight: 1.5 }}>
            Last update<br /><span style={{ color: textDark, fontWeight: 600 }}>just now</span>
          </div>
        </aside>

        {/* Main */}
        <main style={{ padding: 20, minWidth: 0 }}>
          {/* Filter bar */}
          <div className="rise" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <FilterPill label="Mar 1 → May 30, 2026" />
            <FilterPill label="All sources" />
            <FilterPill label="All SKUs" />
            <div style={{ flex: 1 }} />
            {actioned.length > 0 && (
              <button onClick={reset} style={{ fontSize: 11, color: muted, background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: fontBody }}>
                Reset demo
              </button>
            )}
          </div>

          {/* Title */}
          <div className="rise" style={{ marginTop: 16, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h1 style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>Dashboard</h1>
            <span style={{ fontSize: 12, color: muted }}>Upstream supply intelligence</span>
          </div>

          {/* KPI strip */}
          <div className="rise ss-kpi" style={{ marginTop: 14 }}>
            <KpiTile
              icon={<AlertIcon size={18} color="#fff" />}
              tile={red}
              label="Need action"
              value={String(linesShort)}
              sub={`of ${rows.length} active SKUs`}
            />
            <KpiTile
              icon={<TrendIcon size={18} color="#fff" />}
              tile={worstGapWks > 5 ? red : amber}
              label="Worst gap"
              value={`${worstGapWks.toFixed(0)}`}
              valueSuffix=" wks"
              sub="cover vs lead time"
            />
            <KpiTile
              icon={<SparkIcon size={18} color="#fff" />}
              tile={avgMargin < 0.4 ? amber : green}
              label="Avg true margin"
              value={pct(avgMargin)}
              sub="after landed cost"
            />
            <KpiTile
              icon={<LayersIcon size={18} color="#fff" />}
              tile={blue}
              label="Supply lines"
              value={`${sourceCounts.Local || 0}/${sourceCounts.China || 0}/${sourceCounts.Thailand || 0}`}
              sub="local / CN / TH"
            />
          </div>

          {/* Row 1: Replenish + Source coverage */}
          <div className="rise ss-row" style={{ marginTop: 16 }}>
            <Panel
              title="Replenish now"
              sub={rows.length === 0 ? "Everything actioned — your supply lines are caught up." : "Each line judged against its own supply clock · click an action pill to take it"}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {rows.map((s) => (
                  <div key={s.id} className="card-hover" style={{ borderRadius: 10, padding: "10px 12px", background: "#FBFAF7", border: `1px solid ${border}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                        {s.source === "Local" ? <FactoryIcon color={srcColor(s.source)} /> : <ShipIcon color={srcColor(s.source)} />}
                        <span style={{ fontWeight: 600, fontSize: 13.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
                      </div>
                      {s.cover < s.leadWk / 4 + 0.5 || s.reason === "cny" ? (
                        <button
                          onClick={() => take(s)}
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: 9999,
                            color: "#fff",
                            background: tone(s.reason),
                            border: "none",
                            cursor: "pointer",
                            fontFamily: fontBody,
                            flexShrink: 0,
                          }}
                        >
                          {action(s)} →
                        </button>
                      ) : (
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 9999, color: tone(s.reason), border: `1px solid ${tone(s.reason)}33`, flexShrink: 0 }}>
                          {s.source}
                        </span>
                      )}
                    </div>
                    <div style={{ color: muted, fontSize: 11.5, marginTop: 4 }}>
                      {s.cover.toFixed(1)} wks cover · {s.leadWk}-wk lead · {pct(s.margin)} margin
                    </div>
                    <div style={{ marginTop: 6, position: "relative", height: 5, background: "#EFE9DD", borderRadius: 9999, overflow: "hidden" }}>
                      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${Math.min(100, (s.cover / s.leadWk) * 100)}%`, background: tone(s.reason), borderRadius: 9999, transition: "width .4s ease" }} />
                    </div>
                    {(s.reason === "late" || s.reason === "cny" || s.reason === "produce") && (
                      <div style={{ color: tone(s.reason), fontSize: 11.5, marginTop: 6, fontWeight: 500 }}>{s.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </Panel>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Panel title="Supply coverage" sub="Healthy SKUs by source">
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Donut percent={overallHealthPct} color={overallHealthPct > 60 ? green : amber} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    {sourceHealth.map((s) => (
                      <div key={s.src} style={{ fontSize: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: 2, background: srcColor(s.src), display: "inline-block" }} />
                            {s.src}
                          </span>
                          <span style={{ color: muted }}>{s.ok}/{s.total}</span>
                        </div>
                        <div style={{ marginTop: 4, height: 4, background: "#EFE9DD", borderRadius: 9999, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${s.pct * 100}%`, background: srcColor(s.src), borderRadius: 9999, transition: "width .4s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>

              <Panel title="Recent alerts" sub={`${notifs.length} active`}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {notifs.length === 0 && <div style={{ color: muted, fontSize: 12 }}>All clear.</div>}
                  {notifs.map((n, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, alignItems: "flex-start", padding: "6px 0", borderTop: i === 0 ? "none" : `1px solid ${border}` }}>
                      <span style={{ width: 6, height: 6, borderRadius: 9999, background: n.tone, marginTop: 6, flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600 }}>{n.title}</div>
                        <div style={{ color: muted, fontSize: 11.5 }}>{n.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>

          {/* Row 2: True margin + Ask */}
          <div className="rise ss-row" style={{ marginTop: 16 }}>
            <Panel title="True margin" sub="After production or landed cost — not shelf price">
              <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${border}` }}>
                {byMargin.map((s, i) => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#FBFAF7", borderTop: i ? `1px solid ${border}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, minWidth: 0 }}>
                      <span style={{ width: 6, height: 6, borderRadius: 9, background: srcColor(s.source), display: "inline-block", flexShrink: 0 }} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                      <div style={{ color: muted, fontSize: 11.5 }}>{TT(s.sell)} → {TT(s.cost)}</div>
                      <div style={{ fontFamily: fontDisplay, fontWeight: 600, width: 44, textAlign: "right", color: s.margin < 0.4 ? red : green }}>{pct(s.margin)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Ask StockSense" sub="Plain English — your supply, your numbers">
              <div style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 10, padding: "8px 10px", background: "#FBFAF7", border: `1px solid ${border}` }}>
                <SearchIcon size={15} color={muted} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && query.trim() && ask(query)}
                  placeholder="Ask about supply…"
                  style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", fontSize: 13, color: textDark, fontFamily: fontBody }}
                />
                <button onClick={() => query.trim() && ask(query)} style={{ borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 600, background: nav, color: "#fff", border: "none", cursor: "pointer", fontFamily: fontBody }}>
                  Ask
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {examples.map((e) => (
                  <button key={e} onClick={() => ask(e)} className="chip" style={{ borderRadius: 9999, padding: "4px 10px", fontSize: 11, fontWeight: 500, background: "transparent", border: `1px solid ${border}`, color: muted, cursor: "pointer", fontFamily: fontBody }}>
                    {e}
                  </button>
                ))}
              </div>
              {answer && (
                <div style={{ marginTop: 12, borderRadius: 10, padding: 14, background: ink, color: bg }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, color: "#F4C95D" }}>
                    <SparkIcon size={13} color="#F4C95D" />
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{answer.title}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.4, margin: 0, marginBottom: 8, opacity: 0.95 }}>{answer.lead}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
                    {answer.rows.map((r, i) => (
                      <li key={i} style={{ fontSize: 12, display: "flex", gap: 6, opacity: 0.85 }}>
                        <span style={{ color: "#F4C95D" }}>▸</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: 12, paddingTop: 6, borderTop: "1px solid rgba(255,255,255,.12)", opacity: 0.7 }}>{answer.action}</div>
                </div>
              )}
            </Panel>
          </div>

          {/* Actions taken */}
          {actioned.length > 0 && (
            <div className="rise" style={{ marginTop: 16 }}>
              <Panel title="Actions taken" sub="What you queued in this session — PO drafts and production slots">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {actioned.map((a) => (
                    <div key={a.id} style={{ borderRadius: 8, padding: "10px 12px", background: "#FBFAF7", border: `1px solid ${border}`, borderLeft: `3px solid ${srcColor(a.source)}` }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 9999, background: green, color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>
                          <span style={{ fontWeight: 600, fontSize: 13 }}>{a.name}</span>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: srcColor(a.source) }}>{a.verb}</span>
                      </div>
                      <div style={{ color: muted, fontSize: 11.5, marginTop: 3, paddingLeft: 26 }}>{a.detail}</div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          )}

          <div style={{ height: 28 }} />
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", background: ink, color: bg, padding: "10px 16px", borderRadius: 9999, fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 50, animation: "rise .25s ease both", fontFamily: fontBody, maxWidth: "90vw" }}>
          <span style={{ color: green }}>●</span>
          {toast}
        </div>
      )}
    </div>
  );
}

/* ── small components ── */

function FilterPill({ label }: { label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, padding: "5px 10px", background: card, border: `1px solid ${border}`, borderRadius: 6, color: textDark }}>
      {label}
      <span style={{ color: muted, fontSize: 10 }}>▾</span>
    </span>
  );
}

function KpiTile({ icon, tile, label, value, valueSuffix, sub }: { icon: React.ReactNode; tile: string; label: string; value: string; valueSuffix?: string; sub: string }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ width: 38, height: 38, borderRadius: 8, background: tile, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
        <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, lineHeight: 1.1, marginTop: 2, color: textDark }}>
          {value}{valueSuffix && <span style={{ fontSize: 12, color: muted, marginLeft: 3, fontFamily: fontBody, fontWeight: 500 }}>{valueSuffix}</span>}
        </div>
        <div style={{ fontSize: 10.5, color: muted, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function Panel({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 600, margin: 0 }}>{title}</h2>
        {sub && <span style={{ fontSize: 11, color: muted }}>{sub}</span>}
      </div>
      {children}
    </div>
  );
}

function SideGroup({ label, items }: { label: string; items: { label: string; active?: boolean; icon?: React.ReactNode; badge?: string }[] }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#9a8e7e", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 10px 6px 10px" }}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {items.map((it) => (
          <div key={it.label} className="side-item" style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 10px",
            borderRadius: 6,
            fontSize: 13,
            cursor: "pointer",
            color: it.active ? textDark : sidebarText,
            background: it.active ? card : "transparent",
            fontWeight: it.active ? 600 : 500,
          }}>
            {it.icon}
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.badge && <span style={{ fontSize: 10, fontWeight: 700, color: muted, background: bg, padding: "1px 6px", borderRadius: 9999 }}>{it.badge}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Donut({ percent, color }: { percent: number; color: string }) {
  const r = 32;
  const c = 2 * Math.PI * r;
  const off = c - (percent / 100) * c;
  return (
    <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="40" cy="40" r={r} stroke="#EFE9DD" strokeWidth="8" fill="none" />
        <circle cx="40" cy="40" r={r} stroke={color} strokeWidth="8" fill="none" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ transition: "stroke-dashoffset .5s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{percent}</div>
        <div style={{ fontSize: 9, color: muted, fontWeight: 600 }}>%</div>
      </div>
    </div>
  );
}
