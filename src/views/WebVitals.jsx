import React from "react";
import { Gauge, Activity } from "lucide-react";
import { WEB_VITALS, WEB_VITALS_BY_PAGE } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

function VitalCard({ label, value, unit, status, threshold }) {
  const isGood = status === "good";
  const isPoor = status === "poor";
  const statusColor = isGood ? theme.green : isPoor ? theme.red : theme.accent;
  
  return (
    <div style={{ background: theme.surface, borderRadius: 8, padding: "14px 16px", border: `1px solid ${theme.surfaceBorder}` }}>
      <div style={{ fontSize: 11, color: theme.muted, marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span className="mono" style={{ fontSize: 24, fontWeight: 600 }}>{value}</span>
        <span style={{ fontSize: 13, color: theme.muted }}>{unit}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor }} />
        <span style={{ fontSize: 11, color: statusColor, fontWeight: 500 }}>
          {isGood ? "Good" : isPoor ? "Poor" : "Needs improvement"}
        </span>
        <span style={{ fontSize: 10, color: theme.dim, marginLeft: "auto" }}>Target: {threshold}{unit}</span>
      </div>
    </div>
  );
}

export default function WebVitalsView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Web Vitals</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Core Web Vitals — Google's performance metrics for user experience. Measured from real visitors.
        </p>
      </div>

      <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
        <Gauge size={14} /> Site-wide averages
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
        <VitalCard {...WEB_VITALS.lcp} />
        <VitalCard {...WEB_VITALS.inp} />
        <VitalCard {...WEB_VITALS.cls} />
        <VitalCard {...WEB_VITALS.fcp} />
        <VitalCard {...WEB_VITALS.ttfb} />
      </div>

      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
          <Activity size={14} /> Performance by page
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 70px 70px", gap: 8, fontSize: 11, color: theme.dim, padding: "0 4px 8px", borderBottom: `1px solid ${theme.rowBorder}` }}>
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
              borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
            }}
          >
            <div className="mono" style={{ fontSize: 13 }}>{page.path}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{page.lcp}s</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{page.inp}ms</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{page.cls}</div>
            <div style={{ textAlign: "right" }}>
              <span style={{ 
                fontSize: 11, 
                padding: "3px 8px", 
                borderRadius: 10, 
                background: page.status === "good" ? `${theme.green}20` : page.status === "poor" ? `${theme.red}20` : `${theme.accent}20`,
                color: page.status === "good" ? theme.green : page.status === "poor" ? theme.red : theme.accent,
                fontWeight: 500
              }}>
                {page.status === "good" ? "Good" : page.status === "poor" ? "Poor" : "Needs work"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: "16px 18px", marginTop: 14, fontSize: 12.5, color: theme.muted }}>
        <strong>About Core Web Vitals:</strong> These are the metrics Google uses to measure user experience. LCP measures loading performance, INP measures interactivity, and CLS measures visual stability. Good scores help with SEO rankings.
      </div>
    </>
  );
}
