# heretics.io

Personal marketing site + Governed Revenue Architecture (GRA) framework.
Owner: Nicky Sorenson — cybersecurity GTM leader, 18+ years.
This is the durable asset that outlives any job.

## Tech Stack

- Static HTML/CSS/JS site
- Deployed on Netlify (`heretics-site` repo)
- No framework — vanilla HTML with CSS custom properties
- Google Fonts: Oxanium (display), Space Mono (code/mono)

## Design System: Dark Technical

All visual decisions flow from `docs/skills/aesthetics/dark-technical.md`. Core tokens:

```
Background:  #0A0C10 (base), #0F1117 (surface), #161B27 (elevated)
Text:        #E8EAF0 (primary), #8892A4 (secondary), #4B5568 (tertiary)
Accent:      #F97316 (orange — interactive affordances ONLY)
Fonts:       Oxanium (display), Space Grotesk (body), Space Mono (code/data)
```

Rules:
- Accent orange is for links, primary buttons, active states. Never decoration.
- Monospace for ALL data values — metrics, IDs, timestamps.
- Uppercase tracking for section labels (0.1em, text-xs).
- Grain overlay on backgrounds at 3–5% opacity.
- 1px subtle borders on cards. No shadows on dark backgrounds.

## Architecture

```
/
├── index.html              # Main site — GRA framework, positioning, calculator
├── css/
│   └── styles.css          # Tokens as CSS custom properties
├── js/
│   └── calculator.js       # Revenue Physics Calculator
├── assets/
│   └── images/
├── docs/
│   └── skills/             # Methodology library (read on demand)
│       ├── dave-kellogg.md
│       ├── atomic-design-system.md
│       ├── narrative-ux.md
│       ├── color-type-theory.md
│       └── aesthetics/
│           ├── dark-technical.md
│           └── clean-different.md
├── CLAUDE.md               # You are here
└── netlify.toml
```

## Commands

```bash
# Local dev
open index.html             # No build step — static site

# Deploy
git add -A && git commit -m "description" && git push origin main
# Netlify auto-deploys from main branch

# Check deploy status
netlify status
```

## Skills Library

The `docs/skills/` directory contains methodology docs. Read them when the task calls for it:

| Skill | When to read | File |
|---|---|---|
| Dave Kellogg GTM | Pipeline, positioning, metrics, board comms, GTM strategy | `docs/skills/dave-kellogg.md` |
| Atomic Design System | Building/modifying UI components, new pages, design tokens | `docs/skills/atomic-design-system.md` |
| Narrative UX | Turning positioning into page structure, persuasion flow | `docs/skills/narrative-ux.md` |
| Color/Type Theory | Palette decisions, type pairing, design system foundations | `docs/skills/color-type-theory.md` |

Do NOT read all skills upfront. Read the one(s) relevant to the current task.

## Key Conventions

- This site is a calling card, not a startup product. Quality > speed.
- GRA (Governed Revenue Architecture) is the core IP. Treat it like a product.
- Revenue Physics Calculator must remain functional after any change.
- Every page follows the narrative-ux pipeline: Big Idea → persuasion arc → UX flow → implementation.
- No generic cyber aesthetics. This should look like it was built by someone with taste.

## What NOT to Do

- Don't use AI-generic copy ("unlock", "supercharge", "revolutionary").
- Don't break the dark-technical token system with ad-hoc colors.
- Don't add build tooling or frameworks unless explicitly asked.
- Don't commit .env or API keys.
- Don't overwrite main branch without confirming (prior incident resolved).

## Context for GTM Work

When working on positioning, messaging, or strategic content:
- Read `docs/skills/dave-kellogg.md` for frameworks
- Nicky's ICP: demand leaders at B2B SaaS companies ($10M–$200M ARR) inheriting broken GTM
- Core positioning: GRA = governance layer for revenue operations
- Competitive frame: not a tool, not an agency — a methodology
