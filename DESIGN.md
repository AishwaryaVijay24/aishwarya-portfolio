# DESIGN.md

## Purpose

This document is the visual and interaction source of truth for the Aishwarya Vijay AI × Software Engineering portfolio.

`CLAUDE.md` defines how the project should be built.

`DESIGN.md` defines how the product should look, feel, behave, and communicate.

Before making meaningful UI or visual changes, read this document.

---

# 1. Design Vision

## Product

A premium personal portfolio for an AI/software engineer.

The website should feel like a real software product rather than a traditional developer résumé website.

It should communicate:

> I understand AI, but I also understand how to build software around it.

The visual language should balance:

* AI sophistication
* software-engineering credibility
* research curiosity
* technical depth
* human personality
* usability

## Identity

> **Tech girl + AI engineer + creative builder.**
>
> She builds serious technology, but the experience has personality.

The site should communicate a woman working deeply in technology through typography, colour, technical visuals, motion and composition. It must not rely on stereotypes.

## Desired feeling

The experience should feel:

* futuristic
* feminine, without being stereotypically feminine
* technical
* intelligent
* elegant
* expressive
* slightly playful
* confident
* intentional

Confident rather than cute.

## What "playful" means here

Playful and expressive comes from:

* expressive display typography set against a strong technical sans
* confident colour blocking, especially the deep indigo hero band
* tactile layering, such as type passing in front of and behind the hero visual
* fluid, responsive motion and micro-interactions
* personality in copy

It does NOT come from decoration. Illustrations, mascots, clip-art shapes, sparkles, blobs and torn-paper edges are excluded (see §6).

Playful must never undermine technical credibility. The content must still read as the work of a serious engineer.

Avoid making the site feel:

* generic
* corporate
* cyberpunk or sci-fi cliché
* cute or childish
* overly pastel
* stereotypically "girly" (pink, girl-boss imagery, female illustrations, stock photos)
* noisy
* template-like
* AI-generated
* overly decorative

---

# 2. Brand Direction

## Primary identity

Name:

Aishwarya Vijay

Positioning:

AI × Software Engineering

Core message:

> I build intelligent software systems from the model layer to the production stack.

## Colour

The palette is built from lilac, lavender, purple, blue and deep indigo on a soft, cool neutral.

Orange (`#D97757`) is no longer used.

### Roles

| Role | Use |
|---|---|
| **Night** | Deep indigo anchor. The hero band and the 3D scene. Gives depth and the futuristic feel. |
| **Lilac** and **periwinkle** | Expressive colours. Used as light: the neural mesh, highlights on Night, big numerals. Not as large fills. |
| **Violet** | Text links, the primary button, active states on light surfaces. |
| **Ground** | Cool lavender-grey for reading sections. Not pink. |
| **Ink** / **muted** | Body and secondary text. |

Colour comes mainly from the Night band and the neural mesh. Reading sections stay calm and neutral, so the page never turns pastel overall.

### Values

Approved after the hero prototype. Every pair below passes WCAG AA (4.5 for text, 3.0 for large text and UI).

| Token | Light | Dark |
|---|---|---|
| ground | `#F2F1F7` | `#0E0C22` |
| ink | `#15132B` | `#ECEAF8` |
| muted | `#565470` | `#A4A0C0` |
| violet | `#5B3DD0` | `#B3A1FF` |
| night | `#110E2E` | `#07061A` |
| on-night | `#EEEBFA` | `#EEEBFA` |
| night-muted | `#A9A5CC` | `#A9A5CC` |
| lilac | `#B9A6F5` | `#C8B8FF` |
| periwinkle | `#7E95FF` | `#93A8FF` |

Measured contrast (light / dark): ink on ground 16.1 / 16.2, muted on ground 6.5 / 7.7, violet on ground 6.2 / 8.6, on-night on night 15.9 / 17.1, night-muted on night 7.9 / 8.5, lilac on night 8.7 / 11.2, periwinkle on night 6.8 / 8.8, primary button label 7.0 / 8.6.

### Project accents

Each project visual has its own accent so projects do not look alike. Vivid shades are for artwork on Night; "ink" shades are for text on light surfaces (all pass WCAG AA).

