---
description: Create a new Bun + Turborepo workspace with one Next app, shared packages and Storybook.
argument-hint: <directory> [--app <name>] [--latest]
---

Create a new workspace: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/SKILL.md` first if it is not already loaded,
and `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/01-workspace.md` for the choices this
makes.

1. Confirm the target directory does not exist or is empty. This command is
   for **new** repositories only; for an existing one, use `/monorepo-stack:audit`
   and `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/08-brownfield.md`.
2. Run it:
   ```
   node "${CLAUDE_PLUGIN_ROOT}/scripts/init.mjs" <directory> [--app <name>] [--latest]
   ```
   Without `--latest`, versions stay inside the majors the template pins.
3. In the new directory run `bun install`, then `bun run build`,
   `bun run check-types`, `bun run lint` and `bun run test`. Report each
   result. A scaffold that does not build is not done.
4. Summarise what was created: the apps with their dev ports, the packages, and
   the next command the user is likely to want.
