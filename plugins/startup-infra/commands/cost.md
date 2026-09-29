---
description: Estimate monthly infrastructure cost, compute cost per active user or workspace, and set budget alerts (50/80/100 %), spend caps and guardrails.
argument-hint: [users or workspaces, monthly budget, providers — defaults to what the repo uses]
---

Build a cost model and guardrails. Input: **$ARGUMENTS**

Read now:
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/cost.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/cost-model.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/budget-alert-plan.md

## Steps

1. **List every billing account** the product uses. Find them from the repo
   (`.env.example`, SDK imports, deploy config) and ask about any others
   (domain, CI, dev-tool seats).
2. **State assumptions** for the volume drivers. Use real numbers if the user
   has them; otherwise state the assumption and label it.
3. **Prices**: do not quote from memory. For each service give the billing
   unit, the pricing-page URL, and leave the price cell for the user to fill,
   or fill it only from a page you actually read in this session with the date.
4. **Expected, 3× and 10×** columns. Point out which service hits a cliff
   first and whether it pauses or bills.
5. **Unit economics**: infra cost per active unit, and against revenue per
   unit if known.
6. **Guardrails**: fill the budget alert plan. Alerts at 50/80/100 % on every
   billing account; caps on non-production; a named owner; a monthly review.
7. **Credits**: mention that startup programmes from the major clouds and many
   SaaS tools exist and link them from the cost reference. Tell the user to
   check eligibility. Never state amounts.

## Output

The filled cost model, the filled alert plan, and a short list: the three
largest cost risks and what to do about each.
