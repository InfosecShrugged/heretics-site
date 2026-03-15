# NetherOps Site — Project Instructions for Claude Code

## What This Repo Is

**netherops-site** is the marketing site for NetherOps, a governed revenue operations platform. Static HTML/CSS/JS deployed on Netlify. No build step, no bundler, no framework.

- **GitHub:** `netherops/netherops-site` *(rename from heretics-site pending)*
- **Live:** Netlify auto-deploy from `main` branch
- **Netlify site ID:** `3f583cd8-5d56-4948-9dcf-b78b03da724a`
- **Build config:** `publish = "."` (repo root)
- **Routing:** `_redirects` handles `.html`-to-directory-path routing

### Related repos (DO NOT CONFUSE)

| Repo | What it is | Design system |
|------|-----------|---------------|
| `netherops/netherops-site` | This repo — marketing site | NetherOps DS (light-only) |
| `netherops/opptycon` | Revenue physics engine app (React/Vite) | OpptyCon DS (light + dark) |
| `heretics-ops/BigFilter-GTM` | Separate project — NOT this. Do not reference. | BigFilter DS (separate) |

---

## Design System — NetherOps (Light-Only Profile)

> **CRITICAL: This site uses the NetherOps design system. NOT BigFilter. NOT Syne/DM Sans/IBM Plex Mono. NOT orange #E85D2A. If you see these in the codebase, they are WRONG and should be replaced.**

### The Three-Mode Dual Accent Rule

```
MEMORIZE THIS:

Light surfaces → Rose #D64074 for TEXT accents, links, borders
Light surfaces → Lime #C8FF6E for FILLS, badges, dots, buttons, highlights
Dark panels   → Lime #C8FF6E for EVERYTHING (text, links, fills, badges)

Lime NEVER appears as text on light backgrounds (1.5:1 contrast — fails WCAG)
```

### Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Display / Headings | **TWK Everett** | 400 | Negative letter-spacing (-0.02 to -0.03em) |
| Metric values / Data | **TWK Everett** | 300 (Light) | Thin = precision feel |
| Body text | **TWK Everett** | 400 | 14–16px, line-height 1.55 |
| Module labels | **Chivo Mono** | 500 | Uppercase, letter-spacing 0.08–0.12em |
| Data / numbers | **Chivo Mono** | 400 | Tabular figures |
| Small labels | **Chivo Mono** | 500 | 9–10px, uppercase |

Font files are self-hosted at `/fonts/`:
- `TWKEverett-Light.otf` (weight 300)
- `TWKEverett-Regular.otf` (weight 400)
- `TWKEverett-Bold.otf` (weight 700)

Chivo Mono loads via Google Fonts CDN.

**DO NOT USE:** Syne, DM Sans, IBM Plex Mono, Oxanium, Space Mono, Inter, Roboto

### Color Tokens (CSS Custom Properties)

```css
:root {
  /* Surfaces */
  --bg:          #EBEBEB;    /* Page background */
  --bg-surface:  #F4F4F2;    /* Secondary surfaces */
  --bg-white:    #FFFFFF;    /* Card surfaces */
  --bg-inverse:  #0F0F0F;    /* Dark panels (hero, footer) */
  --bg-code:     #1C1C1C;    /* Code blocks */
  --bg-raised:   #E2E2DF;    /* Raised surfaces */

  /* Ink */
  --ink:         #111111;    /* Primary text */
  --ink-mid:     #555555;    /* Secondary text */
  --ink-muted:   #909090;    /* Tertiary text */
  --ink-inv:     #F5F5F3;    /* Text on dark surfaces */
  --ink-inv-mid: #AAAAAA;    /* Secondary text on dark */
  --ink-code:    #C8FF6E;    /* Code text on dark */

  /* Borders */
  --border-subtle: rgba(0,0,0,0.07);
  --border-mid:    rgba(0,0,0,0.13);
  --border-strong: rgba(0,0,0,0.28);

  /* Accent — Rose (text, links, borders on light) */
  --accent-rose:       #D64074;
  --accent-rose-hover: #C23668;
  --accent-rose-dim:   rgba(214,64,116,0.10);

  /* Accent — Lime (fills, badges, dots, buttons on light; EVERYTHING on dark) */
  --accent-lime:      #C8FF6E;
  --accent-lime-dark: #9BE040;
  --accent-lime-dim:  rgba(200,255,110,0.12);
  --accent-lime-hi:   rgba(200,255,110,0.30);

  /* Semantic */
  --green:  #1A8A4A;   /* Passing, growth */
  --amber:  #C07800;   /* Warning, threshold */
  --red:    #CC3340;    /* Breach, decline */
  --blue:   #2563EB;    /* Informational */
  --violet: #7C4DDB;    /* Drivers, special categories */
}
```

**DO NOT USE:** `#ff6e3e`, `#E85D2A`, `#f0f0f0`, `#f8f8f8` — these are wrong tokens from outdated instructions.

### Logo

