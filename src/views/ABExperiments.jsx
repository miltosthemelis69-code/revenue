import React from "react";
import { FlaskConical, Play, CheckCircle, Clock, Plus, TrendingUp } from "lucide-react";
import { AB_EXPERIMENTS } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";
import { money } from "../data/mockTier1";

export default function ABExperimentsView() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "running":
        return (
          <span
            style={{
              fontSize: 11,
              padding: "4px 8px",
              borderRadius: 4,
              background: `${theme.green}20`,
              color: theme.green,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Play size={10} fill={theme.green} />
            Running
          </span>
        );
      case "completed":
        return (
          <span
            style={{
              fontSize: 11,
              padding: "4px 8px",
              borderRadius: 4,
              background: `${theme.accent}20`,
              color: theme.accent,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <CheckCircle size={10} />
            Completed
          </span>
        );
      case "draft":
        return (
          <span
            style={{
              fontSize: 11,
              padding: "4px 8px",
              borderRadius: 4,
              background: theme.surface,
              color: theme.muted,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Clock size={10} />
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FlaskConical size={16} />
          A/B Experiments
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            fontSize: 12,
            background: theme.surface,
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: 6,
            cursor: "pointer",
            color: theme.text,
          }}
        >
          <Plus size={13} />
          New experiment
        </button>
      </div>

      {AB_EXPERIMENTS.map((experiment, idx) => (
        <div key={experiment.id} className="card" style={{ padding: "20px", marginBottom: 20 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{experiment.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: theme.dim }}>
                <span>Started: {experiment.started}</span>
                {experiment.ended && <span>Ended: {experiment.ended}</span>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {getStatusBadge(experiment.status)}
              {experiment.winner && (
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: theme.muted }}>Winner</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.green }}>{experiment.winner}</div>
                </div>
              )}
            </div>
          </div>

          {/* Variants */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 12 }}>Variants</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${theme.rowBorder}` }}>
                    <th style={{ textAlign: "left", padding: "10px 8px", color: theme.muted, fontWeight: 500 }}>Variant</th>
                    <th style={{ textAlign: "right", padding: "10px 8px", color: theme.muted, fontWeight: 500 }}>Visitors</th>
                    <th style={{ textAlign: "right", padding: "10px 8px", color: theme.muted, fontWeight: 500 }}>Conversions</th>
                    <th style={{ textAlign: "right", padding: "10px 8px", color: theme.muted, fontWeight: 500 }}>Conv. Rate</th>
                    <th style={{ textAlign: "right", padding: "10px 8px", color: theme.muted, fontWeight: 500 }}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {experiment.variants.map((variant, vIdx) => (
                    <tr
                      key={vIdx}
                      style={{
                        background: variant.name === experiment.winner ? `${theme.green}10` : "transparent",
                      }}
                    >
                      <td style={{ padding: "12px 8px", fontWeight: 500 }}>
                        {variant.name}
                        {variant.name === experiment.winner && (
                          <CheckCircle size={12} color={theme.green} style={{ marginLeft: 6, verticalAlign: "middle" }} />
                        )}
                      </td>
                      <td style={{ textAlign: "right", padding: "12px 8px" }} className="mono">
                        {variant.visitors.toLocaleString()}
                      </td>
                      <td style={{ textAlign: "right", padding: "12px 8px" }} className="mono">
                        {variant.conversions.toLocaleString()}
                      </td>
                      <td style={{ textAlign: "right", padding: "12px 8px" }} className="mono">
                        {variant.conversionRate.toFixed(2)}%
                      </td>
                      <td style={{ textAlign: "right", padding: "12px 8px" }} className="mono">
                        {money(variant.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats */}
          {experiment.significance && (
            <div style={{ display: "flex", gap: 24, padding: "12px", background: theme.surface, borderRadius: 6 }}>
              <div>
                <div style={{ fontSize: 11, color: theme.muted, marginBottom: 4 }}>Statistical significance</div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{experiment.significance}%</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: theme.muted, marginBottom: 4 }}>Improvement</div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: theme.green }}>
                  <TrendingUp size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />
                  {experiment.improvement}%
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
