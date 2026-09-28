---
description: Report where an existing monorepo deviates from the monorepo-stack conventions. Read-only.
argument-hint: [path to the workspace]
---

Audit: **$ARGUMENTS** — or the current workspace if no path was given.

## Run

    node "${CLAUDE_PLUGIN_ROOT}/scripts/audit.mjs" --cwd <workspace root>

**This never writes.** Say so when reporting. It also always exits 0 — an
audit is information, not a gate, and a report that fails a build gets
disabled rather than acted on.

## Report

Group findings by severity, critical first. For each one, say **what it
costs**, not only which rule it breaks — a rule citation with no consequence
attached reads as pedantry and gets ignored:

- `port-collision` — two apps cannot run at once, and the failure is confusing
  because the second one appears to start.
- `no-lockfile` — installs are not reproducible; CI and local diverge silently.
- `module-missing-dependency` — a module declares something that is not
  installed, so composition breaks at runtime rather than at install.
- `no-storybook` — the component inventory is not browsable, components get
  rebuilt because nobody knew they existed, and design tooling has nothing to
  read.
- `internal-not-workspace` — a version range instead of `workspace:*` can
  resolve to a published copy rather than the local one.

## Then stop

Offer to fix the top finding as a separate, explicit step. Never fix anything
as part of the audit: the value of a read-only tool is that it can be run on
anything without thinking about it first, and that is lost the moment it
starts writing.
