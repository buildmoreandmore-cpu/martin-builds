import type { Metadata } from "next";
import Link from "next/link";

// noindex — this is a conversion-goal URL for paid traffic, not an organic page.
export const metadata: Metadata = {
  title: "Thank you — martin.builds",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "#f5f5f0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem)",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "rgba(200,255,0,0.1)",
          border: "1px solid rgba(200,255,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.75rem",
        }}
      >
        <svg width="28" height="22" viewBox="0 0 24 19" fill="none">
          <path d="M1.5 9.5L8.5 16.5L22.5 1.5" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-1px", margin: "0 0 1rem", maxWidth: "560px" }}>
        Request received.
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#aaa", lineHeight: 1.6, maxWidth: "480px", margin: "0 0 2rem" }}>
        Thanks — I personally read every request and I&apos;ll reply within a few hours to set up a short scoping call.
        We&apos;ll lock the exact scope and a fixed price before any work starts.
      </p>

      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.9rem 2rem",
          background: "transparent",
          color: "#c8ff00",
          border: "1px solid rgba(200,255,0,0.4)",
          borderRadius: "100px",
          fontWeight: 700,
          fontSize: "1rem",
          textDecoration: "none",
        }}
      >
        Back to martin.builds
      </Link>
    </div>
  );
}
