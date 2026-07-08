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
  url: "https://notjustvisits.app/s/statly",
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

// Regions / cities — same shape as COUNTRIES so the "Where they are" panel
// can flip between Country / Region / City tabs without a different renderer.
export const REGIONS = [
  { label: "California", pct: 18, visits: 2670, revenue: 1780 },
  { label: "England", pct: 12, visits: 1780, revenue: 1120 },
  { label: "New York", pct: 9, visits: 1335, revenue: 860 },
  { label: "Bavaria", pct: 7, visits: 1038, revenue: 610 },
  { label: "Ontario", pct: 6, visits: 890, revenue: 480 },
  { label: "Île-de-France", pct: 4, visits: 593, revenue: 290 },
  { label: "Other", pct: 44, visits: 6524, revenue: 3280 },
];

export const CITIES = [
  { label: "San Francisco", pct: 9, visits: 1335, revenue: 940 },
  { label: "London", pct: 8, visits: 1186, revenue: 780 },
  { label: "New York", pct: 6, visits: 890, revenue: 610 },
  { label: "Berlin", pct: 5, visits: 742, revenue: 410 },
  { label: "Toronto", pct: 4, visits: 593, revenue: 320 },
  { label: "Paris", pct: 3, visits: 445, revenue: 240 },
  { label: "Other", pct: 65, visits: 9639, revenue: 5120 },
];

// Entry pages / exit links — same shape as PAGES so "What they viewed" can
// flip between Page / Entry page / Exit link tabs.
export const ENTRY_PAGES = [
  { path: "/", views: 6210, avgTime: "1m 42s" },
  { path: "/pricing", views: 1840, avgTime: "0m 58s" },
  { path: "/blog/launch-post", views: 1620, avgTime: "2m 10s" },
  { path: "/docs", views: 740, avgTime: "3m 30s" },
  { path: "/signup", views: 410, avgTime: "0m 22s" },
];

export const EXIT_LINKS = [
  { path: "/checkout", views: 2180, avgTime: "exit" },
  { path: "/pricing", views: 1740, avgTime: "exit" },
  { path: "/docs", views: 960, avgTime: "exit" },
  { path: "/blog/launch-post", views: 820, avgTime: "exit" },
  { path: "/", views: 640, avgTime: "exit" },
];

// Visitor payment-goal journeys — who completed the "Payment" goal, where
// they came from, what they spent, and how long it took them to convert.
export const PAYMENT_JOURNEYS = [
  { name: "gue** ******", customer: true, country: "IT", flag: "🇮🇹", device: "Desktop", os: "Mac OS", browser: "Safari", source: "YouTube", spent: 169, timeToComplete: "17 hours", completedAt: "Yesterday at 11:27 AM" },
  { name: "Mar** ******", customer: true, country: "GB", flag: "🇬🇧", device: "Desktop", os: "Mac OS", browser: "Chrome", source: "Direct/None", spent: 169, timeToComplete: "a month", completedAt: "Jul 6th at 6:13 PM" },
  { name: "Noa** ******", customer: true, country: "FR", flag: "🇫🇷", device: "Mobile", os: "iOS", browser: "Mobile Safari", source: "marclou.com", spent: 299, timeToComplete: "8 hours", completedAt: "Jul 6th at 4:46 PM" },
  { name: "MrN** ******", customer: true, country: "NL", flag: "🇳🇱", device: "Desktop", os: "Mac OS", browser: "Chrome", source: "trustmrr.com", spent: 299, timeToComplete: "10 hours", completedAt: "Jul 6th at 7:24 AM" },
  { name: "Jua** ******", customer: true, country: "CO", flag: "🇨🇴", device: "Desktop", os: "Mac OS", browser: "Chrome", source: "Direct/None", spent: 169, timeToComplete: "31 minutes", completedAt: "Jul 2nd at 1:16 AM" },
  { name: "Luc** ******", customer: true, country: "FR", flag: "🇫🇷", device: "Desktop", os: "Mac OS", browser: "Chrome", source: "Google", spent: 169, timeToComplete: "4 minutes", completedAt: "Jun 30th at 8:52 AM" },
  { name: "Joe** ******", customer: true, country: "GB", flag: "🇬🇧", device: "Mobile", os: "iOS", browser: "Mobile Safari", source: "marclou.com", spent: 169, timeToComplete: "2 hours", completedAt: "Jun 29th at 2:22 PM" },
];

