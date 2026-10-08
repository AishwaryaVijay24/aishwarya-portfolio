/** A technology name. Plain mono text separated by dots reads cleaner than a row of pills. */
export function TechList({ items, className = "" }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-x-2 font-mono text-[13px] leading-relaxed text-muted ${className}`} aria-label="Technologies">
      {items.map((item, i) => (
        <li key={item}>
          {item}
          {i < items.length - 1 && <span aria-hidden="true"> ·</span>}
        </li>
      ))}
    </ul>
  );
}
