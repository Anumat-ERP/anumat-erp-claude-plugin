---
description: Add a Next app to an existing workspace and allocate a free dev port.
argument-hint: <name> [--cwd <workspace>]
---

Add an app: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/03-app-anatomy.md` first: it decides
what goes in `app/`, `core/` and `shared/`.

1. Run:
   ```
   node "${CLAUDE_PLUGIN_ROOT}/scripts/add-app.mjs" <name> [--cwd <workspace>]
   ```
2. Run `bun install`, then build and type-check the new app with
   `bun run --filter <name> build` and `bun run --filter <name> check-types`.
3. Report the app's path and dev port. If something the new app needs already
   exists in another app's `shared/`, say so: that is the moment to extract it
   into `packages/` (`${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/04-shared-packages.md`).
