# BudgetWise

BudgetWise is a budgeting web app built for **students and young adults** who want a clearer understanding of where their money is going — and practical help building saving habits.

## Why This Exists
Many people (especially students and early-career adults) don’t overspend because they’re reckless — they overspend because small purchases add up and there’s no simple system to track, categorize, and reflect. This project focuses on:

- Clear transaction tracking + categories
- Simple savings goals
- Biweekly “AI summary” insights to turn activity into actionable guidance

## Core Features
- Transaction tracking (income + expenses)
- Categorization + spending snapshot
- Savings goals (create, update, track progress)
- AI biweekly summary based on your recent transactions

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- OpenAI API (for AI insights)

## Quick Start

### 1) Install
```bash
npm install
```

### 2) Configure Environment
Create a `.env.local` file in the project root:

```bash
# Required
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
OPENAI_API_KEY=sk-...

# Optional
# OPENAI_MODEL=gpt-4o-mini
```

### 3) Set Up the Database (Prisma)
Generate the Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Seed the default admin users (optional, for demo/testing):

```bash
node scripts/init-db.js
```

### 4) Run the App
```bash
npm run dev
```

Open http://localhost:3000

## Useful Dev Endpoints

### AI Insights
- `POST /api/insights` — generates the biweekly AI summary

### Database Checks (dev only)
- `GET /api/test-db` — validates DB connectivity (returns 404 in production)
- `POST /api/setup-db` — creates default admin users in the DB

## How Data Is Stored
This project supports a “fallback mode” for some features:

- When the database is available, transactions/goals are saved to PostgreSQL via Prisma.
- If the database is unavailable, the app can fall back to localStorage in the browser for some flows.

## Important Notes (Demo/Prototype)
- Authentication in this repo is for demonstration purposes; passwords are stored/compared in plaintext in the current implementation.
- AI insights require a valid `OPENAI_API_KEY` and will make paid API requests depending on your OpenAI plan.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `node scripts/init-db.js` — seed admin users

## Project Structure (Highlights)
- `app/` — Next.js App Router pages
- `app/api/` — API routes (transactions, goals, auth, insights)
- `prisma/schema.prisma` — Prisma schema
- `scripts/init-db.js` — DB seed script
