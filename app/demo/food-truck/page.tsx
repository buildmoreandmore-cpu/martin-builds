import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food Truck Operator Dashboard | martin.builds Demo",
  description:
    "Live demo of a solo food truck operator dashboard — daily briefing, item performance, gig schedule, catering inbox, prep lists, and regulars. Built by martin.builds.",
};

/* ── palette tokens (matches the other demos: soft cream bg, white cards, soft borders) ── */
const bg = "#FAFAF8";
const card = "#ffffff";
const cardBorder = "#E8E3DC";
const textDark = "#1c1917";
const muted = "#78716c";
const lineSoft = "#EFEAE0";
const paprika = "#c0421f";
const paprikaSoft = "#fef0eb";
const paprikaText = "#8a2a13";
const mustard = "#d29a2b";
const mustardSoft = "#fef3c7";
const moss = "#4d5c2e";
const fontDisplay = "'Fraunces', serif";
const fontBody = "'DM Sans', sans-serif";
const fontMono = "'DM Mono', monospace";

/* ── small helpers ── */
function Tag({ label, variant = "default" }: { label: string; variant?: "default" | "hot" | "confirmed" }) {
  const styles =
    variant === "confirmed"
      ? { bg: "#dcfce7", color: "#166534" }
      : variant === "hot"
      ? { bg: paprikaSoft, color: paprikaText }
      : { bg: "#f5f5f4", color: muted };
  return (
    <span
      style={{
        backgroundColor: styles.bg,
        color: styles.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 9999,
        whiteSpace: "nowrap",
        fontFamily: fontBody,
      }}
    >
      {label}
    </span>
  );
}

function KpiCard({ value, label, sub, accent, currency, delay }: { value: string; label: string; sub: string; accent: string; currency?: boolean; delay: string }) {
  return (
    <div
      style={{
        backgroundColor: card,
        border: `1px solid ${cardBorder}`,
        borderRadius: 16,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        animation: "fadeUp 0.5s ease-out",
        animationDelay: delay,
        animationFillMode: "both",
        fontFamily: fontBody,
      }}
    >
      <span style={{ fontSize: 28, fontWeight: 700, color: textDark, fontFamily: fontDisplay, letterSpacing: "-0.02em" }}>
        {currency && <span style={{ fontSize: 18, color: muted, marginRight: 2, fontWeight: 500 }}>$</span>}
        {value}
      </span>
      <span style={{ fontSize: 13, fontWeight: 500, color: muted }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: accent }}>{sub}</span>
    </div>
  );
}

/* ═══════════════ PAGE ═══════════════ */

