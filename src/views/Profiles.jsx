import React, { useState } from "react";
import { UserCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { VISITOR_PROFILES, money } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

function ProfileCard({ profile }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card" style={{ padding: "18px 20px", marginBottom: 14 }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        onClick={() => setOpen((o) => !o)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: theme.surface, border: `1px solid ${theme.surfaceBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UserCircle2 size={18} color={theme.muted} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{profile.identity.name}</div>
            <div style={{ fontSize: 11.5, color: theme.dim }}>{profile.identity.email} · first seen {profile.identity.firstSeen}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <div className="mono" style={{ fontSize: 15, fontWeight: 600 }}>{money(profile.totalRevenue)}</div>
            <div style={{ fontSize: 11, color: theme.dim }}>{profile.totalVisits} visits · {profile.totalSessions} sessions</div>
          </div>
          <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 10, background: `${theme.green}20`, color: theme.green, fontWeight: 500 }}>
            {profile.attributes.status}
          </span>
          {open ? <ChevronUp size={16} color={theme.dim} /> : <ChevronDown size={16} color={theme.dim} />}
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${theme.rowBorder}` }}>
          <div style={{ display: "flex", gap: 24, marginBottom: 16, fontSize: 12 }}>
            <span style={{ color: theme.muted }}>Plan: <span style={{ color: theme.text }}>{profile.attributes.plan}</span></span>
            <span style={{ color: theme.muted }}>Country: <span style={{ color: theme.text }}>{profile.attributes.country}</span></span>
            <span style={{ color: theme.muted }}>First touch: <span style={{ color: theme.text }}>{profile.firstVisit.referrer}</span></span>
            <span style={{ color: theme.muted }}>Time on site: <span style={{ color: theme.text }}>{profile.totalTime}</span></span>
          </div>

          <div style={{ position: "relative", paddingLeft: 18 }}>
            <div style={{ position: "absolute", left: 4, top: 4, bottom: 4, width: 1, background: theme.rowBorder }} />
            {profile.journey.map((step, idx) => (
              <div key={idx} style={{ position: "relative", paddingBottom: idx === profile.journey.length - 1 ? 0 : 14 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -18,
                    top: 3,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: step.action === "purchase" || step.action === "upgrade" ? theme.green : theme.accent,
                    border: `2px solid ${theme.card}`,
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13 }}>
                    <span className="mono" style={{ color: theme.muted }}>{step.page}</span> — {step.action}
                    {step.amount && <span className="mono" style={{ color: theme.green, marginLeft: 6 }}>{money(step.amount)}</span>}
                  </span>
                  <span style={{ fontSize: 11.5, color: theme.dim }}>{step.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilesView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Visitor profiles</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          One continuous story per identified visitor — every visit, session, and dollar linked together, click to expand.
        </p>
      </div>

      {VISITOR_PROFILES.map((p) => (
        <ProfileCard key={p.visitorId} profile={p} />
      ))}
    </>
  );
}
