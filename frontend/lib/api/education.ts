import "server-only";

import { apiGet } from "./client";
import { arrayOf, isEducation } from "./types";

export function getEducation() {
  return apiGet("/api/education", arrayOf(isEducation));
}
