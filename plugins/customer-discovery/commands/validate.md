---
description: Design a validation experiment (smoke test, concierge, pilot, LOI, pre-sale, pricing test) with success criteria set in advance.
argument-hint: [assumption to test]
---

Design a validation experiment for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/experiments.md`
and `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/ethics.md`.

## Produce, in order

**1. The assumption,** restated as who + what + a number.

**2. Options.** Two or three candidate experiments with effort, what each
proves, what it does not prove, and the commitment currency it asks for.
Recommend the cheapest one that could prove the assumption wrong.

**3. Experiment card.** Fill in
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/experiment-card.md`:
hypothesis, method, sample, metric, pass threshold, what happens on pass and on
fail, and the decision date. Derive the threshold from what the business needs
to work, and explain the derivation. Say that example thresholds are
illustrations, not benchmarks.

**4. Supporting documents,** only if the experiment needs them:
- a pilot: `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/pilot-agreement.md`
- a letter of intent: `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/letter-of-intent.md`
- outreach for the test: `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/outreach-messages.md`

**5. Honesty check.** Confirm the experiment does not claim a product exists
when it does not, uses no fake scarcity, and has clear refund terms if money
is collected.

## Rules

- Pricing: treat "would you pay X?" as weak and a paid invoice as strong. Use
  Van Westendorp only to choose which prices to test.
- The threshold cannot change after the test starts.
- Remind the team to log the outcome in
  `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/decision-log.md`.
