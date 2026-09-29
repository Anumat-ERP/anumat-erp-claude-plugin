---
description: Design a team's issue-type hierarchy, fields, workflow and board in Jira — or in Linear or GitHub Projects if asked.
argument-hint: <team description> [jira|linear|github] — e.g. "6-person product team, 2-week sprints, Jira Cloud Standard"
---

Design a tracker setup for: **$ARGUMENTS**

## 1. Establish the facts

Default to Jira unless the user names Linear or GitHub Projects. Find out,
asking one question at a time only for what is missing:

- Tool and edition: Jira Cloud or Data Center; Free, Standard, Premium or
  Enterprise. This decides whether levels above epic are possible.
- Company-managed or team-managed project.
- Team size and roles; Scrum (sprint length) or Kanban.
- What the team tracks today, and what hurts.
- Whether an existing Definition of Ready or Done exists.

## 2. Read the references

- Jira: `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/tool-jira.md`
- Linear, GitHub Projects, Azure Boards:
  `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/tool-others.md`
- Levels: `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/work-hierarchy.md`

## 3. Design

Read `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/jira-setup.md` and
fill it. Principles:

- **Hierarchy**: map theme, initiative, epic, story, task, sub-task, bug and
  spike to what the edition supports. If levels above epic need Premium,
  say "check your plan" and give the workaround.
- **Issue types**: as few as the team really distinguishes. Spike as a
  custom type or a label.
- **Fields**: every custom field has a reason and an owner. Include a
  requirement ID field or label convention for traceability.
- **Components vs labels**: components for owned product areas, labels for
  cross-cutting tags. Write the naming rule.
- **Workflow**: the fewest statuses that the team really distinguishes, each
  mapped to a status category. Blocked as a flag.
- **Board**: Scrum or Kanban, columns, WIP limits, swimlanes, quick filters.
- **JQL**: saved filters for the views the team needs (open epics, current
  sprint, needs estimate, high-priority bugs, by requirement).
- **Quality gates**: where the Definition of Ready and Done are enforced.
  If none exist, offer `/delivery-ops:dor-dod`.

## 4. Report

Write the design to the path the user names, or
`docs/delivery/tracker-setup.md`. Tell the user which parts depend on their
edition, what an admin must do by hand, and the open questions. Do not
change any tracker.
