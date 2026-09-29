# Choosing a document

Pick the smallest document that answers the question in front of you. A
design doc for a one-line decision wastes the reviewer's time. An ADR for a
three-month migration hides the plan.

## Decision table

| Situation | Document | Template |
|---|---|---|
| "Should we even do this?" An idea needs a go/no-go | One-pager | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/one-pager.md` |
| A sponsor needs the business case: cost, benefit, risk | BRD | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/brd.md` |
| We agreed to build it; define what it must do and for whom | PRD | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/prd.md` |
| Break a feature into work items with acceptance criteria | User stories | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/user-stories.md` |
| Stakeholders need to agree what each screen and function does | FS | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/functional-spec.md` |
| Requirements must be numbered, traced, and signed off (contract, regulator, supplier) | SRS | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/srs.md` |
| "How fast / how available / how secure must it be?" | NFR spec | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/nfr.md` |
| A change needs review before building: weeks of work, several teams, hard to reverse | Design doc / RFC | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/design-doc.md` |
| Engineers need the concrete implementation plan for one feature | TS | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/technical-spec.md` |
| One architecture decision was made (or must be) and should be recorded | ADR (short) | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/adr-nygard.md` |
| One decision with several options to weigh explicitly | ADR (MADR) | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/adr-madr.md` |
| Document the whole system's architecture for the long term | arc42 | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/arc42.md` |
| A formal design description is a deliverable | SDD | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/sdd.md` |
| "Draw me the architecture" | C4 diagrams | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/c4-diagrams.md` |
| Define or document an HTTP API | API spec | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/api-spec.md` |
| Document tables, entities, and relationships | Data model | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/data-model.md` |
| New auth flow, payment, personal data, public endpoint, new trust boundary | Threat model | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/threat-model.md` |
| Plan how a release or feature will be tested | Test plan | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/test-plan.md` |
| Someone else must run a test by hand | Test case | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/test-case.md` |
| Go/no-go before a release | Release checklist | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/release-checklist.md` |
| Risky deployment: migrations, sequencing, rollback, comms | Release plan | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/release-plan.md` |
| An alert fires; what does on-call do? | Runbook | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/runbook.md` |
| An incident happened | Postmortem | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/postmortem.md` |
| On-call shift is changing | On-call handover | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/oncall-handover.md` |
| Agree reliability targets and what happens when they are missed | SLO | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/slo.md` |
| New repo, or a repo nobody can run | README | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/readme.md` |
| People other than the author will send changes | CONTRIBUTING | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/contributing.md` |
| "How do I report a vulnerability?" | SECURITY.md | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/security.md` |
| Community behaviour expectations | CODE_OF_CONDUCT | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/code-of-conduct.md` |
| Track changes across versions | CHANGELOG | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/changelog.md` |
| Tell users what one release means for them | Release notes | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/release-notes.md` |
| Standardise pull request descriptions | PR template | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/pull-request.md` |
| Standardise bug reports | Bug issue form | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/issue-bug.md` |
| Standardise feature requests | Feature issue form | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/issue-feature.md` |
| A project needs a sponsor, budget, and scope agreed | Project charter | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/project-charter.md` |
| A meeting happened and decided things | Meeting notes | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/meeting-notes.md` |
| Many small decisions need one running record | Decision log | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/decision-log.md` |
| End of a sprint or phase | Retro | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/retro.md` |
| Someone new takes over a system or joins the team | Handover / onboarding | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/onboarding.md` |

User-facing product documentation (tutorials, how-to guides, reference,
explanation) is not a template here. Structure it with
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/diataxis.md`.

## The document chain

```
PRD → FS (SRS if formal) → design doc/SDD → TS → test plan
```

The PRD says why and for whom. The FS says what the system does, screen by
screen and function by function. The SRS restates that as formal, numbered
requirements when a contract or regulator needs them. The design doc (or the
SDD, for a formal whole-system description) settles the approach and its
trade-offs; once it is agreed, the TS turns it into a concrete build plan for
one feature, and the test plan verifies all of it. Skip links the work does not need; a
small feature may go straight from PRD to TS.

RACI matrices, SOPs, and the portfolio → epic → story → task breakdown are
not in this plugin. They come from the companion `delivery-ops` plugin.

## Common confusions

**PRD vs BRD.** The BRD answers "why should the business fund this?" for a
sponsor. The PRD answers "what must the product do?" for the team building
it. Small teams often need only the PRD. Write a BRD when money or headcount
must be approved by someone outside the team.

**PRD vs SRS.** A PRD is written for a product team and is allowed to be
loose. An SRS has numbered, verifiable requirements with traceability, for a
contract or regulator. Do not write an SRS unless someone will trace against
it.

**PRD vs FS.** The PRD states the problem, the users, and the goals. The FS
turns that into agreed behaviour: each function's flow, business rules,
field validations, permissions by role, and acceptance criteria. Write an FS
when business, design, QA, and engineering must sign off on behaviour before
build, typically for ERP-style modules with many screens and rules.

**FS vs SRS.** The FS is organised by screen and function, in business
language, for stakeholders to agree. The SRS is organised as formal,
numbered, verifiable requirements for a contract or regulator. Many teams
need the FS and never an SRS.

**TS vs design doc vs SDD.** The design doc proposes an approach and weighs
alternatives. The TS is the build plan for one feature once the approach is
settled: modules, endpoints, migrations, flags, tests, rollout, and tasks.
The SDD is a formal description of the whole design. If reviewers would
still argue about the approach, write the design doc first.

**Design doc vs ADR.** The design doc is the proposal, written before the
work, with alternatives, and reviewed. The ADR is the record of one decision,
short and permanent. A design doc often produces one or more ADRs. The ADRs
stay; the design doc may go stale, and that is acceptable once its decisions
are recorded.

**Nygard ADR vs MADR.** Use Nygard when the decision is clear and the
context matters most. Use MADR when two or more options were seriously
weighed and the comparison should survive. Pick one format per repo and keep
it.

**arc42 vs SDD vs design doc.** arc42 describes the whole system as it is. An
SDD is a formal deliverable describing a design, usually for regulated or
contractual work. A design doc proposes one change. Most product teams need
arc42 (or just C4 diagrams plus ADRs) and design docs, not an SDD.

**Runbook vs postmortem.** The runbook is written before the incident, to fix
it. The postmortem is written after, to learn from it. A postmortem action
item is often "write or fix the runbook".

**CHANGELOG vs release notes.** The CHANGELOG is a complete, cumulative list
for developers. Release notes are a curated, per-release message for users.
Release notes can be drafted from the CHANGELOG, never the other way round.

**Meeting notes vs decision log vs ADR.** Meeting notes record one meeting.
A decision log records small decisions across many meetings. An ADR records
one decision that shapes the architecture. If a meeting makes an
architecture decision, write the ADR and link it from the notes.

## Size guide

| Work | Minimum documentation |
|---|---|
| Bug fix | PR description; CHANGELOG entry if user-visible |
| Small feature (days) | User stories with acceptance criteria; PR description |
| Medium feature (weeks) | PRD; FS if several screens or business rules need sign-off; TS for the build plan; design doc if the approach is not obvious; test plan section in the PR or design doc |
| Large feature or new service | PRD, design doc, ADRs, threat model if data or auth is involved, test plan, runbook, SLO, release plan |
| New repository | README, CONTRIBUTING, SECURITY.md, CHANGELOG, PR template, issue forms, `docs/adr/` with ADR 0001 |
