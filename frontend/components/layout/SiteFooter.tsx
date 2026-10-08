import { externalLinks, site } from "@/lib/config/site";

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-[var(--rail)] pt-10 pb-[calc(40px+env(safe-area-inset-bottom,0px))] font-mono text-xs text-muted">
      <span>
        {site.name} · {site.positioning}
      </span>
      <ul className="flex flex-wrap gap-6">
        {externalLinks.map((link) => (
          <li key={link.id}>
            <a href={link.href} className="hover:text-ink" rel="noreferrer" target={link.id === "email" ? undefined : "_blank"}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
