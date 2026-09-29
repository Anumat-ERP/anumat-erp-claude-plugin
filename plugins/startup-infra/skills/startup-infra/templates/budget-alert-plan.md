# Budget alert plan

Product: `<name>` · Monthly budget: `$<n>` · Owner: `<who>` · Date: `<YYYY-MM-DD>`

Guardrails and when to use caps: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/cost.md`.

## Every account that can bill

| Provider | Account owner (team email) | Second admin | Card on file? | Budget $ | 50 % alert | 80 % alert | 100 % alert | Forecast alert | Spend cap / hard limit | Cap applies to | Alert goes to | Set up on |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | ☐ | ☐ | ☐ | ☐ | ☐ | dev / staging / prod | | |

Where a provider offers no budget alert, add a usage alert on its main
billing unit, or a monthly calendar check with a named person.

## What happens at each threshold

| Threshold | Who is told | What they do | Within |
|---|---|---|---|
| 50 % before mid-month | Channel `<#infra-cost>` | Note it; check the top line item | 2 working days |
| 80 % | Channel + owner directly | Find the cause; decide: accept, fix, or cap | 1 working day |
| 100 % | Owner + founder / eng lead | Decide: raise budget, cap non-prod, or mitigate abuse | Same day |
| Anomaly (sudden jump) | Owner | Check for abuse, loops, runaway jobs, leaked keys | Same day |

## Caps policy

- Dev, preview, staging: **hard caps on** wherever offered.
- Production: `<alerts only | cap at $n>`, because `<reason>`.
- Error tracker: sampling `<rate>`, per-issue rate limit on.
- Email: daily send limit `<n>` to stop abuse loops.
- API rate limits on public endpoints: `<limits>`.

## Monthly review (30 minutes)

- [ ] Spend vs budget, per provider
- [ ] Top five line items and why they moved
- [ ] Cost per active unit and its trend
- [ ] New services or accounts added this month
- [ ] Free-tier usage as % of limit, per service
- [ ] Credits remaining and expiry dates
