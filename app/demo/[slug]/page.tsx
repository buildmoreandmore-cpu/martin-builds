import type { Metadata } from "next";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import DemoChat from "@/components/demo/DemoChat";

interface DemoConfig {
  businessName: string;
  avatarInitials: string;
  industry: string;
  welcomeMessage: string;
  quickPrompts: { label: string; question: string }[];
  responses: Record<string, string>;
  fallback: string;
}

function loadDemo(slug: string): DemoConfig | null {
  const filePath = join(process.cwd(), "data", "demos", `${slug}.json`);
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const config = loadDemo(slug);
  return {
    title: config ? `${config.businessName} AI Agent Demo — martin.builds` : "Demo Not Found — martin.builds",
  };
}

export default async function DemoSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = loadDemo(slug);

  if (!config) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "2rem" }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "1rem" }}>Demo not found</h1>
        <p style={{ color: "#888", marginBottom: "2rem", textAlign: "center" }}>This demo doesn&apos;t exist or may have expired.</p>
        <a href="/demo" style={{ padding: "0.8rem 2rem", borderRadius: 12, background: "#c8ff00", color: "#0a0a0a", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
          Request a Free Demo
        </a>
      </div>
    );
  }

  return <DemoChat config={config} />;
}
