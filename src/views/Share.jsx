import React, { useState } from "react";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { SHARE_CONFIG, CHANNELS, KPIS, fmtKpi } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function ShareView() {
  const [copied, setCopied] = useState(false);
  const [showRevenue, setShowRevenue] = useState(SHARE_CONFIG.showRevenue);
  const [showChannels, setShowChannels] = useState(SHARE_CONFIG.showChannels);
  const [showLive, setShowLive] = useState(SHARE_CONFIG.showLiveCount);
  const [enabled, setEnabled] = useState(SHARE_CONFIG.enabled);

  const maxRev = Math.max(...CHANNELS.map((c) => c.revenue));

  function copyLink() {
    navigator.clipboard?.writeText(SHARE_CONFIG.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Public dashboard</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Share a read-only link for build-in-public — no login required for viewers.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="panel" style={{ padding: "18px 20px" }}>
            <div style={cardTitleStyle()}>Share link</div>

            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, marginBottom: 16, cursor: "pointer" }}>
              <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
              Public dashboard enabled
            </label>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input value={SHARE_CONFIG.url} readOnly style={{ flex: 1, opacity: enabled ? 1 : 0.5 }} />
              <button type="button" className="ghost" onClick={copyLink} disabled={!enabled} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {copied ? <Check size={14} color={theme.credit} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div style={{ fontSize: 12.5, color: theme.muted, marginBottom: 14 }}>
              {SHARE_CONFIG.viewsThisWeek.toLocaleString()} views this week on your public page
            </div>

            <div style={cardTitleStyle()}>Visible on public page</div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, marginBottom: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={showRevenue} onChange={(e) => setShowRevenue(e.target.checked)} />
              {showRevenue ? <Eye size={14} /> : <EyeOff size={14} />} Revenue totals
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, marginBottom: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={showChannels} onChange={(e) => setShowChannels(e.target.checked)} />
              {showChannels ? <Eye size={14} /> : <EyeOff size={14} />} Channel breakdown
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, cursor: "pointer" }}>
              <input type="checkbox" checked={showLive} onChange={(e) => setShowLive(e.target.checked)} />
              {showLive ? <Eye size={14} /> : <EyeOff size={14} />} Live visitor count
            </label>
          </div>
        </div>

        {/* Public preview mock */}
        <div>
          <div style={{ fontSize: 11, color: theme.faint, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Preview — what visitors see
          </div>
          <div
            style={{
              background: theme.bg,
              border: `1px solid ${theme.line}`,
              borderRadius: 3,
              padding: 20,
              opacity: enabled ? 1 : 0.45,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: theme.credit }} />
              <span style={{ fontWeight: 600, fontSize: 14 }}>statly.app</span>
              <span style={{ fontSize: 11, color: theme.faint, marginLeft: "auto" }}>Powered by notjustvisits</span>
            </div>

            {showLive && (
              <div style={{ fontSize: 12, color: theme.credit, marginBottom: 12 }}>
                ● 7 visitors right now
              </div>
            )}

            {showRevenue && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
                {KPIS.filter((k) => ["Revenue (30d)", "Visitors (30d)", "Conversion rate"].includes(k.label)).map((k) => (
                  <div key={k.label} style={{ background: theme.bg, borderRadius: 3, padding: "12px 14px", border: `1px solid ${theme.lineFaint}` }}>
                    <div style={{ fontSize: 10, color: theme.muted, marginBottom: 4 }}>{k.label.replace(" (30d)", "")}</div>
                    <div className="mono" style={{ fontSize: 18, fontWeight: 600 }}>{fmtKpi(k)}</div>
                  </div>
                ))}
              </div>
            )}

            {showChannels && (
              <div>
                <div style={{ fontSize: 10, color: theme.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Top channels
                </div>
                {CHANNELS.slice(0, 4).map((c) => (
                  <div key={c.name} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span>{c.name}</span>
                      {showRevenue && <span className="mono">${c.revenue.toLocaleString()}</span>}
                    </div>
                    <div style={barTrackStyle()}>
                      <div style={barFillStyle((c.revenue / maxRev) * 100)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
