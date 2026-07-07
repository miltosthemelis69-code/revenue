import React from "react";
import { REFERRERS, UTM_CAMPAIGNS, money } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

export default function SourcesView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Referrers & UTM</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Where visitors came from — referrer headers and UTM tags (`utm_source`, `utm_medium`, `utm_campaign`).
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>Referrers</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 80px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
            <span>Referrer</span>
            <span>Medium</span>
            <span style={{ textAlign: "right" }}>Visits</span>
            <span style={{ textAlign: "right" }}>Revenue</span>
          </div>
          {REFERRERS.map((r, idx) => (
            <div
              key={r.source + r.campaign}
              className="row-hover"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 70px 70px 80px",
                gap: 8,
                padding: "10px 4px",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
                fontSize: 13,
              }}
            >
              <div>
                <div>{r.source}</div>
                <div className="mono" style={{ fontSize: 11, color: theme.faint, marginTop: 2 }}>{r.campaign}</div>
              </div>
              <div style={{ color: theme.muted, fontSize: 12 }}>{r.medium}</div>
              <div className="mono" style={{ textAlign: "right" }}>{r.visits.toLocaleString()}</div>
              <div className="mono" style={{ textAlign: "right", fontWeight: 600 }}>{money(r.revenue)}</div>
            </div>
          ))}
        </div>

        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>UTM campaigns</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 70px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
            <span>Campaign</span>
            <span>Source</span>
            <span style={{ textAlign: "right" }}>Conv.</span>
            <span style={{ textAlign: "right" }}>Revenue</span>
          </div>
          {UTM_CAMPAIGNS.map((c, idx) => (
            <div
              key={c.campaign}
              className="row-hover"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 60px 60px 70px",
                gap: 8,
                padding: "10px 4px",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
                fontSize: 13,
              }}
            >
              <div>
                <div className="mono" style={{ fontSize: 12.5 }}>{c.campaign}</div>
                <div style={{ fontSize: 11, color: theme.faint, marginTop: 2 }}>{c.medium} · {c.visits.toLocaleString()} visits</div>
              </div>
              <div style={{ color: theme.muted, fontSize: 12 }}>{c.source}</div>
              <div className="mono" style={{ textAlign: "right" }}>{c.conversions}</div>
              <div className="mono" style={{ textAlign: "right", fontWeight: 600 }}>{money(c.revenue)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel" style={{ padding: "16px 18px", marginTop: 14, fontSize: 12.5, color: theme.muted }}>
        Example link: <span className="mono" style={{ color: theme.credit }}>statly.app/pricing?utm_source=twitter&utm_medium=social&utm_campaign=launch-thread</span>
      </div>
    </>
  );
}
