import React from "react";
import { ArrowUpRight } from "lucide-react";
import { RUM_EXPERIENCE_SCORE } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

function scoreColor(status) {
  if (status === "good") return theme.credit;
  if (status === "poor") return theme.debit;
  return theme.credit;
}

export default function ExperienceView() {
  const { overall, byPage, scoreBreakdown } = RUM_EXPERIENCE_SCORE;

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Experience score</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          One number combining every real-user performance signal — measured from actual visitors, not lab tests.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 14, marginBottom: 14 }}>
        <div className="panel" style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="mono" style={{ fontSize: 44, fontWeight: 700, color: scoreColor(overall.status) }}>{overall.score}</div>
          <div style={{ fontSize: 12, color: theme.muted, marginTop: 4 }}>out of 100</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: theme.credit, marginTop: 8 }}>
            <ArrowUpRight size={13} /> {overall.change} pts vs last period
          </div>
        </div>

        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>Score breakdown</div>
          {Object.entries(scoreBreakdown).map(([key, v]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span className="mono" style={{ fontSize: 12, color: theme.muted, width: 44, textTransform: "uppercase" }}>{key}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: theme.lineFaint, overflow: "hidden" }}>
                <div style={{ width: `${v.contribution}%`, height: "100%", background: theme.credit }} />
              </div>
              <span className="mono" style={{ fontSize: 11.5, color: theme.faint, width: 90, textAlign: "right" }}>weight {v.weight}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel" style={{ padding: "18px 20px" }}>
        <div style={cardTitleStyle()}>Score by page</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 60px 70px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
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
              borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
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
