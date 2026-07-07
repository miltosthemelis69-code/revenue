import React from "react";
import { Trophy } from "lucide-react";
import { AB_EXPERIMENTS, money } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";
import { Status } from "./shared";

const STATUS_COLOR = { running: theme.credit, completed: theme.muted, draft: theme.faint };

export default function ExperimentsView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>A/B experiments</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Test two versions of a page against real traffic — with statistical significance, not just a coin flip.
        </p>
      </div>

      {AB_EXPERIMENTS.map((exp) => {
        const maxConv = Math.max(...exp.variants.map((v) => v.conversionRate), 0.001);
        return (
          <div key={exp.id} className="panel" style={{ padding: "18px 20px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 14.5, fontWeight: 500 }}>{exp.name}</span>
                <Status color={STATUS_COLOR[exp.status]} style={{ textTransform: "capitalize" }}>
                  {exp.status}
                </Status>
              </div>
              {exp.winner && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: theme.credit }}>
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
                      <span className="mono" style={{ color: theme.faint }}>{v.visitors.toLocaleString()} visitors</span>
                      <span className="mono" style={{ color: theme.faint }}>{v.conversions} conv.</span>
                      <span className="mono" style={{ fontWeight: 600 }}>{v.conversionRate ? v.conversionRate.toFixed(2) : "0.00"}%</span>
                      <span className="mono" style={{ color: theme.muted }}>{money(v.revenue)}</span>
                    </span>
                  </div>
                  <div style={barTrackStyle()}>
                    <div
                      style={barFillStyle(
                        (v.conversionRate / maxConv) * 100,
                        isWinner ? theme.credit : theme.lineFaint
                      )}
                    />
                  </div>
                </div>
              );
            })}

            {exp.status === "draft" && (
              <div style={{ fontSize: 12, color: theme.faint, fontStyle: "italic" }}>Not started yet — no traffic allocated.</div>
            )}
          </div>
        );
      })}
    </>
  );
}
