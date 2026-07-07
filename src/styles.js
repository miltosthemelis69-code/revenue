// Design system for notjustvisits.
//
// The whole product makes one argument: most analytics tools show you traffic
// and let you guess at revenue. This one shows you revenue and treats traffic
// as context. The visual language says that out loud — anything that's just a
// visit is quiet grey ink; anything that's actual money is the one warm color
// on the page. No dashboards-within-dashboards, no ten-color chart legends,
// no dark-mode-by-default cliché. Paper, ink, and a single signal color.

export const theme = {
  bg: "#F5F1E8",          // warm paper — not white, not grey
  panel: "#FBF8F1",       // barely-lifted surface for grouped content
  panelHover: "#EFEADB",
  line: "#E1D9C6",        // hairline dividers / borders
  lineFaint: "#EAE3D2",   // quieter internal separators
  text: "#1C1810",        // ink
  muted: "#726B58",       // quiet — used for "just a visit" data
  faint: "#A79C82",       // faintest — labels, timestamps
  credit: "#BF4E1E",      // signal — the one accent, real revenue only
  creditDeep: "#8C3714",  // hover/pressed state of the accent
  debit: "#9C4A3C",       // refunds / money leaving, close family to credit but muted
  amber: "#A9791F",       // reserved strictly for "needs attention" states
};

export const globalCss = `
  * { box-sizing: border-box; }
  html, body { background: ${theme.bg}; }
  .serif { font-family: 'Newsreader', Georgia, serif; }
  .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }

  .panel {
    background: ${theme.panel};
    border: 1px solid ${theme.line};
    border-radius: 8px;
  }
  .row-hover:hover { background: ${theme.panelHover}; }
  .nav-item { transition: color .12s ease, border-color .12s ease; }
  .nav-item:hover { color: ${theme.text} !important; }
  ::selection { background: #BF4E1E29; }

  input, select, textarea {
    font-family: 'Space Grotesk', sans-serif;
    color: ${theme.text};
    background: ${theme.bg};
    border: 1px solid ${theme.line};
    border-radius: 6px;
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
    border-radius: 6px;
    padding: 8px 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }
  button.primary:hover { background: ${theme.creditDeep}; }
  button.ghost {
    background: transparent;
    color: ${theme.muted};
    border: 1px solid ${theme.line};
    border-radius: 6px;
    padding: 8px 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    cursor: pointer;
  }
  button.ghost:hover { border-color: ${theme.faint}; color: ${theme.text}; }

  .tab-btn {
    background: none;
    border: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12.5px;
    padding: 5px 0;
    margin-right: 18px;
    cursor: pointer;
    color: ${theme.faint};
    border-bottom: 2px solid transparent;
  }
  .tab-btn.active { color: ${theme.text}; border-bottom-color: ${theme.credit}; }
  .tab-btn:hover { color: ${theme.text}; }

  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; }
  }
`;

export function sectionLabelStyle() {
  return {
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    fontSize: 10.5,
    color: theme.faint,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: 500,
    paddingBottom: 10,
    borderBottom: `1px solid ${theme.lineFaint}`,
  };
}

// kept as an alias so existing call sites keep working
export const cardTitleStyle = sectionLabelStyle;

export function barTrackStyle() {
  return {
    height: 3,
    borderRadius: 2,
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
