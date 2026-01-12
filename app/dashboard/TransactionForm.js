"use client";

import { useState } from "react";

const categories = [
  "Food & Dining",
  "Housing", 
  "Transportation",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Education",
  "Utilities",
  "Insurance",
  "Savings",
  "Other"
];

export default function TransactionForm({ onAddTransaction, onCancel, initialTransaction }) {
  const [form, setForm] = useState({
    amount: initialTransaction?.amount?.toString() || "",
    description: initialTransaction?.description || "",
    category: initialTransaction?.category || "",
    type: initialTransaction?.type || "expense",
    date: initialTransaction?.date || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    
    if (!form.description.trim()) {
      newErrors.description = "Please enter a description";
    }
    
    if (!form.category) {
      newErrors.category = "Please select a category";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const transaction = {
      id: initialTransaction?.id || Date.now().toString(),
      amount: parseFloat(form.amount),
      description: form.description.trim(),
      category: form.category,
      type: form.type,
      date: form.date,
      timestamp: initialTransaction?.timestamp || new Date().toISOString()
    };

    onAddTransaction(transaction);
    
    // Reset form only if not editing
    if (!initialTransaction) {
      setForm({
        amount: "",
        description: "",
        category: "",
        type: "expense",
        date: new Date().toISOString().split('T')[0]
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
      <h3 className="text-base font-semibold tracking-tight mb-6">
        {initialTransaction ? "Edit Transaction" : "Add Transaction"}
      </h3>
      
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
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
            >
              <option value="expense">Expense</option>
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
            placeholder="What did you buy?"
            className={`w-full rounded-md border px-3 py-2 bg-background text-sm ${
              errors.description ? 'border-rose-500' : 'border-foreground/15'
            }`}
          />
          {errors.description && (
            <p className="text-sm text-rose-500 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={`w-full rounded-md border px-3 py-2 bg-background text-sm ${
                errors.category ? 'border-rose-500' : 'border-foreground/15'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-rose-500 mt-1">{errors.category}</p>
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
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-medium text-white"
          >
            {initialTransaction ? "Update Transaction" : "Save Transaction"}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-foreground/10 px-6 text-sm font-medium text-foreground/80"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}