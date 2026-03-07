import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "martin.builds — AI Tools & Products for Small Businesses",
  description:
    "I build AI-powered tools, platforms, and apps for small businesses. Custom-built, fast, no bloat. 2-week sprint from idea to shipped.",
  openGraph: {
    title: "martin.builds",
    description: "AI Tools & Products for Small Businesses",
    url: "https://martin.builds",
    siteName: "martin.builds",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
