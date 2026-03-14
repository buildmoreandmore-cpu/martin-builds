"use client";

import { useState, FormEvent } from "react";

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

export default function DemoRequest() {
  const [form, setForm] = useState({ name: "", email: "", businessName: "", websiteUrl: "", industry: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.businessName || !form.industry) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 409) {
        const data = await res.json();
        setError(data.message || "A demo has already been requested with this email address.");
        return;
      }
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: 10,
    border: "1px solid rgba(245,245,240,0.1)",
    background: "rgba(245,245,240,0.04)",
    color: "#f5f5f0",
    fontSize: "0.95rem",
    fontFamily: "'Outfit', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  if (submitted) {
    return (
      <section style={{ minHeight: "100vh", background: "#0a0a0a", padding: "8rem clamp(1.25rem,5vw,3rem) 4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 550, textAlign: "center" }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: "1.5rem" }}>
            <circle cx="32" cy="32" r="32" fill="rgba(200,255,0,0.12)" />
            <path d="M20 33l8 8 16-16" stroke="#c8ff00" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "1rem" }}>Your demo is being built.</h2>
          <p style={{ color: "#888", fontSize: "1rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            We&apos;re training an AI agent on <span style={{ color: "#c8ff00" }}>{form.businessName}</span> right now. You&apos;ll receive a link at <span style={{ color: "#c8ff00" }}>{form.email}</span> within the hour.
          </p>
          <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1rem" }}>While you wait:</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/scan" style={{ padding: "0.7rem 1.5rem", borderRadius: 10, border: "1px solid rgba(200,255,0,0.3)", color: "#c8ff00", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, transition: "all 0.2s" }}>
              Scan your website for revenue leaks
            </a>
            <a href="/ai-agent" style={{ padding: "0.7rem 1.5rem", borderRadius: 10, border: "1px solid rgba(245,245,240,0.1)", color: "#888", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, transition: "all 0.2s" }}>
              Learn more about AI agents
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ minHeight: "100vh", background: "#0a0a0a", padding: "8rem clamp(1.25rem,5vw,3rem) 4rem" }}>
      {/* Hero */}
      <div style={{ maxWidth: 650, margin: "0 auto 3rem", textAlign: "center" }}>
        <span style={{ display: "inline-block", padding: "0.35rem 1rem", borderRadius: 100, border: "1px solid rgba(200,255,0,0.3)", color: "#c8ff00", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Space Mono', monospace", marginBottom: "1.25rem" }}>
          FREE DEMO
        </span>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#f5f5f0", lineHeight: 1.15, marginBottom: "1rem" }}>
          See your AI agent in action — built for <span style={{ color: "#c8ff00" }}>your</span> business.
        </h1>
        <p style={{ color: "#888", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
          Tell us about your business. We&apos;ll build a custom AI agent demo trained on your website and send you the link within the hour.
        </p>
        <p style={{ color: "#555", fontSize: "0.85rem", fontStyle: "italic" }}>
          Every demo is built specifically for your business — not a generic template.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: 550, margin: "0 auto", background: "#1a1a1a", borderRadius: 16, padding: "2.5rem", borderTop: "3px solid #c8ff00" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            required
          />
          <input
            type="email"
            placeholder="you@yourbusiness.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Your business name"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            style={inputStyle}
            required
          />
          <input
            type="url"
            placeholder="https://yourbusiness.com (optional)"
            value={form.websiteUrl}
            onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
            style={inputStyle}
          />
          <select
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            required
            style={{ ...inputStyle, color: form.industry ? "#f5f5f0" : "#888", appearance: "none", cursor: "pointer" }}
          >
            <option value="" disabled>Select your industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind} style={{ background: "#1a1a1a", color: "#f5f5f0" }}>{ind}</option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "#ff4444", fontSize: "0.85rem", marginTop: "0.75rem" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
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
            cursor: loading ? "wait" : "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(200,255,0,0.3)"; }}}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
        >
          {loading ? "Building..." : "Build My Demo — Free"}
        </button>
      </form>
    </section>
  );
}
