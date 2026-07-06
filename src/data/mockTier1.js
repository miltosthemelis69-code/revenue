// ---------------------------------------------------------------------------
// TIER 1 + TIER 2 MOCK DATA — visual prototype only, no backend
// ---------------------------------------------------------------------------

export const SITE = { name: "statly.app", domain: "statly.app" };

export const KPIS = [
  { label: "Revenue (30d)", value: 8420, delta: 12.4, format: "money" },
  { label: "Visitors (30d)", value: 14830, delta: 6.1, format: "int" },
  { label: "Pageviews (30d)", value: 28410, delta: 8.3, format: "int" },
  { label: "Conversion rate", value: 2.9, delta: -0.3, format: "pct" },
  { label: "Refunded", value: 210, delta: -1.2, format: "money", inverse: true },
];

export const REVENUE_TREND = [
  120, 180, 90, 240, 310, 260, 400, 380, 420, 390, 460, 510, 480, 560,
].map((v, i) => ({ i, v }));

export const CHANNELS = [
  { name: "Twitter / X", revenue: 3120, visitors: 4210, sparkline: [4, 6, 5, 8, 9, 7, 11] },
  { name: "Product Hunt", revenue: 1980, visitors: 1340, sparkline: [1, 2, 5, 9, 6, 4, 3] },
  { name: "Google (organic)", revenue: 1540, visitors: 5920, sparkline: [5, 5, 6, 6, 7, 7, 8] },
  { name: "Reddit", revenue: 860, visitors: 1120, sparkline: [2, 3, 2, 4, 6, 5, 7] },
  { name: "ChatGPT / Perplexity", revenue: 610, visitors: 380, sparkline: [1, 1, 2, 3, 5, 6, 9] },
  { name: "Direct", revenue: 310, visitors: 1860, sparkline: [3, 3, 3, 4, 3, 4, 4] },
];

export const RECENT_SALES = [
  { amount: 29, plan: "Pro", channel: "Twitter / X", country: "US", time: "2m ago" },
  { amount: 9, plan: "Starter", channel: "Google (organic)", country: "DE", time: "14m ago" },
  { amount: 99, plan: "Yearly", channel: "Product Hunt", country: "GB", time: "26m ago" },
  { amount: 29, plan: "Pro", channel: "ChatGPT / Perplexity", country: "CA", time: "41m ago" },
  { amount: -29, plan: "Refund · Pro", channel: "Reddit", country: "FR", time: "1h ago" },
  { amount: 9, plan: "Starter", channel: "Direct", country: "JP", time: "1h ago" },
];

// Feature 1 — Pageview tracking
export const PAGES = [
  { path: "/", title: "Home", views: 8420, unique: 5210, avgTime: "1m 42s", bounce: 38 },
  { path: "/pricing", title: "Pricing", views: 6120, unique: 4890, avgTime: "2m 18s", bounce: 22 },
  { path: "/blog/launch-post", title: "Launch post", views: 3840, unique: 3210, avgTime: "3m 04s", bounce: 41 },
  { path: "/docs", title: "Documentation", views: 2910, unique: 1840, avgTime: "4m 52s", bounce: 18 },
  { path: "/signup", title: "Sign up", views: 2180, unique: 1960, avgTime: "0m 48s", bounce: 12 },
  { path: "/changelog", title: "Changelog", views: 940, unique: 710, avgTime: "1m 12s", bounce: 55 },
];

export const PAGEVIEW_TREND = [
  820, 910, 780, 1020, 1140, 980, 1260, 1180, 1320, 1290, 1410, 1480, 1390, 1520,
].map((v, i) => ({ day: i + 1, views: v }));

