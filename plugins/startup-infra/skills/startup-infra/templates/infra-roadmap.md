# Infrastructure roadmap

Product: `<name>` · Owner: `<who>` · Last updated: `<YYYY-MM-DD>` · Current stage: `<n>`

Stage definitions: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md`.
Move plans: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/migrations.md`.

**Rule:** a row moves to "doing" only when its trigger fires or is expected
within one quarter. Triggers are numbers or events, never "when we are
bigger".

## Stage 0 · Hackathon ($0)

| Item | Layer | Status | Owner |
|---|---|---|---|
| Local mode for every service; `install && dev` | all | | |
| Seeded demo data script | database | | |
| Backup demo video | n/a | | |
| One free deploy, one region | compute | | |

**Exit triggers:** `<e.g. first external user returns a second week; real personal data about to be stored>`

## Stage 1 · MVP / pilot ($0–50/mo)

| Item | Layer | Status | Owner |
|---|---|---|---|
| Real domain + DNS + TLS | DNS | | |
| Managed auth | auth | | |
| Managed Postgres, nearest region | database | | |
| Transactional email, SPF/DKIM/DMARC | email | | |
| Error tracking to chat | errors | | |
| Nightly own backup + one restore tested | database, storage | | |
| CI basics; migrations in deploy | CI/CD | | |
| Budget alerts 50/80/100 % | cost | | |

**Exit triggers:** `<e.g. first invoice paid; a free-tier limit hit twice in a month; second engineer deploys>`

## Stage 2 · First paying customers ($50–500/mo)

| Item | Layer | Status | Owner |
|---|---|---|---|
| Paid plans on DB, hosting, auth | all | | |
| Staging + preview deploys | environments | | |
| Uptime checks + status page | observability | | |
| Log retention | observability | | |
| Secrets in one store | secrets | | |
| SLOs (1–2) | reliability | | |
| Incident process | reliability | | |
| Quarterly restore drill | reliability | | |

**Exit triggers:** `<e.g. spend > $500/mo or +20 %/mo; > 3 engineers shipping weekly; SOC 2 requested; > 1 out-of-hours incident/month>`

## Stage 3 · Growth ($500–5k/mo)

| Item | Layer | Status | Owner |
|---|---|---|---|
| IaC (Terraform/OpenTofu or Pulumi) | all | | |
| Read replicas / caching (as measured) | database | | |
| Queues with dead-letter alerts | queues | | |
| Feature flags | CI/CD | | |
| On-call rota (3+ people) | reliability | | |
| SOC 2 readiness | security | | |
| Warehouse basics | analytics | | |

**Exit triggers:** `<e.g. latency complaints from users on another continent; spend > $5k/mo; residency clause signed; infra > 1 FTE>`

## Stage 4 · Scale ($5k+/mo)

| Item | Layer | Status | Owner |
|---|---|---|---|
| Warm standby → multi-region | all | | |
| Platform team | org | | |
| Committed-use discounts on baseline | cost | | |
| Chaos and DR drills | reliability | | |
| FinOps: tagging, cost per unit per team | cost | | |

## Not building (and why)

| Item | Why not now | Revisit when |
|---|---|---|
| | | |

## Review log

| Date | Stage | Triggers that fired | Decisions |
|---|---|---|---|
| | | | |
