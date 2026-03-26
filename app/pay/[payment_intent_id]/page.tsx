import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectPaymentForm from "@/components/pay/ProjectPaymentForm";

export const metadata: Metadata = {
  title: "Complete Payment — martin.builds",
  description: "Secure payment portal for martin.builds projects.",
};

export default function ProjectPaymentPage({
  params,
}: {
  params: { payment_intent_id: string };
}) {
  return (
    <>
      <Nav />
      <ProjectPaymentForm paymentIntentId={params.payment_intent_id} />
      <Footer />
    </>
  );
}
