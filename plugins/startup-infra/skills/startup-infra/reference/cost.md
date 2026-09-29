# Cost

Three jobs: know what you will pay, know what you pay per customer, and make
sure a surprise cannot become a disaster.

## 1. The cost model

Fill in `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/cost-model.md`.
The method:

1. **List every account that can bill**, including ones with no card yet.
2. **Per service, name the unit it bills on**: requests, GB stored, GB
   egress, compute hours, monthly active users, seats, events, emails.
3. **Estimate the unit volume** from real numbers (analytics, logs) or from a
   stated assumption ("200 active users × 40 requests a day").
4. **Look up the price per unit today** on the pricing page. Record the date.
   Do not reuse numbers from memory or from this plugin.
5. **Compute three cases**: expected, 3× (a good month), 10× (a launch or an
   abuse spike). The 10× case is where cliffs show up.
6. **Mark the free-tier edge** per service: at what volume the bill starts,
   and whether it pauses or bills (see
   `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md`).

**Hidden costs to check every time:** egress between providers and regions,
log ingestion and retention, NAT gateways, per-seat pricing on dev tools,
idle databases that do not scale to zero, preview environments that are
never cleaned up, and error-tracking floods.

## 2. Unit economics

The number that matters from Stage 2 on:

```
infra cost per active unit = monthly infra spend / monthly active units
```

Pick the unit that matches how you charge: active user, active workspace,
paying customer, or request volume. Then compare with revenue per unit.

| Ratio of infra cost to revenue per unit | Reading |
|---|---|
| Under ~10 % | Healthy for most SaaS; no action |
| ~10–25 % | Watch the trend; find the largest line item |
| Over ~25 % | Pricing or architecture problem; investigate before growing |

These bands are rules of thumb for B2B SaaS, not laws. AI-heavy products
often run higher; say so and track model cost as its own line.

Track it monthly. **The trend matters more than the level**: cost per unit
should flatten or fall as you grow. If it rises, something scales worse than
linearly (N+1 queries, per-tenant resources, log volume).

## 3. Guardrails

| Guardrail | Stage | How |
|---|---|---|
| Budget alerts at **50 / 80 / 100 %** of the monthly budget | 0 on | Cloud billing budgets; SaaS usage alerts; a calendar check where a tool has none |
| **Spend caps** where offered | 0 on | Many platforms offer a hard limit or "pause at limit"; turn it on for non-production |
| Forecast alert (projected to exceed) | 2 on | Cloud budgets support forecast-based alerts |
| Per-service rate limits | 1 on | Error-tracking sample rate; email send limits; API rate limiting against abuse |
| Anomaly detection | 3 on | Cloud cost anomaly tools, or a daily spend diff |
| Tagging by team / env / feature | 3 on | Enforced in IaC; untagged resources fail review |
| Monthly cost review | 2 on | 30 minutes: top five lines, cost per unit, anything new |
| Committed-use / reserved capacity | 4 | Only on the steady baseline you are sure of for the term |

Write the plan in
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/budget-alert-plan.md`.
Alerts must go to a channel that at least two people read.

**Caps are a trade-off.** A hard cap on production turns a bill into an
outage. Use caps on dev, preview and staging; on production prefer alerts
plus a quick human decision, unless the cap is the lesser harm (Stage 0–1
with no revenue).

## 4. Credits programmes

The major clouds and many SaaS tools run startup programmes that give credits
or discounted plans, often through accelerators, incubators or investors.
Examples of where to look:

- AWS Activate: https://aws.amazon.com/startups/credits
- Google for Startups Cloud Program: https://cloud.google.com/startup
- Microsoft for Startups: https://www.microsoft.com/en-us/startups
- Cloudflare for Startups: https://www.cloudflare.com/forstartups/
- Many SaaS tools (error tracking, analytics, auth, databases) have their own
  startup plans; check each vendor's site.

**Check eligibility and terms yourself.** Amounts, durations and rules change,
and this plugin does not state them. Two cautions:

- **Credits expire.** Model the month after they run out, and do not choose
  an architecture you could not afford without them.
- **Credits pull toward lock-in.** Prefer spending them on portable services
  (Postgres, containers, S3-compatible storage).

## Commands that use this file

- `/startup-infra:cost` builds the model and the alert plan.
- `/startup-infra:stack` uses the free-tier edges to pick providers.
