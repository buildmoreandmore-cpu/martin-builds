import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateSlotsForDate, filterAvailableSlots, isValidBookingDate, looksBusy, type Slot } from "@/lib/booking-availability";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date"); // YYYY-MM-DD
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  if (!isValidBookingDate(date)) {
    return NextResponse.json({ slots: [] });
  }

  const allSlots = generateSlotsForDate(date);
  if (allSlots.length === 0) {
    return NextResponse.json({ slots: [] });
  }

  // Fetch existing bookings on this date
  const dayStart = new Date(date + "T00:00:00Z").toISOString();
  const dayEndDate = new Date(date + "T00:00:00Z");
  dayEndDate.setUTCDate(dayEndDate.getUTCDate() + 1);
  const dayEnd = dayEndDate.toISOString();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("start_at, end_at")
    .eq("status", "confirmed")
    .gte("start_at", dayStart)
    .lt("start_at", dayEnd);

  const booked: Slot[] = (bookings || []).map((b: { start_at: string; end_at: string }) => ({
    start: b.start_at,
    end: b.end_at,
  }));

  const realAvailable = filterAvailableSlots(allSlots, booked);
  // Show only slots that aren't real-booked AND aren't fake-busy
  const visible = realAvailable.filter((s) => !looksBusy(s.start));
  return NextResponse.json({ slots: visible });
}
