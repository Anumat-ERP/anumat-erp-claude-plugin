---
description: Build the demo or pitch preparation plan, a T-7 to T-0 countdown with owners, a day-of timeline, risks and a kit list.
argument-hint: [event, date and slot length]
---

Build a preparation plan for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/prep-plan.md` and fill in
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/prep-plan.md`.

This command plans the preparation. It does not write the story or the script;
those are `/demo-storytelling:story` and `/demo-storytelling:script`.

## Steps

**1. Brief.** Fill the brief table. Take what you can from the arguments and
the project (README, docs, any event page the user links). Ask only for what
changes the plan: the date, the slot length, whether Q&A is inside it, what
decides success, and who presents. One question at a time.

**2. Pick the plan shape.** More than three days away: the T-7 to T-0
countdown, with real dates in the Date column. A hackathon, or less than three
days: the compressed hours-based plan from the reference file. Say which one
and why.

**3. Owners.** Put a name in every Owner cell. If the team is unknown, use
roles (speaker, driver, timekeeper) and say so.

**4. Freeze.** Mark the code freeze on the golden path explicitly (T-1, or
-6 h for a hackathon). This is the line teams cross most often.

**5. Risks.** List at least the three default risks plus anything specific to
this product: a network dependency, a phone in the story, third-party APIs,
login expiry.

**6. Hackathon.** If it is one, add a task to fill
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/judging-map.md` from the real rubric, and read
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/hackathon.md` for roles.

## Output

The filled plan as markdown. End with the next command to run, usually
`/demo-storytelling:story`.
