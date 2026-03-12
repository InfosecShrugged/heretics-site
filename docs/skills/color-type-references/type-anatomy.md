# Type Reference — Bringhurst + Typewolf (Web Translation)

## Type Anatomy Decision Tree for Pairing

When evaluating whether two typefaces work together, check these five axes:

### 1. X-height compatibility
- Measure: ratio of lowercase height to cap height
- Rule: pair fonts with similar x-heights for body + secondary roles
- Mismatch: high x-height sans (Helvetica) + low x-height serif (Garamond) = awkward size relationship
- Test: set both at the same font-size. Does the body feel like it belongs at the same scale?

### 2. Stroke contrast
- High contrast: thick/thin variation is dramatic (Didot, Bodoni, Cormorant)
- Low contrast: uniform stroke weight (Helvetica, Futura, Geist)
- Rule: pair high-contrast with low-contrast. High + high = visual noise competing for attention.
- Modernist geometric sans (low contrast) + editorial serif (high contrast) = classic pairing

### 3. Axis of stress
- Humanist (diagonal): stress axis tilts, follows calligraphic logic (Garamond, Gill Sans, Jenson)
- Rational/Transitional (vertical): stress axis is vertical, geometric (Times, Baskerville, Helvetica)
- Geometric: no stress axis, pure form (Futura, Avenir, Circular)
- Rule: same axis = cohesion. Different axis = tension. Both are valid — choose deliberately.

### 4. Aperture openness
- Open: letters like c, e, a have wide openings (Gill Sans, Frutiger, Trebuchet)
- Closed: letters curve almost to closure (Univers, Akzidenz Grotesk)
- Rule: open apertures perform better at small sizes and low-contrast environments (dark mode, mobile)
- Always use open-aperture fonts for body text in digital contexts

### 5. Terminals
- Ball terminals: circular endings (Baskerville, Caslon)
- Sheared terminals: angled cut (Optima, some humanist sans)
- Slab: rectangular endings (Rockwell, Courier)
- No terminal / open: stroke simply ends (most geometric sans)
- Rule: shared terminal style = cohesion. Contrasting = intentional tension.

---

## Bringhurst's Rules, Web-Translated

### On measure (line length)
- Optimal for reading: 45–75 characters per line
- Never allow body text to run full-width on large screens
- CSS: `max-width: 68ch` on any reading context
- Mobile exception: 35–50 characters acceptable when viewport forces it

### On leading (line height)
- Body text: 1.4–1.6 × font-size (tighter at larger sizes, looser at smaller)
- Display/headings: 1.1–1.25 × font-size (optical compensation for large text)
- Dense UI (tables, menus, compact lists): 1.2–1.35 × font-size
- Never below 1.0 for any reading context

### On letterspacing
- Body text: 0 to +0.01em. Never negative at reading sizes.
- Large headings (≥2xl): -0.02em to -0.04em. Optical correction for large tracking.
- ALL CAPS: always +0.08em to +0.12em minimum. All-caps without tracking is illegible.
- Never use letter-spacing for alignment or justification purposes.

### On hierarchy
- "The typographer's first duty is to the text itself." — everything serves comprehension
- At least 3 clear levels of hierarchy visible at a glance (heading / subhead / body)
- Hierarchy is established by: size, weight, spacing, case, color — in that order of power
- Never rely on color alone to establish hierarchy (accessibility, dark mode)

### On serifs vs. sans for web
- Bringhurst's preference for serifed body text is print-specific
- At web rendering sizes (14–18px on 96–144dpi screens), humanist sans performs equally or better
- High-resolution displays (2× retina) restore the legibility advantage of serifed body text
- Contemporary recommendation: test both at actual rendering size and resolution before deciding

---

## Typewolf Pairing Recommendations (Screen-Optimized)

### Tier 1: Proven screen performers
These fonts render exceptionally well on screens across weight ranges:
- **Geist / Geist Mono** (Vercel) — clean, precise, mono variant shares metrics
- **Inter** — ubiquitous but genuinely excellent for UI; avoid for display/headlines
- **DM Sans** — more character than Inter, still very legible
- **IBM Plex family** — coherent family with Sans/Serif/Mono; excellent for technical products
- **Instrument Serif** — editorial, warm, unexpected in B2B; high rendering quality

### Tier 2: Strong display/headline choices (not body)
- **Syne** — geometric personality, strong at large sizes
- **Clash Display** — editorial, expressive, not for body
- **Cabinet Grotesk** — slightly condensed, modern grotesque
- **Oxanium** — geometric/technical, good for tech/cyber/data products
- **Fraunces** — optical size-aware variable serif, genuinely beautiful at display

### Tier 3: Use carefully (rendering caveats)
- **Playfair Display** — beautiful but renders poorly at small sizes; display only
- **Raleway** — thin weights become invisible on standard displays below 24px
- **Josefin Sans** — all-caps works well; mixed case can feel dated

### Variable Font Priority
When two typefaces have similar character, always prefer the variable font version:
- Eliminates layout shift (FOIT/FOUT) more reliably with `font-display: swap`
- Allows fine-grained weight interpolation for responsive designs
- Reduces HTTP requests when serving multiple weights

### Loading Best Practice
```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@300..700&display=swap');
/* Always: display=swap to prevent invisible text during load */
/* Always: specific weight ranges, not 'all' */
/* Prefer: self-hosted for performance-critical applications */
```
