---
name: color-type-theory
description: "Apply rigorous design theory — color interaction (Albers), spatial color weight (Kandinsky), Bauhaus geometric systems, Bringhurst typographic principles, and contemporary web type (Typewolf/Bringhurst) — to produce principled, defensible design decisions for any project. Use this skill BEFORE atomic-design-system whenever a project needs its color palette or type system derived from first principles rather than aesthetic intuition alone. Activate when the user asks why certain colors or fonts work together, wants to build a new palette or type scale from scratch, needs to critique or fix a design system, is starting a brand-new project, or says things like 'help me pick colors', 'what fonts should I use', 'is this palette working', or 'build me a design language'. All principles are filtered for modern web/screen UX — antiquated print-only conventions are excluded."
---

# Color & Type Theory Skill

## Purpose

This skill provides the **intellectual foundation** for design decisions across the full stack:

```
[color-type-theory]  ←  YOU ARE HERE
  Derive color system from principles
  Derive type system from principles  
  Validate or critique existing decisions
  Output: token-ready design language + rationale
        ↓
[atomic-design-system]
  Receives tokens, builds component library
        ↓
[narrative-ux]
  Applies design system to persuasion structure
        ↓
[frontend-design]
  Executes with motion and atmosphere
```

**The promise**: Every color and type decision made through this skill can be *explained*, not just felt. Defensible to a skeptical stakeholder. Rooted in how human perception actually works.

---

## Source Hierarchy

Principles are drawn from these sources, filtered for modern screen/web UX:

| Source | What it contributes | Web translation |
|---|---|---|
| **Josef Albers** — *Interaction of Color* (1963) | Color is relational — a color only exists in relation to its neighbors | Applies to UI states, hover effects, dark/light mode transitions |
| **Wassily Kandinsky** — Bauhaus color courses (1922–33) | Color carries spatial and emotional weight | Applies to hierarchy, attention direction, CTA prominence |
| **Bauhaus/Modernist** — Müller, Jens / TASCHEN | Geometric systems, grid logic, identity through constraint | Applies to spacing systems, layout grids, logo/icon clarity |
| **Robert Bringhurst** — *Elements of Typographic Style* (1992) | Type anatomy, scale ratios, rhythm, hierarchy | Applies to type scales, line height, font pairing logic |
| **Typewolf / Jason Santa Maria** — contemporary web type | Variable fonts, screen rendering, pairing for digital | Applies to font selection, loading, responsive type |

**Antiquated conventions explicitly excluded:**
- Pica/point measurements (use rem/px/fluid type instead)
- Print-first color models (CMYK, Pantone) unless a print deliverable is requested
- Dogmatic "less is more" minimalism as moral position — use restraint when it serves communication, not as ideology
- Kandinsky's spiritual/synesthetic claims (color = sound, etc.) — keep the perceptual science, discard the metaphysics

---

## Part 1: Color Theory

### 1A. The Fundamental Principle (Albers)

> "Color is the most relative medium in art."

A color has no absolute identity. The same hex value looks completely different depending on:
- What surrounds it (simultaneous contrast)
- What's behind it (transparency/layering)
- What precedes it in the user's visual path (successive contrast)
- The ambient light of the screen (display calibration)

**Web implication**: Never design colors in isolation. Always test:
- Your primary text color on every background surface in your system
- Your accent color at full opacity and at 10%, 15%, 20% opacity
- Every UI state (default, hover, active, disabled) in sequence
- Dark mode equivalents before finalizing the light mode

### 1B. Simultaneous Contrast (Albers)

When two colors are placed adjacent, each pushes the other toward its complement. A neutral grey next to orange reads as blue-grey. The same grey next to blue reads as orange-grey.

**Practical rules:**
1. **Border colors are never truly neutral** — they take on the complement of whatever they border. Test border colors on every surface they'll touch.
2. **Disabled states need more contrast than you think** — a color that looks clearly de-emphasized on white may be invisible on a tinted surface.
3. **Accent colors on dark backgrounds need different values than on light** — don't reuse the same hex. Recalibrate for the new ground.
4. **Logo/icon colors placed on colored backgrounds will shift** — always specify a protected background zone or alternate logo treatment.

