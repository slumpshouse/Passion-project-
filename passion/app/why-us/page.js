export const metadata = {
  title: "Why Us · Budget Tracker",
  description: "Why Budget Tracker works and how we plan to deliver it.",
};

function Pill({ children, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    emerald: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function StrategyItem({ title, desc, tone = "blue" }) {
  const toneStyles = {
    blue: "text-blue-600",
    amber: "text-amber-600",
    emerald: "text-emerald-600",
    rose: "text-rose-600",
    violet: "text-violet-600",
  };

  return (
    <div className="rounded-2xl border border-foreground/10 bg-background p-5">
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 ${toneStyles[tone]}`} aria-hidden="true">
          ✓
        </span>
        <div>
          <div className="text-sm font-semibold tracking-tight">{title}</div>
          <div className="mt-1 text-sm leading-6 text-foreground/70">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({ iconBg, iconColor, title, subtitle, children }) {
  return (
    <div className="rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm sm:p-10">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`} aria-hidden="true">
          <div className="h-5 w-5 rounded-full bg-current/20" />
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-foreground/70">{subtitle}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="text-sm font-semibold">Our Strategies:</div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
      </div>
    </div>
  );
}

function SprintCard({ iconBg, iconColor, sprint, weeks, title, tasks, tone = "blue" }) {
  return (
    <div className="rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm sm:p-10">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`} aria-hidden="true">
          <div className="h-5 w-5 rounded-full bg-current/20" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm font-semibold tracking-tight">{sprint}</div>
            <Pill tone={tone}>{weeks}</Pill>
          </div>
          <div className="mt-2 text-sm text-foreground/70">{title}</div>
        </div>
      </div>

      <div className="mt-7 text-sm font-semibold">Key Tasks:</div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {tasks.map((t) => (
          <li key={t} className="flex items-start gap-3 rounded-2xl bg-foreground/5 px-4 py-3 text-sm text-foreground/80">
            <span className="mt-0.5 text-emerald-600" aria-hidden="true">
              ✓
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoCard({ iconBg, iconColor, title, desc }) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`} aria-hidden="true">
        <div className="h-5 w-5 rounded-full bg-current/20" />
      </div>
      <div className="mt-4 text-base font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm leading-6 text-foreground/70">{desc}</div>
    </div>
  );
}

