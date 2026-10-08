import type { Education, Experience } from "./api/types";
import type { TimelineEntry } from "@/components/experience/Timeline";
import { formatRange } from "./format";

export function experienceEntries(items: Experience[]): TimelineEntry[] {
  return items.map((e) => ({
    key: `work-${e.id}`,
    kind: "work",
    title: e.role,
    org: e.organization,
    period: formatRange(e.start_date, e.end_date),
    location: e.location,
    summary: e.summary,
    points: e.highlights,
    technologies: e.technologies,
  }));
}

export function educationEntries(items: Education[]): TimelineEntry[] {
  return items.map((e) => ({
    key: `study-${e.id}`,
    kind: "study",
    title: `${e.degree}${e.field_of_study ? `, ${e.field_of_study}` : ""}`,
    org: e.institution,
    period: e.start_date || e.end_date ? formatRange(e.start_date, e.end_date) : "",
    summary: e.summary,
  }));
}
