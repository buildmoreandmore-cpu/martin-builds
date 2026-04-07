import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Friday Letter — martin.builds",
  description:
    "Business. Building. Capital. Every Friday. A weekly letter by Francis Martin.",
  openGraph: {
    title: "The Friday Letter",
    description: "Business. Building. Capital. Every Friday.",
    url: "https://martinbuilds.ai/see-you-friday",
  },
};

export default function FridayLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
