"use client";

import ScrollReveal from "../ScrollReveal";

/* ═══════════════════════════════════════════════════════════
   Ads Engine — managed paid ads + client-owned command center.
   "Agencies hide your ad account. We hand you the keys."
   ═══════════════════════════════════════════════════════════ */

export default function AdsEnginePage() {
  return (
    <>
      <Hero />
      <WhatYouGet />
      <Pricing />
      <Trust />
      <AdsFAQ />
      <ClosingCTA />
    </>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section style={{ padding: "clamp(7rem,12vw,9rem) clamp(1.25rem,5vw,3rem) clamp(4rem,7vw,5rem)", position: "relative" }}>
      <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 880, position: "relative" }}>
        <ScrollReveal>
          <p style={tagStyle}>Managed Paid Ads</p>
        </ScrollReveal>
        <ScrollReveal>
          <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2.5px", margin: 0 }}>
            Agencies hide your ad account.<br />
            <span style={{ color: "#c8ff00" }}>We hand you the keys.</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", fontWeight: 600, color: "#f5f5f0", maxWidth: 640, marginTop: "1.75rem", lineHeight: 1.55 }}>
            You own the ad account. You see every dollar, every lead, every change we make — in plain English, on your dashboard. We do the actual work of building creative, managing budgets, and optimizing cost per lead behind the scenes.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href="/discovery-call" style={primaryBtnStyle}>Get Your Ads Engine &rarr;</a>
            <a href="/demo/ads-engine" style={{ color: "#c8ff00", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(200,255,0,0.4)", paddingBottom: 2 }}>
              See the live demo &rarr;
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── What you get ── */
const SCREENS = [
  { title: "Overview", body: "One question answered above the fold: what did my money do? Spend, leads, cost per lead, booked value — big numbers, one trend chart, and a 'what we did this week' feed written in plain English." },
  { title: "Campaigns", body: "Plain-English objectives, not platform jargon. Pause or resume anything. Move budget within a range we've agreed on — go further and it becomes a request, not a silent change." },
  { title: "Creative Studio", body: "We write and design every ad. You approve or request a change — you never see an ads-manager interface." },
  { title: "Leads", body: "Every person the ads brought in, with a status pipeline your staff can update. This is what ties ad spend to real business, not just clicks." },
  { title: "Reports", body: "A weekly digest, written for you — not invented. Every number traces exactly back to what actually happened. Archived and emailed automatically." },
];

function WhatYouGet() {
  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)", background: "#1a1a1a", borderTop: "1px solid rgba(200,255,0,0.08)", borderBottom: "1px solid rgba(200,255,0,0.08)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tagStyle}>What You Get</p>
          <h2 style={sectionTitleStyle}>
            One dashboard. <span style={{ color: "#c8ff00" }}>Every dollar accounted for.</span>
          </h2>
        </ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
          {SCREENS.map((s) => (
            <ScrollReveal key={s.title}>
              <div style={{ background: "#141414", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "14px", padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.6rem 0" }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#aaa", lineHeight: 1.6, margin: 0 }}>{s.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ── */
function Pricing() {
  return (
    <section id="pricing" style={{ padding: "clamp(5rem,8vw,7rem) clamp(1.25rem,5vw,3rem)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tagStyle}>Pricing</p>
          <h2 style={sectionTitleStyle}>
            Flat price. <span style={{ color: "#c8ff00" }}>You keep the account.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#888", maxWidth: 620, marginTop: "1rem", lineHeight: 1.6 }}>
            No percentage-of-spend fees, no ad-spend markups. You pay platforms directly — Meta and Google never touch our books.
          </p>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
          <ScrollReveal>
            <PriceCard
              name="Ads Engine"
              badge="Most common"
              install="$3,000–4,500"
              installLabel="Install · dashboard, guardrails, first campaigns live in ~2 weeks"
              recurring="$1,000–1,500/mo"
              recurringLabel="Operation — ads managed, creative made, weekly digest"
              note="Candidate ad spend paid directly to Meta/Google — never touches our books."
              features={[
                "Owner-facing command center",
                "Meta + Google campaign management",
                "Creative Studio with approve/reject",
                "Lead pipeline tied to real outcomes",
                "Budget guardrails you can see and control",
                "Weekly plain-English digest",
              ]}
            />
          </ScrollReveal>
          <ScrollReveal>
            <PriceCard
              name="Growth Stack"
              badge="Bundle · Ads + Team"
              install="Combined install pricing"
              installLabel="Scoped together — ask for a quote"
              recurring="$2,500/mo combined"
              recurringLabel="Ads Engine + Hiring Engine, one retainer"
              note="We fill your schedule and your roster. For most service businesses, this is the whole business."
              features={[
                "Everything in Ads Engine",
                "Everything in the Hiring Engine",
                "One monthly report, both engines",
                "Single point of contact",
              ]}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  name, badge, install, installLabel, recurring, recurringLabel, note, features,
}: {
  name: string; badge: string; install: string; installLabel: string; recurring: string; recurringLabel: string; note: string; features: string[];
}) {
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(245,245,240,0.08)", borderRadius: "18px", padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#c8ff00", background: "rgba(200,255,0,0.08)", padding: "0.3rem 0.7rem", borderRadius: "100px", letterSpacing: "1px", textTransform: "uppercase", alignSelf: "flex-start" }}>
        {badge}
      </span>
      <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: "0.9rem 0 1.1rem 0", letterSpacing: "-0.5px" }}>{name}</h3>

      <div style={{ marginBottom: "0.9rem" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f0" }}>{install}</div>
        <div style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.2rem" }}>{installLabel}</div>
      </div>
      <div style={{ marginBottom: "1.25rem", paddingTop: "0.9rem", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, color: "#c8ff00" }}>{recurring}</div>
        <div style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.2rem" }}>{recurringLabel}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.25rem", flex: 1 }}>
        {features.map((f) => (
          <div key={f} style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start" }}>
            <span style={{ color: "#c8ff00", fontSize: "0.8rem", marginTop: "0.15rem", flexShrink: 0 }}>&#10003;</span>
            <span style={{ fontSize: "0.82rem", color: "#ccc", lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "0.75rem", color: "#666", lineHeight: 1.5, marginBottom: "1.25rem" }}>{note}</p>

      <a href="/discovery-call" style={{ display: "block", textAlign: "center", padding: "0.8rem", background: "transparent", border: "1px solid #c8ff00", color: "#c8ff00", borderRadius: "10px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
        Get started
      </a>
    </div>
  );
}

/* ── Trust / guardrails ── */
function Trust() {
  const points = [
    { title: "You own the ad account", body: "Meta and Google accounts stay in your name. If we ever part ways, you keep everything — the account, the data, the campaign history." },
    { title: "Hard budget caps", body: "If month-to-date spend hits your cap, campaigns auto-pause and you're alerted immediately. Never a surprise bill." },
    { title: "Every change is visible", body: "Every budget change, pause, or launch appears in your actions feed within one sync cycle — nothing happens quietly." },
    { title: "Numbers you can trust", body: "Every figure in your weekly digest is computed from your actual synced data — never estimated, never invented." },
  ];
  return (
    <section style={{ padding: "clamp(4rem,7vw,6rem) clamp(1.25rem,5vw,3rem)", background: "#1a1a1a", borderTop: "1px solid rgba(200,255,0,0.08)", borderBottom: "1px solid rgba(200,255,0,0.08)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tagStyle}>The Guardrails</p>
          <h2 style={sectionTitleStyle}>
            Real controls. <span style={{ color: "#c8ff00" }}>Not a reporting screen.</span>
          </h2>
        </ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
          {points.map((p) => (
            <ScrollReveal key={p.title}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "#c8ff00" }}>{p.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#aaa", lineHeight: 1.6, margin: 0 }}>{p.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
const FAQS = [
  { q: "Do you have access to spend our money without approval?", a: "No. Every campaign has a budget guardrail you can see. You can move spend within the range we've agreed on, or hit hard stop with pause — anytime, no approval needed from us." },
  { q: "What happens to my ad account if we stop working together?", a: "It's yours. It was always in your name. You keep the account, the pixel data, the campaign history, and the creative library." },
  { q: "How is this different from a traditional agency?", a: "Agencies typically run ads inside their own agency-level ad account and report back with a slide deck once a month. You never see raw data or have direct control. Here, you own the account and see everything live." },
  { q: "Do you take a percentage of ad spend?", a: "No. Flat install, flat monthly operation fee. Ad spend goes directly from your card to Meta/Google — we never touch it, so there's nothing to mark up." },
  { q: "Can I combine this with hiring help?", a: "Yes — the Growth Stack bundles Ads Engine with the Hiring Engine at $2,500/mo combined. See /team for details." },
];

function AdsFAQ() {
  return (
    <section style={{ padding: "clamp(4rem,7vw,6rem) clamp(1.25rem,5vw,3rem)", background: "#0f0f0f" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <ScrollReveal>
          <p style={{ ...tagStyle, textAlign: "center" }}>FAQ</p>
          <h2 style={{ ...sectionTitleStyle, textAlign: "center", margin: "0 auto 2.5rem" }}>
            Questions owners ask <span style={{ color: "#c8ff00" }}>before they hand off ads.</span>
          </h2>
        </ScrollReveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((f) => (
            <ScrollReveal key={f.q}>
              <details style={{ background: "#141414", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "12px", padding: "1.1rem 1.4rem" }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1rem", color: "#f5f5f0" }}>{f.q}</summary>
                <p style={{ fontSize: "0.88rem", color: "#aaa", lineHeight: 1.7, marginTop: "0.8rem", marginBottom: 0 }}>{f.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Closing CTA ── */
function ClosingCTA() {
  return (
    <section style={{ padding: "clamp(5rem,8vw,7rem) clamp(1.25rem,5vw,3rem)", textAlign: "center" }}>
      <ScrollReveal>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-1.5px", margin: "0 0 1rem 0" }}>
          See where your money&rsquo;s actually going.
        </h2>
        <p style={{ fontSize: "1rem", color: "#888", maxWidth: 480, margin: "0 auto 2rem" }}>
          Get your keys — a real ad account, a real dashboard, real control.
        </p>
        <a href="/discovery-call" style={primaryBtnStyle}>Get Your Ads Engine &rarr;</a>
      </ScrollReveal>
    </section>
  );
}

/* ── shared styles ── */
const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.8rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.25rem",
};
const sectionTitleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 4.5vw, 3rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-1.5px",
};
const primaryBtnStyle: React.CSSProperties = {
  background: "#c8ff00",
  color: "#0a0a0a",
  padding: "1rem 2.2rem",
  borderRadius: "100px",
  fontWeight: 700,
  fontSize: "0.95rem",
  letterSpacing: "0.3px",
  display: "inline-block",
  textDecoration: "none",
  whiteSpace: "nowrap",
};