| Accent | Vivid | Ink (light / dark) | Used for |
|---|---|---|---|
| orchid | `#E879C9` | `#A3268B` / `#F0A6DD` | Agent systems; AI Lab; About |
| sky | `#5CC8FF` | `#0B6FA4` / `#8FD8FF` | Retrieval pipelines; Research |
| teal | `#2DD4BF` | `#0F766E` / `#5EEAD4` | Services; Experience |
| mint | `#6EE7B7` | `#047857` / `#6EE7B7` | Model fine-tuning |
| leaf | `#4ADE80` | `#166534` / `#86EFAC` | Sustainability apps |

Lilac, periwinkle and violet remain the core identity; accents add colour within sections, never as full-page fills.

## Colour mode

Both light and dark mode are supported.

Light mode is designed first.

In light mode the hero is still a Night band. That is colour blocking, not dark mode.

## Typography

| Role | Face | Use |
|---|---|---|
| Technical sans | **Instrument Sans** (variable width and weight) | Body text, UI, and strong condensed headlines |
| Expressive display | **Fraunces Italic** (soft, slightly quirky letterforms) | The name, one emphasised word in a headline, large list numerals |
| Mono | **DM Mono** | Metadata labels, routes, technical captions |

The personality comes from the interplay: a strong sans headline with one word set in Fraunces Italic, for example "AI × *Software* Engineering".

### Section voices

Sections use different heading voices so they do not read alike (SectionHeading `font`):

| Voice | Style | Sections |
|---|---|---|
| condensed | Instrument Sans bold, 80% width | Projects, Contact |
| wide | Instrument Sans light, full width | Experience, Journey, About profile |
| serif | Fraunces roman | Research, publications, project overviews |
| mono | DM Mono | AI Lab, project stacks |

Fraunces is for moments, never for running text.

No decorative script fonts.

All three are on Google Fonts under the SIL Open Font License and will be self-hosted through Next.js.

---

# 3. Design Principles

## 3.1 Typography before decoration

Strong typography, spacing, hierarchy, and composition should do most of the visual work.

Do not use effects to compensate for weak layout.

## 3.2 Restraint

Prefer one strong visual idea over five competing effects.

If removing an effect makes the interface clearer, remove it.

## 3.3 One coherent system

The website should not feel like a collection of components copied from different UI libraries.

References may inspire individual ideas, but everything must ultimately belong to one visual language.

## 3.4 Technical but human

The site should demonstrate engineering ability without looking like a developer dashboard.

Technical information should be visually interesting and understandable.

## 3.5 Motion with purpose

Animation should communicate:

* hierarchy
* interaction
* state
* continuity
* depth

Avoid animation simply because animation is possible.

## 3.6 Performance matters

Visual quality must not come at the cost of unnecessary JavaScript, rendering work, large assets, or excessive animation.

---

# 4. Visual References

References are stored under:

`design/inspiration/`

Current reference sources:

### UI/UX

* Mobbin
* Pinterest references
* Website references

### Design quality

* UI UX Pro Max
* Impeccable

### Components and motion

* React Bits
* Aceternity UI
* 21st.dev

### Design workflow

* Figma + MCP

### User-provided references

Pinterest images, screenshots, videos, and other references supplied during development.

---

# 5. Reference Usage Rules

References are for analysis and inspiration.

They are NOT instructions to copy a design.

When analyzing a reference, identify:

* composition
* typography
* spacing
* hierarchy
* colour usage
* interaction
* animation
* motion
* 3D treatment
* section rhythm
* responsive behaviour
* information density

Do not copy:

* exact layouts
* branding
* logos
* artwork
* text
* illustrations
* proprietary visual identity
* exact animations

The goal is to extract design principles and create an original implementation.

---

# 6. Anti-Slop Rules

Avoid generic AI-generated portfolio patterns.

Do not automatically use:

* excessive glassmorphism
* excessive gradients
* neon cyberpunk styling
* giant glowing headings
* random floating blobs
* animated gradient backgrounds
* excessive 3D
* excessive rounded cards
* excessive pills
* excessive badges
* card grids for every section
* unnecessary borders everywhere
* excessive shadows
* generic AI/circuit imagery
* meaningless particle effects
* excessive scroll animations
* overly complicated dashboards
* component-library-looking pages

