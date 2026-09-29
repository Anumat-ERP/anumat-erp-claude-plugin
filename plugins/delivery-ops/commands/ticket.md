---
description: Write one well-formed ticket — epic, story, task, sub-task, bug or spike — ready to paste into Jira, Linear or GitHub.
argument-hint: <type> <subject> — e.g. "story export invoices as CSV" or "bug export misses last day of month"
---

Write a ticket for: **$ARGUMENTS**

## 1. Pick the type

If the first word names a type, use it:

| Word | Template |
|---|---|
| `theme` | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/theme-brief.md` |
| `initiative` | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/initiative-brief.md` |
| `epic` | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/epic.md` |
| `story` | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/story.md` |
| `task` | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/task.md` |
| `subtask`, `sub-task` | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sub-task.md` |
| `bug` | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/bug.md` |
| `spike` | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/spike.md` |

If no type is given, or it does not fit, choose by size and nature using
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/work-hierarchy.md`:

- More than a sprint of work → epic, not story.
- No user-visible result → task, not story.
- A missing feature → story, not bug.
- Cannot be estimated → spike first.

Say which type you chose and why, in one sentence.

## 2. Gather

Look for the parent epic, the PRD or spec and its requirement ID, related
tickets, and for bugs the logs or error text. Ask only for what you cannot
find: for a bug, the steps to reproduce; for a story, who the user is.

## 3. Fill

Read the template now. Replace every placeholder; use `TBD` for unknowns.

- **Story**: a real user, not "a developer"; acceptance criteria per
  `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/quality-gates.md`;
  run the INVEST check; if it fails Small, propose a split from
  `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/splitting.md`.
- **Bug**: severity and priority separately; expected vs actual; remove
  personal data from evidence.
- **Spike**: one question, a time box, and what "answered" looks like.
- **Estimate**: suggest one and mark it as a suggestion for the team.

## 4. Output

Print the ticket as Markdown ready to paste. If the user named a tracker,
map fields using
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/tool-jira.md` or
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/tool-others.md`. Check
it against the Definition of Ready in the quality-gates reference and list
anything missing. Do not create the ticket in any tool.
