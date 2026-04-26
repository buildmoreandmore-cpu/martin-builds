import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail, EMAIL_SIGNATURE } from "@/lib/send-email";
import { hasConflict, generateICS, type Slot } from "@/lib/booking-availability";

const ORGANIZER_EMAIL = "agent@martinbuilds.ai";
const ORGANIZER_NAME = "Francis — martin.builds";

export async function POST(req: NextRequest) {
  try {
    const { start, name, email, business, message, timezone } = await req.json();

    // Validate required fields
    if (!start || !name || !email) {
      return NextResponse.json({ error: "start, name, and email are required" }, { status: 400 });
    }
    if (!/^.+@.+\..+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const startDate = new Date(start);
    if (isNaN(startDate.getTime())) {
      return NextResponse.json({ error: "Invalid start time" }, { status: 400 });
    }
    if (startDate.getTime() <= Date.now()) {
      return NextResponse.json({ error: "Cannot book past slot" }, { status: 400 });
    }

    const endDate = new Date(startDate.getTime() + 15 * 60 * 1000);

    // Check conflict against existing bookings within ±1hr buffer
    const lower = new Date(startDate.getTime() - 60 * 60 * 1000).toISOString();
    const upper = new Date(startDate.getTime() + 60 * 60 * 1000).toISOString();
    const { data: nearby } = await supabase
      .from("bookings")
      .select("start_at, end_at")
      .eq("status", "confirmed")
      .gte("start_at", lower)
      .lte("start_at", upper);
    const booked: Slot[] = (nearby || []).map((b: { start_at: string; end_at: string }) => ({
      start: b.start_at,
      end: b.end_at,
    }));
    if (hasConflict(startDate.toISOString(), booked)) {
      return NextResponse.json({ error: "Slot just got booked. Pick another." }, { status: 409 });
    }

    // Insert booking
    const { data: inserted, error } = await supabase
      .from("bookings")
      .insert({
        start_at: startDate.toISOString(),
        end_at: endDate.toISOString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        business: business?.trim() || null,
        message: message?.trim() || null,
        timezone: timezone || null,
        status: "confirmed",
      })
      .select("id, cancel_token")
      .single();

    if (error || !inserted) {
      console.error("[Book] Insert error:", error);
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }

    // Build .ics invite
    const ics = generateICS({
      uid: inserted.id,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      attendeeEmail: email,
      attendeeName: name,
      organizerEmail: ORGANIZER_EMAIL,
      organizerName: ORGANIZER_NAME,
      summary: "15-min discovery call — martin.builds",
      description: `Quick chat about how martin.builds can help ${business || "your business"}.\n\n${message ? `Your note: ${message}\n\n` : ""}Need to reschedule? Reply to this email.`,
    });

    // Format times for human display (use the timezone the booker sent if available)
    const tz = timezone || "America/New_York";
    const fmtTime = (d: Date) => d.toLocaleString("en-US", { timeZone: tz, weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    const whenText = fmtTime(startDate);

    // Email to attendee (booker)
    const attendeeHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">
<h1 style="font-size:24px;font-weight:800;letter-spacing:-0.5px;margin:0 0 8px 0;"><span style="color:#c8ff00;">m</span>artin<span style="color:#c8ff00;">.</span>builds</h1>
<p style="color:#666;font-size:11px;margin:0 0 32px 0;text-transform:uppercase;letter-spacing:2px;">Booking confirmed</p>

<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">You&rsquo;re booked, ${name.split(" ")[0]}.</h2>

<div style="background:#111;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:24px;">
<p style="font-size:11px;color:#c8ff00;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1.5px;">When</p>
<p style="font-size:18px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;">${whenText}</p>
<p style="font-size:11px;color:#c8ff00;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1.5px;">Length</p>
<p style="font-size:14px;color:#ccc;margin:0;">15 minutes</p>
</div>

<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 20px 0;">A calendar invite is attached. I&rsquo;ll send the meeting link a few hours before we chat.</p>

<p style="color:#888;font-size:13px;line-height:1.6;margin:0;padding-top:16px;border-top:1px solid #222;">Need to reschedule? Just reply to this email and we&rsquo;ll find a better time.</p>

${EMAIL_SIGNATURE}
</div>
</body></html>`;

    await sendEmail({
      to: email,
      subject: `Booked: 15-min call with martin.builds — ${whenText}`,
      body: attendeeHtml,
      isHtml: true,
    });

    // Notify organizer (Francis)
    const organizerHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;">
<h2 style="font-size:18px;color:#c8ff00;margin:0 0 16px 0;">New booking</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px;">
<tr><td style="padding:6px 0;color:#888;width:100px;">When:</td><td style="color:#f5f5f0;font-weight:600;">${whenText}</td></tr>
<tr><td style="padding:6px 0;color:#888;">Name:</td><td style="color:#f5f5f0;">${name}</td></tr>
<tr><td style="padding:6px 0;color:#888;">Email:</td><td style="color:#f5f5f0;"><a href="mailto:${email}" style="color:#c8ff00;text-decoration:none;">${email}</a></td></tr>
${business ? `<tr><td style="padding:6px 0;color:#888;">Business:</td><td style="color:#f5f5f0;">${business}</td></tr>` : ""}
${message ? `<tr><td style="padding:6px 0;color:#888;vertical-align:top;">Note:</td><td style="color:#ccc;">${message}</td></tr>` : ""}
</table>
</div>
</body></html>`;

    await sendEmail({
      to: ORGANIZER_EMAIL,
      subject: `New booking: ${name}${business ? ` (${business})` : ""} — ${whenText}`,
      body: organizerHtml,
      isHtml: true,
    });

    return NextResponse.json({
      success: true,
      booking: { id: inserted.id, start: startDate.toISOString(), end: endDate.toISOString() },
      ics,
    });
  } catch (error) {
    console.error("[Book] Error:", error);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
