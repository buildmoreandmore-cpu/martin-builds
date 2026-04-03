import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DashboardsContent from "@/components/DashboardsContent";

export const metadata: Metadata = {
  title: "Custom Dashboards — martin.builds",
  description:
    "Custom dashboards built for how you actually work. One screen. Your data. Your metrics. Owned forever. No monthly fees.",
  alternates: { canonical: "https://martinbuilds.ai/dashboards" },
};

export default function DashboardsPage() {
  return (
    <>
      <Nav />
      <DashboardsContent />
      <Footer />
    </>
  );
}
