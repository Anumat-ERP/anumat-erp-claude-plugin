# Scaling: Stage 3 and 4 building blocks

Each block below lists **when to add it** (the trigger), **the default
approach**, and **what to avoid**. Add a block when its trigger fires, not
because the stage says so.

## Infrastructure as code

- **Trigger:** more than one environment with hand-made config; a second
  person changing infra; an auditor asking how production is configured.
- **Default:** Terraform or OpenTofu (open-source fork, same language) with
  remote state and locking; or Pulumi if the team prefers a general-purpose
  language. Plan on every PR; apply from CI only.
- **Start with:** DNS, database projects, buckets, secrets wiring, monitors.
  Import what exists rather than recreating it.
- **Avoid:** a mix where some resources are in code and also edited in the
  console. Pick one owner per resource.

## Read replicas and caching

- **Trigger:** database CPU or connections regularly high from reads; p95
  latency dominated by queries you have already indexed.
- **Order:** fix queries and indexes first; add connection pooling; then an
  HTTP/CDN cache for public pages; then an application cache (Redis-compatible,
  e.g. Upstash, or the platform's KV); then a read replica.
- **Avoid:** caching data that must be consistent (balances, permissions)
  without a clear invalidation rule. Reads after writes go to the primary.

## Queues and background work

- **Trigger:** requests doing slow work (emails, exports, AI calls,
  webhooks out); retries needed; spikes that should be smoothed.
- **Default:** a managed queue or a Postgres-backed queue; idempotent jobs;
  a dead-letter queue with an alert; a visible "oldest job age" metric.
- **Avoid:** a workflow engine before you have multi-step workflows.

## Feature flags

See `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/environments-cicd.md`.

## On-call rotation

- **Trigger:** out-of-hours incidents more than about once a month; an SLA in
  a contract.
- **Default:** at least three people; one week each; a paging tool; runbooks
  linked from alerts; handover notes; compensation or time off in lieu.
- **Avoid:** paging on anything that is not user-facing and urgent. Review
  every page weekly: each one should have been worth waking up for.

## SOC 2 readiness

- **Trigger:** enterprise deals asking for a report or a questionnaire you
  cannot answer.
- **Default:** a compliance automation tool or a consultant; written policies;
  access reviews; change management through PRs; vendor list; background
  checks; evidence collection. Type I first, then Type II over an observation
  period.
- **Avoid:** building controls you will not keep doing. Auditors test that
  you do what the policy says.
- Depth lives in the security-audit plugin; the per-stage baseline is in
  `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/security-baseline.md`.

## Data warehouse basics

- **Trigger:** analytics queries slowing the production database; finance
  and product needing joined data (billing + usage).
- **Default:** replicate or export to a warehouse (BigQuery, Snowflake,
  ClickHouse, or DuckDB/MotherDuck for small volumes) with a managed or
  open-source ELT tool; model with SQL in version control.
- **Avoid:** analytics queries on the production primary.

## Multi-region (Stage 4)

- **Trigger:** material users on another continent with latency
  complaints; data-residency contracts; an RTO the single region cannot meet.
- **Steps:** static assets and edge caching first (cheap, large win) → read
  replicas near users → warm standby region with rehearsed failover → only
  then active-active, and only for data that can be partitioned (per tenant or
  per region).
- **Avoid:** global writes without a clear conflict model. Most B2B products
  can shard by tenant and pin each tenant to one home region.

## Platform team (Stage 4)

- **Trigger:** infra work takes more than one engineer full-time; product
  teams wait on infra changes.
- **Default:** a small team that owns paved roads (templates, CI, IaC
  modules, observability) and measures developer lead time.

## Reserved capacity and FinOps (Stage 4)

- Commit only on the steady baseline you have run for several months.
- Tag every resource by team, environment and product area; report cost per
  unit monthly (see `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/cost.md`).

## Chaos and DR drills (Stage 4)

- Start with game days: a planned failure in staging, then in production at a
  quiet hour, with a rollback ready.
- Drill regional failover at least twice a year and record RTO and RPO
  achieved against the tier in
  `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reliability.md`.
