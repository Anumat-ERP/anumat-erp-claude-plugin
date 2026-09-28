---
description: Add a business capability module (domain, use cases, UI, permissions, navigation).
argument-hint: <name> [--label "Human Label"] [--summary "..."] [--cwd <workspace>]
---

Add a module: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/12-modules.md` first. A module owns a
business capability; if what you are adding has no business knowledge, it is a
package (`/monorepo-stack:add-package`), not a module.

1. Run:
   ```
   node "${CLAUDE_PLUGIN_ROOT}/scripts/add-module.mjs" <name> [--label "Human Label"] [--summary "..."] [--cwd <workspace>]
   ```
2. Run `bun install`, then `bun run check-types` and `bun run test` for the module.
3. Report the files created and the permissions and navigation the module
   declares, and which app should compose it.
