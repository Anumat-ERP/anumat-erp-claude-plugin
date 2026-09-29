---
name: startup-infra
description: Use when choosing where and how to host a product, or deciding what infrastructure to add next — including requests phrased as "what should we deploy on", "which free tier", "can we run this for $0", "we're growing, what next", "how do we scale this", "our bill jumped", "do we need staging / on-call / Terraform / SOC 2 yet", or "write an infra roadmap". Places the product at a stage (hackathon, MVP, first paying customers, growth, scale), picks a provider-agnostic stack per layer with alternatives, sets cost guardrails, and plans the move to the next stage. Not for writing application features, and not for a security audit (that is the security-audit plugin).
---

# Startup Infra

Most early infrastructure mistakes are timing mistakes. Teams build Stage 3
machinery (Kubernetes, multi-region, a platform team) for a product with ten
users, or they run a product with paying customers on a hackathon setup with
no backups and no alerts. Both are expensive; the second one is expensive on
the worst day of the year.

This skill answers two questions, in this order:

1. **Which stage is this product at?** Measured by users, revenue, team and
   risk, not by ambition.
2. **What does that stage need, and what does it not need yet?** Plus the
   exit triggers that say when to move up.

## What this skill does not do

| Not this | Whose job |
|---|---|
| Security audit, threat model, pen-test prep | the `security-audit` plugin |
| Monorepo layout, task graph, workspace tooling | the `monorepo-stack` plugin |
| Screen and UI structure | the `design-stack` plugin |

Security still appears here as a **per-stage baseline** (what must be true
before you move up), not as an audit.

## The stages

| Stage | Name | Monthly infra spend | Signal you are here |
|---|---|---|---|
| 0 | Hackathon | $0 | A demo, a deadline, no real users |
| 1 | MVP / pilot | $0–50 | Real people log in; a real domain; data you must not lose |
| 2 | First paying customers | $50–500 | Someone pays; downtime costs money or trust |
| 3 | Growth | $500–5k | Several engineers; traffic grows monthly; enterprise asks for SOC 2 |
| 4 | Scale | $5k+ | Users on several continents; infra is a team, not a task |

Spend bands are a rough guide, not the definition. A regulated pilot can be
Stage 2 on $30 a month. Place by **risk and users first, spend second**.

Full detail per stage (goal, users, budget, what to run, what not to build
yet, exit triggers, risks): `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md`.

## The pipeline

```
PLACE    → which stage, by the scorecard. Evidence from the repo, not the pitch
LAYERS   → per layer: what runs now, what the free tier does when exceeded
GAPS     → what this stage requires that is missing; what is overbuilt
GUARD    → budget alerts, spend caps, backups proven by a restore
TRIGGERS → the numbers or events that mean "move up"
MIGRATE  → a plan for the move, with a rollback, before the trigger fires
```

## The principles

Read `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md`
before recommending anything. The short form:

- **Boring tech.** Postgres, a container or a function, object storage.
- **Managed over self-hosted** until the bill or a limit actually hurts.
- **Avoid cliffs.** Know whether a free tier pauses you or bills you.
- **Portability.** Postgres wire protocol, S3 API, OpenTelemetry, OCI containers.
- **One region** until you have users somewhere else.
- **A backup is not real until you have restored it.**
- **Budget alerts on day one**, even at $0.
- **Least privilege**, and **cattle, not pets**.

## Routing

| Task | Read |
|---|---|
| Place a product at a stage | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md` and `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stage-scorecard.md` |
| Pick a provider per layer | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md` |
| See one real stack end to end | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reference-stack.md` |
| Estimate cost, set alerts, unit economics, credits | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/cost.md` |
| SLOs, backups, DR tiers, incidents, status page | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reliability.md` |
| Logs, metrics, traces, alerts | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/observability.md` |
| Environments, preview deploys, CI/CD, migrations in deploy, flags | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/environments-cicd.md` |
| Security baseline per stage | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/security-baseline.md` |
| IaC, caching, queues, on-call, compliance, multi-region | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/scaling.md` |
| Move between stages or providers | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/migrations.md` |

## Templates

Fill these in; do not paraphrase them from memory.

| Output | Template |
|---|---|
| Stage assessment | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stage-scorecard.md` |
| Stage-by-stage roadmap | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/infra-roadmap.md` |
| One layer's decision | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stack-decision-record.md` |
| Compare vendors | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/vendor-evaluation.md` |
| Monthly cost | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/cost-model.md` |
| Budget alerts and caps | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/budget-alert-plan.md` |
| Go-live readiness | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/go-live-checklist.md` |
| Restore drill | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/restore-drill-record.md` |
| SLO | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/slo.md` |
| Incident response | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/incident-one-pager.md` |
| Migration | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/migration-plan.md` |
| Architecture diagram per stage | `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/architecture-diagrams.md` |

## Rules for every answer

- **Name the stage first**, with the evidence that put it there.
- **Every recommendation gets an alternative and an exit plan.** "Use X" alone
  is half an answer; "use X, or Y if Z, and leave via W" is the whole one.
- **Never state a free-tier quota as fact.** Limits change often. Say what
  kind of limit it is and what happens when you cross it, then link the
  provider's pricing page and tell the reader to check it.
- **Say what not to build yet.** Premature infrastructure is a cost too: it
  is paid in attention every week.
- **Give triggers as numbers or events**, not feelings: "p95 latency over
  800 ms for a week", "first customer asks for a DPA", not "when it gets big".
- **Do not invent credit amounts or prices.** Point to the programme or
  pricing page.

## Commands

| Command | Does |
|---|---|
| `/startup-infra:assess` | Reads the repo, places it at a stage, lists what is missing and what is overbuilt |
| `/startup-infra:plan` | Stage-by-stage roadmap with exit triggers |
| `/startup-infra:stack` | A stack for a given stage and budget, per layer, with alternatives |
| `/startup-infra:cost` | Monthly cost estimate, unit economics, budget alerts and caps |
| `/startup-infra:migrate` | A plan for moving between stages or providers |
| `/startup-infra:checklist` | The production-readiness checklist for the current or next stage |
