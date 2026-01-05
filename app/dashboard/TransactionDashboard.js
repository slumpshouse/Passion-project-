"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TransactionForm from "./TransactionForm";
import PaycheckForm from "./PaycheckForm";
import TransactionHistory from "./TransactionHistory";
import AiInsightsClient from "./AiInsightsClient";
import GoalsPanelClient from "./GoalsPanelClient";
import TransactionManager from "./useDatabaseTransactions";

function StatCard({ title, amount, sub, iconBg = "bg-blue-50", iconColor = "text-blue-600" }) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
      <div>
        <div className="text-sm text-foreground/70">{title}</div>
        <div className="mt-3 text-lg font-semibold tracking-tight">{amount}</div>
        {sub ? <div className="mt-1 text-sm text-foreground/60">{sub}</div> : null}
      </div>
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`} aria-hidden="true">
        <div className="h-5 w-5 rounded-full bg-current/20" />
      </div>
    </div>
  );
}

function MiniIcon({ bg = "bg-blue-50", color = "text-blue-600" }) {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${color}`} aria-hidden="true">
      <div className="h-5 w-5 rounded-full bg-current/20" />
    </div>
  );
}

function DonutChart({ segments, size = 150, stroke = 18 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const withOffsets = segments.reduce(
    (acc, s) => {
      const len = (s.pct / 100) * c;
      const dash = `${len} ${c - len}`;
      const item = {
        key: s.name,
        color: s.color,
        dash,
        offset: acc.total,
      };
      return {
        total: acc.total + len,
        items: [...acc.items, item],
      };
    },
    { total: 0, items: [] },
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Spending by category chart">
      <g transform={`translate(${size / 2} ${size / 2})`}>
        <circle r={r} fill="none" stroke="currentColor" className="text-foreground/10" strokeWidth={stroke} />
        {withOffsets.items.map((s) => (
          <circle
            key={s.key}
            r={r}
            fill="none"
            stroke="currentColor"
            className={s.color}
            strokeWidth={stroke}
            strokeDasharray={s.dash}
            strokeDashoffset={-s.offset}
            strokeLinecap="butt"
            transform="rotate(-90)"
          />
        ))}
      </g>
    </svg>
  );
}

export default function TransactionDashboard() {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showPaycheckForm, setShowPaycheckForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editingPaycheck, setEditingPaycheck] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview, transactions
  const [currentUser, setCurrentUser] = useState(null);
  const [paychecks, setPaychecks] = useState([]);

  // Check user role on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    
    // Clear data for fresh start if flag not set
    const shouldReset = localStorage.getItem('account_reset_flag');
    if (!shouldReset) {
      localStorage.removeItem('user_paychecks');
      localStorage.setItem('account_reset_flag', 'true');
    }
    
    // Load paychecks from localStorage
    const savedPaychecks = localStorage.getItem('user_paychecks');
    if (savedPaychecks) {
      setPaychecks(JSON.parse(savedPaychecks));
    }
  }, []);

  // Save paychecks whenever they change
  useEffect(() => {
    localStorage.setItem('user_paychecks', JSON.stringify(paychecks));
  }, [paychecks]);

  const handleAddPaycheck = (paycheck) => {
    if (editingPaycheck) {
      // Update existing paycheck
      setPaychecks(prev => prev.map(p => p.id === editingPaycheck.id ? paycheck : p));
      setEditingPaycheck(null);
    } else {
      // Add new paycheck
      setPaychecks(prev => [paycheck, ...prev]);
    }
    setShowPaycheckForm(false);
  };

  const handleEditPaycheck = (paycheck) => {
    setEditingPaycheck(paycheck);
    setShowPaycheckForm(true);
  };

  const deletePaycheck = (paycheckId) => {
    if (confirm('Are you sure you want to delete this paycheck?')) {
      setPaychecks(prev => prev.filter(p => p.id !== paycheckId));
    }
  };

  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    summary
  } = TransactionManager();

  // Calculate enhanced summary including paychecks
  const enhancedSummary = {
    ...summary,
    totalIncome: (summary.totalIncome || 0) + paychecks.reduce((sum, paycheck) => sum + parseFloat(paycheck.amount || 0), 0),
    get balance() {
      return this.totalIncome - summary.totalExpenses;
    }
  };

  const handleAddTransaction = (transaction) => {
    addTransaction(transaction);
    setShowTransactionForm(false);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionForm(true);
  };

  const handleUpdateTransaction = (transaction) => {
    updateTransaction(transaction);
    setEditingTransaction(null);
    setShowTransactionForm(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Convert category data for donut chart
  const categorySegments = Object.entries(summary.byCategory)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([category, amount], index) => {
      const colors = [
        "text-red-500",
        "text-blue-500", 
        "text-amber-500",
        "text-violet-500",
        "text-emerald-500",
        "text-pink-500"
      ];
      
      return {
        name: category,
        pct: summary.totalExpenses > 0 ? (amount / summary.totalExpenses) * 100 : 0,
        amount: formatCurrency(amount),
        color: colors[index] || "text-gray-500"
      };
    });

  // Convert transactions for AI insights (keeping old format)
  const transactionsForAI = transactions.map(t => ({
    name: t.description,
    cat: t.category,
    amount: t.type === 'income' ? `+${formatCurrency(t.amount)}` : formatCurrency(t.amount),
    date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    tone: t.type
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-foreground/60">Track your transactions and manage your finances</p>
          {currentUser && (
            <p className="text-sm text-foreground/60 mt-1">
              Welcome back, {currentUser.name}
              {currentUser.role === 'admin' && (
                <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  Admin
                </span>
              )}
            </p>
          )}
        </div>
        
        <div className="flex gap-3">
          {currentUser?.role === 'admin' && (
            <Link
              href="/rubric-evidence"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:opacity-95"
            >
              Rubric Evidence
            </Link>
          )}
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "overview" 
                ? "bg-blue-600 text-white" 
                : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "transactions" 
                ? "bg-blue-600 text-white" 
                : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20"
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => {
              setEditingPaycheck(null);
              setShowPaycheckForm(true);
            }}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-medium text-white hover:opacity-95"
          >
            Add Money
          </button>
          <button
            onClick={() => {
              setEditingTransaction(null);
              setShowTransactionForm(true);
            }}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white hover:opacity-95"
          >
            Add Expense
          </button>
        </div>
      </div>

      {/* Paycheck Form Modal */}
      {showPaycheckForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">{editingPaycheck ? 'Edit Paycheck' : 'Add Paycheck'}</h2>
                <button
                  onClick={() => {
                    setShowPaycheckForm(false);
                    setEditingPaycheck(null);
                  }}
                  className="text-foreground/60 hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <PaycheckForm 
                editingPaycheck={editingPaycheck}
                onAddPaycheck={handleAddPaycheck}
                onCancel={() => {
                  setShowPaycheckForm(false);
                  setEditingPaycheck(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">
                  {editingTransaction ? "Edit Transaction" : "Add Transaction"}
                </h2>
                <button
                  onClick={() => {
                    setShowTransactionForm(false);
                    setEditingTransaction(null);
                  }}
                  className="text-foreground/60 hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              
              <TransactionForm
                initialTransaction={editingTransaction}
                onAddTransaction={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                onCancel={() => {
                  setShowTransactionForm(false);
                  setEditingTransaction(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "overview" && (
        <>
          {/* AI Insights */}
          <AiInsightsClient transactions={transactionsForAI} />

          {/* Balance Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard 
              title="Total Balance" 
              amount={formatCurrency(enhancedSummary.balance)} 
              iconBg="bg-blue-50" 
              iconColor="text-blue-600" 
            />
            <StatCard 
              title="Paycheck for the week" 
              amount={formatCurrency(enhancedSummary.totalIncome)} 
              sub="All time"
              iconBg="bg-emerald-50" 
              iconColor="text-emerald-600" 
            />
            <StatCard 
              title="Total Expenses" 
              amount={formatCurrency(summary.totalExpenses)} 
              sub="All time"
              iconBg="bg-rose-50" 
              iconColor="text-rose-600" 
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* Spending by Category */}
              <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
                <div className="text-base font-semibold tracking-tight">Spending by Category</div>

                {categorySegments.length > 0 ? (
                  <div className="mt-6 grid items-center gap-8 sm:grid-cols-2">
                    <div className="flex justify-center">
                      <DonutChart segments={categorySegments} />
                    </div>

                    <div className="space-y-4">
                      {categorySegments.map((s) => (
                        <div key={s.name} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-4 w-4 rounded ${s.color.replace('text-', 'bg-')}`} />
                            <div>
                              <div className="text-sm font-medium">{s.name}</div>
                              <div className="text-xs text-foreground/60">{s.pct.toFixed(1)}%</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">{s.amount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-foreground/60">
                    <p>No expenses yet.</p>
                    <p className="text-sm mt-1">Add some transactions to see your spending breakdown!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Goals Panel */}
            <GoalsPanelClient />
          </div>

          {/* Recent Paychecks */}
          <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold tracking-tight">Recent Paychecks</h3>
              {paychecks.length > 3 && (
                <span className="text-sm text-blue-600">{paychecks.length} total</span>
              )}
            </div>

            {paychecks.length === 0 ? (
              <div className="text-center py-8 text-foreground/60">
                <p>No paychecks added yet.</p>
                <p className="text-sm mt-1">Add your first paycheck to track your income!</p>
              </div>
            ) : (
              <div className="divide-y divide-foreground/10">
                {paychecks.slice(0, 3).map((paycheck) => (
                  <div key={paycheck.id} className="py-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <MiniIcon 
                        bg="bg-emerald-50" 
                        color="text-emerald-600" 
                      />
                      <div>
                        <div className="text-sm font-medium">{paycheck.description}</div>
                        <div className="text-sm text-foreground/60">
                          {paycheck.employer} • {paycheck.payPeriod}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium text-emerald-600">
                          +{formatCurrency(paycheck.amount)}
                        </div>
                        <div className="text-sm text-foreground/60">
                          {new Date(paycheck.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditPaycheck(paycheck)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-lg border border-foreground/10 text-foreground/60 hover:text-blue-500 hover:border-blue-200 flex items-center justify-center"
                        aria-label="Edit paycheck"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deletePaycheck(paycheck.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-lg border border-foreground/10 text-foreground/60 hover:text-red-500 hover:border-red-200 flex items-center justify-center"
                        aria-label="Delete paycheck"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Transactions Preview */}
          <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold tracking-tight">Recent Transactions</h3>
              {transactions.length > 5 && (
                <button
                  onClick={() => setActiveTab("transactions")}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All
                </button>
              )}
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-8 text-foreground/60">
                <p>No transactions yet.</p>
                <p className="text-sm mt-1">Add your first transaction to get started!</p>
              </div>
            ) : (
              <div className="divide-y divide-foreground/10">
                {transactions.slice(0, 5).map((transaction) => {
                  const isIncome = transaction.type === "income";
                  const amountColor = isIncome ? "text-emerald-600" : "text-rose-500";
                  const amountPrefix = isIncome ? "+" : "-";

                  return (
                    <div key={transaction.id} className="py-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <MiniIcon 
                          bg={isIncome ? "bg-emerald-50" : "bg-rose-50"} 
                          color={isIncome ? "text-emerald-600" : "text-rose-500"} 
                        />
                        <div>
                          <div className="text-sm font-medium">{transaction.description}</div>
                          <div className="text-sm text-foreground/60">{transaction.category}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${amountColor}`}>
                            {amountPrefix}{formatCurrency(transaction.amount)}
                          </div>
                          <div className="text-sm text-foreground/60">
                            {new Date(transaction.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditTransaction(transaction)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-lg border border-foreground/10 text-foreground/60 hover:text-blue-500 hover:border-blue-200 flex items-center justify-center"
                          aria-label="Edit transaction"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-lg border border-foreground/10 text-foreground/60 hover:text-red-500 hover:border-red-200 flex items-center justify-center"
                          aria-label="Delete transaction"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "transactions" && (
        <TransactionHistory
          transactions={transactions}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={deleteTransaction}
        />
      )}
    </div>
  );
}