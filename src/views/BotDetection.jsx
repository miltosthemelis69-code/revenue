import React from "react";
import { Robot, AlertTriangle, Clock } from "lucide-react";
import { BOT_TRAFFIC } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function BotDetectionView() {
  const maxBotRate = Math.max(...BOT_TRAFFIC.map((page) => page.botRate));

  return (
    <>
      <div style={cardTitleStyle()}>Bot / AI-Crawler Traffic Detection</div>
      {BOT_TRAFFIC.map((page, idx) => (
        <div key={page.page} className="card" style={{ padding: "20px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Robot size={16} />
              <span style={{ fontSize: 15, fontWeight: 500 }}>{page.page}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: theme.muted }}>
                {page.totalVisits.toLocaleString()} total visits
              </span>
              <span
                style={{
                  fontSize: 12,
                  padding: "4px 8px",
                  borderRadius: 4,
                  background: page.botRate > 15 ? `${theme.red}15` : page.botRate > 10 ? `${theme.accent}15` : `${theme.green}15`,
                  color: page.botRate > 15 ? theme.red : page.botRate > 10 ? theme.accent : theme.green,
                  fontWeight: 600,
                }}
              >
                {page.botRate}% bots
              </span>
            </div>
          </div>

          <div style={barTrackStyle()}>
            <div style={barFillStyle((page.botRate / maxBotRate) * 100, page.botRate > 15 ? theme.red : page.botRate > 10 ? theme.accent : theme.green)} />
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 12 }}>Detected bots</div>
            {page.bots.map((bot, bIdx) => (
              <div
                key={bIdx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderTop: bIdx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <AlertTriangle size={14} color={theme.muted} />
                  <span style={{ fontSize: 13 }}>{bot.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span className="mono" style={{ fontSize: 13 }}>
                    {bot.visits} visits
                  </span>
                  <span style={{ fontSize: 12, color: theme.muted, display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={12} />
                    {bot.lastSeen}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
