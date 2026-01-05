import AiInsightsClient from "./AiInsightsClient";

export const metadata = {
  title: "Dashboard · Budget Tracker",
  description: "Dashboard preview for Budget Tracker.",
};

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

function ProgressBar({ value, colorClass = "bg-blue-600" }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-foreground/10">
      <div className={`h-2 rounded-full ${colorClass}`} style={{ width: `${clamped}%` }} />
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

function IncomeExpensesChart() {
  // Values are illustrative to match the screenshot layout.
  const months = [
    { m: "Jan", income: 5000, expenses: 3200 },
    { m: "Feb", income: 5400, expenses: 2900 },
    { m: "Mar", income: 4800, expenses: 3100 },
    { m: "Apr", income: 5600, expenses: 2700 },
    { m: "May", income: 5300, expenses: 3400 },
    { m: "Jun", income: 5500, expenses: 2900 },
  ];
  const maxY = 6000;
  const chartW = 560;
  const chartH = 220;
  const padL = 44;
  const padR = 18;
  const padT = 16;
  const padB = 36;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const yToPx = (v) => padT + plotH - (v / maxY) * plotH;

  const groupW = plotW / months.length;
  const barW = Math.min(22, groupW * 0.28);
  const gap = Math.min(10, groupW * 0.12);

  const yTicks = [0, 1500, 3000, 4500, 6000];

  return (
    <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
      <div className="text-base font-semibold tracking-tight">Income vs Expenses</div>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="h-[260px] w-full min-w-[640px]"
          role="img"
          aria-label="Income vs expenses chart"
        >
          {/* grid + y axis labels */}
          {yTicks.map((t) => {
            const y = yToPx(t);
            return (
              <g key={t}>
                <line x1={padL} x2={chartW - padR} y1={y} y2={y} stroke="currentColor" className="text-foreground/10" />
                <text x={padL - 10} y={y + 4} textAnchor="end" fontSize="12" fill="currentColor" className="text-foreground/60">
                  {t}
                </text>
              </g>
            );
          })}

          {/* bars */}
          {months.map((row, idx) => {
            const baseX = padL + idx * groupW + groupW / 2;
            const incomeX = baseX - (barW + gap / 2);
            const expX = baseX + gap / 2;

            const incomeY = yToPx(row.income);
            const expY = yToPx(row.expenses);

            const incomeH = padT + plotH - incomeY;
            const expH = padT + plotH - expY;

            return (
              <g key={row.m}>
                <rect x={incomeX} y={incomeY} width={barW} height={incomeH} rx={5} fill="currentColor" className="text-emerald-500" />
                <rect x={expX} y={expY} width={barW} height={expH} rx={5} fill="currentColor" className="text-red-500" />
                <text
                  x={padL + idx * groupW + groupW / 2}
                  y={padT + plotH + 26}
                  textAnchor="middle"
                  fontSize="12"
                  fill="currentColor"
                  className="text-foreground/60"
                >
                  {row.m}
                </text>
              </g>
            );
          })}

          {/* axes */}
          <line x1={padL} x2={padL} y1={padT} y2={padT + plotH} stroke="currentColor" className="text-foreground/20" />
          <line x1={padL} x2={chartW - padR} y1={padT + plotH} y2={padT + plotH} stroke="currentColor" className="text-foreground/20" />
        </svg>

        <div className="mt-2 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-red-500" aria-hidden="true" />
            <span className="text-red-500">expenses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-emerald-500" aria-hidden="true" />
            <span className="text-emerald-600">income</span>
          </div>
        </div>
      </div>
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

export default function DashboardPage() {
  const spending = [
    { name: "Food & Dining", pct: 22.5, amount: "$650", color: "text-red-500", iconBg: "bg-red-50", iconColor: "text-red-500" },
    { name: "Housing", pct: 41.5, amount: "$1,200", color: "text-blue-500", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { name: "Transportation", pct: 11.1, amount: "$320", color: "text-amber-500", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
    { name: "Shopping", pct: 15.6, amount: "$450", color: "text-violet-500", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
    { name: "Entertainment", pct: 6.2, amount: "$180", color: "text-emerald-500", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { name: "Healthcare", pct: 3.1, amount: "$90", color: "text-pink-500", iconBg: "bg-pink-50", iconColor: "text-pink-600" },
  ];

  const goals = [
    { name: "Emergency Fund", pct: 85, left: "$8,500", right: "$10,000", color: "bg-blue-600" },
    { name: "Vacation", pct: 48, left: "$2,400", right: "$5,000", color: "bg-violet-500" },
    { name: "New Laptop", pct: 60, left: "$1,200", right: "$2,000", color: "bg-emerald-500" },
  ];

  const transactions = [
    { name: "Monthly Salary", cat: "Salary", amount: "+$5,200.00", date: "Dec 31", tone: "income" },
    { name: "Grocery Store", cat: "Food & Dining", amount: "$125.50", date: "Dec 29", tone: "expense" },
    { name: "Rent Payment", cat: "Housing", amount: "$1,200.00", date: "Dec 27", tone: "expense" },
    { name: "Gas Station", cat: "Transportation", amount: "$45.00", date: "Dec 26", tone: "expense" },
    { name: "Online Shopping", cat: "Shopping", amount: "$89.99", date: "Dec 25", tone: "expense" },
    { name: "Project Payment", cat: "Freelance", amount: "+$750.00", date: "Dec 24", tone: "income" },
  ];

  return (
    <main className="w-full bg-background pb-16">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-8">
          <AiInsightsClient transactions={transactions} />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard title="Total Balance" amount="$12,450.50" iconBg="bg-blue-50" iconColor="text-blue-600" />
          <StatCard title="Income" amount="$5,200.00" sub="This month" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
          <StatCard title="Expenses" amount="$2,890.75" sub="This month" iconBg="bg-rose-50" iconColor="text-rose-600" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <IncomeExpensesChart />
          </div>

          <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold tracking-tight">Savings Goals</div>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 text-foreground/70 hover:text-foreground"
                aria-label="Add goal"
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {goals.map((g) => (
                <div key={g.name}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground/60" aria-hidden="true">
                        ◎
                      </span>
                      <div className="text-sm font-medium">{g.name}</div>
                    </div>
                    <div className="text-sm text-foreground/70">{g.pct}%</div>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={g.pct} colorClass={g.color} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-foreground/60">
                    <span>{g.left}</span>
                    <span>{g.right}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white hover:opacity-95"
            >
              Add New Goal
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
            <div className="text-base font-semibold tracking-tight">Spending by Category</div>

            <div className="mt-6 grid items-center gap-8 sm:grid-cols-2">
              <div className="flex justify-center">
                <DonutChart segments={spending} />
              </div>

              <div className="space-y-4">
                {spending.map((s) => (
                  <div key={s.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <MiniIcon bg={s.iconBg} color={s.iconColor} />
                      <div>
                        <div className="text-sm font-medium">{s.name}</div>
                        <div className="text-xs text-foreground/60">{s.pct}%</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{s.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
            <div className="text-base font-semibold tracking-tight">Recent Transactions</div>

            <div className="mt-6 divide-y divide-foreground/10">
              {transactions.map((t) => {
                const tone =
                  t.tone === "income"
                    ? { amount: "text-emerald-600", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" }
                    : { amount: "text-red-500", iconBg: "bg-red-50", iconColor: "text-red-500" };

                return (
                  <div key={`${t.name}-${t.date}`} className="flex items-center justify-between gap-6 py-5">
                    <div className="flex items-center gap-4">
                      <MiniIcon bg={tone.iconBg} color={tone.iconColor} />
                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-sm text-foreground/60">{t.cat}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-sm font-medium ${tone.amount}`}>{t.amount}</div>
                      <div className="text-sm text-foreground/60">{t.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl border border-foreground/10 text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
