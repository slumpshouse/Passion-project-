export const metadata = {
  title: "Product · Budget Tracker",
  description: "A deep dive into what you get and how you use Budget Tracker.",
};

function CheckCircle({ tone = "blue" }) {
  const toneStyles = {
    blue: "text-blue-600",
    violet: "text-violet-600",
    emerald: "text-emerald-600",
    orange: "text-amber-600",
  };

  return (
    <span className={`mt-0.5 ${toneStyles[tone]}`} aria-hidden="true">
      ✓
    </span>
  );
}

function FeatureListItem({ tone, children }) {
  return (
    <li className="flex items-start gap-3 text-sm text-foreground/70">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-foreground/15 bg-background">
        <CheckCircle tone={tone} />
      </span>
      <span>{children}</span>
    </li>
  );
}

function IconWrap({ className, children }) {
  return (
    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${className}`} aria-hidden="true">
      {children}
    </div>
  );
}

export default function ProductPage() {
  return (
    <main className="w-full pb-16">
      <section className="bg-violet-50 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/60 px-5 py-2 text-sm font-medium text-violet-700">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                <path d="M11 18h2" />
              </svg>
              Product Deep Dive
            </div>

            <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">How BudgetWise Works</h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-7 text-foreground/70 sm:text-base">
              A detailed look at what you get, how you interact with the app, and the journey from your first login to
              financial mastery.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">Results &amp; Outputs</h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-7 text-foreground/70 sm:text-base">
              Here&apos;s what BudgetWise delivers to you as a user
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm sm:p-10">
              <IconWrap className="bg-blue-50 text-blue-600">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                  <path d="M9 7h6" />
                  <path d="M9 11h6" />
                  <path d="M9 15h4" />
                </svg>
              </IconWrap>

              <h3 className="mt-6 text-base font-semibold tracking-tight">Saved Transaction List</h3>
              <p className="mt-2 text-sm leading-7 text-foreground/70">
                A comprehensive, searchable database of every financial transaction you&apos;ve logged.
              </p>

              <div className="mt-8 text-sm font-semibold">What You Get:</div>
              <ul className="mt-4 space-y-3">
                <FeatureListItem tone="blue">Chronological transaction history</FeatureListItem>
                <FeatureListItem tone="blue">Categorized and tagged entries</FeatureListItem>
                <FeatureListItem tone="blue">Income vs expense separation</FeatureListItem>
                <FeatureListItem tone="blue">Editable and deletable records</FeatureListItem>
                <FeatureListItem tone="blue">Export to CSV or PDF</FeatureListItem>
              </ul>

              <div className="mt-8 rounded-2xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4 text-sm">
                <span className="font-semibold">Example:</span> View all &quot;Food &amp; Dining&quot; expenses from last month
              </div>
            </div>

            <div className="rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm sm:p-10">
              <IconWrap className="bg-violet-50 text-violet-600">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19V5" />
                  <path d="M4 19h16" />
                  <path d="M8 17V9" />
                  <path d="M12 17V7" />
                  <path d="M16 17v-5" />
                </svg>
              </IconWrap>

              <h3 className="mt-6 text-base font-semibold tracking-tight">Spending Summary</h3>
              <p className="mt-2 text-sm leading-7 text-foreground/70">
                Visual breakdowns showing exactly where your money goes, with trends over time.
              </p>

              <div className="mt-8 text-sm font-semibold">What You Get:</div>
              <ul className="mt-4 space-y-3">
                <FeatureListItem tone="violet">Category-wise spending totals</FeatureListItem>
                <FeatureListItem tone="violet">Monthly/weekly comparison charts</FeatureListItem>
                <FeatureListItem tone="violet">Top spending categories highlighted</FeatureListItem>
                <FeatureListItem tone="violet">Income vs expense balance</FeatureListItem>
                <FeatureListItem tone="violet">Budget utilization percentages</FeatureListItem>
              </ul>

              <div className="mt-8 rounded-2xl border-l-4 border-violet-500 bg-violet-50 px-5 py-4 text-sm">
                <span className="font-semibold">Example:</span> See that you spent $650 on dining, 22% of total
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">How You Interact</h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-7 text-foreground/70 sm:text-base">
              Four primary ways you&apos;ll use BudgetWise in your daily financial routine
            </p>
          </div>

          <div className="mt-10 space-y-8">
            <div className="rounded-3xl border border-blue-200 bg-background p-6 shadow-sm sm:p-10">
              <div className="flex items-start gap-4">
                <IconWrap className="bg-blue-600 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </IconWrap>
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
                  <div className="mt-5 space-y-5 text-sm">
                    <div>
                      <div className="text-sm font-medium">Amount</div>
                      <div className="mt-2 rounded-xl border border-foreground/15 px-4 py-3 text-foreground/50">$0.00</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Description</div>
                      <div className="mt-2 rounded-xl border border-foreground/15 px-4 py-3 text-foreground/50">What did you buy?</div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <div className="text-sm font-medium">Category</div>
                        <div className="mt-2 rounded-xl border border-foreground/15 px-4 py-3 text-foreground/50">Select...</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Type</div>
                        <div className="mt-2 rounded-xl border border-foreground/15 px-4 py-3 text-foreground/50">Income/Expense</div>
                      </div>
                    </div>
                    <div className="mt-2 rounded-xl bg-blue-600 py-3 text-center text-sm font-medium text-white">Save Transaction</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-violet-200 bg-background p-6 shadow-sm sm:p-10">
              <div className="flex items-start gap-4">
                <IconWrap className="bg-violet-600 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                </IconWrap>
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
                      <div key={item.t} className="rounded-2xl bg-violet-50 p-5">
                        <div className="text-sm font-semibold">{item.t}</div>
                        <div className="mt-1 text-sm text-foreground/70">{item.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-violet-50 p-6">
                  <div className="text-sm font-semibold">Dashboard Benefits</div>
                  <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                    {[
                      "Everything updates in real-time",
                      "No need to run reports or refresh",
                      "Accessible from any device",
                      "Customizable date ranges",
                      "One-click drill-down into details",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-0.5 text-violet-600" aria-hidden="true">
                          ✓
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 h-40 rounded-2xl bg-gradient-to-b from-violet-200/60 to-violet-100/20" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-background p-6 shadow-sm sm:p-10">
              <div className="flex items-start gap-4">
                <IconWrap className="bg-emerald-600 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 8v4l3 3" />
                    <path d="M3 12a9 9 0 1 0 9-9" />
                    <path d="M3 4v5h5" />
                  </svg>
                </IconWrap>
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
                      { t: "Browse", d: "Scroll through all transactions, newest first", i: "📜" },
                      { t: "Filter", d: "Narrow by category, date range, or amount", i: "🔎" },
                      { t: "Search", d: "Find specific transactions by keyword", i: "🔍" },
                      { t: "Edit/Delete", d: "Click any transaction to modify or remove", i: "✏️" },
                    ].map((item) => (
                      <div key={item.t} className="flex items-start gap-4 rounded-2xl bg-emerald-50 p-5">
                        <div className="text-xl" aria-hidden="true">
                          {item.i}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{item.t}</div>
                          <div className="mt-1 text-sm text-foreground/70">{item.d}</div>
                        </div>
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

            <div className="rounded-3xl border border-amber-200 bg-background p-6 shadow-sm sm:p-10">
              <div className="flex items-start gap-4">
                <IconWrap className="bg-amber-600 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 17l6-6 4 4 7-7" />
                    <path d="M14 4h7v7" />
                  </svg>
                </IconWrap>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">Savings Goals Panel</h3>
                  <p className="mt-1 text-sm text-foreground/70">Visual progress tracking for all your targets</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-amber-50 p-6">
                  <div className="text-sm font-semibold">Goal Card Elements</div>
                  <div className="mt-6 rounded-2xl border border-amber-200 bg-background p-5">
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

                <div className="rounded-2xl bg-amber-50 p-6">
                  <div className="text-sm font-semibold">Interaction Options</div>
                  <ol className="mt-6 space-y-4 text-sm text-foreground/80">
                    {[
                      "Add new goal with target amount and date",
                      "Log contributions from income",
                      "Adjust target amounts or deadlines",
                      "Pause/resume goals as needed",
                      "Celebrate completion with animations",
                    ].map((step, index) => (
                      <li key={step} className="flex items-start gap-4 rounded-2xl bg-background px-4 py-4">
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
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">User Journey Diagram</h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-7 text-foreground/70 sm:text-base">
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
                bullets: ["Log purchases as they happen", "Quick categorization", "Review daily summary", "Check budget status"],
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
              <div key={step.n} className={`relative rounded-3xl border p-6 ${step.bg}`}>
                <div className="flex items-start gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${step.accent}`}>
                    {step.n}
                  </span>
                  <div>
                    <div className="text-base font-semibold tracking-tight">{step.title}</div>
                    <div className="mt-1 text-sm text-foreground/70">{step.time}</div>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-foreground/70">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-1 rounded-full bg-foreground/40" aria-hidden="true" />
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

          <div className="mt-10 flex items-center justify-center">
            <div className="flex items-center gap-4 rounded-full border border-foreground/10 bg-foreground/5 px-6 py-3 text-sm text-foreground/70">
              <span>This cycle repeats continuously</span>
              <span aria-hidden="true">→</span>
              <span>Building better financial habits</span>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-10">
            <div className="text-center text-base font-semibold tracking-tight">Long-Term Impact</div>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Month 1", desc: "Understanding your patterns", icon: "📊" },
                { title: "Month 3", desc: "Hitting first savings goals", icon: "💰" },
                { title: "Month 6", desc: "Complete financial control", icon: "🎯" },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl bg-white/70 p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5" aria-hidden="true">
                    {card.icon}
                  </div>
                  <div className="mt-4 text-sm font-semibold">{card.title}</div>
                  <div className="mt-2 text-sm text-foreground/70">{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl border-t border-foreground/10 px-6 py-8 text-center text-sm text-foreground/60">
        © {new Date().getFullYear()} Budget Tracker. All rights reserved.
      </footer>
    </main>
  );
}
