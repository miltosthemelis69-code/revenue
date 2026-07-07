import React, { useMemo, useState } from "react";
import { ComposedChart, Area, Line, ResponsiveContainer, YAxis } from "recharts";
import {
  KPIS,
  REVENUE_TREND,
  PAGEVIEW_TREND,
  REFERRERS,
  UTM_CAMPAIGNS,
  COUNTRIES,
  DEVICES,
  PAGES,
  BROWSERS,
  OPERATING_SYSTEMS,
  BOT_TRAFFIC,
  RECENT_SALES,
  LIVE_VISITORS,
  SITE,
  money,
} from "../data/mockTier1";
import { theme } from "../styles";
import { StatRow, Panel, RankedRow } from "./shared";

// ---- small local helpers, kept out of the data file since they're purely
// derived / presentational, not source-of-truth mock data ----

function parseTimeToSeconds(str) {
  const m = /(\d+)m\s*(\d+)s/.exec(str || "");
  if (!m) return 0;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

function formatSeconds(total) {
  const m = Math.floor(total / 60);
  const s = Math.round(total % 60);
  return `${m}m ${s}s`;
}

function kpi(label) {
  return KPIS.find((k) => k.label === label);
}

export default function OverviewView() {
  const [sourceTab, setSourceTab] = useState("referrer");
  const [geoTab, setGeoTab] = useState("country");
  const [techTab, setTechTab] = useState("browser");

  const revenueKpi = kpi("Revenue (30d)");
  const visitorsKpi = kpi("Visitors (30d)");
  const conversionKpi = kpi("Conversion rate");
  const refundedKpi = kpi("Refunded");

  const revenuePerVisitor = revenueKpi.value / visitorsKpi.value;

  const { bounceRate, avgSession } = useMemo(() => {
    const totalViews = PAGES.reduce((s, p) => s + p.views, 0);
    const weightedBounce = PAGES.reduce((s, p) => s + p.bounce * p.views, 0) / totalViews;
    const weightedSeconds =
      PAGES.reduce((s, p) => s + parseTimeToSeconds(p.avgTime) * p.views, 0) / totalViews;
    return { bounceRate: weightedBounce, avgSession: formatSeconds(weightedSeconds) };
  }, []);

  const chartData = useMemo(
    () =>
      REVENUE_TREND.map((r, idx) => ({
        i: r.i,
        revenue: r.v,
        visits: PAGEVIEW_TREND[idx] ? PAGEVIEW_TREND[idx].views : 0,
      })),
    []
  );

  const sourceRows = useMemo(() => {
    if (sourceTab === "referrer") {
      const max = Math.max(...REFERRERS.map((r) => r.revenue));
      return REFERRERS.slice()
        .sort((a, b) => b.revenue - a.revenue)
        .map((r) => ({
          label: r.source,
          sublabel: `${r.visits.toLocaleString()} vis.`,
          pct: (r.revenue / max) * 100,
          value: money(r.revenue),
        }));
    }
    const max = Math.max(...UTM_CAMPAIGNS.map((c) => c.revenue));
    return UTM_CAMPAIGNS.slice()
      .sort((a, b) => b.revenue - a.revenue)
      .map((c) => ({
        label: c.campaign,
        sublabel: `${c.conversions} conv.`,
        pct: (c.revenue / max) * 100,
        value: money(c.revenue),
      }));
  }, [sourceTab]);

  const geoRows = useMemo(() => {
    if (geoTab === "country") {
      const max = Math.max(...COUNTRIES.map((c) => c.revenue));
      return COUNTRIES.slice()
        .sort((a, b) => b.revenue - a.revenue)
        .map((c) => ({
          label: c.label,
          sublabel: `${c.visits.toLocaleString()} vis.`,
          pct: (c.revenue / max) * 100,
          value: money(c.revenue),
        }));
    }
    const max = Math.max(...DEVICES.map((d) => d.visits));
    return DEVICES.slice()
      .sort((a, b) => b.visits - a.visits)
      .map((d) => ({
        label: d.label,
        sublabel: `${d.pct}%`,
        pct: (d.visits / max) * 100,
        value: d.visits.toLocaleString(),
        muted: true,
      }));
  }, [geoTab]);

  const techRows = useMemo(() => {
    const src = techTab === "browser" ? BROWSERS : OPERATING_SYSTEMS;
    const max = Math.max(...src.map((d) => d.visits));
    return src.map((d) => ({
      label: d.label,
      sublabel: `${d.pct}%`,
      pct: (d.visits / max) * 100,
      value: d.visits.toLocaleString(),
      muted: true,
    }));
  }, [techTab]);

  const pageRows = useMemo(() => {
    const max = Math.max(...PAGES.map((p) => p.views));
    return PAGES.slice()
      .sort((a, b) => b.views - a.views)
      .map((p) => ({
        label: p.path,
        sublabel: p.avgTime,
        pct: (p.views / max) * 100,
        value: p.views.toLocaleString(),
        muted: true,
      }));
  }, []);

  const botRows = useMemo(() => {
    const totals = {};
    const lastSeenMap = {};
    BOT_TRAFFIC.forEach((page) => {
      page.bots.forEach((b) => {
        totals[b.name] = (totals[b.name] || 0) + b.visits;
        if (!lastSeenMap[b.name]) lastSeenMap[b.name] = b.lastSeen;
      });
    });
    const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const max = entries.length ? entries[0][1] : 1;
    return entries.map(([name, visits]) => ({
      label: name,
      sublabel: lastSeenMap[name],
      pct: (visits / max) * 100,
      value: visits.toLocaleString(),
    }));
  }, []);

  const totalBotVisits = botRows.reduce((s, r) => s + Number(r.value.replace(/,/g, "")), 0);

  return (
    <>
      {/* The whole product's thesis, written as one sentence using real numbers. */}
      <div style={{ marginBottom: 26 }}>
        <div className="mono" style={{ fontSize: 11, color: theme.faint, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1.1 }}>
          {SITE.domain} · last 30 days
        </div>
        <h1 className="serif" style={{ margin: 0, fontSize: 25, fontWeight: 400, lineHeight: 1.35, color: theme.text }}>
          <span style={{ color: theme.muted, textDecoration: "line-through", textDecorationColor: theme.faint, textDecorationThickness: "1px" }}>
            {visitorsKpi.value.toLocaleString()} visits.
          </span>{" "}
          <span style={{ fontStyle: "italic", color: theme.credit }}>
            {money(revenueKpi.value)} of it mattered.
          </span>
        </h1>
      </div>

      <StatRow
        signal={[
          revenueKpi,
          { label: "Revenue / visitor", value: revenuePerVisitor, delta: undefined, format: "money2" },
          conversionKpi,
          refundedKpi,
        ]}
        context={[
          visitorsKpi,
          { label: "Bounce rate", value: bounceRate, delta: undefined, format: "pct" },
          { label: "Avg. session", value: avgSession, delta: undefined, format: "text" },
          { label: "Online now", value: LIVE_VISITORS.activeNow, delta: undefined, format: "int" },
        ]}
      />

      {/* Main chart — quiet grey traffic underneath, bold revenue signal on top. */}
      <div className="panel" style={{ padding: "20px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 4 }}>
          <div>
            <div className="mono" style={{ fontSize: 10.5, color: theme.faint, textTransform: "uppercase", letterSpacing: 1.1, marginBottom: 8 }}>
              Revenue vs. traffic, daily
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
              <span className="serif" style={{ fontSize: 26, fontStyle: "italic", color: theme.credit }}>
                {money(revenueKpi.value)}
              </span>
              <span style={{ fontSize: 12.5, color: theme.faint }}>
                against <span className="mono">{visitorsKpi.value.toLocaleString()}</span> visits — grey line, for reference only
              </span>
            </div>
          </div>
        </div>
        <div style={{ height: 150, marginTop: 10 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 6, bottom: 0, left: 6 }}>
              <YAxis yAxisId="visits" hide domain={[0, "dataMax + 400"]} />
              <YAxis yAxisId="revenue" hide domain={[0, "dataMax + 100"]} />
              <Area
                yAxisId="visits"
                type="monotone"
                dataKey="visits"
                stroke="none"
                fill={theme.faint}
                fillOpacity={0.16}
              />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke={theme.credit}
                strokeWidth={2.5}
                dot={{ r: 2.5, fill: theme.credit, strokeWidth: 0 }}
                activeDot={{ r: 4.5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel
          title="Where the revenue came from"
          tabs={[
            { id: "referrer", label: "Referrer" },
            { id: "campaign", label: "Campaign" },
          ]}
          tabValue={sourceTab}
          onTabChange={setSourceTab}
        >
          {sourceRows.map((r, idx) => (
            <RankedRow key={r.label} {...r} valueColor={theme.credit} first={idx === 0} />
          ))}
        </Panel>

        <Panel
          title="Where they are"
          tabs={[
            { id: "country", label: "Country" },
            { id: "device", label: "Device" },
          ]}
          tabValue={geoTab}
          onTabChange={setGeoTab}
        >
          {geoRows.map((r, idx) => (
            <RankedRow key={r.label} {...r} valueColor={r.muted ? theme.muted : theme.credit} first={idx === 0} />
          ))}
        </Panel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel title="What they viewed">
          {pageRows.map((r, idx) => (
            <RankedRow key={r.label} {...r} valueColor={theme.muted} first={idx === 0} />
          ))}
        </Panel>

        <Panel
          title="How they got here"
          tabs={[
            { id: "browser", label: "Browser" },
            { id: "os", label: "OS" },
          ]}
          tabValue={techTab}
          onTabChange={setTechTab}
        >
          {techRows.map((r, idx) => (
            <RankedRow key={r.label} {...r} valueColor={theme.muted} first={idx === 0} />
          ))}
        </Panel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Panel
          title="AI & bot traffic"
          right={
            <span className="mono" style={{ fontSize: 11, color: theme.faint }}>
              {totalBotVisits.toLocaleString()} visits
            </span>
          }
        >
          {botRows.map((r, idx) => (
            <RankedRow key={r.label} {...r} valueColor={theme.amber} first={idx === 0} />
          ))}
        </Panel>

        <Panel title="Recent revenue">
          {RECENT_SALES.map((s, idx) => {
            const isRefund = s.amount < 0;
            return (
              <div
                key={idx}
                className="row-hover"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "9px 4px",
                  borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    className="mono"
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: theme.lineFaint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color: theme.muted,
                      flexShrink: 0,
                    }}
                  >
                    {s.country}
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, color: theme.text }}>{s.plan}</div>
                    <div style={{ fontSize: 11.5, color: theme.faint, marginTop: 2 }}>
                      {s.channel} · {s.time}
                    </div>
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 500, color: isRefund ? theme.debit : theme.credit }}>
                  {money(s.amount)}
                </div>
              </div>
            );
          })}
        </Panel>
      </div>
    </>
  );
}
