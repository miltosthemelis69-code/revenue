import React, { useState } from "react";
import { CheckCircle, XCircle, Plus } from "lucide-react";
import { PAYMENT_INTEGRATIONS, GSC_DATA, AFFILIATES, CURRENCIES, REFUNDS_BY_CHANNEL, money } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";

export default function IntegrationsView() {
  const [showRefunds, setShowRefunds] = useState(false);

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Integrations</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Connect payment processors, search consoles, and other data sources for complete attribution.
        </p>
      </div>

      {/* Payment Processors */}
      <div className="panel" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={cardTitleStyle()}>Payment processors</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {PAYMENT_INTEGRATIONS.map((integration) => (
            <div
              key={integration.provider}
              style={{
                padding: "14px 16px",
                background: theme.panel,
                borderRadius: 3,
                border: `1px solid ${theme.line}`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {integration.status === "connected" ? (
                <CheckCircle size={18} color={theme.credit} />
              ) : (
                <XCircle size={18} color={theme.faint} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{integration.provider}</div>
                {integration.status === "connected" ? (
                  <div style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>
                    {integration.account} · Synced {integration.lastSync}
                  </div>
                ) : (
                  <div style={{ fontSize: 11, color: theme.faint, marginTop: 2 }}>Not connected</div>
                )}
              </div>
              {integration.status === "not-connected" && (
                <button type="button" className="ghost" style={{ fontSize: 12, padding: "6px 12px" }}>
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Google Search Console */}
      <div className="panel" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={cardTitleStyle()}>Google Search Console</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 13 }}>
            {GSC_DATA.connected ? (
              <span style={{ color: theme.credit }}>● Connected</span>
            ) : (
              <span style={{ color: theme.faint }}>Not connected</span>
            )}
            <span style={{ color: theme.muted, marginLeft: 8 }}>Last sync: {GSC_DATA.lastSync}</span>
          </div>
          {!GSC_DATA.connected && (
            <button type="button" className="primary" style={{ fontSize: 12 }}>Connect GSC</button>
          )}
        </div>

        {GSC_DATA.connected && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 70px 60px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
              <span>Keyword</span>
              <span style={{ textAlign: "right" }}>Clicks</span>
              <span style={{ textAlign: "right" }}>Impr.</span>
              <span style={{ textAlign: "right" }}>CTR</span>
              <span style={{ textAlign: "right" }}>Pos</span>
            </div>
            {GSC_DATA.topKeywords.map((kw, idx) => (
              <div
                key={kw.keyword}
                className="row-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 80px 70px 60px",
                  gap: 8,
                  alignItems: "center",
                  padding: "10px 4px",
                  borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
                }}
              >
                <div style={{ fontSize: 13 }}>{kw.keyword}</div>
                <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{kw.clicks}</div>
                <div className="mono" style={{ fontSize: 12.5, textAlign: "right", color: theme.muted }}>{kw.impressions.toLocaleString()}</div>
                <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{kw.ctr}%</div>
                <div className="mono" style={{ fontSize: 12.5, textAlign: "right", color: kw.position < 10 ? theme.credit : theme.muted }}>{kw.position}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Affiliate Tracking */}
      <div className="panel" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={cardTitleStyle()}>Affiliate tracking</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 80px 80px 70px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
          <span>Affiliate</span>
          <span style={{ textAlign: "right" }}>Code</span>
          <span style={{ textAlign: "right" }}>Clicks</span>
          <span style={{ textAlign: "right" }}>Signups</span>
          <span style={{ textAlign: "right" }}>Revenue</span>
          <span style={{ textAlign: "right" }}>Owed</span>
        </div>
        {AFFILIATES.map((affiliate, idx) => (
          <div
            key={affiliate.id}
            className="row-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 70px 70px 80px 80px 70px",
              gap: 8,
              alignItems: "center",
              padding: "10px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
            }}
          >
            <div style={{ fontSize: 13.5 }}>{affiliate.name}</div>
            <div className="mono" style={{ fontSize: 12, textAlign: "right", color: theme.muted }}>{affiliate.code}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{affiliate.clicks}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{affiliate.signups}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{money(affiliate.revenue)}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right", color: theme.credit, fontWeight: 600 }}>{money(affiliate.owed)}</div>
          </div>
        ))}
        <button type="button" className="ghost" style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
          <Plus size={14} /> Add affiliate
        </button>
      </div>

      {/* Multi-currency */}
      <div className="panel" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={cardTitleStyle()}>Multi-currency revenue</div>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 90px 90px 90px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
          <span>Code</span>
          <span>Currency</span>
          <span style={{ textAlign: "right" }}>Revenue</span>
          <span style={{ textAlign: "right" }}>Rate</span>
          <span style={{ textAlign: "right" }}>USD</span>
        </div>
        {CURRENCIES.map((curr, idx) => (
          <div
            key={curr.code}
            className="row-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 90px 90px 90px",
              gap: 8,
              alignItems: "center",
              padding: "10px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
            }}
          >
            <div className="mono" style={{ fontSize: 12, color: theme.muted }}>{curr.code}</div>
            <div style={{ fontSize: 13.5 }}>{curr.symbol} {curr.code}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{curr.revenue.toLocaleString()}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right", color: theme.muted }}>{curr.rate}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right", fontWeight: 600 }}>{money(curr.normalized)}</div>
          </div>
        ))}
      </div>

      {/* Refund-aware revenue */}
      <div className="panel" style={{ padding: "18px 20px" }}>
        <div style={cardTitleStyle()}>Refund-aware revenue by channel</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 90px 70px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
          <span>Channel</span>
          <span style={{ textAlign: "right" }}>Gross</span>
          <span style={{ textAlign: "right" }}>Refund</span>
          <span style={{ textAlign: "right" }}>Net</span>
          <span style={{ textAlign: "right" }}>Rate</span>
        </div>
        {REFUNDS_BY_CHANNEL.map((item, idx) => (
          <div
            key={item.channel}
            className="row-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 90px 90px 90px 70px",
              gap: 8,
              alignItems: "center",
              padding: "10px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
            }}
          >
            <div style={{ fontSize: 13.5 }}>{item.channel}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{money(item.grossRevenue)}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right", color: theme.debit }}>{money(-item.refunded)}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right", fontWeight: 600 }}>{money(item.netRevenue)}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right", color: item.refundRate > 3 ? theme.debit : theme.muted }}>{item.refundRate}%</div>
          </div>
        ))}
      </div>
    </>
  );
}
