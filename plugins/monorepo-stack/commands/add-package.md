---
description: Add a shared technical package with an exports map.
argument-hint: <name> [--cwd <workspace>]
---

Add a package: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/04-shared-packages.md` first. A package
holds technical capability with no business knowledge; if it needs to know what
a customer or an invoice is, use `/monorepo-stack:add-module` instead.

1. Run:
   ```
   node "${CLAUDE_PLUGIN_ROOT}/scripts/add-package.mjs" <name> [--cwd <workspace>]
   ```
2. Run `bun install`, then `bun run --filter @repo/<name> check-types`.
3. Report the package name, its exports map, and how an app imports it.
