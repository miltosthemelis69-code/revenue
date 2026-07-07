import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Bot,
  Brain,
  ChevronDown,
  CircleDollarSign,
  ExternalLink,
  FileText,
  Filter,
  Flame,
  FlaskConical,
  Gauge,
  Globe2,
  Layers,
  LayoutDashboard,
  Link2,
  MousePointerClick,
  Plug,
  Radio,
  Route,
  Search,
  Settings,
  Share2,
  TrendingUp,
  UserCircle2,
  Users,
  Zap,
} from "lucide-react";
import { SITE } from "./data/mockTier1";
import { theme, globalCss } from "./styles";
import OverviewView from "./views/Overview";
import PagesView from "./views/Pages";
import SourcesView from "./views/Sources";
import AudienceView from "./views/Audience";
import EventsView from "./views/Events";
import SettingsView from "./views/Settings";
import ShareView from "./views/Share";
import AutoClicksView from "./views/AutoClicks";
import WebVitalsView from "./views/WebVitals";
import FunnelsView from "./views/Funnels";
import IntegrationsView from "./views/Integrations";
import SitesView from "./views/Sites";
import LiveView from "./views/Live";
import JourneysView from "./views/Journeys";
import CohortsView from "./views/Cohorts";
import ExperienceView from "./views/Experience";
import BotTrafficView from "./views/BotTraffic";
import ProfilesView from "./views/Profiles";
import PredictionsView from "./views/Predictions";
import HeatmapsView from "./views/Heatmaps";
import ExperimentsView from "./views/Experiments";

const NAV_SECTIONS = [
  {
    title: "Revenue",
    items: [
      {
        id: "overview",
        label: "Overview",
        icon: LayoutDashboard,
        description: "Revenue, conversion, refunds, and the channels driving the business.",
      },
      {
        id: "sources",
        label: "Sources",
        icon: Link2,
        description: "Referrers, UTM campaigns, and revenue by acquisition source.",
      },
      {
        id: "pages",
        label: "Pages",
        icon: FileText,
        description: "Landing pages ranked by traffic quality and revenue influence.",
      },
      {
        id: "funnels",
        label: "Funnels",
        icon: Filter,
        description: "Signup, checkout, and content funnels with drop-off points.",
      },
    ],
  },
  {
    title: "People",
    items: [
      {
        id: "profiles",
        label: "Customers",
        icon: UserCircle2,
        description: "Visitor profiles, identified customers, and lifetime value.",
      },
      {
        id: "journeys",
        label: "Journeys",
        icon: Route,
        description: "Session timelines showing the path from first visit to purchase.",
      },
      {
        id: "audience",
        label: "Audience",
        icon: Users,
        description: "Countries, devices, browsers, and operating systems.",
      },
      {
        id: "cohorts",
        label: "Cohorts",
        icon: TrendingUp,
        description: "Channel cohorts and retained revenue over time.",
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        id: "events",
        label: "Events",
        icon: MousePointerClick,
        description: "Custom events and goals that matter to activation and checkout.",
      },
      {
        id: "autoclicks",
        label: "Clicks",
        icon: Zap,
        description: "Automatically captured button, link, and CTA activity.",
      },
      {
        id: "live",
        label: "Live",
        icon: Globe2,
        description: "Realtime visitors and sales while launches are happening.",
      },
      {
        id: "webvitals",
        label: "Performance",
        icon: Gauge,
        description: "Core Web Vitals and page-level speed diagnostics.",
      },
      {
        id: "experience",
        label: "Experience",
        icon: Activity,
        description: "Experience score, weak pages, and UX health signals.",
      },
    ],
  },
  {
    title: "Lab",
    items: [
      {
        id: "predictions",
        label: "Predictions",
        icon: Brain,
        description: "Purchase intent scoring for high-value visitors.",
      },
      {
        id: "heatmaps",
        label: "Heatmaps",
        icon: Flame,
        description: "Click, scroll, and attention maps for key pages.",
      },
      {
        id: "experiments",
        label: "Experiments",
        icon: FlaskConical,
        description: "A/B tests with revenue and conversion outcomes.",
      },
      {
        id: "bots",
        label: "Bot Traffic",
        icon: Bot,
        description: "Known crawler traffic separated from human sessions.",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        id: "integrations",
        label: "Integrations",
        icon: Plug,
        description: "Payment processors, search data, and external data sources.",
      },
      {
        id: "sites",
        label: "Sites & Team",
        icon: Layers,
        description: "Connected domains, teammates, and cross-site rollups.",
      },
      {
        id: "share",
        label: "Share",
        icon: Share2,
        description: "Public dashboard settings for build-in-public updates.",
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        description: "Tracking preferences, timezone, and excluded paths.",
      },
    ],
  },
];

const VIEWS = {
  overview: OverviewView,
  pages: PagesView,
  sources: SourcesView,
  audience: AudienceView,
  events: EventsView,
  autoclicks: AutoClicksView,
  webvitals: WebVitalsView,
  funnels: FunnelsView,
  integrations: IntegrationsView,
  sites: SitesView,
  live: LiveView,
  journeys: JourneysView,
  cohorts: CohortsView,
  experience: ExperienceView,
  bots: BotTrafficView,
  profiles: ProfilesView,
  predictions: PredictionsView,
  heatmaps: HeatmapsView,
  experiments: ExperimentsView,
  settings: SettingsView,
  share: ShareView,
};

