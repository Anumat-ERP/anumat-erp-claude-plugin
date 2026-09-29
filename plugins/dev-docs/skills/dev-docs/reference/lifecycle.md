# Where docs live, and how they change

A document nobody can find does not exist. A document whose status nobody
knows is worse, because people act on it. This file fixes both: one place
for each type, and one status field on every document.

## Repository layout

Documentation lives in the same repository as the code it describes, and
changes in the same pull request as that code. The layout below is the
default. If a repo already has a working convention, keep it and note any
difference in `docs/README.md`.

```
<repo root>
├── README.md                  what it is, how to run it, where to go next
├── CONTRIBUTING.md            how to send a change
├── SECURITY.md                how to report a vulnerability
├── CODE_OF_CONDUCT.md         community expectations
├── CHANGELOG.md               every notable change, per version
├── LICENSE
├── .github/
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.yml
│       ├── feature_request.yml
│       └── config.yml
└── docs/
    ├── README.md              index of this folder; start here
    ├── product/               PRDs, BRDs, one-pagers, user stories
    ├── requirements/          SRS, NFR specs
    ├── architecture/          arc42, C4 diagrams, SDD, data model, threat models
    ├── adr/                   one file per decision, numbered, never renumbered
    ├── design/                design docs and RFCs
    ├── api/                   OpenAPI files and API prose
    ├── testing/               test plans, test cases, release checklists
    ├── operations/
    │   ├── runbooks/          one file per alert or procedure
    │   ├── postmortems/       one file per incident
    │   ├── slo/               one file per service
    │   └── releases/          release plans
    ├── project/               charter, meeting notes, decision log, retros
    └── onboarding/            handover and onboarding docs
```

In a monorepo, cross-cutting docs go in the root `docs/`. Docs that describe
one app or package go in that app's own `docs/` folder, with the same
sub-structure. ADRs stay in one root `docs/adr/` so the numbering is global,
unless each app is released and owned independently.

Where files go per type:

| Type | Path | File name |
|---|---|---|
| PRD | `docs/product/` | `prd-<slug>.md` |
| BRD | `docs/product/` | `brd-<slug>.md` |
| One-pager | `docs/product/` | `one-pager-<slug>.md` |
| User stories | `docs/product/` or the issue tracker | `stories-<slug>.md` |
| SRS | `docs/requirements/` | `srs-<system>.md` |
| NFR spec | `docs/requirements/` | `nfr-<system>.md` |
| arc42 | `docs/architecture/` | `architecture.md` (or one file per section in a folder) |
| C4 diagrams | `docs/architecture/` | `c4-<level>.md` |
| SDD | `docs/architecture/` | `sdd-<system>.md` |
| Data model | `docs/architecture/` | `data-model.md` |
| Threat model | `docs/architecture/` | `threat-model-<scope>.md` |
| ADR | `docs/adr/` | `NNNN-<short-title>.md`, e.g. `0007-use-postgres.md` |
| Design doc / RFC | `docs/design/` | `NNNN-<slug>.md` or `<yyyy-mm>-<slug>.md` |
| API spec | `docs/api/` | `openapi.yaml` plus `<api>.md` |
| Test plan | `docs/testing/` | `test-plan-<release-or-feature>.md` |
| Test cases | `docs/testing/` | `tc-<area>.md` |
| Release checklist | `docs/testing/` | `release-checklist.md` (reused) or per release |
| Runbook | `docs/operations/runbooks/` | `<alert-name>.md`, matching the alert name exactly |
| Postmortem | `docs/operations/postmortems/` | `<yyyy-mm-dd>-<slug>.md` |
| SLO | `docs/operations/slo/` | `<service>.md` |
| Release plan | `docs/operations/releases/` | `<version>.md` |
| On-call handover | the on-call channel or `docs/operations/handovers/` | `<yyyy-mm-dd>.md` |
| Project charter | `docs/project/` | `charter.md` |
| Meeting notes | `docs/project/meetings/` | `<yyyy-mm-dd>-<topic>.md` |
| Decision log | `docs/project/` | `decision-log.md` |
| Retro | `docs/project/retros/` | `<yyyy-mm-dd>-<sprint>.md` |
| Handover / onboarding | `docs/onboarding/` | `<system-or-role>.md` |

Rules for names: lowercase, hyphens, no spaces, ISO dates (`2026-09-28`).
ADR numbers are four digits, zero-padded, assigned in order, and never reused.

## Status

Every document under `docs/` carries a status block at the top:

```markdown
| Status | Draft |
|---|---|
| Owner | <name or team> |
| Reviewers | <names> |
| Created | 2026-09-28 |
| Last updated | 2026-09-28 |
| Related | <links to PRD, ADRs, issues> |
```

Root files (README, CONTRIBUTING, and the rest) do not need one. They are
always current, by definition, or they are bugs.

### Status values

```
Draft → In review → Accepted → Superseded
                  ↘ Rejected       ↘ Deprecated
```

| Status | Means | Who moves it |
|---|---|---|
| `Draft` | Being written. Do not act on it. | Author |
| `In review` | Complete; open for comment. A review deadline is set. | Author, when the review checklist passes |
| `Accepted` | Agreed. Act on it. For an ADR, the decision holds. | The named decider or approvers |
| `Rejected` | Considered and declined. Kept for the record. | The named decider |
| `Superseded` | Replaced. Must link to its replacement: `Superseded by 0012`. | Author of the replacement |
| `Deprecated` | No longer applies, with no replacement. Say why. | Owner |

Operational docs (runbooks, SLOs, the release checklist) use `Draft` then
`Accepted`, and after that are simply kept current. Postmortems use
`Draft → In review → Published` and are then closed when all actions are done.

### Rules

- **Accepted ADRs are immutable.** To change a decision, write a new ADR
  that supersedes it, and update only the old one's status line.
- **Other accepted documents may be edited**, but a change of substance goes
  through review again. Record it in a change log at the bottom:
  `2026-10-02 — <name> — changed rate limit from 100 to 200 rps (ADR 0014)`.
- **Review has a deadline.** "In review" with no date stays in review
  forever. Set one, usually 3 to 5 working days.
- **Stale is a status too.** A document not updated for 12 months, describing
  something that changed, is wrong. The audit command flags these.
- **Delete nothing that was accepted.** Mark it superseded or deprecated.
  History is the reason the document exists.

## The docs index

`docs/README.md` lists what exists and where. Keep it short: one line per
folder, plus a link to the ADR list. Update it in the same PR that adds a
new kind of document. Without it, people search, fail, and write a duplicate.
