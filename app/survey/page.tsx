"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const TIME_DRAINS = [
  "Answering emails",
  "Scheduling appointments",
  "Following up with leads",
  "Customer support",
  "Social media",
  "Other",
];

const AI_EXPERIENCE = [
  "Yes and loved it",
  "Yes but wasn't impressed",
  "No but curious",
  "No and skeptical",
];

function SurveyForm() {
  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get("e") || "");
  const [timeDrain, setTimeDrain] = useState("");
  const [aiExperience, setAiExperience] = useState("");
  const [blocker, setBlocker] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!timeDrain || !aiExperience) return;
    setLoading(true);
    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers: { timeDrain, aiExperience, blocker } }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: 10,
    border: "1px solid rgba(245,245,240,0.1)",
    background: "rgba(245,245,240,0.04)",
    color: "#f5f5f0",
    fontSize: "0.95rem",
    fontFamily: "'Outfit', sans-serif",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
    boxSizing: "border-box" as const,
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: "1.5rem" }}>
          <circle cx="32" cy="32" r="32" fill="rgba(200,255,0,0.12)" />
          <path d="M20 33l8 8 16-16" stroke="#c8ff00" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "1rem" }}>
          Thanks! Here&apos;s a personalized recommendation.
        </h2>
        <p style={{ color: "#888", fontSize: "1rem", lineHeight: 1.6, marginBottom: "2rem" }}>
          Based on your answers, I can build an AI agent that tackles your biggest pain points. Let me show you exactly what it&apos;d look like.
        </p>
        <a href="/discovery-call" style={{ display: "inline-block", padding: "0.85rem 2rem", borderRadius: 12, background: "#c8ff00", color: "#0a0a0a", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", fontFamily: "'Outfit', sans-serif" }}>
          Book a Discovery Call
        </a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 550, margin: "0 auto", background: "#1a1a1a", borderRadius: 16, padding: "2.5rem", borderTop: "3px solid #c8ff00" }}>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.5rem", textAlign: "center" }}>
        Quick Survey
      </h1>
      <p style={{ color: "#888", fontSize: "0.9rem", textAlign: "center", marginBottom: "2rem" }}>
        3 questions. 30 seconds. Helps me build something useful for you.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Q1 */}
        <div>
          <label style={{ display: "block", color: "#f5f5f0", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem", fontFamily: "'Outfit', sans-serif" }}>
            1. What&apos;s your biggest daily time drain?
          </label>
          <select value={timeDrain} onChange={(e) => setTimeDrain(e.target.value)} style={{ ...selectStyle, color: timeDrain ? "#f5f5f0" : "#888" }}>
            <option value="" disabled>Select one</option>
            {TIME_DRAINS.map((td) => (
              <option key={td} value={td} style={{ background: "#1a1a1a", color: "#f5f5f0" }}>{td}</option>
            ))}
          </select>
        </div>

        {/* Q2 */}
        <div>
          <label style={{ display: "block", color: "#f5f5f0", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem", fontFamily: "'Outfit', sans-serif" }}>
            2. Have you tried AI tools before?
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {AI_EXPERIENCE.map((opt) => (
              <button
                key={opt}
                onClick={() => setAiExperience(opt)}
                style={{
                  padding: "0.7rem 1rem",
                  borderRadius: 10,
                  border: aiExperience === opt ? "1.5px solid #c8ff00" : "1px solid rgba(245,245,240,0.1)",
                  background: aiExperience === opt ? "rgba(200,255,0,0.08)" : "rgba(245,245,240,0.04)",
                  color: aiExperience === opt ? "#c8ff00" : "#f5f5f0",
                  fontSize: "0.9rem",
                  fontFamily: "'Outfit', sans-serif",
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: aiExperience === opt ? 600 : 400,
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div>
          <label style={{ display: "block", color: "#f5f5f0", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem", fontFamily: "'Outfit', sans-serif" }}>
            3. What&apos;s the #1 thing stopping you from hiring an AI agent?
          </label>
          <textarea
            value={blocker}
            onChange={(e) => setBlocker(e.target.value)}
            placeholder="Cost, trust, not sure it'd work for my business..."
            rows={3}
            style={{ ...selectStyle, resize: "vertical", appearance: "auto" as never }}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !timeDrain || !aiExperience}
        style={{
          width: "100%",
          marginTop: "1.5rem",
          padding: "0.95rem",
          borderRadius: 12,
          border: "none",
          background: "#c8ff00",
          color: "#0a0a0a",
          fontSize: "0.95rem",
          fontWeight: 700,
          fontFamily: "'Outfit', sans-serif",
          cursor: loading || !timeDrain || !aiExperience ? "not-allowed" : "pointer",
          opacity: loading || !timeDrain || !aiExperience ? 0.5 : 1,
        }}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}

export default function SurveyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", padding: "6rem clamp(1.25rem,5vw,3rem) 4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Suspense fallback={<div style={{ color: "#888" }}>Loading...</div>}>
        <SurveyForm />
      </Suspense>
    </div>
  );
}
