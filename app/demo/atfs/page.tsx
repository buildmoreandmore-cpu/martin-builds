"use client";

import { useState, useMemo } from "react";

/*
  StockSense — Supply edition. Demo for ATFS Ltd / ChopSticks.
  Built under martin.builds.
  Their existing software is downstream (what each store needs).
  THIS is upstream and source-aware: every product has a different supply
  clock — local production vs China import vs Thailand — and needs a
  different action. Synthetic data on real SKUs. Production: seeds from
  purchase + production + sales history.
*/

/* ── palette tokens (matches martin.builds demo dashboards) ── */
const bg = "#FAFAF8";
const card = "#ffffff";
const border = "#E8E3DC";
const green = "#16a34a";
const amber = "#d97706";
const red = "#dc2626";
const blue = "#2563eb";
const muted = "#78716c";
const textDark = "#1a1a1a";
const ink = "#1c1917";
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

/* ── inline SVG icons (martin-builds has no icon lib) ── */
const Icon = ({ d, size = 14, color = "currentColor" }: { d: string; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);
const SearchIcon = (p: { size?: number; color?: string }) => (
  <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke={p.color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FactoryIcon = (p: { color?: string }) => <Icon d="M2 20V8l8 5V8l8 5V8l4 12H2Z" color={p.color} />;
const ShipIcon = (p: { color?: string }) => <Icon d="M2 20a2.4 2.4 0 0 0 2 1c1.3 0 2-1 4-1s2.7 1 4 1 2-1 4-1 2.7 1 4 1a2.4 2.4 0 0 0 2-1M3 14h18l-2-5H5l-2 5Zm9-9V2" color={p.color} />;
const SparkIcon = (p: { color?: string }) => <Icon d="M12 3v18M3 12h18" color={p.color} />;
const ArrowIcon = () => <Icon d="M5 12h14M13 5l7 7-7 7" color="#ffffff" />;
const CalIcon = (p: { color?: string }) => <Icon d="M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" color={p.color} />;

export default function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<null | { title: string; lead: string; rows: string[]; action: string }>(null);

  const rows = useMemo(
    () => SKUS.map((s) => ({ ...s, margin: (s.sell - s.cost) / s.sell })).sort((a, b) => a.cover - b.cover),
    []
  );
  const act = rows.filter((s) => s.cover < s.leadWk / 4 + 0.5 || s.reason === "cny");
  const byMargin = [...rows].sort((a, b) => a.margin - b.margin);

  const examples = [
    "What do I need to replenish now?",
    "What needs a production run?",
    "What's affected by Chinese New Year?",
  ];

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
        .chip { transition: all .15s ease } .chip:hover { background: ${ink}; color: ${bg} }
        .card-hover { transition: transform .15s ease } .card-hover:hover { transform: translateY(-2px) }
        input::placeholder { color: #9a9086 }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px" }}>
        {/* Header */}
        <header className="rise">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Stock<span style={{ color: red }}>Sense</span>
            </div>
            <span style={{ background: green, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 9999, letterSpacing: "0.05em", textTransform: "uppercase" }}>Demo</span>
          </div>
          <div style={{ color: muted, fontSize: 13, marginTop: 4 }}>
            Supply intelligence · ATFS Ltd · what to make, what to import, and when
          </div>
        </header>

        {/* Ask bar */}
        <div className="rise" style={{ marginTop: 24, animationDelay: "60ms" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 16, padding: "12px 16px", background: card, border: `1px solid ${border}` }}>
            <SearchIcon size={18} color={muted} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && query.trim() && ask(query)}
              placeholder="Ask about supply…"
              style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", fontSize: 16, color: textDark, fontFamily: fontBody }}
            />
            <button
              onClick={() => query.trim() && ask(query)}
              style={{ borderRadius: 12, padding: "6px 12px", fontSize: 14, fontWeight: 600, background: red, color: "#fff", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fontBody }}
            >
              Ask <ArrowIcon />
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {examples.map((e) => (
              <button
                key={e}
                onClick={() => ask(e)}
                className="chip"
                style={{ borderRadius: 9999, padding: "6px 12px", fontSize: 12, fontWeight: 500, background: card, border: `1px solid ${border}`, color: muted, cursor: "pointer", fontFamily: fontBody }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Answer */}
        {answer && (
          <div className="rise" style={{ marginTop: 16, borderRadius: 16, padding: 20, background: ink, color: bg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: amber }}>
              <SparkIcon color={amber} />
              <span style={{ fontSize: 14, fontWeight: 700 }}>{answer.title}</span>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.4, marginBottom: 12, opacity: 0.95 }}>{answer.lead}</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
              {answer.rows.map((r, i) => (
                <li key={i} style={{ fontSize: 14, display: "flex", gap: 8, opacity: 0.85 }}>
                  <span style={{ color: red }}>▸</span>
                  {r}
                </li>
              ))}
            </ul>
            <div style={{ fontSize: 14, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.12)", opacity: 0.7 }}>{answer.action}</div>
          </div>
        )}

        {/* Replenish */}
        <section className="rise" style={{ marginTop: 28, animationDelay: "120ms" }}>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 600, margin: 0 }}>Replenish now</h2>
          <div style={{ color: muted, fontSize: 12, marginTop: 4, marginBottom: 12 }}>
            Each line judged against its own supply clock — local, China, or Thailand
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rows.map((s) => (
              <div key={s.id} className="card-hover" style={{ borderRadius: 12, padding: "12px 16px", background: card, border: `1px solid ${border}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {s.source === "Local" ? <FactoryIcon color={srcColor(s.source)} /> : <ShipIcon color={srcColor(s.source)} />}
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 9999, color: tone(s.reason), border: `1px solid ${tone(s.reason)}33` }}>
                    {s.cover < s.leadWk / 4 + 0.5 || s.reason === "cny" ? action(s) : s.source}
                  </span>
                </div>
                <div style={{ color: muted, fontSize: 12, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <CalIcon color={muted} />
                  {s.cover.toFixed(1)} wks cover · {s.leadWk}-wk lead · {pct(s.margin)} margin
                </div>
                {(s.reason === "late" || s.reason === "cny" || s.reason === "produce") && (
                  <div style={{ color: tone(s.reason), fontSize: 12, marginTop: 6, fontWeight: 500 }}>{s.note}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* True margin */}
        <section className="rise" style={{ marginTop: 28, animationDelay: "180ms" }}>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 600, margin: 0 }}>True margin</h2>
          <div style={{ color: muted, fontSize: 12, marginTop: 4, marginBottom: 12 }}>
            After production cost or full landed cost — not the shelf price
          </div>
          <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${border}` }}>
            {byMargin.map((s, i) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: card,
                  borderTop: i ? `1px solid ${border}` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 9, background: srcColor(s.source), display: "inline-block" }} />
                  {s.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ color: muted, fontSize: 12 }}>{TT(s.sell)} → {TT(s.cost)}</div>
                  <div style={{ fontFamily: fontDisplay, fontWeight: 600, width: 48, textAlign: "right", color: s.margin < 0.4 ? red : green }}>{pct(s.margin)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: 36, marginBottom: 16, textAlign: "center", color: muted, fontSize: 12 }}>
          Upstream only — your store-order software already covers downstream.
          Production seeds from your purchase, production &amp; sales history.
        </footer>
      </div>
    </div>
  );
}
