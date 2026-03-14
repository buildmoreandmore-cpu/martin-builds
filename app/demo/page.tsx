import type { Metadata } from "next";
import DemoRequest from "@/components/demo/DemoRequest";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Request a Free AI Agent Demo — martin.builds",
  description: "Tell us about your business and we'll build a custom AI agent demo trained on your website. Get your personalized demo link within the hour.",
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
