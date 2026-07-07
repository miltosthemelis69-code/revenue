import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { RUM_EXPERIENCE_SCORE } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

function scoreColor(status) {
  if (status === "good") return theme.green;
  if (status === "poor") return theme.red;
  return theme.accent;
}

export default function ExperienceView() {
  const { overall, byPage, scoreBreakdown } = RUM_EXPERIENCE_SCORE;

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Experience score</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          One number combining every real-user performance signal — measured from actual visitors, not lab tests.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 14, marginBottom: 14 }}>
        <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="mono" style={{ fontSize: 44, fontWeight: 700, color: scoreColor(overall.status) }}>{overall.score}</div>
          <div style={{ fontSize: 12, color: theme.muted, marginTop: 4 }}>out of 100</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: theme.green, marginTop: 8 }}>
            <ArrowUpRight size={13} /> {overall.change} pts vs last period
          </div>
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={14} /> Score breakdown
          </div>
          {Object.entries(scoreBreakdown).map(([key, v]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span className="mono" style={{ fontSize: 12, color: theme.muted, width: 44, textTransform: "uppercase" }}>{key}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: theme.rowBorder, overflow: "hidden" }}>
                <div style={{ width: `${v.contribution}%`, height: "100%", background: `linear-gradient(90deg,${theme.teal},${theme.accent})` }} />
              </div>
              <span className="mono" style={{ fontSize: 11.5, color: theme.dim, width: 90, textAlign: "right" }}>weight {v.weight}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={cardTitleStyle()}>Score by page</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 60px 70px", gap: 8, fontSize: 11, color: theme.dim, padding: "0 4px 8px", borderBottom: `1px solid ${theme.rowBorder}` }}>
          <span>Page</span>
          <span style={{ textAlign: "right" }}>LCP</span>
          <span style={{ textAlign: "right" }}>INP</span>
          <span style={{ textAlign: "right" }}>CLS</span>
          <span style={{ textAlign: "right" }}>Score</span>
        </div>
        {byPage.map((p, idx) => (
          <div
            key={p.path}
            className="row-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 60px 60px 60px 70px",
              gap: 8,
              alignItems: "center",
              padding: "10px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
            }}
          >
            <div className="mono" style={{ fontSize: 13 }}>{p.path}</div>
            <div className="mono" style={{ fontSize: 12, textAlign: "right", color: theme.muted }}>{p.lcp}s</div>
            <div className="mono" style={{ fontSize: 12, textAlign: "right", color: theme.muted }}>{p.inp}ms</div>
            <div className="mono" style={{ fontSize: 12, textAlign: "right", color: theme.muted }}>{p.cls}</div>
            <div className="mono" style={{ fontSize: 13, textAlign: "right", fontWeight: 600, color: scoreColor(p.status) }}>{p.score}</div>
          </div>
        ))}
      </div>
    </>
  );
}
