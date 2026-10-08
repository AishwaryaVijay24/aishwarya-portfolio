import type { Metadata, Viewport } from "next";
import { DM_Mono, Fraunces, Instrument_Sans } from "next/font/google";
import { Suspense, ViewTransition } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader, SiteHeaderFallback } from "@/components/layout/SiteHeader";
import { CursorCompanion } from "@/components/motion/CursorCompanion";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/lib/config/site";
import "./globals.css";

const instrument = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-instrument" });
const fraunces = Fraunces({
  subsets: ["latin"],
  style: "italic",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono" });

export const metadata: Metadata = {
  title: { default: `${site.name} · ${site.positioning}`, template: `%s · ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#110e2e" },
    { media: "(prefers-color-scheme: dark)", color: "#07061a" },
  ],
};

// Applies a saved theme before first paint, so there is no flash (see Next.js "Preventing Flash" guide).
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${fraunces.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Suspense fallback={<SiteHeaderFallback />}>
            <SiteHeader />
          </Suspense>
          <ViewTransition>
            <main id="main">{children}</main>
          </ViewTransition>
          <SiteFooter />
          <CursorCompanion />
        </MotionProvider>
      </body>
    </html>
  );
}