// Feature 2 — Referrer / UTM source tracking
export const REFERRERS = [
  { source: "t.co", medium: "social", campaign: "launch-thread", visits: 2840, revenue: 1840 },
  { source: "google", medium: "organic", campaign: "(none)", visits: 5920, revenue: 1540 },
  { source: "producthunt.com", medium: "referral", campaign: "ph-launch", visits: 1340, revenue: 1980 },
  { source: "reddit.com", medium: "social", campaign: "r-saas", visits: 1120, revenue: 860 },
  { source: "chatgpt.com", medium: "referral", campaign: "(none)", visits: 240, revenue: 410 },
  { source: "perplexity.ai", medium: "referral", campaign: "(none)", visits: 140, revenue: 200 },
  { source: "(direct)", medium: "(none)", campaign: "(none)", visits: 1860, revenue: 310 },
  { source: "news.ycombinator.com", medium: "referral", campaign: "hn-show", visits: 680, revenue: 420 },
];

export const UTM_CAMPAIGNS = [
  { campaign: "launch-thread", source: "twitter", medium: "social", visits: 2840, conversions: 94, revenue: 1840 },
  { campaign: "ph-launch", source: "producthunt", medium: "referral", visits: 1340, conversions: 68, revenue: 1980 },
  { campaign: "r-saas", source: "reddit", medium: "social", visits: 1120, conversions: 31, revenue: 860 },
  { campaign: "newsletter-june", source: "email", medium: "email", visits: 420, conversions: 18, revenue: 540 },
  { campaign: "hn-show", source: "hackernews", medium: "referral", visits: 680, conversions: 14, revenue: 420 },
];

// Feature 3 — Device, browser, OS, country
export const DEVICES = [
  { label: "Desktop", pct: 58, visits: 8600 },
  { label: "Mobile", pct: 36, visits: 5340 },
  { label: "Tablet", pct: 6, visits: 890 },
];

export const BROWSERS = [
  { label: "Chrome", pct: 52, visits: 7700 },
  { label: "Safari", pct: 28, visits: 4150 },
  { label: "Firefox", pct: 11, visits: 1630 },
  { label: "Edge", pct: 6, visits: 890 },
  { label: "Other", pct: 3, visits: 460 },
];

export const OPERATING_SYSTEMS = [
  { label: "macOS", pct: 44, visits: 6520 },
  { label: "Windows", pct: 31, visits: 4600 },
  { label: "iOS", pct: 14, visits: 2080 },
  { label: "Android", pct: 8, visits: 1190 },
  { label: "Linux", pct: 3, visits: 440 },
];

export const COUNTRIES = [
  { code: "US", label: "United States", pct: 42, visits: 6230, revenue: 4120 },
  { code: "GB", label: "United Kingdom", pct: 14, visits: 2076, revenue: 1280 },
  { code: "DE", label: "Germany", pct: 11, visits: 1631, revenue: 890 },
  { code: "CA", label: "Canada", pct: 9, visits: 1335, revenue: 720 },
  { code: "FR", label: "France", pct: 6, visits: 890, revenue: 410 },
  { code: "JP", label: "Japan", pct: 5, visits: 742, revenue: 380 },
  { code: "Other", label: "Other", pct: 13, visits: 1926, revenue: 620 },
];

// Feature 4 — Custom events / goals
export const CUSTOM_EVENTS = [
  { name: "Sign up clicked", key: "signup_click", count: 1240, unique: 980, conversionToSale: 18.4 },
  { name: "Pricing CTA clicked", key: "pricing_cta", count: 890, unique: 720, conversionToSale: 24.1 },
  { name: "Demo video played", key: "demo_play", count: 640, unique: 510, conversionToSale: 31.2 },
  { name: "Docs search used", key: "docs_search", count: 420, unique: 310, conversionToSale: 12.8 },
  { name: "Checkout started", key: "checkout_start", count: 380, unique: 340, conversionToSale: 62.5 },
];

export const GOALS = [
  { name: "Free trial started", target: "trial_start", completed: 312, rate: 2.1 },
  { name: "First payment", target: "first_payment", completed: 89, rate: 28.5 },
  { name: "Newsletter signup", target: "newsletter", completed: 540, rate: 3.6 },
];

// Feature 5 — Settings (excluded paths, timezone)
export const DEFAULT_SETTINGS = {
  timezone: "America/New_York",
  excludedPaths: ["/admin", "/internal-dashboard", "/preview/*"],
  trackHashRoutes: false,
  respectDoNotTrack: true,
};

