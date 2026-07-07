import React from "react";
import { Radio } from "lucide-react";
import { LIVE_VISITORS } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function LiveView() {
  const maxCount = Math.max(...LIVE_VISITORS.byCountry.map((c) => c.count));

  return (
    <>
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Live visitors</h2>
          <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
            Who's on your site right now, updated in real time.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: theme.credit }}>
          <Radio size={15} />
          <span className="mono" style={{ fontWeight: 600 }}>{LIVE_VISITORS.activeNow}</span> active now
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>By country</div>
          {/* World-map placeholder: dots sized by visitor count, positioned loosely by region */}
          <div
            style={{
              position: "relative",
              height: 160,
              background: theme.panel,
              borderRadius: 3,
              border: `1px solid ${theme.line}`,
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            {LIVE_VISITORS.byCountry.map((c) => {
              // crude lng/lat -> x/y projection just for a visual placeholder
              const x = ((c.lng + 180) / 360) * 100;
              const y = ((90 - c.lat) / 180) * 100;
              const size = 10 + (c.count / maxCount) * 22;
              return (
                <div
                  key={c.code}
                  title={`${c.code}: ${c.count} live`}
                  style={{
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: `${theme.credit}33`,
                    border: `1px solid ${theme.credit}`,
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: theme.credit }} />
                </div>
              );
            })}
          </div>

          {LIVE_VISITORS.byCountry.map((c, idx) => (
            <div
              key={c.code}
              className="row-hover"
              style={{
                display: "grid",
                gridTemplateColumns: "50px 1fr 40px",
                gap: 8,
                alignItems: "center",
                padding: "8px 4px",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
              }}
            >
              <span className="mono" style={{ fontSize: 12.5 }}>{c.code}</span>
              <div style={barTrackStyle()}>
                <div style={barFillStyle((c.count / maxCount) * 100, theme.credit)} />
              </div>
              <span className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{c.count}</span>
            </div>
          ))}
        </div>

        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>Live activity feed</div>
          {LIVE_VISITORS.recentActivity.map((a, idx) => (
            <div
              key={idx}
              className="row-hover"
              style={{
                padding: "11px 4px",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="mono" style={{ fontSize: 13 }}>{a.page}</span>
                <span style={{ fontSize: 11.5, color: theme.faint }}>{a.time}</span>
              </div>
              <div style={{ fontSize: 11.5, color: theme.muted, marginTop: 3 }}>
                {a.country} · from {a.referrer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
