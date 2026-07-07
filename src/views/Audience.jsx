import React from "react";
import { DEVICES, BROWSERS, OPERATING_SYSTEMS, COUNTRIES, money } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

function BreakdownCard({ title, items, showPct = true }) {
  const max = Math.max(...items.map((i) => i.visits || i.pct));
  return (
    <div className="panel" style={{ padding: "18px 20px" }}>
      <div style={cardTitleStyle()}>{title}</div>
      {items.map((item, idx) => (
        <div
          key={item.label}
          className="row-hover"
          style={{
            padding: "10px 4px",
            borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 6 }}>
            <span>{item.label}</span>
            <span className="mono" style={{ color: theme.muted }}>
              {showPct ? `${item.pct}%` : item.visits?.toLocaleString()}
            </span>
          </div>
          <div style={barTrackStyle()}>
            <div style={barFillStyle(((item.visits || item.pct) / max) * 100)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AudienceView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Audience</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Device, browser, OS, and country — read from the visitor&apos;s browser automatically.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 14 }}>
        <BreakdownCard title="Devices" items={DEVICES} />
        <BreakdownCard title="Browsers" items={BROWSERS} />
        <BreakdownCard title="Operating systems" items={OPERATING_SYSTEMS} />
      </div>

      <div className="panel" style={{ padding: "18px 20px" }}>
        <div style={cardTitleStyle()}>Countries</div>
        <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 60px 80px 80px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
          <span />
          <span>Country</span>
          <span style={{ textAlign: "right" }}>Share</span>
          <span style={{ textAlign: "right" }}>Visits</span>
          <span style={{ textAlign: "right" }}>Revenue</span>
        </div>
        {COUNTRIES.map((c, idx) => (
          <div
            key={c.code}
            className="row-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 60px 80px 80px",
              gap: 8,
              alignItems: "center",
              padding: "10px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
            }}
          >
            <span className="mono" style={{ fontSize: 11, color: theme.faint }}>{c.code}</span>
            <div>
              <div style={{ fontSize: 13.5 }}>{c.label}</div>
              <div style={{ ...barTrackStyle(), marginTop: 6, maxWidth: 280 }}>
                <div style={barFillStyle(c.pct, theme.credit)} />
              </div>
            </div>
            <div className="mono" style={{ textAlign: "right", fontSize: 12.5, color: theme.muted }}>{c.pct}%</div>
            <div className="mono" style={{ textAlign: "right", fontSize: 13 }}>{c.visits.toLocaleString()}</div>
            <div className="mono" style={{ textAlign: "right", fontSize: 13, fontWeight: 600 }}>{money(c.revenue)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
