"use client";

import { useState, useEffect } from "react";

export default function useDatabaseTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Load current user and transactions on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      // Start with empty transactions for a fresh account
      const savedTransactions = JSON.parse(localStorage.getItem('user_transactions') || '[]');
      setTransactions(savedTransactions);
    }
  }, []);

  const loadTransactions = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/transactions?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    // For now, use localStorage as fallback
    try {
      if (currentUser?.id) {
        const response = await fetch('/api/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...transaction,
            userId: currentUser.id
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          setTransactions(prev => [data.transaction, ...prev]);
          return;
        }
      }
    } catch (error) {
      console.log('Database unavailable, using localStorage:', error.message);
    }

    // Fallback to localStorage
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setTransactions(prev => {
      const updated = [newTransaction, ...prev];
      localStorage.setItem('budgetTracker_transactions', JSON.stringify(updated));
      return updated;
    });
  };

  const updateTransaction = async (updatedTransaction) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      });

      const data = await response.json();
      
      if (data.success) {
        setTransactions(prev => {
          const updated = prev.map(t => t.id === updatedTransaction.id ? data.transaction : t);
          localStorage.setItem('budgetTracker_transactions', JSON.stringify(updated));
          return updated;
        });
        return;
      }
    } catch (error) {
      console.log('Database unavailable, using localStorage:', error.message);
    }

    // Fallback to localStorage
    setTransactions(prev => {
      const updated = prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t);
      localStorage.setItem('budgetTracker_transactions', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteTransaction = async (transactionId) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      try {
        const response = await fetch(`/api/transactions?id=${transactionId}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        
        if (data.success) {
          setTransactions(prev => {
            const filtered = prev.filter(t => t.id !== transactionId);
            localStorage.setItem('budgetTracker_transactions', JSON.stringify(filtered));
            return filtered;
          });
          return;
        }
      } catch (error) {
        console.log('Database unavailable, using localStorage:', error.message);
      }

      // Fallback to localStorage
      setTransactions(prev => {
        const filtered = prev.filter(t => t.id !== transactionId);
        localStorage.setItem('budgetTracker_transactions', JSON.stringify(filtered));
        return filtered;
      });
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
    loading,
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