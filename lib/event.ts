export const EVENT = {
  celebrant: "Belau Adebayo",
  celebrantFirstName: "Belau",
  husband: "Babatunde Adebayo",
  date: "Friday, July 17, 2026",
  dateNumeric: "07 · 17 · 2026",
  time: "6:00 PM",
  // America/Chicago is UTC-5 in July (CDT) — used by the countdown timer.
  dateTimeISO: "2026-07-17T18:00:00-05:00",
  venue: "Chi-Town",
  contactLine: "Questions? Reach out to the family office.",
} as const;

export const STORY_MILESTONES = [
  {
    title: "A Love That Endures",
    description:
      "Two paths that became one, carried by patience, faith, and a quiet devotion that only deepens with time.",
  },
  {
    title: "25 Years Together",
    description:
      "A silver anniversary — a quarter-century of partnership, laughter, and a home built to last.",
  },
  {
    title: `Celebrating 60 Years of ${EVENT.celebrantFirstName}`,
    description:
      "A milestone birthday marked alongside the people who have shaped and shared her journey.",
  },
] as const;
