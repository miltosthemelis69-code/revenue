import React, { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowRight, CheckCircle2, CreditCard, RefreshCcw, TrendingUp } from "lucide-react";
import {
  CHANNELS,
  FUNNELS,
  KPIS,
  RECENT_SALES,
  REFUNDS_BY_CHANNEL,
  REVENUE_TREND,
  money,
} from "../data/mockTier1";
import { barFillStyle, barTrackStyle, cardTitleStyle, theme } from "../styles";
import { DeltaBadge, KpiGrid } from "./shared";

function InsightRow({ label, value, detail, tone = theme.text }) {
  return (
    <div
      className="row-hover"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: 12,
        alignItems: "center",
        padding: "11px 0",
        borderTop: `1px solid ${theme.rowBorder}`,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 650, color: theme.heading }}>{label}</div>
        <div style={{ fontSize: 12, color: theme.muted, marginTop: 3 }}>{detail}</div>
      </div>
      <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: tone }}>
        {value}
      </div>
    </div>
  );
}

export default function OverviewView() {
  const topChannel = CHANNELS[0];
  const maxChannelRevenue = useMemo(() => Math.max(...CHANNELS.map((channel) => channel.revenue)), []);
  const grossRefunds = REFUNDS_BY_CHANNEL.reduce((sum, channel) => sum + channel.refunded, 0);
  const conversionKpi = KPIS.find((kpi) => kpi.label === "Conversion rate");
  const chartData = REVENUE_TREND.map((point, index) => ({
    ...point,
    label: `Day ${index + 1}`,
  }));

  return (
    <>
      <KpiGrid items={KPIS.filter((kpi) => kpi.label !== "Pageviews (30d)")} />

      <div className="main-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <div style={cardTitleStyle()}>Net revenue trend</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <div className="mono" style={{ fontSize: 34, lineHeight: 1, fontWeight: 800, color: theme.heading }}>
                    $8,420
                  </div>
                  <DeltaBadge delta={12.4} />
                </div>
              </div>
              <button type="button" className="ghost" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <RefreshCcw size={14} />
                Synced
              </button>
            </div>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.accent} stopOpacity={0.24} />
                      <stop offset="95%" stopColor={theme.accent} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" tick={false} axisLine={false} tickLine={false} height={8} />
                  <Tooltip
                    cursor={{ stroke: theme.cardBorder }}
                    contentStyle={{
                      border: `1px solid ${theme.cardBorder}`,
                      borderRadius: 8,
                      boxShadow: "0 10px 24px rgba(16, 24, 40, 0.12)",
                    }}
                    formatter={(value) => [money(value), "Revenue"]}
                  />
                  <Area type="monotone" dataKey="v" stroke={theme.accent} strokeWidth={2.5} fill="url(#revenueFill)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 6 }}>
              <div style={cardTitleStyle()}>Revenue by channel</div>
              <button type="button" className="ghost" style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 10px" }}>
                View sources
                <ArrowRight size={13} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 82px 88px 72px", gap: 12, padding: "0 0 9px", borderBottom: `1px solid ${theme.rowBorder}`, fontSize: 11, color: theme.dim, fontWeight: 700 }}>
              <span>Channel</span>
              <span style={{ textAlign: "right" }}>Visitors</span>
              <span style={{ textAlign: "right" }}>Revenue</span>
              <span style={{ textAlign: "right" }}>Share</span>
            </div>
            {CHANNELS.map((channel) => {
              const pct = (channel.revenue / maxChannelRevenue) * 100;
              return (
                <div
                  key={channel.name}
                  className="row-hover"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) 82px 88px 72px",
                    gap: 12,
                    alignItems: "center",
                    padding: "12px 0",
                    borderTop: `1px solid ${theme.rowBorder}`,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 7 }}>
                      <span style={{ fontSize: 13, fontWeight: 650, color: theme.heading }}>{channel.name}</span>
                    </div>
                    <div style={barTrackStyle()}>
                      <div style={barFillStyle(pct, channel.name.includes("ChatGPT") ? theme.teal : theme.accent)} />
                    </div>
                  </div>
                  <div className="mono" style={{ fontSize: 12.5, color: theme.muted, textAlign: "right" }}>
                    {channel.visitors.toLocaleString()}
                  </div>
                  <div className="mono" style={{ fontSize: 13, fontWeight: 750, color: theme.heading, textAlign: "right" }}>
                    {money(channel.revenue)}
                  </div>
                  <div className="mono" style={{ fontSize: 12.5, color: theme.muted, textAlign: "right" }}>
                    {Math.round((channel.revenue / 8420) * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 7 }}>
              <CreditCard size={14} />
              Recent revenue
            </div>
            {RECENT_SALES.map((sale, index) => (
              <div
                key={`${sale.plan}-${sale.time}-${index}`}
                className="row-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) auto",
                  gap: 12,
                  alignItems: "center",
                  padding: "10px 0",
                  borderTop: index === 0 ? "none" : `1px solid ${theme.rowBorder}`,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 650, color: theme.heading }}>{sale.plan}</div>
                  <div style={{ fontSize: 12, color: theme.muted, marginTop: 3 }}>
                    {sale.channel} · {sale.country} · {sale.time}
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 800, color: sale.amount < 0 ? theme.red : theme.green }}>
                  {money(sale.amount)}
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 7 }}>
              <TrendingUp size={14} />
              Signals
            </div>
            <InsightRow label="Top source" detail={`${topChannel.visitors.toLocaleString()} visitors in 30 days`} value={money(topChannel.revenue)} tone={theme.green} />
            <InsightRow label="Primary funnel" detail={FUNNELS[0].name} value={`${FUNNELS[0].overallConversion}%`} />
            <InsightRow label="Refunds" detail="Refund-aware revenue enabled" value={money(grossRefunds)} tone={theme.red} />
            <InsightRow label="Conversion" detail="Visitor to first payment" value={`${conversionKpi.value}%`} />
          </div>

          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 7 }}>
              <CheckCircle2 size={14} />
              Setup health
            </div>
            {[
              ["Tracking script", "Receiving events", theme.green],
              ["Stripe", "Synced 2 min ago", theme.green],
              ["Search Console", "Connected", theme.green],
              ["Public dashboard", "Private", theme.muted],
            ].map(([label, status, color], index) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "9px 0",
                  borderTop: index === 0 ? "none" : `1px solid ${theme.rowBorder}`,
                }}
              >
                <span style={{ fontSize: 13, color: theme.heading }}>{label}</span>
                <span style={{ fontSize: 12, color, fontWeight: 700 }}>{status}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
