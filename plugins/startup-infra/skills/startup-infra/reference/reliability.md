# Reliability

Reliability work at each stage should be the smallest thing that means you
find out first and recover in a known time.

| Stage | Minimum |
|---|---|
| 0 | Backup demo video; local mode |
| 1 | Error tracking to chat; provider backups plus your own nightly dump; one restore tested |
| 2 | Uptime checks; one or two SLOs; incident process; status page; quarterly restore drill |
| 3 | On-call rota; error budgets drive release decisions; DR tier chosen per system; runbooks |
| 4 | Multi-region failover rehearsed; chaos and DR drills on a schedule |

## 1. SLO starter

An SLO is a target for what users experience, measured, over a window.

1. **Pick one or two user journeys** that matter most (sign in; submit the
   core action).
2. **Choose the indicator (SLI)**: the share of requests that succeed, or
   that complete under a latency threshold.
3. **Set the target** below what you achieve today, not above it. 99.5 % over
   30 days is a sensible first target for a small team; it allows about 3.6
   hours of failure a month.
4. **Compute the error budget**: 100 % minus the target. When it is spent,
   reliability work comes before features until it recovers.
5. **Alert on burn rate**, not on single errors: page when the budget would
   run out within hours; ticket when within days.

| Target | Allowed failure per 30 days |
|---|---|
| 99 % | ~7.2 hours |
| 99.5 % | ~3.6 hours |
| 99.9 % | ~43 minutes |
| 99.95 % | ~22 minutes |
| 99.99 % | ~4.3 minutes |

Each extra nine roughly multiplies cost and effort. Do not promise a customer
an SLA tighter than your internal SLO, or tighter than your providers' SLAs
combined.

Template: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/slo.md`.

## 2. Backups and the restore drill

- **Two layers**: the provider's point-in-time restore, plus your own logical
  dump to object storage in a separate account or provider.
- **Retention**: at least 30 days of dailies by Stage 1; weekly and monthly
  copies by Stage 2.
- **Encrypt** dumps at rest; restrict who can read the backup bucket.
- **Files**: turn on object versioning or soft delete for user uploads.
- **The drill**: restore the latest dump into a new database, point a copy of
  the app at it, check row counts and one real user flow, record time taken.
  Before leaving Stage 1, then quarterly, and after every major migration.

Record: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/restore-drill-record.md`.

## 3. DR tiers

**RPO** (recovery point objective): how much data you can lose, in time.
**RTO** (recovery time objective): how long you can be down.

| Tier | RPO | RTO | How | Typical stage |
|---|---|---|---|---|
| 4 · Rebuild | ≤ 24 h | ≤ 24–48 h | Nightly dump; redeploy from repo; manual steps in a runbook | 1 |
| 3 · Restore | ≤ 1 h | ≤ 4 h | Point-in-time restore; IaC or scripted setup | 2 |
| 2 · Warm standby | ≤ minutes | ≤ 1 h | Replica in a second region; tested failover runbook | 3 |
| 1 · Hot / active-active | ~0 | ≤ minutes | Multi-region writes or automatic failover; rehearsed | 4 |

Choose a tier **per system**, not for the whole company. Billing may be Tier 2
while analytics is Tier 4. Only claim a tier you have drilled.

## 4. Incident process

Small-team version, from Stage 2:

1. **Declare.** Anyone can. Say "incident" in the incident channel with one
   line on impact.
2. **Assign a lead.** One person decides; others investigate.
3. **Mitigate first**, diagnose second: roll back, turn off the flag, scale
   up, fail over.
4. **Communicate** on the status page and to affected customers at a set
   interval (for example every 30 minutes) until resolved.
5. **Write it up** within a few days: timeline, impact, causes, what will
   change. Blameless: focus on systems, not people.

Severity guide:

| Sev | Meaning | Response |
|---|---|---|
| 1 | Core journey down for most users, or data loss or exposure | Page now, all hands, status page |
| 2 | Degraded or down for some users | Page on-call, status page |
| 3 | Minor, workaround exists | Next working day |

One-pager: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/incident-one-pager.md`.
For data exposure, also follow the security incident steps in the
security-audit plugin.

## 5. Status page

From Stage 2. Host it **outside** your main provider so it stays up when you
do not. Many uptime tools include a free hosted status page. Components on it
should match what customers recognise (Sign-in, App, Email notifications,
API), not your internal services.

## Related

- Alerting and signals: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/observability.md`
- Multi-region and chaos drills: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/scaling.md`
