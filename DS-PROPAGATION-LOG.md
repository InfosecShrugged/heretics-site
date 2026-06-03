# DS Propagation Log — NetherOps doctrine cluster
**Brief:** `netherops-fixes-and-ds-propagation-brief.md` · **Reference:** `spine-v5.html` · **Mode:** staging, per-unit commits, **no merge**, compare links.
**Run:** 2026-06-02 (overnight). All work on `staging`. Nothing merged.

---

## ⚠️ READ FIRST — the brief's core premise has shifted

The brief is built on: *"Most of the cluster is on the old light stack… remove every TWK Everett reference… migrate off the cream theme."* **That migration is already essentially done** (the earlier System-A font sweep reached these pages). So Part 2 is **not** a font/TWK migration — it's a **token-version + component-pattern parity pass against spine-v5**, which is a per-page rebuild that the brief itself says to *pilot then review*. Given that, I did the safe, unambiguous work tonight and am **flagging the real gap + the decisions that are yours** rather than speculatively rebuilding seven pages against a shifted premise.

---

## Step 0 — Per-page audit (before any edits)

| Page | Fonts | TWK | Token source | Theme | Chrome | Verdict |
|---|---|---|---|---|---|---|
| `doctrine/index.html` | Fraunces + Space Grotesk + JBM (System A) | 0 | `tokens.css` + 1 inline `:root` | dark+light (`#16161A`/`#F4F1EA` theme-color) | inline hnav + hf-mast | already migrated |
| `agent-specs.html` | System A | 0 | `tokens.css` + inline | dark+light | inline | migrated; Space Mono in mono fallback *(fixed)* |
| `sovereignty-map.html` | System A | 0 | `tokens.css` + inline | dark+light | inline | migrated; Space Mono fallback *(fixed)* |
| `split-funnel-map.html` | System A | 0 | `tokens.css` + inline | dark+light | inline | migrated; Space Mono fallback *(fixed)* |
| `lexicon.html` | System A | 0 | `tokens.css` + inline | dark+light | inline | migrated; Space Mono fallback *(fixed)* |
| `roadmap/index.html` | System A | 1 *(stale comment only — fixed)* | `tokens.css` + inline | dark+light | inline | migrated |
| `architecture/index.html` | (none loaded inline) | 0 | `house-chrome.css` + `tokens.css`, 0 inline `:root` | dark+light | shared house-chrome | migrated; relies on shared chrome (different from the others) |

All seven carry `data-property="netherops"` (violet wired). **No TWK Everett `@font-face` or tracked `.otf`/`.woff` files found** — no licensing violation in this cluster.

## The REAL gap vs `spine-v5.html` (this is the actual Part-2 work)

1. **Token-set version mismatch.** The cluster pages consume the shared `styles/tokens.css` (older, simpler set: `--bg:#121214`, `--surface:#1A1A1E`, no bg-ramp, no data colors). **spine-v5 uses its own newer inline token block:** `--bg:#101014` · `--bg-2:#1A1A1E` · `--bg-3:#1E1E23` · `--bg-4:#24242B` · `--line:rgba(255,255,255,.06)` · `--line-strong:rgba(255,255,255,.14)` · data colors `--growth/--decline/--stable/--fading`. So matching spine-v5 means adopting the expanded neutral ramp + data colors.
   - **DECISION FOR NICKY:** update the shared `styles/tokens.css` to the spine-v5 / v2.2 set (`#101014` + ramp + data colors) so the whole property inherits it — **or** add per-page inline overrides (divergence)? Updating the shared file is the right call but touches every netherops page, so it needs your sign-off. *I did not change tokens.css.*

2. **Component vocabulary is entirely different.** spine-v5's pattern classes — `panel` (14×), `pill` (31×), `formula` (3×), `gate` (2×), `sec-head` (5×), `xlink` (5×), `topbar`, `crumbs` — **appear zero times in the cluster pages.** The cluster pages use their own (older) component classes. "Match spine-v5 components" therefore = re-skinning each page's sections/cards/callouts to spine-v5's classes — a real per-page rebuild, exactly what the brief says to pilot-then-review.

