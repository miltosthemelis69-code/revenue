import React from "react";
import { Route, CheckCircle2, XCircle } from "lucide-react";
import { VISITOR_JOURNEYS, money } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";

export default function JourneysView() {
  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>Visitor journeys</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          The exact sequence of pages and events for a single visit — structured data, not a screen recording.
        </p>
      </div>

      {VISITOR_JOURNEYS.map((j) => (
        <div key={j.sessionId} className="card" style={{ padding: "18px 20px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Route size={15} color={theme.muted} />
              <span className="mono" style={{ fontSize: 13 }}>{j.visitorId}</span>
              <span style={{ fontSize: 12, color: theme.dim }}>· session {j.sessionId}</span>
              <span style={{ fontSize: 12, color: theme.dim }}>· {j.duration}</span>
            </div>
            {j.converted ? (
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: theme.green }}>
                <CheckCircle2 size={13} /> Converted · {money(j.revenue)}
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: theme.dim }}>
                <XCircle size={13} /> No conversion
              </span>
            )}
          </div>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: 18 }}>
            <div style={{ position: "absolute", left: 4, top: 4, bottom: 4, width: 1, background: theme.rowBorder }} />
            {j.pages.map((p, idx) => (
              <div key={idx} style={{ position: "relative", paddingBottom: idx === j.pages.length - 1 ? 0 : 18 }}>
                <div style={{ position: "absolute", left: -18, top: 3, width: 8, height: 8, borderRadius: "50%", background: theme.accent, border: `2px solid ${theme.card}` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="mono" style={{ fontSize: 13.5 }}>{p.path}</span>
                  <span style={{ fontSize: 11.5, color: theme.dim }}>{p.time} · {p.duration}</span>
                </div>
                {p.referrer && (
                  <div style={{ fontSize: 11.5, color: theme.muted, marginTop: 2 }}>entered from {p.referrer}</div>
                )}
                {j.events.filter((e) => e.time.split(":")[0] === p.time.split(":")[0]).map((e) => (
                  <div key={e.name} style={{ fontSize: 11.5, color: theme.teal, marginTop: 4 }} className="mono">
                    ↳ {e.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
