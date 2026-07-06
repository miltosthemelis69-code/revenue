import React from "react";
import { Radio, MapPin, Clock } from "lucide-react";
import { LIVE_VISITORS } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

export default function LiveVisitorsView() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Live Map */}
        <div className="card" style={{ padding: "20px", minHeight: 400 }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
            <Radio size={16} />
            Live Visitors
          </div>
          <div
            style={{
              marginTop: 20,
              height: 300,
              background: theme.surface,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${theme.surfaceBorder}`,
              position: "relative",
            }}
          >
            <div style={{ textAlign: "center", color: theme.muted }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: theme.accent, marginBottom: 8 }}>
                {LIVE_VISITORS.total}
              </div>
              <div style={{ fontSize: 14 }}>active visitors now</div>
            </div>
            {/* Simulated map dots */}
            {LIVE_VISITORS.byCountry.map((country, idx) => (
              <div
                key={country.code}
                style={{
                  position: "absolute",
                  left: `${20 + idx * 10}%`,
                  top: `${30 + (idx % 3) * 20}%`,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: theme.accent,
                  boxShadow: `0 0 20px ${theme.accent}`,
                  animation: "pulse 2s infinite",
                }}
                title={`${country.code}: ${country.count}`}
              />
            ))}
          </div>
        </div>

        {/* By Country */}
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
            <MapPin size={16} />
            By Country
          </div>
          {LIVE_VISITORS.byCountry.map((country, idx) => (
            <div
              key={country.code}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 24,
                    height: 16,
                    borderRadius: 2,
                    background: theme.surface,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 600,
                    color: theme.muted,
                  }}
                >
                  {country.code}
                </div>
                <span style={{ fontSize: 13 }}>{country.code}</span>
              </div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>
                {country.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ padding: "20px", marginTop: 20 }}>
        <div style={{ ...cardTitleStyle(), display: "flex", alignItems: "center", gap: 8 }}>
          <Clock size={16} />
          Recent Activity
        </div>
        {LIVE_VISITORS.recentActivity.map((activity, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderTop: idx === 0 ? "none" : `1px solid ${theme.rowBorder}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: theme.green,
                }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{activity.page}</div>
                <div style={{ fontSize: 12, color: theme.dim }}>
                  {activity.country} · {activity.referrer}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: theme.muted }}>{activity.time}</div>
          </div>
        ))}
      </div>
    </>
  );
}
