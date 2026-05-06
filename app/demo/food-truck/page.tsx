import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Food Truck Operator Dashboard | martin.builds Demo",
  description:
    "Live demo of a solo food truck operator dashboard — daily briefing, item performance, gig schedule, catering inbox, prep lists, and regulars. Built by martin.builds.",
};

/* ── palette tokens ── */
const bg = "#FAFAF8";
const card = "#ffffff";
const ink = "#1c1917";
const muted = "#78716c";
const line = "#E8E3DC";
const lineSoft = "#EFEAE0";
const paprika = "#c0421f";
const paprikaDeep = "#8a2a13";
const mustard = "#d29a2b";
const moss = "#4d5c2e";
const fontDisplay = "'Fraunces', serif";
const fontBody = "'DM Sans', sans-serif";
const fontMono = "'DM Mono', monospace";

/* ── helpers ── */
function Tag({ label, variant = "default" }: { label: string; variant?: "default" | "hot" | "confirmed" }) {
  const styles =
    variant === "confirmed"
      ? { bg: ink, color: "#fff", border: ink }
      : variant === "hot"
      ? { bg: "transparent", color: paprika, border: paprika }
      : { bg: "#fff", color: muted, border: line };
  return (
    <span
      style={{
        fontFamily: fontMono,
        fontSize: 9.5,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        padding: "3px 8px",
        border: `1px solid ${styles.border}`,
        color: styles.color,
        background: styles.bg,
        borderRadius: 99,
      }}
    >
      {label}
    </span>
  );
}

