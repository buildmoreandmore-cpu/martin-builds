"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const INDUSTRIES = [
  "Healthcare & Dental",
  "Law Firm",
  "Energy/HVAC",
  "Real Estate",
  "Financial Services",
  "Insurance",
  "Consulting",
  "Service Business",
  "Other",
];

const Q1_OPTIONS = ["Yes, automatically", "Manually sometimes", "No"];
const Q2_OPTIONS = ["Yes", "No", "Not easily"];
const Q3_OPTIONS = ["Nothing", "Contact form", "Chat or booking available"];

const SCAN_STEPS = [
  "Checking mobile speed…",
  "Analyzing lead capture…",
  "Scanning after-hours coverage…",
  "Evaluating booking flow…",
  "Calculating revenue impact…",
];

type Severity = "CRITICAL" | "WARNING" | "OK";

interface Leak {
  title: string;
  severity: Severity;
  description: string;
  fix: string;
}

function computeLeaks(q1: string, q2: string, q3: string): Leak[] {
  const leak1Severity: Severity =
    q3 === "Nothing" ? "CRITICAL" : q3 === "Contact form" ? "WARNING" : "OK";
  const leak3Severity: Severity =
    q1 === "No" ? "CRITICAL" : q1 === "Manually sometimes" ? "WARNING" : "OK";
  const leak4Severity: Severity =
    q2 === "No" ? "CRITICAL" : q2 === "Not easily" ? "WARNING" : "OK";

  return [
    {
      title: "After-Hours Dead Zone",
      severity: leak1Severity,
      description:
        leak1Severity === "OK"
          ? "You have after-hours coverage in place — that puts you ahead of most businesses. There may still be room to optimize response quality and lead capture during off-hours."
          : "Your website goes silent when you close. Every visitor between 6 PM and 9 AM hits a dead end — no way to get answers, no way to book, no way to reach you. That's potentially 40%+ of your traffic with zero engagement.",
      fix: "An AI agent that responds instantly, 24/7, captures leads, and books appointments while you sleep. Setup: 48 hours. Cost: $300/mo.",
    },
    {
      title: "Lead Capture Failure",
      severity: "CRITICAL",
      description:
        "A contact form is where leads go to die. Most visitors won't fill one out — they'll leave and go to your competitor who makes it easier. You need a way to capture interest in real-time, not a form that sits in your inbox.",
      fix: "An AI chat agent that engages every visitor, answers their questions, and captures their name, email, and what they need — all in a natural conversation.",
    },
    {
      title: "No Automated Follow-Up",
      severity: leak3Severity,
      description:
        leak3Severity === "OK"
          ? "You're already following up automatically — great. Make sure your sequences are personalized and multi-channel for maximum conversion."
          : "80% of sales require 5+ follow-ups, but most businesses do 1 or 0. Every lead that doesn't hear from you within 24 hours is 10x less likely to convert. You're not losing to better competitors — you're losing to faster ones.",
      fix: "Automated follow-up sequences that fire the moment a lead comes in. Personalized, timely, and completely hands-off.",
    },
    {
      title: "Booking Friction",
      severity: leak4Severity,
      description:
        leak4Severity === "OK"
          ? "Your booking flow is solid. Consider whether it's integrated with your other tools for a seamless experience."
          : "If a potential customer has to call you, email you, or navigate 3 pages to book — most won't. Every unnecessary step between 'I want this' and 'I'm booked' costs you customers.",
      fix: "One-click booking embedded in your site and in your AI agent. Customers book without ever picking up the phone.",
    },
    {
      title: "Mobile Experience Gap",
      severity: "WARNING",
      description:
        "60%+ of your visitors are on their phone. If your site is slow, hard to navigate, or doesn't work smoothly on mobile — they bounce in 3 seconds and don't come back.",
      fix: "A mobile-optimized site with AI tools built in — fast, clean, and conversion-focused.",
    },
  ];
}

function computeScore(leaks: Leak[]): number {
  let score = 100;
  for (const l of leaks) {
    if (l.severity === "CRITICAL") score -= 20;
    else if (l.severity === "WARNING") score -= 10;
  }
  return Math.max(score, 10);
}

const severityColor: Record<Severity, string> = {
  CRITICAL: "#ff4444",
  WARNING: "#ffaa00",
  OK: "#c8ff00",
};

function scoreColor(s: number) {
  if (s <= 40) return "#ff4444";
  if (s <= 70) return "#ffaa00";
  return "#c8ff00";
}

function scoreLabel(s: number) {
  if (s <= 40) return "Critical — You're leaking revenue daily";
  if (s <= 70) return "Moderate — There's significant room to improve";
  return "Good — A few tweaks could unlock more leads";
}