// AI-assistant referral trend + breakdown — how much of the "who sent them"
// traffic is coming from AI answer engines vs. classic search indexing.
export const AI_TRAFFIC_TREND = [
  { day: "Jun 11", aiAnswers: 4, indexing: 2 },
  { day: "Jun 14", aiAnswers: 5, indexing: 3 },
  { day: "Jun 17", aiAnswers: 6, indexing: 3 },
  { day: "Jun 20", aiAnswers: 8, indexing: 4 },
  { day: "Jun 23", aiAnswers: 58, indexing: 5 },
  { day: "Jun 26", aiAnswers: 62, indexing: 6 },
  { day: "Jun 29", aiAnswers: 44, indexing: 7 },
  { day: "Jul 2", aiAnswers: 18, indexing: 6 },
  { day: "Jul 4", aiAnswers: 22, indexing: 8 },
  { day: "Jul 6", aiAnswers: 67, indexing: 9 },
  { day: "Jul 8", aiAnswers: 20, indexing: 7 },
];

export const AI_ASSISTANTS = [
  { label: "ChatGPT", visits: 437 },
  { label: "Gemini", visits: 43 },
  { label: "Claude", visits: 6 },
  { label: "DuckDuckGo", visits: 4 },
];

export const AI_TRAFFIC_TOTALS = { aiAnswers: 490, indexing: 254, training: 204 };

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

// ---------------------------------------------------------------------------
// TIER 3 FEATURES
// ---------------------------------------------------------------------------

// Tier 3-1: Real-time live visitor map / globe
export const LIVE_VISITORS = {
  total: 47,
  activeNow: 47,
  byCountry: [
    { code: "US", count: 18, lat: 37.0902, lng: -95.7129 },
    { code: "GB", count: 8, lat: 55.3781, lng: -3.4360 },
    { code: "DE", count: 6, lat: 51.1657, lng: 10.4515 },
    { code: "CA", count: 5, lat: 56.1304, lng: -106.3468 },
    { code: "FR", count: 4, lat: 46.2276, lng: 2.2137 },
    { code: "JP", count: 3, lat: 36.2048, lng: 138.2529 },
    { code: "AU", count: 2, lat: -25.2744, lng: 133.7751 },
    { code: "IN", count: 1, lat: 20.5937, lng: 78.9629 },
  ],
  recentActivity: [
    { time: "Just now", page: "/pricing", country: "US", referrer: "Twitter / X" },
    { time: "12s ago", page: "/docs", country: "DE", referrer: "Google (organic)" },
    { time: "24s ago", page: "/blog/launch-post", country: "GB", referrer: "Product Hunt" },
    { time: "31s ago", page: "/", country: "CA", referrer: "Direct" },
    { time: "45s ago", page: "/signup", country: "FR", referrer: "ChatGPT / Perplexity" },
  ],
};

// Tier 3-2: Visitor journey / session timeline (structured, not video)
export const VISITOR_JOURNEYS = [
  {
    visitorId: "v_abc123",
    sessionId: "s_xyz789",
    duration: "4m 32s",
    pages: [
      { path: "/", time: "0:00", duration: "1m 12s", referrer: "Twitter / X" },
      { path: "/pricing", time: "1:12", duration: "2m 18s", referrer: null },
      { path: "/signup", time: "3:30", duration: "0m 48s", referrer: null },
      { path: "/checkout", time: "4:18", duration: "0m 14s", referrer: null },
    ],
    events: [
      { name: "pricing_cta", time: "1:45" },
      { name: "signup_click", time: "3:35" },
      { name: "checkout_start", time: "4:20" },
    ],
    converted: true,
    revenue: 29,
  },
  {
    visitorId: "v_def456",
    sessionId: "s_uvw101",
    duration: "2m 15s",
    pages: [
      { path: "/blog/launch-post", time: "0:00", duration: "1m 45s", referrer: "Google (organic)" },
      { path: "/", time: "1:45", duration: "0m 30s", referrer: null },
    ],
    events: [
      { name: "cta_clicked", time: "1:50" },
    ],
    converted: false,
    revenue: 0,
  },
];

