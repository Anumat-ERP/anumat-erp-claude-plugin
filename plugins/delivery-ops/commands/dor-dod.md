---
description: Draft a team's Definition of Ready and Definition of Done, based on how the team works and where work gets stuck.
argument-hint: <team or product> — e.g. "mobile app team, 2-week sprints, releases weekly"
---

Draft the Definition of Ready and Definition of Done for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/quality-gates.md`
first.

## 1. Gather

Look in the repo for what already exists: a PR template, CI configuration,
test setup, release checklist, contributing guide, existing DoR or DoD.
Items that CI already enforces go into the DoD as they stand.

Then ask, one question at a time, only what the repo cannot tell you:

- What did the team find late in the last few sprints? (becomes DoD items)
- What did the team start and could not finish because something was
  missing? (becomes DoR items)
- How does work reach production, and who signs off?
- Any regulatory, security or accessibility obligations?

## 2. Draft

Read `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/definition-of-ready.md`
and `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/definition-of-done.md`.

- 5 to 10 items each; every item checkable yes or no.
- DoD: split into story, epic and release levels if the team releases
  separately from finishing stories.
- DoR: keep it light; it is a conversation aid, not a stage gate.
- Put items the team cannot meet yet under "Not yet in our DoD".
- Do not put story-specific acceptance criteria in the DoD.

## 3. Report

Write both files where the user asks, or to `docs/delivery/`. Tell the user:

- which items came from the repo and which are proposals,
- where each could be enforced (PR template, CI, workflow transition),
- that the team should agree the list together and review it at
  retrospectives.

Do not commit.