### 1C. Color Temperature and Spatial Weight (Kandinsky, filtered)

Kandinsky's color courses at the Bauhaus established perceptual principles that hold up under modern vision science:

| Color property | Spatial effect | UI application |
|---|---|---|
| Warm (red, orange, yellow) | Advances — feels closer | CTAs, alerts, active states |
| Cool (blue, blue-green) | Recedes — feels farther | Backgrounds, secondary text, passive states |
| High saturation | Expands, commands attention | Use sparingly — accent only |
| Low saturation | Contracts, yields | Use broadly — backgrounds, surfaces |
| Light value | Lightweight, open | Whitespace, breathing room |
| Dark value | Heavy, grounding | Anchors, containers, footers |

**Web implication**: Your CTA should almost always be warmer and/or higher saturation than its surrounding context. If your background is warm, your CTA needs to be warmer still, or use contrast (cool CTA on warm background).

**The one Kandinsky rule to ignore**: His claim that specific colors map to specific emotions universally (yellow = aggression, blue = spiritual depth, etc.) is culturally contingent and has not held up cross-culturally. Trust contrast, temperature, and saturation relationships — not symbolic color meaning.

### 1D. Color Systems for Digital UI

Four types of color systems, each with a different logic:

#### System 1: Neutral-Primary-Accent (most common in product UI)
```
Neutrals (5–9 steps from near-white to near-black)
  + One primary (brand color, medium saturation)
  + One accent (high saturation, used at <10% of surface area)
  + Semantic set (success/warning/danger/info)
```
Best for: B2B SaaS, dashboards, complex applications. Predictable. Scalable.

#### System 2: Tonal/Monochromatic
```
One hue, 7–9 tones from light to dark
  + Semantic set
```
Best for: Strong brand identity, minimal aesthetic. Hard to pull off — requires excellent type hierarchy to compensate.

#### System 3: Analogous
```
Two to three adjacent hues (within 30–60° on the color wheel)
  + One complement accent
```
Best for: Marketing pages, editorial, brand-forward experiences. Feels cohesive and curated.

#### System 4: Complementary
```
Two opposing hues (180° apart)
  + Neutral ground
```
Best for: Maximum contrast, highest visual tension. Hard to balance — usually one hue dominates and the other becomes the accent.

### 1E. Building a Color Palette (Step by Step)

