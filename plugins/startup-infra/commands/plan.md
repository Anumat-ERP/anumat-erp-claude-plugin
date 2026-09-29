---
description: Produce a stage-by-stage infrastructure roadmap, from the current stage to Stage 4, with exit triggers and what not to build yet.
argument-hint: [current stage or product context; defaults to assessing the repo]
---

Build an infrastructure roadmap for this product. Context: **$ARGUMENTS**

Read now:
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/migrations.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/infra-roadmap.md

## Steps

1. **Place the product.** If the user did not give a stage, run the
   assessment in ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stage-scorecard.md against the repo first.
2. **Fill the roadmap template** from the current stage upward. Earlier
   stages: mark items done or missing. Missing items from earlier stages come
   first in the plan; skipping a stage's basics is the most common failure.
3. **Triggers as numbers or events** for each stage exit, specific to this
   product (its users, its customers, its region). Not "when we grow".
4. **"Not building" table**: list what the team might be tempted to build
   early, why not now, and the trigger to revisit.
5. **One migration sketch per transition** (what moves, in which order), using
   the transition table in the migrations reference. Full plans come from
   `/startup-infra:migrate`.
6. **Diagrams**: add the current and next stage diagrams from
   ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/architecture-diagrams.md, renamed to this product's providers.

Name providers only as examples with alternatives; the roadmap is about
capabilities and triggers, not vendors. Do not state free-tier quotas or
prices as facts.
