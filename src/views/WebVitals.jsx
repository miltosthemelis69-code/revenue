import React from "react";
import { WEB_VITALS, WEB_VITALS_BY_PAGE } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";
import { Status } from "./shared";

function VitalCard({ label, value, unit, status, threshold }) {
  const isGood = status === "good";
  const isPoor = status === "poor";
  const statusColor = isGood ? theme.credit : isPoor ? theme.debit : theme.muted;

  return (
    <div style={{ background: theme.bg, borderRadius: 3, padding: "14px 16px", border: `1px solid ${theme.lineFaint}` }}>
      <div style={{ fontSize: 11, color: theme.muted, marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span className="mono" style={{ fontSize: 24, fontWeight: 600 }}>{value}</span>
        <span style={{ fontSize: 13, color: theme.muted }}>{unit}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <Status color={statusColor}>
          {isGood ? "Good" : isPoor ? "Poor" : "Needs improvement"}
        </Status>
        <span style={{ fontSize: 10, color: theme.faint }}>Target: {threshold}{unit}</span>
      </div>
    </div>
  );
}

export default function WebVitalsView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Web Vitals</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Core Web Vitals — Google's performance metrics for user experience. Measured from real visitors.
        </p>
      </div>

      <div style={{ ...cardTitleStyle(), marginBottom: 12 }}>Site-wide averages</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
        <VitalCard {...WEB_VITALS.lcp} />
        <VitalCard {...WEB_VITALS.inp} />
        <VitalCard {...WEB_VITALS.cls} />
        <VitalCard {...WEB_VITALS.fcp} />
        <VitalCard {...WEB_VITALS.ttfb} />
      </div>

      <div className="panel" style={{ padding: "18px 20px" }}>
        <div style={cardTitleStyle()}>Performance by page</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 70px 70px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
          <span>Page</span>
          <span style={{ textAlign: "right" }}>LCP</span>
          <span style={{ textAlign: "right" }}>INP</span>
          <span style={{ textAlign: "right" }}>CLS</span>
          <span style={{ textAlign: "right" }}>Status</span>
        </div>
        {WEB_VITALS_BY_PAGE.map((page, idx) => (
          <div
            key={page.path}
            className="row-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 70px 70px 70px 70px",
              gap: 8,
              alignItems: "center",
              padding: "11px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
            }}
          >
            <div className="mono" style={{ fontSize: 13 }}>{page.path}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{page.lcp}s</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{page.inp}ms</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{page.cls}</div>
            <div style={{ textAlign: "right" }}>
              <Status
                color={page.status === "good" ? theme.credit : page.status === "poor" ? theme.debit : theme.muted}
                style={{ justifyContent: "flex-end" }}
              >
                {page.status === "good" ? "Good" : page.status === "poor" ? "Poor" : "Needs work"}
              </Status>
            </div>
          </div>
        ))}
      </div>

      <div className="panel" style={{ padding: "16px 18px", marginTop: 14, fontSize: 12.5, color: theme.muted }}>
        <strong>About Core Web Vitals:</strong> These are the metrics Google uses to measure user experience. LCP measures loading performance, INP measures interactivity, and CLS measures visual stability. Good scores help with SEO rankings.
      </div>
    </>
  );
}
