export const metadata = {
  title: "Features · Budget Tracker",
  description: "See what you can do with Budget Tracker.",
};

function CheckItem({ children, color = "text-emerald-600" }) {
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-0.5 ${color}`} aria-hidden="true">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

function ExampleBox({ tone = "green", children }) {
  const toneStyles = {
    green: "border-emerald-500 bg-emerald-50",
    orange: "border-amber-500 bg-amber-50",
    blue: "border-blue-500 bg-blue-50",
    purple: "border-violet-500 bg-violet-50",
  };

  return (
    <div className={`mt-6 rounded-xl border-l-4 ${toneStyles[tone]} p-4 text-sm`}>
      {children}
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Features</h1>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-6 text-foreground/70 sm:text-base">
            Everything you need to track spending, build better habits, and reach goals.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"
                aria-hidden="true"
              >
                <div className="h-5 w-5 rounded-full bg-current/20" />
              </div>
              <div>
                <h2 className="text-base font-semibold tracking-tight">Progress Tracking</h2>
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  Real-time visibility into how you&apos;re advancing toward your financial goals.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <div className="text-sm font-semibold">What You Get:</div>
              <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                <CheckItem>Savings goal completion percentages</CheckItem>
                <CheckItem>Days/weeks until goal deadlines</CheckItem>
                <CheckItem>Contribution history per goal</CheckItem>
                <CheckItem>Projected completion dates</CheckItem>
                <CheckItem>Achievement badges and milestones</CheckItem>
              </ul>
              <ExampleBox tone="green">
                <span className="font-semibold">Example:</span> Your vacation fund is 68% complete, $1,600 to go
              </ExampleBox>
            </div>
          </div>

          <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"
                aria-hidden="true"
              >
                <div className="h-5 w-5 rounded-full bg-current/20" />
              </div>
              <div>
                <h2 className="text-base font-semibold tracking-tight">Financial Feedback</h2>
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  Actionable insights and recommendations to improve your financial health.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <div className="text-sm font-semibold">What You Get:</div>
              <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                <CheckItem color="text-foreground/80">Overspending alerts by category</CheckItem>
                <CheckItem color="text-foreground/80">Savings suggestions based on patterns</CheckItem>
                <CheckItem color="text-foreground/80">Comparison to previous months</CheckItem>
                <CheckItem color="text-foreground/80">Budget adjustment recommendations</CheckItem>
                <CheckItem color="text-foreground/80">Success celebration messages</CheckItem>
              </ul>
              <ExampleBox tone="orange">
                <span className="font-semibold">Example:</span> Alert: &quot;You&apos;re 15% over budget on shopping this month&quot;
              </ExampleBox>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">Why Choose Budget Tracker</h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-6 text-foreground/70 sm:text-base">
            Clear differentiators that explain why users should pick this solution over alternatives.
          </p>
        </div>

        <div className="mt-8 mx-auto max-w-4xl">
          <ul className="grid gap-6 sm:grid-cols-3">
            <li className="rounded-2xl border border-foreground/10 bg-background p-6">
              <div className="text-sm font-semibold">Core features, working</div>
              <div className="mt-2 text-sm text-foreground/70">Real-time tracking, goal progress, quick entry and dashboard are implemented and visible to users.</div>
            </li>
            <li className="rounded-2xl border border-foreground/10 bg-background p-6">
              <div className="text-sm font-semibold">Why buy</div>
              <div className="mt-2 text-sm text-foreground/70">Faster entry, actionable feedback, and student-friendly UX reduce friction and improve savings outcomes.</div>
            </li>
            <li className="rounded-2xl border border-foreground/10 bg-background p-6">
              <div className="text-sm font-semibold">How AI helps</div>
              <div className="mt-2 text-sm text-foreground/70">AI powers category auto-suggestions, personalized savings recommendations, and anomaly detection for overspending.</div>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-blue-50 px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">How You Interact</h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-6 text-foreground/70 sm:text-base">
            Four primary ways you&apos;ll use Budget Tracker in your daily financial routine
          </p>
        </div>

        <div className="mt-10 space-y-8">
          <div className="rounded-3xl border border-blue-200 bg-background p-6 shadow-sm sm:p-10">
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white"
                aria-hidden="true"
              >
                <div className="h-5 w-5 rounded-full bg-white/20" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight">Quick Entry Form</h3>
                <p className="mt-1 text-sm text-foreground/70">Add transactions in 20-30 seconds</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-blue-50 p-6">
                <div className="text-sm font-semibold">6-Step Process</div>
                <ol className="mt-5 space-y-4 text-sm text-foreground/80">
                  {[
                    'Click "Add Transaction" button',
                    "Enter amount ($45.50)",
                    'Type description ("Grocery Store")',
                    "Select category (auto-suggested)",
                    "Choose income/expense",
                    'Click "Save" - Done!',
                  ].map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background p-6">
                <div className="text-sm font-semibold">Form Preview</div>
                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <div className="text-xs font-medium text-foreground/60">Amount</div>
                    <div className="mt-2 rounded-xl border border-foreground/15 px-4 py-3 text-foreground/50">$0.00</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground/60">Description</div>
                    <div className="mt-2 rounded-xl border border-foreground/15 px-4 py-3 text-foreground/50">What did you buy?</div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs font-medium text-foreground/60">Category</div>
                      <div className="mt-2 rounded-xl border border-foreground/15 px-4 py-3 text-foreground/50">Select...</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-foreground/60">Type</div>
                      <div className="mt-2 rounded-xl border border-foreground/15 px-4 py-3 text-foreground/50">Income/Expense</div>
                    </div>
                  </div>
                  <div className="mt-2 rounded-xl bg-blue-600 py-3 text-center text-sm font-medium text-white">Save Transaction</div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-4 text-sm">
              <span className="font-semibold">Time Investment:</span> 20-30 seconds per transaction. Do it right after purchase while details are fresh.
            </div>
          </div>

          <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6 shadow-sm sm:p-10">
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white"
                aria-hidden="true"
              >
                <div className="h-5 w-5 rounded-full bg-white/20" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight">Visual Dashboard</h3>
                <p className="mt-1 text-sm text-foreground/70">Your financial overview, always visible</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <div className="text-sm font-semibold">What You See</div>
                <div className="mt-5 space-y-4">
                  {[
                    { t: "Balance Cards", d: "Total, Income, Expenses at a glance" },
                    { t: "Charts", d: "Income vs expenses bar chart" },
                    { t: "Category Breakdown", d: "Pie chart showing spending distribution" },
                    { t: "Goals Widget", d: "Progress bars for all savings goals" },
                    { t: "Recent Transactions", d: "Last 5-10 transactions preview" },
                  ].map((item) => (
                    <div key={item.t} className="rounded-2xl bg-white/60 p-5">
                      <div className="text-sm font-semibold">{item.t}</div>
                      <div className="mt-1 text-sm text-foreground/70">{item.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white/60 p-6">
                <div className="text-sm font-semibold">Dashboard Benefits</div>
                <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                  <CheckItem color="text-violet-700">Everything updates in real-time</CheckItem>
                  <CheckItem color="text-violet-700">No need to run reports or refresh</CheckItem>
                  <CheckItem color="text-violet-700">Accessible from any device</CheckItem>
                  <CheckItem color="text-violet-700">Customizable date ranges</CheckItem>
                  <CheckItem color="text-violet-700">One-click drill-down into details</CheckItem>
                </ul>
                <div className="mt-8 h-40 rounded-2xl bg-gradient-to-b from-violet-200/60 to-violet-100/20" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-background p-6 shadow-sm sm:p-10">
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white"
                aria-hidden="true"
              >
                <div className="h-5 w-5 rounded-full bg-white/20" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight">Transaction History</h3>
                <p className="mt-1 text-sm text-foreground/70">Complete chronological list of all activity</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <div className="text-sm font-semibold">How It Works</div>
                <div className="mt-5 space-y-4">
                  {[
                    { t: "Browse", d: "Scroll through all transactions, newest first" },
                    { t: "Filter", d: "Narrow by category, date range, or amount" },
                    { t: "Search", d: "Find specific transactions by keyword" },
                    { t: "Edit/Delete", d: "Click any transaction to modify or remove" },
                  ].map((item) => (
                    <div key={item.t} className="rounded-2xl bg-emerald-50 p-5">
                      <div className="text-sm font-semibold">{item.t}</div>
                      <div className="mt-1 text-sm text-foreground/70">{item.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background p-6">
                <div className="text-sm font-semibold">Sample View</div>
                <div className="mt-6 space-y-5 text-sm">
                  <div className="flex items-start justify-between border-b border-foreground/10 pb-4">
                    <div>
                      <div className="font-medium">Grocery Store</div>
                      <div className="text-foreground/60">Food • Today</div>
                    </div>
                    <div className="font-semibold text-rose-600">$125.50</div>
                  </div>
                  <div className="flex items-start justify-between border-b border-foreground/10 pb-4">
                    <div>
                      <div className="font-medium">Monthly Salary</div>
                      <div className="text-foreground/60">Income • Jan 1</div>
                    </div>
                    <div className="font-semibold text-emerald-600">$5200.00</div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">Gas Station</div>
                      <div className="text-foreground/60">Transport • Dec 30</div>
                    </div>
                    <div className="font-semibold text-rose-600">$45.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-10">
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white"
                aria-hidden="true"
              >
                <div className="h-5 w-5 rounded-full bg-white/20" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight">Savings Goals Panel</h3>
                <p className="mt-1 text-sm text-foreground/70">Visual progress tracking for all your targets</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white/70 p-6">
                <div className="text-sm font-semibold">Goal Card Elements</div>
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Vacation Fund</span>
                    <span className="font-semibold text-amber-700">68%</span>
                  </div>
                  <div className="mt-4 h-2 w-full rounded-full bg-foreground/10">
                    <div className="h-2 w-[68%] rounded-full bg-amber-600" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-foreground/70">
                    <span>$3,400</span>
                    <span>$5,000</span>
                  </div>
                  <div className="mt-3 text-center text-sm text-foreground/70">$1,600 to go • 8 weeks left</div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/70 p-6">
                <div className="text-sm font-semibold">Interaction Options</div>
                <ol className="mt-6 space-y-4 text-sm text-foreground/80">
                  {[
                    "Add new goal with target amount and date",
                    "Log contributions from income",
                    "Adjust target amounts or deadlines",
                    "Pause/resume goals as needed",
                    "Celebrate completion with animations",
                  ].map((step, index) => (
                    <li key={step} className="flex items-start gap-4 rounded-2xl bg-amber-50 p-4">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-600 text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">User Journey Diagram</h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-6 text-foreground/70 sm:text-base">
            The typical 4-step flow from first login to ongoing financial management
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {[
            {
              n: 1,
              title: "Sign Up & Onboard",
              time: "5 minutes",
              bg: "bg-blue-50 border-blue-200",
              accent: "bg-blue-600",
              bullets: ["Create account", "Set financial goals", "Customize categories", "Complete tutorial"],
              tag: "✓ Ready to track",
            },
            {
              n: 2,
              title: "Daily Transaction Entry",
              time: "2-5 min/day",
              bg: "bg-violet-50 border-violet-200",
              accent: "bg-violet-600",
              bullets: [
                "Log purchases as they happen",
                "Quick categorization",
                "Review daily summary",
                "Check budget status",
              ],
              tag: "✓ Building data",
            },
            {
              n: 3,
              title: "Weekly Review",
              time: "10 min/week",
              bg: "bg-emerald-50 border-emerald-200",
              accent: "bg-emerald-600",
              bullets: ["Check spending charts", "Compare to budget", "Adjust for next week", "Update goal progress"],
              tag: "✓ Stay on track",
            },
            {
              n: 4,
              title: "Monthly Analysis",
              time: "20 min/month",
              bg: "bg-amber-50 border-amber-200",
              accent: "bg-amber-600",
              bullets: ["Review full month trends", "Export reports", "Adjust budgets/goals", "Plan for next month"],
              tag: "✓ Continuous improvement",
            },
          ].map((step) => (
            <div key={step.n} className={`rounded-3xl border p-6 ${step.bg}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${step.accent}`}>
                    {step.n}
                  </span>
                  <div>
                    <div className="text-base font-semibold tracking-tight">{step.title}</div>
                    <div className="mt-1 text-sm text-foreground/70">{step.time}</div>
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-foreground/70">
                {step.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/40" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl bg-white/60 px-4 py-3 text-center text-sm font-medium text-foreground/80">
                {step.tag}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm text-foreground/70 sm:flex-row">
          <div className="rounded-full border border-foreground/10 bg-background px-4 py-2">This cycle repeats continuously</div>
          <div aria-hidden="true">→</div>
          <div className="rounded-full border border-foreground/10 bg-background px-4 py-2">Building better financial habits</div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-10">
          <div className="text-center text-base font-semibold tracking-tight">Long-Term Impact</div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Month 1", desc: "Understanding your patterns" },
              { title: "Month 3", desc: "Hitting first savings goals" },
              { title: "Month 6", desc: "Complete financial control" },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl bg-white/70 p-6 text-center shadow-sm">
                <div className="text-sm font-semibold">{card.title}</div>
                <div className="mt-2 text-sm text-foreground/70">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-6 border-t border-foreground/10 py-8 text-center text-sm text-foreground/60">
        © {new Date().getFullYear()} Budget Tracker. All rights reserved.
      </footer>
    </main>
  );
}
