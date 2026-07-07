import React, { useState, useEffect } from "react";
import {
  Radio,
  ChevronDown,
  ChevronRight,
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

const NAV_SECTIONS = [
  {
    title: "Analytics",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "pages", label: "Pages", icon: FileText },
      { id: "sources", label: "Sources", icon: Link2 },
      { id: "audience", label: "Audience", icon: Users },
      { id: "events", label: "Events", icon: MousePointerClick },
    ],
  },
  {
    title: "Advanced",
    items: [
      { id: "autoclicks", label: "Auto Clicks", icon: Zap },
      { id: "webvitals", label: "Web Vitals", icon: Gauge },
      { id: "funnels", label: "Funnels", icon: Filter },
      { id: "integrations", label: "Integrations", icon: Plug },
    ],
  },
  {
    title: "Insights",
    items: [
      { id: "sites", label: "Sites & Team", icon: Layers },
      { id: "live", label: "Live Visitors", icon: Globe2 },
      { id: "journeys", label: "Journeys", icon: Route },
      { id: "cohorts", label: "Cohorts & LTV", icon: TrendingUp },
      { id: "experience", label: "Experience", icon: Sparkles },
      { id: "bots", label: "Bot Traffic", icon: Bot },
      { id: "profiles", label: "Profiles", icon: UserCircle2 },
    ],
  },
  {
    title: "Growth",
    items: [
      { id: "predictions", label: "Predictions", icon: Brain },
      { id: "heatmaps", label: "Heatmaps", icon: Flame },
      { id: "experiments", label: "Experiments", icon: FlaskConical },
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

export default function Dashboard() {
  const [view, setView] = useState("overview");
  const [liveCount, setLiveCount] = useState(7);
  const [siteOpen, setSiteOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(["Analytics"]);

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
          padding: "16px 24px",
          borderBottom: `1px solid ${theme.cardBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              background: theme.accent,
            }}
          />
          <span style={{ fontWeight: 500, fontSize: 14 }}>Ledger</span>
          <div
            onClick={() => setSiteOpen((s) => !s)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginLeft: 8,
              padding: "4px 8px",
              borderRadius: 6,
              background: theme.surface,
              border: `1px solid ${theme.surfaceBorder}`,
              cursor: "pointer",
              fontSize: 12,
              color: theme.muted,
            }}
          >
            {SITE.domain}
            <ChevronDown size={12} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: theme.green }}>
            <Radio size={12} />
            <span className="mono">{liveCount}</span>
          </div>
          <div style={{ fontSize: 12, color: theme.dim }}>Last 30 days</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <nav
          style={{
            width: 200,
            borderRight: `1px solid ${theme.cardBorder}`,
            padding: "12px 8px",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          {NAV_SECTIONS.map((section) => {
            const isExpanded = expandedSections.includes(section.title);
            return (
              <div key={section.title} style={{ marginBottom: 8 }}>
                <button
                  type="button"
                  onClick={() => {
                    setExpandedSections((prev) =>
                      prev.includes(section.title)
                        ? prev.filter((s) => s !== section.title)
                        : [...prev, section.title]
                    );
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "6px 10px",
                    marginBottom: 4,
                    border: "none",
                    background: "transparent",
                    color: theme.dim,
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    cursor: "pointer",
                  }}
                >
                  {section.title}
                  {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>
                {isExpanded && (
                  <div>
                    {section.items.map((item) => {
                      const active = view === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setView(item.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            width: "100%",
                            padding: "6px 10px",
                            marginBottom: 1,
                            border: "1px solid transparent",
                            borderRadius: 6,
                            background: active ? theme.surface : "transparent",
                            color: active ? theme.text : theme.muted,
                            fontSize: 12,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <item.icon size={14} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Settings and Share at bottom */}
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${theme.rowBorder}` }}>
            <button
              type="button"
              onClick={() => setView("settings")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "6px 10px",
                marginBottom: 1,
                border: "1px solid transparent",
                borderRadius: 6,
                background: view === "settings" ? theme.surface : "transparent",
                color: view === "settings" ? theme.text : theme.muted,
                fontSize: 12,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Settings size={14} />
              Settings
            </button>
            <button
              type="button"
              onClick={() => setView("share")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "6px 10px",
                border: "1px solid transparent",
                borderRadius: 6,
                background: view === "share" ? theme.surface : "transparent",
                color: view === "share" ? theme.text : theme.muted,
                fontSize: 12,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Share2 size={14} />
              Share
            </button>
          </div>
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: "20px 24px 48px", maxWidth: 1200, overflow: "auto" }}>
          <ActiveView />
        </main>
      </div>
    </div>
  );
}
