import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ArrowLeft,
  LayoutGrid,
  TrendingUp,
  MousePointerClick,
  Gauge,
  Settings2,
  HelpCircle,
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

const RAIL_WIDTH = 68;

// A slim, fixed icon rail — always visible, always the same width, no text
// labels. Groups with more than one item pop a small flyout to the right of
// the icon, at the icon's own height, instead of a bottom toolbar that eats
// into the content area.
function IconRail({ view, onSelect }) {
  const [openGroup, setOpenGroup] = useState(null);
  const [hoverTip, setHoverTip] = useState(null); // id of single-item icon being hovered
  const ref = useRef(null);
  const closeTimer = useRef(null);

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }
  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenGroup(null), 150);
  }

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpenGroup(null);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => () => cancelClose(), []);

  const activeGroup = TOOL_GROUPS.find(
    (g) => g.single === view || (g.items && g.items.some((i) => i.id === view))
  );

  function Tooltip({ label }) {
    return (
      <div
        className="panel"
        style={{
          position: "absolute",
          left: RAIL_WIDTH - 12 + 4,
          top: "50%",
          transform: "translateY(-50%)",
          padding: "6px 11px",
          fontFamily: "'Geist Sans', sans-serif",
          fontSize: 12.5,
          color: theme.text,
          whiteSpace: "nowrap",
          boxShadow: "0 6px 18px rgba(28,24,16,0.16)",
          pointerEvents: "none",
        }}
      >
        {label}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: RAIL_WIDTH,
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
        background: theme.text,
      }}
    >
      {/* mark */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: theme.credit,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
          flexShrink: 0,
        }}
      >
        <span className="serif" style={{ fontSize: 15, fontStyle: "italic", color: theme.bg }}>
          n
        </span>
      </div>

      {/* nav groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {TOOL_GROUPS.map((g) => {
          const Icon = g.icon;
          const isActive = activeGroup && activeGroup.id === g.id;
          const isOpen = openGroup === g.id;
          return (
            <div
              key={g.id}
              style={{ position: "relative" }}
              onMouseEnter={() => {
                if (g.items) {
                  cancelClose();
                  setOpenGroup(g.id);
                } else {
                  setHoverTip(g.id);
                }
              }}
              onMouseLeave={() => {
                if (g.items) {
                  scheduleClose();
                } else {
                  setHoverTip((t) => (t === g.id ? null : t));
                }
              }}
            >
              <button
                type="button"
                onClick={() => {
                  if (g.single) {
                    onSelect(g.single);
                    setOpenGroup(null);
                  } else {
                    setOpenGroup(isOpen ? null : g.id);
                  }
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: "none",
                  background: isActive || isOpen ? theme.credit : "transparent",
                  color: isActive || isOpen ? theme.bg : "#8A8371",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onFocus={(e) => {
                  if (!isActive && !isOpen) e.currentTarget.style.color = theme.bg;
                }}
                onBlur={(e) => {
                  if (!isActive && !isOpen) e.currentTarget.style.color = "#8A8371";
                }}
              >
                <Icon size={17} />
              </button>

              {!g.items && hoverTip === g.id && <Tooltip label={g.label} />}

              {isOpen && g.items && (
                <div
                  className="panel"
                  style={{
                    position: "absolute",
                    left: RAIL_WIDTH - 12 + 4,
                    top: 0,
                    padding: 6,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 190,
                    boxShadow: "0 10px 30px rgba(28,24,16,0.18)",
                  }}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: 10,
                      color: theme.faint,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      padding: "6px 10px 8px",
                    }}
                  >
                    {g.label}
                  </div>
                  {g.items.map((item) => (
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
                        fontFamily: "'Geist Sans', sans-serif",
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
            </div>
          );
        })}
      </div>

      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setHoverTip("help")}
        onMouseLeave={() => setHoverTip((t) => (t === "help" ? null : t))}
      >
        <button
          type="button"
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: "none",
            background: "transparent",
            color: "#8A8371",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <HelpCircle size={17} />
        </button>
        {hoverTip === "help" && <Tooltip label="Help" />}
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
        fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: theme.bg,
        color: theme.text,
        minHeight: "100vh",
      }}
    >
      <style>{globalCss}</style>

      <IconRail view={view} onSelect={setView} />

      {/* Top bar, shifted right of the icon rail. Everything else lives on
          one page, or one click away via a group icon's flyout. */}
      <div
        style={{
          marginLeft: RAIL_WIDTH,
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

      <main
        style={{
          marginLeft: RAIL_WIDTH,
          padding: "28px 32px 56px",
          maxWidth: 1180,
        }}
      >
        <ActiveView />
      </main>
    </div>
  );
}
