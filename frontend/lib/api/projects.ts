import "server-only";

import { apiGet } from "./client";
import { arrayOf, isProject } from "./types";

export function getProjects() {
  return apiGet("/api/projects", arrayOf(isProject));
}

export function getProject(slug: string) {
  return apiGet(`/api/projects/${encodeURIComponent(slug)}`, isProject, { notFoundMeansMissing: true });
}