function Stat({ label, value, currency, delta, deltaTone = "up" }: { label: string; value: string; currency?: boolean; delta: string; deltaTone?: "up" | "down" | "neutral" }) {
  const dColor = deltaTone === "down" ? paprika : deltaTone === "up" ? moss : muted;
  return (
    <div style={{ padding: "22px 24px", borderRight: `1px solid ${lineSoft}`, position: "relative" }} className="ft-stat">
      <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.14em", color: muted, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 38, lineHeight: 1, letterSpacing: "-0.02em", color: ink }}>
        {currency && <span style={{ fontSize: 22, verticalAlign: "top", marginRight: 2, fontWeight: 500, color: muted }}>$</span>}
        {value}
      </div>
      <div style={{ marginTop: 8, fontFamily: fontMono, fontSize: 11, color: dColor }}>
        {deltaTone === "down" ? "↓" : "↑"} {delta}
      </div>
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
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        html body { background: ${bg} !important; background-color: ${bg} !important; color: ${ink} !important; font-family: ${fontBody} !important; }
        body::before { display: none !important; }
        section { padding-left: unset !important; padding-right: unset !important; }
        h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .ft-stats { display: grid; grid-template-columns: repeat(4, 1fr); }
        .ft-stat:last-child { border-right: none; }
        .ft-hero-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: end; }
        .ft-main { display: grid; grid-template-columns: 1.6fr 1fr; gap: 32px; padding: 40px 0; }
        .ft-col { display: flex; flex-direction: column; gap: 28px; }
        .ft-cta { display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; align-items: center; }
        .ft-regulars { display: grid; grid-template-columns: repeat(2, 1fr); }
        .ft-service-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 1024px) {
          .ft-stats { grid-template-columns: repeat(2, 1fr); }
          .ft-stat:nth-child(2) { border-right: none; }
          .ft-stat:nth-child(1), .ft-stat:nth-child(2) { border-bottom: 1px solid ${lineSoft}; }
          .ft-hero-grid { grid-template-columns: 1fr; gap: 28px; }
          .ft-main { grid-template-columns: 1fr; gap: 28px; padding: 32px 0; }
          .ft-cta { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 640px) {
          .ft-stats { grid-template-columns: 1fr; }
          .ft-stat { border-right: none !important; border-bottom: 1px solid ${lineSoft}; }
          .ft-stat:last-child { border-bottom: none; }
          .ft-service-meta { grid-template-columns: 1fr !important; }
          .ft-regulars { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: bg, color: ink, fontFamily: fontBody, fontSize: 15, lineHeight: 1.5 }}>
        {/* Demo banner */}
        <div style={{ background: ink, color: "#fff", padding: "11px 0", textAlign: "center", fontFamily: fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", borderBottom: `1.5px solid ${paprika}` }}>
          ↓ This is a live demo by{" "}
          <Link href="/" style={{ color: mustard, textDecoration: "none", borderBottom: `1px solid ${mustard}`, paddingBottom: 1 }}>
            martin.builds
          </Link>{" "}
          · Built for food truck operators · Not a real business
        </div>

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px" }}>
          {/* Topbar */}
          <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", borderBottom: `1.5px solid ${ink}`, gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 38, height: 38, background: ink, color: bg, display: "grid", placeItems: "center", fontFamily: fontDisplay, fontWeight: 800, fontSize: 19, fontStyle: "italic", borderRadius: 2, transform: "rotate(-3deg)" }}>
                S&amp;K
              </div>
              <div style={{ lineHeight: 1.05 }}>
                <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 19, letterSpacing: "-0.01em" }}>Smoke &amp; Kettle</div>
                <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.12em", color: muted, marginTop: 2 }}>BBQ + Lemonade · Atlanta, GA · Truck #02</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 22, fontFamily: fontMono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 11px", background: ink, color: "#fff", borderRadius: 99, fontSize: 10.5 }}>
                <span style={{ width: 7, height: 7, background: "#6fc26f", borderRadius: "50%", boxShadow: "0 0 0 2px rgba(111,194,111,0.25)", animation: "breathe 2.4s ease-in-out infinite", display: "inline-block" }} />
                Open · Service in 14m
              </span>
              <span>Sat · Sept 13</span>
            </div>
          </header>

          {/* Hero / Today's briefing */}
          <section style={{ padding: "38px 0 32px", borderBottom: `1.5px solid ${ink}`, animation: "fadeUp 0.5s ease-out backwards" }}>
            <div style={{ fontFamily: fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.22em", color: paprikaDeep, marginBottom: 14 }}>Today&rsquo;s Briefing</div>
            <div className="ft-hero-grid">
              <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 0.96, letterSpacing: "-0.025em", color: ink }}>
                You&rsquo;re set up for a <em style={{ fontStyle: "italic", color: paprika, fontWeight: 600 }}>$2,400 day</em>.<br />
                Here&rsquo;s what to watch.
              </h1>
              <div style={{ background: "#FBF6EC", border: `1.5px solid ${ink}`, padding: "24px 26px", boxShadow: `6px 6px 0 ${ink}`, position: "relative" }}>
                <div style={{ position: "absolute", top: -11, left: 18, background: paprika, color: "#fff", padding: "3px 10px", fontFamily: fontMono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>Morning Note · 6:42a</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: muted }}>
                  <strong style={{ color: ink, fontWeight: 600 }}>Marcus —</strong> the <span style={{ background: "linear-gradient(transparent 60%, rgba(210,154,43,0.45) 60%)", padding: "0 2px", fontWeight: 500 }}>Westside pop-up</span> drew 480 people last Saturday. Today&rsquo;s forecast: warmer, and it&rsquo;s the last home game weekend before the Tech bye. Bring <strong style={{ color: ink, fontWeight: 600 }}>50 lbs brisket</strong> (you ran out at 4:40 last week) and double the <strong style={{ color: ink, fontWeight: 600 }}>peach lemonade</strong>. Three catering DMs landed overnight — one looks real. Service starts in 14 minutes.
                </p>
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${lineSoft}`, fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.1em", color: muted, display: "flex", justifyContent: "space-between" }}>
                  <span>Auto-generated</span>
                  <span>3 things need you →</span>
                </div>
              </div>
            </div>

            {/* Stat strip */}
            <div className="ft-stats" style={{ marginTop: 32, border: `1.5px solid ${ink}`, background: card, animation: "fadeUp 0.5s ease-out 0.1s backwards" }}>
              <Stat label="Last Saturday" value="1,847" currency delta="18% vs avg" />
              <Stat label="7-day average" value="1,562" currency delta="6% vs last month" />
              <Stat label="Upcoming bookings" value="9" delta="3 catering · 6 popups" deltaTone="neutral" />
              <Stat label="Catering pipeline" value="6,250" currency delta="2 awaiting your reply" deltaTone="neutral" />
            </div>
          </section>

          {/* Main grid */}
          <div className="ft-main">
            <div className="ft-col">
              {/* Today's Service */}
              <Panel title="Today's Service" meta="11:00a — 4:00p" delay="0.15s">
                <div className="ft-service-meta" style={{ padding: "16px 22px", background: "#F5EFE2", borderBottom: `1px dashed ${lineSoft}`, fontFamily: fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  <ServiceMeta label="Location" value="Westside Provisions, ATL" />
                  <ServiceMeta label="Generator" value="Honda EU7000 · ✓ Fueled" />
                  <ServiceMeta label="On Truck Today" value="Marcus + Mom" />
                </div>
                <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <ItemRow rank="01" name="Loaded Brisket Fries" pct={100} count="62 sold" sub="last sat" />
                  <ItemRow rank="02" name="Pulled Pork Sandwich" pct={71} count="44 sold" sub="last sat" />
                  <ItemRow rank="03" name="Brisket Plate" pct={56} count="35 sold" sub="last sat" />
                  <ItemRow rank="04" name="Peach Lemonade (32oz)" pct={89} count="55 sold" sub="last sat" />
                  <ItemRow rank="05" name="Banana Pudding (Mom's)" pct={38} count="24 sold" sub="last sat" last />
                </div>
              </Panel>

              {/* Schedule */}
              <Panel title="The Calendar" meta="Next 14 days" delay="0.2s">
                <div>
                  <Gig day="Today" num="13" month="Sep" name="Westside Provisions Pop-up" where="1198 Howell Mill Rd · 11a–4p" tags={[{ label: "Confirmed", v: "confirmed" }, { label: "Top earning spot", v: "hot" }, { label: "Walk-up", v: "default" }]} eta="$2,400 est." etaSub="based on last 4 wks" />
                  <Gig day="Sat" num="20" month="Sep" name="Pickleball Open · Piedmont" where="Piedmont Park Courts · 12p–6p" tags={[{ label: "Confirmed", v: "confirmed" }, { label: "Sandwich crowd", v: "default" }]} eta="$1,800 est." etaSub="fries → #2 here" />
                  <Gig day="Fri" num="26" month="Sep" name="Hartwell Wedding · Catering" where="Private estate · Buckhead · 5p–9p" tags={[{ label: "Deposit paid", v: "confirmed" }, { label: "120 guests", v: "hot" }]} eta="$3,400 flat" etaSub="contract signed 8/22" />
                  <Gig day="Sun" num="28" month="Sep" name="Grant Park Farmers Market" where="600 Cherokee Ave · 9a–1p" tags={[{ label: "Reply pending", v: "default" }, { label: "First time", v: "default" }]} eta="Awaiting" etaSub="vendor fee $150" last />
                </div>
              </Panel>
            </div>

            <div className="ft-col">
              {/* Catering Inbox */}
              <Panel title="Catering Inbox" meta="3 new · auto-replied to 1" delay="0.25s">
                <Inbox pip={paprika} from="Sarah K. — wedding inquiry" preview={`"Hey! Looking at June 14, 80 guests, BBQ buffet style. Read about you on Instagram..."`} time="8:42a" badge="real lead" />
                <Inbox pip={mustard} from="Atlanta Tech Co. — corporate lunch" preview="Recurring monthly · 60 ppl · drafted reply with Q4 dates, awaiting your approval." time="7:20a" badge="review draft" />
                <Inbox pip={lineSoft} from="Brian M. — backyard BBQ" preview="15 people, 2 weeks out. Below your minimum — auto-declined politely with referral." time="11:14p" badge="handled" last />
              </Panel>

              {/* Prep / Cases on Hand */}
              <div style={{ background: ink, color: "#fff", border: `1.5px solid ${ink}`, padding: "26px", position: "relative", overflow: "hidden", animation: "fadeUp 0.5s ease-out 0.3s backwards" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 18, borderBottom: "1.5px solid rgba(251,246,236,0.15)", position: "relative" }}>
                  <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22, letterSpacing: "-0.015em" }}>Cases on Hand</div>
                  <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.14em", color: mustard }}>Re-up by Thurs 6pm</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative", marginTop: 22 }}>
                  <PrepRow what="Brisket (whole, packer)" qty="52 lb" source="Springer · ↑ today" />
                  <PrepRow what="Pork shoulder" qty="38 lb" source="Springer" />
                  <PrepRow what="Brioche buns" qty="12 dz" source="H&F · low" />
                  <PrepRow what="Russets (fries)" qty="80 lb" source="restaurant depot" />
                  <PrepRow what="Peaches (lemonade)" qty="22 lb" source="DTL Farmers Mkt" last />
                </div>
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(251,246,236,0.18)", fontFamily: fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: mustard, position: "relative" }}>
                  Forecast: today&rsquo;s mix needs +12 lb brisket, +8 dz buns
                </div>
              </div>

              {/* Regulars */}
              <Panel title="Saturday Regulars" meta="Westside spot" delay="0.35s">
                <div className="ft-regulars">
                  <Regular name="Devon T." visits="14 visits" last="Always brisket plate. Last seen 9/6." />
                  <Regular name="The Patel family" visits="11 visits" last="Two pork sandwiches + a pudding." />
                  <Regular name="Aisha B." visits="9 visits" last="Brought 4 friends last week." />
                  <Regular name="Coach Reggie" visits="8 visits" last="Skipped 9/6. SMS nudge ready." />
                </div>
              </Panel>
            </div>
          </div>

          {/* Build CTA strip */}
          <div style={{ marginTop: 24, padding: "48px 40px", background: ink, color: "#fff", border: `1.5px solid ${ink}`, position: "relative", overflow: "hidden", animation: "fadeUp 0.5s ease-out 0.4s backwards" }}>
            <div style={{ position: "absolute", top: -120, right: -80, width: 320, height: 320, background: `radial-gradient(circle, ${paprika} 0%, transparent 70%)`, opacity: 0.6, pointerEvents: "none" }} />
            <div className="ft-cta">
              <div>
                <h2 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 40, lineHeight: 1, letterSpacing: "-0.025em", color: "#fff", position: "relative" }}>
                  This is what your truck&rsquo;s <em style={{ fontStyle: "italic", color: mustard, fontWeight: 600 }}>brain</em> looks like.
                </h2>
                <p style={{ marginTop: 18, fontSize: 14.5, lineHeight: 1.65, opacity: 0.85, position: "relative" }}>
                  Every screen above was designed for a real food truck operating in Atlanta. martin.builds builds custom dashboards like this one — wired into your Square, Gmail, Instagram, and Google Calendar — so the work runs even when you&rsquo;re behind the line.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 600, lineHeight: 1.2 }}>
                  From <span style={{ color: mustard }}>$5,000</span> · live in 14 days
                </div>
                <Link href="/discovery-call" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 26px", background: paprika, color: "#fff", textDecoration: "none", fontFamily: fontMono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 500 }}>
                  Book a 15-min call →
                </Link>
                <Link href="https://app.martinbuilds.ai" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 26px", background: "transparent", color: "#fff", textDecoration: "none", fontFamily: fontMono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 500, border: "1.5px solid #fff" }}>
                  Or start at $30/mo →
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: "40px 0 60px", textAlign: "center", fontFamily: fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", color: muted }}>
            Built by{" "}
            <Link href="/" style={{ color: paprikaDeep, textDecoration: "none", borderBottom: `1px solid ${paprikaDeep}` }}>
              martin.builds
            </Link>{" "}
            · Atlanta, GA · Custom dashboards in 14 days
          </div>
        </div>
      </main>
    </>
  );
}

/* ── sub components ── */
function Panel({ title, meta, children, delay }: { title: string; meta?: string; children: React.ReactNode; delay?: string }) {
  return (
    <div style={{ background: card, border: `1.5px solid ${ink}`, animation: `fadeUp 0.5s ease-out ${delay || "0s"} backwards` }}>
      <div style={{ padding: "18px 22px", borderBottom: `1.5px solid ${ink}`, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
        <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22, letterSpacing: "-0.015em" }}>{title}</div>
        {meta && <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.14em", color: muted }}>{meta}</div>}
      </div>
      {children}
    </div>
  );
}

function ServiceMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ display: "block", color: muted, fontSize: 9.5, marginBottom: 3, letterSpacing: "0.16em" }}>{label}</span>
      <b style={{ color: ink, fontWeight: 500, fontSize: 12 }}>{value}</b>
    </div>
  );
}

function ItemRow({ rank, name, pct, count, sub, last }: { rank: string; name: string; pct: number; count: string; sub: string; last?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 140px auto", gap: 14, alignItems: "center", paddingBottom: last ? 0 : 14, borderBottom: last ? "none" : `1px dashed ${lineSoft}` }}>
      <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontStyle: "italic", fontSize: 22, color: paprika, textAlign: "center" }}>{rank}</div>
      <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 17, letterSpacing: "-0.005em" }}>{name}</div>
      <div style={{ width: 140, height: 6, background: "#E8DCC4", borderRadius: 1, position: "relative" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: paprika, borderRadius: 1 }} />
      </div>
      <div style={{ fontFamily: fontMono, fontSize: 12, color: ink, fontWeight: 500, minWidth: 64, textAlign: "right" }}>
        {count} <span style={{ color: muted, marginLeft: 6 }}>{sub}</span>
      </div>
    </div>
  );
}

function Gig({ day, num, month, name, where, tags, eta, etaSub, last }: { day: string; num: string; month: string; name: string; where: string; tags: { label: string; v: "default" | "hot" | "confirmed" }[]; eta: string; etaSub: string; last?: boolean }) {
  return (
    <div style={{ padding: "18px 22px", borderBottom: last ? "none" : `1px dashed ${lineSoft}`, display: "grid", gridTemplateColumns: "64px 1fr auto", gap: 16, alignItems: "start" }}>
      <div style={{ fontFamily: fontDisplay, fontWeight: 600, textAlign: "center", lineHeight: 1 }}>
        <span style={{ display: "block", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.16em", color: paprikaDeep, fontWeight: 500, fontFamily: fontMono, marginBottom: 5 }}>{day}</span>
        <span style={{ fontSize: 32, letterSpacing: "-0.02em", color: ink }}>{num}</span>
        <span style={{ display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", fontFamily: fontMono, color: muted, marginTop: 4 }}>{month}</span>
      </div>
      <div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", marginBottom: 4 }}>{name}</div>
        <div style={{ fontSize: 13.5, color: muted }}>{where}</div>
        <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map((t, i) => (
            <Tag key={i} label={t.label} variant={t.v} />
          ))}
        </div>
      </div>
      <div style={{ textAlign: "right", fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.12em", color: muted, lineHeight: 1.6 }}>
        <b style={{ display: "block", color: moss, fontWeight: 500, fontSize: 13, letterSpacing: "-0.01em", textTransform: "none", marginBottom: 2 }}>{eta}</b>
        {etaSub}
      </div>
    </div>
  );
}

function Inbox({ pip, from, preview, time, badge, last }: { pip: string; from: string; preview: string; time: string; badge: string; last?: boolean }) {
  return (
    <div style={{ padding: "16px 22px", borderBottom: last ? "none" : `1px dashed ${lineSoft}`, display: "grid", gridTemplateColumns: "8px 1fr auto", gap: 12, alignItems: "start" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 6, background: pip, display: "inline-block" }} />
      <div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 14.5, marginBottom: 2 }}>{from}</div>
        <div style={{ fontSize: 12.5, color: muted, lineHeight: 1.45 }}>{preview}</div>
      </div>
      <div style={{ fontFamily: fontMono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: muted, textAlign: "right", lineHeight: 1.5, whiteSpace: "nowrap" }}>
        {time}
        <b style={{ display: "block", color: paprika, fontWeight: 500, marginTop: 2 }}>{badge}</b>
      </div>
    </div>
  );
}

function PrepRow({ what, qty, source, last }: { what: string; qty: string; source: string; last?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 14, alignItems: "baseline", paddingBottom: last ? 0 : 10, borderBottom: last ? "none" : "1px dashed rgba(251,246,236,0.12)" }}>
      <div style={{ fontFamily: fontDisplay, fontSize: 15.5, fontWeight: 500 }}>{what}</div>
      <div style={{ fontFamily: fontMono, fontSize: 18, color: mustard, fontWeight: 500, letterSpacing: "-0.01em" }}>{qty}</div>
      <div style={{ fontFamily: fontMono, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.55 }}>{source}</div>
    </div>
  );
}

function Regular({ name, visits, last }: { name: string; visits: string; last: string }) {
  return (
    <div style={{ padding: "18px 22px", borderRight: `1px dashed ${lineSoft}`, borderBottom: `1px dashed ${lineSoft}` }}>
      <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{name}</div>
      <div style={{ fontFamily: fontMono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.12em", color: paprika }}>{visits}</div>
      <div style={{ fontSize: 12, color: muted, marginTop: 6 }}>{last}</div>
    </div>
  );
}
