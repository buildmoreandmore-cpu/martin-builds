import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Scanner from "@/components/scan/Scanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Website Revenue Leak Scanner — martin.builds",
  description:
    "Enter your URL. In 60 seconds, I'll show you the 5 revenue leaks hiding on your site — and what to fix first.",
  alternates: { canonical: "https://martinbuilds.ai/scan" },
  openGraph: {
    title: "Free Website Revenue Leak Scanner — martin.builds",
    description:
      "Enter your URL. In 60 seconds, I'll show you the 5 revenue leaks hiding on your site — and what to fix first.",
    url: "https://martinbuilds.ai/scan",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ScanPage() {
  return (
    <>
      <Nav />
      <Scanner />
      <Footer />
    </>
  );
}
