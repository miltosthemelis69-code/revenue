import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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

// Grouped by what a founder is actually trying to find out — not by build order.
const NAV_GROUPS = [
  {
    label: null,
    items: [{ id: "overview", label: "Overview" }],
  },
  {
    label: "Traffic",
    items: [
      { id: "pages", label: "Pages" },
      { id: "sources", label: "Sources" },
      { id: "audience", label: "Audience" },
      { id: "live", label: "Live" },
      { id: "bots", label: "Bot traffic" },
    ],
  },
  {
    label: "Behavior",
    items: [
      { id: "events", label: "Events" },
      { id: "autoclicks", label: "Auto clicks" },
      { id: "funnels", label: "Funnels" },
      { id: "journeys", label: "Journeys" },
      { id: "profiles", label: "Profiles" },
      { id: "heatmaps", label: "Heatmaps" },
      { id: "experiments", label: "Experiments" },
    ],
  },
  {
    label: "Revenue",
    items: [
      { id: "integrations", label: "Integrations" },
      { id: "cohorts", label: "Cohorts & LTV" },
      { id: "predictions", label: "Predictions" },
    ],
  },
  {
    label: "Performance",
    items: [
      { id: "webvitals", label: "Web vitals" },
      { id: "experience", label: "Experience" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "sites", label: "Sites & team" },
      { id: "settings", label: "Settings" },
      { id: "share", label: "Share" },
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
        fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
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
          padding: "16px 28px",
          borderBottom: `1px solid ${theme.line}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span className="serif" style={{ fontSize: 18, fontStyle: "italic", letterSpacing: 0.2 }}>
            Ledger
          </span>
          <button
            type="button"
            onClick={() => setSiteOpen((s) => !s)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: 13,
              color: theme.muted,
              fontFamily: "inherit",
            }}
          >
            {SITE.domain}
            <ChevronDown size={13} />
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: theme.muted }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: theme.credit, display: "inline-block" }} />
            <span className="mono" style={{ color: theme.text }}>{liveCount}</span> live
          </div>
          <div style={{ fontSize: 13, color: theme.faint }}>Last 30 days</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar — text only, grouped by what it answers, not by how it was built */}
        <nav
          style={{
            width: 190,
            borderRight: `1px solid ${theme.line}`,
            padding: "20px 22px",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          {NAV_GROUPS.map((group, gIdx) => (
            <div key={group.label || "root"} style={{ marginBottom: gIdx === NAV_GROUPS.length - 1 ? 0 : 22 }}>
              {group.label && (
                <div style={{ fontSize: 10.5, color: theme.faint, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>
                  {group.label}
                </div>
              )}
              {group.items.map(({ id, label }) => {
                const active = view === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setView(id)}
                    className="nav-item"
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "5px 0 5px 10px",
                      marginBottom: 1,
                      background: "none",
                      border: "none",
                      borderLeft: `2px solid ${active ? theme.credit : "transparent"}`,
                      color: active ? theme.text : theme.muted,
                      fontFamily: "inherit",
                      fontSize: 13,
                      fontWeight: active ? 500 : 400,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: "28px 32px 64px", maxWidth: 1180, overflow: "auto" }}>
          <ActiveView />
        </main>
      </div>
    </div>
  );
}
