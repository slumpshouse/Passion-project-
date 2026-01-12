"use client";

import { useState } from "react";

export default function TransactionHistory({ transactions, onEditTransaction, onDeleteTransaction }) {
  const [filter, setFilter] = useState({
    category: "",
    type: "",
    dateFrom: "",
    dateTo: "",
    search: ""
  });

  const [sortBy, setSortBy] = useState("date"); // date, amount, category
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredAndSortedTransactions = () => {
    let filtered = transactions.filter(transaction => {
      // Category filter
      if (filter.category && transaction.category !== filter.category) {
        return false;
      }

      // Type filter
      if (filter.type && transaction.type !== filter.type) {
        return false;
      }

      // Date range filter
      if (filter.dateFrom && transaction.date < filter.dateFrom) {
        return false;
      }
      if (filter.dateTo && transaction.date > filter.dateTo) {
        return false;
      }

      // Search filter
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case "amount":
          aVal = Math.abs(a.amount);
          bVal = Math.abs(b.amount);
          break;
        case "category":
          aVal = a.category.toLowerCase();
          bVal = b.category.toLowerCase();
          break;
        case "date":
        default:
          aVal = new Date(a.date);
          bVal = new Date(b.date);
          break;
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const clearFilters = () => {
    setFilter({
      category: "",
      type: "",
      dateFrom: "",
      dateTo: "",
      search: ""
    });
  };

  const categories = [...new Set(transactions.map(t => t.category))].sort();
  const processedTransactions = filteredAndSortedTransactions();

  return (
    <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold tracking-tight">Transaction History</h3>
        <span className="text-sm text-foreground/60">
          {processedTransactions.length} of {transactions.length} transactions
        </span>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-foreground/5 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search transactions..."
              className="w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">
              Category
            </label>
            <select
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
              className="w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">
              Type
            </label>
            <select
              value={filter.type}
              onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
              className="w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={filter.dateFrom}
              onChange={(e) => setFilter(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={filter.dateTo}
              onChange={(e) => setFilter(prev => ({ ...prev, dateTo: e.target.value }))}
              className="w-full rounded-md border border-foreground/15 px-3 py-2 bg-background text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="mb-4 flex gap-2 text-sm">
        <span className="text-foreground/70">Sort by:</span>
        {["date", "amount", "category"].map(field => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            className={`px-3 py-1 rounded-md ${
              sortBy === field 
                ? "bg-blue-600 text-white" 
                : "bg-foreground/10 text-foreground/70"
            }`}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
            {sortBy === field && (
              <span className="ml-1">
                {sortOrder === "asc" ? "↑" : "↓"}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      {processedTransactions.length === 0 ? (
        <div className="text-center py-8 text-foreground/60">
          {transactions.length === 0 ? (
            <div>
              <p>No transactions yet.</p>
              <p className="text-sm mt-1">Add your first transaction above!</p>
            </div>
          ) : (
            <p>No transactions match your filters.</p>
          )}
        </div>
      ) : (
        <div className="divide-y divide-foreground/10">
          {processedTransactions.map(transaction => {
            const isIncome = transaction.type === "income";
            const amountColor = isIncome ? "text-emerald-600" : "text-rose-500";
            const amountPrefix = isIncome ? "+" : "-";

            return (
              <div key={transaction.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    isIncome ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
                  }`} aria-hidden="true">
                    <div className="h-5 w-5 rounded-full bg-current/20" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium truncate">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-foreground/60">
                          {transaction.category} • {formatDate(transaction.date)}
                        </p>
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className={`text-sm font-semibold ${amountColor}`}>
                          {amountPrefix}{formatCurrency(transaction.amount)}
                        </p>
                        
                        {(onEditTransaction || onDeleteTransaction) && (
                          <div className="flex gap-2 mt-2">
                            {onEditTransaction && (
                              <button
                                  onClick={() => onEditTransaction(transaction)}
                                  className="text-xs text-blue-600"
                                >
                                  Edit
                                </button>
                            )}
                            {onDeleteTransaction && (
                              <button
                                  onClick={() => onDeleteTransaction(transaction.id)}
                                  className="text-xs text-rose-600"
                                >
                                  Delete
                                </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}