# Principles

Nine rules. Each has a reason and a test you can apply to a real decision.

## 1. Boring tech

Pick the option with the most answers on the internet and the most people who
can operate it. Postgres, a container or a serverless function, object
storage, a managed queue. Novel infrastructure spends your scarcest resource,
attention, on something customers never see.

**Test:** can a new hire debug this at 2 a.m. with public documentation?

## 2. Managed over self-hosted, until it hurts

A managed database costs more per GB than a VM running Postgres. It also
includes backups, upgrades, failover and someone else's pager. Until the
managed bill is larger than an engineer's time spent running it, managed wins.

**"It hurts" means** one of: the bill for that service exceeds roughly a
quarter of an engineer's cost; a hard limit blocks a feature; a contract
requires control the vendor cannot give (on-premise, residency).

## 3. Avoid cliffs

Every free tier ends somewhere. What happens at the edge matters more than
where the edge is.

| Behaviour at the limit | What it means | What to do |
|---|---|---|
| **Pause / suspend** | Service stops or returns errors until the period resets or you upgrade | Alert well before the limit; know how fast you can upgrade |
| **Throttle** | Requests slow down or queue | Watch latency, not just errors |
| **Bill overage** | Keeps working, charges per unit | Set a spend cap or budget alert; this is where surprise bills come from |
| **Hard block of a feature** | e.g. no more projects, seats or branches | Plan the paid tier before you need the feature |
| **Terms limit** | e.g. a hobby plan that forbids commercial use | Move before you charge anyone |

Which behaviour a provider uses changes over time. Record it per layer in
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stack-decision-record.md`,
with the date you checked and the pricing-page URL.

**Test:** "if traffic tripled tonight, would we go down, slow down, or get a
bill?" Everyone on the team should know the answer per layer.

## 4. Portability

Choose providers that speak a standard, so leaving is a configuration change:

| Standard | Keeps you portable across |
|---|---|
| Postgres wire protocol and SQL | Neon, Supabase, RDS, Cloud SQL, Crunchy, self-hosted |
| S3 API | R2, S3, B2, GCS (interop), MinIO |
| OpenTelemetry | Grafana, Honeycomb, Datadog, Better Stack, self-hosted collectors |
| OCI containers | Fly.io, Render, Railway, Cloud Run, ECS, Kubernetes |
| SMTP / a thin email interface | Any transactional email provider |
| OIDC / SAML | Any identity provider |

Where you use a provider-specific feature (edge key-value stores, a vendor's
auth UI), put it behind a small interface in your code and write the exit
plan down. Portability is not "no vendor features"; it is "we know the cost of
leaving".

## 5. One region until you have users elsewhere

Put compute and database in the region closest to most users, and together.
A database in one region and functions running "everywhere" is slower than
both in one place, because every query crosses the distance. Go multi-region
when measured latency or a contract demands it (Stage 3–4 triggers).

## 6. Backups are not real until you have restored one

A backup that has never been restored is a hope. Before Stage 1 ends: restore
a production dump into a fresh database, run the app against it, and record
the time it took. Repeat quarterly from Stage 2. Keep at least one copy
outside the primary provider's account. Record drills in
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/restore-drill-record.md`.

## 7. Budget alerts on day one

At $0 the alert is there to tell you the $0 stopped. Set an alert or spend cap
on every account with a card, before the first deploy. Thresholds at 50, 80
and 100 % of the monthly budget. Plan:
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/budget-alert-plan.md`.

## 8. Least privilege

Each deploy token, API key and person gets the smallest access that works,
per environment. CI deploys with a scoped token, not an owner's key. Two
people can administer each account; nobody uses the root/owner login day to
day. Baseline per stage:
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/security-baseline.md`.

## 9. Cattle, not pets

No server, database or bucket should be precious because of how it was hand
configured. If it was set up by clicking, write the clicks down (Stage 1) or
put them in code (Stage 3). Any compute instance should be replaceable by a
deploy. State lives only in managed stores that are backed up.

**Test:** could you recreate production in a new account from the repo and
the runbook in one day?
