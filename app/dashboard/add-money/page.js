"use client";

import PaycheckForm from "../PaycheckForm";
import { useRouter } from "next/navigation";

export default function AddMoneyPage() {
  const router = useRouter();

  const onAddPaycheck = (paycheck) => {
    try {
      const raw = localStorage.getItem('user_paychecks');
      const list = raw ? JSON.parse(raw) : [];
      const next = [paycheck, ...list];
      localStorage.setItem('user_paychecks', JSON.stringify(next));
    } catch (e) {
      console.error('Failed saving paycheck', e);
    }
    router.push('/dashboard');
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Add Money</h1>
        <p className="text-foreground/60">Record a paycheck or income entry.</p>
      </div>

      <PaycheckForm onAddPaycheck={onAddPaycheck} onCancel={() => router.back()} />
    </main>
  );
}
