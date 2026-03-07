import type { Metadata } from "next";
import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

const title = "martin.builds — AI Tools for Small Business";
const description =
  "Francis Martin builds custom AI tools, websites, and apps for Atlanta small businesses. 2-week builds from $5,000. Book a free discovery call.";

export const metadata: Metadata = {
  metadataBase: new URL("https://martin.builds"),
  title,
  description,
  keywords:
    "AI developer Atlanta, AI tools small business, custom AI website Atlanta, AI app developer Atlanta GA, AI consultant Atlanta, ChatGPT integration Atlanta, AI automation Atlanta",
  authors: [{ name: "Francis Martin" }],
  creator: "Francis Martin",
  openGraph: {
    type: "website",
    locale: "en_US",
    title,
    description,
    url: "https://martin.builds",
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
    canonical: "https://martin.builds",
  },
  other: {
    "geo.region": "US-GA",
    "geo.placename": "Atlanta",
    "geo.position": "33.749;-84.388",
    ICBM: "33.749, -84.388",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LocalBusinessJsonLd />
        <main>{children}</main>
      </body>
    </html>
  );
}
