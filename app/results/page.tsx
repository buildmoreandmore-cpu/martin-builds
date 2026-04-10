"use client";

import { useState } from "react";

/* ─── Design Tokens (matching site) ─── */
const BLACK = "#0a0a0a";
const WHITE = "#f5f5f0";
const ACCENT = "#c8ff00";
const CARD = "#1a1a1a";
const BORDER = "#2a2a2a";
const DIM = "#888";
const SUCCESS = "#3ecf8e";

/* ─── SVG Icon Components ─── */
function StarIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function FlameIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function RocketIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function SparkleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

/* ─── Industries ─── */
const INDUSTRIES = [
  "Background Screening / HR Services",
  "Restaurant / Food & Beverage",
  "Real Estate / Property Management",
  "Staffing / Workforce Management",
  "Inspection / Compliance Services",
  "Healthcare / Medical Office",
  "Construction / Contracting",
  "Legal / Professional Services",
  "Retail / eCommerce",
  "Janitorial / Commercial Cleaning",
  "HVAC / Mechanical Services",
  "Other",
];

const TECH_TAGS = [
  "Dashboard",
  "Client Portal",
  "Admin Panel",
  "Booking / Scheduling",
  "Payments / Stripe",
  "Document Signing",
  "Automated Emails",
  "AI Integration",
  "Reporting / Analytics",
  "Custom Database",
];

const RATINGS = [
  { key: "good", label: "Good", Icon: StarIcon },
  { key: "exceptional", label: "Exceptional", Icon: FlameIcon },
  { key: "game_changer", label: "Game Changer", Icon: RocketIcon },
];

