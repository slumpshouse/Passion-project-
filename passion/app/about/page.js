export const metadata = {
  title: "About · Budget Tracker",
  description: "Why budgeting is hard, and how Budget Tracker helps.",
};

export default function AboutPage() {
  const realLifeCards = [
    {
      title: 'The “Where Did My Money Go?” Moment',
      description:
        "You check your account balance and wonder why there’s so little left despite not making any “big” purchases. Small transactions add up invisibly.",
      iconBg: "bg-rose-50 text-rose-600",
      quote:
        "$8 coffee × 20 days + $15 lunches × 15 days + $12 streaming services = $610/month you barely noticed",
    },
    {
      title: "Failed Savings Attempts",
      description:
        "You try to save “whatever is left” at the end of the month, but there’s never anything left. Without tracking, discretionary spending fills all available space.",
      iconBg: "bg-amber-50 text-amber-600",
      quote:
        "Planning to save $500/month but ending up with $50 because expenses weren’t monitored",
    },
    {
      title: "Subscription Overload",
      description:
        "You’re paying for services you forgot about or rarely use. The average person has 12+ subscriptions, many unused.",
      iconBg: "bg-violet-50 text-violet-600",
      quote:
        "Netflix, Spotify, gym membership, meal kit, cloud storage, news apps = $150+/month for barely-used services",
    },
    {
      title: "Living Paycheck to Paycheck",
      description:
        "Despite a decent income, you’re stressed before each paycheck arrives. Without budgeting, it’s hard to break this cycle.",
      iconBg: "bg-blue-50 text-blue-600",
      quote:
        "Earning $60k/year but running out of money in the last week of every month due to unplanned spending",
    },
  ];

  const whyHardCards = [
    {
      title: "Time",
      iconBg: "bg-blue-50 text-blue-600",
      bullets: [
        "Tracking manually takes 30+ minutes daily",
        "Categorizing expenses is tedious",
        "Reconciling accounts is time-consuming",
      ],
    },
    {
      title: "Tech",
      iconBg: "bg-violet-50 text-violet-600",
      bullets: [
        "Bank apps don’t categorize well",
        "Multiple accounts = fragmented view",
        "Spreadsheets become outdated quickly",
      ],
    },
    {
      title: "Skills",
      iconBg: "bg-emerald-50 text-emerald-600",
      bullets: [
        "Financial literacy isn’t taught in schools",
        "Budgeting feels overwhelming",
        "Don’t know where to start",
      ],
    },
    {
      title: "Resources",
      iconBg: "bg-amber-50 text-amber-600",
      bullets: [
        "Good tools cost money",
        "Financial advisors are expensive",
        "Learning takes time and effort",
      ],
    },
  ];

  const consequences = {
    shortTerm: [
      "Constant financial anxiety and stress",
      "Inability to save for emergencies",
      "Overspending on non-essentials",
      "Missing bill payments and late fees",
    ],
    longTerm: [
      "Accumulating credit card debt",
      "Missed investment opportunities",
      "Delayed major life goals (home, retirement)",
      "Relationship stress over money",
    ],
    bottomLine:
      "Without proper financial tracking and budgeting, even high earners can find themselves trapped in cycles of debt, stress, and missed opportunities. The problem compounds over time, making it harder to break free.",
  };

  const existingSolutions = [
    {
      title: "Spreadsheets",
      iconBg: "bg-emerald-50 text-emerald-600",
      worked: [
        "Flexible categories and full control",
        "Great for planning budgets and forecasting",
        "Works offline and costs nothing",
      ],
      didnt: [
        "Manual entry is slow, so people stop using it",
        "Easy to forget purchases, which breaks accuracy",
        "Not beginner-friendly without templates",
      ],
    },
    {
      title: "Bank Apps + Account Statements",
      iconBg: "bg-blue-50 text-blue-600",
      worked: [
        "Shows exact transactions automatically",
        "Balances update without extra work",
        "Good for checking bills and recurring charges",
      ],
      didnt: [
        "Categories can be inconsistent or too generic",
        "Insights are limited across multiple accounts",
        "Doesn&apos;t teach habits or help set goals",
      ],
    },
    {
      title: "Budgeting Apps",
      iconBg: "bg-violet-50 text-violet-600",
      worked: [
        "Helpful visuals like charts and spending summaries",
        "Notifications can prevent overspending",
        "Goal tracking creates motivation",
      ],
      didnt: [
        "Some require paid plans for key features",
        "Set-up can feel overwhelming at first",
        "Privacy concerns can reduce trust",
      ],
    },
  ];

  return (
    <div>
      <section className="bg-rose-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl text-black">
            What&apos;s the Problem?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-pretty text-sm leading-7 text-foreground/70 sm:text-base">
            Students have trouble managing money, saving, or understanding spending.
            Between school expenses, subscriptions, food, and social plans, it is easy
            for small purchases to add up and for savings goals to get pushed aside.
            Without simple tracking and clear categories, it becomes hard to:
          </p>

          <ul className="mx-auto mt-6 max-w-3xl space-y-3 text-sm text-foreground/70">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" aria-hidden="true" />
              <span>See where money actually goes each week</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" aria-hidden="true" />
              <span>Build a realistic budget and stick to it</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" aria-hidden="true" />
              <span>Save consistently for goals and unexpected costs</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl">
            What Already Exists (What Worked vs. What Didn&apos;t)
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-7 text-foreground/70 sm:text-base">
            There are tools out there, but many don&apos;t stick because they either take too much time, feel too complex, or
            don&apos;t build the habit. Here&apos;s a realistic breakdown.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {existingSolutions.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg}`}
                    aria-hidden="true"
                  >
                    <div className="h-5 w-5 rounded-full bg-current/20" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-foreground/70">
                      A common approach people try before committing to a dedicated tracker.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-foreground/5 p-4">
                  <div className="text-sm font-semibold tracking-tight text-foreground/80">What worked</div>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                    {item.worked.map((w) => (
                      <li key={w} className="flex items-start gap-3">
                        <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                          ✓
                        </span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-xl bg-foreground/5 p-4">
                  <div className="text-sm font-semibold tracking-tight text-foreground/80">What didn&apos;t</div>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                    {item.didnt.map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <span className="mt-0.5 text-rose-600" aria-hidden="true">
                          →
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl">
            How This Shows Up in Real Life
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {realLifeCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg}`}
                    aria-hidden="true"
                  >
                    <div className="h-5 w-5 rounded-full bg-current/20" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-foreground/70">{card.description}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-foreground/5 p-4">
                  <div className="border-l-4 border-foreground/20 pl-4 text-sm italic text-foreground/70">
                    {card.quote}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl">
            Why Is This Problem So Hard?
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyHardCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg}`}
                  aria-hidden="true"
                >
                  <div className="h-5 w-5 rounded-full bg-current/20" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">{card.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/40" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-rose-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl">
            What Happens If Not Solved?
          </h2>

          <div className="mt-10 rounded-3xl border border-rose-200 bg-rose-50 p-6 sm:p-10">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="text-base font-semibold tracking-tight">Short-Term Consequences</h3>
                <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                  {consequences.shortTerm.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 text-rose-600" aria-hidden="true">
                        →
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold tracking-tight">Long-Term Consequences</h3>
                <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                  {consequences.longTerm.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 text-rose-600" aria-hidden="true">
                        →
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-rose-200 bg-rose-50 p-6">
              <p className="text-sm leading-6 text-foreground/80">
                <span className="font-semibold text-rose-700">The Bottom Line:</span> {consequences.bottomLine}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl">Sarah’s Story</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-foreground/70">
            A real example of how lack of tracking derailed someone’s savings goal
          </p>

          <div className="mt-10 rounded-3xl bg-blue-50 p-6 sm:p-10">
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white"
                aria-hidden="true"
              >
                <div className="h-6 w-6 rounded-full bg-white/20" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight">Meet Sarah</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/80">
                  Sarah, 26, works in marketing earning $55,000/year. She wanted to save $10,000 for
                  a down payment on a car within a year. With her salary, this seemed totally
                  achievable—just $833/month.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl bg-background p-6 shadow-sm">
                <div className="border-l-4 border-amber-500 pl-5">
                  <h4 className="text-sm font-semibold tracking-tight">The Problem</h4>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">
                    Sarah didn’t track her spending. She assumed that as long as she wasn’t buying
                    “big things,” she’d naturally save money. She opened a savings account but used
                    the “save whatever’s left” approach.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-background p-6 shadow-sm">
                <div className="border-l-4 border-rose-500 pl-5">
                  <h4 className="text-sm font-semibold tracking-tight">What Happened</h4>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">
                    After 6 months, Sarah had only saved $1,200—far behind her $5,000 target. When
                    she finally looked at her bank statements, she discovered:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                    <li>• $180/month on food delivery apps (didn’t realize it was this much)</li>
                    <li>• $95/month on subscriptions she rarely used</li>
                    <li>• $250/month on spontaneous shopping (clothes, gadgets, home decor)</li>
                    <li>• $120/month on coffee shops and casual dining</li>
                  </ul>
                  <p className="mt-5 text-sm font-semibold text-rose-700">
                    Total: $645/month in untracked, discretionary spending
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-background p-6 shadow-sm">
                <div className="border-l-4 border-emerald-500 pl-5">
                  <h4 className="text-sm font-semibold tracking-tight">The Outcome</h4>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">
                    Sarah missed her car purchase deadline and had to delay by another 8 months. The
                    lack of awareness meant she was unknowingly spending the exact amount she needed
                    to save. If she had been tracking from day one, she could have identified these
                    patterns and made small adjustments to stay on track.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-600 px-6 py-5 text-center text-white">
                <p className="text-sm leading-6 text-white/95">
                  Sarah’s story is incredibly common. Without visibility into spending patterns,
                  even motivated savers struggle to reach their goals. The solution isn’t earning
                  more—it’s knowing where your money goes.
                </p>
              </div>
            </div>
          </div>

          <footer className="mt-12 border-t border-foreground/10 py-8 text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} Budget Tracker. All rights reserved.
          </footer>
        </div>
      </section>
    </div>
  );
}
