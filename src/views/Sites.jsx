import React from "react";
import { Layers, Users2, Shuffle } from "lucide-react";
import { SITES, TEAM_MEMBERS, CROSS_SITE_ROLLUP, money } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

const ROLE_COLOR = { owner: theme.accent, admin: theme.teal, viewer: theme.muted };

export default function SitesView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Sites & team</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Manage every site under this account and who on your team can see them.
        </p>
      </div>

      <div className="card" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
          <Layers size={14} /> Sites ({SITES.length})
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 90px 70px", gap: 8, fontSize: 11, color: theme.dim, padding: "0 4px 8px", borderBottom: `1px solid ${theme.rowBorder}` }}>
          <span>Site</span>
          <span style={{ textAlign: "right" }}>Events</span>
          <span style={{ textAlign: "right" }}>Revenue</span>
          <span style={{ textAlign: "right" }}>Status</span>
          <span></span>
        </div>
        {SITES.map((site, idx) => (
          <div
            key={site.id}
            className="row-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 90px 90px 90px 70px",
              gap: 8,
              alignItems: "center",
              padding: "11px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
            }}
          >
            <div>
              <div style={{ fontSize: 13.5 }}>{site.name}</div>
              <div className="mono" style={{ fontSize: 11, color: theme.dim }}>{site.domain}</div>
            </div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{site.events.toLocaleString()}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{site.revenue ? money(site.revenue) : "—"}</div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 10, background: `${theme.green}20`, color: theme.green, fontWeight: 500 }}>
                {site.status}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <button type="button" className="ghost" style={{ fontSize: 11, padding: "4px 8px" }}>View</button>
            </div>
          </div>
        ))}
        <button type="button" className="ghost" style={{ marginTop: 14, fontSize: 12 }}>+ Add site</button>
      </div>

      <div className="card" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
          <Users2 size={14} /> Team members ({TEAM_MEMBERS.length})
        </div>
        {TEAM_MEMBERS.map((m, idx) => (
          <div
            key={m.id}
            className="row-hover"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "11px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: theme.surface, border: `1px solid ${theme.surfaceBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: 13.5 }}>{m.name}</div>
                <div style={{ fontSize: 11.5, color: theme.dim }}>{m.email}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 11, color: theme.muted }}>Joined {m.joined}</span>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 10, background: `${ROLE_COLOR[m.role]}20`, color: ROLE_COLOR[m.role], fontWeight: 500, textTransform: "capitalize" }}>
                {m.role}
              </span>
            </div>
          </div>
        ))}
        <button type="button" className="ghost" style={{ marginTop: 14, fontSize: 12 }}>+ Invite teammate</button>
      </div>

      <div className="card" style={{ padding: "18px 20px" }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 6 }}>
          <Shuffle size={14} /> Cross-site rollup
        </div>
        <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: theme.dim }}>Total revenue</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>{money(CROSS_SITE_ROLLUP.totalRevenue)}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: theme.dim }}>Total visitors</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>{CROSS_SITE_ROLLUP.totalVisitors.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: theme.dim }}>Total pageviews</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>{CROSS_SITE_ROLLUP.totalPageviews.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ fontSize: 11.5, color: theme.dim, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Cross-domain journeys
        </div>
        {CROSS_SITE_ROLLUP.crossDomainJourneys.map((j, idx) => (
          <div
            key={j.path}
            className="row-hover"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              fontSize: 13,
            }}
          >
            <span className="mono">{j.path}</span>
            <span style={{ color: theme.muted }}>{j.count} visits · {j.conversions} conversions · <span className="mono" style={{ color: theme.text }}>{money(j.revenue)}</span></span>
          </div>
        ))}
      </div>
    </>
  );
}
