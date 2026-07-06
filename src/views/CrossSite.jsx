import React from "react";
import { Globe, ArrowRight, TrendingUp } from "lucide-react";
import { CROSS_SITE_ROLLUP } from "../data/mockTier1";
import { theme, cardTitleStyle, barTrackStyle, barFillStyle } from "../styles";
import { money } from "../data/mockTier1";

export default function CrossSiteView() {
  const maxRevenue = Math.max(...CROSS_SITE_ROLLUP.sites.map((s) => s.revenue));

  return (
    <>
      {/* Rollup Summary */}
      <div className="card" style={{ padding: "20px", marginBottom: 20 }}>
        <div style={cardTitleStyle()}>Cross-Site Rollup</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 4 }}>Total Revenue</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 600 }}>
              {money(CROSS_SITE_ROLLUP.totalRevenue)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 4 }}>Total Visitors</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 600 }}>
              {CROSS_SITE_ROLLUP.totalVisitors.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 4 }}>Total Pageviews</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 600 }}>
              {CROSS_SITE_ROLLUP.totalPageviews.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Sites */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
            <Globe size={16} />
            Sites
          </div>
          {CROSS_SITE_ROLLUP.sites.map((site, idx) => (
            <div
              key={site.domain}
              style={{
                padding: "14px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{site.name}</div>
                  <div style={{ fontSize: 12, color: theme.dim }}>{site.domain}</div>
                </div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>
                  {money(site.revenue)}
                </div>
              </div>
              <div style={barTrackStyle()}>
                <div style={barFillStyle((site.revenue / maxRevenue) * 100)} />
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 6, fontSize: 12, color: theme.muted }}>
                <span>{site.visitors.toLocaleString()} visitors</span>
                <span>{site.pageviews.toLocaleString()} pageviews</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-Domain Journeys */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={16} />
            Cross-Domain Journeys
          </div>
          {CROSS_SITE_ROLLUP.crossDomainJourneys.map((journey, idx) => (
            <div
              key={idx}
              style={{
                padding: "14px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{journey.path}</span>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: theme.muted }}>
                <span>{journey.count.toLocaleString()} journeys</span>
                <span>{journey.conversions} conversions</span>
                <span className="mono" style={{ color: theme.text }}>
                  {money(journey.revenue)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
