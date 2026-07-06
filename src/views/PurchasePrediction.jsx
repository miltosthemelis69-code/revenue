import React from "react";
import { Brain, TrendingUp, AlertCircle, CheckCircle, Mail } from "lucide-react";
import { PURCHASE_PREDICTION } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";
import { money } from "../data/mockTier1";

export default function PurchasePredictionView() {
  return (
    <>
      {/* Model Info */}
      <div className="card" style={{ padding: "20px", marginBottom: 20 }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
          <Brain size={16} />
          Purchase Likelihood Prediction
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 4 }}>Model accuracy</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 600, color: theme.green }}>
              {PURCHASE_PREDICTION.modelAccuracy}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 4 }}>Last trained</div>
            <div style={{ fontSize: 14 }}>{PURCHASE_PREDICTION.lastTrained}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* High-Intent Visitors */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={16} />
            High-Intent Visitors
          </div>
          {PURCHASE_PREDICTION.highIntentVisitors.map((visitor, idx) => (
            <div
              key={visitor.visitorId}
              style={{
                padding: "14px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {visitor.email ? <Mail size={14} color={theme.muted} /> : <AlertCircle size={14} color={theme.muted} />}
                  <span style={{ fontSize: 13, fontWeight: 500 }}>
                    {visitor.email || "Anonymous"}
                  </span>
                </div>
                <div className="mono" style={{ fontSize: 16, fontWeight: 600, color: theme.green }}>
                  {visitor.likelihood}%
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {visitor.signals.map((signal, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      fontSize: 11,
                      padding: "4px 8px",
                      background: theme.surface,
                      borderRadius: 4,
                      color: theme.muted,
                    }}
                  >
                    {signal}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: 12, color: theme.dim }}>
                Est. value: <span className="mono">{money(visitor.estimatedValue)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Signals */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={cardTitleStyle()}>Top Predictive Signals</div>
          {PURCHASE_PREDICTION.topSignals.map((signal, idx) => (
            <div
              key={idx}
              style={{
                padding: "14px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{signal.signal}</span>
                <span className="mono" style={{ fontSize: 14, fontWeight: 600 }}>
                  {signal.weight}%
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 6px",
                    borderRadius: 3,
                    background:
                      signal.impact === "high"
                        ? `${theme.green}20`
                        : signal.impact === "medium"
                        ? `${theme.accent}20`
                        : theme.surface,
                    color:
                      signal.impact === "high"
                        ? theme.green
                        : signal.impact === "medium"
                        ? theme.accent
                        : theme.muted,
                    textTransform: "capitalize",
                  }}
                >
                  {signal.impact}
                </span>
                <span style={{ fontSize: 11, color: theme.muted }}>impact</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
