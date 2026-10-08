/**
 * Central site configuration: identity copy and external links.
 * Components read from here instead of hardcoding URLs or copy.
 *
 * A link set to null is not configured yet and is not rendered.
 */

export type ExternalLink = {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
  /** Text shown to the visitor, e.g. a handle or address. */
  display: string;
};

export const site = {
  name: "Aishwarya Vijay",
  firstName: "Aishwarya",
  lastName: "Vijay",
  positioning: "AI × Software Engineering",
  statement: "I build intelligent software systems from the model layer to the production stack.",
  heroCaption: "Nodes are components. Pulses are requests moving through the system.",
  // From the résumé summary in content/.
  bio: [
    "Full-stack software engineer with a BTech in Computer Science and an MSc in Artificial Intelligence from Queen Mary University of London.",
    "I build reliable backend services in Python and Java and operator-facing interfaces in TypeScript and React, with hands-on AI/ML experience from embedding search to multi-agent systems.",
  ],
  description:
    "Portfolio of Aishwarya Vijay, working across AI engineering and full-stack software engineering.",
} as const;

const github = "AishwaryaVijay24";

// From the résumé in content/. Set either to null to hide it.
const linkedin = "https://www.linkedin.com/in/aishwarya-vijay-4230a234a" as string | null;
const email = "aishwaryavijay24@gmail.com" as string | null;

export const externalLinks: ExternalLink[] = [
  { id: "github", label: "GitHub", href: `https://github.com/${github}`, display: `github.com/${github}` },
  ...(linkedin ? [{ id: "linkedin" as const, label: "LinkedIn", href: linkedin, display: linkedin.replace(/^https?:\/\/(www\.)?/, "") }] : []),
  ...(email ? [{ id: "email" as const, label: "Email", href: `mailto:${email}`, display: email }] : []),
];

export const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/contact", label: "Contact" },
] as const;
