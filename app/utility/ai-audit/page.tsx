"use client";

import { useState, useEffect, useCallback } from "react";
import Nav from "@/components/Nav";

export default function AIGapAudit() {
  const [step, setStep] = useState(0); // 0-6 = questions, 7 = loading, 8 = report
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [loadingText, setLoadingText] = useState(0);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [animatingIn, setAnimatingIn] = useState(true);

  const totalQuestions = 7;

  const loadingMessages = [
    "Analyzing your business profile...",
    "Identifying your biggest gaps...",
    "Calculating potential ROI...",
    "Building your personalized report...",
  ];

  // Loading stage timer
  useEffect(() => {
    if (step !== 7) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx >= loadingMessages.length) {
        clearInterval(interval);
        setStep(8);
        return;
      }
      setLoadingText(idx);
    }, 750);
    return () => clearInterval(interval);
  }, [step]);

  // Report section stagger
  useEffect(() => {
    if (step !== 8) return;
    const sections = [0, 1, 2, 3, 4, 5];
    sections.forEach((s, i) => {
      setTimeout(() => setVisibleSections((prev) => [...prev, s]), i * 100);
    });
  }, [step]);

  // Animate in on step change
  useEffect(() => {
    setAnimatingIn(true);
    const t = setTimeout(() => setAnimatingIn(false), 50);
    return () => clearTimeout(t);
  }, [step]);

  const selectSingle = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
    setTimeout(() => setStep((s) => s + 1), 300);
  };

  const toggleMulti = (value: string) => {
    setAnswers((prev) => {
      const current = (prev[step] as string[]) || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [step]: next };
    });
  };

  const nextStep = () => setStep((s) => s + 1);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setLoadingText(0);
    setVisibleSections([]);
  };

  // --- Score Calculation ---
  const calcScore = useCallback(() => {
    let score = 15;
    // Q2 tools (index 2)
    const tools = (answers[2] as string[]) || [];
    const realTools = tools.filter(
      (t) => t !== "Spreadsheets for everything" && t !== "Paper / nothing digital"
    );
    if (realTools.length >= 3) score += 20;
    else if (realTools.length >= 1) score += 10;

    // Q5 AI experience (index 5)
    const ai = answers[5] as string;
    if (ai === "We have an AI strategy") score += 25;
    else if (ai === "Using a few AI tools") score += 15;
    else if (ai === "Tried ChatGPT casually") score += 10;

    // Q1 team size (index 1)
    const team = answers[1] as string;
    if (team === "6–20" || team === "20+") score += 10;
    else if (team === "Just me" || team === "2–5") score += 5;

    // Q4 LTV (index 4)
    const ltv = answers[4] as string;
    if (ltv === "$2,000–$10,000" || ltv === "$10,000+") score += 15;

    return Math.min(score, 100);
  }, [answers]);

  const getTier = (score: number) => {
    if (score < 30) return "Early stage — significant opportunity";
    if (score < 50) return "Developing — you're leaving money on the table";
    if (score < 70) return "Progressing — a few key gaps to close";
    return "Advanced — ready to scale with AI";
  };

  // --- Gap Mapping ---
  const gapMap: Record<string, { title: string; current: string; aiState: string; time: string; maxHrs: number }> = {
    "Chasing payments": { title: "Chasing Payments", current: "Manual invoice follow-up", aiState: "Automated payment reminders + escalation workflows", time: "3–5 hrs/week", maxHrs: 5 },
    "Following up on leads": { title: "Following Up on Leads", current: "Leaky lead pipeline", aiState: "AI-powered lead scoring + automated follow-up sequences", time: "4–6 hrs/week", maxHrs: 6 },
    "Scheduling & dispatch": { title: "Scheduling & Dispatch", current: "Manual scheduling overhead", aiState: "Smart scheduling with route optimization + auto-dispatch", time: "5–8 hrs/week", maxHrs: 8 },
    "Reporting & tracking": { title: "Reporting & Tracking", current: "No real-time visibility", aiState: "Live dashboards with automated daily/weekly reports", time: "3–4 hrs/week", maxHrs: 4 },
    "Customer communication": { title: "Customer Communication", current: "Inconsistent follow-through", aiState: "Automated status updates + AI chat for common questions", time: "2–4 hrs/week", maxHrs: 4 },
    "Hiring & onboarding": { title: "Hiring & Onboarding", current: "Manual onboarding drag", aiState: "Streamlined onboarding portal with auto-checklists", time: "4–6 hrs/week", maxHrs: 6 },
  };

  const getTopGaps = () => {
    const selected = (answers[3] as string[]) || [];
    const mapped = selected
      .filter((s) => gapMap[s])
      .map((s) => ({ key: s, ...gapMap[s] }))
      .sort((a, b) => b.maxHrs - a.maxHrs);
    return mapped.slice(0, 3);
  };

  // --- Build Recommendation ---
  const buildMap: Record<string, { name: string; outcome: string; bullets: string[] }> = {
    "Home Services": {
      name: "Field Service Command Center",
      outcome: "Most home service operators lose 8+ hours a week to scheduling chaos and missed follow-ups. This eliminates both.",
      bullets: [
        "Automated job scheduling + route-optimized dispatch",
        "AI-powered invoice generation + payment follow-up",
        "Real-time crew tracking dashboard",
        "Customer portal with live job status updates",
      ],
    },
    "Staffing Agency": {
      name: "Coverage & Placement Portal",
      outcome: "Manual shift coverage and candidate tracking costs staffing operators more time than any other single task. This replaces both with one system.",
      bullets: [
        "AI-matched candidate-to-job placement engine",
        "Automated shift coverage + no-show backfill",
        "Client & worker portals with real-time updates",
        "Compliance tracking with auto-generated reports",
      ],
    },
    "Real Estate": {
      name: "Lead & Deal Command Center",
      outcome: "Most real estate operators have no single view of their pipeline, deals, and marketing spend. This gives you that view in real time.",
      bullets: [
        "AI lead scoring + automated nurture sequences",
        "Deal pipeline with smart follow-up reminders",
        "Automated CMA and listing presentation builder",
        "Client portal with document signing + status tracking",
      ],
    },
    "Restaurant": {
      name: "Restaurant Owner Dashboard",
      outcome: "Food cost and customer retention are the two levers most restaurant owners manage manually every week. This automates both.",
      bullets: [
        "Automated inventory tracking + reorder alerts",
        "Staff scheduling with labor cost optimization",
        "Customer feedback loop with AI sentiment analysis",
        "Daily P&L dashboard with food cost breakdown",
      ],
    },
    "Inspection / Compliance": {
      name: "Compliance Operations Portal",
      outcome: "Certificate expiries and renewal follow-ups are the most common source of lost revenue in compliance businesses. This tracks and automates both.",
      bullets: [
        "AI-powered inspection report generation from photos",
        "Automated compliance checklist + violation tracking",
        "Client scheduling portal with auto-reminders",
        "Regulatory deadline tracking with alert system",
      ],
    },
    "Other Service Business": {
      name: "Custom Business Command Center",
      outcome: "Most service businesses run across 4\u20136 disconnected tools with no single source of truth. This gives you one.",
      bullets: [
        "Automated client onboarding + intake workflows",
        "AI-powered task management + priority engine",
        "Revenue tracking dashboard with forecasting",
        "Client communication portal with auto-updates",
      ],
    },
  };

  const getBuild = () => {
    const biz = (answers[0] as string) || "Other Service Business";
    return buildMap[biz] || buildMap["Other Service Business"];
  };

  const getPrice = () => {
    const ltv = answers[4] as string;
    if (ltv === "$2,000–$10,000") return "$7,500";
    if (ltv === "$10,000+") return "$10,000";
    return "$5,000";
  };

  const getPriceNum = () => {
    const ltv = answers[4] as string;
    if (ltv === "$2,000–$10,000") return 7500;
    if (ltv === "$10,000+") return 10000;
    return 5000;
  };

  const getTotalHours = () => {
    const gaps = getTopGaps();
    return gaps.reduce((sum, g) => sum + g.maxHrs, 0);
  };

  // --- Questions ---
  const questions: {
    question: string;
    type: "single" | "multi";
    options: string[];
  }[] = [
    {
      question: "What type of business do you run?",
      type: "single",
      options: [
        "Home Services",
        "Staffing Agency",
        "Real Estate",
        "Restaurant",
        "Inspection / Compliance",
        "Other Service Business",
      ],
    },
    {
      question: "How many people work in your business (including you)?",
      type: "single",
      options: ["Just me", "2–5", "6–20", "20+"],
    },
    {
      question: "Which of these are you currently using?",
      type: "multi",
      options: [
        "CRM (HubSpot, Salesforce, etc.)",
        "Scheduling software",
        "Invoicing / QuickBooks",
        "Job management (Jobber, ServiceTitan)",
        "Spreadsheets for everything",
        "Paper / nothing digital",
      ],
    },
    {
      question: "Where does most of your time go that you wish it didn't?",
      type: "multi",
      options: [
        "Chasing payments",
        "Following up on leads",
        "Scheduling & dispatch",
        "Reporting & tracking",
        "Customer communication",
        "Hiring & onboarding",
      ],
    },
    {
      question: "What does a new customer mean to your business?",
      type: "single",
      options: ["Under $500", "$500–$2,000", "$2,000–$10,000", "$10,000+"],
    },
    {
      question: "Have you tried AI tools before?",
      type: "single",
      options: [
        "Never",
        "Tried ChatGPT casually",
        "Using a few AI tools",
        "We have an AI strategy",
      ],
    },
    {
      question: "What's your biggest fear about building something custom?",
      type: "single",
      options: [
        "Cost",
        "It won't actually work",
        "Takes too long",
        "I don't know where to start",
        "My team won't use it",
      ],
    },
  ];

  const currentQ = questions[step];
  const multiSelected = (answers[step] as string[]) || [];

  // --- Score ring SVG ---
  const ScoreRing = ({ score }: { score: number }) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    return (
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#2a2a2a" strokeWidth="8" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#C8F135"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
        <text x="70" y="62" textAnchor="middle" fill="#f5f5f0" fontSize="32" fontWeight="700" fontFamily="'Outfit', sans-serif">
          {score}
        </text>
        <text x="70" y="82" textAnchor="middle" fill="#888" fontSize="12" fontFamily="'Outfit', sans-serif">
          / 100
        </text>
      </svg>
    );
  };

  // --- Render ---
  // STAGE 2: Loading
  if (step === 7) {
    return (
      <>
        <Nav />
        <div
          style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div style={{ width: "100%", maxWidth: "400px", marginBottom: "2rem" }}>
            <div
              style={{
                height: "4px",
                background: "#2a2a2a",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#C8F135",
                  borderRadius: "2px",
                  width: `${((loadingText + 1) / loadingMessages.length) * 100}%`,
                  transition: "width 0.7s ease-out",
                }}
              />
            </div>
          </div>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.15rem",
              color: "#f5f5f0",
              textAlign: "center",
              minHeight: "2rem",
            }}
          >
            {loadingMessages[loadingText]}
          </p>
        </div>
      </>
    );
  }

  // STAGE 3: Report
  if (step === 8) {
    const score = calcScore();
    const tier = getTier(score);
    const gaps = getTopGaps();
    const build = getBuild();
    const bizTypeLabels: Record<string, string> = {
      "Home Services": "Home Services",
      "Staffing Agency": "Staffing",
      "Real Estate": "Real Estate",
      "Restaurant": "Restaurant",
      "Inspection / Compliance": "Inspection & Compliance",
      "Other Service Business": "Service Business",
    };
    const bizLabel = bizTypeLabels[(answers[0] as string)] || "Service Business";
    const fearResponses: Record<string, string> = {
      "Cost": "Fixed price, locked before we start. No invoices that surprise you.",
      "It won't actually work": "Every build ships with a full walkthrough. If it doesn\u2019t work for your team, we fix it.",
      "Takes too long": "14 days. Locked timeline before we touch a line of code.",
      "I don't know where to start": "That\u2019s what the discovery call is for. 30 minutes and you\u2019ll have a clear picture.",
      "My team won't use it": "We build around how your team already works. Adoption is designed in, not hoped for.",
    };
    const fearResponse = fearResponses[(answers[6] as string)] || "";
    const price = getPrice();
    const totalHrs = getTotalHours();
    const weeklyValue = totalHrs * 75;
    const paybackMonths = Math.round((getPriceNum() / weeklyValue / 4.33) * 10) / 10;

    const sectionStyle = (idx: number): React.CSSProperties => ({
      opacity: visibleSections.includes(idx) ? 1 : 0,
      transform: visibleSections.includes(idx) ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
    });

    return (
      <>
        <Nav />
        <div
          style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            padding: "7rem clamp(1.25rem,5vw,3rem) 4rem",
          }}
        >
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            {/* SECTION A: Score */}
            <div style={{ ...sectionStyle(0), textAlign: "center", marginBottom: "3rem" }}>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#C8F135",
                  marginBottom: "1.5rem",
                }}
              >
                Your {bizLabel} AI Readiness Score
              </p>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
                <ScoreRing score={score} />
              </div>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#f5f5f0",
                  marginBottom: "0.5rem",
                }}
              >
                {tier}
              </p>
              <p style={{ color: "#888", fontSize: "0.9rem" }}>
                Based on your tools, team size, and AI experience
              </p>
            </div>

            {/* SECTION B: Top 3 Gaps */}
            {gaps.length > 0 && (
              <div style={{ ...sectionStyle(1), marginBottom: "3rem" }}>
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#f5f5f0",
                    marginBottom: "1.25rem",
                  }}
                >
                  Your Top {gaps.length} Gap{gaps.length !== 1 ? "s" : ""}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {gaps.map((gap, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#1a1a1a",
                        border: "1px solid #2a2a2a",
                        borderRadius: "12px",
                        padding: "1.5rem",
                      }}
                    >
                      <p
                        style={{
                          color: "#C8F135",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          marginBottom: "0.75rem",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        {gap.title}
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "1rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <div>
                          <p style={{ color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.25rem" }}>
                            Current State
                          </p>
                          <p style={{ color: "#f5f5f0", fontSize: "0.9rem" }}>{gap.current}</p>
                        </div>
                        <div>
                          <p style={{ color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.25rem" }}>
                            AI-Possible
                          </p>
                          <p style={{ color: "#f5f5f0", fontSize: "0.9rem" }}>{gap.aiState}</p>
                        </div>
                      </div>
                      <p style={{ color: "#888", fontSize: "0.85rem" }}>
                        Time lost: <span style={{ color: "#C8F135" }}>{gap.time}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION C: ROI Snapshot */}
            <div style={{ ...sectionStyle(2), marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#f5f5f0",
                  marginBottom: "1.25rem",
                }}
              >
                ROI Snapshot
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                }}
              >
                {[
                  { label: "Hours recovered / week", value: `${totalHrs}` },
                  { label: "Est. weekly value", value: `$${weeklyValue.toLocaleString()}` },
                  { label: "Payback period", value: `${paybackMonths} mo` },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      borderRadius: "12px",
                      padding: "1.25rem",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "#C8F135",
                        fontWeight: 700,
                        fontSize: "1.75rem",
                        fontFamily: "'Outfit', sans-serif",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {item.value}
                    </p>
                    <p style={{ color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION D: What We'd Build */}
            <div style={{ ...sectionStyle(3), marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#f5f5f0",
                  marginBottom: "1.25rem",
                }}
              >
                What We&apos;d Build For You
              </h2>
              <div
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <p
                  style={{
                    color: "#C8F135",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    marginBottom: "0.5rem",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {build.name}
                </p>
                <p
                  style={{
                    color: "#f5f5f0",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  {build.outcome}
                </p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.25rem" }}>
                  {build.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        color: "#f5f5f0",
                        fontSize: "0.9rem",
                        padding: "0.4rem 0",
                        paddingLeft: "1.25rem",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#C8F135",
                        }}
                      >
                        +
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    borderTop: "1px solid #2a2a2a",
                    paddingTop: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p style={{ color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                      Timeline
                    </p>
                    <p style={{ color: "#f5f5f0", fontWeight: 600, fontSize: "1rem" }}>14 days</p>
                  </div>
                  <div>
                    <p style={{ color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                      Starting at
                    </p>
                    <p style={{ color: "#C8F135", fontWeight: 700, fontSize: "1rem" }}>{price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION E: CTA */}
            <div style={{ ...sectionStyle(4), marginBottom: "3rem" }}>
              <div
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: "12px",
                  padding: "2.5rem",
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#f5f5f0",
                    marginBottom: "0.5rem",
                  }}
                >
                  Ready to close these gaps?
                </h2>
                <p style={{ color: "#888", fontSize: "0.95rem", marginBottom: "1rem", maxWidth: "480px", margin: "0 auto 1rem" }}>
                  Book a free 15-minute call and we&apos;ll walk through your report together.
                </p>
                {fearResponse && (
                  <p style={{ color: "#888", fontSize: "0.85rem", fontStyle: "italic", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem" }}>
                    {fearResponse}
                  </p>
                )}
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <a
                    href="/contact"
                    style={{
                      background: "#C8F135",
                      color: "#0a0a0a",
                      padding: "0.85rem 2rem",
                      borderRadius: "100px",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(200,241,53,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    }}
                  >
                    Book a 15-min call &rarr;
                  </a>
                  <a
                    href="/demo"
                    style={{
                      border: "1px solid #2a2a2a",
                      color: "#f5f5f0",
                      padding: "0.85rem 2rem",
                      borderRadius: "100px",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      background: "transparent",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C8F135";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a";
                    }}
                  >
                    See live demos &rarr;
                  </a>
                </div>
                <p style={{ color: "#666", fontSize: "0.8rem", marginTop: "1.5rem" }}>
                  No retainer. No consulting fee. A fixed-price build delivered in 14 days.
                </p>
              </div>
            </div>

            {/* Retake */}
            <div style={{ ...sectionStyle(5), textAlign: "center" }}>
              <button
                onClick={reset}
                style={{
                  background: "none",
                  border: "1px solid #2a2a2a",
                  color: "#888",
                  padding: "0.65rem 1.5rem",
                  borderRadius: "100px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s",
                  fontFamily: "'Outfit', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#f5f5f0";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#C8F135";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#888";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a";
                }}
              >
                Retake audit
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // STAGE 1: Questions
  return (
    <>
      <Nav />
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "7rem 1.5rem 3rem",
        }}
      >
        {/* Progress bar */}
        <div style={{ width: "100%", maxWidth: "560px", marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#888", letterSpacing: "1px", textTransform: "uppercase" }}>
              AI Gap Audit
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#888" }}>
              {step + 1} / {totalQuestions}
            </span>
          </div>
          <div style={{ height: "3px", background: "#2a2a2a", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                background: "#C8F135",
                borderRadius: "2px",
                width: `${((step + 1) / totalQuestions) * 100}%`,
                transition: "width 0.4s ease-out",
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            opacity: animatingIn ? 0 : 1,
            transform: animatingIn ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
          }}
        >
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1.4rem, 4vw, 1.75rem)",
              fontWeight: 700,
              color: "#f5f5f0",
              lineHeight: 1.3,
              marginBottom: "2rem",
            }}
          >
            {currentQ.question}
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {currentQ.options.map((option) => {
              const isSelected =
                currentQ.type === "single"
                  ? answers[step] === option
                  : multiSelected.includes(option);

              return (
                <button
                  key={option}
                  onClick={() =>
                    currentQ.type === "single"
                      ? selectSingle(option)
                      : toggleMulti(option)
                  }
                  style={{
                    background: isSelected ? "rgba(200,241,53,0.1)" : "#1a1a1a",
                    border: `1px solid ${isSelected ? "#C8F135" : "#2a2a2a"}`,
                    color: isSelected ? "#C8F135" : "#f5f5f0",
                    padding: "0.9rem 1.25rem",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#C8F135";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a";
                    }
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Continue button for multi-select */}
          {currentQ.type === "multi" && (
            <button
              onClick={nextStep}
              disabled={multiSelected.length === 0}
              style={{
                marginTop: "1.5rem",
                background: multiSelected.length > 0 ? "#C8F135" : "#2a2a2a",
                color: multiSelected.length > 0 ? "#0a0a0a" : "#666",
                padding: "0.85rem 2rem",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "0.9rem",
                border: "none",
                cursor: multiSelected.length > 0 ? "pointer" : "not-allowed",
                fontFamily: "'Outfit', sans-serif",
                transition: "all 0.2s",
              }}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </>
  );
}
