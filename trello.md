# Trello Cards for BudgetWise

Below are Trello-style cards for each page in the app. Use these to create boards/cards in Trello or a similar task tracker.

---

## Home
- **Title:** Home
- **Description:** Landing page presenting core value propositions, features, and CTAs to sign in or learn more.
- **File:** app/page.js
- **Checklist:**
  - [ ] Review hero messaging and CTA links
  - [ ] Verify featured examples and stats
  - [ ] Ensure metadata (title/description) correct
  - [ ] Responsive layout check (mobile/tablet/desktop)
  - [ ] Accessibility: semantic headings, alt text

---

## About
- **Title:** About
- **Description:** Explain the problem space, target users, and motivating scenarios for BudgetWise.
- **File:** app/about/page.js
- **Checklist:**
  - [ ] Confirm copy accuracy and tone
  - [ ] Validate visual examples and quotes
  - [ ] Ensure footer attribution updated to BudgetWise
  - [ ] Accessibility and contrast checks

---

## Features
- **Title:** Features
- **Description:** Detailed feature list, example boxes, and reasons to choose BudgetWise.
- **File:** app/features/page.js
- **Checklist:**
  - [ ] Confirm feature descriptions match shipped functionality
  - [ ] Update any references to old name (Budget Tracker)
  - [ ] Verify code examples/preview boxes render correctly
  - [ ] Responsive layout and keyboard navigation

---

## Why Us (Project Plan)
- **Title:** Why Us / Project Plan
- **Description:** Project plan, roadmap, sprints, and technical approach used for the assignment and portfolio evidence.
- **File:** app/why-us/page.js
- **Checklist:**
  - [ ] Confirm plan content aligns with rubric evidence
  - [ ] Remove or update any roadmap sections (if deprecated)
  - [ ] Ensure headings have anchors for direct linking
  - [ ] Accessibility and visual contrast checks

---

## Dashboard
- **Title:** Dashboard
- **Description:** Authenticated user dashboard: balances, charts, goals, and transaction management UI.
- **File:** app/dashboard/page.js
- **Checklist:**
  - [ ] Verify authenticated routing works
  - [ ] Test transaction flows (add/update/delete)
  - [ ] Validate charts and stats calculations
  - [ ] Confirm localStorage / DB key namespaced by user

---

## Login / Auth
- **Title:** Login
- **Description:** Sign-in / registration form and session storage logic.
- **File:** app/login/page.js
- **Checklist:**
  - [ ] Validate registration and login flows (local fallback)
  - [ ] Confirm `currentUser` storage and header updates
  - [ ] Ensure security: no sensitive details persisted insecurely
  - [ ] Form validation and error handling

---

## Product
- **Title:** Product
- **Description:** Product overview or additional marketing content page.
- **File:** app/product/page.js
- **Checklist:**
  - [ ] Review content and examples
  - [ ] Ensure links to features and CTAs work
  - [ ] Styling and responsiveness

---

## Rubric Evidence
- **Title:** Rubric Evidence
- **Description:** Admin page to present CCC evidence and link implementation locations used for grading/portfolio.
- **File:** app/rubric-evidence/page.js
- **Checklist:**
  - [ ] Confirm CCC entries point to correct pages (`/why-us`, etc.)
  - [ ] Remove references to deleted files (e.g., reflection)
  - [ ] Ensure links render and redirect to intended pages
  - [ ] Accessibility for admin reviewers

---

## (Optional) Other pages / API routes
- **Title:** API / Misc
- **Description:** Server routes under `app/api/*` (auth, transactions, insights) and scripts for DB setup.
- **Files:** app/api/*, scripts/init-db.js, prisma/
- **Checklist:**
  - [ ] Verify server-side endpoints work and handle errors
  - [ ] Confirm OpenAI prompt and usage are server-side only
  - [ ] Database migrations and seed scripts tested

---


If you'd like this exported as JSON (Trello import friendly) or split into separate files per card, tell me which format you prefer and I'll create it. 

---

## Reflection
- **Title:** Reflection
- **Description:** Admin reflection and retrospection page for documenting what went well, what didn't, and lessons learned (used for CCC evidence and personal notes).
- **File:** app/reflection/page.js
- **Checklist:**
  - [ ] Restore or verify the reflection page exists and is accessible to admins
  - [ ] Make fields editable and autosave per admin (localStorage or DB)
  - [ ] Ensure content links to the project plan (`/why-us`)
  - [ ] Accessibility and contrast checks

---

## Transaction Form
- **Title:** Transaction Form
- **Description:** Component or page used to add and edit transactions (amount, description, category, date, type). Fix layout/CSS issues and ensure seamless UX.
- **File:** app/dashboard/TransactionForm.js
- **Checklist:**
  - [ ] Validate form fields and error states
  - [ ] Fix fade/background CSS bug (ensure full form area fades consistently)
  - [ ] Implement category autocomplete / suggestions
  - [ ] Ensure accessible labels and keyboard support
  - [ ] Test save flow (localStorage fallback and DB API)

---

## Transactions (Transaction History)
- **Title:** Transactions / Transaction History
- **Description:** Page/component that lists transactions with search, filters, sorting, and export options. Handles empty states and pagination.
- **File:** app/dashboard/TransactionHistory.js
- **Checklist:**
  - [ ] Verify filters (search, category, type, date range) work correctly
  - [ ] Confirm sorting and pagination behavior
  - [ ] Improve empty state messaging and CTA to add first transaction
  - [ ] Ensure transactions persist per user (namespaced localStorage / DB)

