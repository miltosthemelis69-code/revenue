# revenue-main v1 — Tier 1 visual mockup

Visual-only prototype for **Ledger** (indie revenue attribution). All data is fake — no backend.

## Tier 1 features (all included in v1)

| # | Feature | Status |
|---|---------|--------|
| 1 | Pageview tracking | ✅ Pages tab |
| 2 | Referrer / UTM source tracking | ✅ Sources tab |
| 3 | Device, browser, OS, country detection | ✅ Audience tab |
| 4 | Custom events / goals (basic) | ✅ Events tab |
| 5 | Excluded paths / timezone / basic settings | ✅ Settings tab |
| 6 | Public shareable dashboard link | ✅ Share tab |

**Overview** (pre-existing): revenue by channel, live sales feed, KPIs — Tier 2+ territory but kept as your home screen.

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
  data/mockTier1.js  # All fake data
  views/             # One view per Tier 1 feature
```
