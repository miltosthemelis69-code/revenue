import React from "react";
import { CUSTOM_EVENTS, GOALS } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function EventsView() {
  const maxCount = Math.max(...CUSTOM_EVENTS.map((e) => e.count));

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 19, fontWeight: 400, margin: "0 0 6px" }}>Events & goals</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Custom events you tag in code — button clicks, sign-ups, checkout steps — plus goal completion rates.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>Custom events</div>
          {CUSTOM_EVENTS.map((e, idx) => (
            <div
              key={e.key}
              className="row-hover"
              style={{
                padding: "12px 4px",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 13.5 }}>{e.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: theme.faint, marginTop: 3 }}>
                    njv.track(&apos;{e.key}&apos;)
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{e.count.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: theme.muted }}>{e.unique.toLocaleString()} unique</div>
                </div>
              </div>
              <div style={{ ...barTrackStyle(), marginTop: 8 }}>
                <div style={barFillStyle((e.count / maxCount) * 100)} />
              </div>
              <div style={{ fontSize: 11.5, color: theme.muted, marginTop: 6 }}>
                {e.conversionToSale}% of event visitors converted to paid
              </div>
            </div>
          ))}
        </div>

        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>Goals</div>
          {GOALS.map((g, idx) => (
            <div
              key={g.target}
              style={{
                padding: "14px 4px",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 13.5 }}>{g.name}</div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{g.completed}</div>
              </div>
              <div style={barTrackStyle()}>
                <div style={barFillStyle(Math.min(g.rate * 3, 100))} />
              </div>
              <div style={{ fontSize: 11.5, color: theme.muted, marginTop: 6 }}>
                {g.rate}% of all visitors · target: <span className="mono">{g.target}</span>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 16, padding: "12px 14px", background: theme.bg, border: `1px solid ${theme.lineFaint}`, borderRadius: 3, fontSize: 12, color: theme.muted, lineHeight: 1.5 }}>
            Add tracking in your app:
            <pre className="mono" style={{ margin: "8px 0 0", fontSize: 11, color: theme.credit, whiteSpace: "pre-wrap" }}>
{`// On button click
njv.track('signup_click');

// Mark a goal
njv.goal('trial_start');`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
