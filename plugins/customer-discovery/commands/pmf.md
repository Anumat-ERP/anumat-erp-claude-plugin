---
description: Measure product-market-fit signals, including the Sean Ellis survey, retention curves, organic pull, sales-cycle and B2B pilot conversion.
argument-hint: [product, and any data available: survey results, retention, pipeline]
---

Assess product-market fit for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/pmf.md`.

If there is no data yet, set up measurement instead of guessing: the survey,
the definition of an active user, and the retention cohort table.

## Produce, in order

**1. Survey.** Adapt
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/pmf-survey.md`,
say who to send it to (active users only), and the minimum sample. If results
exist, score them by segment. State that the 40% line is a heuristic.

**2. Retention.** Define "active" by the value action. If data exists, describe
each cohort's curve: falling to zero, or flattening, and whether newer cohorts
are flatter.

**3. Organic pull.** Share of new users from referral or inbound; expansion
requests; dependence signals.

**4. Sales-cycle signals.** Cycle length trend, discount trend, how prospects
arrive.

**5. B2B roles and pilots** (if B2B). Evidence from champion, buyer, and
user separately; pilot-to-paid conversion rate and time to convert.

**6. Verdict.** A table of each signal as weak, mixed, or strong, and an
overall read. If one segment is much stronger, recommend narrowing to it.

**7. Next step,** logged in
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/decision-log.md`.