// Tier 3-3: Cross-site / cross-domain rollup analytics
export const CROSS_SITE_ROLLUP = {
  totalRevenue: 8420,
  totalVisitors: 14830,
  totalPageviews: 28410,
  sites: [
    { domain: "statly.app", name: "Main", revenue: 6420, visitors: 8920, pageviews: 18420 },
    { domain: "blog.statly.app", name: "Blog", revenue: 0, visitors: 3840, pageviews: 6120 },
    { domain: "docs.statly.app", name: "Docs", revenue: 2000, visitors: 2070, pageviews: 3870 },
  ],
  crossDomainJourneys: [
    { path: "blog → main", count: 840, conversions: 42, revenue: 1260 },
    { path: "docs → main", count: 620, conversions: 31, revenue: 930 },
    { path: "main → docs → main", count: 180, conversions: 12, revenue: 360 },
  ],
};

// Tier 3-4: Cohort analysis (group by acquisition channel, track over time)
export const COHORT_ANALYSIS = [
  {
    cohort: "Twitter / X",
    cohortSize: 4210,
    months: [
      { month: "Month 0", pct: 100, revenue: 3120 },
      { month: "Month 1", pct: 68, revenue: 2120 },
      { month: "Month 2", pct: 52, revenue: 1620 },
      { month: "Month 3", pct: 41, revenue: 1280 },
      { month: "Month 4", pct: 34, revenue: 1060 },
      { month: "Month 5", pct: 28, revenue: 870 },
    ],
  },
  {
    cohort: "Product Hunt",
    cohortSize: 1340,
    months: [
      { month: "Month 0", pct: 100, revenue: 1980 },
      { month: "Month 1", pct: 72, revenue: 1420 },
      { month: "Month 2", pct: 58, revenue: 1150 },
      { month: "Month 3", pct: 48, revenue: 950 },
      { month: "Month 4", pct: 42, revenue: 830 },
      { month: "Month 5", pct: 38, revenue: 750 },
    ],
  },
  {
    cohort: "Google (organic)",
    cohortSize: 5920,
    months: [
      { month: "Month 0", pct: 100, revenue: 1540 },
      { month: "Month 1", pct: 62, revenue: 950 },
      { month: "Month 2", pct: 45, revenue: 690 },
      { month: "Month 3", pct: 35, revenue: 540 },
      { month: "Month 4", pct: 28, revenue: 430 },
      { month: "Month 5", pct: 22, revenue: 340 },
    ],
  },
];

// Tier 3-5: Real User Monitoring with computed "Experience Score"
export const RUM_EXPERIENCE_SCORE = {
  overall: { score: 87, status: "good", change: 2.4 },
  byPage: [
    { path: "/", score: 92, status: "good", lcp: 1.8, inp: 65, cls: 0.04 },
    { path: "/pricing", score: 78, status: "needs-improvement", lcp: 2.8, inp: 124, cls: 0.12 },
    { path: "/blog/launch-post", score: 71, status: "poor", lcp: 3.2, inp: 156, cls: 0.18 },
    { path: "/docs", score: 94, status: "good", lcp: 1.6, inp: 58, cls: 0.03 },
    { path: "/signup", score: 85, status: "good", lcp: 2.1, inp: 82, cls: 0.07 },
    { path: "/checkout", score: 68, status: "poor", lcp: 3.5, inp: 189, cls: 0.21 },
  ],
  scoreBreakdown: {
    lcp: { weight: 30, avg: 2.4, contribution: 22 },
    inp: { weight: 30, avg: 95, contribution: 24 },
    cls: { weight: 25, avg: 0.09, contribution: 21 },
    fcp: { weight: 15, avg: 1.9, contribution: 12 },
    ttfb: { weight: 10, avg: 450, contribution: 8 },
  },
};