/* ---------- pill button for questions ---------- */
function Pill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "0.6rem 1.25rem",
        borderRadius: "100px",
        border: selected ? "2px solid #c8ff00" : "2px solid rgba(245,245,240,0.12)",
        background: selected ? "rgba(200,255,0,0.1)" : "transparent",
        color: selected ? "#c8ff00" : "#aaa",
        fontWeight: 600,
        fontSize: "0.85rem",
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
    </button>
  );
}

/* ============ MAIN COMPONENT ============ */
export default function Scanner() {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [progress, setProgress] = useState(0);
  const [scanText, setScanText] = useState(SCAN_STEPS[0]);
  const [leaks, setLeaks] = useState<Leak[]>([]);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  /* scanning animation */
  useEffect(() => {
    if (step !== 3) return;
    let frame = 0;
    const totalMs = 4500;
    const stepMs = totalMs / SCAN_STEPS.length;
    const interval = setInterval(() => {
      frame++;
      const pct = Math.min((frame / (totalMs / 50)) * 100, 100);
      setProgress(pct);
      const idx = Math.min(Math.floor(frame / (stepMs / 50)), SCAN_STEPS.length - 1);
      setScanText(SCAN_STEPS[idx]);
      if (pct >= 100) {
        clearInterval(interval);
        const computed = computeLeaks(q1, q2, q3);
        setLeaks(computed);
        setScore(computeScore(computed));
        setStep(4);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [step, q1, q2, q3]);

  /* scroll to results */
  useEffect(() => {
    if (step === 4 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !email || !industry) return;
    setStep(2);
  };

  const handleStep2 = async () => {
    if (!q1 || !q2 || !q3) return;
    setStep(3);
    setSubmitting(true);
    try {
      await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, email, industry, q1, q2, q3 }),
      });
    } catch {
      /* non-blocking */
    } finally {
      setSubmitting(false);
    }
  };

  const cardStyle: React.CSSProperties = {
    maxWidth: 550,
    margin: "0 auto",
    background: "#1a1a1a",
    borderTop: "3px solid #c8ff00",
    borderRadius: 16,
    padding: "2.5rem",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: 10,
    border: "1px solid rgba(245,245,240,0.1)",
    background: "rgba(245,245,240,0.04)",
    color: "#f5f5f0",
    fontSize: "0.95rem",
    outline: "none",
    marginBottom: "1rem",
    boxSizing: "border-box",
  };

  const btnPrimary: React.CSSProperties = {
    width: "100%",
    padding: "1rem",
    borderRadius: 10,
    border: "none",
    background: "#c8ff00",
    color: "#0a0a0a",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    letterSpacing: "0.5px",
    transition: "transform 0.2s, box-shadow 0.2s",
    marginTop: "0.5rem",
  };

  return (
    <section style={{ background: "#0a0a0a", color: "#f5f5f0", paddingTop: "8rem", paddingBottom: "5rem", minHeight: "100vh" }}>
      {/* Hero */}
      <ScrollReveal>
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto", padding: "0 1.25rem", marginBottom: "3rem" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.35rem 1rem",
              borderRadius: 100,
              border: "1px solid rgba(200,255,0,0.3)",
              color: "#c8ff00",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            FREE TOOL
          </span>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.25rem", letterSpacing: "-1px" }}>
            Your website is losing you money.
            <br />
            <span style={{ color: "#c8ff00" }}>Here&apos;s exactly where.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#aaa", lineHeight: 1.6, maxWidth: 550, margin: "0 auto 1.5rem" }}>
            Enter your URL. In 60 seconds, I&apos;ll show you the 5 revenue leaks hiding on your site — and what to fix first.
          </p>
          <p style={{ fontSize: "0.85rem", color: "#666" }}>
            {/* check icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: 6 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Join 50+ businesses who&apos;ve scanned their sites
          </p>
        </div>
      </ScrollReveal>

      {/* Step 1 — Form */}
      {step === 1 && (
        <ScrollReveal>
          <form onSubmit={handleStep1} style={cardStyle}>
            <input
              type="url"
              required
              placeholder="https://yourbusiness.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={inputStyle}
            />
            <input
              type="email"
              required
              placeholder="you@yourbusiness.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <select
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              style={{ ...inputStyle, appearance: "none", cursor: "pointer", color: industry ? "#f5f5f0" : "#666" }}
            >
              <option value="" disabled>
                Select your industry
              </option>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i} style={{ background: "#1a1a1a", color: "#f5f5f0" }}>
                  {i}
                </option>
              ))}
            </select>
            <button
              type="submit"
              style={btnPrimary}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(200,255,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Scan My Website — Free
            </button>
          </form>
        </ScrollReveal>
      )}

      {/* Step 2 — Questions */}
      {step === 2 && (
        <ScrollReveal>
          <div style={cardStyle}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1.75rem", textAlign: "center" }}>
              A few quick questions to personalize your report
            </h3>

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "0.6rem" }}>
                Do you follow up with website visitors who don&apos;t convert?
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {Q1_OPTIONS.map((o) => (
                  <Pill key={o} label={o} selected={q1 === o} onClick={() => setQ1(o)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "0.6rem" }}>
                Can customers book appointments from your site?
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {Q2_OPTIONS.map((o) => (
                  <Pill key={o} label={o} selected={q2 === o} onClick={() => setQ2(o)} />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <p style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "0.6rem" }}>
                What happens when someone visits your site after hours?
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {Q3_OPTIONS.map((o) => (
                  <Pill key={o} label={o} selected={q3 === o} onClick={() => setQ3(o)} />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleStep2}
              disabled={!q1 || !q2 || !q3 || submitting}
              style={{
                ...btnPrimary,
                opacity: !q1 || !q2 || !q3 ? 0.5 : 1,
                cursor: !q1 || !q2 || !q3 ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (q1 && q2 && q3) {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(200,255,0,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Get My Results
            </button>
          </div>
        </ScrollReveal>
      )}

      {/* Step 3 — Scanning Animation */}
      {step === 3 && (
        <div style={{ ...cardStyle, textAlign: "center" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.9rem", color: "#c8ff00", marginBottom: "1.25rem" }}>
            {scanText}
          </p>
          <div style={{ width: "100%", height: 6, borderRadius: 3, background: "rgba(245,245,240,0.08)", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#c8ff00",
                borderRadius: 3,
                transition: "width 0.1s linear",
              }}
            />
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#666" }}>{Math.round(progress)}%</p>
        </div>
      )}

      {/* Step 4 — Results */}
      {step === 4 && (
        <div ref={resultsRef} style={{ maxWidth: 650, margin: "0 auto", padding: "0 1.25rem" }}>
          {/* Score circle */}
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  border: `4px solid ${scoreColor(score)}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}
              >
                <span style={{ fontSize: "3rem", fontWeight: 800, color: scoreColor(score), lineHeight: 1 }}>
                  {score}
                </span>
                <span style={{ fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>
                  / 100
                </span>
              </div>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, color: scoreColor(score) }}>
                {scoreLabel(score)}
              </p>
            </div>
          </ScrollReveal>

          {/* Leak cards */}
          {leaks.map((leak, i) => (
            <ScrollReveal key={i}>
              <div
                style={{
                  background: "#1a1a1a",
                  borderRadius: 16,
                  padding: "2rem",
                  marginBottom: "1.25rem",
                  borderLeft: `3px solid ${severityColor[leak.severity]}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: 6,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      background: `${severityColor[leak.severity]}18`,
                      color: severityColor[leak.severity],
                    }}
                  >
                    {leak.severity}
                  </span>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0 }}>
                    {leak.title}
                  </h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#aaa", lineHeight: 1.65, marginBottom: "1rem" }}>
                  {leak.description}
                </p>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
                  <span style={{ color: "#c8ff00", fontWeight: 700 }}>The fix: </span>
                  <span style={{ color: "#ccc" }}>{leak.fix}</span>
                </p>
              </div>
            </ScrollReveal>
          ))}

          {/* CTA */}
          <ScrollReveal>
            <div style={{ textAlign: "center", marginTop: "3rem", padding: "2rem 0" }}>
              <p style={{ fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.5, maxWidth: 500, margin: "0 auto 1.5rem", color: "#f5f5f0" }}>
                I built this scanner to show you what&apos;s broken. Now let me show you how fast I can fix it.
              </p>
              <a
                href="/discovery-call"
                style={{
                  display: "inline-block",
                  padding: "1rem 2.5rem",
                  borderRadius: 10,
                  background: "#c8ff00",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(200,255,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                Book a Free Discovery Call — I&apos;ll Walk Through Your Report
              </a>
              <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "1.25rem", maxWidth: 450, margin: "1.25rem auto 0", lineHeight: 1.6 }}>
                I&apos;ll have your report in front of me on the call. We&apos;ll go through each leak and I&apos;ll tell you exactly what I&apos;d build, what it costs, and how fast you&apos;d have it.
              </p>
              <p style={{ fontSize: "0.8rem", color: "#555", marginTop: "1rem", fontStyle: "italic" }}>
                Your report has also been sent to your email.
              </p>
            </div>
          </ScrollReveal>
        </div>
      )}
    </section>
  );
}
