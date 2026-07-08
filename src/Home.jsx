import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { ChevronRight } from "lucide-react";
import { SITE, REVENUE_TREND, KPIS } from "./data/mockTier1";
import { theme } from "./styles";

// Single-site list — this is the front door of the product. One card per
// tracked site; clicking it opens the full mockup dashboard for that site.
// Kept deliberately sparse (prototype, no backend): just enough on the card
// to feel real — name, a trend line, and the headline visitor number.

const visitorsKpi = KPIS.find((k) => k.label === "Visitors (30d)");

export default function Home({ onOpenSite }) {
  return (
    <div
      style={{
        fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: theme.bg,
        color: theme.text,
        minHeight: "100vh",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 28px",
          borderBottom: `1px solid ${theme.line}`,
        }}
      >
        <span className="serif" style={{ fontSize: 17, fontStyle: "italic", letterSpacing: 0.1 }}>
          notjustvisits<span style={{ color: theme.credit }}>.</span>
        </span>

        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: theme.panel,
            border: `1px solid ${theme.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            color: theme.muted,
          }}
        >
          F
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 28px" }}>
        <h1 className="serif" style={{ fontSize: 24, fontWeight: 400, margin: "0 0 4px" }}>
          Your sites
        </h1>
        <p style={{ margin: "0 0 28px", fontSize: 13.5, color: theme.muted }}>
          Open a site to see its full revenue & traffic dashboard.
        </p>

        <button
          type="button"
          onClick={() => onOpenSite(SITE)}
          className="panel row-hover"
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "20px 22px",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: theme.credit,
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: 15, fontWeight: 500 }}>{SITE.domain}</span>
            </div>
            <ChevronRight size={16} color={theme.faint} />
          </div>

          <div style={{ height: 46, marginBottom: 14 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_TREND} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
                <defs>
                  <linearGradient id="homeRevGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.credit} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={theme.credit} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={theme.credit}
                  strokeWidth={1.75}
                  fill="url(#homeRevGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span className="mono" style={{ fontSize: 15, fontWeight: 600 }}>
              {visitorsKpi.value.toLocaleString()}
            </span>
            <span style={{ fontSize: 12.5, color: theme.faint }}>visitors · last 30 days</span>
          </div>
        </button>
      </div>
    </div>
  );
}