Do not use a visual effect simply because it looks impressive in isolation.

The interface should still look good when animation and effects are removed.

---

# 7. Layout Philosophy

Prioritize:

1. Typography
2. Whitespace
3. Composition
4. Information hierarchy
5. Interaction
6. Motion
7. Decoration

Use strong section rhythm.

Avoid making every section visually identical.

Not every piece of content needs to be inside a card.

Use cards when they provide meaningful grouping or interaction.

## Section patterns

Each section has its own composition. Do not build every section as heading → paragraph → identical cards.

| Pattern | Used for | Composition |
|---|---|---|
| Spotlight rows | Featured projects (home) | Large artwork and text side by side; rows alternate left/right |
| Flip-card rail | Supporting projects (home) | Horizontal, snap-scrolling rail; cards flip on hover/focus to reveal stack and summary |
| Editorial index | All projects (/projects) | Large ruled rows; a preview panel follows the cursor over the hovered row |
| Timeline | Experience and education | Vertical centre line with icon nodes; entries alternate sides |
| Stepper | Build phases | Horizontal steps with icons on Night; vertical on small screens |
| Full-width band | Architecture (home) | A Night band that breaks out of the content column to the viewport edges |
| Publication feature | Published research | Large title, authors with the site owner in bold, slowly rotating "published" seal |
| Icon cards | Skills, planned agent tools | Category icon plus mono chips; first card spans the row |

## Icons

Icons come from lucide-react (ISC licence), plus two brand marks it no longer ships: GitHub (Simple Icons, CC0) and a plain "in" mark for LinkedIn.

Use icons only where they add meaning: link types (GitHub, LinkedIn, email, paper, external), timeline kinds (work, education), skill categories, project metadata (period, category), build phases, research and agent tools.

Icons are decorative (`aria-hidden`) unless they are the only label.

## Section surfaces

Each section band picks one surface (Band `surface`), and neighbouring sections never share one:

| Surface | Look | Sections |
|---|---|---|
| grid | Faint graph paper; lights up around the cursor | Project sections only |
| tint | Translucent lavender, large outlined years | Experience, Journey, project highlights |
| paper | Faint ruled lines | Research |
| dots | Dot matrix | AI Lab |
| wash | Soft sky-to-orchid wash | About |
| night | Full-width Night band | System |

The cursor glow belongs only to the grid surface; no other section has a background interaction.

## Project visuals

Every project has its own artwork (`visual` field), drawn from what it actually does:

| Visual | Depicts |
|---|---|
| agents | A supervisor coordinating agents, tools around it, a human-approval gate |
| pipeline | Retrieval stages narrowing candidates to a verdict |
| services | Microservices over a queue and a database, with a dashboard |
| vectors | Embedded chunks in a vector space and a query's nearest neighbours |
| lowrank | Frozen weights plus a low-rank adapter |
| app | An abstract app screen (no invented data) |
| network | Fallback network graph |

Labels inside visuals use only facts from the project's verified description.

Do not use chart-like art (lines that rise and fall) on project cards: it reads as performance data, and the portfolio never shows invented metrics.

## Technology logos

Technologies show their logo from Simple Icons (CC0) in brand colour. Near-black brand colours use the text colour so they stay visible in dark mode.

Only exact brands, or the maker of a tool (e.g. Hugging Face for PEFT and TRL), get a logo. Concepts such as RAG or Microservices get a neutral glyph, never a borrowed logo.

## Numbered lists

Numbered or ruled lists are a core pattern: large index numbers and thin dividing rules, without card containers.

Use them for experience, research and capabilities.

Reserve cards for projects, where they support interaction.

---

# 8. Hero Direction

The hero should immediately communicate:

* who I am
* what I do
* my AI/software-engineering positioning
* where the user can explore next

The composition should favour:

* strong typography
* asymmetry
* intentional whitespace
* clear CTA hierarchy
* one memorable visual element connected to the content

The hero is NOT `text | object`. It is one composition:

```text
identity + message + interactive technical visual + motion
```

## Composition

