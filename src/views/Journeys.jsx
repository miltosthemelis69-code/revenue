import React from "react";
import { Route, Clock, CheckCircle, XCircle } from "lucide-react";
import { VISITOR_JOURNEYS } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";
import { money } from "../data/mockTier1";

export default function JourneysView() {
  return (
    <>
      <div style={cardTitleStyle()}>Visitor Journeys</div>
      {VISITOR_JOURNEYS.map((journey, idx) => (
        <div key={journey.visitorId} className="card" style={{ padding: "20px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: theme.dim, marginBottom: 4 }}>
                Visitor ID: <span className="mono">{journey.visitorId}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>
                {journey.converted ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: theme.green }}>
                    <CheckCircle size={14} /> Converted · {money(journey.revenue)}
                  </span>
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: theme.muted }}>
                    <XCircle size={14} /> Not converted
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: theme.dim }}>
              <Clock size={13} />
              {journey.duration}
            </div>
          </div>

          {/* Page Journey */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 8 }}>Page path</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {journey.pages.map((page, pIdx) => (
                <React.Fragment key={pIdx}>
                  <div
                    style={{
                      padding: "8px 12px",
                      background: theme.surface,
                      borderRadius: 6,
                      fontSize: 12,
                      border: `1px solid ${theme.surfaceBorder}`,
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>{page.path}</div>
                    <div style={{ fontSize: 11, color: theme.dim, marginTop: 2 }}>{page.time} · {page.duration}</div>
                  </div>
                  {pIdx < journey.pages.length - 1 && <Route size={14} color={theme.muted} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div style={{ fontSize: 12, color: theme.muted, marginBottom: 8 }}>Events</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {journey.events.map((event, eIdx) => (
                <div
                  key={eIdx}
                  style={{
                    padding: "6px 10px",
                    background: `${theme.accent}15`,
                    borderRadius: 4,
                    fontSize: 11,
                    color: theme.accent,
                    border: `1px solid ${theme.accent}30`,
                  }}
                >
                  {event.name} @ {event.time}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
