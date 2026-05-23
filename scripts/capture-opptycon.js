#!/usr/bin/env node
/**
 * OpptyCon screenshot capture — Playwright headless against the live app.
 * Output → /assets/opptycon/*.png at retina (2x).
 *
 * Run: npm run capture
 * Re-run any time the app evolves; this overwrites the existing PNGs.
 *
 * To capture against a local dev server, set OC_URL env (e.g. http://localhost:5173).
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = process.env.OC_URL || 'https://app.netherops.com';
const OUT  = path.resolve(__dirname, '../assets/opptycon');

// OpptyCon routes are hash-based via the page-switcher (set via in-app nav clicks).
// We can't reach views via URL alone — we land on root, then click into each
// view by its nav label. Labels are stable per src/App.jsx NAV_SECTIONS.
// Nav sections are collapsed by default; we expand parent before clicking child.
const SHOTS = [
  { id: 'dashboard',       section: 'Command Center',  navLabel: 'Command Center',   crop: { width: 1440, height: 900 } },
  { id: 'cro',             section: 'PERSONA VIEWS',   navLabel: 'CRO',              crop: { width: 1440, height: 900 } },
  { id: 'cfo',             section: 'PERSONA VIEWS',   navLabel: 'CFO',              crop: { width: 1440, height: 900 } },
  { id: 'marketing-plan',  section: 'PIPELINE',        navLabel: 'Marketing Plan',   crop: { width: 1440, height: 900 } },
  { id: 'ae-hiring-plan',  section: 'GTM ECONOMICS',   navLabel: 'AE Hiring Plan',   crop: { width: 1440, height: 900 } },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  console.log(`[capture] target: ${BASE}`);
  console.log(`[capture] output: ${OUT}`);

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  // Pre-seed localStorage BEFORE first navigation: alpha gate + light theme.
  // The alpha gate (src/AlphaGate.jsx) reads opptycon_alpha_access on mount;
  // setting this here lets us bypass the form for capture purposes.
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('opptycon_alpha_access', JSON.stringify({
        granted: true,
        email: 'capture@netherops.com',
        grantedAt: new Date().toISOString(),
      }));
      localStorage.setItem('opptycon-theme', 'light');
    } catch (e) {}
  });
  const page = await ctx.newPage();

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  // The app boots into an onboarding wizard. Skip it.
  const skipBtn = page.getByRole('button', { name: /Skip.*default/i });
  if (await skipBtn.count()) {
    console.log('[capture] dismissing onboarding wizard');
    await skipBtn.first().click();
    await page.waitForTimeout(900);
  } else {
    console.log('[capture] no onboarding skip found (already onboarded?)');
  }

  for (const shot of SHOTS) {
    try {
      console.log(`[capture] → ${shot.id} (${shot.section} / ${shot.navLabel})`);

      // Expand the parent section first (sections are collapsed by default).
      // Section labels show as e.g. "PERSONA VIEWS  ▾" — we match the prefix.
      if (shot.section && shot.section !== shot.navLabel) {
        const sectionBtn = page.locator('button').filter({ hasText: new RegExp(`^\\s*${shot.section}`, 'i') });
        if (await sectionBtn.count()) {
          await sectionBtn.first().click({ timeout: 3000 });
          await page.waitForTimeout(250);
        }
      }

      // Click the actual nav item by exact label.
      const link = page.getByRole('button', { name: shot.navLabel, exact: true });
      const count = await link.count();
      if (count > 0) {
        await link.first().click({ timeout: 4000 });
        await page.waitForTimeout(900);
      } else {
        const fallback = page.locator(`button:has-text("${shot.navLabel}")`);
        if (await fallback.count()) {
          await fallback.first().click({ timeout: 4000 });
          await page.waitForTimeout(900);
        } else {
          console.warn(`[capture]   ! no nav link found for "${shot.navLabel}" — skipping`);
          continue;
        }
      }

      // Wait for content to render (motion animation is 200ms; allow extra).
      await page.waitForTimeout(600);
      if (shot.scrollY) await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);

      const out = path.join(OUT, `${shot.id}.png`);
      await page.screenshot({
        path: out,
        clip: { x: 0, y: 0, width: shot.crop.width, height: shot.crop.height },
      });
      console.log(`[capture]   ✓ ${out}`);
    } catch (err) {
      console.error(`[capture]   ✗ ${shot.id} failed: ${err.message}`);
    }
  }

  await browser.close();
  console.log('[capture] done.');
})();
