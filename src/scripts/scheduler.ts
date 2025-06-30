// src/scripts/scheduler.ts

import moment from "moment-timezone";

const targetTimes: Record<number, string> = {
  1: "09:31",
  2: "09:33",
  3: "09:45",
  4: "09:46",
  5: "09:43",
  6: "09:39",
  7: "09:51",
  8: "09:45",
  9: "09:32",
  10: "09:55",
  11: "09:47",
  12: "09:56",
  13: "09:51",
  14: "09:57",
  15: "09:45",
  16: "09:32",
  17: "09:58",
  18: "09:39",
  19: "09:56",
  20: "09:57",
  21: "09:45",
  22: "09:32",
  23: "09:47",
  24: "09:43",
  25: "09:51",
  26: "09:45",
  27: "09:39",
  28: "09:43",
  29: "09:38",
  30: "18:27",
  31: "09:37",
};

export async function maybeDelayForSchedule() {
  const now = moment().tz("Asia/Kolkata");

  const dayOfWeek = now.isoWeekday(); // 1 = Monday, 7 = Sunday

  if (dayOfWeek > 5) {
    console.log("🛑 It's weekend. Skipping automation.");
    process.exit(0);
  }

  const date = now.date();

  const targetTimeStr = targetTimes[date];
  if (!targetTimeStr) {
    console.log(`⚠️ No time configured for date ${date}. Skipping.`);
    process.exit(0);
  }

  const targetMoment = moment.tz(
    `${now.format("YYYY-MM-DD")} ${targetTimeStr}`,
    "Asia/Kolkata"
  );

  if (now.isBefore(targetMoment)) {
    const waitMs = targetMoment.diff(now);
    console.log(
      `✅ Waiting ${Math.round(waitMs / 1000)} seconds until scheduled time ${targetTimeStr}...`
    );
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  } else {
    console.log(`✅ Already past ${targetTimeStr}. Running immediately.`);
  }
}
