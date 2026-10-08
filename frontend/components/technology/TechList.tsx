import { Boxes } from "lucide-react";

import { isDarkBrand, techIcon } from "@/lib/techIcons";

/** One technology: brand logo (in brand colour) where one exists, otherwise a neutral glyph. */
export function TechLogo({ name, size = 14 }: { name: string; size?: number }) {
  const icon = techIcon(name);
  if (!icon) return <Boxes size={size} className="shrink-0 opacity-60" aria-hidden="true" />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="shrink-0" fill={isDarkBrand(icon.hex) ? "currentColor" : `#${icon.hex}`} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

type Variant = "inline" | "chips" | "tiles";

/**
 * Technologies with logos.
 * - inline: compact mono list (metadata rows)
 * - chips: bordered chips (cards, experience)
 * - tiles: larger tiles (project stack section)
 */
export function TechList({ items, className = "", variant = "inline" }: { items: string[]; className?: string; variant?: Variant }) {
  if (items.length === 0) return null;
  const styles: Record<Variant, { list: string; item: string; size: number }> = {
    inline: { list: "flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[13px] text-muted", item: "inline-flex items-center gap-1.5", size: 14 },
    chips: { list: "flex flex-wrap gap-2 font-mono text-[12.5px]", item: "inline-flex items-center gap-1.5 rounded-md border border-line bg-surface/60 px-2.5 py-1", size: 14 },
    tiles: {
      list: "grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 text-[15px]",
      item: "flex items-center gap-3 rounded-[10px] border border-line bg-surface/70 px-4 py-3.5",
      size: 22,
    },
  };
  const s = styles[variant];
  return (
    <ul className={`${s.list} ${className}`} aria-label="Technologies">
      {items.map((item) => (
        <li key={item} className={s.item}>
          <TechLogo name={item} size={s.size} />
          {item}
        </li>
      ))}
    </ul>
  );
}
