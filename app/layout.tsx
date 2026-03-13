import type { Metadata } from "next";
import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

const title = "martin.builds — AI Tools for Small Business";
const description =
  "I build AI-powered tools, websites, and products for small businesses. Custom builds shipped in 2 weeks. Based in Atlanta, GA.";

export const metadata: Metadata = {
  metadataBase: new URL("https://martinbuilds.ai"),
  title,
  description,
  keywords:
    "AI developer Atlanta, AI tools small business, custom AI website Atlanta, AI app developer Atlanta GA, AI consultant Atlanta, ChatGPT integration Atlanta, AI automation Atlanta",
  authors: [{ name: "Francis Martin" }],
  creator: "Francis Martin",
  other: {
    "theme-color": "#0a0a0a",
    "geo.region": "US-GA",
    "geo.placename": "Atlanta",
    "geo.position": "33.749;-84.388",
    ICBM: "33.749, -84.388",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title,
    description: "Custom AI tools, websites, and products shipped in 2 weeks. Built by Francis Martin in Atlanta.",
    url: "https://martinbuilds.ai",
    siteName: "martin.builds",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "martin.builds — AI Tools & Products for Small Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@martinbuilds",
    title,
    description,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://martinbuilds.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LocalBusinessJsonLd />
        <main>{children}</main>
      </body>
    </html>
  );
}