* The hero is a Night band.
* The name is large and anchored low on the left.
* The neural mesh fills the band behind and around the type rather than sitting in its own column.
* The message and calls to action sit in a quiet zone: mesh elements that project into it fade out.
* The name is set at a restrained display size (at most about 140px on desktop) so the message and visual carry equal weight.
* On mobile the mesh has fewer nodes and the name sits low. The layout is recomposed, not shrunk.

## Hero concept: Neural mesh

A slowly drifting 3D network of nodes and connections in lilac and periwinkle. Bright pulses travel from node to node along the connections.

### Meaning

Nodes are components. Pulses are requests moving through the system.

It shows the portfolio's core message, "I build intelligent software systems from the model layer to the production stack", as something alive: many parts connected into one working system. A one-line caption in the hero says this in words, so the meaning never depends on the visual alone.

### Behaviour

* Nodes drift slowly and continuously. Pulses walk the network, choosing a new connected edge at each node.
* Nodes and connections near the cursor brighten.
* The camera tilts slightly with the pointer, for depth.
* On scroll, the camera pulls back, the mesh tilts away and fades, and the page thread begins below the hero (§9).

### Rules

* The mesh is the only 3D scene on the site.
* It is decorative. The canvas is `aria-hidden` and all content is real HTML.
* It pauses when the tab is hidden or the hero is off screen.
* Mobile renders fewer nodes and pulses.
* With `prefers-reduced-motion`, it renders a single still frame.
* Node networks are a common "AI" image. The pulses, the caption and restrained styling keep it meaningful; do not add particles, glow or extra effects.

### Alternative kept on file

The prototype also tested a "signal grid" (a dot-matrix terrain with a scan line and cursor ripples). It can replace the mesh by swapping one component if the mesh ever feels generic.

## Robot companion

A small lilac robot icon follows the mouse cursor.

* It trails the cursor with a spring, leans as it moves, and its eyes look in the direction of travel.
* It blinks occasionally.
* Over links and buttons: a small ring (40px) expands around the pointer and the robot smiles.
* Over project cards (`data-cursor="view"`): a small "View →" label appears beside the robot.
* It never replaces the system cursor.
* Mouse only: hidden on touch devices and with `prefers-reduced-motion`.
* `aria-hidden`; it carries no information.

It is the site's single piece of overt playfulness and a deliberate exception to "avoid excessive cursor-following" (§9). Do not add other cursor effects.

## Supporting visual: Living System

Architecture and project sections use a system diagram of real layers (model, retrieval, agents, API, data, cloud).

Built layers render solid. Planned layers render as outlines labelled "planned", so the diagram stays truthful.

Signal pulses travel along connections to show how parts relate.

Do not turn the entire portfolio into a 3D website.

---

# 9. Motion Direction

The site should feel like an interactive digital experience, not a portfolio with random animations.

Motion should feel:

* fluid
* elegant
* spatial
* responsive
* slightly playful
* sophisticated
* controlled

## Principles

These are drawn from the ChainGPT and Chillo Coffee references (`design/inspiration/websites/references.md`). Their animations are not copied.

* Objects feel alive and respond to the visitor.
* Sections continue into each other instead of stacking.
* Movement tells the story of the content.
* Interaction has depth, not just scale.

## The four layers

### 1. Ambient

Only the hero neural mesh moves continuously, and slowly. Nothing else loops (except the Living System pulses while that diagram is in view).

### 2. Scroll-linked: the thread

One continuous line leaves the hero and runs down the page.

* It draws itself as the visitor scrolls.
* Each section heading lands on it.
* Numbered-list rules extend from it as their rows enter the viewport.

The thread is what connects sections. It replaces generic per-section fade-ins.

### Entrances

Elements enter from the direction that fits the composition, not always from below:

* `left` / `right`: alternating rows, timeline entries, spotlight artwork and text (from opposite sides)
* `tilt`: cards shifting into place (rail cards, terminal)
* `scale`: decorative objects (the publication seal)
* `up`: supporting text
* Headings reveal word by word.

Stagger related items (about 80–140ms apart). Never animate a whole page at once.

Only elements below the fold at load start hidden, so server-rendered content is always visible without JavaScript.

### 3. Interaction

