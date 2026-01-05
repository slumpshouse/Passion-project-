"use client";

import { useState, useEffect } from "react";

export default function GoalsPanelClient({ initialGoals = [] }) {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", target: "", current: "" });
  const [editingGoal, setEditingGoal] = useState(null);

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('user_savings_goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      // Start with no default goals for new users
      setGoals([]);
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem('user_savings_goals', JSON.stringify(goals));
    } else {
      // Remove the storage key when there are no goals so new users see a blank state
      localStorage.removeItem('user_savings_goals');
    }
  }, [goals]);

  const addGoal = () => {
    const targetNum = parseFloat(form.target) || 0;
    const currentNum = parseFloat(form.current) || 0;
    const pct = targetNum > 0 ? Math.round((currentNum / targetNum) * 100) : 0;
    
    if (editingGoal) {
      // Update existing goal
      const updatedGoal = {
        ...editingGoal,
        name: form.name || editingGoal.name,
        pct: Math.max(0, Math.min(100, pct)),
        left: `$${currentNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
        right: `$${targetNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      };
      setGoals(prev => prev.map(g => g.id === editingGoal.id ? updatedGoal : g));
      setEditingGoal(null);
    } else {
      // Add new goal
      const colors = ["bg-blue-600", "bg-violet-500", "bg-emerald-500", "bg-amber-500", "bg-pink-500", "bg-indigo-500"];
      const colorIndex = goals.filter(g => !g.isDefault).length % colors.length;
      
      const newGoal = {
        id: `user-${Date.now()}`,
        name: form.name || "New Goal",
        pct: Math.max(0, Math.min(100, pct)),
        left: `$${currentNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
        right: `$${targetNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
        color: colors[colorIndex],
        isDefault: false
      };
      setGoals((s) => [newGoal, ...s]);
    }
    setForm({ name: "", target: "", current: "" });
    setShowForm(false);
  };

  const deleteGoal = (goalId) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    }
  };

  const editGoal = (goal) => {
    setEditingGoal(goal);
    // Parse current amounts from the goal's left and right values
    const currentAmount = parseFloat(goal.left.replace(/[^0-9.]/g, '')) || 0;
    const targetAmount = parseFloat(goal.right.replace(/[^0-9.]/g, '')) || 0;
    
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
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 text-foreground/70 hover:text-foreground"
          aria-label="Add goal"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {goals.length === 0 && (
          <div className="text-sm text-foreground/60">
            No savings goals yet. Click "Add New Goal" to create your first goal.
          </div>
        )}

        {goals.length > 0 && goals.map((g, idx) => (
          <div key={g.id || `${g.name}-${idx}`} className="group hover:bg-foreground/5 p-3 rounded-lg transition-colors">
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
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 rounded-md border border-foreground/10 text-foreground/50 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 flex items-center justify-center"
                  aria-label={`Edit ${g.name} goal`}
                  title="Edit goal"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteGoal(g.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 rounded-md border border-foreground/10 text-foreground/50 hover:text-red-500 hover:border-red-200 hover:bg-red-50 flex items-center justify-center"
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
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white hover:opacity-95"
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
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl border border-foreground/10 px-4 text-sm font-medium text-foreground/80 hover:text-foreground"
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
          className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white hover:opacity-95"
        >
          Add New Goal
        </button>
      ) : null}
    </div>
  );
}
