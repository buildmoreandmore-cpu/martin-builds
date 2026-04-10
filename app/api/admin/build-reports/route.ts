import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("build_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Build Reports] Fetch error:", error);
      return NextResponse.json({ reports: [] });
    }

    return NextResponse.json({ reports: data || [] });
  } catch (error) {
    console.error("[Build Reports] Error:", error);
    return NextResponse.json({ reports: [] });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status || !["pending", "approved", "archived"].includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { error } = await supabase
      .from("build_reports")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("[Build Reports] Update error:", error);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Build Reports] Error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
