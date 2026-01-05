"use client";

import { useState, useEffect } from "react";

export default function PaycheckForm({ editingPaycheck, onAddPaycheck, onCancel }) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    employer: "",
    date: new Date().toISOString().split('T')[0],
    payPeriod: "weekly"
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editingPaycheck) {
      setForm({
        amount: editingPaycheck.amount.toString(),
        description: editingPaycheck.description,
        employer: editingPaycheck.employer,
        date: editingPaycheck.date,
        payPeriod: editingPaycheck.payPeriod
      });
    }
  }, [editingPaycheck]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    
    if (!form.description.trim()) {
      newErrors.description = "Please enter a description (e.g., Salary, Hourly Pay)";
    }
    
    if (!form.employer.trim()) {
      newErrors.employer = "Please enter employer/source";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const paycheck = {
      id: editingPaycheck ? editingPaycheck.id : Date.now().toString(),
      amount: parseFloat(form.amount),
      description: form.description.trim(),
      employer: form.employer.trim(),
      payPeriod: form.payPeriod,
      date: form.date,
      timestamp: editingPaycheck ? editingPaycheck.timestamp : new Date().toISOString(),
      type: 'paycheck'
    };

    onAddPaycheck(paycheck);
    
    // Reset form only if not editing
    if (!editingPaycheck) {
      setForm({
        amount: "",
        description: "",
        employer: "",
        date: new Date().toISOString().split('T')[0],
        payPeriod: "weekly"
      });
      setErrors({});
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Add Paycheck</h3>
          <p className="text-sm text-foreground/60 mt-1">Record your income from work</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 text-lg">💰</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              placeholder="0.00"
              className={`w-full rounded-md border px-3 py-2 bg-background text-sm ${
                errors.amount ? 'border-rose-500' : 'border-foreground/15'
              }`}
            />
            {errors.amount && (
              <p className="text-sm text-rose-500 mt-1">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Pay Period
            </label>
            <select
              value={form.payPeriod}
              onChange={(e) => handleChange("payPeriod", e.target.value)}
              className="w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="one-time">One-time</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-2">
            Description
          </label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Salary, Hourly Pay, Bonus, etc."
            className={`w-full rounded-md border px-3 py-2 bg-background text-sm ${
              errors.description ? 'border-rose-500' : 'border-foreground/15'
            }`}
          />
          {errors.description && (
            <p className="text-sm text-rose-500 mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-2">
            Employer/Source
          </label>
          <input
            type="text"
            value={form.employer}
            onChange={(e) => handleChange("employer", e.target.value)}
            placeholder="Company name or income source"
            className={`w-full rounded-md border px-3 py-2 bg-background text-sm ${
              errors.employer ? 'border-rose-500' : 'border-foreground/15'
            }`}
          />
          {errors.employer && (
            <p className="text-sm text-rose-500 mt-1">{errors.employer}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-2">
            Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:opacity-95"
          >
            {editingPaycheck ? 'Update Paycheck' : 'Add Paycheck'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-foreground/10 px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}