export const TIMEZONE_OPTIONS = [
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "UTC",
];

// Feature 6 — Public shareable dashboard
export const SHARE_CONFIG = {
  slug: "statly",
  url: "https://ledger.app/s/statly",
  enabled: true,
  showRevenue: true,
  showChannels: true,
  showLiveCount: true,
  passwordProtected: false,
  viewsThisWeek: 842,
};

// ---------------------------------------------------------------------------
// TIER 2 FEATURES
// ---------------------------------------------------------------------------

// Tier 2-1: Auto-captured clicks
export const AUTO_CLICKS = [
  { selector: "button.cta-primary", text: "Get Started", clicks: 1240, unique: 890, conversionToSale: 18.4 },
  { selector: "a.pricing-link", text: "View Pricing", clicks: 890, unique: 720, conversionToSale: 24.1 },
  { selector: "button.demo-video", text: "Watch Demo", clicks: 640, unique: 510, conversionToSale: 31.2 },
  { selector: "nav.docs-link", text: "Documentation", clicks: 420, unique: 310, conversionToSale: 12.8 },
  { selector: "button.signup-form", text: "Sign Up Free", clicks: 380, unique: 340, conversionToSale: 62.5 },
  { selector: "a.logo-link", text: "Logo", clicks: 2840, unique: 1420, conversionToSale: 2.1 },
  { selector: "footer.twitter-link", text: "Twitter", clicks: 180, unique: 140, conversionToSale: 8.3 },
];

// Tier 2-2: Web Vitals tracking
export const WEB_VITALS = {
  lcp: { label: "Largest Contentful Paint", value: 2.4, unit: "s", status: "needs-improvement", threshold: 2.5 },
  inp: { label: "Interaction to Next Paint", value: 89, unit: "ms", status: "good", threshold: 200 },
  cls: { label: "Cumulative Layout Shift", value: 0.08, unit: "", status: "good", threshold: 0.1 },
  fcp: { label: "First Contentful Paint", value: 1.8, unit: "s", status: "good", threshold: 1.8 },
  ttfb: { label: "Time to First Byte", value: 420, unit: "ms", status: "good", threshold: 800 },
};

export const WEB_VITALS_BY_PAGE = [
  { path: "/", lcp: 2.1, inp: 72, cls: 0.05, status: "good" },
  { path: "/pricing", lcp: 2.8, inp: 124, cls: 0.12, status: "poor" },
  { path: "/blog/launch-post", lcp: 3.2, inp: 156, cls: 0.18, status: "poor" },
  { path: "/docs", lcp: 1.9, inp: 68, cls: 0.04, status: "good" },
  { path: "/signup", lcp: 2.4, inp: 89, cls: 0.08, status: "needs-improvement" },
];

// Tier 2-3: Cookieless visitor ID
export const VISITOR_ID_CONFIG = {
  method: "daily-rotating",
  retention: "24 hours",
  cookieRequired: false,
  consentBanner: false,
  description: "Visitor IDs reset daily — no persistent cookies, no consent banner needed",
};

// Tier 2-4: Multi-site & team members
export const SITES = [
  { id: 1, domain: "statly.app", name: "Statly", status: "active", events: 8420, revenue: 8420 },
  { id: 2, domain: "blog.statly.app", name: "Statly Blog", status: "active", events: 2840, revenue: 0 },
  { id: 3, domain: "docs.statly.app", name: "Statly Docs", status: "active", events: 1920, revenue: 0 },
];

export const TEAM_MEMBERS = [
  { id: 1, name: "Alex Chen", email: "alex@statly.app", role: "owner", joined: "2024-01-15" },
  { id: 2, name: "Sarah Kim", email: "sarah@statly.app", role: "admin", joined: "2024-02-20" },
  { id: 3, name: "Mike Johnson", email: "mike@statly.app", role: "viewer", joined: "2024-03-10" },
];

