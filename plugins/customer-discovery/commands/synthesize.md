---
description: Turn interview notes into patterns, a quote bank, pain rankings, and a persevere, pivot, or kill decision.
argument-hint: [path to notes, or paste notes]
---

Synthesize these interviews: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/synthesis.md`
and `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/signals.md`.

If the argument is a path, read the notes there. If notes are missing, ask for
them; do not invent interview content.

## Produce, in order

**1. Scorecards.** Score each interview with
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/interview-scorecard.md`.
Flag interviews where the team pitched, or heard only compliments.

**2. Observations and affinity groups.** Extract facts, quotes, workarounds,
costs, and triggers; group them; name each group in the customer's words;
count distinct interviews per group.

**3. Pain frequency x intensity.** Rank the groups and place them in quadrants.

**4. Quote bank.** The strongest verbatim quotes, tagged by interview ID.
Keep names out.

**5. Signals.** Strong vs weak, with commitments listed by currency (time,
reputation, money). Name the red flags heard.

**6. Hypotheses check.** For each hypothesis: supported, contradicted, or
unknown, with counts for and against.

**7. Gaps.** Sampling problems, missing roles (buyer vs user), and whether
saturation looks reached.

**8. Decision.** Recommend persevere, pivot (name the one element changing), or
kill, with the reasoning, and draft the entry for
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/decision-log.md`.

Fill the result into
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/synthesis-board.md`.

Be direct. If the evidence is weak, say so, even when the team is excited.
