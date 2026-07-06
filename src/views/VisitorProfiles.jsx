import React from "react";
import { User, Calendar, DollarSign, Clock, ArrowRight } from "lucide-react";
import { VISITOR_PROFILES } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";
import { money } from "../data/mockTier1";

export default function VisitorProfilesView() {
  return (
    <>
      <div style={cardTitleStyle()}>Individual Visitor Profiles</div>
      {VISITOR_PROFILES.map((profile, idx) => (
        <div key={profile.visitorId} className="card" style={{ padding: "20px", marginBottom: 20 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: theme.surface,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 600,
                  color: theme.muted,
                }}
              >
                {profile.identity.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{profile.identity.name}</div>
                <div style={{ fontSize: 12, color: theme.dim }}>{profile.identity.email}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="mono" style={{ fontSize: 20, fontWeight: 600, color: theme.green }}>
                {money(profile.totalRevenue)}
              </div>
              <div style={{ fontSize: 12, color: theme.muted }}>Lifetime value</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20, padding: "16px", background: theme.surface, borderRadius: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: theme.muted, marginBottom: 4 }}>Total visits</div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{profile.totalVisits}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: theme.muted, marginBottom: 4 }}>Sessions</div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{profile.totalSessions}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: theme.muted, marginBottom: 4 }}>Total time</div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{profile.totalTime}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: theme.muted, marginBottom: 4 }}>Plan</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{profile.attributes.plan}</div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 12 }}>Journey timeline</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {profile.journey.map((event, eIdx) => (
                <div key={eIdx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: event.action === "purchase" || event.action === "upgrade" ? theme.green : theme.muted,
                    }}
                  />
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: theme.surface, borderRadius: 6 }}>
                    <span style={{ fontSize: 12, color: theme.dim, minWidth: 90 }}>{event.date}</span>
                    <span style={{ fontSize: 13 }}>{event.page}</span>
                    <ArrowRight size={12} color={theme.muted} />
                    <span style={{ fontSize: 13, fontWeight: 500, textTransform: "capitalize" }}>{event.action}</span>
                    {event.amount && (
                      <span className="mono" style={{ fontSize: 12, color: theme.green, marginLeft: "auto" }}>
                        {money(event.amount)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
