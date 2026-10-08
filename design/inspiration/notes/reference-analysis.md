# Reference Analysis

Working notes produced using the workflow in `DESIGN.md` §13.

These notes are NOT binding. A pattern only becomes part of the design system once it is recorded in the `DESIGN.md` Design Decisions Log.

Analysed: 2026-10-08

---

## 1. Luna — coworking landing page

**Source:** `pinterest/luna-coworking-landing.png` (Pinterest, original designer unknown)

### What works
* Oversized display wordmark used as the hero image itself
* A limited palette: one dominant colour (indigo), one warm neutral (cream), one accent (mint)
* Section rhythm through alternating background colour
* Short, confident copy blocks

### Relevant patterns
* Typography carrying the hero without needing imagery
* Colour-blocked sections as the main rhythm device

### What should not be copied
* Clouds, sparkles, scalloped dividers, blob-cropped photos, marquee band, circular sticker CTA
* Palette, wordmark, copy

### Portfolio decision
Pending. Its tone is far more playful than DESIGN.md's "calm, technical, editorial".

---

## 2. Petman — dog-walking service (desktop + mobile)

**Source:** `pinterest/petman-dog-service-landing.png` (Pinterest, original designer unknown)

### What works
* Large, light-weight sans wordmark with illustration overlapping it, so the type and image share one layer of depth
* Desktop and mobile shown side by side: the mobile layout is **recomposed** (single-column cards, a large centred statement block), not just shrunk
* Muted indigo, cream and mustard palette with alternating section backgrounds
* Cards with slight rotation and offset, which feel tactile rather than templated
* Photo collage scattered over a headline
* Torn-paper section edges

### Relevant patterns
* Layering type and visual for depth (relevant to the 3D hero sitting behind or in front of the name)
* Deliberate mobile recomposition (DESIGN.md §10)
* Variety in section composition, so not every section looks the same

### What should not be copied
* Illustrations, dog imagery, torn-paper edges, notebook testimonial spread, paw-print background
* Palette, branding, copy

### Portfolio decision
Pending.

---

## 3. Personal portfolio (dark, editorial)

**Source:** `videos/editorial-portfolio-dark.png` (video frame, watermark `@sanlife.design`)

### What works
* Navigation as four tiny uppercase labels spread across the full width
* Huge contrast in scale: micro-labels next to a large wide display heading ("Work")
* Section metadata labels with counts, e.g. `FEAT WORKS (04)`
* Ghosted repeats of the heading behind the main word (likely a scroll or reveal effect; it can't be confirmed from a still)
* A small arrow glyph used as a directional cue
* Dark, near-monochrome UI where project imagery provides the colour

### Relevant patterns
* **Metadata labels / counts** are a direct, editorial way to express CLAUDE.md's "technical metadata" motif without looking like a dashboard
* Project imagery as the main colour source, with the UI kept neutral

### What should not be copied
* Exact nav layout, the ghosted-heading animation, typeface, the designer's identity

### Portfolio decision
Pending. Its overall tone is the closest match to DESIGN.md of all the references.

---

## 4. Kamui — card game landing page

**Source:** `videos/kamui-card-game-landing.png` (video frame)

### What works
* Clear text hierarchy: small spaced eyebrow label, then an uppercase display headline, a short body and one primary CTA
* Carousel with previous/next controls and segmented progress indicators
* A framed artwork card giving the hero a single focal object

### Relevant patterns
* The eyebrow → headline → body → CTA stack for section intros
* Segmented progress indicator (possible fit for a project carousel or step-through)
* One focal object beside the text (comparable to the 3D hero placement)

### What should not be copied
* Fantasy illustration, glowing particles, ornamental frames, crypto/NFT aesthetic, palette
* Particle effects specifically conflict with DESIGN.md §6

### Portfolio decision
Pending.

---

## 5. Numbered services list

**Source:** `videos/numbered-services-list.png` (video frame; page footer says "Built on Wix Studio")

### What works
* Large, heavy numerals (`03`, `04`, `05`) as the main visual element of each row
* Uppercase title with a single short description line
* Thin horizontal rules between rows instead of cards
* Light background with plenty of space
* Motion blur on the numerals suggests a scroll-linked reveal (inferred from a still)

### Relevant patterns
* **Numbered index list instead of a card grid.** This directly supports DESIGN.md §7 ("not every piece of content needs to be inside a card"). It could suit experience, capabilities or research.
* Rules as structure instead of borders around boxes

### What should not be copied
* Typeface, exact row layout, copy, the scroll animation itself

### Portfolio decision
Pending.

---

## 6. ChainGPT and Chillo Coffee (Dribbble)

**Source:** `websites/references.md` (the user's notes only; the shots themselves have not been viewed)

Summary of the notes: interactive 3D tied to the UI, spatial depth, motion continuity between sections, and objects that respond to interaction. Principle: "alive, but intentional".

---

## Recurring patterns across all references

| # | Pattern | Seen in | Fit with DESIGN.md |
|---|---|---|---|
| 1 | Oversized display type used as the hero visual, contrasted with very small supporting text | Luna, Petman, sanlife, numbered list | Strong ("typography before decoration") |
| 2 | Section rhythm through alternating background tone | Luna, Petman, sanlife | Strong ("strong section rhythm") |
| 3 | Restricted palette: one dominant colour, one neutral, one accent | All | Strong |
| 4 | Small metadata: eyebrows, counts, index numbers | sanlife, Kamui, numbered list | Strong (the editorial form of "technical metadata") |
| 5 | Lists and rules instead of card grids | Numbered list, sanlife | Strong |
| 6 | Layered depth: type overlapping visuals, offset or rotated elements | Petman, Kamui, ChainGPT notes | Good, if restrained |
| 7 | Mobile recomposed rather than shrunk | Petman | Required by §10 |
| 8 | Muted indigo/violet paired with a warm neutral | Luna, Petman, Kamui | Open question: could pair with brand orange |

## Gaps
* Video references are single frames, so motion can only be inferred
* The ChainGPT and Chillo Coffee shots have not been viewed directly
* Only one reference (Petman) shows mobile
* No typography references yet
