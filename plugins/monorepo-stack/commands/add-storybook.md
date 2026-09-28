---
description: Add Storybook to the UI package of an existing monorepo, whatever its package manager.
argument-hint: [--package <relative dir>]
---

Add Storybook. **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/05-storybook.md` first.

## Run

    node "${CLAUDE_PLUGIN_ROOT}/scripts/add-storybook.mjs" --cwd <workspace root>

This works on repos this plugin did not create, including pnpm, npm and yarn
ones. The script detects the package manager from the lockfile and prints the
install command for **that** manager — report exactly what it printed rather
than assuming Bun.

If no UI package is found it says so; pass `--package packages/<dir>`.

## Then explain what to story

From the reference, in this order — the taxonomy is what stops a Storybook
becoming a pile of buttons:

```
FOUNDATIONS   colours, typography, spacing, radius, shadows, icons, motion
PRIMITIVES    button, input, checkbox, select, switch, tooltip
COMPONENTS    form, modal, drawer, table, tabs, pagination, toast
PATTERNS      search, filter, upload, empty, error, loading, permission
PRODUCT       dashboard, settings, billing — domain-specific
```

**Every interface state gets a story**, not just the happy path: empty,
loading, error, permission, overflow, offline. These are the states that are
awkward to reach in a running app, which is exactly why they go unreviewed.

## The second job stories do

Say this explicitly, because it is not obvious: stories written with declared
`argTypes` and a `Docs` block make the component inventory **machine-readable**.
The `design-stack` plugin reads it to learn what already exists before
designing anything new. Without stories it falls back to guessing from a
directory listing.

## Offer the follow-up

Offer to write stories for the existing components, one at a time, starting
with the most-used. Do not write twenty at once — each needs its states
thought about, and a batch of shallow stories is worse than a few real ones.