/* ─── Main Page ─── */
export default function ResultsPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Step 1
  const [name, setName] = useState("");
  const [biz, setBiz] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  // Step 2
  const [before, setBefore] = useState("");
  const [built, setBuilt] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Step 3
  const [impact, setImpact] = useState("");
  const [rating, setRating] = useState("");
  const [quote, setQuote] = useState("");
  const [consent, setConsent] = useState(false);

  // Step 4
  const [refName, setRefName] = useState("");
  const [refBiz, setRefBiz] = useState("");
  const [refContact, setRefContact] = useState("");
  const [refWhy, setRefWhy] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [linkCopied, setLinkCopied] = useState(false);

  const TOTAL_STEPS = 4;

  function validate(s: number): boolean {
    const errs: Record<string, boolean> = {};
    if (s === 1) {
      if (!name.trim()) errs.name = true;
      if (!biz.trim()) errs.biz = true;
      if (!industry) errs.industry = true;
    }
    if (s === 2) {
      if (!before.trim()) errs.before = true;
      if (!built.trim()) errs.built = true;
    }
    if (s === 3) {
      if (!impact.trim()) errs.impact = true;
      if (!consent) errs.consent = true;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goNext() {
    if (!validate(step)) return;
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleTag(tag: string) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch("/api/build-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, business_name: biz, industry, location,
          before, built, tech_tags: tags,
          impact, rating, quote, consent,
          referral_name: refName || null,
          referral_business: refBiz || null,
          referral_contact: refContact || null,
          referral_reason: refWhy || null,
        }),
      });
    } catch {
      // still show success — data may have saved
    }
    setSubmitted(true);
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function shareLinkedIn() {
    const url = encodeURIComponent("https://martinbuilds.ai/results");
    const text = encodeURIComponent(
      `Just submitted my build report to @martinbuilds — ${biz} is live with a new platform. Check out the results:`
    );
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
      "_blank"
    );
  }

  function copyLink() {
    navigator.clipboard.writeText("https://martinbuilds.ai/results").then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }

  const progressPct = ((step - 1) / TOTAL_STEPS) * 100;

  const fieldStyle = (key?: string): React.CSSProperties => ({
    width: "100%",
    background: CARD,
    border: `1px solid ${key && errors[key] ? "#e84545" : BORDER}`,
    color: WHITE,
    fontFamily: "'Space Mono', monospace",
    fontSize: 14,
    padding: "16px 18px",
    borderRadius: 4,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    WebkitAppearance: "none" as const,
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: DIM,
    marginBottom: 10,
    fontFamily: "'Space Mono', monospace",
  };

  /* ─── Success Screen ─── */
  if (submitted) {
    const displayQuote = quote || (impact.length > 120 ? impact.slice(0, 120) + "..." : impact);
    return (
      <div style={{ background: BLACK, color: WHITE, minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 120px" }}>
          <div style={{ textAlign: "center", padding: "60px 0", animation: "fadeUp 0.6s ease both" }}>
            <div style={{ marginBottom: 24 }}><SparkleIcon size={48} /></div>
            <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "2rem", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.5px" }}>
              Report received.
            </h2>
            <p style={{ color: DIM, fontSize: 13, lineHeight: 1.8, fontStyle: "italic", maxWidth: 440, margin: "0 auto 40px" }}>
              Your submission is queued for review. Once published, it lives permanently on martinbuilds.ai/results &mdash; indexed, searchable, and pointing back to you.
            </p>

            {/* Preview Card */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 6, padding: 28, textAlign: "left" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, marginBottom: 16, fontFamily: "'Space Mono', monospace" }}>
                // Your entry preview
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 12, color: DIM, marginBottom: 20 }}>{biz} &middot; {industry}</div>
              <div style={{ fontSize: 13, lineHeight: 1.8, color: "#ccc", borderLeft: `2px solid ${ACCENT}`, paddingLeft: 16, fontStyle: "italic" }}>
                &ldquo;{displayQuote}&rdquo;
              </div>
              {tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
                  {tags.map((t) => (
                    <span key={t} style={{ fontSize: 10, padding: "4px 10px", border: `1px solid ${BORDER}`, borderRadius: 2, color: DIM, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ height: 36 }} />
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={shareLinkedIn} style={{ padding: "12px 22px", border: `1px solid ${BORDER}`, background: CARD, color: WHITE, fontFamily: "'Space Mono', monospace", fontSize: 12, cursor: "pointer", borderRadius: 3, display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.2s" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                Share on LinkedIn
              </button>
              <button onClick={copyLink} style={{ padding: "12px 22px", border: `1px solid ${BORDER}`, background: CARD, color: WHITE, fontFamily: "'Space Mono', monospace", fontSize: 12, cursor: "pointer", borderRadius: 3, display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.2s" }}>
                {linkCopied ? <><CheckIcon /> Copied!</> : <><LinkIcon /> Copy Link</>}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 80, borderTop: `1px solid ${BORDER}`, paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="https://martinbuilds.ai" style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: WHITE, textDecoration: "none", letterSpacing: "0.05em" }}>
              martin<span style={{ color: ACCENT }}>.</span>builds
            </a>
            <span style={{ fontSize: 11, color: DIM, fontStyle: "italic" }}>Built by Friday</span>
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }

  /* ─── Form ─── */
  return (
    <div style={{ background: BLACK, color: WHITE, minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: 64, animation: "fadeUp 0.7s ease both" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT, marginBottom: 16, display: "flex", alignItems: "center", gap: 10, fontFamily: "'Space Mono', monospace" }}>
            <span style={{ display: "block", width: 24, height: 1, background: ACCENT }} />
            martin.builds &mdash; client submissions
          </div>
          <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(2.4rem, 7vw, 4rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.02em", color: WHITE, marginBottom: 20 }}>
            The Build<br /><span style={{ color: ACCENT }}>Report.</span>
          </h1>
          <p style={{ fontSize: 13, color: DIM, lineHeight: 1.8, maxWidth: 500, fontStyle: "italic" }}>
            Took a build live? Drop your results here. Your story helps other operators find the right solution &mdash; and gets your business in front of them.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ height: 2, background: BORDER, marginBottom: 12, position: "relative" }}>
          <div style={{ height: "100%", background: ACCENT, transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)", width: `${progressPct}%` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 48, fontFamily: "'Space Mono', monospace" }}>
          {[
            { n: 1, l: "You" },
            { n: 2, l: "The Build" },
            { n: 3, l: "Results" },
            { n: 4, l: "Refer" },
          ].map((d) => (
            <span key={d.n} style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: step > d.n ? SUCCESS : step === d.n ? ACCENT : DIM, transition: "color 0.3s" }}>
              0{d.n} &middot; {d.l}
            </span>
          ))}
        </div>

        {/* STEP 1: Who are you */}
        {step === 1 && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: DIM, textTransform: "uppercase", marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>Step 01 of 04</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", fontWeight: 700, marginBottom: 8, color: WHITE }}>Who are you?</div>
            <div style={{ fontSize: 12, color: DIM, fontStyle: "italic", marginBottom: 36, lineHeight: 1.7 }}>
              This becomes your public author credit. Real businesses only &mdash; we verify before publishing.
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Your Name *</label>
              <input style={fieldStyle("name")} value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: false })); }} placeholder="e.g. Gwendolyn Brandon" />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Business Name *</label>
              <input style={fieldStyle("biz")} value={biz} onChange={(e) => { setBiz(e.target.value); setErrors((p) => ({ ...p, biz: false })); }} placeholder="e.g. PCG Screening Services" />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Industry / Niche *</label>
              <select style={{ ...fieldStyle("industry"), color: industry ? WHITE : "#3a3a3a" }} value={industry} onChange={(e) => { setIndustry(e.target.value); setErrors((p) => ({ ...p, industry: false })); }}>
                <option value="" style={{ background: CARD }}>&mdash; select &mdash;</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i} style={{ background: CARD, color: WHITE }}>{i}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>City, State</label>
              <input style={fieldStyle()} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Atlanta, GA" />
            </div>

            <div style={{ marginTop: 40 }}>
              <button onClick={goNext} style={btnPrimary}>Continue <ArrowRightIcon /></button>
            </div>
          </div>
        )}

        {/* STEP 2: The Build */}
        {step === 2 && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: DIM, textTransform: "uppercase", marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>Step 02 of 04</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", fontWeight: 700, marginBottom: 8, color: WHITE }}>Tell us about the build.</div>
            <div style={{ fontSize: 12, color: DIM, fontStyle: "italic", marginBottom: 36, lineHeight: 1.7 }}>
              What was the problem? What got built? Be specific &mdash; specifics rank on Google and resonate with future clients in your industry.
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>What were you dealing with before we built? *</label>
              <textarea style={{ ...fieldStyle("before"), resize: "none", lineHeight: 1.7 }} rows={3} maxLength={300} value={before} onChange={(e) => { setBefore(e.target.value); setErrors((p) => ({ ...p, before: false })); }} placeholder="e.g. Everything was done manually in email. We had no central portal for clients to submit orders or track status..." />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: before.length > 255 ? ACCENT : DIM }}>{before.length} / 300</span>
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>What was built for you? *</label>
              <textarea style={{ ...fieldStyle("built"), resize: "none", lineHeight: 1.7 }} rows={3} maxLength={300} value={built} onChange={(e) => { setBuilt(e.target.value); setErrors((p) => ({ ...p, built: false })); }} placeholder="e.g. A three-portal platform — one for clients to order, one for screeners to update, one for admin to oversee everything..." />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: built.length > 255 ? ACCENT : DIM }}>{built.length} / 300</span>
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>What platform / tech did you receive?</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {TECH_TAGS.map((t) => (
                  <button key={t} onClick={() => toggleTag(t)} style={{ padding: "9px 16px", background: tags.includes(t) ? "rgba(200,255,0,0.12)" : CARD, border: `1px solid ${tags.includes(t) ? ACCENT : BORDER}`, borderRadius: 2, fontSize: 12, cursor: "pointer", color: tags.includes(t) ? WHITE : DIM, transition: "all 0.2s", letterSpacing: "0.05em", fontFamily: "'Space Mono', monospace" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 40, alignItems: "center" }}>
              <button onClick={goBack} style={btnBack}>Back</button>
              <button onClick={goNext} style={btnPrimary}>Continue <ArrowRightIcon /></button>
            </div>
          </div>
        )}

        {/* STEP 3: Results */}
        {step === 3 && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: DIM, textTransform: "uppercase", marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>Step 03 of 04</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", fontWeight: 700, marginBottom: 8, color: WHITE }}>What changed?</div>
            <div style={{ fontSize: 12, color: DIM, fontStyle: "italic", marginBottom: 36, lineHeight: 1.7 }}>
              This is the part future clients read most. Be honest &mdash; even modest results matter to someone in your shoes reading this.
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Describe the impact / what changed *</label>
              <textarea style={{ ...fieldStyle("impact"), resize: "none", lineHeight: 1.7 }} rows={4} maxLength={400} value={impact} onChange={(e) => { setImpact(e.target.value); setErrors((p) => ({ ...p, impact: false })); }} placeholder="e.g. We onboarded 3 new corporate clients in the first two weeks because they trusted the portal. Before, people would ghost us during the paperwork stage..." />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: impact.length > 340 ? ACCENT : DIM }}>{impact.length} / 400</span>
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Overall experience</label>
              <div style={{ display: "flex", gap: 12 }}>
                {RATINGS.map((r) => (
                  <button key={r.key} onClick={() => setRating(r.key)} style={{ flex: 1, padding: "14px 8px", background: rating === r.key ? "rgba(200,255,0,0.12)" : CARD, border: `1px solid ${rating === r.key ? ACCENT : BORDER}`, borderRadius: 4, textAlign: "center", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, color: rating === r.key ? WHITE : DIM, transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <r.Icon size={22} />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>One-line quote for the wall (optional)</label>
              <input style={fieldStyle()} value={quote} onChange={(e) => setQuote(e.target.value)} placeholder='e.g. We looked like a $5M company in week one.' maxLength={120} />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Consent to publish *</label>
              <div onClick={() => { setConsent(!consent); setErrors((p) => ({ ...p, consent: false })); }} style={{ display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer", padding: 16, border: `1px solid ${errors.consent ? "#e84545" : BORDER}`, borderRadius: 4, background: CARD, transition: "border-color 0.2s" }}>
                <div style={{ flexShrink: 0, width: 36, height: 20, background: consent ? ACCENT : BORDER, borderRadius: 10, position: "relative", transition: "background 0.3s", marginTop: 2 }}>
                  <div style={{ position: "absolute", width: 14, height: 14, background: consent ? "white" : "#555", borderRadius: "50%", top: 3, left: consent ? 19 : 3, transition: "left 0.3s, background 0.3s" }} />
                </div>
                <span style={{ fontSize: 12, color: DIM, lineHeight: 1.7 }}>
                  I agree to have my submission published on martinbuilds.ai as a public case study. My business name and industry will be visible. My email will never be shared.
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 40, alignItems: "center" }}>
              <button onClick={goBack} style={btnBack}>Back</button>
              <button onClick={goNext} style={btnPrimary}>Continue <ArrowRightIcon /></button>
            </div>
          </div>
        )}

        {/* STEP 4: Refer */}
        {step === 4 && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: DIM, textTransform: "uppercase", marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>Step 04 of 04</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", fontWeight: 700, marginBottom: 8, color: WHITE }}>
              Know someone<br />who needs this?
            </div>
            <div style={{ fontSize: 12, color: DIM, fontStyle: "italic", marginBottom: 36, lineHeight: 1.7 }}>
              Optional &mdash; but referrals get priority scheduling. You&apos;re not selling them, just opening the door.
            </div>

            {/* Referral block */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${ACCENT}`, padding: 24, borderRadius: 4, marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>// Why refer?</div>
              <p style={{ fontSize: 13, color: DIM, lineHeight: 1.7, fontStyle: "italic" }}>
                Every business you know running on spreadsheets, email chains, or manual everything &mdash; that&apos;s a build waiting to happen. If they go through you, your submission gets featured first.
              </p>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Referral Name</label>
              <input style={fieldStyle()} value={refName} onChange={(e) => setRefName(e.target.value)} placeholder="e.g. Marcus Williams" />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Their Business / Industry</label>
              <input style={fieldStyle()} value={refBiz} onChange={(e) => setRefBiz(e.target.value)} placeholder="e.g. Metro Atlanta pest control company" />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Best way to reach them</label>
              <input style={fieldStyle()} value={refContact} onChange={(e) => setRefContact(e.target.value)} placeholder="Email, phone, or LinkedIn URL" />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Why do they need a build? (optional)</label>
              <textarea style={{ ...fieldStyle(), resize: "none", lineHeight: 1.7 }} rows={2} value={refWhy} onChange={(e) => setRefWhy(e.target.value)} placeholder="e.g. They're tracking 200 jobs in Google Sheets and losing customers..." />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 40, alignItems: "center" }}>
              <button onClick={goBack} style={btnBack}>Back</button>
              <button onClick={handleSubmit} disabled={submitting} style={{ ...btnPrimary, opacity: submitting ? 0.6 : 1, cursor: submitting ? "not-allowed" : "pointer" }}>
                {submitting ? "Submitting..." : <>Submit My Report <CheckIcon /></>}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 80, borderTop: `1px solid ${BORDER}`, paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="https://martinbuilds.ai" style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: WHITE, textDecoration: "none", letterSpacing: "0.05em" }}>
            martin<span style={{ color: ACCENT }}>.</span>builds
          </a>
          <span style={{ fontSize: 11, color: DIM, fontStyle: "italic" }}>Built by Friday</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        input:focus, textarea:focus, select:focus { border-color: ${ACCENT} !important; box-shadow: 0 0 0 3px rgba(200,255,0,0.1); }
        input::placeholder, textarea::placeholder { color: #3a3a3a; }
        select option { background: ${CARD}; }
      `}</style>
    </div>
  );
}

/* ─── Button Styles ─── */
const btnPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "16px 32px",
  background: ACCENT,
  color: BLACK,
  fontFamily: "'Space Mono', monospace",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  border: "none",
  borderRadius: 3,
  cursor: "pointer",
  transition: "background 0.2s, transform 0.1s",
};

const btnBack: React.CSSProperties = {
  background: "none",
  border: `1px solid ${BORDER}`,
  color: DIM,
  fontFamily: "'Space Mono', monospace",
  fontSize: 12,
  padding: "16px 24px",
  borderRadius: 3,
  cursor: "pointer",
  transition: "all 0.2s",
};
