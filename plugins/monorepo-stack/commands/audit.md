---
description: Report how a workspace deviates from the monorepo-stack conventions. Read-only.
argument-hint: [--cwd <workspace>] [--json]
---

Audit: **$ARGUMENTS** (defaults to the current workspace).

This command never writes. Run:

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/audit.mjs" [--cwd <workspace>] [--json]
```

Then explain the findings in order of cost to fix later, highest first. For
each, name the convention it breaks and the reference file that explains it:

- workspace and catalogs: `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/01-workspace.md`
- task wiring: `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/02-turborepo.md`
- app layout: `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/03-app-anatomy.md`
- adopting in an existing repo: `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/08-brownfield.md`

Do not change anything unless the user asks you to fix a specific finding.
