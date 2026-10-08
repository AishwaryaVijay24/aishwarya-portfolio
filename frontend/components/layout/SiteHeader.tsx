"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { NavLinks } from "@/components/navigation/NavLinks";
import { navItems } from "@/lib/config/site";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

/**
 * Fixed header. Transparent with light text over the page's Night band,
 * solid once the band scrolls away. Hides on scroll down, returns on scroll up.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const band = document.querySelector<HTMLElement>("[data-night-band]");
      setSolid(!band || y > band.offsetHeight - 64);
      setHidden(!reduceMotion && y > lastY && y > 200);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname, reduceMotion]);

  return (
    <header className="site-header" data-solid={solid || menuOpen} data-hidden={hidden && !menuOpen}>
      <Link href="/" className="display-word text-[26px] leading-none no-underline" aria-label="Aishwarya Vijay, home">
        av
      </Link>
      <div className="flex items-center gap-4 md:gap-8">
        <NavLinks menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />
        <ThemeToggle />
      </div>
    </header>
  );
}

/** Static header rendered before the interactive one hydrates (and without JavaScript). */
export function SiteHeaderFallback() {
  return (
    <header className="site-header" data-solid="false">
      <Link href="/" className="display-word text-[26px] leading-none no-underline" aria-label="Aishwarya Vijay, home">
        av
      </Link>
      <nav aria-label="Main" className="hidden md:block">
        <ul className="label flex gap-7">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block py-2 no-underline opacity-75">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
