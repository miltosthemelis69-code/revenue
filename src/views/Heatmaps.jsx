import React, { useState } from "react";
import { Flame, MousePointer2, ArrowDownWideNarrow } from "lucide-react";
import { HEATMAPS } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

function DotOverlay(points, colorFn) {
  return points.map((p, idx) => (
    <div
      key={idx}
      title={`${p.element}${p.clicks ? ` — ${p.clicks} clicks` : ""}`}
      style={{
        position: "absolute",
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: 14 + p.intensity * 0.3,
        height: 14 + p.intensity * 0.3,
        borderRadius: "50%",
        background: colorFn(p.intensity),
        transform: "translate(-50%, -50%)",
        filter: "blur(1px)",
      }}
    />
  ));
}

export default function HeatmapsView() {
  const [mode, setMode] = useState("click");

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Heatmaps</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Where people click, scroll to, and move their mouse on <span className="mono">{HEATMAPS.page}</span> — {HEATMAPS.totalViews.toLocaleString()} views analyzed.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {["click", "scroll", "move"].map((m) => (
          <button
            key={m}
            type="button"
            className={mode === m ? "primary" : "ghost"}
            style={{ fontSize: 12, textTransform: "capitalize" }}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
            <Flame size={14} /> {mode === "click" ? "Click" : mode === "scroll" ? "Scroll" : "Mouse movement"} heatmap
          </div>

          {/* Fake page silhouette with heat dots overlaid */}
          <div
            style={{
              position: "relative",
              height: 320,
              background: theme.surface,
              border: `1px solid ${theme.surfaceBorder}`,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {/* rough page layout guides */}
            <div style={{ position: "absolute", top: "10%", left: "20%", right: "20%", height: 28, background: theme.rowBorder, borderRadius: 4 }} />
            <div style={{ position: "absolute", top: "38%", left: "10%", width: "25%", height: 60, background: theme.rowBorder, borderRadius: 4 }} />
            <div style={{ position: "absolute", top: "38%", left: "38%", width: "25%", height: 60, background: theme.rowBorder, borderRadius: 4 }} />
            <div style={{ position: "absolute", top: "38%", left: "66%", width: "25%", height: 60, background: theme.rowBorder, borderRadius: 4 }} />
            <div style={{ position: "absolute", top: "58%", left: "20%", right: "20%", height: 20, background: theme.rowBorder, borderRadius: 4 }} />
            <div style={{ position: "absolute", top: "78%", left: "20%", right: "20%", height: 16, background: theme.rowBorder, borderRadius: 4 }} />

            {mode === "click" && DotOverlay(HEATMAPS.clickHeatmap, (i) => `rgba(232,139,139,${0.15 + (i / 100) * 0.6})`)}
            {mode === "move" && DotOverlay(HEATMAPS.moveHeatmap, (i) => `rgba(242,180,65,${0.15 + (i / 100) * 0.6})`)}
            {mode === "scroll" &&
              HEATMAPS.scrollHeatmap.depth.map((d) => (
                <div
                  key={d.depth}
                  style={{
                    position: "absolute",
                    top: `${d.depth}%`,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `rgba(63,167,160,${d.pct / 100})`,
                  }}
                  title={`${d.label}: ${d.pct}% of visitors reached here`}
                />
              ))}
          </div>

          {mode === "click" && (
            <div style={{ marginTop: 12 }}>
              {HEATMAPS.clickHeatmap.map((c) => (
                <div key={c.element} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", color: theme.muted }}>
                  <span>{c.element}</span>
                  <span className="mono">{c.clicks.toLocaleString()} clicks</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
            <ArrowDownWideNarrow size={14} /> Scroll depth
          </div>
          <div className="mono" style={{ fontSize: 28, fontWeight: 600, marginBottom: 4 }}>{HEATMAPS.scrollHeatmap.avgScrollDepth}%</div>
          <div style={{ fontSize: 12, color: theme.muted, marginBottom: 16 }}>average scroll depth</div>

          {HEATMAPS.scrollHeatmap.depth.map((d) => (
            <div key={d.depth} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: theme.muted }}>{d.label}</span>
                <span className="mono">{d.pct}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: theme.rowBorder, overflow: "hidden" }}>
                <div style={{ width: `${d.pct}%`, height: "100%", background: `linear-gradient(90deg,${theme.teal},${theme.green})` }} />
              </div>
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: theme.dim, marginTop: 14 }}>
            <MousePointer2 size={12} /> Switch tabs above to see click and mouse-movement overlays
          </div>
        </div>
      </div>
    </>
  );
}
