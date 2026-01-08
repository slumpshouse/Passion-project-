import Link from "next/link";

export default function Home() {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "$2M+", label: "Money Saved" },
    { value: "4.8★", label: "User Rating" },
  ];

  const features = [
    {
      title: "Track Every Transaction",
      description:
        "Automatically categorize and record all your income and expenses in one place.",
      accent: "bg-blue-50 text-blue-600",
      preview: (
        <div className="mt-5 rounded-xl border border-foreground/10 bg-background p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground/70">Grocery Store</span>
            <span className="font-medium text-rose-600">-$125.50</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-foreground/70">Salary</span>
            <span className="font-medium text-emerald-600">+$5,200.00</span>
          </div>
        </div>
      ),
    },
    {
      title: "Visual Spending Insights",
      description:
        "Understand your spending patterns with intuitive charts and detailed breakdowns.",
      accent: "bg-indigo-50 text-indigo-600",
      preview: (
        <div className="mt-5 rounded-xl border border-foreground/10 bg-background p-4">
          <div className="h-2 w-full rounded-full bg-foreground/10">
            <div className="flex h-2 w-full gap-2">
              <div className="h-2 w-1/4 rounded-full bg-rose-500" />
              <div className="h-2 w-1/3 rounded-full bg-blue-500" />
              <div className="h-2 flex-1 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Set Savings Goals",
      description: "Define your financial targets and track progress towards achieving them.",
      accent: "bg-sky-50 text-sky-600",
      preview: (
        <div className="mt-5 rounded-xl border border-foreground/10 bg-background p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground/70">Vacation Fund</span>
            <span className="text-foreground/70">48%</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-foreground/10">
            <div className="h-2 w-[48%] rounded-full bg-blue-600" />
          </div>
        </div>
      ),
    },
    {
      title: "Real-Time Balance Updates",
      description:
        "Stay informed with instant updates on your financial status across all accounts.",
      accent: "bg-violet-50 text-violet-600",
      preview: (
        <div className="mt-5 rounded-xl border border-foreground/10 bg-background p-4">
          <div className="text-xs text-foreground/60">Current Balance</div>
          <div className="mt-2 text-lg font-semibold">$12,450.50</div>
        </div>
      ),
    },
  ];

  const beneficiaries = [
    {
      title: "Goal Setters",
      description:
        "Perfect for anyone saving for specific targets like a vacation, down payment, or emergency fund.",
      accentBorder: "border-blue-200",
      iconBg: "bg-blue-50 text-blue-600",
      bullets: ["Track multiple savings goals", "Visual progress indicators"],
    },
    {
      title: "Young Professionals",
      description:
        "Build strong financial habits early in your career and watch your wealth grow systematically.",
      accentBorder: "border-violet-200",
      iconBg: "bg-violet-50 text-violet-600",
      bullets: ["Easy expense categorization", "Income vs expense overview"],
    },
    {
      title: "Budget-Conscious Families",
      description:
        "Manage household expenses efficiently and ensure every family member stays on budget.",
      accentBorder: "border-emerald-200",
      iconBg: "bg-emerald-50 text-emerald-600",
      bullets: ["Shared budget management", "Category-wise spending"],
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
        <section className="pb-10 pt-6 sm:pb-14">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700">
                BudgetWise · Best for students &amp; young professionals
              </span>
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Take control of your finances.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-foreground/70 sm:text-lg">
              Track spending, set goals, and stay on top of your budget with a clean,
              easy-to-use dashboard.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-medium text-white hover:opacity-95 sm:w-auto"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium hover:bg-foreground/5 sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="mt-10 border-t border-foreground/10 pt-8">
            <div className="grid gap-6 text-center sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="">
                  <div className="text-lg font-semibold tracking-tight sm:text-xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Powerful Features for Complete Control
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-6 text-foreground/70 sm:text-base">
              Everything you need to manage your money effectively in one beautiful,
              easy-to-use platform.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.accent}`}
                    aria-hidden="true"
                  >
                    <div className="h-5 w-5 rounded-full bg-current/20" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-foreground/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {feature.preview}
              </div>
            ))}
          </div>
        </section>

        <section id="benefits" className="py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Who Will Benefit Most?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-6 text-foreground/70 sm:text-base">
              Our app is designed to help everyone take control of their finances, but
              these groups find it especially valuable.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {beneficiaries.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border bg-background p-6 shadow-sm ${card.accentBorder}`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg}`}
                  aria-hidden="true"
                >
                  <div className="h-6 w-6 rounded-full bg-current/20" />
                </div>

                <h3 className="mt-6 text-base font-semibold tracking-tight">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/70">{card.description}</p>

                <ul className="mt-6 space-y-3 text-sm text-foreground/70">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                        ✓
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-6 border-t border-foreground/10 py-8 text-center text-sm text-foreground/60">
          © {new Date().getFullYear()} BudgetWise. All rights reserved.
        </footer>
    </main>
  );
}
