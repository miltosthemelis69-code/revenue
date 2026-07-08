import React, { useMemo, useState } from "react";
import { ComposedChart, Bar, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChevronDown } from "lucide-react";
import {
  KPIS,
  REVENUE_TREND,
  PAGEVIEW_TREND,
  REFERRERS,
  UTM_CAMPAIGNS,
  GSC_DATA,
  COUNTRIES,
  REGIONS,
  CITIES,
  DEVICES,
  PAGES,
  ENTRY_PAGES,
  EXIT_LINKS,
  BROWSERS,
  OPERATING_SYSTEMS,
  RECENT_SALES,
  LIVE_VISITORS,
  SITE,
  PAYMENT_JOURNEYS,
  GOALS,
  FUNNELS,
  AI_TRAFFIC_TREND,
  AI_ASSISTANTS,
  AI_TRAFFIC_TOTALS,
  money,
} from "../data/mockTier1";
import { theme } from "../styles";
import { DeltaBadge, Panel, RankedRow, Tabs } from "./shared";

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

function buildDateLabels(count, endDateStr) {
  const end = new Date(endDateStr);
  const labels = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString("en-US", { day: "2-digit", month: "short" }));
  }
  return labels;
}

function rowsFrom(list, { labelKey, valueKey, subKey, subFmt, valueFmt, valueColor }) {
  const max = Math.max(...list.map((d) => d[valueKey]));
  return list.map((d) => ({
    label: d[labelKey],
    sublabel: subKey ? (subFmt ? subFmt(d[subKey]) : d[subKey]) : undefined,
    pct: (d[valueKey] / max) * 100,
    value: valueFmt ? valueFmt(d[valueKey]) : d[valueKey].toLocaleString(),
    valueColor,
  }));
}

// ---- premium, ultra-minimal chart primitives — Linear/Vercel/Stripe style:
// white inset, single accent + neutral grey, no chrome, no legends. ----

