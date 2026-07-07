import React, { useState, useEffect } from "react";
import {
  Radio,
  ChevronDown,
  LayoutDashboard,
  FileText,
  Link2,
  Users,
  MousePointerClick,
  Settings,
  Share2,
  Zap,
  Gauge,
  Filter,
  Plug,
  Layers,
  Globe2,
  Route,
  TrendingUp,
  Sparkles,
  Bot,
  UserCircle2,
  Brain,
  Flame,
  FlaskConical,
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

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, tier: null },
  { id: "pages", label: "Pages", icon: FileText, tier: 1 },
  { id: "sources", label: "Sources", icon: Link2, tier: 1 },
  { id: "audience", label: "Audience", icon: Users, tier: 1 },
  { id: "events", label: "Events", icon: MousePointerClick, tier: 1 },
  { id: "settings", label: "Settings", icon: Settings, tier: 1 },
  { id: "share", label: "Share", icon: Share2, tier: 1 },
  { id: "autoclicks", label: "Auto Clicks", icon: Zap, tier: 2 },
  { id: "webvitals", label: "Web Vitals", icon: Gauge, tier: 2 },
  { id: "funnels", label: "Funnels", icon: Filter, tier: 2 },
  { id: "integrations", label: "Integrations", icon: Plug, tier: 2 },
  { id: "sites", label: "Sites & Team", icon: Layers, tier: 2 },
  { id: "live", label: "Live", icon: Globe2, tier: 3 },
  { id: "journeys", label: "Journeys", icon: Route, tier: 3 },
  { id: "cohorts", label: "Cohorts & LTV", icon: TrendingUp, tier: 3 },
  { id: "experience", label: "Experience", icon: Sparkles, tier: 3 },
  { id: "bots", label: "Bot Traffic", icon: Bot, tier: 3 },
  { id: "profiles", label: "Profiles", icon: UserCircle2, tier: 3 },
  { id: "predictions", label: "Predictions", icon: Brain, tier: 4 },
  { id: "heatmaps", label: "Heatmaps", icon: Flame, tier: 4 },
  { id: "experiments", label: "Experiments", icon: FlaskConical, tier: 5 },
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

const TIER_COLOR = {
  1: theme.dim,
  2: theme.accent,
  3: theme.teal,
  4: theme.orange,
  5: theme.purple,
};

export default function Dashboard() {
  const [view, setView] = useState("overview");
  const [liveCount, setLiveCount] = useState(7);
  const [siteOpen, setSiteOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveCount((c) => Math.max(1, c + (Math.random() > 0.5 ? 1 : -1)));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const ActiveView = VIEWS[view];

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: theme.bg,
        color: theme.text,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{globalCss}</style>

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 28px",
          borderBottom: `1px solid ${theme.cardBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 5,
              background: `linear-gradient(135deg,${theme.accent},${theme.accentDark})`,
            }}
          />
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: 0.2 }}>Ledger</span>
          <span style={{ fontSize: 11, color: theme.dim, padding: "2px 8px", background: theme.surface, borderRadius: 4, marginLeft: 4 }}>
            v2 · Tier 1–5 mock
          </span>
          <div
            onClick={() => setSiteOpen((s) => !s)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginLeft: 10,
              padding: "5px 10px",
              borderRadius: 7,
              background: theme.surface,
              border: `1px solid ${theme.surfaceBorder}`,
              cursor: "pointer",
              fontSize: 13,
              color: theme.muted,
            }}
          >
            {SITE.domain}
            <ChevronDown size={13} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: theme.green }}>
            <Radio size={13} />
            <span className="mono">{liveCount}</span> live
          </div>
          <div style={{ fontSize: 13, color: theme.dim }}>Last 30 days</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <nav
          style={{
            width: 200,
            borderRight: `1px solid ${theme.cardBorder}`,
            padding: "16px 10px",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          {NAV.map(({ id, label, icon: Icon, tier }) => {
            const active = view === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={`nav-item${active ? " active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "9px 12px",
                  marginBottom: 2,
                  border: "1px solid transparent",
                  borderRadius: 8,
                  background: active ? theme.surface : "transparent",
                  color: active ? theme.text : theme.muted,
                  fontSize: 13,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <Icon size={15} />
                {label}
                {tier && !active && (
                  <span style={{ marginLeft: "auto", fontSize: 9, color: TIER_COLOR[tier], fontWeight: 600 }}>T{tier}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: "24px 28px 60px", maxWidth: 1180, overflow: "auto" }}>
          <ActiveView />
        </main>
      </div>
    </div>
  );
}