**Step 1: Establish the ground**
The background color sets the entire perceptual context. Start here, not with the accent.
- Light mode: Cool off-white (#F8F9FB range) reads more sophisticated than pure white
- Dark mode: Near-black with a slight hue bias (cool for tech, warm for editorial) reads better than pure black (#000)
- Ask: what emotional register does the ground set? (clinical, warm, authoritative, minimal?)

**Step 2: Define the neutral scale**
7 steps minimum. Test each step:
- Is there enough contrast between adjacent steps to be useful?
- Does the scale work for both text-on-background and border/divider uses?
- Tool: use HSL, shift only L (lightness) to keep hue consistent

**Step 3: Place the primary**
- Should sit at mid-saturation (40–70% in HSL)
- Test against the neutral scale for WCAG AA compliance (4.5:1 for text, 3:1 for UI elements)
- Derive 2 lighter tints (for subtle backgrounds, selected states) and 2 darker shades (for hover, pressed)

**Step 4: Place the accent**
- High saturation (70–90%)
- Used at maximum 10% of any given screen's surface area
- Must pass 3:1 contrast on every surface it appears on
- Should be warm if the primary is cool, or distinctly different in temperature/hue

**Step 5: Define semantic colors**
- Success: Green family (avoid pure green — reads as traffic light. Muted/teal-shifted green is more sophisticated)
- Warning: Amber/yellow-orange (not pure yellow — poor contrast on white)
- Danger: Red family (mid-saturation, avoid fire-engine red)
- Info: Blue family (differentiated from primary if primary is blue)

**Step 6: Test interactions**
Run every color against every surface in the system. Check:
- All text/background pairings for WCAG AA
- All interactive states in sequence (default → hover → active → focus → disabled)
- Light and dark mode variants side by side
- All semantic colors in context (error state on a form within a modal on a dark surface)

---

## Part 2: Typography Theory

### 2A. The Fundamental Principle (Bringhurst)

> "Typography exists to honor content."

Type is not decoration. Every typographic decision — size, weight, spacing, family — either serves comprehension or works against it. Beauty and function are not in tension when the work is done correctly.

**Web translation**: On screens, this adds a rendering constraint. A typeface that is beautiful in print may be illegible at 14px on a 96dpi screen. Always evaluate type at actual rendering size, not in a design tool at 2× zoom.

### 2B. Type Anatomy and Why It Matters for Pairing

Understanding type anatomy is prerequisite to pairing. The key dimensions:

| Dimension | What it is | Pairing implication |
|---|---|---|
| **x-height** | Height of lowercase letters relative to caps | High x-height = more legible at small sizes. Pair fonts with similar x-heights for body + secondary |
| **Contrast** | Thick/thin stroke variation | High-contrast serifs (Didot) clash with high-contrast sans. Pair high-contrast with low-contrast. |
| **Aperture** | Openness of counters (c, e, a) | Open apertures = more legible at small sizes and low contrast environments |
| **Axis** | Angle of stress in curved strokes | Humanist (diagonal) vs. Rational (vertical). Match axis or contrast deliberately. |
| **Terminals** | How strokes end (ball, slab, sheared, etc.) | Shared terminal style = cohesion. Contrasting = tension (use intentionally) |

### 2C. Type Scale and Rhythm (Bringhurst, adapted for web)

Bringhurst's scale ratios, translated to fluid web type:

**Classic ratios:**
- Minor Second (1.067) — very tight, minimal differentiation. Use only for dense UI.
- Major Second (1.125) — subtle. Works for data-dense applications.
- Minor Third (1.25) — **recommended default for most UI**. Enough differentiation without drama.
- Major Third (1.333) — good for marketing pages with strong visual hierarchy.
- Perfect Fourth (1.414) — editorial, expressive. Use when typography IS the design.
- Golden Ratio (1.618) — extreme differentiation. Use only with 3–4 levels max.

**Minimum scale for a UI system (7 steps):**
```
xs:   0.64rem  (10.24px)  — labels, legal, metadata
sm:   0.8rem   (12.8px)   — captions, helper text
base: 1rem     (16px)     — body copy baseline
lg:   1.25rem  (20px)     — lead text, large UI labels
xl:   1.563rem (25px)     — section subheadings
2xl:  1.953rem (31.25px)  — page subheadings
3xl:  2.441rem (39px)     — section headings
4xl:  3.052rem (48.8px)   — hero headlines (supplement with display font)
```

**Web-specific additions Bringhurst doesn't cover:**
- Fluid type: use `clamp()` to scale between mobile and desktop without breakpoint jumps
- `clamp(1rem, 2.5vw, 1.25rem)` for body; `clamp(2rem, 5vw, 3.5rem)` for hero
- Variable fonts: prefer these for weight/width axes — eliminates layout shift from font loading

### 2D. Line Length, Line Height, Letter Spacing (Bringhurst + web)

**Line length (measure):**
- Optimal: 45–75 characters per line for body copy
- UI labels/captions: can be shorter (20–40 chars)
- Full-width body copy is always a mistake on large screens — use `max-width: 68ch` or similar
- Mobile: 35–50 chars is acceptable

**Line height:**
- Body text: 1.4–1.6× the font size (tighter for large type, looser for small)
- Headings: 1.1–1.25× (tight tracking is expected and readable at display sizes)
- UI labels/buttons: 1.0–1.2× (these are not reading contexts)

**Letter spacing:**
- Body text: 0 or very slightly positive (0.01em max). Never negative.
- Headings at large sizes: slightly negative (-0.02em to -0.04em) — optical correction
- All-caps labels: always add tracking (0.08–0.12em) — all-caps without tracking is illegible
- Never use letter-spacing to justify or fill space

### 2E. Type Pairing Logic (Typewolf + Bringhurst synthesis)

**The core rule**: Pair for contrast, not similarity. Two fonts that are too similar create visual noise. Two fonts that are too different create visual chaos. The goal is *confident contrast with underlying harmony*.

**Four reliable pairing strategies:**

#### Strategy 1: Serif + Geometric Sans
- Serif carries warmth and authority (display/headings)
- Geometric sans carries clarity and modernity (body/UI)
- Works because: high contrast in form, shared precision in construction
- Examples: Freight Display + Inter, Canela + DM Sans, Playfair + Outfit

#### Strategy 2: Humanist Sans + Mono
- Humanist sans carries warmth and readability (body)
- Mono carries technical authority (data, code, labels)
- Works because: shared humanist construction, strong tonal contrast
- Examples: Geist + Geist Mono, Söhne + Söhne Mono, IBM Plex Sans + IBM Plex Mono

#### Strategy 3: Display Geometric + Neutral Sans
- Geometric/expressive display font (headings/hero)
- Neutral, invisible sans (body — gets out of the way)
- Works because: the display font does all the work; body yields
- Examples: Syne + Inter, Clash Display + DM Sans, Oxanium + Space Grotesk

#### Strategy 4: Single Family with Weight/Width Contrast
- One type family, extreme weight contrast (Thin vs. Black)
- Mono within the same family for technical content
- Works because: maximum cohesion, differentiation through weight only
- Requires: a family with a genuinely wide weight range (≥6 weights)
- Examples: Instrument (Instrument Serif + Instrument Sans), IBM Plex family

**Typewolf's practical screen-rendering filters:**
- Avoid ultra-thin weights below 24px — stroke weight disappears on standard displays
- Avoid decorative/display fonts at body size — legibility collapses
- Test your chosen fonts in the browser at target sizes before committing
- Prefer OpenType features: ligatures off for UI, on for editorial; tabular numbers always for data

---

## Part 3: Bauhaus/Modernist Geometric Systems

### 3A. Grid as Constraint, Not Container

The Bauhaus principle: the grid is not a cage. It's a system of relationships that makes the whole cohere. Breaking the grid is only meaningful when the grid is established first.

**Web grid vocabulary:**
- **Columns**: 4 (mobile), 8 (tablet), 12 (desktop) — standard
- **Gutters**: consistent internal spacing between columns (16–24px typical)
- **Margins**: outer padding. Can be fixed (32px) or fluid (5–8vw)
- **Baseline grid**: invisible horizontal rhythm. In CSS: establish via `line-height` on body, use multiples of that for spacing.

**The modernist principle for web**: Use one spatial unit and derive everything from it. 4px or 8px base. All spacing values are multiples: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. No arbitrary values.

### 3B. Geometric Clarity in Icons and Marks

From the TASCHEN modernist survey: the most enduring marks (1940–1980 Bauhaus era) share:
- Reducibility — recognizable at 16px favicon size
- Geometric construction — based on circles, squares, triangles
- Single-weight or intentional contrast (not multiple weights competing)
- Negative space that carries meaning (the arrow in FedEx, the bear in the Toblerone mountain)

**For UI icon systems:**
- Establish a single stroke weight for the icon set (1.5px or 2px at 24px size)
- Consistent corner radius across all icons (0px sharp OR 2px rounded — never mixed)
- Optically adjusted sizes (a circle at 24px needs to be slightly larger than a square at 24px to feel the same size)

### 3C. The Modernist Type-as-Structure Principle

Bauhaus typography treated type as a visual/structural element, not just a linguistic one. The weight, scale, and placement of text IS the layout.

**Web application:**
- Use type scale differences (not just color or weight) to establish hierarchy
- A headline at 3xl should feel categorically different from body — not just bigger
- Letter-spacing, line-height, and case are typographic tools, not afterthoughts
- Section labels in all-caps small type + wide tracking is a Bauhaus-derived pattern that still works

---

## Part 4: Applying Theory to a Named Aesthetic

After principles, apply them to derive a specific aesthetic system. Process:

### Step 1: State the design brief in perceptual terms
Not "we want it to look modern" but:
- What emotional register? (authoritative, approachable, urgent, calm, precise)
- What spatial quality? (dense + information-rich, OR airy + contemplative)
- What temperature? (cool/clinical, warm/human, neutral/versatile)
- Who is reading this and in what context? (CISO on desktop, developer on mobile, exec skimming PDF)

### Step 2: Apply color principles to derive palette
Run through Part 1 steps 1–6. Output: full token set with rationale.

### Step 3: Apply type principles to derive type system
- Select pairing strategy (Part 2D)
- Confirm anatomy compatibility (Part 2B)
- Define scale, line height, spacing (Part 2C)
- Output: font stack + scale tokens with rationale

### Step 4: Apply grid principles
- Define base unit
- Define column structure
- Define spacing scale
- Output: layout tokens

### Step 5: Name the aesthetic and document the rationale
Output format:
```markdown
## Aesthetic: [name]

### Color Rationale
[Why these colors, grounded in Albers/Kandinsky principles]

### Type Rationale  
[Why this pairing, grounded in Bringhurst/anatomy principles]

### Grid Rationale
[Why this spatial system, grounded in Bauhaus principles]

### The one rule that makes this distinctive
[The deliberate choice that makes this NOT a template]
```

### Step 6: Hand off to atomic-design-system
Pass the full token set and rationale to the atomic-design-system skill for component implementation.

---

## Part 5: Named Aesthetic Profiles (Theory-Derived)

### Profile: BigFilter (`clean-different`, theory-grounded)

**Brief**: Security product for CISO-adjacent buyers. Needs to feel credible (authority), modern (not legacy cyber), and human (social engineering is a human problem, not a technical one). "Clean but different."

**Color rationale (Albers/Kandinsky)**:
- Ground: Cool off-white → signals precision and clarity, recedes appropriately
- Primary: Cool mid-blue → recedes into authority, CISO-familiar
- Accent: The "different" — warm against cool ground creates Albers-style simultaneous contrast tension. A muted signal orange or electric amber. NOT pure orange (too aggressive). NOT red (danger connotation). Candidate: `#E8A045` (amber-warm) or `#2DD4BF` (teal — cold-warm inversion, unexpected in security)
- Dark mode variant: Near-black with cool blue undertone (`#0F1117`) — ground that recedes but doesn't feel void

**Type rationale (Bringhurst/Typewolf)**:
- The "human" dimension → humanist construction in the display font
- The "different" → something unexpected for security (not Impact, not generic sans)
- Candidate pairing: **Instrument Serif** (display — warm, editorial, unexpected in B2B security) + **Geist** (body — clean, precise, screen-optimized) + **Geist Mono** (data/code)
- Anatomy check: Instrument Serif has high contrast strokes + humanist axis. Geist has open apertures + neutral axis. High contrast in form, complementary in construction. ✓

**Grid rationale (Bauhaus)**:
- 12-column desktop, 4-column mobile
- 8px base unit, all spacing multiples thereof
- Max content width: 1200px with fluid margins
- The "different": one layout zone per page that deliberately breaks the column (hero headline overshoots, or a feature section uses negative margins)

**The one rule**: Instrument Serif appears only at display sizes (≥2xl). Never body. It's the signature, not the workhorse.

---

### Profile: heretics.io / GRA (`dark-technical`, theory-grounded)

**Color rationale**: Dark near-black ground (`#0A0C10`) with cool blue undertone → signals depth and authority. Orange accent (`#F97316`) is warm against the cool ground → maximum simultaneous contrast tension (Albers). The orange advances aggressively against the dark — which is exactly right for a framework claiming to be the definitive answer.

**Type rationale**: Oxanium (display) is geometric with technical associations — Bauhaus-derived letterform geometry. Space Grotesk (body) has humanist proportions that soften the technical ground. Space Mono (data) adds machine-code authority. The pairing works because Oxanium and Space Grotesk share geometric construction but differ in warmth.

**Grid**: Dense. 8px base. Information-rich. The framework has a lot to say.

---

## Reference Files

- `references/albers-color.md` — Interaction of Color principles, web-translated
- `references/type-anatomy.md` — Bringhurst anatomy guide + web pairing decision tree
- `references/bauhaus-systems.md` — Grid, geometry, modernist principles
- `references/typewolf-pairings.md` — Contemporary font pairing recommendations + screen rendering notes
