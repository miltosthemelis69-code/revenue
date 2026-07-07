import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { DEFAULT_SETTINGS, TIMEZONE_OPTIONS, VISITOR_ID_CONFIG } from "../data/mockTier1";
import { theme, cardTitleStyle } from "../styles";
import { Status } from "./shared";

export default function SettingsView() {
  const [timezone, setTimezone] = useState(DEFAULT_SETTINGS.timezone);
  const [excludedPaths, setExcludedPaths] = useState(DEFAULT_SETTINGS.excludedPaths);
  const [trackHashRoutes, setTrackHashRoutes] = useState(DEFAULT_SETTINGS.trackHashRoutes);
  const [respectDoNotTrack, setRespectDoNotTrack] = useState(DEFAULT_SETTINGS.respectDoNotTrack);
  const [newPath, setNewPath] = useState("");
  const [saved, setSaved] = useState(false);

  function addPath() {
    const trimmed = newPath.trim();
    if (!trimmed || excludedPaths.includes(trimmed)) return;
    setExcludedPaths([...excludedPaths, trimmed]);
    setNewPath("");
  }

  function removePath(path) {
    setExcludedPaths(excludedPaths.filter((p) => p !== path));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Settings</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.muted }}>
          Excluded paths, timezone, and basic tracking preferences for this site.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 900 }}>
        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>Timezone</div>
          <label style={{ fontSize: 12.5, color: theme.muted, display: "block", marginBottom: 8 }}>
            Dashboard dates and charts use this timezone
          </label>
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)} style={{ width: "100%" }}>
            {TIMEZONE_OPTIONS.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <div className="panel" style={{ padding: "18px 20px" }}>
          <div style={cardTitleStyle()}>Privacy</div>
          <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, marginBottom: 12, cursor: "pointer" }}>
            <input type="checkbox" checked={respectDoNotTrack} onChange={(e) => setRespectDoNotTrack(e.target.checked)} />
            Respect Do Not Track browser setting
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, cursor: "pointer" }}>
            <input type="checkbox" checked={trackHashRoutes} onChange={(e) => setTrackHashRoutes(e.target.checked)} />
            Track hash-based routes (e.g. /app#/settings)
          </label>
        </div>

        <div className="panel" style={{ padding: "18px 20px", gridColumn: "1 / -1" }}>
          <div style={cardTitleStyle()}>Visitor identification</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13.5, marginBottom: 4 }}>
                {VISITOR_ID_CONFIG.method === "daily-rotating" ? "Cookieless, daily-rotating ID" : VISITOR_ID_CONFIG.method}
              </div>
              <div style={{ fontSize: 12, color: theme.muted }}>{VISITOR_ID_CONFIG.description}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Status color={theme.credit}>No cookie banner needed</Status>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${theme.lineFaint}` }}>
            <div>
              <div style={{ fontSize: 11, color: theme.faint }}>Retention window</div>
              <div className="mono" style={{ fontSize: 13, marginTop: 2 }}>{VISITOR_ID_CONFIG.retention}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: theme.faint }}>Cookie required</div>
              <div className="mono" style={{ fontSize: 13, marginTop: 2 }}>{VISITOR_ID_CONFIG.cookieRequired ? "Yes" : "No"}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: theme.faint }}>Consent banner</div>
              <div className="mono" style={{ fontSize: 13, marginTop: 2 }}>{VISITOR_ID_CONFIG.consentBanner ? "Required" : "Not required"}</div>
            </div>
          </div>
        </div>

        <div className="panel" style={{ padding: "18px 20px", gridColumn: "1 / -1" }}>
          <div style={cardTitleStyle()}>Excluded paths</div>
          <p style={{ margin: "0 0 14px", fontSize: 12.5, color: theme.muted }}>
            Visits to these paths won&apos;t be counted. Supports wildcards with <span className="mono">*</span>.
          </p>

          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <input
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
              placeholder="/admin or /preview/*"
              style={{ flex: 1 }}
              onKeyDown={(e) => e.key === "Enter" && addPath()}
            />
            <button type="button" className="ghost" onClick={addPath} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Plus size={14} /> Add
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {excludedPaths.map((path) => (
              <div
                key={path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: theme.panel,
                  borderRadius: 3,
                  border: `1px solid ${theme.line}`,
                }}
              >
                <span className="mono" style={{ fontSize: 12.5 }}>{path}</span>
                <button type="button" onClick={() => removePath(path)} style={{ background: "none", border: "none", color: theme.faint, cursor: "pointer", padding: 4 }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
        <button type="button" className="primary" onClick={handleSave}>Save settings</button>
        {saved && <span style={{ fontSize: 13, color: theme.credit }}>Saved (mock — no backend yet)</span>}
      </div>
    </>
  );
}
