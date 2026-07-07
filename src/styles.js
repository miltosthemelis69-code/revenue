export const theme = {
  bg: "#0b0f14",
  card: "#10151c",
  cardBorder: "#1c232c",
  rowBorder: "#171d25",
  muted: "#7c8794",
  dim: "#5c6773",
  text: "#edeff2",
  accent: "#f2b441",
  accentDark: "#c98a1f",
  green: "#7de3a8",
  red: "#e88b8b",
  teal: "#3fa7a0",
  surface: "#171d25",
  surfaceBorder: "#232b35",
  purple: "#b394f0",
  orange: "#e8935a",
};

export const globalCss = `
  .mono { font-family: 'IBM Plex Mono', 'JetBrains Mono', monospace; }
  .card {
    background: ${theme.card};
    border: 1px solid ${theme.cardBorder};
    border-radius: 10px;
  }
  .row-hover:hover { background: #12181f; }
  .nav-item:hover { background: #12181f; }
  .nav-item.active { background: #171d25; border-color: #2a3440; }
  ::selection { background: #f2b44133; }
  input, select, textarea {
    font-family: inherit;
    color: ${theme.text};
    background: ${theme.surface};
    border: 1px solid ${theme.surfaceBorder};
    border-radius: 7px;
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
  }
  input:focus, select:focus, textarea:focus {
    border-color: #3a4654;
  }
  button.primary {
    background: linear-gradient(135deg, ${theme.accent}, ${theme.accentDark});
    color: #0b0f14;
    border: none;
    border-radius: 7px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }
  button.ghost {
    background: transparent;
    color: ${theme.muted};
    border: 1px solid ${theme.surfaceBorder};
    border-radius: 7px;
    padding: 8px 14px;
    font-size: 13px;
    cursor: pointer;
  }
`;

export function cardTitleStyle() {
  return {
    fontSize: 12.5,
    color: theme.muted,
    marginBottom: 14,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  };
}

export function barTrackStyle() {
  return {
    height: 4,
    borderRadius: 2,
    background: theme.rowBorder,
    overflow: "hidden",
  };
}

export function barFillStyle(pct, gradient = `linear-gradient(90deg,${theme.teal},${theme.accent})`) {
  return {
    width: `${pct}%`,
    height: "100%",
    background: gradient,
  };
}
