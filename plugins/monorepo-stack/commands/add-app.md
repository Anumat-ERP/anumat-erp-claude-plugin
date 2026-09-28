---
description: Add an app to an existing monorepo, with its own dev port.
argument-hint: <app name>
---

Add an app named: **$ARGUMENTS**

## Run

    node "${CLAUDE_PLUGIN_ROOT}/scripts/add-app.mjs" <name> --cwd <workspace root>

The script finds the workspace root itself, allocates the lowest free dev port
by reading every existing app's `dev` script, and leaves the root manifest
alone — the `apps/*` glob already covers a new directory, and rewriting root
would churn the lockfile for nothing.

## Report

The allocated port, and that `bun install` is needed before the app runs.

Then explain where code goes inside it, from
`${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/03-app-anatomy.md`:
`app/` for routes, `core/` for infrastructure wired once, `shared/` for
app-local reuse. Anything a second app would want belongs in `packages/` or,
if it carries business meaning, in a module.

An app composes modules; it should not grow its own copy of a capability
another app already has.
