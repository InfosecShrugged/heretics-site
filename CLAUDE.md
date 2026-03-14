# CLAUDE.md — NetherOps Project Instructions

## Project Overview

**NetherOps** builds tools and frameworks for governed revenue operations. The methodology is the **Governed Revenue Architecture (GRA)**. The primary product is **OpptyCon** — an interactive revenue simulation and governance control surface.

## Naming

- **Company**: NetherOps (cap N, cap O, one word)
- **Product**: OpptyCon (cap O, cap C, one word)
- **Methodology**: Governed Revenue Architecture (GRA)
- **Legacy names (never use)**: heretics, heretics.io, Revenue Physics Engine, Heretic Engine

## Repos

| Repo | Purpose | Stack | Deploy |
|------|---------|-------|--------|
| `netherops-site` | Marketing/content site | Static HTML/CSS/JS | Netlify |
| `opptycon` | Revenue simulation engine | React/Vite/Tailwind | Built → netherops-site/tools/opptycon/ |

## Design System: Three-Mode Dual Accent

Live reference: `/design-system/` (marketing) and `/design-system/opptycon` (app, light+dark).

### Fonts

- **Display**: TWK Everett — self-hosted `.otf` via `@font-face` (300/400/700)
- **Functional**: Chivo Mono — Google Fonts. All labels, CTAs, tags, nav, code
- CSS: `--font-display: 'TWK Everett', 'Helvetica Neue', Helvetica, Arial, sans-serif;`
- CSS: `--font-mono: 'Chivo Mono', 'Space Mono', 'Courier New', monospace;`

### The Accent Rule

```
Light surfaces → Rose #D64074 for TEXT accents, links, borders
Light surfaces → Lime #C8FF6E for FILLS, badges, dots, buttons
Dark surfaces  → Lime #C8FF6E for EVERYTHING
Dark surfaces  → Rose #D64074 for governance alerts / constraint breaches ONLY
Lime NEVER appears as text on light backgrounds (1.5:1 contrast — fails)
```

### CSS Variables (Marketing Site)

```css
:root {
  --bg:          #EBEBEB;
  --bg-surface:  #F4F4F2;
  --bg-white:    #FFFFFF;
  --bg-inverse:  #0F0F0F;
  --bg-code:     #1C1C1C;
  --bg-raised:   #E2E2DF;
  --ink:         #111111;
  --ink-mid:     #555555;
  --ink-muted:   #909090;
  --ink-inv:     #F5F5F3;
  --ink-inv-mid: #AAAAAA;
  --ink-code:    #C8FF6E;
  --border-subtle: rgba(0,0,0,0.07);
  --border-mid:    rgba(0,0,0,0.13);
  --border-strong: rgba(0,0,0,0.28);
  --accent-rose:       #D64074;
  --accent-rose-hover:  #C23668;
  --accent-rose-dim:    rgba(214,64,116,0.10);
  --accent-lime:       #C8FF6E;
  --accent-lime-dark:  #9BE040;
  --accent-lime-dim:   rgba(200,255,110,0.12);
  --accent-lime-hi:    rgba(200,255,110,0.30);
  --green:  #1A8A4A;
  --amber:  #C07800;
  --red:    #CC3340;
  --blue:   #2563EB;
  --violet: #7C4DDB;
  --font-display: 'TWK Everett', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-mono:    'Chivo Mono', 'Space Mono', 'Courier New', monospace;
}
```

### Typography Rules

| Element | Font | Weight | Style |
|---------|------|--------|-------|
| Headlines | TWK Everett | 300 (Light) | negative letter-spacing |
| Body text | TWK Everett | 400 (Regular) | — |
| Metric values | TWK Everett | 300 (Light) | thin = precision |
| Module labels | Chivo Mono | 500 | uppercase, 0.08-0.12em tracking |
| Data/numbers | Chivo Mono | 400 | tabular |
| Small labels | Chivo Mono | 500 | 9-10px, uppercase, 0.08em tracking |

### Rules

1. TWK Everett weight 300 for headlines, 400 for body
2. Chivo Mono does ALL functional text — always uppercase for labels/CTAs
3. Rose is the text accent on light. Lime is the fill accent on light. Lime does everything on dark.
4. Ground is warm gray `#EBEBEB`, never pure white
5. Borders use rgba, not hex
6. Lime NEVER as text on light backgrounds
7. Tags are pill-shaped with optional 5px status dots

## Build & Deploy

```bash
# Build OpptyCon
cd opptycon && npm install && npm run build

# Deploy to site
cd ../netherops-site
rm -rf tools/opptycon && mkdir -p tools/opptycon
cp -r ../opptycon/dist/* tools/opptycon/
git add -A && git commit -m "Update OpptyCon" && git push
```

Vite config must set `base: '/tools/opptycon/'`.

## Architecture Philosophy

- Governance over observation — show control mechanisms, not dashboards
- Constraint cascades — P&L → governance → agents → execution
- Closed-loop feedback — every output traceable to an input
- Four-band model: Constraints → Governance → Agents → Execution

## Font References to Replace

| Old | New |
|-----|-----|
| `'Oxanium'` | `'TWK Everett'` |
| `'Space Mono'` | `'Chivo Mono'` |
| `'DM Mono'` | `'Chivo Mono'` |
| `'DM Sans'` | `'TWK Everett'` |