* **CTAs:** primary buttons are magnetic (they drift slightly toward the pointer).
* **Project artwork:** tilts toward the cursor with layered depth and drifts against the scroll (parallax).
* **Rail cards:** flip to reveal stack and summary.
* **Project index:** a floating preview follows the cursor.
* **Link icons:** arrows nudge diagonally on hover.
* **List rows:** on hover or focus, the thread segment brightens, the text shifts slightly, and secondary metadata appears.
* **Project cards:** layered depth. Inner layers move at different depths with the pointer, a few degrees of tilt at most. The title rises to reveal a technology line. No blanket `scale(1.02)`.
* **Hero:** nodes near the cursor brighten and the camera tilts.
* **Cursor:** the robot companion follows the mouse (§8). The graph paper lights up around it.

### 4. State

* **Headings:** rise out of a clipping mask, once per page view.
* **Project open:** the card visually carries into its detail page.
* **Route change:** a soft crossfade, with the thread continuing.

## Navigation

* One entrance fade on load.
* The active-page marker slides between items.
* The nav hides on scroll down and returns on scroll up.
* Nothing more.

## Motion tokens

One easing curve and three durations, finalised in the prototype:

| Token | Provisional value | Use |
|---|---|---|
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances, reveals, transitions |
| `fast` | 180ms | Hover and focus |
| `base` | 420ms | Reveals, the nav marker |
| `slow` | 900ms | Heading masks, section handoffs |

Interactive pointer motion (card tilt, camera tilt, the robot) uses damped springs.

## Avoid

* constant movement outside the hero
* aggressive bouncing
* excessive cursor-following (the robot companion is the single deliberate exception)
* animation on every element
* scroll-jacking
* long loading animations
* particles, glassmorphism and animated gradients

## Reduced motion

With `prefers-reduced-motion`:

* no ambient or scroll-linked motion
* the hero is a still frame
* content appears instantly
* hover feedback uses colour only

The page must look complete with zero motion.

## Implementation stack

| Tool | Used for |
|---|---|
| CSS | Hover and focus states, colour transitions, reduced-motion fallbacks |
| Framer Motion (`motion` package) | Nav marker, card tilt, parallax, magnetic CTAs, the timeline line, the full-width band, the cursor companion, the index preview |
| CSS (`Reveal`, `Words`) | Directional entrances, word reveals, flip cards, the rotating seal |
| React `<ViewTransition>` | Route crossfades and the project card → detail morph (no extra library) |
| React Three Fiber | The hero neural mesh only, loaded lazily on the client |
| Drei | Performance helpers only (adaptive resolution under load) |

Do not add other animation or smooth-scroll libraries.

---

# 10. Responsive Design

The design must work intentionally across:

* desktop
* laptop
* tablet
* mobile

Do not simply shrink the desktop design.

Mobile layouts should be deliberately composed.

The hero 3D experience must degrade gracefully on smaller devices.

---

# 11. Accessibility

Visual effects must never communicate essential information by themselves.

The 3D canvas is decorative.

Important information must remain accessible through normal HTML.

Maintain:

* keyboard accessibility
* sufficient contrast
* visible focus states
* semantic HTML
* reduced-motion support
* usable touch targets

---

# 12. Component Philosophy

Components should be introduced because they solve a real UI problem.

Before adding a visual component, ask:

1. Does it improve understanding?
2. Does it fit the existing visual language?
3. Does it improve interaction?
4. Is it performant?
5. Is it responsive?
6. Is it accessible?
7. Would a simpler solution be better?

Prefer a small number of excellent components over a large collection of decorative ones.

---

# 13. Inspiration Analysis Workflow

When new references are added to:

`design/inspiration/`

do not immediately implement them.

First analyse them.

For each useful reference record:

### Reference

What is the source?

### What works

What makes the design effective?

### Relevant patterns

What principles could apply to this portfolio?

### What should not be copied

What is specific to the original product or brand?

### Portfolio decision

How should the idea influence our design system?

The final decision belongs in this document rather than relying on the raw reference.

---

# 14. Design Review

Before considering a significant UI section complete, review it against:

### Visual quality

* Does the hierarchy feel intentional?
* Is spacing consistent?
* Is typography doing enough work?
* Does the composition feel balanced?

### Brand