function ChartTooltip({ active, payload, label, moneyKey = "revenue" }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: theme.chartBg,
        border: `1px solid ${theme.chartBorder}`,
        borderRadius: 8,
        padding: "8px 11px",
        fontFamily: "'Geist Sans', sans-serif",
      }}
    >
      <div style={{ fontSize: 11, color: theme.faint, marginBottom: 5 }}>{label}</div>
      {payload.map((p) => (
        <div
          key={p.dataKey}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 18,
            fontSize: 12.5,
            color: p.dataKey === moneyKey ? theme.credit : theme.chartGray,
          }}
        >
          <span style={{ textTransform: "capitalize" }}>{p.dataKey}</span>
          <span className="mono" style={{ fontWeight: 500 }}>
            {p.dataKey === moneyKey ? money(p.value) : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

const axisTick = { fontSize: 10.5, fill: theme.chartAxis, fontFamily: "'Geist Sans', sans-serif" };

export default function OverviewView() {
  const [sourceTab, setSourceTab] = useState("referrer");
  const [geoTab, setGeoTab] = useState("country");
  const [viewTab, setViewTab] = useState("page");
  const [techTab, setTechTab] = useState("browser");
  const [journeyTab, setJourneyTab] = useState("journey");
  const [aiTab, setAiTab] = useState("ai");

  const revenueKpi = kpi("Revenue (30d)");
  const visitorsKpi = kpi("Visitors (30d)");
  const conversionKpi = kpi("Conversion rate");

  const revenuePerVisitor = revenueKpi.value / visitorsKpi.value;

  const { bounceRate, avgSession } = useMemo(() => {
    const totalViews = PAGES.reduce((s, p) => s + p.views, 0);
    const weightedBounce = PAGES.reduce((s, p) => s + p.bounce * p.views, 0) / totalViews;
    const weightedSeconds =
      PAGES.reduce((s, p) => s + parseTimeToSeconds(p.avgTime) * p.views, 0) / totalViews;
    return { bounceRate: weightedBounce, avgSession: formatSeconds(weightedSeconds) };
  }, []);

  const dateLabels = useMemo(() => buildDateLabels(REVENUE_TREND.length, "2026-07-08"), []);

  const chartData = useMemo(
    () =>
      REVENUE_TREND.map((r, idx) => ({
        day: dateLabels[idx],
        revenue: r.v,
        visits: PAGEVIEW_TREND[idx] ? PAGEVIEW_TREND[idx].views : 0,
      })),
    [dateLabels]
  );

  // Single strip of the seven headline numbers, in the exact order the
  // reference product shows them — visitors first, revenue right after,
  // everything else supporting context.
  const metrics = [
    { label: "Visitors", value: visitorsKpi.value.toLocaleString(), delta: visitorsKpi.delta, inverse: false },
    { label: "Revenue", value: money(revenueKpi.value), delta: revenueKpi.delta },
    { label: "Conversion rate", value: `${conversionKpi.value.toFixed(2)}%`, delta: conversionKpi.delta },
    { label: "Revenue/visitor", value: money(Math.round(revenuePerVisitor * 100) / 100), delta: 21 },
    { label: "Bounce rate", value: `${Math.round(bounceRate)}%`, delta: -3, inverse: true },
    { label: "Session time", value: avgSession, delta: undefined },
    { label: "Online", value: LIVE_VISITORS.activeNow, delta: undefined, isLive: true },
  ];

  const sourceRows = useMemo(() => {
    if (sourceTab === "referrer") {
      return rowsFrom(REFERRERS, { labelKey: "source", valueKey: "revenue", subKey: "visits", subFmt: (v) => `${v.toLocaleString()} vis.`, valueFmt: money, valueColor: theme.credit });
    }
    if (sourceTab === "campaign") {
      return rowsFrom(UTM_CAMPAIGNS, { labelKey: "campaign", valueKey: "revenue", subKey: "conversions", subFmt: (v) => `${v} conv.`, valueFmt: money, valueColor: theme.credit });
    }
    return rowsFrom(GSC_DATA.topKeywords, { labelKey: "keyword", valueKey: "clicks", subKey: "impressions", subFmt: (v) => `${v.toLocaleString()} impr.`, valueColor: theme.muted });
  }, [sourceTab]);

  const geoRows = useMemo(() => {
    const src = geoTab === "country" ? COUNTRIES : geoTab === "region" ? REGIONS : CITIES;
    return rowsFrom(src, { labelKey: "label", valueKey: "revenue", subKey: "visits", subFmt: (v) => `${v.toLocaleString()} vis.`, valueFmt: money, valueColor: theme.credit });
  }, [geoTab]);

  const viewRows = useMemo(() => {
    const src = viewTab === "page" ? PAGES : viewTab === "entry" ? ENTRY_PAGES : EXIT_LINKS;
    return rowsFrom(src, { labelKey: "path", valueKey: "views", subKey: "avgTime", valueColor: theme.muted });
  }, [viewTab]);

  const techRows = useMemo(() => {
    const src = techTab === "browser" ? BROWSERS : techTab === "os" ? OPERATING_SYSTEMS : DEVICES;
    return rowsFrom(src, { labelKey: "label", valueKey: "visits", subKey: "pct", subFmt: (v) => `${v}%`, valueColor: theme.muted });
  }, [techTab]);

  const journeyRows = useMemo(() => {
    if (journeyTab === "goal") return rowsFrom(GOALS, { labelKey: "name", valueKey: "completed", subKey: "rate", subFmt: (v) => `${v}%`, valueColor: theme.credit });
    if (journeyTab === "funnel") return rowsFrom(FUNNELS[0].steps, { labelKey: "name", valueKey: "count", subKey: "dropoff", subFmt: (v) => `${v}% drop`, valueColor: theme.muted });
    if (journeyTab === "user") {
      const list = PAYMENT_JOURNEYS.slice().sort((a, b) => b.spent - a.spent);
      return rowsFrom(list, { labelKey: "name", valueKey: "spent", subKey: "source", valueFmt: money, valueColor: theme.credit });
    }
    return null; // "journey" tab renders its own table below
  }, [journeyTab]);

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

      {/* Single metric strip — seven numbers in one row, exactly like the
          reference dashboard's top bar. No signal/context split; the order
          itself tells you what matters (visitors → revenue → efficiency). */}
      <div
        className="panel"
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: 14,
          padding: "16px 20px",
        }}
      >
        {metrics.map((m, idx) => (
          <div
            key={m.label}
            style={{
              flex: "1 1 120px",
              paddingLeft: idx === 0 ? 0 : 20,
              borderLeft: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
            }}
          >
            <div className="mono" style={{ fontSize: 10, color: theme.faint, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
              {m.label}
              {m.isLive && <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: theme.credit, marginLeft: 6, verticalAlign: "middle" }} />}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="mono" style={{ fontSize: 19, fontWeight: 500, letterSpacing: -0.2, color: theme.text }}>
                {m.value}
              </span>
              <DeltaBadge delta={m.delta} inverse={m.inverse} />
            </div>
          </div>
        ))}
      </div>

      {/* Main chart — premium, ultra-minimal SaaS style: white inset, single
          accent (revenue) over a neutral grey reference line (visits). */}
      <div className="panel" style={{ padding: "20px 22px", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 14.5, fontWeight: 500, color: theme.text, fontFamily: "'Geist Sans', sans-serif" }}>
            Revenue vs. visitors
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="ghost" style={dropdownBtnStyle}>
              Last 30 days <ChevronDown size={13} />
            </button>
            <button type="button" className="ghost" style={dropdownBtnStyle}>
              Daily <ChevronDown size={13} />
            </button>
          </div>
        </div>

        <div
          style={{
            background: theme.chartBg,
            border: `1px solid ${theme.chartBorder}`,
            borderRadius: 10,
            padding: "20px 8px 6px",
          }}
        >
          <div style={{ height: 210 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 0, right: 14, bottom: 0, left: 6 }}>
                <CartesianGrid vertical={false} stroke={theme.chartGrid} />
                <XAxis dataKey="day" tick={axisTick} axisLine={{ stroke: theme.chartBorder }} tickLine={false} interval="preserveStartEnd" />
                <YAxis
                  yAxisId="visits"
                  orientation="left"
                  tick={axisTick}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                  tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v)}
                />
                <YAxis
                  yAxisId="revenue"
                  orientation="right"
                  tick={axisTick}
                  axisLine={false}
                  tickLine={false}
                  width={44}
                  tickFormatter={(v) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}K` : `$${v}`)}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: theme.chartGrid }} />
                <Bar yAxisId="revenue" dataKey="revenue" fill={theme.credit} radius={[6, 6, 0, 0]} maxBarSize={18} />
                <Line
                  yAxisId="visits"
                  type="monotone"
                  dataKey="visits"
                  stroke={theme.chartGray}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: theme.chartGray, strokeWidth: 0 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel
          title="Where the revenue came from"
          tabs={[
            { id: "referrer", label: "Referrer" },
            { id: "campaign", label: "Campaign" },
            { id: "keyword", label: "Keyword" },
          ]}
          tabValue={sourceTab}
          onTabChange={setSourceTab}
        >
          {sourceRows.map((r, idx) => (
            <RankedRow key={r.label} {...r} first={idx === 0} />
          ))}
        </Panel>

        <Panel
          title="Where they are"
          tabs={[
            { id: "country", label: "Country" },
            { id: "region", label: "Region" },
            { id: "city", label: "City" },
          ]}
          tabValue={geoTab}
          onTabChange={setGeoTab}
        >
          {geoRows.map((r, idx) => (
            <RankedRow key={r.label} {...r} first={idx === 0} />
          ))}
        </Panel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel
          title="What they viewed"
          tabs={[
            { id: "page", label: "Page" },
            { id: "entry", label: "Entry page" },
            { id: "exit", label: "Exit link" },
          ]}
          tabValue={viewTab}
          onTabChange={setViewTab}
        >
          {viewRows.map((r, idx) => (
            <RankedRow key={r.label} {...r} first={idx === 0} />
          ))}
        </Panel>

        <Panel
          title="How they got here"
          tabs={[
            { id: "browser", label: "Browser" },
            { id: "os", label: "OS" },
            { id: "device", label: "Device" },
          ]}
          tabValue={techTab}
          onTabChange={setTechTab}
        >
          {techRows.map((r, idx) => (
            <RankedRow key={r.label} {...r} first={idx === 0} />
          ))}
        </Panel>
      </div>

      {/* Visitor journeys — who actually completed the Payment goal, where
          they came from, and how long it took them. */}
      <div className="panel" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
          <Tabs
            options={[
              { id: "goal", label: "Goal" },
              { id: "funnel", label: "Funnel" },
              { id: "user", label: "User" },
              { id: "journey", label: "Journey" },
            ]}
            value={journeyTab}
            onChange={setJourneyTab}
          />
          {journeyTab === "journey" && (
            <span className="mono" style={{ fontSize: 11.5, color: theme.faint }}>
              Goal: <span style={{ color: theme.text }}>Payment</span> · {PAYMENT_JOURNEYS.length}
            </span>
          )}
        </div>

        {journeyTab === "journey" ? (
          <div>
            <div
              className="mono"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 0.8fr 1fr 1.2fr",
                fontSize: 10.5,
                color: theme.faint,
                textTransform: "uppercase",
                letterSpacing: 0.8,
                padding: "0 4px 10px",
                borderBottom: `1px solid ${theme.lineFaint}`,
              }}
            >
              <span>Visitor</span>
              <span>Source</span>
              <span>Spent</span>
              <span>Time to complete</span>
              <span>Completed at</span>
            </div>
            {PAYMENT_JOURNEYS.map((v, idx) => (
              <div
                key={v.name + idx}
                className="row-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 0.8fr 1fr 1.2fr",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 4px",
                  borderTop: idx === 0 ? "none" : `1px solid ${theme.lineFaint}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: theme.lineFaint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {v.flag}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: theme.text }}>
                      {v.name}
                      {v.customer && (
                        <span
                          className="mono"
                          style={{
                            fontSize: 9.5,
                            color: theme.credit,
                            border: `1px solid ${theme.credit}55`,
                            borderRadius: 4,
                            padding: "1px 5px",
                            textTransform: "uppercase",
                          }}
                        >
                          Customer
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 11.5, color: theme.faint, marginTop: 2 }}>
                      {v.device} · {v.os} · {v.browser}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: theme.muted }}>{v.source}</div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 500, color: theme.credit }}>{money(v.spent)}</div>
                <div style={{ fontSize: 12.5, color: theme.muted }}>{v.timeToComplete}</div>
                <div style={{ fontSize: 12.5, color: theme.faint }}>{v.completedAt}</div>
              </div>
            ))}
          </div>
        ) : (
          journeyRows.map((r, idx) => <RankedRow key={r.label} {...r} first={idx === 0} />)
        )}
      </div>

      {/* AI & bot traffic — how much of "who sent them" is AI answer engines
          vs. classic search indexing, plus which assistants specifically. */}
      <div className="panel" style={{ padding: "18px 20px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <button type="button" className={`pill-tab${aiTab === "ai" ? " active" : ""}`} onClick={() => setAiTab("ai")}>
            AI answers <span className="mono">{AI_TRAFFIC_TOTALS.aiAnswers}</span>
          </button>
          <button type="button" className={`pill-tab${aiTab === "indexing" ? " active" : ""}`} onClick={() => setAiTab("indexing")}>
            Indexing <span className="mono">{AI_TRAFFIC_TOTALS.indexing}</span>
          </button>
          <button type="button" className={`pill-tab${aiTab === "training" ? " active" : ""}`} onClick={() => setAiTab("training")}>
            Training <span className="mono">{AI_TRAFFIC_TOTALS.training}</span>
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
          <div
            style={{
              background: theme.chartBg,
              border: `1px solid ${theme.chartBorder}`,
              borderRadius: 10,
              padding: "16px 8px 6px",
              height: 200,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={AI_TRAFFIC_TREND} margin={{ top: 4, right: 14, bottom: 0, left: 0 }}>
                <CartesianGrid vertical={false} stroke={theme.chartGrid} />
                <XAxis dataKey="day" tick={axisTick} axisLine={{ stroke: theme.chartBorder }} tickLine={false} interval="preserveStartEnd" />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} width={30} />
                <Tooltip content={<ChartTooltip moneyKey="__none" />} />
                <Line type="monotone" dataKey="aiAnswers" stroke={theme.credit} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: theme.credit, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="indexing" stroke={theme.chartGray} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: theme.chartGray, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            {AI_ASSISTANTS.map((a, idx) => (
              <RankedRow
                key={a.label}
                label={a.label}
                value={a.visits.toLocaleString()}
                pct={(a.visits / AI_ASSISTANTS[0].visits) * 100}
                valueColor={idx === 0 ? theme.credit : theme.muted}
                first={idx === 0}
              />
            ))}
          </div>
        </div>
      </div>

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
    </>
  );
}

const dropdownBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12.5,
  padding: "6px 11px",
};
