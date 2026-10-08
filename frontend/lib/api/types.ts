/**
 * Response shapes for the FastAPI backend (CLAUDE.md "Phase 1 API").
 * The backend's Pydantic schemas should match these field names.
 *
 * Guards check the fields the UI depends on, so a malformed response
 * becomes a handled error instead of a crash during render.
 */

export type ProjectStatus = "planned" | "prototype" | "experimental" | "in_progress" | "active" | "completed";

export type Project = {
  slug: string;
  title: string;
  summary: string | null;
  description: string | null;
  status: ProjectStatus;
  technologies: string[];
  repository_url: string | null;
  demo_url: string | null;
  featured: boolean;
};

export type Experience = {
  id: number;
  organization: string;
  role: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  summary: string | null;
  highlights: string[];
  technologies: string[];
};

export type Education = {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  summary: string | null;
};

export type Research = {
  id: number;
  title: string;
  summary: string | null;
  status: string;
  url: string | null;
};

export type Publication = {
  id: number;
  title: string;
  venue: string | null;
  year: number | null;
  authors: string[];
  url: string | null;
};

export type Skill = {
  id: number;
  name: string;
  category: string;
};

export type Guard<T> = (value: unknown) => value is T;

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isString = (v: unknown): v is string => typeof v === "string";
const isStringOrNull = (v: unknown): v is string | null => v === null || typeof v === "string";
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every(isString);

const PROJECT_STATUSES: readonly string[] = ["planned", "prototype", "experimental", "in_progress", "active", "completed"];

export const isProject: Guard<Project> = (v): v is Project =>
  isObject(v) &&
  isString(v.slug) &&
  isString(v.title) &&
  isStringOrNull(v.summary) &&
  isStringOrNull(v.description) &&
  isString(v.status) &&
  PROJECT_STATUSES.includes(v.status) &&
  isStringArray(v.technologies) &&
  isStringOrNull(v.repository_url) &&
  isStringOrNull(v.demo_url) &&
  typeof v.featured === "boolean";

export const isExperience: Guard<Experience> = (v): v is Experience =>
  isObject(v) && typeof v.id === "number" && isString(v.organization) && isString(v.role) && isString(v.start_date) &&
  isStringOrNull(v.end_date) && isStringOrNull(v.summary) && isStringArray(v.highlights) && isStringArray(v.technologies);

export const isEducation: Guard<Education> = (v): v is Education =>
  isObject(v) && typeof v.id === "number" && isString(v.institution) && isString(v.degree) &&
  isStringOrNull(v.field_of_study) && isStringOrNull(v.start_date) && isStringOrNull(v.end_date);

export const isResearch: Guard<Research> = (v): v is Research =>
  isObject(v) && typeof v.id === "number" && isString(v.title) && isStringOrNull(v.summary) && isString(v.status) && isStringOrNull(v.url);

export const isPublication: Guard<Publication> = (v): v is Publication =>
  isObject(v) && typeof v.id === "number" && isString(v.title) && isStringOrNull(v.venue) &&
  (v.year === null || typeof v.year === "number") && isStringArray(v.authors) && isStringOrNull(v.url);

export const isSkill: Guard<Skill> = (v): v is Skill =>
  isObject(v) && typeof v.id === "number" && isString(v.name) && isString(v.category);

export const arrayOf =
  <T,>(guard: Guard<T>): Guard<T[]> =>
  (v): v is T[] =>
    Array.isArray(v) && v.every(guard);
