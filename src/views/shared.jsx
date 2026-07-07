import React, { useState } from "react";
import { fmtKpi } from "../data/mockTier1";
import { theme, barTrackStyle, barFillStyle } from "../styles";

// Plain text delta — a colored mono "+" or "–" prefix, no icon, no pill.
export function DeltaBadge({ delta, inverse }) {
  if (delta === 0 || delta === undefined) return null;
  const good = inverse ? delta < 0 : delta > 0;
  const color = good ? theme.credit : theme.debit;
  return (
    <span className="mono" style={{ fontSize: 11.5, color }}>
      {delta > 0 ? "+" : "–"}
      {Math.abs(delta)}%
    </span>
  );
}

// A plain status indicator — small dot + label, no filled pill, no background tint.
export function Status({ color, children, style }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color, fontWeight: 500, ...style }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block" }} />
      {children}
    </span>
  );
}

// Generic KPI row, still used by a few secondary views.
export function KpiGrid({ items }) {
  return (
    <div
      style={{
        display: "flex",
        border: `1px solid ${theme.line}`,
        borderRadius: 8,
        marginBottom: 20,
        background: theme.panel,
      }}
    >
      {items.map((k, idx) => (
        <div
          key={k.label}
          style={{
            flex: 1,
            padding: "16px 20px",
            borderLeft: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
          }}
        >
          <div style={{ fontSize: 10.5, color: theme.faint, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.9 }}>
            {k.label}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="mono" style={{ fontSize: 21, fontWeight: 500, letterSpacing: -0.2, color: theme.text }}>
              {k.format === "text" ? k.value : fmtKpi(k)}
            </span>
            <DeltaBadge delta={k.delta} inverse={k.inverse} />
          </div>
        </div>
      ))}
    </div>
  );
}

// The core brand statement, rendered as a stat row: figures that are real,
// attributed revenue sit large and in ink-orange (signal). Figures that are
// just traffic sit smaller and grey (noise) — not hidden, just honest about
// what they are: context, not the point.
export function StatRow({ signal, context }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        flexWrap: "wrap",
        gap: 0,
        marginBottom: 22,
        paddingBottom: 22,
        borderBottom: `1px solid ${theme.line}`,
      }}
    >
      <div style={{ display: "flex", gap: 34, paddingRight: 30, marginRight: 30, borderRight: `1px solid ${theme.lineFaint}` }}>
        {signal.map((k) => (
          <div key={k.label}>
            <div className="mono" style={{ fontSize: 10, color: theme.faint, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
              {k.label}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
              <span className="serif" style={{ fontSize: 30, fontStyle: "italic", color: theme.credit, letterSpacing: -0.3 }}>
                {k.format === "text" ? k.value : fmtKpi(k)}
              </span>
              <DeltaBadge delta={k.delta} inverse={k.inverse} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 28, alignItems: "flex-end" }}>
        {context.map((k) => (
          <div key={k.label}>
            <div className="mono" style={{ fontSize: 10, color: theme.faint, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
              {k.label}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="mono" style={{ fontSize: 17, color: theme.muted, fontWeight: 500 }}>
                {k.format === "text" ? k.value : fmtKpi(k)}
              </span>
              <DeltaBadge delta={k.delta} inverse={k.inverse} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Small underline-style tab switcher — text only, no pill background.
export function Tabs({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", marginBottom: 2 }}>
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`tab-btn${value === opt.id ? " active" : ""}`}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// A titled panel with an optional tab switcher in the header row — the base
// unit almost every breakdown block on the Overview page is built from.
export function Panel({ title, tabs, tabValue, onTabChange, right, children, style }) {
  return (
    <div className="panel" style={{ padding: "18px 20px", ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 10.5, color: theme.faint, textTransform: "uppercase", letterSpacing: 1.2 }}>
          {title}
        </div>
        {right}
      </div>
      {tabs && <Tabs options={tabs} value={tabValue} onChange={onTabChange} />}
      <div style={{ marginTop: tabs ? 12 : 0 }}>{children}</div>
    </div>
  );
}

// One ranked row: label, thin proportional bar, and a right-aligned figure.
// Used for referrers, campaigns, countries, pages, browsers, OS, bots — every
// "who / where / what" breakdown on the dashboard shares this one component.
export function RankedRow({ label, sublabel, pct, value, valueColor, first }) {
  return (
    <div
      className="row-hover"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 12,
        padding: "9px 4px",
        borderTop: first ? "none" : `1px solid ${theme.lineFaint}`,
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
          <span style={{ color: theme.text }}>{label}</span>
          {sublabel && <span className="mono" style={{ fontSize: 11.5, color: theme.faint }}>{sublabel}</span>}
        </div>
        <div style={barTrackStyle()}>
          <div style={barFillStyle(pct, valueColor || theme.faint)} />
        </div>
      </div>
      <div className="mono" style={{ fontSize: 13.5, fontWeight: 500, color: valueColor || theme.text, textAlign: "right", minWidth: 58 }}>
        {value}
      </div>
    </div>
  );
}
