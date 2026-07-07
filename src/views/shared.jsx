import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { fmtKpi } from "../data/mockTier1";
import { theme } from "../styles";

export function DeltaBadge({ delta, inverse }) {
  const good = inverse ? delta < 0 : delta > 0;
  if (delta === 0) return null;
  return (
    <span style={{ display: "flex", alignItems: "center", fontSize: 11, color: good ? theme.green : theme.red }}>
      {delta > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
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
        gap: 12,
        marginBottom: 16,
      }}
    >
      {items.map((k) => (
        <div key={k.label} className="card" style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: theme.dim, marginBottom: 6 }}>{k.label}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="mono" style={{ fontSize: 20, fontWeight: 500, letterSpacing: -0.3 }}>
              {k.format === "text" ? k.value : fmtKpi(k)}
            </span>
            <DeltaBadge delta={k.delta} inverse={k.inverse} />
          </div>
        </div>
      ))}
    </div>
  );
}
