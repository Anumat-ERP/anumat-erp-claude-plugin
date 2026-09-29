# Stage assessment scorecard

Product: `<name>` · Assessed by: `<who>` · Date: `<YYYY-MM-DD>`

Stage definitions: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md`.

## Part A · Where the product is (placement)

Score each row with the stage whose description fits **today**. Cite evidence
(a file, a dashboard, a contract), not intent.

| Signal | 0 | 1 | 2 | 3 | 4 | Score | Evidence |
|---|---|---|---|---|---|---|---|
| Users | Team, judges | Tens–hundreds | Hundreds–low thousands | Thousands–100k+ | 100k+ across continents | | |
| Revenue | None | None or pilot | Paying customers | Growing monthly | Enterprise SLAs | | |
| Data at risk | Demo only | Real users' data | Customers' business data | Contracted data | Regulated, multi-region | | |
| Engineers deploying | 1–4, hackathon | 1–3 | 2–5 | Several teams | Platform team | | |
| Monthly infra spend | $0 | $0–50 | $50–500 | $500–5k | $5k+ | | |
| Customer demands | none | "Is it safe?" | Uptime, DPA | Security review, SOC 2 | SLA, residency, audits | | |

**Placement rule:** the stage is the highest score among *Data at risk* and
*Customer demands*, unless *Users* is higher. Spend alone never places a
product.

Placed at: **Stage `<n>`** because `<evidence>`.

## Part B · What the stage requires (gaps)

Mark each: ✅ in place · ⚠️ partial · ❌ missing · ➖ not needed yet.

| Area | Required by this stage | Status | Evidence / file |
|---|---|---|---|
| Local-first dev with seeded data | 0 | | |
| Real domain, TLS | 1 | | |
| Managed auth | 1 | | |
| Managed Postgres in the right region | 1 | | |
| Transactional email, domain verified | 1 | | |
| Error tracking to a watched channel | 1 | | |
| Own backups + one restore tested | 1 | | |
| CI: checks on PR, deploy on merge, migrations in deploy | 1 | | |
| Budget alerts on every billing account | 0–1 | | |
| 2FA and two admins on every provider | 1 | | |
| Staging environment | 2 | | |
| Preview deploys | 2 | | |
| Uptime monitoring + status page | 2 | | |
| Log retention | 2 | | |
| Secrets in one store | 2 | | |
| SLOs written | 2 | | |
| Incident process | 2 | | |
| IaC | 3 | | |
| Replicas / caching / queues as measured | 3 | | |
| Feature flags | 3 | | |
| On-call rota | 3 | | |
| SOC 2 readiness | 3 | | |
| Warehouse | 3 | | |
| Multi-region, committed spend, DR drills, FinOps | 4 | | |

## Part C · Overbuilt (things ahead of the stage)

| Item | Stage it belongs to | Weekly cost in attention or money | Keep / simplify / remove |
|---|---|---|---|
| | | | |

## Part D · Cliffs

| Service | Free/paid plan | At the limit it… (pause / throttle / bill / block) | Current usage vs limit | Checked on |
|---|---|---|---|---|
| | | | | |

## Part E · Next exit trigger

| Trigger | Current value | Threshold | Expected date |
|---|---|---|---|
| | | | |

## Summary

- Stage: `<n>`
- Top three gaps, in order: 1. … 2. … 3. …
- Remove or pause: …
- Next review: `<date>`
