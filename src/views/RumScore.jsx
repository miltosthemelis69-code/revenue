import React from "react";
import { Gauge, TrendingUp, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { RUM_EXPERIENCE_SCORE } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function RumScoreView() {
  const getStatusIcon = (status) => {
    switch (status) {
      case "good":
        return <CheckCircle size={14} color={theme.green} />;
      case "needs-improvement":
        return <AlertTriangle size={14} color={theme.accent} />;
      case "poor":
        return <XCircle size={14} color={theme.red} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "good":
        return theme.green;
      case "needs-improvement":
        return theme.accent;
      case "poor":
        return theme.red;
      default:
        return theme.muted;
    }
  };

  return (
    <>
      {/* Overall Score */}
      <div className="card" style={{ padding: "20px", marginBottom: 20 }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
          <Gauge size={16} />
          Overall Experience Score
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: getStatusColor(RUM_EXPERIENCE_SCORE.overall.status),
                lineHeight: 1,
              }}
            >
              {RUM_EXPERIENCE_SCORE.overall.score}
            </div>
            <div style={{ fontSize: 14, color: theme.muted, marginTop: 4 }}>/ 100</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              {getStatusIcon(RUM_EXPERIENCE_SCORE.overall.status)}
              <span style={{ fontSize: 14, fontWeight: 500, textTransform: "capitalize" }}>
                {RUM_EXPERIENCE_SCORE.overall.status}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: theme.muted }}>
              <TrendingUp size={13} />
              {RUM_EXPERIENCE_SCORE.overall.change > 0 ? "+" : ""}
              {RUM_EXPERIENCE_SCORE.overall.change}% from last week
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Score by Page */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={cardTitleStyle()}>Score by Page</div>
          {RUM_EXPERIENCE_SCORE.byPage.map((page, idx) => (
            <div
              key={page.path}
              style={{
                padding: "14px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {getStatusIcon(page.status)}
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{page.path}</span>
                </div>
                <div className="mono" style={{ fontSize: 16, fontWeight: 600, color: getStatusColor(page.status) }}>
                  {page.score}
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 11, color: theme.muted }}>
                <span>LCP: {page.lcp}s</span>
                <span>INP: {page.inp}ms</span>
                <span>CLS: {page.cls}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Score Breakdown */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={cardTitleStyle()}>Score Breakdown</div>
          {Object.entries(RUM_EXPERIENCE_SCORE.scoreBreakdown).map(([key, metric], idx) => (
            <div
              key={key}
              style={{
                padding: "14px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{key.toUpperCase()}</span>
                <span style={{ fontSize: 12, color: theme.muted }}>{metric.weight}% weight</span>
              </div>
              <div style={barTrackStyle()}>
                <div style={barFillStyle(metric.contribution)} />
              </div>
              <div style={{ fontSize: 11, color: theme.muted, marginTop: 4 }}>
                Avg: {metric.avg} · Contribution: {metric.contribution} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
