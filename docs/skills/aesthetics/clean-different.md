# Aesthetic Profile: Clean But Different

**Codename**: `clean-different`
**Suitable for**: B2B SaaS, cybersecurity, fintech, developer tools, pre-seed/Series A startups that need to look credible but not generic
**Reference brands**: Linear, Vercel, Raycast, Clerk, Resend — but with a distinctive signature that breaks the template

---

## Aesthetic Philosophy

The base is restraint: generous whitespace, clear hierarchy, purposeful color use. But "different" means there's one deliberate choice that makes someone stop and look — an unexpected typeface pairing, an accent that's slightly off-center from the obvious choice, a layout break, a texture where you'd expect a flat surface.

**The rule**: Every screen should have one thing that a generic template generator would never produce.

---

## Color Tokens

```css
:root {
  /* Backgrounds — cool-neutral, not pure white/black */
  --color-bg-base: #F8F9FB;          /* Slightly cool off-white */
  --color-bg-surface: #FFFFFF;
  --color-bg-elevated: #F2F4F7;
  --color-bg-inverse: #0F1117;       /* Near-black with blue undertone */

  /* Borders */
  --color-border-subtle: #E4E7ED;
  --color-border-default: #CDD2DB;
  --color-border-strong: #9BA4B4;

  /* Text */
  --color-text-primary: #0F1117;
  --color-text-secondary: #4B5568;
  --color-text-tertiary: #8892A4;
  --color-text-inverse: #F8F9FB;
  --color-text-on-accent: #FFFFFF;

  /* Accent — the "different" — use sparingly and deliberately */
  /* PROJECT-SPECIFIC: override this per project */
  --color-accent: #2563EB;           /* Default: deep electric blue */
  --color-accent-hover: #1D4ED8;
  --color-accent-subtle: #EFF6FF;

  /* Semantic */
  --color-success: #059669;
  --color-success-subtle: #ECFDF5;
  --color-warning: #D97706;
  --color-warning-subtle: #FFFBEB;
  --color-danger: #DC2626;
  --color-danger-subtle: #FEF2F2;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-base: #0F1117;
    --color-bg-surface: #161B27;
    --color-bg-elevated: #1E2535;
    --color-border-subtle: #1E2535;
    --color-border-default: #2D3748;
    --color-border-strong: #4B5568;
    --color-text-primary: #F8F9FB;
    --color-text-secondary: #9BA4B4;
    --color-text-tertiary: #6B7280;
  }
}
```

---

## Typography Tokens

The "different" lives here. Use a distinctive display/heading font paired with a refined body font. Never Inter/Roboto/System-UI as display.

**Recommended pairings** (choose one per project):

| Display | Body | Mono | Character |
|---|---|---|---|
| Instrument Serif | Geist | Geist Mono | Editorial authority |
| Syne | DM Sans | IBM Plex Mono | Geometric personality |
| Cabinet Grotesk | Inter | Fira Code | Structured warmth |
| Neue Montreal | Outfit | JetBrains Mono | Modern Swiss |
| Oxanium | Space Grotesk | Space Mono | Technical/cyber |

```css
:root {
  /* Scale — Minor Third ratio (1.25) */
  --text-xs: 0.64rem;      /* 10.24px */
  --text-sm: 0.8rem;       /* 12.8px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.25rem;      /* 20px */
  --text-xl: 1.563rem;     /* 25px */
  --text-2xl: 1.953rem;    /* 31.25px */
  --text-3xl: 2.441rem;    /* 39px */
  --text-4xl: 3.052rem;    /* 48.8px */

  /* Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line heights */
  --leading-tight: 1.2;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Letter spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-caps: 0.1em;   /* For all-caps labels */
}
```

---

## Spacing Tokens

4px base unit, 8-point grid:

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
}
```

---

## Border Radius

Slightly rounded — not pill-heavy (that's generic SaaS), not sharp (that's too enterprise):

```css
:root {
  --radius-sm: 4px;
  --radius-md: 6px;     /* Buttons, inputs — primary radius */
  --radius-lg: 10px;    /* Cards, modals */
  --radius-xl: 16px;    /* Large surfaces */
  --radius-full: 9999px; /* Badges, avatars only */
}
```

---

## Shadow / Elevation

Subtle, cool-tinted shadows — not the warm/brown shadows of Figma defaults:

```css
:root {
  --shadow-xs: 0 1px 2px rgba(15, 17, 23, 0.06);
  --shadow-sm: 0 1px 3px rgba(15, 17, 23, 0.08), 0 1px 2px rgba(15, 17, 23, 0.06);
  --shadow-md: 0 4px 6px rgba(15, 17, 23, 0.07), 0 2px 4px rgba(15, 17, 23, 0.06);
  --shadow-lg: 0 10px 15px rgba(15, 17, 23, 0.08), 0 4px 6px rgba(15, 17, 23, 0.05);
  --shadow-xl: 0 20px 25px rgba(15, 17, 23, 0.1), 0 8px 10px rgba(15, 17, 23, 0.04);
}
```

---

## Motion Tokens

```css
:root {
  --duration-instant: 50ms;
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-slow: 350ms;
  --duration-enter: 400ms;

  --ease-default: cubic-bezier(0.16, 1, 0.3, 1);   /* Snappy ease-out */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring — use sparingly */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

---

## The "Different" Rules

These are the rules that prevent this from looking like a Tailwind starter template:

1. **One editorial moment per page** — a full-bleed section, an oversized headline, or a layout break that commands attention
2. **Accent color used at maximum 10% surface area** — never backgrounds, only interactive elements and key callouts
3. **Monospace font appears in at least one non-code context** — metric numbers, timestamps, or category labels
4. **Border radius consistency** — pick ONE radius and use it everywhere. Never mix pill buttons with sharp cards.
5. **No drop shadows on interactive elements in default state** — shadows are for elevation (modals, dropdowns), not buttons
6. **Micro-borders over dividers** — use `border` on components instead of `<hr>` dividers whenever possible
7. **Empty states are designed** — never a blank div. Every empty state has an illustration, icon, or message.

---

## BigFilter Override

For the BigFilter project specifically:
- Accent color: TBD pending Pinterest board review (likely a muted signal-orange or electric-but-not-neon blue)
- Font pairing: TBD — leaning toward something that reads "human intelligence, not robot" given social engineering detection angle
- One signature element: consider a subtle "signal noise" or "filter" visual motif in backgrounds or dividers
