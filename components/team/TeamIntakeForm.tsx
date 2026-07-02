"use client";

import { useState } from "react";

const LANES = ["Hiring Engine (volume roles)", "Team Launch (opening / full roster)", "Sourced Introduction (specialist role)", "Not sure yet"];
const VOLUME = ["1 role", "2–4 roles", "5–10 roles", "10+ roles"];
const TIMELINE = ["ASAP", "Within 30 days", "1–3 months", "Just exploring"];

export default function TeamIntakeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", business: "", lane: LANES[0], roles: "", volume: VOLUME[0], timeline: TIMELINE[0] });

  const valid = form.name.trim() && form.email.includes("@") && form.roles.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    const message = `BUILD YOUR TEAM — intake request

Lane: ${form.lane}
Roles needed: ${form.roles}
Volume: ${form.volume}
Timeline: ${form.timeline}`;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, business: form.business, type: "Build Your Team", message }),
      });
    } catch { /* silent */ }
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ animation: "fadeIn 0.5s ease", padding: "3rem", background: "#1a1a1a", border: "1px solid rgba(200,255,0,0.15)", borderRadius: "16px", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
          <svg width="24" height="19" viewBox="0 0 24 19" fill="none"><path d="M1.5 9.5L8.5 16.5L22.5 1.5" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>Got it.</h3>
        <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.6 }}>We&rsquo;ll come back with the machine and the price — usually within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
      <Field label="Name" required>
        <input required type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
      </Field>
      <Field label="Email" required>
        <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
      </Field>
      <Field label="Business">
        <input type="text" placeholder="Business name" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} style={inputStyle} />
      </Field>
      <Field label="What are you hiring for?" required>
        <select value={form.lane} onChange={(e) => setForm({ ...form, lane: e.target.value })} style={inputStyle}>
          {LANES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </Field>
      <Field label="Which roles?" required>
        <input required type="text" placeholder="e.g. Home care nurses, front desk, line cooks" value={form.roles} onChange={(e) => setForm({ ...form, roles: e.target.value })} style={inputStyle} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
        <Field label="Volume">
          <select value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} style={inputStyle}>
            {VOLUME.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Timeline">
          <select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} style={inputStyle}>
            {TIMELINE.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        disabled={!valid || submitting}
        style={{
          marginTop: "0.5rem", padding: "1rem", background: valid ? "#c8ff00" : "#333", color: valid ? "#0a0a0a" : "#666",
          border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "0.95rem", cursor: valid ? "pointer" : "not-allowed",
          transition: "all 0.2s",
        }}
      >
        {submitting ? "Sending…" : "Tell us who you need"}
      </button>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontSize: "0.75rem", color: "#888", fontWeight: 600, marginBottom: "0.4rem", display: "block" }}>
        {label}{required && <span style={{ color: "#c8ff00" }}> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem 1rem",
  background: "#141414",
  border: "1px solid rgba(245,245,240,0.1)",
  borderRadius: "8px",
  color: "#f5f5f0",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  outline: "none",
};
