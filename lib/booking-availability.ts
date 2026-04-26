/**
 * Booking availability — generate slots and check conflicts.
 * 15-minute discovery calls, Mon-Fri 9 AM - 5 PM ET, no weekends.
 */

const SLOT_MINUTES = 15;
const ET_OFFSET_HOURS = -5; // EST. Doesn't account for DST — fine for now.

// Eastern Time business hours
const WORK_START_HOUR_ET = 9;   // 9 AM ET
const WORK_END_HOUR_ET = 17;    // 5 PM ET (last slot starts 4:45 PM)
const LEAD_TIME_HOURS = 2;      // earliest bookable slot is 2hrs from now
const MAX_DAYS_AHEAD = 21;      // can book up to 3 weeks out

export type Slot = { start: string; end: string }; // ISO strings

/** Generate all candidate slots for a date (YYYY-MM-DD), in ET business hours, returned as UTC ISO. */
export function generateSlotsForDate(dateStr: string): Slot[] {
  const [y, m, d] = dateStr.split("-").map(Number);
  // Build Date at midnight ET → UTC
  const dayStartUtc = new Date(Date.UTC(y, m - 1, d, -ET_OFFSET_HOURS, 0, 0));
  const dayOfWeek = dayStartUtc.getUTCDay();
  // No weekends (0 = Sunday, 6 = Saturday in UTC — same as ET since we offset to midnight ET)
  if (dayOfWeek === 0 || dayOfWeek === 6) return [];

  const slots: Slot[] = [];
  const now = Date.now();
  const earliestBookable = now + LEAD_TIME_HOURS * 60 * 60 * 1000;

  for (let hourEt = WORK_START_HOUR_ET; hourEt < WORK_END_HOUR_ET; hourEt++) {
    for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
      const start = new Date(Date.UTC(y, m - 1, d, hourEt - ET_OFFSET_HOURS, minute, 0));
      const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);
      if (start.getTime() < earliestBookable) continue;
      slots.push({ start: start.toISOString(), end: end.toISOString() });
    }
  }
  return slots;
}

/** Subtract booked slots from available ones. */
export function filterAvailableSlots(allSlots: Slot[], bookedSlots: Slot[]): Slot[] {
  const bookedStarts = new Set(bookedSlots.map((b) => b.start));
  return allSlots.filter((s) => !bookedStarts.has(s.start));
}

/**
 * Deterministically marks ~55% of slots as "busy" to give the calendar
 * a healthy-demand feel during the warmup phase. Same slot always returns
 * the same result so the picker doesn't flicker between page loads.
 * Only affects the slot picker — does not block actual booking attempts.
 */
export function looksBusy(slotIso: string): boolean {
  let hash = 0;
  for (let i = 0; i < slotIso.length; i++) {
    hash = (hash * 31 + slotIso.charCodeAt(i)) >>> 0;
  }
  return (hash % 100) < 55;
}

/** Check if a candidate booking conflicts with existing bookings. */
export function hasConflict(start: string, bookedSlots: Slot[]): boolean {
  const startMs = new Date(start).getTime();
  const endMs = startMs + SLOT_MINUTES * 60 * 1000;
  return bookedSlots.some((b) => {
    const bStart = new Date(b.start).getTime();
    const bEnd = new Date(b.end).getTime();
    return startMs < bEnd && endMs > bStart; // overlap
  });
}

/** Validate a date string is within allowed booking range. */
export function isValidBookingDate(dateStr: string): boolean {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const max = new Date(today);
  max.setUTCDate(max.getUTCDate() + MAX_DAYS_AHEAD);
  const target = new Date(dateStr + "T00:00:00Z");
  return target >= today && target <= max;
}

/** Generate ICS calendar invite content (RFC 5545). */
export function generateICS(opts: {
  uid: string;
  start: string;       // ISO
  end: string;         // ISO
  attendeeEmail: string;
  attendeeName: string;
  organizerEmail: string;
  organizerName: string;
  summary: string;
  description: string;
}): string {
  const fmt = (iso: string) => iso.replace(/[-:]/g, "").split(".")[0] + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//martin.builds//Booking//EN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${opts.uid}@martinbuilds.ai`,
    `DTSTAMP:${fmt(new Date().toISOString())}`,
    `DTSTART:${fmt(opts.start)}`,
    `DTEND:${fmt(opts.end)}`,
    `SUMMARY:${opts.summary}`,
    `DESCRIPTION:${opts.description.replace(/\n/g, "\\n")}`,
    `ORGANIZER;CN=${opts.organizerName}:mailto:${opts.organizerEmail}`,
    `ATTENDEE;CN=${opts.attendeeName};RSVP=TRUE:mailto:${opts.attendeeEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
