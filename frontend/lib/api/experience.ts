import "server-only";

import { apiGet } from "./client";
import { arrayOf, isExperience } from "./types";

export function getExperience() {
  return apiGet("/api/experience", arrayOf(isExperience));
}
