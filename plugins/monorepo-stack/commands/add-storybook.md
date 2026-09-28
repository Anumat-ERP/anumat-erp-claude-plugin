---
description: Add Storybook to the UI package of an existing workspace, with any package manager.
argument-hint: [--package <relative dir>] [--cwd <workspace>]
---

Add Storybook: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/05-storybook.md` first: it explains why
this uses `@storybook/react-vite` and how stories are written so they stay
machine-readable.

1. Run:
   ```
   node "${CLAUDE_PLUGIN_ROOT}/scripts/add-storybook.mjs" [--package <relative dir>] [--cwd <workspace>]
   ```
   It detects the package manager from the lockfile; use that one for the next step.
2. Install, then build Storybook once (`storybook build`) and report the result.
3. List the components that have no story yet: those are the gaps.
