"use client";

const accent = "#c8ff00";
const black = "#0a0a0a";
const white = "#f5f5f0";
const grayDark = "#1a1a1a";
const grayMid = "#2a2a2a";
const grayText = "#888";

export default function PayContent() {
  return (
    <div style={{ paddingTop: "120px", paddingBottom: "4rem" }}>
      <section
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "0 1.5rem",
          textAlign: "center",
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
            marginBottom: "3rem",
          }}
        >
          Payment Portal
        </p>

        <div
          style={{
            padding: "3rem 2rem",
            background: grayDark,
            borderRadius: 16,
            border: `1px solid ${grayMid}`,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: grayMid,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              fontSize: "1.5rem",
              color: accent,
            }}
          >
            $
          </div>

          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: white,
              marginBottom: "0.75rem",
            }}
          >
            You need a payment link to proceed
          </h2>

          <p
            style={{
              fontSize: "0.95rem",
              color: grayText,
              lineHeight: 1.6,
              marginBottom: "2rem",
              maxWidth: 400,
              margin: "0 auto 2rem",
            }}
          >
            Check your email for an invoice or payment link from Martin
            Builds. Click the link to review your project details, sign the
            service agreement, and pay securely.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <a
              href="/contact?type=Payment+Question"
              style={{
                display: "inline-block",
                padding: "0.85rem 2.5rem",
                background: accent,
                color: black,
                borderRadius: 100,
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(200,255,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get in Touch
            </a>
            <a
              href="/terms"
              style={{
                fontSize: "0.82rem",
                color: grayText,
                textDecoration: "underline",
              }}
            >
              View Service Agreement
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
