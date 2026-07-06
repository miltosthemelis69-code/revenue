import React from "react";
import { Globe, Users, Plus, MoreHorizontal } from "lucide-react";
import { SITES, TEAM_MEMBERS } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

export default function SitesView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Sites */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Globe size={16} />
              Sites
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                fontSize: 12,
                background: theme.surface,
                border: `1px solid ${theme.surfaceBorder}`,
                borderRadius: 6,
                cursor: "pointer",
                color: theme.text,
              }}
            >
              <Plus size={13} />
              Add site
            </button>
          </div>
          {SITES.map((site, idx) => (
            <div
              key={site.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{site.name}</div>
                <div style={{ fontSize: 12, color: theme.dim }}>{site.domain}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>
                  {site.events.toLocaleString()} events
                </div>
                <div className="mono" style={{ fontSize: 12, color: theme.muted }}>
                  {site.revenue > 0 ? `$${site.revenue.toLocaleString()}` : "$0"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={16} />
              Team Members
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                fontSize: 12,
                background: theme.surface,
                border: `1px solid ${theme.surfaceBorder}`,
                borderRadius: 6,
                cursor: "pointer",
                color: theme.text,
              }}
            >
              <Plus size={13} />
              Invite
            </button>
          </div>
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={member.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: theme.surface,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 600,
                    color: theme.muted,
                  }}
                >
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{member.name}</div>
                  <div style={{ fontSize: 12, color: theme.dim }}>{member.email}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    padding: "4px 8px",
                    borderRadius: 4,
                    background:
                      member.role === "owner"
                        ? `${theme.accent}20`
                        : member.role === "admin"
                        ? `${theme.green}20`
                        : theme.surface,
                    color: member.role === "owner" ? theme.accent : member.role === "admin" ? theme.green : theme.muted,
                    textTransform: "capitalize",
                  }}
                >
                  {member.role}
                </span>
                <MoreHorizontal size={16} color={theme.muted} style={{ cursor: "pointer" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