// Tier 3-6: Bot / AI-crawler traffic detection by page
export const BOT_TRAFFIC = [
  {
    page: "/",
    totalVisits: 8420,
    botVisits: 420,
    botRate: 5.0,
    bots: [
      { name: "ChatGPT-Bot", visits: 180, lastSeen: "2 hours ago" },
      { name: "Googlebot", visits: 120, lastSeen: "1 hour ago" },
      { name: "GPTBot", visits: 80, lastSeen: "3 hours ago" },
      { name: "ClaudeBot", visits: 40, lastSeen: "5 hours ago" },
    ],
  },
  {
    page: "/pricing",
    totalVisits: 6120,
    botVisits: 680,
    botRate: 11.1,
    bots: [
      { name: "ChatGPT-Bot", visits: 320, lastSeen: "1 hour ago" },
      { name: "GPTBot", visits: 240, lastSeen: "2 hours ago" },
      { name: "ClaudeBot", visits: 80, lastSeen: "4 hours ago" },
      { name: "Googlebot", visits: 40, lastSeen: "6 hours ago" },
    ],
  },
  {
    page: "/docs",
    totalVisits: 2910,
    botVisits: 520,
    botRate: 17.9,
    bots: [
      { name: "Googlebot", visits: 280, lastSeen: "30 min ago" },
      { name: "ChatGPT-Bot", visits: 140, lastSeen: "2 hours ago" },
      { name: "Bingbot", visits: 60, lastSeen: "8 hours ago" },
      { name: "GPTBot", visits: 40, lastSeen: "12 hours ago" },
    ],
  },
];

// Tier 3-7: Individual visitor profiles with identity linking
export const VISITOR_PROFILES = [
  {
    visitorId: "v_abc123",
    identity: { email: "massive.cat@example.com", name: "Massive Cat", firstSeen: "2024-07-15" },
    totalVisits: 12,
    totalSessions: 8,
    totalTime: "2h 45m",
    totalRevenue: 249,
    firstVisit: { date: "2024-07-15", referrer: "Twitter / X" },
    lastVisit: { date: "2025-01-20", page: "/dashboard" },
    journey: [
      { date: "2024-07-15", page: "/", action: "visit" },
      { date: "2024-07-15", page: "/pricing", action: "visit" },
      { date: "2024-07-15", page: "/signup", action: "signup" },
      { date: "2024-07-15", page: "/checkout", action: "purchase", amount: 29 },
      { date: "2024-09-10", page: "/blog/launch-post", action: "visit" },
      { date: "2024-09-10", page: "/pricing", action: "visit" },
      { date: "2024-09-10", page: "/checkout", action: "upgrade", amount: 99 },
      { date: "2025-01-20", page: "/dashboard", action: "login" },
    ],
    attributes: { plan: "Yearly", status: "active", country: "US" },
  },
  {
    visitorId: "v_def456",
    identity: { email: "sarah.kim@company.com", name: "Sarah Kim", firstSeen: "2024-08-22" },
    totalVisits: 6,
    totalSessions: 4,
    totalTime: "1h 12m",
    totalRevenue: 58,
    firstVisit: { date: "2024-08-22", referrer: "Google (organic)" },
    lastVisit: { date: "2025-01-18", page: "/docs" },
    journey: [
      { date: "2024-08-22", page: "/docs", action: "visit" },
      { date: "2024-08-22", page: "/pricing", action: "visit" },
      { date: "2024-08-23", page: "/signup", action: "signup" },
      { date: "2024-08-23", page: "/checkout", action: "purchase", amount: 29 },
      { date: "2024-11-05", page: "/pricing", action: "visit" },
      { date: "2024-11-05", page: "/checkout", action: "upgrade", amount: 29 },
      { date: "2025-01-18", page: "/docs", action: "visit" },
    ],
    attributes: { plan: "Pro", status: "active", country: "GB" },
  },
];

// ---------------------------------------------------------------------------
// TIER 4 FEATURES
// ---------------------------------------------------------------------------

// Tier 4-1: Purchase-likelihood prediction ("who's likely to buy")
export const PURCHASE_PREDICTION = {
  modelAccuracy: 87,
  lastTrained: "2 days ago",
  highIntentVisitors: [
    { visitorId: "v_abc123", email: "massive.cat@example.com", likelihood: 92, signals: ["visited pricing 3x", "started checkout", "high engagement"], estimatedValue: 99 },
    { visitorId: "v_def456", email: "sarah.kim@company.com", likelihood: 88, signals: ["read blog post", "clicked CTA", "returning visitor"], estimatedValue: 29 },
    { visitorId: "v_ghi789", email: null, likelihood: 85, signals: ["multiple page views", "long session duration", "from high-value channel"], estimatedValue: 29 },
    { visitorId: "v_jkl012", email: "john.doe@startup.io", likelihood: 81, signals: ["visited docs", "checked pricing", "from Product Hunt"], estimatedValue: 99 },
    { visitorId: "v_mno345", email: null, likelihood: 78, signals: ["clicked demo video", "spent 5+ minutes", "from organic search"], estimatedValue: 29 },
  ],
  topSignals: [
    { signal: "Started checkout", weight: 35, impact: "high" },
    { signal: "Visited pricing page", weight: 25, impact: "high" },
    { signal: "Multiple sessions", weight: 20, impact: "medium" },
    { signal: "From high-converting channel", weight: 15, impact: "medium" },
    { signal: "Long session duration", weight: 10, impact: "low" },
  ],
};

