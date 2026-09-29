<!--
Template: Breakdown output (tree plus table)
Basis: this plugin's own format, following the levels in
${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/work-hierarchy.md.
Use when: presenting the result of breaking a PRD, functional spec or idea
into initiative → epics → stories → tasks. The table maps one-to-one onto
the Jira import CSV.
Rules: temporary IDs (E1, E1.S1) until tracker keys exist; every story has
AC, an estimate and a requirement ID; coverage table shows no gaps.
Remove this comment in the finished document.
-->

# Breakdown: <Source document or idea>

| Field | Value |
|---|---|
| Source | <PRD / FS title, version, link> |
| Prepared by | <role> |
| Date | <YYYY-MM-DD> |
| Tracker | <Jira / Linear / GitHub Projects / Azure Boards> |
| Estimate scale | <story points, Fibonacci> |
| Assumptions | <list anything assumed; the user confirms> |

## Tree

```
IN-1  <Initiative name>                                   [L]
├── E1  <Epic: capability>                                 [M]  FR-001..FR-004
│   ├── E1.S1  <Walking skeleton story>                    3 pts  FR-001
│   │   ├── E1.S1.T1  <sub-task>
│   │   └── E1.S1.T2  <sub-task>
│   ├── E1.S2  <Story>                                     5 pts  FR-002   ← E1.S1
│   ├── E1.S3  Spike: <question>                           2 days          blocks E1.S4
│   └── E1.S4  <Story>                                     ? pts  FR-003   ← E1.S3
├── E2  <Epic: capability>                                 [S]  FR-005..FR-006
│   ├── E2.S1  <Story>                                     3 pts  FR-005
│   └── E2.T1  <Task: technical work>                      2 pts  —
└── Bugs / known issues
    └── B1  <Bug, if the source reports one>
```

`←` means "depends on". `[M]` is a T-shirt size.

## Table

| ID | Type | Parent | Summary | Requirement | Estimate | Priority | Depends on | Labels |
|---|---|---|---|---|---|---|---|---|
| IN-1 | Initiative | — | <name> | — | L | — | — | |
| E1 | Epic | IN-1 | <name> | FR-001..FR-004 | M | High | — | |
| E1.S1 | Story | E1 | <title> | FR-001 | 3 | High | — | req-FR-001 |
| E1.S2 | Story | E1 | <title> | FR-002 | 5 | High | E1.S1 | req-FR-002 |
| E1.S3 | Spike | E1 | <question> | FR-003 | 2 days | High | — | spike |
| E1.S4 | Story | E1 | <title> | FR-003 | ? | Medium | E1.S3 | req-FR-003 |

## Story details

### E1.S1 <title>

**As a** <role>, **I want** <capability>, **so that** <outcome>.

Acceptance criteria:

```gherkin
Scenario: <happy path>
  Given <context>
  When <action>
  Then <outcome>
```

<Repeat for each story. Keep AC short; the full story template is used
when the ticket is created.>

## Requirement coverage

| Requirement | Covered by | Gap / note |
|---|---|---|
| FR-001 | E1.S1 | |
| FR-004 | — | <Out of scope per PRD §5 / missing: needs a story> |

## Dependencies

| Item | Depends on | Type | Owner | Status |
|---|---|---|---|---|
| E1.S2 | E1.S1 | Internal | <team> | Planned |
| E1.S4 | <Vendor enables API> | External | <role> | <Requested YYYY-MM-DD> |

## Totals and forecast

| Epic | Stories | Points | Unestimated |
|---|---|---|---|
| E1 | <n> | <n> | <n> |

<Only if the user gives a velocity range: "At <low>–<high> points per
sprint, <total> points is about <N>–<M> sprints." Otherwise omit.>

## Open questions

- <question; who answers>
