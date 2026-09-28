---
description: Scaffold a new Bun + Turborepo monorepo with Next, Vitest, Storybook and module support.
argument-hint: [target directory] [app name]
---

Scaffold a monorepo at: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/01-workspace.md` before
running anything, so you can explain what is being created rather than only
creating it.

## Before scaffolding

Confirm the target directory, the first app's name, and that Bun is available
(`bun --version`). If the directory exists and is not empty the script refuses
— say so rather than suggesting a `--force` flag, which does not exist.

Ask whether to hold majors or cross them. The default resolves each catalog
entry to the newest version **inside** the major the template pins, because a
scaffold that silently moves React 19 to 20 hands the user a migration on day
one. `--latest` crosses majors deliberately.

## Run

    node "${CLAUDE_PLUGIN_ROOT}/scripts/init.mjs" <target> --app <name>

Version resolution prints a table of what changed before anything is written.
Show it to the user; that is the point of resolving rather than hardcoding.

Then, in the target directory:

    bun install
    bun run build

## Report

What was created, the app's dev port, and the commands that now work:
`bun run dev`, `bun run test`, `bun run storybook`, `bun run build`.

Mention the three layers — `apps/` compose, `modules/` hold business
capability, `packages/` hold technical capability — and that dependencies
point one way. Point at `/monorepo-stack:add-module` for the first capability.

**On Windows, `bun run build` uses `bun --filter`, not Turbo.** Turborepo
cannot spawn Bun on Windows; `turbo:build` is there for macOS, Linux and CI.
Say this rather than letting the user discover it. Detail in
`${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/08-brownfield.md`.

Do not add application features — this sets up a workspace and stops.
