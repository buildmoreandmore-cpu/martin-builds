import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "martin.builds — Custom Websites & Dashboards in 14 Days";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,241,53,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top: Logo */}
        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: "#f5f5f0", letterSpacing: "-1px" }}>
            martin
          </span>
          <span style={{ fontSize: 36, fontWeight: 800, color: "#C8F135", letterSpacing: "-1px" }}>
            .builds
          </span>
        </div>

        {/* Center: Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#f5f5f0",
              lineHeight: 1.15,
              maxWidth: "800px",
              letterSpacing: "-1.5px",
            }}
          >
            Your business deserves a system that runs like you do.
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#C8F135",
              letterSpacing: "-0.5px",
            }}
          >
            Owned by you forever.
          </div>
        </div>

        {/* Bottom: URL + Location */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <span style={{ fontSize: 18, color: "#C8F135", fontWeight: 500 }}>
            martinbuilds.ai
          </span>
          <span style={{ fontSize: 18, color: "#888" }}>Atlanta, GA</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