export default function FoodTruckDemo() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        html body { background: ${bg} !important; background-color: ${bg} !important; color: ${textDark} !important; font-family: ${fontBody} !important; }
        body::before { display: none !important; }
        section { padding-left: unset !important; padding-right: unset !important; }
        h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ft-kpi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .ft-main { display: grid; grid-template-columns: 1.6fr 1fr; gap: 24px; }
        .ft-col { display: flex; flex-direction: column; gap: 24px; }
        .ft-hero { display: grid; grid-template-columns: 1.4fr 1fr; gap: 32px; align-items: end; }
        .ft-service-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ft-regulars { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .ft-wrap { padding: 32px 24px 120px 24px; }
        @media (max-width: 1024px) {
          .ft-kpi { grid-template-columns: repeat(2, 1fr); }
          .ft-main { grid-template-columns: 1fr; }
          .ft-hero { grid-template-columns: 1fr; gap: 20px; }
          .ft-service-meta { grid-template-columns: 1fr; }
          .ft-regulars { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .ft-kpi { grid-template-columns: 1fr; }
          .ft-wrap { padding: 20px 14px 120px 14px; }
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: bg, color: textDark, fontFamily: fontBody, fontSize: 15, lineHeight: 1.5 }}>
        <div className="ft-wrap" style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header */}
          <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, background: paprika, color: "#fff", display: "grid", placeItems: "center", fontFamily: fontDisplay, fontWeight: 700, fontSize: 16, borderRadius: 8 }}>
                S&amp;K
              </div>
              <div>
                <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em" }}>Smoke &amp; Kettle</div>
                <div style={{ fontFamily: fontMono, fontSize: 11, color: muted, marginTop: 2 }}>BBQ + Lemonade · Atlanta · Truck #02</div>
              </div>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", background: card, border: `1px solid ${cardBorder}`, borderRadius: 9999, fontFamily: fontMono, fontSize: 11, color: muted }}>
              <span style={{ width: 7, height: 7, background: "#22c55e", borderRadius: "50%", display: "inline-block" }} />
              Open · Service in 14m · Sat Sept 13
            </div>
          </header>

          {/* Hero — briefing */}
          <section style={{ marginBottom: 24, animation: "fadeUp 0.5s ease-out backwards" }}>
            <div className="ft-hero">
              <div>
                <div style={{ fontFamily: fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: paprika, marginBottom: 12 }}>
                  Today&rsquo;s Briefing · 6:42a
                </div>
                <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: textDark, margin: "0 0 14px 0" }}>
                  You&rsquo;re set up for a{" "}
                  <span style={{ color: paprika, fontStyle: "italic", fontWeight: 600 }}>$2,400 day</span>.
                </h1>
                <p style={{ fontSize: 15, color: muted, lineHeight: 1.6, maxWidth: 540, margin: 0 }}>
                  Westside pop-up drew 480 last Saturday. Bring 50 lbs brisket (you ran out at 4:40 last week) and double the peach lemonade. Three catering DMs landed overnight — one looks real.
                </p>
              </div>

              <div style={{ background: card, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: 22 }}>
                <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.16em", color: muted, marginBottom: 12 }}>
                  3 things need you
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "Bump brisket to 50 lbs · forecast confirms",
                    "Reply to Sarah K. wedding inquiry · real lead",
                    "Approve corporate-lunch Q4 reply · drafted 7:20a",
                  ].map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontFamily: fontMono, fontSize: 11, color: paprika, fontWeight: 700, marginTop: 2 }}>{i + 1}.</span>
                      <span style={{ fontSize: 13.5, color: textDark, lineHeight: 1.5 }}>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* KPI strip */}
          <div className="ft-kpi" style={{ marginBottom: 24 }}>
            <KpiCard value="1,847" currency label="Last Saturday" sub="↑ 18% vs avg" accent={moss} delay="0.05s" />
            <KpiCard value="1,562" currency label="7-day average" sub="↑ 6% vs last month" accent={moss} delay="0.1s" />
            <KpiCard value="9" label="Upcoming bookings" sub="3 catering · 6 popups" accent={muted} delay="0.15s" />
            <KpiCard value="6,250" currency label="Catering pipeline" sub="2 awaiting your reply" accent={paprika} delay="0.2s" />
          </div>

          {/* Main grid */}
          <div className="ft-main">
            {/* LEFT */}
            <div className="ft-col">

              {/* Today's Service */}
              <Panel title="Today's Service" meta="11:00a — 4:00p · Westside Provisions" delay="0.25s">
                <div className="ft-service-meta" style={{ padding: "0 22px 18px" }}>
                  <ServiceMeta label="Generator" value="Honda EU7000 · ✓ Fueled" />
                  <ServiceMeta label="On Truck" value="Marcus + Mom" />
                  <ServiceMeta label="Forecast" value="High 78° · clear" />
                </div>
                <div style={{ padding: "16px 22px 22px", borderTop: `1px solid ${lineSoft}`, display: "flex", flexDirection: "column", gap: 14 }}>
                  <ItemRow rank="01" name="Loaded Brisket Fries" pct={100} count="62" sub="last sat" />
                  <ItemRow rank="02" name="Pulled Pork Sandwich" pct={71} count="44" sub="last sat" />
                  <ItemRow rank="03" name="Brisket Plate" pct={56} count="35" sub="last sat" />
                  <ItemRow rank="04" name="Peach Lemonade (32oz)" pct={89} count="55" sub="last sat" />
                  <ItemRow rank="05" name="Banana Pudding (Mom's)" pct={38} count="24" sub="last sat" last />
                </div>
              </Panel>

              {/* Schedule */}
              <Panel title="The Calendar" meta="Next 14 days" delay="0.3s">
                <div>
                  <Gig day="Today" num="13" month="Sep" name="Westside Provisions Pop-up" where="1198 Howell Mill Rd · 11a–4p" tags={[{ label: "Confirmed", v: "confirmed" }, { label: "Top earning spot", v: "hot" }]} eta="$2,400 est." />
                  <Gig day="Sat" num="20" month="Sep" name="Pickleball Open · Piedmont" where="Piedmont Park Courts · 12p–6p" tags={[{ label: "Confirmed", v: "confirmed" }, { label: "Sandwich crowd", v: "default" }]} eta="$1,800 est." />
                  <Gig day="Fri" num="26" month="Sep" name="Hartwell Wedding · Catering" where="Buckhead estate · 5p–9p" tags={[{ label: "Deposit paid", v: "confirmed" }, { label: "120 guests", v: "hot" }]} eta="$3,400 flat" />
                  <Gig day="Sun" num="28" month="Sep" name="Grant Park Farmers Market" where="600 Cherokee Ave · 9a–1p" tags={[{ label: "Reply pending", v: "default" }]} eta="Awaiting" last />
                </div>
              </Panel>

            </div>

            {/* RIGHT */}
            <div className="ft-col">

              {/* Catering Inbox */}
              <Panel title="Catering Inbox" meta="3 new · auto-replied to 1" delay="0.35s">
                <Inbox dot={paprika} from="Sarah K. — wedding inquiry" preview={`"June 14, 80 guests, BBQ buffet style. Read about you on Instagram..."`} time="8:42a" badge="real lead" badgeColor={paprika} />
                <Inbox dot={mustard} from="Atlanta Tech Co. — corporate lunch" preview="Recurring monthly · 60 ppl · drafted reply with Q4 dates, awaiting your approval." time="7:20a" badge="review draft" badgeColor={mustard} />
                <Inbox dot="#d6d3d1" from="Brian M. — backyard BBQ" preview="15 people, 2 weeks out. Below your minimum — auto-declined politely with referral." time="11:14p" badge="handled" badgeColor={muted} last />
              </Panel>

              {/* Cases on Hand (white card now, paprika accent) */}
              <Panel title="Cases on Hand" meta="Re-up by Thurs 6pm" delay="0.4s">
                <div style={{ padding: "0 22px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
                  <PrepRow what="Brisket (whole packer)" qty="52 lb" source="Springer · ↑ today" />
                  <PrepRow what="Pork shoulder" qty="38 lb" source="Springer" />
                  <PrepRow what="Brioche buns" qty="12 dz" source="H&F · low" warn />
                  <PrepRow what="Russets (fries)" qty="80 lb" source="restaurant depot" />
                  <PrepRow what="Peaches (lemonade)" qty="22 lb" source="DTL Farmers Mkt" last />
                </div>
                <div style={{ padding: "12px 22px", borderTop: `1px solid ${lineSoft}`, fontFamily: fontMono, fontSize: 11, color: paprika, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Forecast: today needs +12 lb brisket, +8 dz buns
                </div>
              </Panel>

              {/* Regulars */}
              <Panel title="Saturday Regulars" meta="Westside spot" delay="0.45s">
                <div className="ft-regulars" style={{ padding: "0 22px 18px" }}>
                  <Regular name="Devon T." visits="14 visits" last="Always brisket plate. 9/6." />
                  <Regular name="The Patel family" visits="11 visits" last="Two pork sandwiches + pudding." />
                  <Regular name="Aisha B." visits="9 visits" last="Brought 4 friends last week." />
                  <Regular name="Coach Reggie" visits="8 visits" last="Skipped 9/6. SMS nudge ready." />
                </div>
              </Panel>

            </div>
          </div>

          {/* Watermark (matches restaurant) */}
          <div style={{ textAlign: "center", padding: "28px 0 0 0", animation: "fadeUp 0.5s ease-out 0.6s backwards" }}>
            <a href="/discovery-call" style={{ fontSize: 13, color: muted, textDecoration: "none", fontFamily: fontBody }}>
              Built by <span style={{ fontWeight: 600, color: textDark }}>martinbuilds.ai</span>
            </a>
          </div>
        </div>

        {/* Fixed CTA (matches restaurant pattern) */}
        <a
          href="/discovery-call"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: paprika,
            color: "#fff",
            padding: "14px 22px",
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: 13.5,
            fontFamily: fontBody,
            textDecoration: "none",
            boxShadow: "0 8px 28px rgba(192,66,31,0.32)",
            zIndex: 100,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Book a 15-min call →
        </a>
      </main>
    </>
  );
}

/* ── sub components ── */
function Panel({ title, meta, children, delay }: { title: string; meta?: string; children: React.ReactNode; delay?: string }) {
  return (
    <div style={{ background: card, border: `1px solid ${cardBorder}`, borderRadius: 16, animation: `fadeUp 0.5s ease-out ${delay || "0s"} backwards` }}>
      <div style={{ padding: "18px 22px", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 19, letterSpacing: "-0.015em" }}>{title}</div>
        {meta && <div style={{ fontFamily: fontMono, fontSize: 11, color: muted }}>{meta}</div>}
      </div>
      {children}
    </div>
  );
}

function ServiceMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontFamily: fontMono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: muted, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, color: textDark, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function ItemRow({ rank, name, pct, count, sub, last }: { rank: string; name: string; pct: number; count: string; sub: string; last?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 130px auto", gap: 12, alignItems: "center", paddingBottom: last ? 0 : 12, borderBottom: last ? "none" : `1px dashed ${lineSoft}` }}>
      <div style={{ fontFamily: fontMono, fontSize: 13, color: paprika, fontWeight: 600, textAlign: "center" }}>{rank}</div>
      <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15 }}>{name}</div>
      <div style={{ width: 130, height: 6, background: "#f4ede0", borderRadius: 9999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: paprika, borderRadius: 9999 }} />
      </div>
      <div style={{ fontFamily: fontMono, fontSize: 12, color: textDark, fontWeight: 600, minWidth: 64, textAlign: "right" }}>
        {count} <span style={{ color: muted, marginLeft: 4, fontWeight: 400 }}>{sub}</span>
      </div>
    </div>
  );
}

