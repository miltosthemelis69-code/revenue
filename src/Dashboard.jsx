import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ArrowLeft,
  LayoutGrid,
  TrendingUp,
  MousePointerClick,
  Gauge,
  Settings2,
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

// Everything that isn't the dense Overview page lives one tap behind a small
// floating toolbar instead of a permanent sidebar — the Overview already
// answers "how's it going", these are the deliberate deep-dives.
const TOOL_GROUPS = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutGrid,
    single: "overview",
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: TrendingUp,
    items: [
      { id: "integrations", label: "Integrations" },
      { id: "cohorts", label: "Cohorts & LTV" },
      { id: "predictions", label: "Predictions" },
    ],
  },
  {
    id: "behavior",
    label: "Behavior",
    icon: MousePointerClick,
    items: [
      { id: "events", label: "Events" },
      { id: "autoclicks", label: "Auto clicks" },
      { id: "funnels", label: "Funnels" },
      { id: "journeys", label: "Journeys" },
      { id: "profiles", label: "Profiles" },
      { id: "pages", label: "Pages (full table)" },
      { id: "sources", label: "Sources (full table)" },
      { id: "audience", label: "Audience (full table)" },
      { id: "live", label: "Live" },
      { id: "bots", label: "Bot traffic" },
    ],
  },
  {
    id: "quality",
    label: "Quality",
    icon: Gauge,
    items: [
      { id: "webvitals", label: "Web vitals" },
      { id: "experience", label: "Experience score" },
      { id: "heatmaps", label: "Heatmaps" },
      { id: "experiments", label: "Experiments" },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    icon: Settings2,
    items: [
      { id: "sites", label: "Sites & team" },
      { id: "settings", label: "Settings" },
      { id: "share", label: "Share" },
    ],
  },
];

function FloatingToolbar({ view, onSelect }) {
  const [openGroup, setOpenGroup] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpenGroup(null);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const activeGroup = TOOL_GROUPS.find(
    (g) => g.single === view || (g.items && g.items.some((i) => i.id === view))
  );

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        bottom: 22,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {openGroup && (
        <div
          className="panel"
          style={{
            padding: 6,
            display: "flex",
            flexDirection: "column",
            minWidth: 190,
            boxShadow: "0 10px 30px rgba(28,24,16,0.14)",
          }}
        >
          {TOOL_GROUPS.find((g) => g.id === openGroup).items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelect(item.id);
                setOpenGroup(null);
              }}
              style={{
                textAlign: "left",
                background: view === item.id ? theme.panelHover : "transparent",
                border: "none",
                padding: "8px 12px",
                borderRadius: 5,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                color: view === item.id ? theme.text : theme.muted,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = theme.panelHover)}
              onMouseLeave={(e) => {
                if (view !== item.id) e.currentTarget.style.background = "transparent";
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div
        className="panel"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 5,
          borderRadius: 40,
          boxShadow: "0 10px 30px rgba(28,24,16,0.14)",
        }}
      >
        {TOOL_GROUPS.map((g) => {
          const Icon = g.icon;
          const isActive = activeGroup && activeGroup.id === g.id;
          return (
            <button
              key={g.id}
              type="button"
              title={g.label}
              onClick={() => {
                if (g.single) {
                  onSelect(g.single);
                  setOpenGroup(null);
                } else {
                  setOpenGroup(openGroup === g.id ? null : g.id);
                }
              }}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "none",
                background: isActive || openGroup === g.id ? theme.credit : "transparent",
                color: isActive || openGroup === g.id ? theme.bg : theme.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard({ onBack }) {
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
        fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
        background: theme.bg,
        color: theme.text,
        minHeight: "100vh",
      }}
    >
      <style>{globalCss}</style>

      {/* Top bar — no sidebar. Everything else lives on one page, or one tap
          away via the floating toolbar bottom-center. */}
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
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              title="Back to sites"
              style={{
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: theme.faint,
              }}
            >
              <ArrowLeft size={15} />
            </button>
          )}
          <span className="serif" style={{ fontSize: 17, fontStyle: "italic", letterSpacing: 0.1, whiteSpace: "nowrap" }}>
            notjustvisits<span style={{ color: theme.credit }}>.</span>
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

      <main style={{ padding: "28px 32px 110px", maxWidth: 1180, margin: "0 auto" }}>
        <ActiveView />
      </main>

      <FloatingToolbar view={view} onSelect={setView} />
    </div>
  );
}
