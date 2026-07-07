# notjustvisits — v2 visual prototype

Visual-only prototype for **notjustvisits** (Stripe-native revenue attribution
for indie founders — "not just visits, actual revenue"). All data is fake —
no backend.

## What changed in v2

- Full rebrand from the earlier "Ledger" concept to **notjustvisits**.
- New design system: warm paper background, a single accent color (signal
  orange) used exclusively for real revenue figures, everything else in
  quiet ink/grey. Newsreader (serif), Space Grotesk (UI), JetBrains Mono
  (numbers).
- Overview page rebuilt to read like one continuous page — stat row,
  revenue-vs-traffic chart, tabbed referrer/campaign, country/device,
  browser/OS, AI & bot traffic, and a recent-revenue feed — instead of a
  single chart + two side panels.

## Run locally

```bash
npm install
npm run dev
```

## Cloudflare Pages

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 18+

Connect your GitHub repo in Cloudflare Pages → every push to `main` auto-deploys.

## Project structure

```
src/
  Dashboard.jsx      # Shell + sidebar nav
  styles.js          # Design tokens (theme, fonts, globalCss)
  data/mockTier1.js  # All fake data
  views/             # One view per feature, shared.jsx holds reusable UI
```
