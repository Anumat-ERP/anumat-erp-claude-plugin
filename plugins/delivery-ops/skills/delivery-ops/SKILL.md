---
name: delivery-ops
description: Use when the user asks to write or update an SOP, standard operating procedure, work instruction, operational checklist or other process documentation; to build a RACI or answer "who is responsible", define roles and responsibilities, or draft an escalation matrix; to break down a PRD, spec or idea into epics/stories/tickets (initiative, epic, story, task, sub-task, bug, spike); to design a Jira setup, Linear or GitHub Projects workflow, or backlog structure; or to set a Definition of Done/Ready, write acceptance criteria, or plan story points/estimation, velocity and roadmaps. Not for PRDs, design docs, ADRs, test plans or runbooks.
---

# Delivery Ops

Three things break team delivery. A **process lives in someone's head**, so
it runs differently each time and stops when that person is away. **Nobody
knows who decides**, so work waits or gets decided twice. And **work arrives
too big**: a PRD or an idea that nobody has cut into pieces a team can
finish, test and ship.

This skill covers all three: SOPs and work instructions, responsibility
matrices, and the work hierarchy from portfolio to sub-task, mapped onto the
team's tracker.

## Boundaries with dev-docs

The companion `dev-docs` plugin owns software documents: PRD, functional
spec, technical spec, SRS, design docs, ADRs, test plans and runbooks. This
skill takes a PRD or functional spec as **input** and breaks it into tickets.
If the user has no PRD and the work is large, suggest writing one first with
`dev-docs`.

A **runbook** tells an on-call engineer how to operate a system, usually
during an incident. An **SOP** describes a repeatable business or team
process that runs the same way whether or not anything is broken. "How do we
fail over the database" is a runbook. "How do we approve a refund" is an SOP.

## The pipeline

```
CLASSIFY  → which artefact: SOP, work instruction, checklist, RACI, DACI,
            escalation matrix, breakdown, single ticket, DoR/DoD, tool setup?
GATHER    → read the source (PRD, existing SOPs, tracker config) before asking
FILL      → copy the template; every section answered or marked N/A / TBD
CHECK     → run the checks for that artefact (RACI rules, INVEST, DoR)
OUTPUT    → Markdown first; import CSV or tool config only when asked
```

**CLASSIFY.** For process documents, use the decision table in
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/sops.md`. For work
items, match the size to a level in
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/work-hierarchy.md`.
If the request names a type that does not fit ("write a story" for three
months of work), say so and name the right level.

**GATHER.** Read the PRD, spec, existing SOPs or tracker export before asking
anything. Ask the user only what changes the output, one question at a time:
team size, sprint length, tracker, who approves.

**FILL.** Read the template file before writing. Do not work from memory of
it. Keep its section order. Replace every placeholder. A section you cannot
fill gets `N/A — <reason>` or `TBD — <owner>, <date>`. Remove the template's
header comment in the final output.

**CHECK.** Each artefact has its own checks:

| Artefact | Check with |
|---|---|
| SOP, work instruction | Writing rules and lifecycle in `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/sops.md` |
| RACI, RASCI, RACI-VS, DACI | Rules and analysis checklist in `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/raci.md` |
| Epic, story, task | INVEST and splitting in `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/splitting.md` |
| Any ticket entering a sprint | Definition of Ready in `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/quality-gates.md` |
| Estimates, roadmap | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/estimation.md` |

**OUTPUT.** Markdown is the default. Produce a tracker CSV or configuration
only when the user asks, and warn that column names and field IDs depend on
their tracker version.

## Template catalogue

The full catalogue, with the basis of each template, is in
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/catalogue.md`. Quick
index:

| Group | Templates |
|---|---|
| Procedures | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sop.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/work-instruction.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/process-map.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/checklist.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sop-register.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/training-log.md` |
| Responsibility | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/raci-matrix.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/daci-decision.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/roles-responsibilities.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/escalation-matrix.md` |
| Work hierarchy | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/theme-brief.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/initiative-brief.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/epic.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/story.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/task.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sub-task.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/bug.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/spike.md` |
| Quality gates | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/definition-of-ready.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/definition-of-done.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/estimation-guide.md` |
| Planning and tools | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/breakdown-output.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/jira-import-csv.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/jira-setup.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/roadmap-now-next-later.md`, `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sprint-plan.md` |

## Reference index

| Read this when | File |
|---|---|
| Looking up a template's basis and purpose | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/catalogue.md` |
| Choosing or writing a process document | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/sops.md` |
| Drawing a process map | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/process-maps.md` |
| Assigning responsibility or decision rights | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/raci.md` |
| Sizing work into levels, or tracing to requirements | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/work-hierarchy.md` |
| A story or epic is too big | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/splitting.md` |
| Writing DoR, DoD or acceptance criteria | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/quality-gates.md` |
| Estimating, forecasting, dependencies, roadmaps | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/estimation.md` |
| Configuring Jira or writing a Jira CSV | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/tool-jira.md` |
| Using Linear, GitHub Projects or Azure Boards | `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/tool-others.md` |

## Commands

| Command | Does |
|---|---|
| `/delivery-ops:sop` | Write or update an SOP |
| `/delivery-ops:raci` | Build and check a RACI for a project or process |
| `/delivery-ops:breakdown` | PRD, spec or idea → initiative → epics → stories → tasks, plus optional CSV |
| `/delivery-ops:ticket` | Write one well-formed ticket of a given type |
| `/delivery-ops:jira-setup` | Design issue types, fields, workflow and board |
| `/delivery-ops:dor-dod` | Draft a team's Definition of Ready and Done |

## Rules that apply to every artefact

- **Roles, not names.** SOPs, RACIs and escalation matrices name roles. A
  separate table maps roles to people, so a leaver changes one row.
- **One owner.** Every SOP, epic and decision has exactly one accountable
  role. Two owners means none.
- **Vertical slices.** A story delivers something a user or operator can
  observe. "Build the API" is a task, not a story.
- **Keep the thread.** Every epic and story carries the requirement ID it
  came from, so a change to the PRD finds every affected ticket.
- **Ranges, not dates.** Forecasts from velocity are ranges with a stated
  confidence. Never turn story points into a delivery date on your own.
- **No invented facts.** Names, dates, SLAs, team size and velocity come from
  the user. If you do not know, write `TBD` and say who decides.
- **Be honest about bases.** Say "based on" or "adapted from" ISO 9001,
  the Scrum Guide or a named author. Never claim a process is certified.

## When not to use this skill

Skip it for PRDs, specs, design docs, ADRs, test plans and runbooks (that is
`dev-docs`), and for a one-line edit to an existing ticket.
