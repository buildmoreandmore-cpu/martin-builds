/**
 * Email scheduling — spread sends across send windows and days
 * to look like a human, not a script.
 */

// Send windows in Eastern Time (most US business activity)
// Each window is [startHour, startMinute, endHour, endMinute]
const SEND_WINDOWS: Array<[number, number, number, number]> = [
  [7, 30, 8, 0],    // 7:30-8:00 AM ET
  [9, 0, 9, 30],    // 9:00-9:30 AM ET
  [11, 0, 11, 30],  // 11:00-11:30 AM ET
];

const MAX_PER_DAY = 10;
const ET_OFFSET_HOURS = -5; // EST. (Doesn't account for DST — close enough for warmup phase.)

/**
 * Generate scheduled send times for N emails, spread across send windows
 * and days. Returns ISO timestamp strings.
 */
export function generateSchedule(count: number, startFrom: Date = new Date()): string[] {
  const schedule: string[] = [];
  let currentDate = roundUpToNextBusinessDay(startFrom);
  let dayCount = 0;
  let windowIdx = 0;
  let perWindowCount = 0;
  const perWindow = Math.ceil(MAX_PER_DAY / SEND_WINDOWS.length);

  for (let i = 0; i < count; i++) {
    // If we've filled today's quota, move to next business day
    if (dayCount >= MAX_PER_DAY) {
      currentDate = nextBusinessDay(currentDate);
      dayCount = 0;
      windowIdx = 0;
      perWindowCount = 0;
    }

    // If current window is full, move to next window
    if (perWindowCount >= perWindow && windowIdx < SEND_WINDOWS.length - 1) {
      windowIdx++;
      perWindowCount = 0;
    }

    const [sH, sM, eH, eM] = SEND_WINDOWS[windowIdx];
    const startMin = sH * 60 + sM;
    const endMin = eH * 60 + eM;
    // Random minute within the window
    const pickMin = startMin + Math.floor(Math.random() * (endMin - startMin));
    const hour = Math.floor(pickMin / 60);
    const minute = pickMin % 60;
    const second = Math.floor(Math.random() * 60);

    // Build the scheduled time in ET, convert to UTC
    const sendDate = new Date(Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      hour - ET_OFFSET_HOURS, // ET → UTC
      minute,
      second,
    ));

    // If the computed time is already in the past (e.g. queueing at 2pm for today),
    // skip ahead to the next valid window
    if (sendDate.getTime() < Date.now()) {
      // Move to next window, or next day if we exhausted today
      windowIdx++;
      perWindowCount = 0;
      if (windowIdx >= SEND_WINDOWS.length) {
        currentDate = nextBusinessDay(currentDate);
        dayCount = 0;
        windowIdx = 0;
      }
      i--; // retry this lead
      continue;
    }

    schedule.push(sendDate.toISOString());
    dayCount++;
    perWindowCount++;
  }

  return schedule;
}

function nextBusinessDay(date: Date): Date {
  const next = new Date(date);
  do {
    next.setUTCDate(next.getUTCDate() + 1);
  } while (next.getUTCDay() === 0 || next.getUTCDay() === 6);
  return next;
}

function roundUpToNextBusinessDay(date: Date): Date {
  // If today is weekend, advance to Monday
  if (date.getUTCDay() === 0) {
    const next = new Date(date);
    next.setUTCDate(next.getUTCDate() + 1);
    return next;
  }
  if (date.getUTCDay() === 6) {
    const next = new Date(date);
    next.setUTCDate(next.getUTCDate() + 2);
    return next;
  }
  return date;
}

/** Format a schedule for display: "3 today, 4 tomorrow, 3 Wed" */
export function summarizeSchedule(scheduledTimes: string[]): string {
  const byDay = new Map<string, number>();
  for (const iso of scheduledTimes) {
    const d = new Date(iso);
    const key = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    byDay.set(key, (byDay.get(key) || 0) + 1);
  }
  return Array.from(byDay.entries()).map(([day, count]) => `${count} on ${day}`).join(", ");
}
