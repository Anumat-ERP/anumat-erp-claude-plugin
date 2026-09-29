---
description: Pick an infrastructure stack for a given stage and monthly budget, layer by layer, with alternatives, free-tier cliff behaviour and an exit plan for each.
argument-hint: [stage 0-4] [budget per month] [region, constraints]
---

Recommend a stack. Input: **$ARGUMENTS**

If stage, budget or main user region is missing, ask for it in one short
question, or infer it from the repo and say what you inferred.

Read now:
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reference-stack.md (one worked example; not the default answer)

## Output

For each of the eleven layers (compute, database, auth, storage, email,
queues/cron, observability, errors, analytics, DNS/CDN, secrets):

| Layer | Pick | Why for this team and stage | Alternative (and when to prefer it) | At the free-tier limit it… | Leave via | Verify at |
|---|---|---|---|---|---|---|

Rules:
- **Portability first**: prefer Postgres, the S3 API, OpenTelemetry, OCI
  containers, OIDC.
- **Fewest vendors that work.** Each extra account is another bill, another
  login, another outage source.
- **One region**, near the users.
- **Say what not to add** at this stage.
- **No quotas or prices as facts.** Describe the kind of limit and what
  happens at it; give the pricing-page URL and "check" as the as-of date.
- **Commercial-use terms**: flag any hobby plan that forbids charging users.

Then:
1. Name the **first three bills** the stack will produce as it grows, in
   order, and the trigger for each.
2. Offer to write a decision record per layer using
   ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stack-decision-record.md, and a comparison with
   ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/vendor-evaluation.md where the choice is close.
3. For budget checks, hand off to `/startup-infra:cost`.
