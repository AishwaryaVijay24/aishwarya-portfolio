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

## Desired feeling

The experience should feel:

* premium
* sophisticated
* technical
* warm
* editorial
* modern
* intentional
* calm
* confident

Avoid making the site feel:

* generic
* corporate
* overly futuristic
* cyberpunk
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

## Brand colour

Primary brand orange:

`#D97757`

The orange should be used intentionally rather than covering large areas of the interface.

It can appear in:

* accents
* interactive states
* selected typography
* icons
* small visual details
* the hero 3D object
* diagrams
* links or buttons where appropriate

Do not make the entire interface orange.

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

---

# 8. Hero Direction

The hero should immediately communicate:

* who I am
* what I do
* my AI/software-engineering positioning
* where the user can explore next

The initial composition should favour:

* strong typography
* generous whitespace
* clear CTA hierarchy
* one memorable visual element

## 3D Hero

Use React Three Fiber for one restrained 3D moment.

Initial concept:

* one soft rounded floating form
* brand orange `#D97757`
* soft lighting
* slow rotation
* subtle floating motion
* subtle mouse response
* lightweight rendering
* responsive sizing
* pause when the browser tab is hidden
* respect `prefers-reduced-motion`

The 3D object should support the hero rather than dominate it.

A future iteration may replace the abstract form with an extruded version of the personal logo.

Do not turn the entire portfolio into a 3D website.

---

# 9. Motion Direction

Motion should feel:

* slow
* deliberate
* subtle
* smooth
* premium

Prefer:

* opacity transitions
* small translations
* subtle scale changes
* gentle hover states
* controlled reveal animations
* restrained parallax
* meaningful micro-interactions

Avoid:

* constant movement
* aggressive bouncing
* excessive cursor-following
* animation on every element
* distracting scroll effects
* long loading animations

Respect:

`prefers-reduced-motion`

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
* Is the orange used intentionally?
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

---

# 16. Future Design System

The following will be defined after reference analysis:

* typography system
* font choices
* type scale
* spacing scale
* container widths
* grid system
* border radius system
* shadow system
* colour system
* button styles
* card styles
* navigation
* project presentation
* section patterns
* motion tokens
* responsive breakpoints
* 3D guidelines

Do not invent these values arbitrarily before the reference-analysis stage.
