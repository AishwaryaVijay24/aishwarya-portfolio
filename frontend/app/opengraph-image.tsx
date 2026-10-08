import { ImageResponse } from "next/og";

import { site } from "@/lib/config/site";
import { BRAND, brandFonts } from "@/lib/ogFonts";

export const alt = `${site.name} · ${site.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A small fixed node network echoing the hero's neural mesh.
const NODES: [number, number][] = [
  [820, 120], [930, 70], [1060, 140], [980, 230], [1110, 300], [870, 330], [1010, 420], [1140, 480], [900, 520], [760, 440],
];
const EDGES: [number, number][] = [[0, 1], [1, 2], [0, 3], [2, 3], [3, 4], [3, 5], [5, 6], [4, 6], [6, 7], [6, 8], [8, 9], [5, 9]];

/** Link preview image (LinkedIn, Slack, etc.): name, positioning and statement on Night. */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: BRAND.night, padding: "72px 80px", fontFamily: "Instrument Sans" }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          {EDGES.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} stroke={BRAND.peri} strokeOpacity="0.35" strokeWidth="2" />
          ))}
          {NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 9 : 6} fill={i % 2 ? BRAND.peri : BRAND.lilac} fillOpacity="0.85" />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "flex", fontFamily: "DM Mono", fontSize: 24, letterSpacing: 4, color: BRAND.lilac }}>AI × SOFTWARE ENGINEERING</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Fraunces", fontStyle: "italic", fontSize: 128, lineHeight: 1, color: BRAND.lilac }}>{site.firstName}</div>
            <div style={{ display: "flex", fontSize: 128, lineHeight: 1, color: BRAND.onNight, marginLeft: 70, letterSpacing: -4 }}>{site.lastName}</div>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: BRAND.muted, maxWidth: 620 }}>{site.statement}</div>
        </div>
      </div>
    ),
    { ...size, fonts: await brandFonts() },
  );
}
