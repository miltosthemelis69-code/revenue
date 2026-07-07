import React from "react";
import { Filter, TrendingDown } from "lucide-react";
import { FUNNELS } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

function FunnelCard({ funnel }) {
  const maxCount = Math.max(...funnel.steps.map((s) => s.count));

  return (
    <div className="panel" style={{ padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{funnel.name}</div>
        <div style={{ fontSize: 12, color: theme.muted }}>
          <span className="mono" style={{ color: theme.credit, fontWeight: 600 }}>{funnel.overallConversion}%</span> overall conversion
        </div>
      </div>

      {funnel.steps.map((step, idx) => (
        <div
          key={step.name}
          style={{
            marginBottom: idx === funnel.steps.length - 1 ? 0 : 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ fontSize: 13.5 }}>{step.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="mono" style={{ fontSize: 13 }}>{step.count.toLocaleString()}</div>
              {step.dropoff > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: theme.debit }}>
                  <TrendingDown size={12} />
                  <span className="mono">-{step.dropoff}%</span>
                </div>
              )}
            </div>
          </div>
          <div style={barTrackStyle()}>
            <div style={barFillStyle((step.count / maxCount) * 100)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FunnelsView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Funnels</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Track conversion sequences — see where visitors drop off in your key flows.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {FUNNELS.map((funnel) => (
          <FunnelCard key={funnel.name} funnel={funnel} />
        ))}
      </div>

      <div className="panel" style={{ padding: "16px 18px", marginTop: 14, fontSize: 12.5, color: theme.muted }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Filter size={14} />
          <strong>Creating funnels</strong>
        </div>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Funnels are built from events you're already tracking. Define a sequence like <span className="mono">pricing_page_view → signup_click → account_created → first_payment</span> to see drop-off at each step.
        </p>
      </div>
    </>
  );
}
