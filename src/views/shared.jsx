import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { fmtKpi } from "../data/mockTier1";
import { theme } from "../styles";

export function DeltaBadge({ delta, inverse }) {
  const good = inverse ? delta < 0 : delta > 0;
  if (delta === 0) return null;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        fontSize: 11,
        fontWeight: 700,
        color: good ? theme.green : theme.red,
        background: good ? theme.greenSoft : theme.redSoft,
        borderRadius: 999,
        padding: "3px 7px 3px 5px",
      }}
    >
      {delta > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {Math.abs(delta)}%
    </span>
  );
}

export function KpiGrid({ items, columns = 4 }) {
  return (
    <div
      className="overview-kpis"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(columns, items.length)}, minmax(0, 1fr))`,
        gap: 12,
        marginBottom: 16,
      }}
    >
      {items.map((k) => (
        <div key={k.label} className="card" style={{ padding: "16px 17px" }}>
          <div style={{ fontSize: 12, color: theme.muted, marginBottom: 8, fontWeight: 650 }}>{k.label}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="mono" style={{ fontSize: 22, fontWeight: 800, color: theme.heading, letterSpacing: 0 }}>
              {k.format === "text" ? k.value : fmtKpi(k)}
            </span>
            <DeltaBadge delta={k.delta} inverse={k.inverse} />
          </div>
        </div>
      ))}
    </div>
  );
}
