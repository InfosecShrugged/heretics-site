# OpptyCon — Chart Color Fix (Claude Code Instructions)

## What's Wrong

The bar charts in OpptyCon (and promo screenshots) use washed-out rgba colors that read as olive and brown on screen:

```
BAD:  rgba(200,255,110,0.3)  → olive on dark
BAD:  rgba(240,160,48,0.4)   → brown on dark  
```

Opacity reduction on colored backgrounds kills chroma. The colors are dead.

## What To Do

Replace all chart fill/stroke colors with the dual-accent system at full chroma. No opacity tricks on accent colors.

### Step 1: Find the token file

Look for color tokens. Likely locations:
- `src/tokens.js` or `src/tokens.ts`
- `src/theme.js` or `src/theme.ts`
- Inline `const C = { ... }` block in `App.jsx`
- CSS custom properties in `index.css` or `styles.css`
- Tailwind config `tailwind.config.js`

### Step 2: Add or update chart token objects

If a chart color section exists in the token file, replace it. If not, add these:

```javascript
// ─── Chart Colors — Dual Accent ───
// Light mode: rose leads (governance data is primary), blue contrasts
// Dark mode: lime leads (max visibility on black), blue contrasts

const chartColors = {
  light: {
    primary:   '#D64074',   // rose — governance data (most important series)
    secondary: '#2563EB',   // blue — comparison/benchmark data
    tertiary:  '#C07800',   // amber — 3rd series if needed
    grid:      '#E8E8E6',   // subtle grid lines
    label:     '#666666',   // axis labels
    tooltip:   '#111111',   // tooltip text
    tooltipBg: '#FFFFFF',   // tooltip background
  },
  dark: {
    primary:   '#C8FF6E',   // lime — max visibility
    secondary: '#5B8DEF',   // blue — cool contrast (lifted for dark bg)
    tertiary:  '#FFB74D',   // amber — lifted for dark bg
    grid:      '#2A2A2A',   // subtle grid lines
    label:     '#AAAAAA',   // axis labels
    tooltip:   '#F5F5F3',   // tooltip text
    tooltipBg: '#1A1A1A',   // tooltip background
  },
};
```

### Step 3: Find and replace chart color references

Search the codebase for these patterns and replace:

```bash
# Find all rgba chart colors (the broken ones)
grep -rn "rgba(200,255,110" src/
grep -rn "rgba(240,160,48" src/
grep -rn "rgba(200, 255, 110" src/
grep -rn "rgba(240, 160, 48" src/

# Find any chart color arrays
grep -rn "chart.*\[" src/ | grep -i "color\|fill\|stroke"

# Find Recharts fill/stroke props
grep -rn "fill=\"#\|stroke=\"#" src/ | grep -i "bar\|area\|line\|cell"
```

For each match:
- If it's a primary/first series → use `chartColors.light.primary` (or dark equivalent)
- If it's a secondary/second series → use `chartColors.light.secondary`
- If it's a grid line or axis → use `chartColors.light.grid` / `chartColors.light.label`

### Step 4: Update Recharts components

If using Recharts (likely), look for `<Bar>`, `<Area>`, `<Line>`, `<Cell>` components and update their `fill` and `stroke` props:

```jsx
// BEFORE (broken)
<Bar dataKey="pipeline" fill="rgba(200,255,110,0.3)" />
<Bar dataKey="target" fill="rgba(240,160,48,0.4)" />

// AFTER (vivid)
<Bar dataKey="pipeline" fill={chartColors.light.primary} />
<Bar dataKey="target" fill={chartColors.light.secondary} />
```

If the app supports dark mode, use a theme-aware accessor:
```jsx
const cc = isDark ? chartColors.dark : chartColors.light;
<Bar dataKey="pipeline" fill={cc.primary} />
<Bar dataKey="target" fill={cc.secondary} />
```

### Step 5: Update semantic metric colors

Also check for semantic colors used in charts (positive/negative indicators). These need mode-calibrated variants:

```javascript
// Semantic colors — calibrated per mode
const semanticColors = {
  light: {
    positive: '#2E7D32',  // green (lower luminance for white bg contrast)
    warning:  '#C07800',  // amber
    negative: '#D42E4A',  // red
    breach:   '#D64074',  // rose — CAC breach is ALWAYS rose in both modes
  },
  dark: {
    positive: '#4CAF50',  // green (lifted for dark bg visibility)
    warning:  '#FFB74D',  // amber (lifted)
    negative: '#D64074',  // rose — same as breach on dark
    breach:   '#D64074',  // rose — governance constraints don't change with theme
  },
};
```

### Step 6: Verify — no rgba on accent colors

After changes, confirm no accent colors use opacity:

```bash
# Should return ZERO results for accent colors with rgba
grep -rn "rgba.*200.*255.*110" src/
grep -rn "rgba.*240.*160.*48" src/
grep -rn "rgba.*214.*64.*116" src/   # D64074 in rgba
grep -rn "rgba.*200.*255.*110" src/  # C8FF6E in rgba
```

Opacity is fine for backgrounds and surfaces (e.g., `rgba(0,0,0,0.05)` for a subtle card shadow). It is NOT fine for chart data fills where the color IS the data.

### Step 7: Update promo/screenshot assets

If there are static promo images or OG images with the old olive/brown charts, these need to be regenerated after the code changes. Check:
- `public/og-image.png` or similar
- `public/promo/` directory
- Any `assets/` images showing charts

---

## Quick Checklist

- [ ] Token file updated with `chartColors.light` and `chartColors.dark` objects
- [ ] All `rgba(200,255,110,...)` replaced with `chartColors.*.primary`
- [ ] All `rgba(240,160,48,...)` replaced with `chartColors.*.secondary`  
- [ ] Recharts `<Bar>`, `<Area>`, `<Line>` fill/stroke props use token references
- [ ] Grid lines use `chartColors.*.grid` not hardcoded greys
- [ ] Axis labels use `chartColors.*.label`
- [ ] Semantic colors (positive/warning/negative) use mode-calibrated values
- [ ] CAC breach indicator is `#D64074` in BOTH modes
- [ ] No `rgba()` on any accent/chart data color
- [ ] Promo images regenerated with corrected colors

## Commit

```bash
git add -A
git commit -m "Chart colors: dual-accent system, kill rgba desaturation

- Light mode: rose #D64074 primary, blue #2563EB secondary
- Dark mode: lime #C8FF6E primary, blue #5B8DEF secondary
- Semantic colors calibrated per mode (Albers: same hex ≠ same perception)
- CAC breach stays rose in both modes (governance is constant)
- Removed all rgba opacity on chart data fills
- Promo images regenerated"

git push origin main
```