- Light surfaces: Black mark (`netherops-logo-black.svg`)
- Dark inverse panels: Lime mark (`netherops-logo.svg` or `netherops-logo-inv.svg`)

### Spacing Scale

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |
| 4xl | 96px |

### Border Radii

| Token | Value |
|-------|-------|
| sm | 6px |
| md | 10px |
| lg | 14px |
| xl | 20px |
| full | 9999px (pill) |

---

## Site Architecture

- **Light mode only.** No dark theme. No theme toggle.
- Dark inverse panels (hero, footer, feature callouts) are a surface color flip, NOT a "mode" — lime handles all accents on those panels.
- Pure HTML/CSS/JS — no build step, no bundler, no React.
- CSS custom properties for all design tokens.
- Sections use utility classes for layout.
- Interactive elements use vanilla JS with `data-*` attributes for DOM targeting.
- `setTimeout`-based animation sequences for state management.
- Google Fonts loaded via CDN `<link>` tags (Chivo Mono only; TWK Everett is self-hosted).

### File Structure

```
/
├── index.html                          # Homepage
├── _redirects                          # Netlify routing
├── assets/
│   ├── favicon.svg
│   └── *.svg, *.png                    # Logos, images
├── fonts/
│   ├── TWKEverett-Light.otf
│   ├── TWKEverett-Regular.otf
│   └── TWKEverett-Bold.otf
├── tools/
│   └── revenue-physics-engine/         # OpptyCon built output (copied in)
├── design-system/
│   └── netherops-design-system.html    # Live design system reference
├── [persona pages]                     # Operator, GTM leader, finance, etc.
├── [visualization pages]               # Thermostat, architecture diagrams
└── CLAUDE.md                           # This file
```

### Netlify Deploy

Push to `main` → Netlify auto-deploys. No build command. Publish directory is repo root.

**Common issue:** If Netlify logs show "All files already uploaded by a previous deploy," your local changes haven't been committed/pushed yet — it's not a Netlify problem.

---

## Architecture Concepts (for content/copy work)

### The Revenue Thermostat

The core visualization is a three-band control system (NOT a flowchart):

1. **Economic Constraints (top):** Business Plan → P&L → Protected Margin → Coverage Ratio
2. **Translation Layer (middle):** Budgets → GTM Model → Allocations → ICP Spend → Stage Definitions
3. **Dynamic Operations (bottom):** Execution → Forecasting → Attribution → Optimization

**Vertical agent rails** span bands: P&L Agent, Stage Gate Agent, Coverage Agent, Attribution Agent, Orchestration Agent. These are enforcement mechanisms, not process steps.

**Feedback loops flow UPWARD:**
- Forecasting → Budgets (forecasting is an INPUT to budgets, not downstream)
- Attribution → Stage Definitions + ICP Governance
- CAC breach → P&L Agent constrains → correction flows up

### Key Principles

- **Governance over observation.** Visualizations show control mechanisms and feedback loops, not just data flow.
- **Constraint cascades down, feedback flows up.** This is the core visual metaphor.
- **Light backgrounds required.** Dark themes are harder to read for this content.
- **Minimal, architectural clarity.** No clutter. Precise typography. Enterprise SaaS aesthetic.

---

## Development Patterns

- **Iterative edits over wholesale replacements.** Use targeted `str_replace` or `sed` for updates, not full file rewrites.
- **Clean separation** between state management and DOM manipulation.
- **Data attributes** (`data-node`, `data-agent`, `data-band`) preferred over class-based approaches for interactive state.
- **CSS architecture:** Custom properties for tokens. No preprocessors. No Tailwind on the marketing site.
- **No external JS dependencies when possible.** Pure HTML/CSS/JS for visualizations and standalone pages.

---

## What NOT To Reference

These are from a DIFFERENT project (BigFilter) or outdated instructions. Do NOT use them:

| Wrong | Correct |
|-------|---------|
| BigFilter design system | NetherOps design system |
| Syne (font) | TWK Everett |
| DM Sans (font) | TWK Everett |
| IBM Plex Mono (font) | Chivo Mono |
| Oxanium (font) | TWK Everett |
| Space Mono (font) | Chivo Mono |
| `#E85D2A` (orange accent) | `#D64074` (rose) + `#C8FF6E` (lime) |
| `#ff6e3e` (old orange) | `#D64074` (rose) + `#C8FF6E` (lime) |
| `#f0f0f0` (old bg) | `#EBEBEB` |
| `#f8f8f8` (old surface) | `#F4F4F2` |
| `#1a1918` (old text) | `#111111` |
| `#d9d9d9` (old border) | `rgba(0,0,0,0.13)` |
| `#2d8a56` (old green) | `#1A8A4A` |
| `#d42e4a` (old rose) | `#CC3340` (semantic red) |

### Known Bug: Escaped Template Literals
When writing JS files with template literals, ALWAYS run `node --check filename.js` 
after creating or editing. Claude Code sometimes escapes backticks as \` during file 
creation, which silently kills the entire script with no visible error.