// Tier 2-5: Basic funnels
export const FUNNELS = [
  {
    name: "Signup Funnel",
    steps: [
      { name: "Visit pricing page", count: 4890, dropoff: 0 },
      { name: "Click 'Get Started'", count: 1240, dropoff: 74.6 },
      { name: "Create account", count: 890, dropoff: 28.2 },
      { name: "Complete onboarding", count: 620, dropoff: 30.3 },
      { name: "First payment", count: 89, dropoff: 85.6 },
    ],
    overallConversion: 1.8,
  },
  {
    name: "Content → Trial Funnel",
    steps: [
      { name: "Read blog post", count: 3210, dropoff: 0 },
      { name: "Click CTA to signup", count: 420, dropoff: 86.9 },
      { name: "Start trial", count: 312, dropoff: 25.7 },
      { name: "Convert to paid", count: 42, dropoff: 86.5 },
    ],
    overallConversion: 1.3,
  },
];

// Tier 2-6: Payment processor integrations
export const PAYMENT_INTEGRATIONS = [
  { provider: "Stripe", status: "connected", account: "acct_1abc123", lastSync: "2 min ago", currency: "USD" },
  { provider: "LemonSqueezy", status: "not-connected", account: null, lastSync: null, currency: null },
  { provider: "Polar", status: "not-connected", account: null, lastSync: null, currency: null },
  { provider: "Shopify", status: "not-connected", account: null, lastSync: null, currency: null },
];

// Tier 2-7: Refund-aware revenue
export const REFUNDS_BY_CHANNEL = [
  { channel: "Twitter / X", refunded: 120, grossRevenue: 3120, netRevenue: 3000, refundRate: 3.8 },
  { channel: "Product Hunt", refunded: 45, grossRevenue: 1980, netRevenue: 1935, refundRate: 2.3 },
  { channel: "Google (organic)", refunded: 28, grossRevenue: 1540, netRevenue: 1512, refundRate: 1.8 },
  { channel: "Reddit", refunded: 17, grossRevenue: 860, netRevenue: 843, refundRate: 2.0 },
];

// Tier 2-8: Google Search Console integration
export const GSC_DATA = {
  connected: true,
  lastSync: "1 hour ago",
  topKeywords: [
    { keyword: "revenue attribution tool", clicks: 842, impressions: 12400, ctr: 6.8, position: 12.4 },
    { keyword: "stripe analytics", clicks: 620, impressions: 8900, ctr: 7.0, position: 8.2 },
    { keyword: "marketing attribution", clicks: 410, impressions: 6200, ctr: 6.6, position: 15.8 },
    { keyword: "saas analytics", clicks: 280, impressions: 4100, ctr: 6.8, position: 18.2 },
    { keyword: "conversion tracking", clicks: 180, impressions: 2800, ctr: 6.4, position: 22.1 },
  ],
};

// Tier 2-9: Affiliate tracking
export const AFFILIATES = [
  { id: 1, name: "Tech Reviewer", code: "techreview", clicks: 840, signups: 42, revenue: 1260, commissionRate: 20, owed: 252 },
  { id: 2, name: "SaaS Weekly", code: "saasweekly", clicks: 620, signups: 31, revenue: 930, commissionRate: 20, owed: 186 },
  { id: 3, name: "Indie Hacker", code: "indiehack", clicks: 480, signups: 24, revenue: 720, commissionRate: 20, owed: 144 },
];

// Tier 2-10: Multi-currency normalization
export const CURRENCIES = [
  { code: "USD", symbol: "$", revenue: 6420, rate: 1.0, normalized: 6420 },
  { code: "EUR", symbol: "€", revenue: 1240, rate: 1.08, normalized: 1339 },
  { code: "GBP", symbol: "£", revenue: 520, rate: 1.27, normalized: 660 },
  { code: "JPY", symbol: "¥", revenue: 240000, rate: 0.0067, normalized: 1608 },
];

export const money = (n) =>
  (n < 0 ? "-$" : "$") + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

export function fmtKpi(kpi) {
  if (kpi.format === "money") return money(kpi.value);
  if (kpi.format === "pct") return kpi.value.toFixed(1) + "%";
  return kpi.value.toLocaleString("en-US");
}
