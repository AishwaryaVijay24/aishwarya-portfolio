import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Static brand fonts for generated images (ImageResponse needs static files, not variable fonts). */
export async function brandFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [fraunces, instrument, mono] = await Promise.all([
    readFile(join(dir, "Fraunces-500-Italic.woff")),
    readFile(join(dir, "InstrumentSans-600.woff")),
    readFile(join(dir, "DMMono-500.woff")),
  ]);
  return [
    { name: "Fraunces", data: fraunces, style: "italic" as const, weight: 500 as const },
    { name: "Instrument Sans", data: instrument, style: "normal" as const, weight: 600 as const },
    { name: "DM Mono", data: mono, style: "normal" as const, weight: 500 as const },
  ];
}

export const BRAND = { night: "#110E2E", lilac: "#B9A6F5", peri: "#7E95FF", onNight: "#EEEBFA", muted: "#A9A5CC" };
