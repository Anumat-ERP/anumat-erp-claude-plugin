# delivery-ops

Teams lose time in three places. A process lives in one person's head, so it
runs differently every time. Nobody is sure **who decides**, so work stalls
or gets decided twice. And work arrives as a PRD or a vague idea that nobody
has broken into tickets a team can pick up, finish and test.

This plugin covers all three: standard operating procedures, responsibility
matrices, and the work hierarchy from portfolio down to sub-task, mapped onto
Jira, Linear, GitHub Projects or Azure Boards.

## What you can ask

- "Write an SOP for onboarding a new customer."
- "Who is responsible for releases? Build us a RACI."
- "We need an escalation matrix for support."
- "Break this PRD down into epics and stories for Jira."
- "Write a spike ticket for evaluating search engines."
- "Set up Jira for a team of six doing two-week sprints."
- "Draft our Definition of Ready and Definition of Done."

## Relationship to dev-docs

The companion plugin `dev-docs` owns the software documents: PRD, functional
spec, technical spec, SRS, design docs, ADRs, test plans and runbooks.
`delivery-ops` starts where those stop. It takes a PRD or functional spec as
input and turns it into initiatives, epics, stories and tasks, keeping the
requirement IDs so every ticket traces back to the source.

A **runbook** (dev-docs) tells an on-call engineer how to operate a system,
usually during an incident. An **SOP** (delivery-ops) describes a repeatable
business or team process, such as approving a refund, onboarding a hire or
cutting a release, that runs the same way every time whether or not anything
is broken.

## Commands

| Command | Does |
|---|---|
| `/delivery-ops:sop <process>` | Write or update an SOP, with a process map and a register entry |
| `/delivery-ops:raci <project or process>` | Build a RACI (or RASCI, RACI-VS, DACI) and run the validation checks |
| `/delivery-ops:breakdown <PRD path or idea>` | Turn a PRD, functional spec or idea into initiative → epics → stories → tasks, with acceptance criteria, estimates and dependencies; optionally an import CSV |
| `/delivery-ops:ticket <type> <subject>` | Write one ticket: epic, story, task, sub-task, bug or spike |
| `/delivery-ops:jira-setup <team>` | Design issue types, fields, workflow and board for Jira, or Linear or GitHub Projects |
| `/delivery-ops:dor-dod <team>` | Draft a team's Definition of Ready and Definition of Done |

## Templates

26 templates, each starting with a header comment that names its basis and
when to use it.

| Group | Templates |
|---|---|
| Procedures | SOP, work instruction, process map (Mermaid swimlane), operational checklist, SOP register, training and acknowledgement log |
| Responsibility | RACI matrix, DACI decision record, roles and responsibilities, escalation matrix |
| Work hierarchy | Portfolio/theme brief, initiative brief, epic, user story, task, sub-task, bug report, spike |
| Quality gates | Definition of Ready, Definition of Done, estimation guide |
| Planning and tools | Breakdown output, Jira import CSV, Jira setup design, Now/Next/Later roadmap, sprint plan |

### On standards

Templates say "based on" or "adapted from". The SOP material draws on the
documented-information idea in ISO 9001:2015; the story material on INVEST,
SPIDR and Given/When/Then; the quality gates on the Scrum Guide and common
agile practice. None of it reproduces standard text, and using a template
does not make a process conformant to, or certified against, any standard.

## Reference files

| File | Covers |
|---|---|
| `catalogue.md` | Every template, its basis, and when to use it |
| `sops.md` | SOP vs work instruction vs checklist vs policy vs runbook; documented information; writing rules; lifecycle; measuring an SOP |
| `process-maps.md` | Mermaid swimlane and flowchart patterns |
| `raci.md` | R, A, C, I; rules; RASCI, RACI-VS, DACI; smells; workshop; analysis checklist |
| `work-hierarchy.md` | Levels, sizes, horizons, required content; anti-patterns; traceability |
| `splitting.md` | Vertical slices, SPIDR, INVEST, splitting patterns |
| `quality-gates.md` | Definition of Ready, Definition of Done, acceptance criteria |
| `estimation.md` | Story points, t-shirt sizes, planning poker, #NoEstimates, velocity and forecasting, dependencies, Now/Next/Later |
| `tool-jira.md` | Jira hierarchy, issue types, fields, workflows, boards, JQL, CSV import |
| `tool-others.md` | Linear, GitHub Projects, Azure Boards |

## What ships

**1 skill, 10 reference files, 26 templates, 6 commands.**

The skill body is a router under the 150-line cap. Detail lives in reference
and template files, loaded only when needed.

## Out of scope

PRDs, specs, design docs, ADRs, test plans and runbooks (use `dev-docs`).
Configuring a tracker through its API: this plugin designs the setup and
writes the import file; a person applies it. Legal or regulatory sign-off on
a controlled procedure.
