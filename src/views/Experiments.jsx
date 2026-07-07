import React from "react";
import { FlaskConical, Trophy } from "lucide-react";
import { AB_EXPERIMENTS, money } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

const STATUS_COLOR = { running: theme.green, completed: theme.teal, draft: theme.dim };

export default function ExperimentsView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>A/B experiments</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Test two versions of a page against real traffic — with statistical significance, not just a coin flip.
        </p>
      </div>

      {AB_EXPERIMENTS.map((exp) => {
        const maxConv = Math.max(...exp.variants.map((v) => v.conversionRate), 0.001);
        return (
          <div key={exp.id} className="card" style={{ padding: "18px 20px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FlaskConical size={15} color={theme.muted} />
                <span style={{ fontSize: 14.5, fontWeight: 500 }}>{exp.name}</span>
                <span
                  style={{
                    fontSize: 11,
                    padding: "3px 9px",
                    borderRadius: 10,
                    background: `${STATUS_COLOR[exp.status]}20`,
                    color: STATUS_COLOR[exp.status],
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                >
                  {exp.status}
                </span>
              </div>
              {exp.winner && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: theme.accent }}>
                  <Trophy size={13} /> {exp.winner} · +{exp.improvement}% · {exp.significance}% confidence
                </div>
              )}
            </div>

            {exp.variants.map((v) => {
              const isWinner = exp.winner === v.name;
              return (
                <div key={v.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                    <span style={{ fontWeight: isWinner ? 600 : 400, color: isWinner ? theme.text : theme.muted }}>
                      {v.name} {isWinner && "★"}
                    </span>
                    <span style={{ display: "flex", gap: 14 }}>
                      <span className="mono" style={{ color: theme.dim }}>{v.visitors.toLocaleString()} visitors</span>
                      <span className="mono" style={{ color: theme.dim }}>{v.conversions} conv.</span>
                      <span className="mono" style={{ fontWeight: 600 }}>{v.conversionRate ? v.conversionRate.toFixed(2) : "0.00"}%</span>
                      <span className="mono" style={{ color: theme.muted }}>{money(v.revenue)}</span>
                    </span>
                  </div>
                  <div style={barTrackStyle()}>
                    <div
                      style={barFillStyle(
                        (v.conversionRate / maxConv) * 100,
                        isWinner ? `linear-gradient(90deg,${theme.teal},${theme.green})` : `linear-gradient(90deg,${theme.rowBorder},${theme.muted})`
                      )}
                    />
                  </div>
                </div>
              );
            })}

            {exp.status === "draft" && (
              <div style={{ fontSize: 12, color: theme.dim, fontStyle: "italic" }}>Not started yet — no traffic allocated.</div>
            )}
          </div>
        );
      })}
    </>
  );
}
