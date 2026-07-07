import React from "react";
import { Bot } from "lucide-react";
import { BOT_TRAFFIC } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function BotTrafficView() {
  const totalBotVisits = BOT_TRAFFIC.reduce((sum, p) => sum + p.botVisits, 0);
  const totalVisits = BOT_TRAFFIC.reduce((sum, p) => sum + p.totalVisits, 0);

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Bot & AI-crawler traffic</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Requests from known crawlers (ChatGPT, Googlebot, ClaudeBot, GPTBot) — kept separate from real human visitors.
        </p>
      </div>

      <div className="card" style={{ padding: "16px 20px", marginBottom: 14, display: "flex", gap: 32 }}>
        <div>
          <div style={{ fontSize: 11, color: theme.dim }}>Total bot visits</div>
          <div className="mono" style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>{totalBotVisits.toLocaleString()}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: theme.dim }}>Site-wide bot rate</div>
          <div className="mono" style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>{((totalBotVisits / totalVisits) * 100).toFixed(1)}%</div>
        </div>
      </div>

      {BOT_TRAFFIC.map((page) => (
        <div key={page.page} className="card" style={{ padding: "18px 20px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Bot size={14} color={theme.muted} />
              <span className="mono" style={{ fontSize: 13.5 }}>{page.page}</span>
            </div>
            <span style={{ fontSize: 12, color: theme.muted }}>
              {page.botVisits.toLocaleString()} / {page.totalVisits.toLocaleString()} visits ·{" "}
              <span style={{ color: page.botRate > 15 ? theme.orange : theme.muted, fontWeight: 600 }}>{page.botRate}% bot</span>
            </span>
          </div>
          <div style={{ ...barTrackStyle(), marginBottom: 12 }}>
            <div style={barFillStyle(page.botRate, `linear-gradient(90deg,${theme.orange},${theme.red})`)} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {page.bots.map((b) => (
              <div
                key={b.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  background: theme.surface,
                  border: `1px solid ${theme.surfaceBorder}`,
                  borderRadius: 7,
                  fontSize: 12,
                }}
              >
                <span>{b.name}</span>
                <span className="mono" style={{ color: theme.muted }}>{b.visits}</span>
                <span style={{ color: theme.dim, fontSize: 10.5 }}>· {b.lastSeen}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