## Doctrine-content flags (FLAG ONLY — your call per the brief; I did not rewrite prose)

These pages still present **unbuilt doctrine as if live**. Per the production audit (`revenue-physics/docs/audit/`), these are Research/Absent, not Shipped:

- **`agent-specs.html`** — "provenance" ×13. Provenance logging is **Absent from code** (audit: "the largest unbuilt claim"). Also "Territory" (Research). → propose pills: provenance = `Roadmap/Absent`, Territory/Pods = `Research`.
- **`sovereignty-map.html`** — "Immune System", "Anchor Mass" (the divergent spine-v4 model the canonical 7-layer doctrine supersedes) + "provenance". → flag the model divergence; pill the unbuilt pieces.
- **`split-funnel-map.html`** — "7-lane"/"Seven Lane" motion + "Territory" ×6 + "provenance". The engine ships a **3-motion** model (CREATE/CONVERT/ACCELERATE), not 7-lane. → pill 7-lane/Territory as `Research`.

spine-v5's honesty pill vocabulary to port: `Shipped` · `Shipped · partial` · `Shipped · as a check` · `Roadmap` · `Research` · `Absent` · `Absent from code` · `Naming, not autonomy` · `Doesn't act`.

## What I changed tonight (safe, committed to `staging`, NOT merged)

- **Dropped "Space Mono"** (retired face) from the mono fallback stack on the 4 in-scope pages that carried it (agent-specs, sovereignty-map, split-funnel-map, lexicon). *Note: Space Mono still appears in out-of-scope pages (404, identity-graph, index-main, infrastructure, provenance, spine-v4) — left untouched per scope.*
- **Removed the stale `<!-- TWK Everett -->` comment** in `roadmap/index.html`.
- **Landed `spine-v5.html`** in the repo as the reference (was only in the handoff zip). *Not wired into routing/nav — see decision below.*

## Recommended pilot plan (for your greenlight)

1. **First, the token decision** (above) — it gates everything; the pilot can't match spine-v5 neutrals until we know whether `tokens.css` adopts the `#101014` set.
2. **Pilot = `lexicon`** (simplest: type + table + would-be pills). Re-skin its sections to spine-v5's `panel`/`sec-head`/`pill` patterns, confirm the Fraunces opsz/wght ramp matches spine-v5, review rendered, then propagate.
3. **`agent-specs` / `sovereignty-map` / `split-funnel-map`** get the honesty pills in the same pass — but only after you sign off on the pill copy (don't want to stamp "Research" on your doctrine without your word).

## Decisions that need you
- **Token set:** update shared `tokens.css` → spine-v5 `#101014` + bg-ramp + data colors (property-wide), or per-page? *(recommend: shared)*
- **spine-v5 wiring:** does it replace the live `spine-v4.html`? Update nav/`_redirects` to point `/spine` at it?
- **Doctrine pills:** approve the `Research`/`Absent` framing on agent-specs/sovereignty/split-funnel before I stamp them.

## Compare links (no merges)
- **Part 1 (revenue-physics):** https://github.com/InfosecShrugged/heretic-engine-revenue-physics-engine/compare/main...staging
- **Part 2 (netherops-site):** https://github.com/InfosecShrugged/heretics-site/compare/main...staging

## Part 1 — done (revenue-physics, staging, 2 commits, not merged)
- **1.1** `ArchitectureDiagram.jsx`: agent-ring `desc` "Autonomous Decision" → "Governance Checks" (label-only; behavior unchanged). *Flagged-not-changed:* inner node labels still read "Coverage/Attribution/Forecast **Agent**" and a flow desc says "agent rebalances" — relabel these too? (your call; brief said report, not silently change).
- **1.2** `engine.js`: Horizon Planner now reads `(realisticAeAttainment || 75)/100` instead of hardcoded `0.85` — single source of truth with the AE Hiring Plan. Build clean (✓ 2,415 modules); attainment extremes 0/75/100 all finite (0 falls back to 75, no div-by-zero).
