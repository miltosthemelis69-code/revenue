import React from "react";
import { TrendingUp } from "lucide-react";
import { COHORT_ANALYSIS, money } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

export default function CohortsView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Cohorts & channel LTV</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Group customers by how they first found you, then watch how each group's revenue actually holds up over time —
          not just what they were worth on day one.
        </p>
      </div>

      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
          <TrendingUp size={14} /> Retained revenue by acquisition channel
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", gap: 4, fontSize: 10.5, color: theme.dim, padding: "0 4px 10px" }}>
          <span>Channel</span>
          {COHORT_ANALYSIS[0].months.map((m) => (
            <span key={m.month} style={{ textAlign: "center" }}>{m.month.replace("Month ", "M")}</span>
          ))}
        </div>

        {COHORT_ANALYSIS.map((cohort, ridx) => (
          <div key={cohort.cohort} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 13.5 }}>{cohort.cohort}</span>
              <span style={{ fontSize: 11.5, color: theme.dim }}>{cohort.cohortSize.toLocaleString()} customers in cohort</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: theme.muted }}>% retained</span>
              {cohort.months.map((m) => {
                // color scale: green (high retention) fading to dim red-ish as it drops
                const heat = m.pct / 100;
                const bg = `rgba(125, 227, 168, ${0.12 + heat * 0.55})`;
                return (
                  <div
                    key={m.month}
                    title={`${m.month}: ${m.pct}% retained · ${money(m.revenue)} revenue`}
                    style={{
                      textAlign: "center",
                      padding: "8px 2px",
                      borderRadius: 6,
                      background: bg,
                      fontSize: 11.5,
                    }}
                    className="mono"
                  >
                    {m.pct}%
                  </div>
                );
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", gap: 4, alignItems: "center", marginTop: 3 }}>
              <span></span>
              {cohort.months.map((m) => (
                <div key={m.month} className="mono" style={{ textAlign: "center", fontSize: 10.5, color: theme.dim }}>
                  {money(m.revenue)}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 6, padding: "12px 14px", background: theme.surface, borderRadius: 8, fontSize: 12, color: theme.muted, lineHeight: 1.5 }}>
          <strong>Reading this:</strong> Product Hunt customers actually retain better by Month 5 (38%) than Twitter/X customers (28%),
          even though Twitter brought in more total revenue on Day 0. Google's organic customers retain worst of the three (22%) despite
          bringing in the most raw visitors — a channel that looks strong on signups alone can still be the weakest long-term bet.
        </div>
      </div>
    </>
  );
}
