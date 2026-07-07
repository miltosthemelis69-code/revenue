export const theme = {
  bg: "#09090b",
  card: "#0a0a0c",
  cardBorder: "#18181b",
  rowBorder: "#141416",
  muted: "#a1a1aa",
  dim: "#71717a",
  text: "#fafafa",
  accent: "#3b82f6",
  accentDark: "#2563eb",
  green: "#22c55e",
  red: "#ef4444",
  teal: "#14b8a6",
  surface: "#0c0c0e",
  surfaceBorder: "#1f1f23",
  purple: "#a855f7",
  orange: "#f97316",
};

export const globalCss = `
  .mono { font-family: 'SF Mono', 'Monaco', 'IBM Plex Mono', monospace; }
  .card {
    background: ${theme.card};
    border: 1px solid ${theme.cardBorder};
    border-radius: 8px;
  }
  .row-hover:hover { background: ${theme.surface}; }
  .nav-item:hover { background: ${theme.surface}; }
  .nav-item.active { background: ${theme.surface}; border-color: ${theme.cardBorder}; }
  ::selection { background: ${theme.accent}33; }
  input, select, textarea {
    font-family: inherit;
    color: ${theme.text};
    background: ${theme.surface};
    border: 1px solid ${theme.surfaceBorder};
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 13px;
    outline: none;
    transition: border-color 0.15s ease;
  }
  input:focus, select:focus, textarea:focus {
    border-color: ${theme.accent};
  }
  button.primary {
    background: ${theme.accent};
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }
  button.primary:hover { opacity: 0.9; }
  button.ghost {
    background: transparent;
    color: ${theme.muted};
    border: 1px solid ${theme.surfaceBorder};
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  button.ghost:hover {
    color: ${theme.text};
    border-color: ${theme.cardBorder};
  }
`;

export function cardTitleStyle() {
  return {
    fontSize: 11,
    color: theme.dim,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: 500,
  };
}

export function barTrackStyle() {
  return {
    height: 3,
    borderRadius: 2,
    background: theme.rowBorder,
    overflow: "hidden",
  };
}

export function barFillStyle(pct, color = theme.accent) {
  return {
    width: `${pct}%`,
    height: "100%",
    background: color,
    borderRadius: 2,
  };
}