* Does it feel like the same portfolio?
* Is colour concentrated in the Night band and the mesh, with calm reading sections?
* Does it feel confident rather than cute or overly pastel?
* Does it feel AI × Software Engineering rather than generic AI?

### Anti-slop

* Does it look like a generic AI-generated website?
* Are there unnecessary cards?
* Are there unnecessary gradients?
* Are there unnecessary effects?
* Is there too much glassmorphism?
* Is there too much animation?

### Interaction

* Do hover states feel intentional?
* Does motion communicate something?
* Does the interface remain usable without animation?

### Responsive

* Does the composition still work on mobile?
* Are important elements still visible?
* Does the 3D experience remain lightweight?

### Accessibility

* Can the interface be navigated with a keyboard?
* Is essential information available without animation?
* Is reduced motion respected?

---

# 15. Design Decisions Log

Use this section to record decisions made after reviewing references.

Format:

### Decision

**Decision:**
[What we decided]

**Reason:**
[Why]

**Inspired by:**
[Reference]

**Date:**
[Date]

This section prevents the visual direction from drifting as the project grows.

### Tone: playful and expressive

**Decision:**
The portfolio leans playful and expressive rather than calm and minimal. This is expressed through typography, colour blocking, layering and micro-interactions, not decoration.

**Reason:**
Chosen by Aishwarya after reviewing the references. It gives the portfolio personality and keeps it from looking like a template.

**Inspired by:**
Luna, Petman (`design/inspiration/pinterest/`)

**Date:**
2026-10-08

### Palette: orange accent + muted indigo secondary

**Status:** Superseded on 2026-10-08 by "Palette: lilac, purple, blue and deep indigo".

**Decision:**
`#D97757` stays the accent. A muted indigo is added as the secondary colour for colour-blocked sections. Exact values to be set in a swatch study.

**Reason:**
Muted indigo with a warm neutral recurs across several references, and it complements the warm orange.

**Inspired by:**
Luna, Petman, Kamui

**Date:**
2026-10-08

### Colour mode: light first

**Decision:**
Light mode is designed first. Dark mode is also supported.

**Reason:**
Suits the expressive direction. (The original note about a darker orange no longer applies since orange was removed.)

**Inspired by:**
Luna, Petman, numbered services list

**Date:**
2026-10-08

### Numbered lists as a core pattern

**Decision:**
Experience, research and capabilities use numbered or ruled lists. Cards are reserved for projects.

**Reason:**
Avoids card grids for every section (§6, §7) and builds section variety.

**Inspired by:**
Numbered services list (`design/inspiration/videos/numbered-services-list.png`), sanlife portfolio

**Date:**
2026-10-08

### Palette: lilac, purple, blue and deep indigo

**Decision:**
Orange is removed. The palette is lilac, lavender, purple, blue and deep indigo on a cool neutral ground, with a deep indigo "Night" anchor. Provisional values are in §2.

**Reason:**
Chosen by Aishwarya after two study rounds. The aim is futuristic, feminine, technical and elegant, so the deep anchor keeps it confident rather than pastel.

**Inspired by:**
Palette B and Ultraviolet from the studies; Luna, Petman, Kamui

**Date:**
2026-10-08

### Typography: Instrument Sans + Fraunces Italic + DM Mono

**Decision:**
Instrument Sans for body and strong headlines, Fraunces Italic for expressive moments, DM Mono for metadata.

**Reason:**
Aishwarya liked Type C (Fraunces) and asked for flowier, more vibrant type that stays readable. Mixing a strong sans with an expressive italic gives personality without a decorative script.

**Inspired by:**
Type studies, rounds 1 and 2

**Date:**
2026-10-08

### Hero: The Loom

**Status:** Superseded on 2026-10-08 by "Hero: Neural mesh".

**Decision:**
The hero visual is the Loom: flowing threads woven through a sparse lattice, referencing Ada Lovelace and the Jacquard loom. It replaces the soft orange form. Living System is the supporting visual for architecture and projects.

**Reason:**
The visual needed a real conceptual link to the portfolio. The Loom connects a woman at the origin of software with building systems from many parts, and its flow matches the typography. The circle had no meaning.

**Inspired by:**
ChainGPT notes (interactive 3D, depth), Chillo Coffee notes (continuity)

**Date:**
2026-10-08

