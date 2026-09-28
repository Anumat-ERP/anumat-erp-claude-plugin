---
description: Add a business capability module — domain, use cases, UI, permissions and a manifest.
argument-hint: <module name, e.g. inventory or stock-control>
---

Add a module for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/12-modules.md` first.

## First, check it is actually a module

A module is a **business capability** — inventory, billing, CRM, scheduling.
It knows what your domain objects are. If the thing has no business meaning,
it is a package: use `/monorepo-stack:add-package`.

Ask what the capability *is* before naming it. A module named after a screen
("dashboard") or a technology ("api") will not hold a coherent boundary; one
named after a capability ("inventory") will.

## Run

    node "${CLAUDE_PLUGIN_ROOT}/scripts/add-module.mjs" <name> \
      --label "Human Label" --summary "One line" --cwd <workspace root>

Names are lowercase kebab-case — the name becomes a directory, a package name,
a permission prefix and a route segment, so the script enforces one spelling.

## Then explain the layers

```
domain/          business rules, pure TypeScript. No React, no fetch, no DB.
application/     use cases + the ports they need. Orchestration, no rules.
infrastructure/  adapters implementing those ports.
ui/              components and route fragments the module contributes.
security/        the permissions it defines.
index.ts         the only legal import path.
module.config.ts the manifest: depends, permissions, navigation.
```

The payoff is concrete: domain rules test in milliseconds without a DOM, the
same rule answers identically from a page, a route handler or a job, and
changing the transport touches one file.

## Wire it up

The module is generated disabled (`enabledByDefault: false`) so half-built
work can be merged without being reachable. To mount it:

1. Add `"@repo/module-<name>": "workspace:*"` to the app that should host it.
2. Register its manifest with `@repo/module-kit` so load order, permissions
   and navigation are derived rather than hardcoded.
3. Flip `enabledByDefault` when it is real.

Declare cross-module dependencies in `depends`, not just by importing. An
undeclared import is how cycles appear, and `/monorepo-stack:audit` reports a
`depends` entry that is not installed.
