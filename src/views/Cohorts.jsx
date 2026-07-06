import React from "react";
import { Users, TrendingUp } from "lucide-react";
import { COHORT_ANALYSIS } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";
import { money } from "../data/mockTier1";

export default function CohortsView() {
  return (
    <>
      <div style={cardTitleStyle()}>Cohort Analysis by Acquisition Channel</div>
      {COHORT_ANALYSIS.map((cohort, idx) => (
        <div key={cohort.cohort} className="card" style={{ padding: "20px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={16} />
              <span style={{ fontSize: 15, fontWeight: 500 }}>{cohort.cohort}</span>
            </div>
            <div style={{ fontSize: 12, color: theme.dim }}>
              Cohort size: <span className="mono">{cohort.cohortSize.toLocaleString()}</span>
            </div>
          </div>

          {/* Cohort Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rowBorder}` }}>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: theme.muted, fontWeight: 500 }}>Month</th>
                  {cohort.months.map((month, mIdx) => (
                    <th key={mIdx} style={{ textAlign: "center", padding: "10px 8px", color: theme.muted, fontWeight: 500 }}>
                      {month.month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 8px", fontWeight: 500 }}>Retention %</td>
                  {cohort.months.map((month, mIdx) => (
                    <td
                      key={mIdx}
                      style={{
                        textAlign: "center",
                        padding: "12px 8px",
                        background: month.pct >= 70 ? `${theme.green}10` : month.pct >= 40 ? `${theme.accent}10` : "transparent",
                      }}
                    >
                      <span className="mono" style={{ fontWeight: 600 }}>{month.pct}%</span>
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: `1px solid ${theme.rowBorder}` }}>
                  <td style={{ padding: "12px 8px", fontWeight: 500 }}>Revenue</td>
                  {cohort.months.map((month, mIdx) => (
                    <td key={mIdx} style={{ textAlign: "center", padding: "12px 8px" }}>
                      <span className="mono">{money(month.revenue)}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}
