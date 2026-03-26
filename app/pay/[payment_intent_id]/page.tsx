import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectPaymentForm from "@/components/pay/ProjectPaymentForm";

export const metadata: Metadata = {
  title: "Complete Payment — martin.builds",
  description: "Secure payment portal for martin.builds projects.",
};

export default async function ProjectPaymentPage({
  params,
}: {
  params: Promise<{ payment_intent_id: string }>;
}) {
  const { payment_intent_id } = await params;
  return (
    <>
      <Nav />
      <ProjectPaymentForm paymentIntentId={payment_intent_id} />
      <Footer />
    </>
  );
}
