import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Survey — martin.builds",
};

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
