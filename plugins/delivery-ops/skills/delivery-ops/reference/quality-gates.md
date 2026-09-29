# Quality gates: Ready, Done, and acceptance criteria

Three gates, three questions:

| Gate | Question | Applies to |
|---|---|---|
| Definition of Ready (DoR) | Can the team start this without stopping to ask? | Each ticket, before it enters a sprint |
| Acceptance criteria (AC) | What must be true for *this* story to be accepted? | Each story, specific to it |
| Definition of Done (DoD) | Is the work finished to our shared quality bar? | Every item, the same for all |

AC differ per story. DoD is the same for every story. Do not copy DoD items
into AC.

## Definition of Done

The Scrum Guide (2020) describes the Definition of Done as the formal
description of the state of the Increment when it meets the quality measures
required for the product. In short: the shared quality bar, and work that
does not meet it is not done and is not released or shown as done.

Example DoD for a product team:

- [ ] Acceptance criteria pass.
- [ ] Code reviewed and merged to the main branch.
- [ ] Automated tests added or updated; the pipeline is green.
- [ ] No new high or critical issues from linting or security scanning.
- [ ] Deployed to staging (or behind a flag in production).
- [ ] Product owner has seen it working.
- [ ] User-facing docs, help text and release notes updated if behaviour changed.
- [ ] Monitoring or analytics added where the story has a success measure.

Levels: some teams keep a DoD for stories, one for epics (outcome measured,
docs complete), and one for releases (release notes, support briefed).

## Definition of Ready

The DoR is common practice but is **not** part of the Scrum Guide. Use it as
a conversation aid, not a gate that blocks all work: a rigid DoR turns into a
hand-off contract between product and engineering.

Example DoR:

- [ ] Written as a user story (or a task or spike with a clear question).
- [ ] Linked to its epic and requirement ID.
- [ ] Acceptance criteria written and understood by the team.
- [ ] Estimated by the team and small enough for one sprint.
- [ ] Dependencies identified; none blocking, or a plan for them.
- [ ] Designs attached if there is UI; the team has seen them.
- [ ] Test data or access available, or a task exists to get it.

## Setting them with a team

1. **Start from pain.** Ask: what did we find late last sprint that we should
   have caught? What did we start and could not finish because something
   was missing? Those become DoD and DoR items.
2. **Keep them short.** 5 to 10 items each. A long list is not read.
3. **Make each item checkable**: yes or no, not "good quality".
4. **Separate "must" from "aim for".** Only "must" items are in the DoD.
5. **Agree, then publish** on the board or in the tracker's workflow.
6. **Review each retrospective** or quarterly. Raise the DoD bar over time.
7. **Do not bend it at sprint end.** If an item cannot meet the DoD, it is not
   done; it goes back to the backlog.

Templates:
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/definition-of-ready.md`
and `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/definition-of-done.md`.

## Acceptance criteria

Write them before the sprint starts, with the team. Each criterion is an
observable outcome a tester can check.

### Given / When / Then (scenario form)

Based on Behaviour-Driven Development and Gherkin syntax. Use when behaviour
depends on context and actions.

```gherkin
Scenario: Manager approves an expense under the limit
  Given an expense of 120 submitted by a team member
    And the approval limit is 500
  When the manager approves it
  Then the expense status is "Approved"
    And the team member is notified

Scenario: Expense over the limit needs a second approver
  Given an expense of 800
  When the manager approves it
  Then the status is "Awaiting finance approval"
    And the expense is not paid
```

### Rule list (checklist form)

Use when behaviour is a set of rules rather than a flow.

```
- Export includes only invoices in the selected date range.
- Dates are in the user's time zone.
- Amounts use two decimal places and the invoice's currency.
- An empty range shows "No invoices" and no file is created.
- Users without the Finance role do not see the Export button.
```

### Rules for good AC

- Cover the happy path, at least one failure or invalid input, and
  permissions if roles exist.
- State outcomes, not implementation ("status is Approved", not "set the
  `approved` column to 1").
- Measurable where it matters ("within 2 seconds", "up to 10,000 rows").
- Three to seven criteria. More means the story may need splitting.
- No DoD items ("code is reviewed") in the AC.
