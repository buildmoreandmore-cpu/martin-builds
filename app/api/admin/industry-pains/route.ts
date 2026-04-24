import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("industry_pains")
      .select("*")
      .order("industry");

    if (error) {
      console.error("[IndustryPains] Fetch error:", error);
      return NextResponse.json({ pains: [] });
    }

    return NextResponse.json({ pains: data || [] });
  } catch (error) {
    console.error("[IndustryPains] Error:", error);
    return NextResponse.json({ pains: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { industry, pains, items } = await req.json();

    if (!industry || !pains || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "industry, pains, and items are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("industry_pains")
      .upsert({ industry: industry.trim(), pains, items }, { onConflict: "industry" })
      .select()
      .single();

    if (error) {
      console.error("[IndustryPains] Upsert error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true, pain: data });
  } catch (error) {
    console.error("[IndustryPains] Error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
