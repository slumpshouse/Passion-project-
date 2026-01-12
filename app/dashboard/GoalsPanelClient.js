"use client";

import { useState, useEffect } from "react";

function clampPct(value) {
  return Math.max(0, Math.min(100, value));
}

function formatMoney(value) {
  const num = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return `$${num.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function toUiGoal(goal) {
  const targetAmount = typeof goal?.targetAmount === "number" ? goal.targetAmount : 0;
  const currentAmount = typeof goal?.currentAmount === "number" ? goal.currentAmount : 0;
  const pct = targetAmount > 0 ? Math.round((currentAmount / targetAmount) * 100) : 0;
  return {
    id: goal.id,
    name: goal.name,
    targetAmount,
    currentAmount,
    pct: clampPct(pct),
    left: formatMoney(currentAmount),
    right: formatMoney(targetAmount),
    color: goal.color || "bg-blue-600",
  };
}

export default function GoalsPanelClient({ userId }) {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", target: "", current: "" });
  const [editingGoal, setEditingGoal] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load goals from DB when logged in; otherwise fall back to localStorage.
  useEffect(() => {
    let cancelled = false;
    setError("");

    async function loadFromDb() {
      setLoading(true);
      try {
        const resp = await fetch(`/api/goals?userId=${encodeURIComponent(userId)}`);
        const data = await resp.json().catch(() => null);
        if (!resp.ok || !data?.success) {
          throw new Error(data?.error || `Failed to fetch goals (${resp.status})`);
        }
        if (!cancelled) {
          const mapped = Array.isArray(data.goals) ? data.goals.map(toUiGoal) : [];
          setGoals(mapped);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Failed to fetch goals");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    function loadFromLocalStorage() {
      try {
        const storageKey = userId ? `user_savings_goals_${userId}` : "user_savings_goals";
        const savedGoals = localStorage.getItem(storageKey);
        if (savedGoals) setGoals(JSON.parse(savedGoals));
        else setGoals([]);
      } catch {
        setGoals([]);
      }
    }

    if (userId) loadFromDb();
    else loadFromLocalStorage();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Save goals to localStorage only when logged out.
  useEffect(() => {
    if (userId) return;
    try {
      const storageKey = "user_savings_goals";
      if (goals.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(goals));
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch {
      // ignore
    }
  }, [goals, userId]);

  const addGoal = async () => {
    const targetNum = parseFloat(form.target) || 0;
    const currentNum = parseFloat(form.current) || 0;
    const pct = targetNum > 0 ? Math.round((currentNum / targetNum) * 100) : 0;

    setError("");
    
    if (editingGoal) {
      // Update existing goal
      const updatedGoal = {
        ...editingGoal,
        name: form.name || editingGoal.name,
        targetAmount: targetNum,
        currentAmount: currentNum,
        pct: clampPct(pct),
        left: formatMoney(currentNum),
        right: formatMoney(targetNum),
      };

      if (userId && editingGoal.id && !String(editingGoal.id).startsWith("user-")) {
        try {
          setLoading(true);
          const resp = await fetch("/api/goals", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: editingGoal.id,
              name: updatedGoal.name,
              targetAmount: targetNum,
              currentAmount: currentNum,
              deadline: null,
              color: updatedGoal.color,
            }),
          });
          const data = await resp.json().catch(() => null);
          if (!resp.ok || !data?.success) {
            throw new Error(data?.error || `Failed to update goal (${resp.status})`);
          }
          setGoals((prev) => prev.map((g) => (g.id === editingGoal.id ? toUiGoal(data.goal) : g)));
        } catch (e) {
          setError(e?.message || "Failed to update goal");
        } finally {
          setLoading(false);
        }
      } else {
        setGoals((prev) => prev.map((g) => (g.id === editingGoal.id ? updatedGoal : g)));
      }

      setEditingGoal(null);
    } else {
      // Add new goal
      const colors = ["bg-blue-600", "bg-violet-500", "bg-emerald-500", "bg-amber-500", "bg-pink-500", "bg-indigo-500"];
      const colorIndex = goals.filter(g => !g.isDefault).length % colors.length;

      const name = form.name || "New Goal";
      const color = colors[colorIndex];

      if (userId) {
        try {
          setLoading(true);
          const resp = await fetch("/api/goals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              name,
              targetAmount: targetNum,
              currentAmount: currentNum,
              deadline: null,
              color,
            }),
          });
          const data = await resp.json().catch(() => null);
          if (!resp.ok || !data?.success) {
            throw new Error(data?.error || `Failed to create goal (${resp.status})`);
          }
          setGoals((s) => [toUiGoal(data.goal), ...s]);
        } catch (e) {
          setError(e?.message || "Failed to create goal");
        } finally {
          setLoading(false);
        }
      } else {
        const newGoal = {
          id: `user-${Date.now()}`,
          name,
          targetAmount: targetNum,
          currentAmount: currentNum,
          pct: clampPct(pct),
          left: formatMoney(currentNum),
          right: formatMoney(targetNum),
          color,
          isDefault: false,
        };
        setGoals((s) => [newGoal, ...s]);
      }
    }
    setForm({ name: "", target: "", current: "" });
    setShowForm(false);
  };

  const deleteGoal = async (goalId) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setError("");
      if (userId && goalId && !String(goalId).startsWith("user-")) {
        try {
          setLoading(true);
          const resp = await fetch(`/api/goals?id=${encodeURIComponent(goalId)}`, {
            method: "DELETE",
          });
          const data = await resp.json().catch(() => null);
          if (!resp.ok || !data?.success) {
            throw new Error(data?.error || `Failed to delete goal (${resp.status})`);
          }
          setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
        } catch (e) {
          setError(e?.message || "Failed to delete goal");
        } finally {
          setLoading(false);
        }
      } else {
        setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
      }
    }
  };

  const editGoal = (goal) => {
    setEditingGoal(goal);
    const currentAmount = typeof goal?.currentAmount === "number" ? goal.currentAmount : parseFloat(goal.left?.replace(/[^0-9.]/g, '')) || 0;
    const targetAmount = typeof goal?.targetAmount === "number" ? goal.targetAmount : parseFloat(goal.right?.replace(/[^0-9.]/g, '')) || 0;
    
    setForm({
      name: goal.name,
      target: targetAmount.toString(),
      current: currentAmount.toString()
    });
    setShowForm(true);
  };

  return (
    <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold tracking-tight">Savings Goals</div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 text-foreground/70"
          aria-label="Add goal"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {!userId ? (
          <div className="text-xs text-foreground/60">
            You’re not logged in. Goals will only save on this device.
          </div>
        ) : null}

        {error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : null}

        {loading ? (
          <div className="text-sm text-foreground/60">Loading…</div>
        ) : null}

        {goals.length === 0 && (
          <div className="text-sm text-foreground/60">
            No savings goals yet. Click "Add New Goal" to create your first goal.
          </div>
        )}

        {goals.length > 0 && goals.map((g, idx) => (
          <div key={g.id || `${g.name}-${idx}`} className="group p-3 rounded-lg transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-foreground/60" aria-hidden="true">
                  ◎
                </span>
                <div className="text-sm font-medium">{g.name}</div>
                {g.isDefault && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-foreground/70">{g.pct}%</div>
                <button
                  onClick={() => editGoal(g)}
                  className="h-7 w-7 rounded-md border border-foreground/10 text-foreground/50 flex items-center justify-center"
                  aria-label={`Edit ${g.name} goal`}
                  title="Edit goal"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteGoal(g.id)}
                  className="h-7 w-7 rounded-md border border-foreground/10 text-foreground/50 flex items-center justify-center"
                  aria-label={`Delete ${g.name} goal`}
                  title="Delete goal"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 w-full rounded-full bg-foreground/10">
                <div className={`h-2 rounded-full ${g.color}`} style={{ width: `${Math.max(0, Math.min(100, g.pct))}%` }} />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-foreground/60">
              <span>{g.left}</span>
              <span>{g.right}</span>
            </div>
          </div>
        ))}
      </div>

      {showForm ? (
        <div className="mt-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-foreground/70">Goal name</label>
            <input
              className="mt-2 w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Vacation Fund"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground/70">Target amount</label>
              <input
                className="mt-2 w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
                value={form.target}
                onChange={(e) => setForm((f) => ({ ...f, target: e.target.value }))}
                placeholder="5000"
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70">Current amount</label>
              <input
                className="mt-2 w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
                value={form.current}
                onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))}
                placeholder="0"
                inputMode="decimal"
              />
            </div>
          </div>

            <div className="flex gap-3">
            <button
              type="button"
              onClick={addGoal}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white"
            >
              {editingGoal ? 'Update Goal' : 'Save Goal'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingGoal(null);
                setForm({ name: "", target: "", current: "" });
              }}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl border border-foreground/10 px-4 text-sm font-medium text-foreground/80"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white"
        >
          Add New Goal
        </button>
      ) : null}
    </div>
  );
}
