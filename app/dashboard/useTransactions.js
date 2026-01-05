"use client";

import { useState, useEffect } from "react";

export default function TransactionManager() {
  const [transactions, setTransactions] = useState([]);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('budgetTracker_transactions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTransactions(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error loading transactions:', error);
        setTransactions([]);
      }
    }
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('budgetTracker_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
  };

  const deleteTransaction = (transactionId) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
    }
  };

  // Calculate summary statistics
  const summary = transactions.reduce((acc, transaction) => {
    const amount = Math.abs(transaction.amount);
    
    if (transaction.type === 'income') {
      acc.totalIncome += amount;
    } else {
      acc.totalExpenses += amount;
      
      // Track by category
      if (!acc.byCategory[transaction.category]) {
        acc.byCategory[transaction.category] = 0;
      }
      acc.byCategory[transaction.category] += amount;
    }
    
    return acc;
  }, {
    totalIncome: 0,
    totalExpenses: 0,
    byCategory: {}
  });

  const balance = summary.totalIncome - summary.totalExpenses;

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    summary: {
      ...summary,
      balance,
      totalTransactions: transactions.length
    }
  };
}