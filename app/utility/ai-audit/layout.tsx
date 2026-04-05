import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Gap Audit — martinbuilds.ai",
  description:
    "Find out exactly where AI can save your service business time and money. Free 2-minute assessment.",
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
