import "server-only";

import { apiGet } from "./client";
import { arrayOf, isPublication, isResearch } from "./types";

export function getResearch() {
  return apiGet("/api/research", arrayOf(isResearch));
}

export function getPublications() {
  return apiGet("/api/publications", arrayOf(isPublication));
}
