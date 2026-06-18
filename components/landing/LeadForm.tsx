"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import { BUDGET_RANGES } from "@/lib/landing-pages";

// Rough USD midpoints for the conversion `value` pushed to dataLayer.
const BUDGET_VALUE: Record<string, number> = {
  "Under $5k": 3000,
  "$5k – $10k": 7500,
  "$10k – $25k": 17500,
  "$25k+": 30000,
  "Not sure yet": 0,
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function LeadForm({
  channel,
  defaultCampaign,
  ctaLabel,
}: {
  channel: string;
  defaultCampaign: string;
  ctaLabel: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    project_description: "",
    budget_range: "",
  });

  // Capture attribution from the URL on first mount of the landing page.
  useEffect(() => {
    captureAttribution();
  }, []);

  const valid =
    form.name.trim() &&
    form.email.includes("@") &&
    form.project_description.trim() &&
    form.budget_range;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError("");

    const { firstTouch, lastTouch } = getAttribution();

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          channel,
          defaultCampaign,
          landing_page: typeof window !== "undefined" ? window.location.pathname : `/go/${channel}`,
          firstTouch,
          lastTouch,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Conversion hook — GTM picks this up for Google Ads conversion tracking.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "lead_submit",
        value: BUDGET_VALUE[form.budget_range] ?? 0,
        currency: "USD",
        channel,
      });

      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Field label="Name" htmlFor="lf-name">
        <input
          id="lf-name"
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      <Field label="Email" htmlFor="lf-email">
        <input
          id="lf-email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      <Field label="Company" htmlFor="lf-company">
        <input
          id="lf-company"
          type="text"
          placeholder="Company name (optional)"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      <Field label="What do you want built?" htmlFor="lf-desc">
        <textarea
          id="lf-desc"
          placeholder="Describe the platform, dashboard, or portal you need..."
          value={form.project_description}
          onChange={(e) => setForm({ ...form, project_description: e.target.value })}
          required
          rows={5}
          style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      <Field label="Budget range" htmlFor="lf-budget">
        <div style={{ position: "relative" }}>
          <select
            id="lf-budget"
            value={form.budget_range}
            onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
            required
            style={{
              ...inputStyle,
              appearance: "none",
              cursor: "pointer",
              color: form.budget_range ? "#f5f5f0" : "rgba(245,245,240,0.25)",
              paddingRight: "2.5rem",
            }}
          >
            <option value="" style={optionStyle}>
              Select a budget range...
            </option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b} style={optionStyle}>
                {b}
              </option>
            ))}
          </select>
          <span style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1l5 5 5-5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </span>
        </div>
      </Field>

      {error ? (
        <p style={{ color: "#ff6b6b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={!valid || submitting}
        style={{
          width: "100%",
          padding: "1rem",
          background: valid && !submitting ? "#c8ff00" : "rgba(200,255,0,0.3)",
          color: "#0a0a0a",
          border: "none",
          borderRadius: "100px",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          cursor: valid && !submitting ? "pointer" : "not-allowed",
          opacity: valid && !submitting ? 1 : 0.6,
          transition: "all 0.3s",
          marginTop: "0.5rem",
        }}
      >
        {submitting ? "Sending..." : ctaLabel}
      </button>
    </form>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.currentTarget.style.borderColor = "#c8ff00");
const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.currentTarget.style.borderColor = "rgba(245,245,240,0.08)");

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.9rem",
  fontWeight: 600,
  marginBottom: "0.4rem",
  color: "#f5f5f0",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  background: "#2a2a2a",
  border: "1px solid rgba(245,245,240,0.08)",
  borderRadius: "10px",
  color: "#f5f5f0",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.3s",
  display: "block",
};

const optionStyle: React.CSSProperties = { background: "#2a2a2a", color: "#f5f5f0" };
