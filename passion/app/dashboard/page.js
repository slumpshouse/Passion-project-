import AiInsightsClient from "./AiInsightsClient";
import GoalsPanelClient from "./GoalsPanelClient";
import TransactionDashboard from "./TransactionDashboard";

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
  return (
    <main className="w-full bg-background pb-16">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <TransactionDashboard />
      </div>
    </main>
  );
}
