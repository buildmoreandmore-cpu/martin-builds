/**
 * Email scheduling — spread sends across business days.
 *
 * Vercel Hobby tier only allows daily crons, so within-day window distribution
 * isn't possible without an external pinger. Instead we schedule each email for
 * a random morning time on a future business day, and the daily cron at 8 AM ET
 * processes everything that's due. This keeps sends out of bulk-blast territory
 * (max ~10/day, all in the morning when business inboxes are active).
 *
 * To get true within-day window spread, upgrade to Vercel Pro and switch the
 * cron in vercel.json to "* /5 * * * *".
 */

const MAX_PER_DAY = 10;
// Send window in Eastern Time — 7:30 AM to 11:30 AM ET
const WINDOW_START_MIN = 7 * 60 + 30; // 7:30 AM ET
const WINDOW_END_MIN = 11 * 60 + 30;  // 11:30 AM ET
const ET_OFFSET_HOURS = -5; // EST. Doesn't account for DST — close enough during warmup.

/**
 * Generate scheduled send times for N emails, spread across business days.
 * Each email gets a random time in the morning window. Returns ISO strings.
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

    // Random minute within the morning window
    const pickMin = WINDOW_START_MIN + Math.floor(Math.random() * (WINDOW_END_MIN - WINDOW_START_MIN));
    const hour = Math.floor(pickMin / 60);
    const minute = pickMin % 60;
    const second = Math.floor(Math.random() * 60);

    const sendDate = new Date(Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      hour - ET_OFFSET_HOURS,
      minute,
      second,
    ));

    // If computed time is in the past (e.g. queueing today after 11:30 AM ET),
    // move to next business day
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
