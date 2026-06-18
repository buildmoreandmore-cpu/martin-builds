"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{ background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
    >
      Print / Save as PDF
    </button>
  );
}
