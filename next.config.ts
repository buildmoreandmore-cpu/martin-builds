import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          // SAMEORIGIN (not DENY) so our own pages can embed each other —
          // the LiveBuilds rail on the homepage iframes the /demo/* pages.
          // External sites still can't frame us.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/discovery-call",
        destination: "/book",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