// Tier 4-2: Heatmaps (click / scroll / move aggregation)
export const HEATMAPS = {
  page: "/pricing",
  totalViews: 6120,
  clickHeatmap: [
    { x: 50, y: 30, intensity: 95, element: "CTA button", clicks: 2840 },
    { x: 50, y: 45, intensity: 78, element: "Feature card 1", clicks: 1890 },
    { x: 30, y: 45, intensity: 65, element: "Feature card 2", clicks: 1240 },
    { x: 70, y: 45, intensity: 58, element: "Feature card 3", clicks: 980 },
    { x: 50, y: 60, intensity: 42, element: "FAQ section", clicks: 620 },
    { x: 50, y: 80, intensity: 35, element: "Footer link", clicks: 420 },
  ],
  scrollHeatmap: {
    depth: [
      { depth: 0, pct: 100, label: "Top of page" },
      { depth: 25, pct: 82, label: "25% scrolled" },
      { depth: 50, pct: 64, label: "50% scrolled" },
      { depth: 75, pct: 38, label: "75% scrolled" },
      { depth: 100, pct: 18, label: "Bottom of page" },
    ],
    avgScrollDepth: 52,
  },
  moveHeatmap: [
    { x: 50, y: 30, intensity: 88, element: "CTA button area" },
    { x: 50, y: 45, intensity: 72, element: "Pricing cards" },
    { x: 50, y: 60, intensity: 45, element: "FAQ section" },
  ],
};

// ---------------------------------------------------------------------------
// TIER 5 FEATURES
// ---------------------------------------------------------------------------

// Tier 5-1: A/B experimentation platform
export const AB_EXPERIMENTS = [
  {
    id: "exp_001",
    name: "Pricing CTA Button Color",
    status: "running",
    started: "2024-12-15",
    variants: [
      { name: "Control (Blue)", visitors: 3120, conversions: 124, conversionRate: 3.97, revenue: 3616 },
      { name: "Variant A (Green)", visitors: 3080, conversions: 156, conversionRate: 5.06, revenue: 4524 },
      { name: "Variant B (Red)", visitors: 3150, conversions: 142, conversionRate: 4.51, revenue: 4118 },
    ],
    winner: "Variant A (Green)",
    significance: 95,
    improvement: 27.5,
  },
  {
    id: "exp_002",
    name: "Homepage Hero Copy",
    status: "completed",
    started: "2024-11-01",
    ended: "2024-12-01",
    variants: [
      { name: "Control", visitors: 4890, conversions: 186, conversionRate: 3.80, revenue: 5394 },
      { name: "Variant A", visitors: 4920, conversions: 198, conversionRate: 4.02, revenue: 5742 },
      { name: "Variant B", visitors: 4780, conversions: 192, conversionRate: 4.02, revenue: 5568 },
    ],
    winner: "Variant A",
    significance: 82,
    improvement: 5.8,
  },
  {
    id: "exp_003",
    name: "Checkout Form Layout",
    status: "draft",
    started: null,
    variants: [
      { name: "Control (Single column)", visitors: 0, conversions: 0, conversionRate: 0, revenue: 0 },
      { name: "Variant A (Two column)", visitors: 0, conversions: 0, conversionRate: 0, revenue: 0 },
    ],
    winner: null,
    significance: null,
    improvement: null,
  },
];

export const money = (n) =>
  (n < 0 ? "-$" : "$") + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

export const money2 = (n) =>
  (n < 0 ? "-$" : "$") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function fmtKpi(kpi) {
  if (kpi.format === "money") return money(kpi.value);
  if (kpi.format === "money2") return money2(kpi.value);
  if (kpi.format === "pct") return kpi.value.toFixed(1) + "%";
  return kpi.value.toLocaleString("en-US");
}
