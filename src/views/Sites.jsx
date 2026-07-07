import React from "react";
import { SITES, TEAM_MEMBERS, CROSS_SITE_ROLLUP, money } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";
import { Status } from "./shared";

const ROLE_COLOR = { owner: theme.text, admin: theme.muted, viewer: theme.faint };

export default function SitesView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Sites & team</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Manage every site under this account and who on your team can see them.
        </p>
      </div>

      <div className="panel" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={cardTitleStyle()}>Sites ({SITES.length})</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px 90px 70px", gap: 8, fontSize: 11, color: theme.faint, padding: "0 4px 8px", borderBottom: `1px solid ${theme.lineFaint}` }}>
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
              borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
            }}
          >
            <div>
              <div style={{ fontSize: 13.5 }}>{site.name}</div>
              <div className="mono" style={{ fontSize: 11, color: theme.faint }}>{site.domain}</div>
            </div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{site.events.toLocaleString()}</div>
            <div className="mono" style={{ fontSize: 12.5, textAlign: "right" }}>{site.revenue ? money(site.revenue) : "—"}</div>
            <div style={{ textAlign: "right" }}>
              <Status color={theme.credit} style={{ justifyContent: "flex-end" }}>{site.status}</Status>
            </div>
            <div style={{ textAlign: "right" }}>
              <button type="button" className="ghost" style={{ fontSize: 11, padding: "4px 8px" }}>View</button>
            </div>
          </div>
        ))}
        <button type="button" className="ghost" style={{ marginTop: 14, fontSize: 12 }}>+ Add site</button>
      </div>

      <div className="panel" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={cardTitleStyle()}>Team members ({TEAM_MEMBERS.length})</div>
        {TEAM_MEMBERS.map((m, idx) => (
          <div
            key={m.id}
            className="row-hover"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "11px 4px",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: theme.panel, border: `1px solid ${theme.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: 13.5 }}>{m.name}</div>
                <div style={{ fontSize: 11.5, color: theme.faint }}>{m.email}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 11, color: theme.muted }}>Joined {m.joined}</span>
              <span style={{ fontSize: 11.5, color: ROLE_COLOR[m.role], textTransform: "capitalize" }}>
                {m.role}
              </span>
            </div>
          </div>
        ))}
        <button type="button" className="ghost" style={{ marginTop: 14, fontSize: 12 }}>+ Invite teammate</button>
      </div>

      <div className="panel" style={{ padding: "18px 20px" }}>
        <div style={cardTitleStyle()}>Cross-site rollup</div>
        <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: theme.faint }}>Total revenue</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>{money(CROSS_SITE_ROLLUP.totalRevenue)}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: theme.faint }}>Total visitors</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>{CROSS_SITE_ROLLUP.totalVisitors.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: theme.faint }}>Total pageviews</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>{CROSS_SITE_ROLLUP.totalPageviews.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ fontSize: 11.5, color: theme.faint, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
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
              borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
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
