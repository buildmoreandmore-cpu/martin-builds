import type { Metadata } from "next";
import Nav from "@/components/Nav";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";
import CommunityContent from "@/components/community/CommunityContent";

export const metadata: Metadata = {
  title: "Community — martin.builds",
  description:
    "Martin Builds Community partners with schools to bring hands-on AI education to the next generation. Workshops, curriculum, and real projects — built by a working AI developer in Atlanta.",
  alternates: { canonical: "https://martinbuilds.ai/community" },
  openGraph: {
    title: "Community — martin.builds",
    description:
      "Bringing AI literacy to the next generation. School partnerships, hands-on workshops, and real AI projects.",
    url: "https://martinbuilds.ai/community",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function CommunityPage() {
  return (
    <>
      <Nav />
      <CommunityContent />
      <NewsletterFooter />
      <Footer />
    </>
  );
}
