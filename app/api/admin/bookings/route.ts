import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("start_at", { ascending: true });

    if (error) {
      console.error("[Bookings] Fetch error:", error);
      return NextResponse.json({ bookings: [] });
    }

    return NextResponse.json({ bookings: data || [] });
  } catch (error) {
    console.error("[Bookings] Error:", error);
    return NextResponse.json({ bookings: [] });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: "Missing id or status" }, { status: 400 });

    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Bookings] Patch error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
