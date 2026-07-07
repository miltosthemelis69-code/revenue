import React from "react";
import { fmtKpi } from "../data/mockTier1";
import { theme } from "../styles";

// Plain text delta — a colored mono "+" or "–" prefix, no icon, no pill.
export function DeltaBadge({ delta, inverse }) {
  if (delta === 0) return null;
  const good = inverse ? delta < 0 : delta > 0;
  const color = good ? theme.credit : theme.debit;
  return (
    <span className="mono" style={{ fontSize: 12, color }}>
      {delta > 0 ? "+" : "–"}
      {Math.abs(delta)}%
    </span>
  );
}

// A single ledger-style summary line: label small and quiet above, figure large
// and tabular below, columns separated by hairlines rather than boxed cards.
// A plain status indicator — small dot + label, no filled pill, no background tint.
export function Status({ color, children, style }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color, fontWeight: 500, ...style }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block" }} />
      {children}
    </span>
  );
}

export function KpiGrid({ items }) {
  return (
    <div
      style={{
        display: "flex",
        border: `1px solid ${theme.line}`,
        borderRadius: 3,
        marginBottom: 20,
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
          <div style={{ fontSize: 11, color: theme.faint, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>
            {k.label}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="mono" style={{ fontSize: 22, fontWeight: 500, letterSpacing: -0.3, color: theme.text }}>
              {k.format === "text" ? k.value : fmtKpi(k)}
            </span>
            <DeltaBadge delta={k.delta} inverse={k.inverse} />
          </div>
        </div>
      ))}
    </div>
  );
}
