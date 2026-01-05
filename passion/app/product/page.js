// Product page removed per user request.
export default function ProductPage() {
  return null;
}

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
