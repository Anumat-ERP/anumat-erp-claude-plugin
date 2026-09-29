# Jira

Jira varies by deployment (Cloud or Data Center), project type
(company-managed or team-managed) and plan (Free, Standard, Premium,
Enterprise). Field names and features below are common defaults. **Check
your own instance and plan** before promising a configuration.

## Hierarchy

Default hierarchy on every plan:

```
Epic                     (level 1)
  Story / Task / Bug     (level 0, "standard" issue types)
    Sub-task             (level -1)
```

- **Above epic**: levels such as Initiative or Theme are added through
  Advanced Roadmaps, now called **Plans**, which is included on Premium and
  Enterprise plans. The hierarchy is configurable by an admin. Check your
  plan before designing a hierarchy that depends on it. On Standard or Free,
  common workarounds are a separate "Initiative" project with links, or
  labels.
- **Parent field**: Jira Cloud has moved from the old "Epic Link" and
  "Parent Link" fields to a single **Parent** field. Older instances and
  Data Center may still use Epic Link. Check which yours shows.
- **Spike** is not a default issue type. Add it as a custom type, or use
  Task with a `spike` label.

## Issue types and fields

Keep issue types few. Each one should have a different workflow or a
different set of required fields; otherwise it is a label.

| Field | Use for | Notes |
|---|---|---|
| Summary | Title | Verb + object for tasks; user outcome for stories |
| Description | Story statement, AC, notes | Use a description template per type |
| Acceptance criteria | AC | Custom field or a section in Description |
| Story Points | Estimate | Called "Story point estimate" in team-managed projects |
| Priority | Order of urgency | Keep the default five levels unless you have a reason |
| Components | Stable parts of the product with an owner (e.g. Billing, Auth) | Admin-managed; can auto-assign |
| Labels | Free-form cross-cutting tags (e.g. `req-FR-012`, `spike`, `tech-debt`) | Anyone can create; agree a naming rule to avoid sprawl |
| Fix Version | Release the item ships in | Drives release notes and release burndown |
| Sprint | Iteration | Scrum boards only |
| Custom: Requirement ID | Traceability to the PRD | A text field or labels |

**Components vs labels:** components are a controlled, small list of product
areas with owners. Labels are open tags. If you need reporting by area, use
components; if you need ad-hoc grouping, use labels.

## Workflow

Keep statuses to what the team really distinguishes. A common Scrum flow:

```
To Do → In Progress → In Review → Done
             ↑            │
             └── (changes requested)
```

- Map each status to a **status category** (To Do, In Progress, Done). Reports
  depend on the category, not the name.
- Add a **Blocked** flag rather than a status if you want blocked items to
  keep their place on the board.
- Put DoD checks in the transition to Done (a validator or a checklist
  field), not in extra statuses.
- Set the **Resolution** on transition to Done in company-managed projects,
  or JQL filters on `resolution` will be wrong.

## Boards

| Board | Use when | Key settings |
|---|---|---|
| **Scrum** | Fixed-length sprints, velocity, sprint goals | Estimation statistic (Story Points), backlog, sprint length |
| **Kanban** | Continuous flow; support, ops, platform teams | WIP limits per column, cycle-time reports |

One board per team. Board filter is a JQL query; keep it simple (usually
`project = KEY ORDER BY Rank ASC`).

## JQL for common views

```sql
-- Open epics in rank order
project = KEY AND issuetype = Epic AND statusCategory != Done ORDER BY Rank ASC

-- Children of one epic
parent = KEY-123 ORDER BY Rank ASC

-- Current sprint, not done
project = KEY AND sprint in openSprints() AND statusCategory != Done

-- Ready-for-refinement gaps: stories in future sprints with no estimate
project = KEY AND issuetype = Story AND sprint in futureSprints() AND "Story Points" is EMPTY

-- Open high-priority bugs
project = KEY AND issuetype = Bug AND priority in (Highest, High) AND resolution = Unresolved ORDER BY created ASC

-- Everything for one requirement
project = KEY AND labels = req-FR-012

-- Done this week
project = KEY AND status changed to Done during (startOfWeek(), now())

-- Stuck: in progress with no update for 5 days
project = KEY AND statusCategory = "In Progress" AND updated <= -5d
```

Field names in JQL depend on your instance (for example "Story point
estimate" in team-managed projects). Use the JQL autocomplete to check.

## CSV import

Jira's CSV importer (System → External system import → CSV, or the
project-level import for team-managed projects) maps each CSV column to a
field. Common columns:

| Column | Maps to | Notes |
|---|---|---|
| Summary | Summary | Required |
| Issue Type | Issue type | Must match an existing type name exactly |
| Description | Description | Quote the whole value; use `\n` or real line breaks inside quotes |
| Issue Id | Temporary ID used only during import | Lets rows refer to each other |
| Parent / Parent Id | Parent | Refers to another row's Issue Id, or an existing key |
| Epic Link | Epic (older instances) | Epic's key or Epic Name; replaced by Parent in newer Cloud |
| Epic Name | Epic Name (older instances) | Required on epics in some versions |
| Priority | Priority | Must match an existing priority name |
| Labels | Labels | Repeat the column for several labels |
| Story Points | Story Points | Or "Story point estimate" |
| Assignee | Assignee | Username, email or account ID, depending on version |
| Component/s | Components | Must already exist unless the importer creates them |

**Column names and required fields depend on the Jira version and the import
mapper.** Tell the user to run a two-row test import first, check the
mapping screen, and save the mapping configuration for reuse. Epics and
parents must come before their children in the file. A template with a
header and example rows is at
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/jira-import-csv.md`.
