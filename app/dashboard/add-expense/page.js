"use client";

import TransactionForm from "../TransactionForm";
import useDatabaseTransactions from "../useDatabaseTransactions";
import { useRouter } from "next/navigation";

export default function AddExpensePage() {
  const router = useRouter();
  const { addTransaction } = useDatabaseTransactions();

  const onAddTransaction = (transaction) => {
    // Ensure transaction has an id/timestamp if hook fallback expects that
    addTransaction(transaction);
    router.push('/dashboard');
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Add Expense</h1>
        <p className="text-foreground/60">Add an expense to your transaction history.</p>
      </div>

      <TransactionForm onAddTransaction={onAddTransaction} onCancel={() => router.back()} />
    </main>
  );
}
