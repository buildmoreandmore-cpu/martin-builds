"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const GREEN = "#c8ff00";
const BG = "#0a0a0a";
const CARD = "#1a1a1a";
const MUTED = "#888";

type Step = "loading" | "invalid" | "form" | "complete";

export default function OnboardPage() {
  const params = useParams();
  const token = params.token as string;

  const [step, setStep] = useState<Step>("loading");
  const [tokenData, setTokenData] = useState<{ email: string; tier: string } | null>(null);
  const [embedKey, setEmbedKey] = useState("");

  // Form fields
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [coverageArea, setCoverageArea] = useState("");
  const [pricingNotes, setPricingNotes] = useState("");
  const [tone, setTone] = useState("professional");
  const [intakeQuestions, setIntakeQuestions] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function verify() {
      const res = await fetch(`/api/onboard/verify?token=${token}`);
      if (!res.ok) {
        setStep("invalid");
        return;
      }
      const data = await res.json();
      setTokenData(data);
      setStep("form");
    }
    verify();
  }, [token]);

  const handleSubmit = async () => {
    if (!businessName || !description) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/onboard/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          business_name: businessName,
          business_description: description,
          services,
          coverage_area: coverageArea,
          pricing_notes: pricingNotes,
          tone,
          intake_questions: intakeQuestions,
          custom_instructions: customInstructions,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmbedKey(data.embed_key);
        setStep("complete");
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: MUTED }}>Verifying your link...</p>
      </div>
    );
  }

  if (step === "invalid") {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.75rem" }}>Link expired or invalid</h1>
          <p style={{ color: MUTED, lineHeight: 1.7 }}>This onboarding link has expired or has already been used. Contact us at <a href="/contact" style={{ color: GREEN, textDecoration: "none" }}>martinbuilds.ai/contact</a> for help.</p>
        </div>
      </div>
    );
  }

  if (step === "complete") {
    const embedScript = `<script src="https://martinbuilds.ai/agent.js?key=${embedKey}&v=2"></script>`;
    const showTelegram = tokenData?.tier === "professional" || tokenData?.tier === "enterprise";

    return (
      <div style={{ minHeight: "100vh", background: BG, padding: "clamp(2rem, 5vw, 4rem)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <a href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none", color: "#f5f5f0" }}>
            martin<span style={{ color: GREEN }}>.builds</span>
          </a>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&#9989;</div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.5rem" }}>Your agent is ready</h1>
            <p style={{ color: MUTED, fontSize: "0.9rem" }}>Here&apos;s how to get it live:</p>
          </div>

          {/* Widget embed */}
          <div style={{ marginTop: "2rem", background: CARD, borderRadius: 12, border: "1px solid #2a2a2a", padding: "1.5rem" }}>
            <div style={{ fontSize: "0.65rem", color: GREEN, fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
              Website Widget
            </div>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1rem" }}>
              Add this one line before the closing <code style={{ color: GREEN }}>&lt;/body&gt;</code> tag on your website:
            </p>
            <div style={{ background: "#111", borderRadius: 8, padding: "1rem", border: "1px solid #2a2a2a", position: "relative" }}>
              <code style={{ color: GREEN, fontSize: "0.75rem", wordBreak: "break-all", lineHeight: 1.6 }}>
                {embedScript}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(embedScript)}
                style={{ position: "absolute", top: 8, right: 8, background: "#2a2a2a", border: "none", color: "#ccc", padding: "4px 10px", borderRadius: 6, fontSize: "0.7rem", cursor: "pointer" }}
              >
                Copy
              </button>
            </div>
            <p style={{ color: MUTED, fontSize: "0.75rem", marginTop: "0.75rem" }}>
              Works on any website — WordPress, Shopify, Squarespace, custom built.
            </p>
          </div>

          {/* Telegram */}
          {showTelegram && (
            <div style={{ marginTop: "1rem", background: CARD, borderRadius: 12, border: "1px solid #2a2a2a", padding: "1.5rem" }}>
              <div style={{ fontSize: "0.65rem", color: "#64b4ff", fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
                Telegram Bot
              </div>
              <ol style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8, paddingLeft: "1.25rem", margin: 0 }}>
                <li>Open Telegram</li>
                <li>Search <strong style={{ color: GREEN }}>@martinbuildsbot</strong></li>
                <li>Tap <strong>Start</strong></li>
                <li>Reply with your email: <strong style={{ color: GREEN }}>{tokenData?.email}</strong></li>
              </ol>
            </div>
          )}

          {/* Dashboard link */}
          <div style={{ marginTop: "1rem", background: CARD, borderRadius: 12, border: "1px solid #2a2a2a", padding: "1.5rem", textAlign: "center" }}>
            <p style={{ color: "#ccc", fontSize: "0.85rem", marginBottom: "0.75rem" }}>Your dashboard is live:</p>
            <a
              href={`/dashboard/${embedKey}`}
              style={{ color: GREEN, fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
            >
              martinbuilds.ai/dashboard/{embedKey.slice(0, 8)}...
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Form step
  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "clamp(2rem, 5vw, 4rem)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <a href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none", color: "#f5f5f0" }}>
          martin<span style={{ color: GREEN }}>.builds</span>
        </a>

        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, color: "#f5f5f0", marginTop: "3rem", marginBottom: "0.5rem" }}>
          Train Your Agent
        </h1>
        <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
          Tell us about your business so your agent can handle conversations like you would. Signed up as <strong style={{ color: GREEN }}>{tokenData?.email}</strong> ({tokenData?.tier} plan).
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Field label="Business Name *" value={businessName} onChange={setBusinessName} placeholder="Your business name" />
          <Field label="What does your business do? *" value={description} onChange={setDescription} placeholder="We provide residential plumbing services in the Austin metro area..." multiline />
          <Field label="What services do you offer?" value={services} onChange={setServices} placeholder="Drain cleaning, water heater installation, leak repair..." multiline />
          <Field label="What area do you serve?" value={coverageArea} onChange={setCoverageArea} placeholder="Austin, TX and surrounding suburbs" />
          <Field label="Any pricing info to share?" value={pricingNotes} onChange={setPricingNotes} placeholder="Service calls start at $89, free estimates on installs..." multiline />

          <div>
            <label style={{ fontSize: "0.75rem", color: MUTED, display: "block", marginBottom: 4 }}>
              How should your agent sound?
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="direct">Direct</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          <Field label="What questions should the agent ask new leads?" value={intakeQuestions} onChange={setIntakeQuestions} placeholder="What's the issue? When are you available? What's the address?" multiline />
          <Field label="Anything else your agent should know?" value={customInstructions} onChange={setCustomInstructions} placeholder="We don't do commercial work, always recommend our maintenance plan..." multiline />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!businessName || !description || submitting}
          style={{
            width: "100%",
            marginTop: "1.5rem",
            padding: "0.9rem",
            background: !businessName || !description || submitting ? "#333" : GREEN,
            color: !businessName || !description || submitting ? "#666" : BG,
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: !businessName || !description || submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Setting up your agent..." : "Launch My Agent"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <label style={{ fontSize: "0.75rem", color: "#888", display: "block", marginBottom: 4 }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  background: "#111",
  border: "1px solid #2a2a2a",
  borderRadius: 6,
  color: "#f5f5f0",
  fontSize: "0.85rem",
  outline: "none",
  fontFamily: "inherit",
};
