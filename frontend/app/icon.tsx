import { ImageResponse } from "next/og";

import { BRAND, brandFonts } from "@/lib/ogFonts";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Browser tab icon: the "av" mark in Fraunces Italic on Night. */
export default async function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.night, borderRadius: 14 }}>
        <span style={{ fontFamily: "Fraunces", fontStyle: "italic", fontSize: 44, color: BRAND.lilac, marginTop: -6 }}>av</span>
      </div>
    ),
    { ...size, fonts: await brandFonts() },
  );
}