function Gig({ day, num, month, name, where, tags, eta, last }: { day: string; num: string; month: string; name: string; where: string; tags: { label: string; v: "default" | "hot" | "confirmed" }[]; eta: string; last?: boolean }) {
  return (
    <div style={{ padding: "16px 22px", borderTop: `1px solid ${lineSoft}`, display: "grid", gridTemplateColumns: "56px 1fr auto", gap: 14, alignItems: "center" }}>
      <div style={{ fontFamily: fontDisplay, fontWeight: 600, textAlign: "center", lineHeight: 1 }}>
        <div style={{ fontFamily: fontMono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: paprika, marginBottom: 4 }}>{day}</div>
        <div style={{ fontSize: 26, color: textDark }}>{num}</div>
        <div style={{ fontFamily: fontMono, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.14em", color: muted, marginTop: 2 }}>{month}</div>
      </div>
      <div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{name}</div>
        <div style={{ fontSize: 12.5, color: muted, marginBottom: 8 }}>{where}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map((t, i) => <Tag key={i} label={t.label} variant={t.v} />)}
        </div>
      </div>
      <div style={{ textAlign: "right", fontFamily: fontMono, fontSize: 12, color: moss, fontWeight: 600, whiteSpace: "nowrap" }}>{eta}</div>
      {last && null}
    </div>
  );
}

function Inbox({ dot, from, preview, time, badge, badgeColor, last }: { dot: string; from: string; preview: string; time: string; badge: string; badgeColor: string; last?: boolean }) {
  return (
    <div style={{ padding: "14px 22px", borderTop: `1px solid ${lineSoft}`, display: "grid", gridTemplateColumns: "8px 1fr auto", gap: 12, alignItems: "start" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 6, background: dot, display: "inline-block" }} />
      <div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{from}</div>
        <div style={{ fontSize: 12.5, color: muted, lineHeight: 1.45 }}>{preview}</div>
      </div>
      <div style={{ fontFamily: fontMono, fontSize: 10, color: muted, textAlign: "right", whiteSpace: "nowrap", lineHeight: 1.5 }}>
        {time}
        <div style={{ color: badgeColor, fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{badge}</div>
      </div>
      {last && null}
    </div>
  );
}

function PrepRow({ what, qty, source, warn, last }: { what: string; qty: string; source: string; warn?: boolean; last?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 14, alignItems: "baseline", paddingBottom: last ? 0 : 10, borderBottom: last ? "none" : `1px dashed ${lineSoft}` }}>
      <div style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 500 }}>{what}</div>
      <div style={{ fontFamily: fontMono, fontSize: 14, color: warn ? paprika : textDark, fontWeight: 600 }}>{qty}</div>
      <div style={{ fontFamily: fontMono, fontSize: 10, color: muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{source}</div>
    </div>
  );
}

function Regular({ name, visits, last }: { name: string; visits: string; last: string }) {
  return (
    <div style={{ background: bg, border: `1px solid ${cardBorder}`, borderRadius: 12, padding: "12px 14px" }}>
      <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{name}</div>
      <div style={{ fontFamily: fontMono, fontSize: 10.5, color: paprika, textTransform: "uppercase", letterSpacing: "0.12em" }}>{visits}</div>
      <div style={{ fontSize: 12, color: muted, marginTop: 6 }}>{last}</div>
    </div>
  );
}
