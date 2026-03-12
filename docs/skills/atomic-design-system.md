---
name: atomic-design-system
description: Build complete, production-ready design systems using Brad Frost's Atomic Design methodology (atoms → molecules → organisms → templates → pages). Use this skill whenever the user wants to create a design system, component library, or UI framework for any project — websites, apps, pitch decks, marketing pages, or React components. Also triggers when the user wants to apply a specific visual aesthetic (e.g. "clean but different", "dark technical", "editorial bold") to a consistent set of UI components. Activate proactively when the user mentions BigFilter, heretics.io, or any other named project that has a design system or brand aesthetic associated with it. This skill must be used before generating any significant UI — it ensures every output is rooted in a coherent, deliberate design system rather than ad-hoc styling.
---

# Atomic Design System Skill

## Overview

This skill applies Brad Frost's **Atomic Design methodology** to build complete, project-specific design systems. It combines:

1. **Atomic structure** — Atoms → Molecules → Organisms → Templates → Pages
2. **Aesthetic selection** — Choose or derive a visual personality for the project
3. **Token-first design** — All decisions flow from a defined set of design tokens
4. **Output-ready code** — Produces Tailwind/CSS/React implementations, not just specs

Read `references/atomic-methodology.md` for the full Brad Frost framework summary.
Read `aesthetics/` directory for pre-defined aesthetic profiles you can apply or remix.

---

## Step 1: Aesthetic Selection

Before building any components, establish the **visual personality** of the design system. 

### Option A: Use a Pre-defined Aesthetic Profile
See `aesthetics/` for named profiles. Current profiles:
- `clean-different.md` — Refined minimalism with a distinctive twist (Linear-influenced, cybersecurity-appropriate)
- `dark-technical.md` — Deep backgrounds, monospace accents, terminal vibes
- `editorial-bold.md` — High contrast, expressive type, unexpected layouts
- `enterprise-neutral.md` — Safe, credible, scalable (Notion/Salesforce school)

### Option B: Derive Aesthetic from Visual References
If the user provides a Pinterest board, screenshots, or reference URLs:
1. Use `web_fetch` or analyze the uploaded images
2. Extract: color temperature, type personality, density preference, texture use, "the twist"
3. Map findings to token decisions (see Step 2)
4. Name the resulting aesthetic and save it to `aesthetics/[name].md`

### Option C: Project-specific Override
If a named project has an established aesthetic, load it:
- **BigFilter**: Use `clean-different.md` — credible security brand, modern, not generic cyber
- **heretics.io / Governed Revenue Architecture**: Oxanium + Space Mono, orange on dark grey, technical authority
- Add new project profiles as they're defined

### Aesthetic Interview (if no references provided)
Ask these questions to establish the aesthetic:
1. "Describe the target audience's taste level in 2 words" (e.g., "jaded CISO", "design-forward founder")
2. "Pick a color temperature: warm, cool, or neutral?"
3. "Density: airy and spacious OR dense and information-rich?"
4. "The one thing this design system should NEVER look like?"
5. "Name one brand whose visual identity you respect (doesn't have to be in the same industry)"

---

## Step 2: Design Tokens

Once aesthetic is established, define the **full token set** before writing any component code.

### Token Categories

```
FOUNDATIONS
├── Color
│   ├── Primitive palette (all raw values)
│   ├── Semantic aliases (background, surface, border, text, accent, danger, success)
│   └── Dark/light mode mappings
├── Typography
│   ├── Font families (display, body, mono)
│   ├── Size scale (xs through 4xl, with ratio)
│   ├── Weight scale
│   ├── Line height + letter spacing
│   └── Responsive fluid type rules
├── Spacing
│   └── Base unit + scale (4px base recommended)
├── Border radius
│   └── From none → full (pill)
├── Shadow / Elevation
│   └── 3–5 levels
└── Motion
    ├── Duration scale (instant, fast, base, slow)
    └── Easing curves

BRAND
├── Logo usage rules
├── Accent application rules
└── "Never do" constraints
```

### Token Output Format
Produce tokens as:
- **CSS custom properties** (`:root { --color-bg: ... }`)
- **Tailwind config extension** (if React/JSX output)
- **Named constant object** (JS/TS for React)

---

## Step 3: Atomic Hierarchy

Build components in strict atomic order. Each level depends on the one below.

### ATOMS (base elements — cannot be decomposed further)
Core atoms every system needs:
- `Button` (variants: primary, secondary, ghost, destructive; sizes: sm, md, lg)
- `Input` (text, search, password; states: default, focus, error, disabled)
- `Label`
- `Badge` / `Tag`
- `Icon` (sizing wrapper + usage rules)
- `Typography` (Heading h1–h4, Body, Caption, Code)
- `Divider`
- `Avatar`
- `Spinner / Loader`
- `Tooltip`

