/** Splits a title so its last word can be set in the expressive display face. */
export function splitTitle(title: string): [string, string] {
  const t = title.trim();
  const i = t.lastIndexOf(" ");
  return i === -1 ? ["", t] : [t.slice(0, i + 1), t.slice(i + 1)];
}
