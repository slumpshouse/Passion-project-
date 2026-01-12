"use client";

import { useState } from "react";
import TransactionHistory from "../dashboard/TransactionHistory";
import useDatabaseTransactions from "../dashboard/useDatabaseTransactions";
import TransactionForm from "../dashboard/TransactionForm";

export default function TransactionsPage() {
  const { transactions, updateTransaction, deleteTransaction } = useDatabaseTransactions();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionForm(true);
  };

  const handleUpdateTransaction = (transaction) => {
    updateTransaction(transaction);
    setEditingTransaction(null);
    setShowTransactionForm(false);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
        <p className="text-foreground/60">Your full transaction history and filters.</p>
      </div>

      <TransactionHistory
        transactions={transactions}
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={deleteTransaction}
      />

      {showTransactionForm && (
        <div className="fixed inset-0 w-full h-full bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[2147483647] overflow-hidden">
          <div className="relative bg-background rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 pb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Edit Transaction</h2>
                <button
                  onClick={() => {
                    setShowTransactionForm(false);
                    setEditingTransaction(null);
                  }}
                  className="text-foreground/60"
                >
                  ✕
                </button>
              </div>

              <TransactionForm
                initialTransaction={editingTransaction}
                onAddTransaction={handleUpdateTransaction}
                onCancel={() => {
                  setShowTransactionForm(false);
                  setEditingTransaction(null);
                }}
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-black" />
          </div>
        </div>
      )}
    </main>
  );
}
