import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Admin — martin.builds",
  robots: { index: false, follow: false },
  manifest: "/manifest.json",
  other: { "theme-color": "#c8ff00" },
};

export default function AdminPage() {
  return <AdminPanel />;
}
