import React from "react";
import { Brain, Target } from "lucide-react";
import { PURCHASE_PREDICTION, money } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function PredictionsView() {
  return (
    <>
      <div style={{ marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Purchase predictions</h2>
          <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
            Who's likely to buy, ranked by behavior — so you know where to focus before they convert, not after.
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="mono" style={{ fontSize: 20, fontWeight: 600, color: theme.purple }}>{PURCHASE_PREDICTION.modelAccuracy}%</div>
          <div style={{ fontSize: 11, color: theme.dim }}>model accuracy · trained {PURCHASE_PREDICTION.lastTrained}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14 }}>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
            <Brain size={14} /> High-intent visitors right now
          </div>
          {PURCHASE_PREDICTION.highIntentVisitors.map((v, idx) => (
            <div
              key={v.visitorId}
              className="row-hover"
              style={{
                padding: "12px 4px",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span className="mono" style={{ fontSize: 12.5 }}>{v.email || v.visitorId}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11.5, color: theme.dim }}>est. {money(v.estimatedValue)}</span>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 600, color: theme.purple }}>{v.likelihood}%</span>
                </div>
              </div>
              <div style={{ ...barTrackStyle(), marginBottom: 8 }}>
                <div style={barFillStyle(v.likelihood, `linear-gradient(90deg,${theme.teal},${theme.purple})`)} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {v.signals.map((s) => (
                  <span key={s} style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 8, background: theme.surface, color: theme.muted, border: `1px solid ${theme.surfaceBorder}` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "18px 20px", height: "fit-content" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
            <Target size={14} /> What the model weighs
          </div>
          {PURCHASE_PREDICTION.topSignals.map((s) => (
            <div key={s.signal} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
                <span>{s.signal}</span>
                <span className="mono" style={{ color: theme.muted }}>{s.weight}%</span>
              </div>
              <div style={barTrackStyle()}>
                <div style={barFillStyle(s.weight * 2.5, `linear-gradient(90deg,${theme.teal},${theme.purple})`)} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: "10px 12px", background: theme.surface, borderRadius: 8, fontSize: 11.5, color: theme.dim, lineHeight: 1.5 }}>
            Trained on your own historical conversions — updates automatically as more customers convert or churn.
          </div>
        </div>
      </div>
    </>
  );
}
