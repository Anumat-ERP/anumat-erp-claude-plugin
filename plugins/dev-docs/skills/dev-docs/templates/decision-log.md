<!--
Template: Decision log
Basis: common project-management practice. Lighter than an ADR.
Use when: a project makes many small decisions (scope, process, vendor,
priority) that need one running record, so nobody has to search meeting
notes. Architecture decisions go in ADRs; list them here with a link.
Rule: append only. To reverse a decision, add a new row that supersedes the
old one, and mark the old one.
Lives at: docs/project/decision-log.md
Remove this comment in the finished document.
-->

# Decision log: <Project or team>

| Owner | <name> |
|---|---|
| Last updated | <YYYY-MM-DD> |

Status values: **Proposed**, **Decided**, **Superseded by D-n**, **Reversed**.

| ID | Date | Decision | Context and rationale | Options considered | Decided by | Status | Link |
|---|---|---|---|---|---|---|---|
| D-1 | <YYYY-MM-DD> | <Launch in two regions first: EU and UK> | <Legal review for US not complete; EU and UK cover 70% of demand> | <All regions at once; EU only> | <sponsor> | Decided | <meeting notes> |
| D-2 | <YYYY-MM-DD> | <Use PostgreSQL for order storage> | <See ADR> | <See ADR> | <architecture group> | Decided | <ADR 0003> |
| D-3 | <YYYY-MM-DD> | <description> | <why> | <what else> | <who> | Proposed | |

## How to add a decision

1. Add a row with the next ID. Never renumber.
2. State the decision so someone can act on it without the meeting context.
3. Name the person or group who decided, not who proposed.
4. Link to where it was discussed.
5. If it reverses an earlier decision, update that row's status to
   "Superseded by D-n".
