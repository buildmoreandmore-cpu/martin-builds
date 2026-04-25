import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const leadId = req.nextUrl.searchParams.get("lid");

  if (leadId) {
    await supabase
      .from("leads")
      .update({ status: "unsubscribed" })
      .eq("id", leadId);
  }

  // Simple confirmation page
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Unsubscribed — martin.builds</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
<div style="text-align:center;max-width:440px;padding:2rem;">
<h1 style="font-size:28px;font-weight:800;letter-spacing:-1px;margin-bottom:8px;">
<span style="color:#c8ff00;">m</span>artin<span style="color:#c8ff00;">.</span>builds
</h1>
<p style="font-size:18px;color:#ccc;margin-bottom:24px;">You've been unsubscribed.</p>
<p style="font-size:14px;color:#888;line-height:1.6;">You won't receive any more emails from us. If this was a mistake, reply to any previous email and we'll add you back.</p>
</div>
</body></html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
