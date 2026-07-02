"use client";

import ScrollReveal from "../ScrollReveal";

/* ═══════════════════════════════════════════════════════════
   Build Your Team — martin.builds fourth engine.
   Your people. Your payroll. Our system.
   ═══════════════════════════════════════════════════════════ */

export default function TeamPage() {
  return (
    <>
      <Hero />
      <Lanes />
      <Pricing />
      <FoundingPartner />
      <Proof />
      <Network />
      <TeamFAQ />
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
          <p style={tagStyle}>The Fourth Engine</p>
        </ScrollReveal>
        <ScrollReveal>
          <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2.5px", margin: 0 }}>
            From your next hire<br />
            <span style={{ color: "#c8ff00" }}>to your whole bench.</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", fontWeight: 600, color: "#f5f5f0", maxWidth: 640, marginTop: "1.75rem", lineHeight: 1.55 }}>
            Your people. Your payroll. Our system. We build the hiring machine, run the candidate pipeline, and hand you people ready to work — no markups, no agency.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href="/team/intake" style={primaryBtnStyle}>Tell us who you need &rarr;</a>
            <a href="#pricing" style={{ color: "#c8ff00", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(200,255,0,0.4)", paddingBottom: 2 }}>
              See pricing &darr;
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Ladder strip — where this sits among the other engines */}
      <ScrollReveal>
        <div style={{ marginTop: "clamp(3.5rem,6vw,5rem)", maxWidth: 880 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
            {["Build your platform", "Keep your clients", "Get more clients", "Build your team"].map((step, i, arr) => (
              <span key={step} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.72rem",
                    fontWeight: i === arr.length - 1 ? 700 : 500,
                    color: i === arr.length - 1 ? "#0a0a0a" : "#888",
                    background: i === arr.length - 1 ? "#c8ff00" : "rgba(245,245,240,0.05)",
                    border: i === arr.length - 1 ? "none" : "1px solid rgba(245,245,240,0.1)",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "100px",
                  }}
                >
                  {step}
                </span>
                {i < arr.length - 1 && <span style={{ color: "#444", fontSize: "0.8rem" }}>&rarr;</span>}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ── Two lanes ── */
function Lanes() {
  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)", background: "#1a1a1a", borderTop: "1px solid rgba(200,255,0,0.08)", borderBottom: "1px solid rgba(200,255,0,0.08)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.75rem" }}>
          <ScrollReveal>
            <LaneCard
              eyebrow="Lane 1 — Volume Roles"
              title="Fill the roles that run your business."
              body="Nurses, care coordinators, technicians, stylists, servers, drivers, event staff. We build your hiring system — job pages, candidate ads, screening, scheduling — and run it. You watch every candidate move through your pipeline on your dashboard, and you hire directly. Keep the machine for every hire after that."
              bullets={[
                "Branded careers page + application capture",
                "Candidate ad campaigns (Indeed, Meta, Google)",
                "Automated screening & credential checks",
                "Pipeline dashboard — applied → screened → interviewed → hired",
                "Onboarding sequence for new hires",
              ]}
            />
          </ScrollReveal>
          <ScrollReveal>
            <LaneCard
              eyebrow="Lane 2 — Specialist Roles"
              title="Find the people you can't find on a job board."
              body="A marketer who knows your industry. A fractional CFO. An operations expert. We source, vet, and make the introduction. You work with them directly."
              bullets={[
                "2–3 vetted candidates per role",
                "Written brief — background, fit rationale, rate expectations",
                "Warm, double-opt-in introduction",
                "You engage directly — we never employ or mark up their rate",
              ]}
            />
          </ScrollReveal>
        </div>

        {/* Vertical playbooks strip */}
        <ScrollReveal>
          <div style={{ marginTop: "2.5rem", padding: "1.5rem 1.75rem", background: "#141414", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "14px" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#c8ff00", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.9rem" }}>
              Vertical playbooks — built once, reused forever
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {[
                { v: "Healthcare / Home Care", d: "Indeed + Meta sourcing, license/credential screening, GAPP-aware onboarding" },
                { v: "Trades", d: "Indeed + Facebook groups + trade school pipelines, certification screening" },
                { v: "Hospitality / Salon", d: "Instagram + local channels, portfolio/experience screening" },
                { v: "Events", d: "Rapid-batch hiring flows, availability-first screening" },
              ].map((p) => (
                <div key={p.v}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f5f5f0", margin: "0 0 0.3rem 0" }}>{p.v}</p>
                  <p style={{ fontSize: "0.78rem", color: "#888", margin: 0, lineHeight: 1.5 }}>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function LaneCard({ eyebrow, title, body, bullets }: { eyebrow: string; title: string; body: string; bullets: string[] }) {
  return (
    <div style={{ background: "#141414", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "16px", padding: "2rem", height: "100%" }}>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#c8ff00", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.9rem" }}>{eyebrow}</p>
      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.5px", margin: "0 0 0.9rem 0", lineHeight: 1.25 }}>{title}</h3>
      <p style={{ fontSize: "0.92rem", color: "#aaa", lineHeight: 1.65, marginBottom: "1.25rem" }}>{body}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {bullets.map((b) => (
          <div key={b} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
            <span style={{ color: "#c8ff00", fontSize: "0.85rem", marginTop: "0.1rem", flexShrink: 0 }}>&#10003;</span>
            <span style={{ fontSize: "0.85rem", color: "#ccc", lineHeight: 1.5 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
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
            Flat price. <span style={{ color: "#c8ff00" }}>No per-head fees.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#888", maxWidth: 620, marginTop: "1rem", lineHeight: 1.6 }}>
            We charge for the machine and its operation — never a cut of anyone&rsquo;s salary or rate. Fill three roles for less than an agency charges for one.
          </p>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
          <ScrollReveal>
            <PriceCard
              name="Hiring Engine"
              badge="Most common"
              install="$4,500–6,000"
              installLabel="Install · one sprint, 14 days"
              recurring="$1,000–1,500/mo"
              recurringLabel="Operation — ads managed, pipeline run, monthly report"
              note="Ad spend paid directly to platforms — never touches our books."
              features={[
                "Role definitions + comp benchmarking",
                "Branded careers page + application capture",
                "Candidate ad campaigns",
                "Automated screening & scheduling",
                "Pipeline dashboard",
                "Onboarding sequence",
              ]}
            />
          </ScrollReveal>
          <ScrollReveal>
            <PriceCard
              name="Team Launch"
              badge="One-time crew build"
              install="$7,500 flat"
              installLabel="Full install + 60 days intensive operation"
              recurring="No retainer required after"
              recurringLabel="You keep the system for every future hire"
              note="Built for openings — a new restaurant, a new location, a full roster from zero."
              features={[
                "Everything in the Hiring Engine install",
                "60 days of active operation until roster is filled",
                "System stays yours after launch",
              ]}
            />
          </ScrollReveal>
          <ScrollReveal>
            <PriceCard
              name="Sourced Introduction"
              badge="Specialist roles"
              install="$1,500–2,500"
              installLabel="Per role — due when you engage a candidate"
              recurring="Waived on active retainer clients"
              recurringLabel="At our discretion — the placement deepens the account"
              note="2–3 vetted candidates with written briefs. You engage directly."
              features={[
                "Vetted, written candidate briefs",
                "Double opt-in warm introduction",
                "Fractional-executive tier at top of range",
                "No markup, ever",
              ]}
            />
          </ScrollReveal>
        </div>

        {/* Bundle note */}
        <ScrollReveal>
          <div style={{ marginTop: "2rem", padding: "1.5rem 1.75rem", background: "rgba(200,255,0,0.03)", border: "1px solid rgba(200,255,0,0.15)", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", margin: "0 0 0.25rem 0" }}>Growth Stack — Ads Engine + Hiring Engine</p>
              <p style={{ fontSize: "0.82rem", color: "#888", margin: 0 }}>We fill your schedule and your roster. For most service businesses, this is the whole business.</p>
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.95rem", fontWeight: 700, color: "#c8ff00", whiteSpace: "nowrap" }}>$2,500/mo combined</span>
          </div>
        </ScrollReveal>
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
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color: "#f5f5f0" }}>{install}</div>
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

      <a href="/team/intake" style={{ display: "block", textAlign: "center", padding: "0.8rem", background: "transparent", border: "1px solid #c8ff00", color: "#c8ff00", borderRadius: "10px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", transition: "all 0.25s" }}>
        Tell us who you need
      </a>
    </div>
  );
}

/* ── Founding Partner banner ── */
function FoundingPartner() {
  return (
    <section style={{ padding: "0 clamp(1.25rem,5vw,3rem) clamp(5rem,8vw,7rem)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ background: "linear-gradient(135deg, rgba(200,255,0,0.06), rgba(200,255,0,0.01))", border: "1px solid rgba(200,255,0,0.2)", borderRadius: "18px", padding: "2rem clamp(1.5rem, 4vw, 2.5rem)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "#c8ff00", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                Founding Partner rate — first 3 clients per vertical
              </p>
              <p style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.4rem 0" }}>$3,500 install + $1,000/mo</p>
              <p style={{ fontSize: "0.85rem", color: "#aaa", margin: 0, lineHeight: 1.55, maxWidth: 560 }}>
                In exchange: a case study, a testimonial, and two referral introductions. Rate closes once three case studies exist in your vertical.
              </p>
            </div>
            <a href="/team/intake" style={primaryBtnStyle}>Claim founding rate &rarr;</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Proof (HeartPath) ── */
function Proof() {
  return (
    <section style={{ padding: "clamp(4rem,7vw,6rem) clamp(1.25rem,5vw,3rem)", background: "#1a1a1a", borderTop: "1px solid rgba(200,255,0,0.08)", borderBottom: "1px solid rgba(200,255,0,0.08)" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <ScrollReveal>
          <p style={{ ...tagStyle, textAlign: "center" }}>Proof</p>
          <p style={{ fontSize: "clamp(1.3rem, 2.8vw, 1.7rem)", fontWeight: 700, lineHeight: 1.5, letterSpacing: "-0.5px", color: "#f5f5f0" }}>
            We built <span style={{ color: "#c8ff00" }}>HeartPath&rsquo;s family-care team</span> — sourced the people, structured the roles, built the systems they run on.
          </p>
          <p style={{ fontSize: "1rem", color: "#888", marginTop: "1rem" }}>
            Their people. Their payroll. Our machine.
          </p>
          <a href="/see-you-friday" style={{ display: "inline-block", marginTop: "1.75rem", color: "#c8ff00", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(200,255,0,0.4)", paddingBottom: 2 }}>
            Read the HeartPath story &rarr;
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Network ── */
function Network() {
  return (
    <section style={{ padding: "clamp(4rem,7vw,6rem) clamp(1.25rem,5vw,3rem)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <ScrollReveal>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-1px", margin: "0 0 1rem 0" }}>
            Need a person, <span style={{ color: "#c8ff00" }}>not a platform?</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#aaa", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            After years of building for service businesses, the network runs deep — marketers who know your industry, fractional CFOs, operators, specialists. If you&rsquo;re a client and you need someone good, ask. If we know the right person, the introduction is on the house.
          </p>
          <p style={{ fontSize: "0.8rem", color: "#555", marginTop: "1.5rem" }}>
            Clients only · double opt-in · vouch-worthy people only · no SLA
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── FAQ ── */
const FAQS = [
  { q: "Are you a staffing agency?", a: "No. We never employ your team and never mark up labor. You hire directly onto your own payroll, or contract directly with the people we introduce. We charge for the hiring machine and its operation — never a cut of anyone's salary." },
  { q: "How is this different from a recruiter?", a: "A recruiter is episodic — you pay per placement and get nothing when they leave. We build a system: job pages, candidate ads, screening, scheduling, a pipeline dashboard. You keep it for every hire after the first." },
  { q: "What does 'your people, your payroll, our system' actually mean?", a: "The people you hire are your employees or your direct contractors — full stop. We never sit between you and them as an employer of record. We build and run the machine that finds, screens, and onboards them." },
  { q: "How fast can we fill roles?", a: "The install (job pages, ads, screening, dashboard) ships in about 14 days. Team Launch engagements run 60 days of intensive operation until the roster is filled. Ongoing Hiring Engine retainers run continuously." },
  { q: "What if we only need one specialist hire, not a whole system?", a: "That's a Sourced Introduction — $1,500–2,500 per role, no system build required. We source, vet, and introduce 2–3 candidates with written briefs. You engage directly." },
  { q: "Do we pay for candidate ad spend separately?", a: "Yes — ad spend on Indeed, Meta, Google, etc. goes directly to the platforms on your card. It never touches our books, so there's no markup on media." },
];

function TeamFAQ() {
  return (
    <section style={{ padding: "clamp(4rem,7vw,6rem) clamp(1.25rem,5vw,3rem)", background: "#0f0f0f", borderTop: "1px solid rgba(200,255,0,0.08)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <ScrollReveal>
          <p style={{ ...tagStyle, textAlign: "center" }}>FAQ</p>
          <h2 style={{ ...sectionTitleStyle, textAlign: "center", margin: "0 auto 2.5rem" }}>
            Questions owners ask <span style={{ color: "#c8ff00" }}>before they hire.</span>
          </h2>
        </ScrollReveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((f) => (
            <ScrollReveal key={f.q}>
              <details style={{ background: "#141414", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "12px", padding: "1.1rem 1.4rem" }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1rem", color: "#f5f5f0", listStyle: "none" }}>{f.q}</summary>
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
          Tell us who you need.
        </h2>
        <p style={{ fontSize: "1rem", color: "#888", maxWidth: 480, margin: "0 auto 2rem" }}>
          Roles, volume, timeline. We&rsquo;ll come back with the machine and the price — not a discovery-call maze.
        </p>
        <a href="/team/intake" style={primaryBtnStyle}>Tell us who you need &rarr;</a>
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
