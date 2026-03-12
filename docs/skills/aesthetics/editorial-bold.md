# Aesthetic Profile: Editorial Bold

**Codename**: `editorial-bold`
**Suitable for**: Category-creating startups, thought leadership brands, content-forward products, companies that want to stand out at conferences
**Reference brands**: Stripe (early), Notion (dark), Pitch, Loom

---

## Philosophy
Typography as the primary design element. Oversized headlines, unexpected weight contrasts, high-contrast black/white base with one explosive accent. Feels like a magazine that happens to be software.

---

## Color Tokens

```css
:root {
  --color-bg-base: #FFFFFF;
  --color-bg-surface: #F7F7F7;
  --color-bg-inverse: #0D0D0D;

  --color-text-primary: #0D0D0D;
  --color-text-secondary: #525252;
  --color-text-inverse: #FFFFFF;

  /* One explosive accent — varies per project */
  --color-accent: #FF3D00;           /* Hot orange-red */
  --color-accent-subtle: #FFF0ED;
}
```

---

## Typography

**Pairing**: Clash Display or Switzer (display) + Editorial New or Freight Text (editorial serif body)

```css
:root {
  --font-display: 'Clash Display', sans-serif;
  --font-body: 'Switzer', sans-serif;
  --font-accent: 'Editorial New', serif;   /* For pull quotes, hero subtext */
}
```

---

## Signature Elements

1. **Oversized display type** — hero headlines at 80–120px, tracking tight (`-0.04em`)
2. **Mixed weight drama** — light and black weights in the same headline
3. **Grid-breaking layouts** — elements that bleed past the column or overlap sections
4. **Rule lines as design elements** — thick 2–4px borders used decoratively
5. **Serif accent** — one element per page uses the editorial serif to break the geometric monotony

---

---

# Aesthetic Profile: Enterprise Neutral

**Codename**: `enterprise-neutral`
**Suitable for**: Mature SaaS, compliance-heavy sectors, products sold to risk-averse buyers (legal, finance, healthcare)
**Reference brands**: Salesforce, ServiceNow, Workday, early HubSpot

---

## Philosophy
Credibility over creativity. Consistent, predictable, and dense. Buyers need to feel safe. Every design choice says "we've been around and we'll be around."

---

## Color Tokens

```css
:root {
  --color-bg-base: #FFFFFF;
  --color-bg-surface: #F9FAFB;
  --color-bg-elevated: #F3F4F6;

  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;

  --color-accent: #2563EB;           /* Reliable blue */
  --color-accent-hover: #1D4ED8;
}
```

---

## Typography

**Pairing**: Inter (body, labels) + Inter Display (headings) — legible, familiar, trusted

---

## Signature Elements (or lack thereof)

1. **Predictable grid** — 12-column, no breaks
2. **Tables are a feature** — dense data tables are expected and celebrated
3. **Iconography is functional** — no decorative illustration
4. **Status badges everywhere** — users want to know state at a glance
5. **The "different" is zero** — that IS the point for this profile
