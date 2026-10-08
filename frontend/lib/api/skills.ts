import "server-only";

import { apiGet } from "./client";
import { arrayOf, isSkill } from "./types";

export function getSkills() {
  return apiGet("/api/skills", arrayOf(isSkill));
}
