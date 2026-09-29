---
description: Plan a move between infrastructure stages or between providers, with a parallel run, a rehearsed cutover and a tested rollback.
argument-hint: [from → to, e.g. "stage 1 → 2" or "Vercel → Cloudflare Workers" or "Supabase → Neon"]
---

Plan this migration: **$ARGUMENTS**

Read now:
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/migrations.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/migration-plan.md

If the move is a provider change, also read ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md and compare the
target with alternatives using ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/vendor-evaluation.md.

## Steps

1. **Why now.** Name the trigger with its number. If no trigger has fired,
   say so and ask whether the move is still wanted; the cheapest migration is
   often the one not made.
2. **Inventory** from the repo: every file, env var, secret, webhook, DNS
   record and job that references the old provider or shape.
3. **One layer at a time.** If the request moves several layers, split it
   into ordered plans.
4. **Target and its exit plan.** The new choice needs one too.
5. **Parallel run, cutover, rollback**, as concrete steps with owners and
   durations. The rollback has a decision deadline.
6. **Stage transitions** also list what gets added (for 1 → 2: staging,
   uptime, SLOs, secrets store, incident process) using
   ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md, and what gets removed.
7. **Clean up**: old resources, credentials and bills.

## Output

The filled migration plan. Flag the riskiest step and how to rehearse it on
staging first.
