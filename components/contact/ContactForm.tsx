"use client";

import { useState } from "react";

const PROJECT_TYPES = [
  "Select project type...",
  "AI-Powered Website",
  "AI Build Sprint",
  "Full Product / SaaS",
  "AI Power Hour",
  "Just a Question",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", biz: "", type: "", message: "" });

  const valid = form.name.trim() && form.email.includes("@") && form.message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ animation: "fadeIn 0.5s ease", padding: "3rem", background: "#1a1a1a", border: "1px solid rgba(200,255,0,0.15)", borderRadius: "16px", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
          <svg width="24" height="19" viewBox="0 0 24 19" fill="none"><path d="M1.5 9.5L8.5 16.5L22.5 1.5" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>Message sent.</h3>
        <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.6 }}>I&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <FormInput
        label="Name"
        type="text"
        placeholder="Full name"
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
        required
      />
      <FormInput
        label="Email"
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
        required
      />
      <FormInput
        label="Business name"
        type="text"
        placeholder="Business name (optional)"
        value={form.biz}
        onChange={(v) => setForm({ ...form, biz: v })}
      />

      {/* Select */}
      <div>
        <label style={labelStyle} htmlFor="project-type">Project type</label>
        <div style={{ position: "relative" }}>
          <select
            id="project-type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            style={{
              ...inputStyle,
              appearance: "none",
              cursor: "pointer",
              color: form.type ? "#f5f5f0" : "rgba(245,245,240,0.25)",
              paddingRight: "2.5rem",
            }}
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t === "Select project type..." ? "" : t} style={{ background: "#2a2a2a", color: "#f5f5f0" }}>
                {t}
              </option>
            ))}
          </select>
          <span style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none"><path d="M1 1l5 5 5-5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>
          </span>
        </div>
      </div>

      {/* Textarea */}
      <div>
        <label style={labelStyle} htmlFor="message">Message</label>
        <textarea
          id="message"
          placeholder="Tell me what you need..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={5}
          style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
        />
      </div>

      <button
        type="submit"
        disabled={!valid}
        style={{
          width: "100%",
          padding: "1rem",
          background: valid ? "#c8ff00" : "rgba(200,255,0,0.3)",
          color: "#0a0a0a",
          border: "none",
          borderRadius: "100px",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          cursor: valid ? "pointer" : "not-allowed",
          opacity: valid ? 1 : 0.6,
          transition: "all 0.3s",
          marginTop: "0.5rem",
        }}
        onMouseEnter={(e) => { if (valid) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(200,255,0,0.25)"; } }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
      >
        Send Message
      </button>
    </form>
  );
}

function FormInput({ label, type, placeholder, value, onChange, required }: { label: string; type: string; placeholder: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label style={labelStyle} htmlFor={`field-${label}`}>{label}</label>
      <input
        id={`field-${label}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={inputStyle}
        onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#c8ff00")}
        onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(245,245,240,0.08)")}
      />
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.4rem", color: "#f5f5f0" };

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
