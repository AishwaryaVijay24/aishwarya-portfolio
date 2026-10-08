import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowUpRight, GithubIcon, LinkedinIcon, Mail } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { externalLinks, type ExternalLink } from "@/lib/config/site";

export const metadata: Metadata = { title: "Contact" };

const ICONS: Record<ExternalLink["id"], React.ReactNode> = {
  github: <GithubIcon size={26} />,
  linkedin: <LinkedinIcon size={26} />,
  email: <Mail size={26} aria-hidden="true" />,
};

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
        lede="Open to conversations about AI engineering, software engineering, research and graduate roles."
      />
      <Threaded>
        <Section labelledBy="links-heading" last>
          <SectionHeading index="01" label="Links" id="links-heading" title="Find me online" />
          <ul className="mt-10">
            {externalLinks.map((link, i) => (
              <Reveal as="li" key={link.id} from={i % 2 ? "right" : "left"} delay={i * 100} className="numbered-row">
                <a
                  href={link.href}
                  target={link.id === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="row-main group flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-7 no-underline"
                >
                  <span className="flex items-center gap-5">
                    <Magnetic strength={0.4}>
                      <span className="grid size-14 place-items-center rounded-full border border-line text-violet transition-colors group-hover:bg-violet group-hover:text-on-violet">
                        {ICONS[link.id]}
                      </span>
                    </Magnetic>
                    <span className="condensed text-[clamp(30px,4vw,48px)] leading-none font-semibold tracking-[-0.02em] group-hover:text-violet">{link.label}</span>
                  </span>
                  <span className="flex items-center gap-2 font-mono text-sm text-muted">
                    {link.display} <ArrowUpRight size={16} className="icon-nudge" aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Section>
      </Threaded>
    </>
  );
}
