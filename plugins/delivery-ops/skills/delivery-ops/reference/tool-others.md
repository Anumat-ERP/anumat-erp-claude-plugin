# Linear, GitHub Projects and Azure Boards

Features change often in all three tools. Check current documentation and
your plan before promising a configuration.

## Mapping the hierarchy

| Our level | Jira | Linear | GitHub Projects | Azure Boards (Agile process) |
|---|---|---|---|---|
| Theme / portfolio | Plans level (Premium) | Initiative | Organisation-level project or a label | Epic (above Feature) |
| Initiative | Plans level (Premium) | Initiative | Parent issue or separate project | Epic |
| Epic | Epic | Project | Parent issue (issue type "Feature" or "Epic") | Feature |
| Story | Story | Issue | Issue | User Story |
| Task | Task | Issue (label `task`) | Issue (issue type "Task") | Task, or User Story |
| Sub-task | Sub-task | Sub-issue | Sub-issue | Task |
| Bug | Bug | Issue (label `bug`) | Issue (issue type "Bug") | Bug |
| Spike | Custom type or label | Issue (label `spike`) | Issue (label `spike`) | Task or User Story with tag `spike` |
| Sprint | Sprint | Cycle | Iteration field | Iteration |
| Release | Fix Version | Project milestone | Milestone | Iteration or tag |

## Linear

- **Teams** own issues and have their own workflow statuses and cycles.
- **Initiatives** group projects around a company goal; they can nest.
- **Projects** are time-bound deliverables with an owner, target date and
  optional **project milestones**. A project is the closest match to an epic.
- **Issues** are the unit of work. **Sub-issues** break an issue down; a
  parent can show progress from its sub-issues.
- **Cycles** are automatic, repeating time boxes (like sprints). Unfinished
  issues can roll over automatically.
- **Estimates** are set per team: exponential, Fibonacci, linear or T-shirt.
- **Labels** and label groups replace issue types; there is no separate
  "story" vs "task" type by default.
- **Triage** is an inbox for incoming issues before they reach the backlog.
- **Import**: Linear has importers for Jira, GitHub, Asana, Shortcut and CSV.
  Check the current CSV column list in Linear's docs.

## GitHub Projects

- **Issues** are the unit of work. Organisations can define **issue types**
  (for example Bug, Feature, Task).
- **Sub-issues** give a parent/child hierarchy several levels deep. Use them
  for epic → story → sub-task. Check current nesting and count limits.
- **Milestones** belong to one repository and have a due date; use them for
  releases.
- **Projects** (the board/table/roadmap views) span repositories and hold
  **custom fields**: single select (Status, Priority, Size), number
  (Estimate), text, date, and **iteration** fields for sprints with a set
  length and breaks.
- Views: **table**, **board** and **roadmap**; group and filter by any field.
- **Automation**: built-in workflows (item closed → Status Done), plus
  GitHub Actions for anything else.
- **Bulk creation**: there is no native CSV import for issues. Use the `gh`
  CLI in a script (`gh issue create`, then `gh project item-add`), or the
  GraphQL API. Write the script from the breakdown table.

## Azure Boards, briefly

- The **process** chosen at project creation fixes the backlog levels:
  - Basic: Epic → Issue → Task
  - Agile: Epic → Feature → User Story → Task (plus Bug)
  - Scrum: Epic → Feature → Product Backlog Item → Task (plus Bug)
  - CMMI: Epic → Feature → Requirement → Task
- Note that Azure's **Epic** sits above **Feature**, so our "epic" maps to
  Feature and our "initiative" to Epic.
- **Area paths** group work by team or product area; **iteration paths**
  are sprints and releases.
- Work items can be **imported from CSV** (Boards → Work items → Import).
  Parent links are expressed by indenting title columns (Title 1, Title 2,
  Title 3). Check the current docs.
