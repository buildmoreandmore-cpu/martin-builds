import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PayContent from "@/components/pay/PayContent";

export const metadata: Metadata = {
  title: "Pay — martin.builds",
  description:
    "Secure payment portal for martin.builds projects. Review terms, accept the service agreement, and pay via Stripe.",
  alternates: { canonical: "https://martin.builds/pay" },
  openGraph: {
    title: "Pay — martin.builds",
    description:
      "Secure payment portal for martin.builds projects. Review terms and pay via Stripe.",
    url: "https://martin.builds/pay",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function PayPage() {
  return (
    <>
      <Nav />
      <PayContent />
      <Footer />
    </>
  );
}
