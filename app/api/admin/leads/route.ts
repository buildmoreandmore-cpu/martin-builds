import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Leads] Fetch error:", error);
      return NextResponse.json({ leads: [] });
    }

    return NextResponse.json({ leads: data || [] });
  } catch (error) {
    console.error("[Leads] Error:", error);
    return NextResponse.json({ leads: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, business, type, message, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        business: business || null,
        type: type || "General",
        message: message || null,
        source: source || "manual",
        status: "new",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("[Leads] Insert error:", error);
      return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }

    return NextResponse.json({ lead: data });
  } catch (error) {
    console.error("[Leads] Error:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing lead ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("[Leads] Update error:", error);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Leads] Error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing lead ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[Leads] Delete error:", error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Leads] Error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
