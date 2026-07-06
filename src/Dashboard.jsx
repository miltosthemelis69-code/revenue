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
  Globe,
  Map,
  Route,
  TrendingUp,
  Brain,
  Flame,
  FlaskConical,
  Robot,
  User,
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
import LiveVisitorsView from "./views/LiveVisitors";
import JourneysView from "./views/Journeys";
import CrossSiteView from "./views/CrossSite";
import CohortsView from "./views/Cohorts";
import RumScoreView from "./views/RumScore";
import BotDetectionView from "./views/BotDetection";
import VisitorProfilesView from "./views/VisitorProfiles";
import PurchasePredictionView from "./views/PurchasePrediction";
import HeatmapsView from "./views/Heatmaps";
import ABExperimentsView from "./views/ABExperiments";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, tier: null },
  { id: "pages", label: "Pages", icon: FileText, tier: 1 },
  { id: "sources", label: "Sources", icon: Link2, tier: 1 },
  { id: "audience", label: "Audience", icon: Users, tier: 1 },
  { id: "events", label: "Events", icon: MousePointerClick, tier: 1 },
  { id: "autoclicks", label: "Auto Clicks", icon: Zap, tier: 2 },
  { id: "webvitals", label: "Web Vitals", icon: Gauge, tier: 2 },
  { id: "funnels", label: "Funnels", icon: Filter, tier: 2 },
  { id: "integrations", label: "Integrations", icon: Plug, tier: 2 },
  { id: "sites", label: "Sites & Team", icon: Globe, tier: 2 },
  { id: "livevisitors", label: "Live Visitors", icon: Radio, tier: 3 },
  { id: "journeys", label: "Journeys", icon: Route, tier: 3 },
  { id: "crosssite", label: "Cross-Site", icon: TrendingUp, tier: 3 },
  { id: "cohorts", label: "Cohorts", icon: Users, tier: 3 },
  { id: "rumscore", label: "RUM Score", icon: Gauge, tier: 3 },
  { id: "botdetection", label: "Bot Detection", icon: Robot, tier: 3 },
  { id: "visitorprofiles", label: "Visitor Profiles", icon: User, tier: 3 },
  { id: "purchaseprediction", label: "Purchase Prediction", icon: Brain, tier: 4 },
  { id: "heatmaps", label: "Heatmaps", icon: Flame, tier: 4 },
  { id: "abexperiments", label: "A/B Tests", icon: FlaskConical, tier: 5 },
  { id: "settings", label: "Settings", icon: Settings, tier: 1 },
  { id: "share", label: "Share", icon: Share2, tier: 1 },
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
  livevisitors: LiveVisitorsView,
  journeys: JourneysView,
  crosssite: CrossSiteView,
  cohorts: CohortsView,
  rumscore: RumScoreView,
  botdetection: BotDetectionView,
  visitorprofiles: VisitorProfilesView,
  purchaseprediction: PurchasePredictionView,
  heatmaps: HeatmapsView,
  abexperiments: ABExperimentsView,
  settings: SettingsView,
  share: ShareView,
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
            v1 · Tier 1-5 mock
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
                {tier === 1 && !active && (
                  <span style={{ marginLeft: "auto", fontSize: 9, color: theme.dim }}>T1</span>
                )}
                {tier === 2 && !active && (
                  <span style={{ marginLeft: "auto", fontSize: 9, color: theme.accent }}>T2</span>
                )}
                {tier === 3 && !active && (
                  <span style={{ marginLeft: "auto", fontSize: 9, color: theme.green }}>T3</span>
                )}
                {tier === 4 && !active && (
                  <span style={{ marginLeft: "auto", fontSize: 9, color: "#f59e0b" }}>T4</span>
                )}
                {tier === 5 && !active && (
                  <span style={{ marginLeft: "auto", fontSize: 9, color: theme.red }}>T5</span>
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
