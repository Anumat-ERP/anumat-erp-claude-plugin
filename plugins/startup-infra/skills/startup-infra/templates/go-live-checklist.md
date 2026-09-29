# Production-readiness / go-live checklist

Product: `<name>` · Target stage: `<n>` · Go-live date: `<YYYY-MM-DD>` · Sign-off: `<who>`

Use the sections up to and including the target stage. Each item needs
evidence (a link, a file path, a screenshot), not a tick from memory.

Sources: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md`,
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/security-baseline.md`,
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/environments-cicd.md`,
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reliability.md`.

## Stage 0 · Demo day

- [ ] `install && dev` works on a clean machine with no accounts
- [ ] Seeded demo data loads with one command; no real personal data
- [ ] Hosted demo URL warmed up and tested on mobile data
- [ ] Backup video of the full demo flow saved offline
- [ ] No secrets in the repo (scan run); `.env.example` lists names only
- [ ] Budget alert or no card on any account

## Stage 1 · First real users

**Domain and email**
- [ ] Domain on the team account, registrar lock and 2FA on
- [ ] TLS on every hostname
- [ ] SPF, DKIM, DMARC set; test email lands in inbox, not spam

**Data**
- [ ] Managed Postgres in the region nearest users; not publicly writable
- [ ] Provider backups on; restore window known
- [ ] Own nightly dump to storage in a separate account/provider
- [ ] One restore tested and recorded
- [ ] Buckets private; uploads via signed URLs

**App and auth**
- [ ] Managed auth on a production instance, on our domain
- [ ] Rate limits on sign-in, upload and webhook routes
- [ ] Webhook signatures verified

**Delivery**
- [ ] CI runs checks on every PR; main protected
- [ ] Deploy on merge; migrations run in the deploy step
- [ ] Rollback tried once

**Visibility and cost**
- [ ] Error tracker live on app and jobs; alerts to team chat
- [ ] One external uptime check
- [ ] Budget alerts 50/80/100 % on every billing account
- [ ] Every free-tier cliff written down (pause vs bill)

**Access**
- [ ] 2FA on every provider; two admins each
- [ ] Deploy token scoped; no personal keys in CI
- [ ] Privacy notice and terms published

## Stage 2 · Paying customers

- [ ] Paid plans on the services the product cannot run without
- [ ] Staging mirrors prod config; seeded or anonymised data
- [ ] Preview deploys with isolated data
- [ ] Uptime checks on sign-in and the core flow; status page hosted elsewhere
- [ ] Logs retained long enough to investigate last week's issue
- [ ] Secrets in one store; rotation list exists
- [ ] SLOs written (`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/slo.md`)
- [ ] Incident one-pager shared (`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/incident-one-pager.md`)
- [ ] Migrations backwards compatible for one release
- [ ] Quarterly restore drill scheduled
- [ ] DPA template and subprocessor list ready
- [ ] Access list reviewed; offboarding checklist exists

## Stage 3 · Growth

- [ ] Production defined in IaC; console changes are exceptions and recorded
- [ ] On-call rota of three or more; runbooks linked from alerts
- [ ] Error budgets used in release decisions
- [ ] DR tier chosen and drilled per system
- [ ] Feature flags with owners and removal dates
- [ ] SOC 2 readiness underway; audit logs retained
- [ ] Analytics off the production primary

## Stage 4 · Scale

- [ ] Regional failover rehearsed in the last six months
- [ ] Cost per unit reported per team monthly; tagging enforced
- [ ] Commitments cover only the proven baseline
- [ ] Chaos / game-day results recorded and acted on

## Sign-off

| Area | Owner | Blocking items | Signed |
|---|---|---|---|
| Data and backups | | | |
| Delivery | | | |
| Visibility | | | |
| Security baseline | | | |
| Cost | | | |
