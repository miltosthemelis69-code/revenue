export const theme = {
  bg: "#f6f7f9",
  appRail: "#111827",
  appRailSoft: "#1f2937",
  card: "#ffffff",
  cardBorder: "#e4e7ec",
  rowBorder: "#edf0f3",
  muted: "#667085",
  dim: "#98a2b3",
  text: "#101828",
  heading: "#0b1220",
  accent: "#2563eb",
  accentDark: "#1d4ed8",
  accentSoft: "#eff6ff",
  green: "#16a34a",
  greenSoft: "#ecfdf3",
  red: "#dc2626",
  redSoft: "#fef2f2",
  teal: "#0f766e",
  tealSoft: "#f0fdfa",
  orange: "#ea580c",
  orangeSoft: "#fff7ed",
  surface: "#f8fafc",
  surfaceBorder: "#e5e7eb",
  purple: "#7c3aed",
};

export const globalCss = `
  * { box-sizing: border-box; }
  html, body, #root { min-height: 100%; margin: 0; }
  body {
    background: ${theme.bg};
    color: ${theme.text};
    -webkit-font-smoothing: antialiased;
  }
  .mono { font-family: 'SF Mono', 'Monaco', 'IBM Plex Mono', monospace; }
  .card {
    background: ${theme.card};
    border: 1px solid ${theme.cardBorder};
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
  }
  .row-hover { transition: background 0.15s ease; }
  .row-hover:hover { background: ${theme.surface}; }
  .nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
  .nav-item.active { background: #fff; color: ${theme.heading}; }
  ::selection { background: ${theme.accent}22; }
  input, select, textarea {
    font-family: inherit;
    color: ${theme.text};
    background: #fff;
    border: 1px solid ${theme.surfaceBorder};
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 13px;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  input:focus, select:focus, textarea:focus {
    border-color: ${theme.accent};
    box-shadow: 0 0 0 3px ${theme.accent}16;
  }
  button { font-family: inherit; }
  button.primary {
    background: ${theme.heading};
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.15s ease, opacity 0.15s ease;
  }
  button.primary:hover { opacity: 0.92; }
  button.ghost {
    background: #fff;
    color: ${theme.muted};
    border: 1px solid ${theme.surfaceBorder};
    border-radius: 6px;
    padding: 8px 14px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  button.ghost:hover {
    color: ${theme.text};
    border-color: ${theme.cardBorder};
    background: ${theme.surface};
  }
  .shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 244px minmax(0, 1fr);
  }
  .main-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.85fr);
    gap: 16px;
  }
  .overview-kpis {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }
  @media (max-width: 1080px) {
    .shell { grid-template-columns: 76px minmax(0, 1fr); }
    .rail-label, .rail-section-title, .rail-meta { display: none !important; }
    .rail-logo { justify-content: center; }
    .main-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 760px) {
    .shell { display: block; }
    .sidebar { position: static !important; width: auto !important; min-height: auto !important; }
    .sidebar-section { margin-bottom: 10px !important; }
    .content-wrap { padding: 16px !important; }
    .topbar { flex-direction: column; align-items: flex-start !important; gap: 12px; }
    .sidebar-nav { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
    .overview-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  }
  @media (max-width: 520px) {
    .overview-kpis { grid-template-columns: 1fr !important; }
  }
`;

export function cardTitleStyle() {
  return {
    fontSize: 11,
    color: theme.dim,
    marginBottom: 14,
    textTransform: "uppercase",
    letterSpacing: 0,
    fontWeight: 700,
  };
}

export function barTrackStyle() {
  return {
    height: 6,
    borderRadius: 999,
    background: theme.rowBorder,
    overflow: "hidden",
  };
}

export function barFillStyle(pct, color = theme.accent) {
  return {
    width: `${pct}%`,
    height: "100%",
    background: color,
    borderRadius: 999,
  };
}
