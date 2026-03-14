import type { Metadata } from "next";
import DemoChat from "@/components/demo/DemoChat";

const SUPABASE_URL = "https://lnvzvmjhulntglbjyryz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxudnp2bWpodWxudGdsYmp5cnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NTM5ODMsImV4cCI6MjA4OTAyOTk4M30._FuAxrSwfeSUR-9aLb3N1M0fTIm_Q4wENXe63IE8-Is";

interface DemoRow {
  slug: string;
  business_name: string;
  avatar_initials: string;
  industry: string;
  welcome_message: string;
  quick_prompts: { label: string; question: string }[];
  responses: Record<string, string>;
  fallback: string;
  active: boolean;
}

async function loadDemo(slug: string): Promise<DemoRow | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/demos?slug=eq.${encodeURIComponent(slug)}&active=eq.true&select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 60 }, // cache for 60s
      }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const demo = await loadDemo(slug);
  return {
    title: demo ? `${demo.business_name} AI Agent Demo — martin.builds` : "Demo Not Found — martin.builds",
  };
}

export default async function DemoSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = await loadDemo(slug);

  if (!demo) {
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

  const config = {
    businessName: demo.business_name,
    avatarInitials: demo.avatar_initials,
    industry: demo.industry,
    welcomeMessage: demo.welcome_message,
    quickPrompts: demo.quick_prompts,
    responses: demo.responses,
    fallback: demo.fallback,
  };

  return <DemoChat config={config} />;
}
