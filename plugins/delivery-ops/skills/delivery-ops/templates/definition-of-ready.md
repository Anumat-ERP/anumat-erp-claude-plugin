<!--
Template: Definition of Ready
Basis: common agile practice. The DoR is not part of the Scrum Guide; use it
as a conversation aid, not a rigid gate. Guidance is in
${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/quality-gates.md.
Use when: agreeing with a team when a ticket may be pulled into a sprint.
Rules: 5 to 10 items; each checkable yes/no; agreed by the whole team;
reviewed at retrospectives.
Remove this comment in the finished document.
-->

# Definition of Ready: <Team>

| Field | Value |
|---|---|
| Team | <team> |
| Agreed on | <YYYY-MM-DD> |
| Review | <every N retrospectives / quarterly> |
| Where it is enforced | <refinement meeting; board column "Ready"> |

## A story is ready when

- [ ] It is written from a real user's point of view, with a "so that".
- [ ] It is linked to its epic and requirement ID.
- [ ] Acceptance criteria are written and the team understands them.
- [ ] The team has estimated it, and it fits in one sprint.
- [ ] Dependencies are known; none blocks starting, or there is a plan.
- [ ] Designs are attached and reviewed by the team, if there is UI.
- [ ] Test data, access and environments are available, or a task exists.
- [ ] <team-specific item>

## A bug is ready when

- [ ] Steps to reproduce work.
- [ ] Expected and actual behaviour are stated.
- [ ] Severity and priority are set.

## A spike is ready when

- [ ] The question is one sentence.
- [ ] The time box is set.
- [ ] "Answered" is defined.

## Exceptions

<When the team may start work that is not ready, e.g. an S1 bug, and who
decides.>
