# OpptyCon Design System — Project Instructions Addendum

> Paste this section into PROJECT-INSTRUCTIONS.md after the BigFilter design system section.
> The BigFilter system governs the **marketing site** (netherops-site).
> This system governs the **OpptyCon app** (opptycon repo).

---

## Design System — OpptyCon "Doctrine"

OpptyCon has its own design system, distinct from the BigFilter marketing site. The app uses a left-nav layout with hash routing, a dual-accent color architecture, and self-hosted fonts.

### Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Display / Headings | **TWK Everett** | 400 (Regular) | Self-hosted OTF via @font-face. NOT Google Fonts. |
| Data values / metrics | **TWK Everett** | 300 (Light) | Lighter weight for numerical data to separate from headings |
| Mono / Labels / Code | **Chivo Mono** | 400–700 | Google Fonts CDN |

**Font loading**: TWK Everett must be loaded via `@font-face` declarations pointing to local `.otf` files (e.g., `fonts/TWKEverett-Regular.otf`, `fonts/TWKEverett-Light.otf`). It is NOT available on Google Fonts.

### Three-Mode Accent System

OpptyCon uses a dual-accent architecture where **Rose** and **Lime** play different roles depending on the surface they sit on:

| Context | Rose `#D64074` | Lime `#C8FF6E` |
|---------|---------------|----------------|
| **Text accents on light surfaces** | ✓ Links, signal labels, governance indicators, metric highlights | ✗ NEVER as text on light (insufficient contrast) |
| **Fills on light surfaces** | ✗ (reserved for governance alerts) | ✓ Dots, badges, buttons, headline underlines, card top-borders |
| **Everything on dark surfaces** | ✗ (governance alerts only) | ✓ Tags, code highlights, buttons, text, links — lime does it all |
| **Logo mark on light** | ✗ | ✗ (use black `#111111`) |
| **Logo mark on dark** | ✗ | ✓ |

**Why this works (Albers):** Rose at `#D64074` has enough luminance contrast against white card surfaces to be legible as text. Lime at `#C8FF6E` does NOT — its high luminance makes it invisible as text on white. But lime's luminance is exactly right for fills, badges, and dots where it reads as a vivid accent without needing text-level contrast. On dark surfaces, lime's luminance becomes its superpower — maximum visibility against black.

### Chart Colors — Dual-Accent Logic

**The problem this solves:** The original promo bar charts used `rgba(200,255,110,0.3)` (lime at 30% opacity on dark) and `rgba(240,160,48,0.4)` (amber at 40% opacity) — which read as olive and brown on screen. Dead, desaturated colors. Opacity reduction on colored backgrounds kills chroma.

**The fix:** Use accent colors at full chroma. No opacity games.

| Mode | Primary Series (governance data) | Secondary Series (comparison data) |
|------|----------------------------------|-------------------------------------|
| **Light mode** | Rose `#D64074` | Blue `#2563EB` |
| **Dark mode** | Lime `#C8FF6E` | Blue `#5B8DEF` |

- **Light mode leads with rose** because it's the governance accent — the most important data in any OpptyCon chart is the governance constraint. Rose on white cards is vivid and warm.
- **Dark mode leads with lime** because it has maximum visibility on black. Lime on dark cards is electric.
- **Blue is always the secondary** in both modes — it provides cool contrast against either warm accent. The blue shifts slightly between modes (`#2563EB` light → `#5B8DEF` dark) for luminance calibration.

### Semantic Color Shift Between Modes (Albers Principle)

The same hex value reads differently against different grounds. A green that looks healthy on white looks dead on black. Each semantic color has calibrated variants:

```javascript
const lightTheme = {
  // Surfaces
  bg:         '#F5F5F3',
  bgAlt:      '#EDEDEB',
  card:       '#FFFFFF',
  cardAlt:    '#FAFAF8',
  border:     '#D9D9D9',
  borderLight:'#E8E8E6',

  // Text
  text:       '#111111',
  muted:      '#666666',
  dim:        '#999999',

  // Accents
  rose:       '#D64074',    // text accent, links, governance signals
  lime:       '#C8FF6E',    // fills only — NEVER as text on light
  blue:       '#2563EB',    // info, secondary chart series

  // Semantic (lower luminance for contrast on white)
  green:      '#2E7D32',    // positive metrics
  amber:      '#C07800',    // warning metrics
  red:        '#D42E4A',    // negative metrics, CAC breach
  violet:     '#7C4DDB',    // special categories

  // Chart
  chartPrimary:   '#D64074',  // rose — governance data
  chartSecondary: '#2563EB',  // blue — comparison data
  chartTertiary:  '#C07800',  // amber — if 3rd series needed
  chartGrid:      '#E8E8E6',
  chartLabel:     '#666666',
};

const darkTheme = {
  // Surfaces
  bg:         '#0A0A0A',
  bgAlt:      '#111111',
  card:       '#1A1A1A',
  cardAlt:    '#222222',
  border:     '#333333',
  borderLight:'#2A2A2A',

  // Text
  text:       '#F5F5F3',
  muted:      '#AAAAAA',
  dim:        '#666666',

  // Accents
  lime:       '#C8FF6E',    // everything on dark — text, fills, links, badges
  rose:       '#D64074',    // governance alerts only
  blue:       '#5B8DEF',    // info, secondary chart series (lifted for dark bg)

  // Semantic (higher luminance for visibility on black)
  green:      '#4CAF50',    // positive — lifted from #2E7D32
  amber:      '#FFB74D',    // warning — lifted from #C07800
  red:        '#D64074',    // negative — stays rose (governance = rose always)
  violet:     '#B39DDB',    // special — lifted from #7C4DDB

  // Chart
  chartPrimary:   '#C8FF6E',  // lime — max visibility
  chartSecondary: '#5B8DEF',  // blue — cool contrast
  chartTertiary:  '#FFB74D',  // amber — if 3rd series needed
  chartGrid:      '#2A2A2A',
  chartLabel:     '#AAAAAA',
};
```

**CAC breach stays rose in both modes.** Governance constraints don't change with the theme — a CAC violation is always `#D64074` whether on white or black. This is an intentional Albers-informed choice: the one color that is constant across both modes reinforces that constraints are non-negotiable.

### Layout & Navigation

- **Left-nav sidebar** with hash routing (`#overview`, `#pipeline`, `#coverage`, etc.)
- **Rose text accent** in the nav for active states and links
- **Lime fills** for nav badges, notification dots, active indicators
- Static HTML/CSS/JS — no framework (same as marketing site)
- Deploy via Netlify

---

## Two Design Systems — Quick Reference

| Property | Marketing Site (BigFilter) | OpptyCon App (Doctrine) |
|----------|---------------------------|-------------------------|
| Repo | `netherops-site` | `opptycon` |
| Heading font | Syne | TWK Everett (self-hosted) |
| Body font | DM Sans | TWK Everett Light |
| Mono font | IBM Plex Mono | Chivo Mono |
| Primary accent | `#E85D2A` (orange) | Rose `#D64074` + Lime `#C8FF6E` |
| Layout | Scroll-based sections | Left-nav + hash routing |
| Background | `#f0f0f0` | Light: `#F5F5F3` / Dark: `#0A0A0A` |
| Dark mode | No | Yes (dual-theme) |
| Build | Static HTML, no bundler | Static HTML, no bundler |
