function getOpenAIApiKey() {
  const raw = process.env.OPENAI_API_KEY;
  if (!raw) return null;
  return raw
    .trim()
    .replace(/^\uFEFF/, "")
    .replace(/^Bearer\s+/i, "")
    .replace(/^"|"$/g, "")
    .replace(/^'|'$/g, "");
}

function parseMoney(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;

  const cleaned = value.replace(/[^0-9+\-.,]/g, "");
  if (!cleaned) return null;

  const sign = cleaned.trim().startsWith("-") ? -1 : 1;
  const normalized = cleaned.replace(/[+\-]/g, "").replace(/,/g, "");
  const num = Number.parseFloat(normalized);
  if (Number.isNaN(num)) return null;
  return sign * num;
}

function normalizeTransactions(input) {
  if (!Array.isArray(input)) return [];
  return input
    .map((t) => {
      const amount = parseMoney(t?.amount);
      return {
        name: typeof t?.name === "string" ? t.name : "Transaction",
        category: typeof t?.cat === "string" ? t.cat : "Uncategorized",
        date: typeof t?.date === "string" ? t.date : "",
        tone: t?.tone === "income" || t?.tone === "expense" ? t.tone : undefined,
        amount,
      };
    })
    .filter((t) => typeof t.amount === "number");
}

function computeSnapshot(transactions) {
  let income = 0;
  let expenses = 0;
  const byCategory = new Map();

  for (const t of transactions) {
    const isIncome = typeof t.tone === "string" ? t.tone === "income" : t.amount > 0;
    const abs = Math.abs(t.amount);

    if (isIncome) income += abs;
    else expenses += abs;

    const key = t.category || "Uncategorized";
    const prev = byCategory.get(key) || { spent: 0, count: 0 };
    if (!isIncome) {
      prev.spent += abs;
      prev.count += 1;
    }
    byCategory.set(key, prev);
  }

  const topCategories = Array.from(byCategory.entries())
    .map(([category, v]) => ({ category, ...v }))
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 6);

  return {
    income: Math.round(income * 100) / 100,
    expenses: Math.round(expenses * 100) / 100,
    net: Math.round((income - expenses) * 100) / 100,
    topCategories,
    count: transactions.length,
  };
}

async function callOpenAI({ snapshot, transactions, periodDays }) {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    return {
      ok: false,
      status: 400,
      error:
        "Missing OPENAI_API_KEY. Put it in .env.local (recommended) or .env (project root), then restart the dev server.",
    };
  }

  // Basic validation: OpenAI API keys generally start with `sk-` (including `sk-proj-`).
  // If this fails, the user likely pasted a session token or some other credential.
  const looksLikeOpenAIKey = apiKey.startsWith("sk-");
  if (!looksLikeOpenAIKey) {
    return {
      ok: false,
      status: 400,
      error:
        "OPENAI_API_KEY doesn't look like a valid OpenAI API key (expected it to start with 'sk-'). Generate an API key at https://platform.openai.com/api-keys, paste it into .env.local as OPENAI_API_KEY=sk-..., then restart the dev server.",
    };
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("OpenAI key loaded", {
      startsWithSk: apiKey.startsWith("sk-"),
      length: apiKey.length,
      last4: apiKey.slice(-4),
    });
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const system =
    "You are a financial advisor specializing in helping students and young adults build healthy money habits. IMPORTANT: Carefully analyze the user's ACTUAL spending data (categories, amounts, frequency, patterns) and provide PERSONALIZED advice based on their specific situation. Reference their real spending categories and amounts in your suggestions. For example, if they spent $150 on dining out, suggest specific ways THEY can reduce that exact expense. If they have subscription charges, name those categories specifically. Make every recommendation directly tied to their actual transactions and spending patterns. Be supportive, specific, and relatable. Include exact dollar amounts from their data. Focus on behavioral changes, small wins, and building consistent saving habits that address their unique spending habits.";

  const user = {
    periodDays,
    snapshot,
    transactions,
    instructions: {
      outputFormat: {
        summary: "string (2-3 sentences overview)",
        highlights: "array of 3-5 positive achievements or patterns",
        suggestions: "array of 4-5 detailed, high-impact actionable recommendations with specific dollar limits, weekly targets, and step-by-step action plans. Focus on the most important changes that will have the biggest financial impact.",
        watchouts: "array of 2-4 specific warnings with exact spending limits to avoid overspending",
        actionPlan: "object with weeklyGoals (array of 3-4 specific weekly financial goals with dollar amounts), spendingLimits (object with category limits), and quickWins (array of 3-4 immediate actions user can take this week)",
        disclaimer: "one short sentence: educational, not financial advice",
      },
    },
  };

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content:
            "Return ONLY valid JSON with keys summary, highlights, suggestions, watchouts, actionPlan, disclaimer. Provide specific dollar amounts, weekly limits, and detailed action steps. Data: " +
            JSON.stringify(user),
        },
      ],
    }),
  });

  if (!resp.ok) {
    // Never forward upstream error messages to the client; they may contain sensitive info.
    let code;
    let type;
    try {
      const errJson = await resp.json();
      code = errJson?.error?.code;
      type = errJson?.error?.type;
    } catch {
      // ignore
    }
    console.error("OpenAI request failed", {
      status: resp.status,
      code,
      type,
      model,
    });

    if (resp.status === 401) {
      return {
        ok: false,
        status: 401,
        error:
          "OpenAI rejected your API key (401). Update OPENAI_API_KEY in .env.local with a valid key (often requires rotating it), then restart the dev server.",
      };
    }

    return {
      ok: false,
      status: resp.status,
      error: `OpenAI request failed (${resp.status})${code ? `: ${code}` : ""}`,
    };
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content || "";

  try {
    const parsed = JSON.parse(content);
    return { ok: true, status: 200, data: parsed };
  } catch {
    return {
      ok: true,
      status: 200,
      data: {
        summary: content,
        highlights: [],
        suggestions: [],
        watchouts: [],
        actionPlan: {
          weeklyGoals: [],
          spendingLimits: {},
          quickWins: []
        },
        disclaimer: "Educational only; not financial advice.",
      },
    };
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const periodDays = typeof body?.periodDays === "number" ? body.periodDays : 14;
    const transactions = normalizeTransactions(body?.transactions);

    const snapshot = computeSnapshot(transactions);

    const result = await callOpenAI({ snapshot, transactions, periodDays });
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: result.status || 500 });
    }

    return Response.json(
      {
        periodDays,
        snapshot,
        insights: result.data,
        generatedAt: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { error: "Invalid request. Expected JSON body with a transactions array." },
      { status: 400 },
    );
  }
}

export async function GET() {
  // Dev-only helper to verify env loading without leaking secrets.
  if (process.env.NODE_ENV === "production") {
    return new Response(null, { status: 404 });
  }

  const apiKey = getOpenAIApiKey();
  return Response.json(
    {
      ok: true,
      hasKey: Boolean(apiKey),
      startsWithSk: apiKey ? apiKey.startsWith("sk-") : false,
      length: apiKey ? apiKey.length : 0,
      last4: apiKey ? apiKey.slice(-4) : null,
      nodeEnv: process.env.NODE_ENV,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    },
    { status: 200 },
  );
}
