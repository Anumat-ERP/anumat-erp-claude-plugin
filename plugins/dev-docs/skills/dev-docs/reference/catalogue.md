# Template catalogue

Every template in this plugin, its basis, and when to use it. "Based on" and
"adapted from" mean the section structure follows the named source. No
template reproduces standard text, and none makes a document conformant or
certified. If a project must conform to a standard, check the document
against the standard itself.

Each template starts with an HTML comment naming its basis and use. Remove
that comment in the finished document; keep the status block.

Documents chain in this order: PRD → FS (SRS if formal) → design doc/SDD → TS → test plan. Each links to the one before it.

## Product

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/prd.md` | Common product-management practice; no formal standard | Defining what a product or feature must do and why, before design starts |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/brd.md` | Adapted from business-analysis practice (IIBA BABOK concepts: business need, stakeholders, transition requirements) | Justifying an initiative to a sponsor in business terms: cost, benefit, scope |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/user-stories.md` | Connextra story format; INVEST criteria (Bill Wake); Given/When/Then from Behaviour-Driven Development (Gherkin) | Breaking a feature into deliverable, testable slices |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/one-pager.md` | Common "one-pager" pitch practice | Getting a go/no-go on an idea before anyone writes a PRD |

## Requirements

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/functional-spec.md` | Adapted from common industry FSD practice; complements ISO/IEC/IEEE 29148 (see the SRS template) | Stakeholders need to agree what each screen and function does: flows, business rules, validations, permissions, and Given/When/Then acceptance criteria. Sits between the PRD and the SRS or TS |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/srs.md` | Based on the ISO/IEC/IEEE 29148:2018 SRS information items | Contractual, regulated, or large-system requirements that need IDs and traceability |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/nfr.md` | Organised by the ISO/IEC 25010 product quality characteristics | Stating measurable quality targets: performance, security, reliability, and the rest |

## Design and architecture

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/technical-spec.md` | Common engineering practice; no formal standard. Lighter than the SDD, more concrete than the design doc | Engineers need the concrete implementation plan for one feature or component: modules, API and schema changes, jobs, flags, tests, rollout, and a task breakdown for tickets |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/sdd.md` | Based on the IEEE 1016-2009 design viewpoints | A formal software design description is required (regulated, contractual, or large teams) |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/arc42.md` | Follows the 12-section arc42 template (arc42.org, CC BY-SA) | Documenting the architecture of a whole system, kept alive over years |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/c4-diagrams.md` | Simon Brown's C4 model (c4model.com), drawn in Mermaid | Drawing context, container, and component diagrams |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/adr-nygard.md` | Michael Nygard's ADR format (2011) | Recording one architecture decision, short form |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/adr-madr.md` | Adapted from MADR 4.x (adr.github.io/madr) | Recording one decision where options and trade-offs need to be compared explicitly |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/design-doc.md` | Adapted from the Google-style design doc and common RFC practice | Proposing a change that needs review before building: several weeks of work, several teams, or hard-to-reverse choices |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/api-spec.md` | OpenAPI Specification 3.1 skeleton, plus prose | Defining or documenting an HTTP API |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/data-model.md` | Common ERD practice; Mermaid `erDiagram` | Documenting entities, relationships, constraints, and data ownership |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/threat-model.md` | STRIDE (Microsoft); four-question frame from the Threat Modeling Manifesto | Before building anything that handles auth, money, personal data, or a new trust boundary |

## Quality

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/test-plan.md` | Based on the ISO/IEC/IEEE 29119-3 test plan structure | Planning the testing of a release or a significant feature |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/test-case.md` | Based on the ISO/IEC/IEEE 29119-3 test case specification | Writing manual or acceptance test cases that someone else will run |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/release-checklist.md` | Common QA sign-off practice | The go/no-go gate before a release ships |

## Operations

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/runbook.md` | Common SRE runbook practice | Documenting how to diagnose and fix one alert or operate one procedure |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/postmortem.md` | Adapted from the blameless postmortem in Google's *Site Reliability Engineering* book | After an incident, to learn and to track follow-up actions |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/oncall-handover.md` | Common on-call practice | At every on-call shift change |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/slo.md` | Adapted from the SLO document in Google's *The Site Reliability Workbook* | Agreeing reliability targets and an error budget policy for a service |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/release-plan.md` | Common release-management practice | Planning a deployment that needs sequencing, a rollback plan, or communication |

## Repository files

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/readme.md` | Common open-source README practice | Every repository, at the root |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/contributing.md` | GitHub community health file conventions | Any repo that accepts changes from people other than the author |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/security.md` | Coordinated vulnerability disclosure practice (ISO/IEC 29147 concepts); GitHub security policy file | Any repo others use or deploy |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/code-of-conduct.md` | Points to the Contributor Covenant; does not copy it | Any repo with a community |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/changelog.md` | Keep a Changelog 1.1.0 and Semantic Versioning 2.0.0 | Any versioned package, library, or app |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/release-notes.md` | Common release-notes practice | Announcing one release to users, in their terms |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/pull-request.md` | GitHub pull request template convention | Setting up `.github/pull_request_template.md` |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/issue-bug.md` | GitHub issue form convention | Setting up a bug report form |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/issue-feature.md` | GitHub issue form convention | Setting up a feature request form |

## Project

| Template | Basis | Use when |
|---|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/project-charter.md` | Adapted from the project charter concept in PMI's PMBOK Guide | Starting a project that needs a sponsor, a budget, and agreed scope. The full RACI matrix, SOPs, and ticket breakdown come from the companion `delivery-ops` plugin |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/meeting-notes.md` | Common practice | Recording a meeting's decisions and actions |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/decision-log.md` | Common practice; lighter than an ADR | Tracking many small project decisions in one place |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/retro.md` | Common agile retrospective formats (start/stop/continue; what went well / what did not) | At the end of a sprint or project phase |
| `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/onboarding.md` | Common practice | Handing a system to a new owner, or onboarding a new team member |
