import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { externalLinks } from "@/lib/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        seed={67}
        title={
          <>
            Let&apos;s <em className="display-word">talk</em>
          </>
        }
        lede="The best ways to reach me or see more of my work."
      />
      <Threaded>
        <Section labelledBy="links-heading" last>
          <SectionHeading index="01" label="Links" id="links-heading" title="Find me online" />
          <ul className="mt-10">
            {externalLinks.map((link) => (
              <li key={link.id} className="numbered-row">
                <a
                  href={link.href}
                  target={link.id === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="row-main group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-6 no-underline"
                >
                  <span className="condensed text-[clamp(28px,4vw,44px)] leading-none font-semibold tracking-[-0.02em] group-hover:text-violet">{link.label}</span>
                  <span className="font-mono text-sm text-muted">
                    {link.display} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </Threaded>
    </>
  );
}
