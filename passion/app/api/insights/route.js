import fs from "node:fs";
import path from "node:path";

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
    const isIncome = t.tone === "income" || t.amount > 0;
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
  if (!process.env.OPENAI_API_KEY) {
    try {
      const rootEnvPath = path.join(process.cwd(), "..", ".env");
      if (fs.existsSync(rootEnvPath)) {
        const raw = fs.readFileSync(rootEnvPath, "utf8");
        const line = raw
          .split(/\r?\n/)
          .map((l) => l.trim())
          .find((l) => l && !l.startsWith("#") && l.startsWith("OPENAI_API_KEY="));

        if (line) {
          const value = line.split("=").slice(1).join("=").trim();
          const unquoted = value.replace(/^"|"$/g, "").replace(/^'|'$/g, "");
          if (unquoted) process.env.OPENAI_API_KEY = unquoted;
        }
      }
    } catch {
      // Ignore env file load errors; we'll fall back to standard env lookup.
    }
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      status: 400,
      error:
        "Missing OPENAI_API_KEY. Put it in passion/.env.local (recommended) or passion/.env, then restart the dev server.",
    };
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const system =
    "You are a helpful budgeting coach. Summarize the user\'s finances for the last period and give actionable suggestions to save more and reduce unnecessary spending. Be supportive and specific. Avoid shaming. Keep it concise.";

  const user = {
    periodDays,
    snapshot,
    transactions,
    instructions: {
      outputFormat: {
        summary: "string (2-4 sentences)",
        highlights: "array of 3-6 bullets",
        suggestions: "array of 5-8 actionable tips (prioritize unnecessary spending + savings)",
        watchouts: "array of 0-4 short cautions (e.g., subscriptions, impulse buys)",
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
            "Return ONLY valid JSON with keys summary, highlights, suggestions, watchouts, disclaimer. Data: " +
            JSON.stringify(user),
        },
      ],
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    return {
      ok: false,
      status: resp.status,
      error: txt || "AI request failed",
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
