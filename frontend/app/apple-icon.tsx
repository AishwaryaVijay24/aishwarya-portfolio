import { ImageResponse } from "next/og";

import { BRAND, brandFonts } from "@/lib/ogFonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS. iOS applies its own rounded mask, so the square is full-bleed. */
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.night }}>
        <span style={{ fontFamily: "Fraunces", fontStyle: "italic", fontSize: 118, color: BRAND.lilac, marginTop: -14 }}>av</span>
      </div>
    ),
    { ...size, fonts: await brandFonts() },
  );
}
