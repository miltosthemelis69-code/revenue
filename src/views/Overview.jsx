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

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: theme.dim, marginBottom: 4 }}>Revenue</div>
                <div className="mono" style={{ fontSize: 24, fontWeight: 500 }}>$8,420</div>
              </div>
              <RefreshCcw size={13} color={theme.dim} />
            </div>
            <div style={{ height: 80 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REVENUE_TREND}>
                  <Line type="monotone" dataKey="v" stroke={theme.accent} strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ padding: "16px 18px" }}>
            <div style={cardTitleStyle()}>Revenue by channel</div>
            {CHANNELS.map((c, idx) => (
              <div
                key={c.name}
                className="row-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 80px",
                  alignItems: "center",
                  gap: 12,
                  padding: "8px 0",
                  borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>{c.name}</div>
                  <div style={barTrackStyle()}>
                    <div style={barFillStyle((c.revenue / maxChannelRevenue) * 100)} />
                  </div>
                </div>
                <div style={{ fontSize: 11, color: theme.dim, textAlign: "right" }}>
                  {c.visitors.toLocaleString()}
                </div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 500, textAlign: "right" }}>
                  {money(c.revenue)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: "16px 18px", height: "fit-content" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: theme.green, display: "inline-block" }} />
            Live sales
          </div>
          {RECENT_SALES.map((s, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div>
                <div style={{ fontSize: 12 }}>{s.plan}</div>
                <div style={{ fontSize: 11, color: theme.dim, marginTop: 2 }}>
                  {s.channel} · {s.country} · {s.time}
                </div>
              </div>
              <div className="mono" style={{ fontSize: 12, fontWeight: 500, color: s.amount < 0 ? theme.red : theme.text }}>
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
