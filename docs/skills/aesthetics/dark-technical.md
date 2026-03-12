# Aesthetic Profile: Dark Technical

**Codename**: `dark-technical`
**Suitable for**: SOC platforms, developer tools, security ops, infrastructure, CLI products, data platforms
**Reference brands**: Vercel (dark mode), Datadog, Warp terminal, Linear dark, heretics.io/GRA

---

## Philosophy
Deep backgrounds with high information density. Monospace and technical type carries authority. Color is used as signal, not decoration — everything means something. The interface feels like it was built by engineers who have taste.

---

## Color Tokens

```css
:root {
  --color-bg-base: #0A0C10;
  --color-bg-surface: #0F1117;
  --color-bg-elevated: #161B27;
  --color-bg-overlay: #1E2535;

  --color-border-subtle: #1A1F2E;
  --color-border-default: #252D3D;
  --color-border-strong: #3D4A5C;

  --color-text-primary: #E8EAF0;
  --color-text-secondary: #8892A4;
  --color-text-tertiary: #4B5568;
  --color-text-code: #7DD3FC;

  /* Accent — signal color, project-specific */
  --color-accent: #F97316;           /* heretics.io orange */
  --color-accent-hover: #EA6A00;
  --color-accent-subtle: rgba(249, 115, 22, 0.12);

  --color-success: #34D399;
  --color-warning: #FBBF24;
  --color-danger: #F87171;
}
```

---

## Typography

**Primary pairing**: Oxanium (display) + Space Grotesk (body) + Space Mono (code/data)

```css
:root {
  --font-display: 'Oxanium', monospace;
  --font-body: 'Space Grotesk', sans-serif;
  --font-mono: 'Space Mono', monospace;

  /* Same scale as clean-different */
  --text-xs: 0.64rem;
  --text-sm: 0.8rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.563rem;
  --text-2xl: 1.953rem;
  --text-3xl: 2.441rem;
  --text-4xl: 3.052rem;
}
```

---

## Signature Elements

1. **Grain overlay on backgrounds** — `background-image: url(noise.svg)` at 3–5% opacity on bg-base
2. **Monospace for ALL data values** — metrics, IDs, timestamps, status codes
3. **Accent color for interactive affordances only** — links, primary buttons, active states
4. **Tight borders on cards** — 1px subtle borders, no shadows on dark backgrounds
5. **Uppercase tracking for section labels** — `letter-spacing: 0.1em; text-transform: uppercase; font-size: var(--text-xs)`
