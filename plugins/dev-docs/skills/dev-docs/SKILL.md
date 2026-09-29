---
name: dev-docs
description: Use when the user asks to write, update, review, or organise software development documentation — a PRD, BRD, user stories, functional spec (FS/FSD), SRS, non-functional requirements, technical spec (TS/TSD), design doc or RFC, ADR, architecture (arc42, C4), API spec, data model, threat model, test plan, release checklist, runbook, postmortem, SLO, README, CONTRIBUTING, SECURITY.md, CHANGELOG, release notes, PR or issue templates, project charter, meeting notes, retro, or onboarding doc. Also use for "set up docs for this repo", "audit our docs", "we need to write this down", and "which document do I need?". Not for code comments or docstrings.
---

# Dev Docs

A development document fails for one of three reasons. It is the **wrong
type** for the job, so it answers questions nobody asked. It is **incomplete**:
the sections people skip (scope, alternatives, rollback, owner) are the ones
that matter later. Or it **rots**: nobody knows its status, where it lives,
or whether it still holds.

This skill fixes all three. Pick the type from a decision table, fill a
complete template, and give the document a status, an owner, and a home in
the repo.

## The pipeline

```
CLASSIFY  → which document does this situation need? One, not three.
LOCATE    → where does it live in the repo, and does one already exist?
GATHER    → read the code, issues, and existing docs before asking anything
FILL      → copy the template; every section answered or marked N/A with a reason
STATUS    → set status, owner, date; link related docs
REVIEW    → run the review checklist before calling it done
```

**CLASSIFY.** Match the request to a type using
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/choosing.md`. If the request
names a type ("write a PRD"), still check it fits: a one-line decision needs an
ADR, not a design doc. If two types seem to fit, pick the smaller one and say
why. If none fits, say so and name the nearest template.

**LOCATE.** Check the repo for an existing `docs/` tree, an ADR folder, or a
file of the same type. Update an existing document before creating a new one.
Paths and naming rules are in
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/lifecycle.md`.

**GATHER.** Read the code, `package.json` or equivalent, open issues, and
related docs. Ask the user only what the repo cannot tell you, one question at
a time, and only where the answer changes the document.

**FILL.** Read the template file before writing. Do not work from memory of
it. Keep its section order. Replace every placeholder. A section you cannot
fill gets `N/A — <reason>` or `TBD — <owner>, <date>`, never silence.
Delete the template's header comment in the final file, but keep the status
block.

**STATUS.** Every document except root repo files starts as `Draft`, with an
owner and a date. Status values and transitions are in
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/lifecycle.md`.

**REVIEW.** Run `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/review-checklist.md`.

## Template catalogue

The full catalogue, with the basis of each template, is in
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/catalogue.md`. Quick index:

| Group | Templates |
|---|---|
| Product | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/prd.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/brd.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/user-stories.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/one-pager.md` |
| Requirements | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/functional-spec.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/srs.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/nfr.md` |
| Design | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/technical-spec.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/sdd.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/arc42.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/c4-diagrams.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/adr-nygard.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/adr-madr.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/design-doc.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/api-spec.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/data-model.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/threat-model.md` |
| Quality | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/test-plan.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/test-case.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/release-checklist.md` |
| Operations | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/runbook.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/postmortem.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/oncall-handover.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/slo.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/release-plan.md` |
| Repo | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/readme.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/contributing.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/security.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/code-of-conduct.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/changelog.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/release-notes.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/pull-request.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/issue-bug.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/issue-feature.md` |
| Project | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/project-charter.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/meeting-notes.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/decision-log.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/retro.md`, `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/onboarding.md` |

Documents chain in this order, each linking to the one before:
PRD → FS (SRS if formal) → design doc/SDD → TS → test plan.

The full RACI matrix, SOPs, and the portfolio → epic → story → task ticket
breakdown come from the companion `delivery-ops` plugin, not from here. The
project charter names the leads and points there.

## Reference index

| Read this when | File |
|---|---|
| Deciding which document a situation needs | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/choosing.md` |
| Looking up a template's basis and purpose | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/catalogue.md` |
| Choosing a file path, name, or status | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/lifecycle.md` |
| Structuring user-facing docs (tutorial, how-to, reference, explanation) | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/diataxis.md` |
| Writing or editing any prose | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/writing-style.md` |
| Always, before calling a document done | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/review-checklist.md` |
| Setting up linting, diagrams, or a docs site | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/docs-as-code.md` |

## Commands

| Command | Does |
|---|---|
| `/dev-docs:new <type> <subject>` | Create one document from a template |
| `/dev-docs:setup` | Lay out the docs structure and root files for a repo |
| `/dev-docs:audit` | Check a repo's docs against the review checklist |
| `/dev-docs:list` | Show the template catalogue |

## Rules that apply to every document

- **One document, one purpose.** A PRD does not contain the database schema.
  Link to the design doc instead.
- **State what is out of scope.** An unstated boundary gets crossed.
- **Record alternatives considered** in any design or decision document. A
  decision without rejected options cannot be reviewed.
- **Name an owner.** A document without an owner has no one to keep it true.
- **Link, do not copy.** Duplicated text drifts. Link to the source.
- **Be honest about bases.** Templates say "based on" or "adapted from" a
  standard. Never claim a document conforms to or is certified against a
  standard unless someone has checked it against the standard itself.
- **No invented facts.** Numbers, dates, SLO targets, and names come from the
  user or the repo. If you do not know, write `TBD` and say who decides.

## When not to use this skill

Skip it for code comments, docstrings, commit messages, or a one-line fix to
an existing document. Loading the pipeline to fix a typo wastes context.
