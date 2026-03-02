# Heretics Site — Governed Revenue Architecture

## Project Overview

Static marketing/documentation site for "Governed Revenue Architecture" — a governed, agentic orchestration and control plane for modern GTM (Go-To-Market). Hosted on Netlify.

## Stack

- **No build step** — pure static HTML/CSS/JS served directly
- **Fonts:** Oxanium (headings/body) + Space Mono (monospace/labels) via Google Fonts
- **Design system:** Scorecard.io design DNA — light background (#f0f0f0), minimal borders, uppercase mono labels
- **Hosting:** Netlify (auto-deploy from GitHub)
- **Embedded tool:** `tools/revenue-physics-engine/` — pre-built React app with bundled assets

## Directory Structure

```
.                           # Root — Netlify publish directory
├── *.html                  # Main site pages (index, lexicon, spine-v4, etc.)
├── src/components/         # Reusable Astro components (Tabs.astro)
├── tools/                  # Embedded interactive tools
│   └── revenue-physics-engine/
├── heretics-site/          # Legacy mirror directory (do not modify)
├── netlify.toml            # Netlify config (headers, publish dir)
└── _redirects              # Netlify redirect rules
```

## CSS Conventions

All pages use inline `<style>` blocks with these CSS custom properties:

```css
--bk: #1a1918;    /* black / primary text */
--gy: #f0f0f0;    /* light gray background */
--or: #ff6e3e;    /* orange accent */
--pu: #bcbeff;    /* purple accent */
--wh: #fff;       /* white */
--g50: #f8f8f8;   /* gray-50 */
--g3: #d9d9d9;    /* gray-300 border */
--g7: #747474;    /* gray-700 muted text */
--g9: #2b2b2b;    /* gray-900 */
--ft: 'Oxanium', sans-serif;    /* primary font */
--mn: 'Space Mono', monospace;  /* monospace font */
--sm: cubic-bezier(.32,.72,0,1);  /* smooth easing */
--ez: cubic-bezier(.215,.61,.355,1);  /* standard easing */
```

## Key Patterns

- **Navigation:** Fixed top nav (`.nav`, 56px height) with hamburger menu on mobile (<860px)
- **Layout wrapper:** `.w` class for max-width 1100px centered content
- **Scroll reveal:** `.rv` class with `.vis` toggled by IntersectionObserver
- **Buttons:** `.btn-out` (outline) and `.btn-fill` (solid) with `.lg` modifier
- **Typography:** Uppercase mono labels, light-weight Oxanium body text
- **Tabs:** Fused tab/panel pattern (negative margin trick) — see `src/components/Tabs.astro`

## Deployment

```bash
# Direct deploy via Netlify CLI
npx netlify-cli deploy --prod --dir=.
```

Or push to GitHub — Netlify auto-deploys from the connected branch.

## Important Notes

- The `heretics-site/` subdirectory is a legacy mirror. Do not edit files there; edit root-level files only.
- No package.json or node_modules — there are no npm dependencies to install.
- All CSS is inline within each HTML file (no external stylesheets except Google Fonts).
- All JS is inline within each HTML file (no external scripts except the revenue-physics-engine tool).
- Pages are self-contained: each HTML file includes its own styles and scripts.
