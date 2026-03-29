import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AINativeContent from "@/components/AINativeContent";

export const metadata: Metadata = {
  title: "AI-Native vs AI-Layered — martin.builds",
  description:
    "Most studios bolt AI onto your homepage. We build intelligence into every layer — operations, workflows, client experience. See the difference.",
  openGraph: {
    title: "AI-Native vs AI-Layered — martin.builds",
    description:
      "Most studios bolt AI onto your homepage. We build intelligence into every layer. See the difference.",
  },
};

export default function AINativePage() {
  return (
    <>
      <Nav />
      <AINativeContent />
      <Footer />
    </>
  );
}