function CapabilityCard({ iconBg, iconColor, title, desc, bullets = [] }) {
  return (
    <div className="rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm sm:p-8">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`} aria-hidden="true">
        <div className="h-5 w-5 rounded-full bg-current/20" />
      </div>
      <div className="mt-4 text-base font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm leading-6 text-foreground/70">{desc}</div>

      {bullets.length > 0 ? (
        <ul className="mt-5 space-y-3 text-sm text-foreground/70">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                ✓
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function WhyUsPage() {
  return (
    <main className="w-full pb-16">
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-xs font-medium text-blue-700">
                <span aria-hidden="true">💡</span>
                <span>Our Solution &amp; Plan</span>
              </span>
            </div>

            <h1 className="mt-6 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              BudgetWise: Your Path to Financial Clarity
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-7 text-foreground/70 sm:text-base">
              We&apos;re building a simple, intuitive budgeting tool that gives you complete visibility and control over your
              finances—without the complexity or cost of traditional solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="text-center">
            <div className="text-sm font-semibold tracking-tight text-foreground/80">Our Solution</div>
          </div>

          <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-blue-200 bg-blue-50/40 p-6 sm:p-10">
            <div className="mx-auto max-w-3xl">
              <p className="text-pretty text-lg font-medium leading-8 tracking-tight sm:text-xl">
                BudgetWise is a free, user-friendly web application that helps you track every dollar, understand your
                spending patterns, and achieve your financial goals.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <InfoCard
                iconBg="bg-rose-50"
                iconColor="text-rose-600"
                title="Simple"
                desc="No financial expertise required. Built for everyday people."
              />
              <InfoCard
                iconBg="bg-violet-50"
                iconColor="text-violet-600"
                title="Secure"
                desc="Your financial data stays private and protected."
              />
              <InfoCard
                iconBg="bg-amber-50"
                iconColor="text-amber-600"
                title="Free"
                desc="Personal budgeting shouldn&apos;t cost you money."
              />
            </div>

            <div className="mt-8 rounded-2xl bg-background p-6 sm:p-7">
              <div className="flex gap-4">
                <div className="w-1 rounded-full bg-blue-600" aria-hidden="true" />
                <div className="text-sm leading-7 text-foreground/70">
                  <span className="font-semibold text-blue-700">Our Approach:</span> Instead of overwhelming users with
                  complex features, we focus on the essentials—tracking transactions, visualizing spending, and setting
                  achievable goals. Everything is automated where possible, making budgeting effortless and sustainable.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background pb-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="text-center">
            <div className="text-sm font-semibold tracking-tight text-foreground/80">What BudgetWise Will Do</div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <CapabilityCard
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              title="Automatic Transaction Tracking"
              desc="Log income and expenses with smart categorization. Manual entry is simple and quick."
              bullets={["One-click transaction entry", "Auto-categorization", "Transaction history"]}
            />

            <CapabilityCard
              iconBg="bg-violet-50"
              iconColor="text-violet-600"
              title="Visual Spending Insights"
              desc="See exactly where your money goes with intuitive charts and breakdowns."
              bullets={["Category breakdowns", "Monthly comparisons", "Spending trends"]}
            />

            <CapabilityCard
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
              title="Savings Goals Tracker"
              desc="Set specific financial targets and monitor your progress in real-time."
              bullets={["Multiple goals", "Progress tracking", "Milestone celebrations"]}
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <CapabilityCard
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
              title="Smart Notifications"
              desc="Get alerts for budget limits, unusual spending, and upcoming bills."
              bullets={["Budget alerts", "Spending warnings", "Bill reminders"]}
            />

            <CapabilityCard
              iconBg="bg-rose-50"
              iconColor="text-rose-600"
              title="Budget Planning"
              desc="Create realistic budgets based on your actual spending patterns."
              bullets={["Category budgets", "Automatic tracking", "Overspending alerts"]}
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Challenges We Expect</h1>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-7 text-foreground/70 sm:text-base">
              We&apos;re realistic about the obstacles ahead. Here&apos;s what we anticipate and how we plan to address them.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <ChallengeCard
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              title="User Adoption & Habit Formation"
              subtitle="Getting users to consistently track their expenses and build long-term budgeting habits."
            >
              <StrategyItem
                tone="blue"
                title="Onboarding Tutorial"
                desc="Step-by-step guide that shows value immediately with sample data"
              />
              <StrategyItem
                tone="blue"
                title="Gamification"
                desc="Streaks, badges, and progress bars to encourage daily engagement"
              />
              <StrategyItem
                tone="blue"
                title="Minimal Entry Friction"
                desc="Quick-add buttons and voice input for 10-second transaction logging"
              />
              <StrategyItem
                tone="blue"
                title="Weekly Summary Emails"
                desc="Automated insights delivered to inbox to maintain engagement"
              />
            </ChallengeCard>

            <ChallengeCard
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
              title="Data Accuracy"
              subtitle="Ensuring users enter transactions correctly and categories are assigned properly."
            >
              <StrategyItem
                tone="amber"
                title="Smart Categorization"
                desc="AI-powered suggestions based on transaction descriptions"
              />
              <StrategyItem
                tone="amber"
                title="Merchant Database"
                desc="Pre-categorized common merchants (Starbucks → Food & Dining)"
              />
              <StrategyItem
                tone="amber"
                title="Validation Prompts"
                desc='Ask "Does this look right?" with easy correction options'
              />
              <StrategyItem
                tone="amber"
                title="Duplicate Detection"
                desc="Alert users to potential duplicate entries"
              />
            </ChallengeCard>

            <ChallengeCard
              iconBg="bg-rose-50"
              iconColor="text-rose-600"
              title="Privacy & Security"
              subtitle="Building user trust around sensitive financial information and data protection."
            >
              <StrategyItem
                tone="rose"
                title="Local-First Approach"
                desc="Data stored in browser by default, cloud sync is optional"
              />
              <StrategyItem
                tone="rose"
                title="Encryption"
                desc="All transmitted data encrypted with industry-standard protocols"
              />
              <StrategyItem
                tone="rose"
                title="Transparent Privacy Policy"
                desc="Clear, jargon-free explanation of what we do (and don&apos;t do) with data"
              />
              <StrategyItem
                tone="rose"
                title="No Third-Party Selling"
                desc="Explicit commitment to never sell user data"
              />
            </ChallengeCard>

            <ChallengeCard
              iconBg="bg-violet-50"
              iconColor="text-violet-600"
              title="Feature Overload"
              subtitle="Balancing comprehensive functionality with simplicity and ease of use."
            >
              <StrategyItem
                tone="violet"
                title="Progressive Disclosure"
                desc="Advanced features hidden until users master basics"
              />
              <StrategyItem
                tone="violet"
                title="Default Settings"
                desc="Smart defaults that work for 80% of users out of the box"
              />
              <StrategyItem
                tone="violet"
                title="User Testing"
                desc="Regular feedback sessions to identify confusing features"
              />
              <StrategyItem
                tone="violet"
                title="Focus on Core Use Cases"
                desc="Resist feature creep by prioritizing essential functionality"
              />
            </ChallengeCard>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">Project Plan Summary</h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-7 text-foreground/70 sm:text-base">
              A 6-week development roadmap broken into three focused sprints
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <SprintCard
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              sprint="Sprint 1"
              weeks="Weeks 1-2"
              title="Core Foundation"
              tone="blue"
              tasks={[
                "Design database schema for users, transactions, categories, and goals",
                "Create transaction entry form with manual input",
                "Set up responsive UI framework",
                "Build user authentication system (sign up, login, password reset)",
                "Implement basic category assignment",
                "Deploy basic version to staging environment",
              ]}
            />

            <SprintCard
              iconBg="bg-violet-50"
              iconColor="text-violet-600"
              sprint="Sprint 2"
              weeks="Weeks 3-4"
              title="Analytics & Visualization"
              tone="violet"
              tasks={[
                "Build spending analytics engine (category totals, trends)",
                "Implement income vs expenses overview dashboard",
                "Build transaction search and filtering",
                "Create interactive charts (pie chart, bar chart, line graph)",
                "Add date range filtering (this month, last month, custom)",
                "Develop export functionality (CSV, PDF reports)",
              ]}
            />

            <SprintCard
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
              sprint="Sprint 3"
              weeks="Weeks 5-6"
              title="Goals & Polish"
              tone="emerald"
              tasks={[
                "Implement savings goals tracker with progress bars",
                "Create notification system for budget warnings",
                "Conduct user testing with 10-15 beta users",
                "Add budget setting per category with alerts",
                "Build comprehensive onboarding tutorial",
                "Fix bugs, optimize performance, launch publicly",
              ]}
            />

            <div className="rounded-3xl border border-blue-200 bg-background p-6 shadow-sm sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600" aria-hidden="true">
                  <div className="h-5 w-5 rounded-full bg-current/20" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">Post-Launch Roadmap</h3>
                  <p className="mt-1 text-sm text-foreground/70">
                    After the initial 6-week launch, we&apos;ll iterate based on user feedback with monthly releases:
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-foreground/70">
                {[
                  "Recurring transaction templates",
                  "Bank account integration (Plaid API)",
                  "Mobile app versions (iOS & Android)",
                  "AI-powered spending insights and recommendations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-blue-600" aria-hidden="true">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
