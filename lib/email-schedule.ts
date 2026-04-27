/**
 * Email scheduling — spread sends across business days.
 *
 * Architecture: Vercel Hobby tier allows only daily crons. Our cron fires
 * every weekday at 13:00 UTC (8 AM EST / 9 AM EDT) and processes everything
 * that's due. To make sure items actually fire on their target day, we schedule
 * them for ~12:00 UTC of that day (well before the 13:00 cron). Within-day
 * distribution (e.g. 7:30/9:00/11:00 AM ET windows) is not achievable on
 * Hobby — all of a day's sends fire in the same cron run.
 *
 * Result: 10 emails per day, all going out in a single morning batch around
 * 8-9 AM ET. Spread across DAYS rather than within a day.
 */

const MAX_PER_DAY = 10;
// We schedule items at 12:00 UTC of their target day so the 13:00 UTC cron catches them.
// Random minute jitter (0-50) so the rows aren't identical timestamps.
const SCHEDULE_HOUR_UTC = 12;

/**
 * Generate scheduled send times for N emails, spread across business days.
 * Each email is scheduled for ~12:00 UTC of its target day so the daily cron
 * at 13:00 UTC will pick it up. Returns ISO strings.
 */
export function generateSchedule(count: number, startFrom: Date = new Date()): string[] {
  const schedule: string[] = [];
  let currentDate = nextEligibleDay(startFrom);
  let dayCount = 0;

  for (let i = 0; i < count; i++) {
    if (dayCount >= MAX_PER_DAY) {
      currentDate = nextBusinessDay(currentDate);
      dayCount = 0;
    }

    // Schedule at 12:00 UTC + random 0-50 minutes (still well before 13:00 cron)
    const minute = Math.floor(Math.random() * 50);
    const second = Math.floor(Math.random() * 60);

    const sendDate = new Date(Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      SCHEDULE_HOUR_UTC,
      minute,
      second,
    ));

    // If computed time is in the past (e.g. queueing today after 12:50 UTC),
    // push to next business day
    if (sendDate.getTime() < Date.now()) {
      currentDate = nextBusinessDay(currentDate);
      dayCount = 0;
      i--; // retry
      continue;
    }

    schedule.push(sendDate.toISOString());
    dayCount++;
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

function nextEligibleDay(date: Date): Date {
  // If weekend, advance to Monday
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

/** Format a schedule for display: "3 Mon Apr 27, 4 Tue Apr 28, 3 Wed Apr 29" */
export function summarizeSchedule(scheduledTimes: string[]): string {
  const byDay = new Map<string, number>();
  for (const iso of scheduledTimes) {
    const d = new Date(iso);
    const key = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    byDay.set(key, (byDay.get(key) || 0) + 1);
  }
  return Array.from(byDay.entries()).map(([day, count]) => `${count} on ${day}`).join(", ");
}
