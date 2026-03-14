import type { Metadata } from "next";
import DemoRequest from "@/components/demo/DemoRequest";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free AI Agent Demo — martin.builds",
  description: "See what an AI employee can do for your business. Get a free custom demo built from your website — delivered within the hour.",
  openGraph: {
    title: "Free AI Agent Demo — martin.builds",
    description: "See what an AI employee can do for your business. Get a free custom demo built from your website — delivered within the hour.",
    url: "https://martinbuilds.ai/demo",
    siteName: "martin.builds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Agent Demo — martin.builds",
    description: "See what an AI employee can do for your business. Get a free custom demo built from your website — delivered within the hour.",
  },
};

export default function DemoPage() {
  return (
    <>
      <Nav />
      <DemoRequest />
      <Footer />
    </>
  );
}
