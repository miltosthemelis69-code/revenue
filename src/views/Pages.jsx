import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { PAGES, PAGEVIEW_TREND, KPIS } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";
import { KpiGrid } from "./shared";

export default function PagesView() {
  const maxViews = Math.max(...PAGES.map((p) => p.views));
  const pageviewKpi = KPIS.find((k) => k.label === "Pageviews (30d)");

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Pageviews</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Every page open is counted — see which pages get traffic and how visitors engage.
        </p>
      </div>

      {pageviewKpi && (
        <KpiGrid
          columns={3}
          items={[
            pageviewKpi,
            { label: "Tracked pages", value: PAGES.length, delta: 0, format: "int" },
            { label: "Avg. time on page", value: "2m 14s", delta: 4.2, format: "text" },
          ]}
        />
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>Top pages</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 70px 60px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
            <span>Page</span>
            <span style={{ textAlign: "right" }}>Views</span>
            <span style={{ textAlign: "right" }}>Unique</span>
            <span style={{ textAlign: "right" }}>Avg time</span>
            <span style={{ textAlign: "right" }}>Bounce</span>
          </div>
          {PAGES.map((p, idx) => (
            <div
              key={p.path}
              className="row-hover"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 80px 80px 70px 60px",
                gap: 8,
                alignItems: "center",
                padding: "11px 4px",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
              }}
            >
              <div>
                <div style={{ fontSize: 13.5 }}>{p.title}</div>
                <div className="mono" style={{ fontSize: 11.5, color: theme.faint, marginTop: 2 }}>{p.path}</div>
                <div style={{ ...barTrackStyle(), marginTop: 6 }}>
                  <div style={barFillStyle((p.views / maxViews) * 100)} />
                </div>
              </div>
              <div className="mono" style={{ fontSize: 13, textAlign: "right" }}>{p.views.toLocaleString()}</div>
              <div className="mono" style={{ fontSize: 13, textAlign: "right", color: theme.muted }}>{p.unique.toLocaleString()}</div>
              <div style={{ fontSize: 12.5, textAlign: "right", color: theme.muted }}>{p.avgTime}</div>
              <div style={{ fontSize: 12.5, textAlign: "right", color: theme.muted }}>{p.bounce}%</div>
            </div>
          ))}
        </div>

        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>Pageview trend (14d)</div>
          <div style={{ height: 180, marginTop: 8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PAGEVIEW_TREND}>
                <Line type="monotone" dataKey="views" stroke={theme.credit} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: 16, fontSize: 12.5, color: theme.muted, lineHeight: 1.5 }}>
            Total pageviews include repeat visits. Unique counts dedupe by visitor per day.
          </div>
        </div>
      </div>
    </>
  );
}
