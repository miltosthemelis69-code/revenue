import React from "react";
import { Flame, MousePointer2, ArrowDown } from "lucide-react";
import { HEATMAPS } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function HeatmapsView() {
  return (
    <>
      <div style={cardTitleStyle()}>Heatmaps</div>
      <div style={{ fontSize: 12, color: theme.muted, marginBottom: 20 }}>
        Page: <span style={{ fontWeight: 500, color: theme.text }}>{HEATMAPS.page}</span> · {HEATMAPS.totalViews.toLocaleString()} total views
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Click Heatmap */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
            <MousePointer2 size={16} />
            Click Heatmap
          </div>
          <div
            style={{
              marginTop: 16,
              height: 200,
              background: theme.surface,
              borderRadius: 8,
              border: `1px solid ${theme.surfaceBorder}`,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center", color: theme.muted, fontSize: 12 }}>
              Click heatmap visualization
            </div>
            {HEATMAPS.clickHeatmap.map((spot, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: `rgba(239, 68, 68, ${spot.intensity / 100})`,
                  transform: "translate(-50%, -50%)",
                  filter: "blur(8px)",
                }}
                title={`${spot.element}: ${spot.clicks} clicks`}
              />
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            {HEATMAPS.clickHeatmap.map((spot, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
                }}
              >
                <span style={{ fontSize: 13 }}>{spot.element}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="mono" style={{ fontSize: 13 }}>{spot.clicks} clicks</span>
                  <span style={{ fontSize: 12, color: theme.muted }}>{spot.intensity}% intensity</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Heatmap */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
            <ArrowDown size={16} />
            Scroll Heatmap
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 12 }}>
              Average scroll depth: <span className="mono" style={{ fontWeight: 600 }}>{HEATMAPS.scrollHeatmap.avgScrollDepth}%</span>
            </div>
            {HEATMAPS.scrollHeatmap.depth.map((depth, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 13 }}>{depth.label}</span>
                  <span className="mono" style={{ fontSize: 13 }}>{depth.pct}% reached</span>
                </div>
                <div style={barTrackStyle()}>
                  <div style={barFillStyle(depth.pct)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Movement Heatmap */}
      <div className="card" style={{ padding: "20px", marginTop: 20 }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
          <Flame size={16} />
          Movement Heatmap
        </div>
        <div
          style={{
            marginTop: 16,
            height: 150,
            background: theme.surface,
            borderRadius: 8,
            border: `1px solid ${theme.surfaceBorder}`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", color: theme.muted, fontSize: 12 }}>
            Mouse movement heatmap visualization
          </div>
          {HEATMAPS.moveHeatmap.map((spot, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: `rgba(249, 115, 22, ${spot.intensity / 100})`,
                transform: "translate(-50%, -50%)",
                filter: "blur(12px)",
              }}
              title={spot.element}
            />
          ))}
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
          {HEATMAPS.moveHeatmap.map((spot, idx) => (
            <div key={idx} style={{ fontSize: 12, color: theme.muted }}>
              {spot.element}: <span className="mono">{spot.intensity}%</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
