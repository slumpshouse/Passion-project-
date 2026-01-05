"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "bt_biweekly_insights";
const STORAGE_AT_KEY = "bt_biweekly_insights_at";

function nowMs() {
  return Date.now();
}

function daysToMs(d) {
  return d * 24 * 60 * 60 * 1000;
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export default function AiInsightsClient({ transactions = [] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payload, setPayload] = useState(null);

  const tx = useMemo(() => transactions, [transactions]);

  async function generate({ automatic = false } = {}) {
    setLoading(true);
    setError("");

    try {
      const resp = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ periodDays: 14, transactions: tx }),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        const msg = data?.error || "Could not generate insights.";
        throw new Error(msg);
      }

      setPayload(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(STORAGE_AT_KEY, String(nowMs()));
    } catch (e) {
      const msg = e?.message || "Something went wrong.";
      setError(automatic ? "" : msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const cached = safeJsonParse(localStorage.getItem(STORAGE_KEY) || "");
    const lastAt = Number(localStorage.getItem(STORAGE_AT_KEY) || "0");

    if (cached) setPayload(cached);

    const shouldAuto = !lastAt || nowMs() - lastAt >= daysToMs(14);
    if (shouldAuto) generate({ automatic: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const insights = payload?.insights;

  return (
    <section className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold tracking-tight">AI Biweekly Summary</div>
          <div className="mt-1 text-sm text-foreground/60">Updates every 14 days based on your activity.</div>
        </div>

        <button
          type="button"
          onClick={() => generate({ automatic: false })}
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Generating…" : "Generate Now"}
        </button>
      </div>

      {error ? (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
      ) : null}

      {insights ? (
        <div className="mt-6">
          <div className="rounded-xl bg-foreground/5 p-5">
            <div className="text-sm font-semibold text-foreground/80">Summary</div>
            <div className="mt-2 text-sm leading-6 text-foreground/70">{insights.summary}</div>
          </div>

          {Array.isArray(insights.highlights) && insights.highlights.length ? (
            <div className="mt-6">
              <div className="text-sm font-semibold text-foreground/80">Highlights</div>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                {insights.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                      ✓
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {Array.isArray(insights.suggestions) && insights.suggestions.length ? (
            <div className="mt-6">
              <div className="text-sm font-semibold text-foreground/80">Suggestions</div>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                {insights.suggestions.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-0.5 text-blue-600" aria-hidden="true">
                      →
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {Array.isArray(insights.watchouts) && insights.watchouts.length ? (
            <div className="mt-6">
              <div className="text-sm font-semibold text-foreground/80">Watchouts</div>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                {insights.watchouts.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span className="mt-0.5 text-rose-600" aria-hidden="true">
                      !
                    </span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {insights.actionPlan ? (
            <div className="mt-6 space-y-6">
              <div className="text-base font-semibold text-foreground/80">Weekly Action Plan</div>
              
              {/* Weekly Goals */}
              {Array.isArray(insights.actionPlan.weeklyGoals) && insights.actionPlan.weeklyGoals.length ? (
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
                  <div className="text-sm font-semibold text-blue-800 mb-3">This Week's Goals</div>
                  <ul className="space-y-2 text-sm text-blue-700">
                    {insights.actionPlan.weeklyGoals.map((goal, index) => (
                      <li key={goal} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                          {index + 1}
                        </span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Spending Limits */}
              {insights.actionPlan.spendingLimits && Object.keys(insights.actionPlan.spendingLimits).length > 0 ? (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                  <div className="text-sm font-semibold text-amber-800 mb-3">Weekly Spending Limits</div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Object.entries(insights.actionPlan.spendingLimits).map(([category, limit]) => (
                      <div key={category} className="flex items-center justify-between bg-amber-100 rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-amber-800">{category}</span>
                        <span className="text-sm font-bold text-amber-900">{limit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Quick Wins */}
              {Array.isArray(insights.actionPlan.quickWins) && insights.actionPlan.quickWins.length ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5">
                  <div className="text-sm font-semibold text-emerald-800 mb-3">Quick Wins (Start Today!)</div>
                  <ul className="space-y-2 text-sm text-emerald-700">
                    {insights.actionPlan.quickWins.map((win) => (
                      <li key={win} className="flex items-start gap-3">
                        <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                          🎯
                        </span>
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-6 text-sm text-foreground/60">
          No summary yet. Click <span className="font-medium text-foreground/80">Generate Now</span>.
        </div>
      )}
    </section>
  );
}