function findNavItem(view) {
  for (const section of NAV_SECTIONS) {
    const item = section.items.find((navItem) => navItem.id === view);
    if (item) return { ...item, section: section.title };
  }
  return NAV_SECTIONS[0].items[0];
}

function RailButton({ item, active, onClick }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
      title={item.label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        minHeight: 36,
        padding: "8px 10px",
        border: "none",
        borderRadius: 6,
        background: active ? "#fff" : "transparent",
        color: active ? theme.heading : "#cbd5e1",
        fontSize: 13,
        fontWeight: active ? 700 : 500,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <Icon size={16} />
      <span className="rail-label">{item.label}</span>
    </button>
  );
}

export default function Dashboard() {
  const [view, setView] = useState("overview");
  const [liveCount, setLiveCount] = useState(7);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveCount((count) => Math.max(1, count + (Math.random() > 0.5 ? 1 : -1)));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const ActiveView = VIEWS[view];
  const activeMeta = useMemo(() => findNavItem(view), [view]);

  return (
    <div
      className="shell"
      style={{
        fontFamily: "'Inter', 'Aptos', -apple-system, BlinkMacSystemFont, sans-serif",
        background: theme.bg,
        color: theme.text,
      }}
    >
      <style>{globalCss}</style>

      <aside
        className="sidebar"
        style={{
          position: "sticky",
          top: 0,
          minHeight: "100vh",
          background: theme.appRail,
          color: "#fff",
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div className="rail-logo" style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px 10px" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "#ffffff",
              color: theme.heading,
              display: "grid",
              placeItems: "center",
            }}
          >
            <CircleDollarSign size={18} />
          </div>
          <div className="rail-label">
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0 }}>Ledger</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Revenue attribution</div>
          </div>
        </div>

        <div
          className="rail-meta"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            borderRadius: 8,
            padding: 10,
          }}
        >
          <button
            type="button"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              border: "none",
              background: "transparent",
              color: "#fff",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 12, color: "#94a3b8" }}>Current site</span>
              <span className="mono" style={{ display: "block", fontSize: 12, marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {SITE.domain}
              </span>
            </span>
            <ChevronDown size={14} color="#94a3b8" />
          </button>
        </div>

        <nav className="sidebar-nav" style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", paddingRight: 2 }}>
          {NAV_SECTIONS.map((section) => (
            <div className="sidebar-section" key={section.title} style={{ marginBottom: 2 }}>
              <div
                className="rail-section-title"
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: 0,
                  margin: "0 0 5px 10px",
                }}
              >
                {section.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {section.items.map((item) => (
                  <RailButton key={item.id} item={item} active={view === item.id} onClick={() => setView(item.id)} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <section style={{ minWidth: 0 }}>
        <header
          className="topbar"
          style={{
            minHeight: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "14px 28px",
            borderBottom: `1px solid ${theme.cardBorder}`,
            background: "rgba(255,255,255,0.86)",
            backdropFilter: "blur(14px)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: theme.dim, fontSize: 12, marginBottom: 3 }}>
              <span>{activeMeta.section}</span>
              <span>/</span>
              <span>{activeMeta.label}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 22, lineHeight: 1.2, color: theme.heading, letterSpacing: 0 }}>
              {activeMeta.id === "overview" ? "Revenue overview" : activeMeta.label}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: 36,
                padding: "0 12px",
                borderRadius: 6,
                background: "#fff",
                border: `1px solid ${theme.surfaceBorder}`,
                color: theme.muted,
                fontSize: 13,
              }}
            >
              <Search size={14} />
              <span>Search</span>
            </div>
            <button type="button" className="ghost" style={{ height: 36, display: "flex", alignItems: "center", gap: 7 }}>
              Last 30 days
              <ChevronDown size={14} />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                height: 36,
                padding: "0 10px",
                borderRadius: 6,
                background: theme.greenSoft,
                color: theme.green,
                border: `1px solid #bbf7d0`,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <Radio size={13} />
              <span className="mono">{liveCount}</span>
              <span>live</span>
            </div>
            <button type="button" className="primary" style={{ height: 36, display: "flex", alignItems: "center", gap: 7 }}>
              <BarChart3 size={14} />
              Report
            </button>
          </div>
        </header>

        <main className="content-wrap" style={{ padding: "22px 28px 52px", maxWidth: 1360, margin: "0 auto" }}>
          {activeMeta.id !== "overview" && (
            <div className="card" style={{ padding: "14px 16px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div style={{ fontSize: 13, color: theme.muted, lineHeight: 1.45 }}>{activeMeta.description}</div>
              <button type="button" className="ghost" style={{ display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" }}>
                Open docs
                <ExternalLink size={13} />
              </button>
            </div>
          )}
          <ActiveView />
        </main>
      </section>
    </div>
  );
}
