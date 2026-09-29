---
description: Generate an interview guide for a segment, either a problem interview or a JTBD switch interview, following Mom Test rules.
argument-hint: [segment] [problem | switch]
---

Write an interview guide for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/mom-test.md`.
If the argument says "switch", or the interviewees recently changed tools or
process, also read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/jtbd.md`
and base the guide on
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/jtbd-switch-guide.md`.
Otherwise base it on
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/problem-interview-guide.md`.

If you do not know which hypotheses the interviews should test, ask, or read
the team's hypotheses board if they have one.

## Produce

**1. Goal.** Which hypotheses (by ID) these interviews test, and what answer
would count as evidence for and against each.

**2. The guide,** adapted to the segment's words and situation: opening with
consent, their world, the last time it happened, workarounds and spend,
priorities, and a close with a specific ask chosen in advance.

**3. Questions to avoid** for this topic: the tempting "would you" and "do you
think" versions, each paired with its past-tense, specific replacement.

**4. Roles.** Who leads, who takes notes, and whether to record (with consent).

**5. After.** Point to
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/interview-notes.md`
and `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/interview-scorecard.md`,
to be filled in the same day.

Do not include a product pitch or demo in a problem interview.