### Motion: four-layer system with a continuous page thread

**Decision:**
Motion is organised into ambient, scroll-linked, interaction and state layers. A single thread leaves the hero and connects all sections. Framer Motion and React Three Fiber only.

**Reason:**
Aishwarya wants an interactive experience where components move, not static blocks. The thread gives continuity without animating everything.

**Inspired by:**
ChainGPT and Chillo Coffee notes (`design/inspiration/websites/references.md`)

**Date:**
2026-10-08


### Hero: Neural mesh

**Decision:**
The hero visual is a drifting 3D network of nodes with pulses travelling along connections, captioned "Nodes are components. Pulses are requests moving through the system." It replaces the Loom.

**Reason:**
Aishwarya asked for the threads to be replaced with something that moves and reads as more technical. The mesh was the prototype default when the design was approved; the signal grid is kept on file as an alternative.

**Inspired by:**
Hero prototype rounds 1 and 2; ChainGPT notes (interactive 3D, depth)

**Date:**
2026-10-08

### Robot cursor companion

**Decision:**
A small robot icon follows the mouse cursor, mouse-only and hidden with reduced motion.

**Reason:**
Requested by Aishwarya. It adds personality ("she builds serious technology, but the experience has personality") in one contained place.

**Inspired by:**
Aishwarya's request; Chillo Coffee notes (playful but controlled interactions)

**Date:**
2026-10-08

### Graph paper sections and network-graph card art

**Decision:**
Sections below the hero use a faint graph-paper grid that lights up around the cursor. Project cards use generated network graphs, not charts.

**Reason:**
Aishwarya asked for a graph-like pattern below the hero. Chart-like card art was rejected because it implies metrics that do not exist.

**Inspired by:**
Aishwarya's request; hero prototype round 2

**Date:**
2026-10-08

### Name size reduced

**Decision:**
The hero name is set at most about 140px on desktop (previously about 210px).

**Reason:**
Aishwarya felt the name was too big.

**Inspired by:**
Hero prototype review

**Date:**
2026-10-08


### Section-by-section composition and richer motion

**Decision:**
Replace the repeated heading → cards template with distinct section patterns (§7), directional and word-by-word entrances, magnetic CTAs, parallax, flip cards, a cursor-following project preview and a scroll-driven full-width band (§9).

**Reason:**
Aishwarya found the site repetitive and static. The ChainGPT and Chillo Coffee references are about how components move; these patterns give each section its own movement while staying controlled.

**Inspired by:**
ChainGPT and Chillo Coffee (motion principles, not visuals)

**Date:**
2026-10-08

### Icon system

**Decision:**
lucide-react for interface icons, Simple Icons (CC0) for the GitHub mark, a plain mark for LinkedIn. Icons only where they carry meaning.

**Reason:**
Requested by Aishwarya to improve information hierarchy.

**Inspired by:**
Aishwarya's request

**Date:**
2026-10-08

### Cursor companion restored and extended

**Decision:**
The robot companion now drives its visibility through motion values (it was invisible because its opacity was a static style that never updated), and gains a link ring and a "View" label for project cards.

**Reason:**
Aishwarya noticed the cursor interaction had disappeared and wanted it to react to interactive elements.

**Inspired by:**
Aishwarya's request

**Date:**
2026-10-08


### Less repetition: per-project visuals, accents, voices and surfaces

**Decision:**
Replace the shared network graph with per-project visuals and accent colours; give sections different heading voices and background surfaces; limit graph paper and its glow to project sections; add technology logos.

**Reason:**
Aishwarya found the graph visual, the type treatment and the highlighted grid overused, and the Projects, Experience, Research and About sections too similar. She also asked for more colour and tech logos.

**Inspired by:**
Aishwarya's review of the redesigned site

**Date:**
2026-10-08

---

# 16. Future Design System

Already defined: font choices (§2), colour system (§2), motion tokens (§9), hero and 3D guidelines (§8), section surfaces and project card art (§7).

Still to be defined:

* type scale
* spacing scale
* container widths
* grid system
* border radius system
* shadow system
* colour system
* button styles
* card styles
* project presentation
* section patterns
* responsive breakpoints

Do not invent these values arbitrarily before the reference-analysis stage.
