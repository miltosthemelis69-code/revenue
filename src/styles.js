// Design system for Ledger — an homage to double-entry bookkeeping conventions:
// green ink for credits/positive figures, red ink for debits/refunds, and otherwise
// quiet, high-contrast, paper-and-ink neutrals. No gradients, no glow, no pill badges.

export const theme = {
  bg: "#121110",         // ink — warm near-black, not blue-black
  panel: "#161412",      // barely-raised surface for grouped content
  panelHover: "#1a1815",
  line: "#2b2824",       // hairline dividers / borders
  lineFaint: "#1d1b18",  // quieter internal separators
  text: "#ECE7DD",       // paper
  muted: "#9c968b",
  faint: "#66605a",
  credit: "#8FB39A",     // ledger green — the one accent, used for positive figures + primary actions
  creditDeep: "#4F6F58",
  debit: "#A8655C",      // ledger red — negative figures / refunds only, never decorative
  amber: "#C9A24B",      // reserved strictly for "needs attention" states (Tier 4/5 predictive stuff), used sparingly
};

export const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

  * { box-sizing: border-box; }
  html, body { background: ${theme.bg}; }
  .serif { font-family: 'Fraunces', Georgia, serif; }
  .mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }

  .panel {
    background: ${theme.panel};
    border: 1px solid ${theme.line};
    border-radius: 3px;
  }
  .row-hover:hover { background: ${theme.panelHover}; }
  .nav-item { transition: color .12s ease, border-color .12s ease; }
  .nav-item:hover { color: ${theme.text} !important; }
  ::selection { background: #8FB39A33; }

  input, select, textarea {
    font-family: 'IBM Plex Sans', sans-serif;
    color: ${theme.text};
    background: ${theme.bg};
    border: 1px solid ${theme.line};
    border-radius: 3px;
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
  }
  input:focus, select:focus, textarea:focus { border-color: ${theme.faint}; }
  input:focus-visible, select:focus-visible, textarea:focus-visible,
  button:focus-visible, [tabindex]:focus-visible {
    outline: 1px solid ${theme.credit};
    outline-offset: 2px;
  }

  button.primary {
    background: ${theme.credit};
    color: ${theme.bg};
    border: none;
    border-radius: 3px;
    padding: 8px 14px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }
  button.primary:hover { background: #9fc2ac; }
  button.ghost {
    background: transparent;
    color: ${theme.muted};
    border: 1px solid ${theme.line};
    border-radius: 3px;
    padding: 8px 14px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
  }
  button.ghost:hover { border-color: ${theme.faint}; color: ${theme.text}; }

  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; }
  }
`;

export function sectionLabelStyle() {
  return {
    fontSize: 11,
    color: theme.faint,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontWeight: 600,
    paddingBottom: 10,
    borderBottom: `1px solid ${theme.lineFaint}`,
  };
}

// kept as an alias so existing call sites keep working
export const cardTitleStyle = sectionLabelStyle;

export function barTrackStyle() {
  return {
    height: 3,
    borderRadius: 0,
    background: theme.lineFaint,
    overflow: "hidden",
  };
}

export function barFillStyle(pct, color = theme.credit) {
  return {
    width: `${Math.max(0, Math.min(100, pct))}%`,
    height: "100%",
    background: color,
  };
}
