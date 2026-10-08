import type { ProjectStatus } from "./api/types";

/** Honest status labels: planned, prototype and experimental work is always labelled as such. */
export const projectStatusLabel: Record<ProjectStatus, string> = {
  planned: "Planned",
  prototype: "Prototype",
  experimental: "Experimental",
  in_progress: "In progress",
  active: "Active",
  completed: "Completed",
};

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

/** Formats an ISO date (YYYY-MM or YYYY-MM-DD) as "Mar 2024". Falls back to the raw value. */
export function formatMonth(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value.length === 7 ? `${value}-01T00:00:00Z` : `${value.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : monthYear.format(date);
}

export function formatRange(start: string | null, end: string | null): string {
  const s = formatMonth(start);
  const e = end ? formatMonth(end) : "Present";
  return s ? `${s} – ${e}` : (e ?? "");
}
