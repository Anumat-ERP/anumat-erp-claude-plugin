---
description: Write down the riskiest assumptions behind an idea, rank them, and design the cheapest test for each.
argument-hint: [idea or product, one or two sentences]
---

Build a hypotheses and riskiest-assumptions board for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/assumptions.md` first.
This command writes a plan; it does not write code or build anything.

If the idea, the target customer, or the business model is too vague to
state as who + what + a number, ask one question at a time until it is not.
Propose everything else and let the team correct it.

## Produce, in order

**1. Lean canvas.** Fill in
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/lean-canvas.md`
from what the team has told you. Mark every box with the evidence behind it,
or "none yet".

**2. Hypotheses.** At least one each for problem, customer, solution,
business, and channel, each as a testable statement with a number.

**3. Assumption map.** Score importance and evidence 1-5, place each on the
map, and fill in
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/hypotheses-board.md`.

**4. Top three riskiest.** For each: the cheapest test that could prove it
wrong, the commitment currency it asks for (time, reputation, money), the
metric, a pass threshold set now, and a decision date. Draft an experiment
card for the riskiest one using
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/experiment-card.md`.

**5. What not to build yet.** Name the work that should wait until the top
assumption has passed.

## Then stop

End by naming the single assumption to test this week and the next command to
run (usually `/customer-discovery:icp` or `/customer-discovery:validate`).
