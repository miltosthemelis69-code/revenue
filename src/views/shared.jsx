import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { fmtKpi } from "../data/mockTier1";
import { theme } from "../styles";

export function DeltaBadge({ delta, inverse }) {
  const good = inverse ? delta < 0 : delta > 0;
  if (delta === 0) return null;
  return (
    <span style={{ display: "flex", alignItems: "center", fontSize: 12, color: good ? theme.green : theme.red }}>
      {delta > 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
      {Math.abs(delta)}%
    </span>
  );
}

export function KpiGrid({ items, columns = 4 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(columns, items.length)}, 1fr)`,
        gap: 14,
        marginBottom: 20,
      }}
    >
      {items.map((k) => (
        <div key={k.label} className="card" style={{ padding: "16px 18px" }}>
          <div style={{ fontSize: 12.5, color: theme.muted, marginBottom: 8 }}>{k.label}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="mono" style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.5 }}>
              {k.format === "text" ? k.value : fmtKpi(k)}
            </span>
            <DeltaBadge delta={k.delta} inverse={k.inverse} />
          </div>
        </div>
      ))}
    </div>
  );
}
