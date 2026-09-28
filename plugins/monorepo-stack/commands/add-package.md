---
description: Add a shared technical package to an existing monorepo, with an exports map.
argument-hint: <package name>
---

Add a package named: **$ARGUMENTS**

## First, check it is actually a package

A package holds **technical capability with no business knowledge** — a
logger, a date helper, an HTTP client. If the thing needs to know what a
customer or an invoice is, it is a business capability and belongs in a
module: use `/monorepo-stack:add-module` instead.

Getting this wrong is expensive later: business logic in `packages/` cannot
declare its dependencies, its permissions, or the navigation it contributes,
so it can never be composed the way a module can.

## Run

    node "${CLAUDE_PLUGIN_ROOT}/scripts/add-package.mjs" <name> --cwd <workspace root>

## Report

How to consume it — `"@repo/<name>": "workspace:*"` in the consumer, then
import by package name. Never a relative path that climbs out of a package.

Then cover the exports map from
`${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/04-shared-packages.md`:
subpath exports keep the public surface deliberate, and a barrel file that
re-exports everything defeats tree-shaking and makes every consumer depend on
every part.
