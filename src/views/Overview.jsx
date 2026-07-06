import React, { useMemo } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { RefreshCcw } from "lucide-react";
import { KPIS, REVENUE_TREND, CHANNELS, RECENT_SALES, money, fmtKpi } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";
import { DeltaBadge, KpiGrid } from "./shared";

export default function OverviewView() {
  const maxChannelRevenue = useMemo(
    () => Math.max(...CHANNELS.map((c) => c.revenue)),
    []
  );

  return (
    <>
      <KpiGrid items={KPIS.filter((k) => k.label !== "Pageviews (30d)")} />

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 12.5, color: theme.muted }}>Revenue</div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 600 }}>$8,420</div>
              </div>
              <RefreshCcw size={14} color="#4a5560" />
            </div>
            <div style={{ height: 90, marginTop: 6 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REVENUE_TREND}>
                  <Line type="monotone" dataKey="v" stroke={theme.accent} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={cardTitleStyle()}>Revenue by channel</div>
            {CHANNELS.map((c, idx) => (
              <div
                key={c.name}
                className="row-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 90px",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 4px",
                  borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
                }}
              >
                <div>
                  <div style={{ fontSize: 13.5, marginBottom: 6 }}>{c.name}</div>
                  <div style={barTrackStyle()}>
                    <div style={barFillStyle((c.revenue / maxChannelRevenue) * 100)} />
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: theme.muted, textAlign: "right" }}>
                  {c.visitors.toLocaleString()} vis.
                </div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 600, textAlign: "right" }}>
                  {money(c.revenue)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: "18px 20px", height: "fit-content" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: theme.green, display: "inline-block" }} />
            Live sales
          </div>
          {RECENT_SALES.map((s, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 2px",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div>
                <div style={{ fontSize: 13.5 }}>{s.plan}</div>
                <div style={{ fontSize: 12, color: theme.dim, marginTop: 2 }}>
                  {s.channel} · {s.country} · {s.time}
                </div>
              </div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: s.amount < 0 ? theme.red : theme.text }}>
                {money(s.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { DeltaBadge };
