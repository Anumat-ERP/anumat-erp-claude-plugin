---
description: Set up the documentation structure and root community files for a repository.
argument-hint: [optional: "minimal" or "full"; defaults to minimal]
---

Set up documentation for the current repository. Mode: **$ARGUMENTS**
(default `minimal`).

## 1. Inventory first

Before creating anything, list what exists:

- Root files: `README.md`, `CONTRIBUTING.md`, `SECURITY.md`,
  `CODE_OF_CONDUCT.md`, `CHANGELOG.md`, `LICENSE`.
- `.github/`: pull request template, `ISSUE_TEMPLATE/`, `CODEOWNERS`.
- A `docs/` folder and its layout; any ADR folder (`docs/adr/`,
  `doc/adr/`, `docs/decisions/`, `adr/`).
- Docs tooling: `.markdownlint*`, `.vale.ini`, a docs site config.
- Whether it is a monorepo (workspaces, `apps/`, `packages/`).

Existing files are never overwritten. If one exists, check it against the
checklist and list gaps instead. If the repo already has a docs convention,
keep it.

## 2. Plan

Show the user a table: file, action (create / keep / suggest changes), and
template. Wait for confirmation before writing.

**Minimal** creates only what is missing from:

| File | Template |
|---|---|
| `README.md` | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/readme.md` |
| `CONTRIBUTING.md` | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/contributing.md` |
| `SECURITY.md` | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/security.md` |
| `CHANGELOG.md` | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/changelog.md` |
| `.github/pull_request_template.md` | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/pull-request.md` |
| `docs/README.md` | an index, per `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/lifecycle.md` |
| `docs/adr/0001-record-architecture-decisions.md` | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/adr-nygard.md` |

**Full** adds:

| File | Template |
|---|---|
| `CODE_OF_CONDUCT.md` | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/code-of-conduct.md` |
| `.github/ISSUE_TEMPLATE/bug_report.yml` and `config.yml` | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/issue-bug.md` |
| `.github/ISSUE_TEMPLATE/feature_request.yml` | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/issue-feature.md` |
| The `docs/` folder tree | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/lifecycle.md` |
| `.markdownlint.jsonc`, `.vale.ini`, docs CI job | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/docs-as-code.md` |
| `docs/architecture/c4-context.md` with a first context diagram | `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/templates/c4-diagrams.md` |

Do not create empty placeholder documents (an empty PRD, an empty runbook).
Create folders only with a `README.md` saying what goes in them, or not at all.

## 3. Fill from the repo

Read each template before using it. Fill from facts in the repo: project
name, install and test commands from the package manifest, licence from
`LICENSE`, default branch, CI provider. Never invent:

- A security contact or email. Ask, or leave `TBD — <owner>` and list it.
- A code of conduct enforcement contact. Same rule.
- Supported versions. Derive from tags, or ask.

ADR 0001 records the decision to use ADRs: the format chosen, where they
live, and that accepted ADRs are superseded rather than edited.

## 4. Report

List every file created, every file left alone, and every `TBD` the user
must resolve before publishing (security contact first). Do not commit.
