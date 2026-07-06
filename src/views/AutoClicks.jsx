import React from "react";
import { MousePointer2, Zap } from "lucide-react";
import { AUTO_CLICKS } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function AutoClicksView() {
  const maxClicks = Math.max(...AUTO_CLICKS.map((c) => c.clicks));

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Auto-captured clicks</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Every clickable element is tracked automatically — no manual tagging required.
        </p>
      </div>

      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
          <Zap size={14} /> Top clicks
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 80px 70px", gap: 8, fontSize: 11, color: theme.dim, padding: "0 4px 8px", borderBottom: `1px solid ${theme.rowBorder}` }}>
          <span>Element</span>
          <span style={{ textAlign: "right" }}>Clicks</span>
          <span style={{ textAlign: "right" }}>Unique</span>
          <span style={{ textAlign: "right" }}>Conv.</span>
          <span style={{ textAlign: "right" }}>To sale</span>
        </div>
        {AUTO_CLICKS.map((click, idx) => (
          <div
            key={click.selector}
            className="row-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 90px 90px 80px 70px",
              gap: 8,
              alignItems: "center",
              padding: "12px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
            }}
          >
            <div>
              <div style={{ fontSize: 13.5 }}>{click.text}</div>
              <div className="mono" style={{ fontSize: 11, color: theme.dim, marginTop: 2 }}>{click.selector}</div>
              <div style={{ ...barTrackStyle(), marginTop: 6 }}>
                <div style={barFillStyle((click.clicks / maxClicks) * 100)} />
              </div>
            </div>
            <div className="mono" style={{ fontSize: 13, textAlign: "right" }}>{click.clicks.toLocaleString()}</div>
            <div className="mono" style={{ fontSize: 13, textAlign: "right", color: theme.muted }}>{click.unique.toLocaleString()}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right", color: theme.muted }}>{click.conversionToSale}%</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right", color: click.conversionToSale > 20 ? theme.green : theme.muted }}>
              {click.conversionToSale > 20 ? "High" : "Normal"}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: "16px 18px", marginTop: 14, fontSize: 12.5, color: theme.muted }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <MousePointer2 size={14} />
          <strong>How it works</strong>
        </div>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          The tracking script automatically captures all click events on your site. No need to add <span className="mono">onClick</span> handlers manually.
          Elements are identified by their CSS selector and text content for easy filtering.
        </p>
      </div>
    </>
  );
}
