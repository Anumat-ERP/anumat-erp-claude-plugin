# Monthly cost model

Product: `<name>` · Month: `<YYYY-MM>` · Stage: `<n>` · Prepared by: `<who>`

Method: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/cost.md`.
Prices come from each provider's pricing page on the date in the last column.

## Assumptions

| Driver | Value | Source |
|---|---|---|
| Monthly active users | | analytics / estimate |
| Active workspaces / paying customers | | billing |
| Requests per active user per day | | logs |
| Stored data growth per month (GB) | | DB dashboard |
| Files uploaded per month (GB) | | storage dashboard |
| Emails sent per month | | email provider |
| Error events per month | | error tracker |
| AI / third-party API calls per month | | logs |

## Line items

| Service | Plan | Billing unit | Units (expected) | Free allowance | Price per unit | Expected $ | 3× $ | 10× $ | At the limit it… | Price checked on |
|---|---|---|---|---|---|---|---|---|---|---|
| Hosting / compute | | | | | | | | | | |
| Database | | | | | | | | | | |
| Auth | | | | | | | | | | |
| Object storage | | | | | | | | | | |
| Email | | | | | | | | | | |
| Queues / cron | | | | | | | | | | |
| Observability / logs | | | | | | | | | | |
| Error tracking | | | | | | | | | | |
| Analytics | | | | | | | | | | |
| DNS / CDN / domain (monthly share) | | | | | | | | | | |
| Secrets | | | | | | | | | | |
| CI minutes | | | | | | | | | | |
| AI / external APIs | | | | | | | | | | |
| Seats on dev tools | | | | | | | | | | |
| **Total** | | | | | | | | | | |

## Hidden-cost check

- [ ] Egress between providers or regions
- [ ] Log ingest and retention
- [ ] Idle databases / preview environments not cleaned up
- [ ] Per-seat pricing as the team grows
- [ ] Error-tracker floods (rate limit set?)
- [ ] Credits expiring this quarter (and the month-after cost)

## Unit economics

| Measure | Value |
|---|---|
| Monthly infra spend | |
| Active units (`<user / workspace / customer>`) | |
| **Infra cost per unit** | |
| Revenue per unit | |
| Infra cost as % of revenue per unit | |
| Last month's cost per unit | |
| Trend | falling / flat / rising |

## Budget

- Monthly budget: `$<n>`
- Alert thresholds: 50 % = `$<n>`, 80 % = `$<n>`, 100 % = `$<n>`
- Alert plan: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/budget-alert-plan.md`