For each atom, specify:
- Visual appearance (tokens applied)
- All states (default, hover, active, focus, disabled, error)
- Props/variants
- Accessibility notes (ARIA, focus ring)
- Code (React component OR CSS class pattern)

### MOLECULES (atoms bonded into functional units)
Common molecules:
- `SearchBar` (Input + Icon + Button)
- `FormField` (Label + Input + HelperText/Error)
- `NavItem` (Icon + Label + optional Badge)
- `CardHeader` (Avatar + Typography + Badge)
- `AlertBanner` (Icon + Typography + optional Button)
- `MetricTile` (Label + large number + trend indicator)
- `DropdownItem` (Icon + Label + optional shortcut)
- `TableRow` (multiple cells with defined data types)

### ORGANISMS (complex, discrete sections)
Common organisms:
- `NavigationBar` (logo + nav molecule set + CTA)
- `HeroSection` (headline + subhead + CTAs + optional media)
- `FeatureGrid` (section header + card grid of molecules)
- `PricingTable` (plan cards with feature lists)
- `DataTable` (header + rows + pagination)
- `Sidebar` (nav items + section groups)
- `Footer` (logo + link columns + legal)
- `Modal` (overlay + container + header/body/footer)
- `CommandPalette` (search input + result list)

### TEMPLATES (layout scaffolds — no real content)
- `MarketingPageTemplate` — Hero + Features + Social proof + CTA
- `DashboardTemplate` — Sidebar + TopBar + Main content area
- `AuthTemplate` — Centered card on background
- `DocumentTemplate` — Narrow reading column + optional sidebar
- `LandingPageTemplate` — Full-width sections, scroll-driven

Templates define:
- Grid / column structure
- Breakpoints and responsive behavior
- Scroll behavior / sticky elements
- Section spacing rhythm

### PAGES (templates + real content)
Final stage — take a template and populate with representative real content.
- Validates that the system handles real-world text lengths, images, and data
- Surfaces edge cases (long headlines, empty states, loading states)
- This is the deliverable the user sees and ships

---

## Step 4: Output Format

### For React / Web artifacts:
- Produce a single-file component library (or multi-file if requested)
- Use Tailwind utility classes mapped to the token system
- Export each atom/molecule/organism as a named component
- Include a `DesignSystemDemo` page component showing all atoms in use

### For Pitch Decks:
- Translate tokens into slide master settings (font, colors, spacing)
- Define slide layout templates (title, content, split, data, quote, full-bleed image)
- See `pptx` skill for implementation

### For Marketing/Landing Pages:
- Produce HTML with CSS custom properties for tokens
- Build section by section using organism patterns
- Use `frontend-design` skill guidelines for motion and visual polish

### For Documentation:
- Produce a design system spec doc (.md or .docx)
- Include token tables, component specs, usage examples, do/don't pairs

---

## Step 5: Quality Checks

Before delivering, verify:

- [ ] All colors meet WCAG AA contrast (4.5:1 for text, 3:1 for UI elements)
- [ ] Every interactive element has a visible focus state
- [ ] Typography scale has clear hierarchy (no two sizes look identical)
- [ ] Spacing is consistent (all values from the scale, no magic numbers)
- [ ] Dark mode works if specified
- [ ] The aesthetic "twist" is visible — this doesn't look like a template
- [ ] Empty states, loading states, and error states are defined

---

## Working with the frontend-design skill

This skill establishes the *system*. The `frontend-design` skill handles *execution polish* (motion, atmosphere, micro-interactions). Use them together:

1. **This skill** → Define tokens, components, aesthetic rules
2. **frontend-design skill** → Apply visual polish, animations, "unforgettable" details
3. Result: A system that is both *consistent* (atomic) and *distinctive* (frontend-design)

---

## Project Registry

Track established design systems here. Update when a new project aesthetic is finalized.

| Project | Aesthetic Profile | Primary Font | Accent Color | Status |
|---|---|---|---|---|
| heretics.io / GRA | Dark technical-authority | Oxanium + Space Mono | Orange #F97316 | Active |
| BigFilter | clean-different | TBD (pending Pinterest board) | TBD | In progress |

---

## Reference Files

- `references/atomic-methodology.md` — Brad Frost's 5-stage framework summary
- `aesthetics/clean-different.md` — Clean but distinctive aesthetic profile
- `aesthetics/dark-technical.md` — Dark/technical aesthetic profile
- `aesthetics/editorial-bold.md` — Editorial/bold aesthetic profile
- `aesthetics/enterprise-neutral.md` — Safe enterprise aesthetic profile
