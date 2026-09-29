# startup-infra

An infrastructure framework for a product that starts at a hackathon on $0
and grows the way most startups do: stage by stage, with clear triggers for
when to move up.

Most early infrastructure mistakes are timing mistakes: Stage 3 machinery for
a product with ten users, or paying customers on a hackathon setup with no
backups. This plugin places a product at a stage, says what that stage needs
and what it does not need yet, and plans the move to the next one.

## The stages

| Stage | Name | Monthly infra spend | Adds |
|---|---|---|---|
| 0 | Hackathon | $0 | Local-first, free tiers, one region, seeded demo data, backup video |
| 1 | MVP / pilot | $0–50 | Real domain, managed auth and Postgres, email, error tracking, own backups, CI basics |
| 2 | First paying customers | $50–500 | Staging, preview deploys, uptime, log retention, secrets store, SLOs, incident process, cost alerts |
| 3 | Growth | $500–5k | IaC, replicas and caching, queues, feature flags, on-call, SOC 2 readiness, warehouse |
| 4 | Scale | $5k+ | Multi-region, platform team, committed-use discounts, chaos and DR drills, FinOps |

Spend bands are a guide. A product is placed by risk and users first.

## Principles

Boring tech · managed over self-hosted until it hurts · avoid cliffs (know if
a free tier pauses or bills) · portability (Postgres, S3 API, OpenTelemetry,
containers) · one region until users are elsewhere · a backup is not real
until restored · budget alerts on day one · least privilege · cattle, not pets.

## Provider-agnostic

Every layer (compute, database, auth, storage, email, queues, observability,
errors, analytics, DNS/CDN, secrets) lists several providers with their
free-tier *kind*, what happens at the limit, and how to leave. The plugin
never states free-tier quotas as fact: they change often, so every row links
the provider's pricing page and says "check".

One real stack (Cloudflare Workers, Neon, Clerk, R2, Brevo, Telegram,
Claude) is included as a worked example, not as the default.

## Commands

| Command | Does |
|---|---|
| `/startup-infra:assess` | Reads the repo, places it at a stage, lists gaps and overbuilt parts |
| `/startup-infra:plan` | Stage-by-stage roadmap with exit triggers |
| `/startup-infra:stack` | Stack for a stage and budget, per layer, with alternatives and exit plans |
| `/startup-infra:cost` | Cost model, unit economics, budget alerts at 50/80/100 %, caps |
| `/startup-infra:migrate` | Plan a move between stages or providers |
| `/startup-infra:checklist` | Production-readiness checklist, checked against the repo |

## Contents

```
skills/startup-infra/
├── SKILL.md                    router: stages, principles, routing tables
├── reference/
│   ├── stages.md               the five stages in full, with exit triggers
│   ├── principles.md           the nine rules and their tests
│   ├── layers.md               layer catalogue with alternatives and pricing links
│   ├── reference-stack.md      one worked example
│   ├── cost.md                 cost model, unit economics, guardrails, credits
│   ├── reliability.md          SLOs, backups, DR tiers, incidents, status page
│   ├── observability.md        signals and alerts per stage
│   ├── environments-cicd.md    local → preview → staging → prod; migrations; flags
│   ├── security-baseline.md    minimum security per stage
│   ├── scaling.md              Stage 3–4 building blocks
│   └── migrations.md           moving between stages and providers
└── templates/
    ├── stage-scorecard.md
    ├── infra-roadmap.md
    ├── stack-decision-record.md
    ├── vendor-evaluation.md
    ├── cost-model.md
    ├── budget-alert-plan.md
    ├── go-live-checklist.md
    ├── restore-drill-record.md
    ├── slo.md
    ├── incident-one-pager.md
    ├── migration-plan.md
    └── architecture-diagrams.md   Mermaid, one per stage
```

## Boundaries

| Not this plugin | Use |
|---|---|
| Security audits, threat models | `security-audit` plugin |
| Monorepo layout and tooling | `monorepo-stack` plugin |
| Screen structure | `design-stack` plugin |
