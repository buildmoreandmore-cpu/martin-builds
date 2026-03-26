"use client";

import { useState } from "react";

const accent = "#c8ff00";
const black = "#0a0a0a";
const white = "#f5f5f0";
const grayDark = "#1a1a1a";
const grayMid = "#2a2a2a";
const grayText = "#888";

const sectionPad = "clamp(1.25rem, 5vw, 3rem)";

export default function PayContent() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "4rem" }}>
      {/* ── Header ─────────────────────────────────────────── */}
      <section
        style={{
          textAlign: "center",
          padding: `0 ${sectionPad} 3rem`,
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 700,
            letterSpacing: "-1px",
            marginBottom: "0.75rem",
          }}
        >
          martin<span style={{ color: accent }}>.builds</span>
        </div>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.85rem",
            color: grayText,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Built by Friday
        </p>
      </section>

      {/* ── How Payment Works ─────────────────────────────── */}
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: `0 ${sectionPad} 3.5rem`,
        }}
      >
        <SectionTag>How Payment Works</SectionTag>
        <h2 style={h2Style}>Three simple steps</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.5rem" }}>
          {[
            {
              num: "01",
              text: "You\u2019ll receive a Stripe invoice by email with your project details, phase breakdown, and exact amount.",
            },
            {
              num: "02",
              text: "Review and agree to the service agreement below.",
            },
            {
              num: "03",
              text: "Pay securely via the link in your invoice \u2014 card or ACH accepted.",
            },
          ].map((step) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
                padding: "1.25rem 1.5rem",
                background: grayDark,
                borderRadius: "12px",
                border: `1px solid ${grayMid}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: accent,
                  minWidth: "28px",
                }}
              >
                {step.num}
              </span>
              <span style={{ fontSize: "0.95rem", lineHeight: 1.6, color: white }}>
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── What's Included ──────────────────────────────── */}
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: `0 ${sectionPad} 3.5rem`,
        }}
      >
        <SectionTag>What&apos;s Included</SectionTag>
        <h2 style={h2Style}>Every invoice, every project</h2>

        <ul style={{ listStyle: "none", marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {[
            "Custom scoped amount per project",
            "Full project description and phase breakdown on every invoice",
            "Automatic receipts sent to your email",
            "Split payment available \u2014 50% deposit / 50% on delivery",
            "Multi-phase projects invoiced per phase",
            "Add-ons itemized per line item",
            "Monthly retainers auto-billed via Stripe",
          ].map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: white,
              }}
            >
              <span style={{ color: accent, fontSize: "1rem", lineHeight: "1.6" }}>&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Terms Acceptance Block ────────────────────────── */}
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: `0 ${sectionPad} 3.5rem`,
        }}
      >
        <SectionTag>Service Agreement</SectionTag>
        <h2 style={h2Style}>Before you pay</h2>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "2rem",
            background: grayDark,
            borderRadius: "12px",
            border: `1px solid ${grayMid}`,
          }}
        >
          <div
            style={{
              fontSize: "0.88rem",
              lineHeight: 1.7,
              color: grayText,
              maxHeight: "240px",
              overflowY: "auto",
              paddingRight: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: white }}>Payment Terms:</strong> All projects require payment before work begins. No exceptions. For split-payment projects: a 50% deposit is due at booking; the remaining 50% is due before final delivery and handoff.
            </p>
            <p style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: white }}>Refund Policy:</strong> Deposits are non-refundable once work has begun. Full payments for completed projects are non-refundable. If Martin Builds cancels a project before work begins, a full refund will be issued within 5 business days.
            </p>
            <p style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: white }}>Delivery:</strong> Martin Builds operates on a 14-day delivery model for standard website projects. Final project files, credentials, and assets will not be transferred until all outstanding balances are paid in full.
            </p>
            <p style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: white }}>Revisions:</strong> Each project includes up to two rounds of revisions within the agreed scope. Revisions outside of scope are billed at Martin Builds&apos; current hourly rate.
            </p>
            <p>
              <strong style={{ color: white }}>Disputes:</strong> Any disputes will be resolved through good-faith negotiation. If unresolved, disputes will be submitted to binding arbitration in Atlanta, Georgia.
            </p>
          </div>

          <a
            href="/terms"
            target="_blank"
            style={{
              display: "inline-block",
              fontSize: "0.82rem",
              color: accent,
              textDecoration: "underline",
              marginBottom: "1.5rem",
            }}
          >
            Read the full Martin Builds Service Agreement &rarr;
          </a>

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              cursor: "pointer",
              userSelect: "none",
              marginBottom: "1.5rem",
            }}
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{
                width: "20px",
                height: "20px",
                minWidth: "20px",
                marginTop: "2px",
                accentColor: accent,
                cursor: "pointer",
              }}
            />
            <span style={{ fontSize: "0.92rem", lineHeight: 1.5, color: white }}>
              I agree to the{" "}
              <a href="/terms" target="_blank" style={{ color: accent, textDecoration: "underline" }}>
                Martin Builds Service Agreement
              </a>
            </span>
          </label>

          <div
            style={{
              padding: "1rem 1.5rem",
              background: agreed ? accent : grayMid,
              color: agreed ? black : grayText,
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.5px",
              cursor: agreed ? "default" : "not-allowed",
              opacity: agreed ? 1 : 0.5,
              transition: "all 0.3s",
              pointerEvents: "none",
            }}
          >
            {agreed
              ? "✓ Agreement accepted — pay from the invoice link in your email"
              : "Accept the service agreement to proceed"}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────── */}
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: `0 ${sectionPad} 2rem`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "2.5rem 2rem",
            background: grayDark,
            borderRadius: "12px",
            border: `1px solid ${grayMid}`,
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: white,
              marginBottom: "0.5rem",
            }}
          >
            Haven&apos;t received your invoice yet?
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: grayText,
              marginBottom: "1.5rem",
            }}
          >
            Ready to build? Reach out to get started.
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              background: accent,
              color: black,
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(200,255,0,0.3)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

/* ── Shared helpers ──────────────────────────────────────── */

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: accent,
        marginBottom: "0.75rem",
        display: "block",
      }}
    >
      {children}
    </span>
  );
}

const h2Style: React.CSSProperties = {
  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  color: white,
};
