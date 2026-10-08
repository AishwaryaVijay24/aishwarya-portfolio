"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef } from "react";
import { motion } from "motion/react";

import { navItems } from "@/lib/config/site";

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Props = {
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
};

/** Desktop links with a sliding active marker, and a disclosure menu on small screens. */
export function NavLinks({ menuOpen, onMenuOpenChange }: Props) {
  const pathname = usePathname();
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu after navigating.
  useEffect(() => {
    onMenuOpenChange(false);
  }, [pathname, onMenuOpenChange]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onMenuOpenChange(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, onMenuOpenChange]);

  return (
    <nav aria-label="Main">
      <ul className="label hidden gap-7 md:flex">
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block py-2 no-underline transition-opacity duration-200 hover:opacity-100 ${active ? "opacity-100" : "opacity-75"}`}
              >
                {item.label}
              </Link>
              {active && (
                <motion.span
                  layoutId="nav-marker"
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-current"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ul>

      <button
        ref={buttonRef}
        type="button"
        className="label py-2 md:hidden"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => onMenuOpenChange(!menuOpen)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
      <div
        id={menuId}
        hidden={!menuOpen}
        className="fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+60px)] border-b border-line bg-ground px-[var(--rail)] pb-6 text-ink md:hidden"
      >
        <ul className="grid">
          {navItems.map((item) => (
            <li key={item.href} className="border-t border-line first:border-t-0">
              <Link
                href={item.href}
                aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                className="condensed block py-3 text-2xl font-semibold no-underline aria-[current=page]:text-violet"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
