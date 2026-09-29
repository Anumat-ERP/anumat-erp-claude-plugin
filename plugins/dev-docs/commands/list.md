---
description: Show the dev-docs template catalogue, grouped, with the basis and use of each template.
argument-hint: [optional group: product, requirements, design, quality, operations, repo, project]
---

Show the template catalogue. Filter: **$ARGUMENTS** (all groups if empty).

Read `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/catalogue.md` and
print its tables for the requested group, or all groups. For each template
show the name, its basis, and when to use it. Do not print the anchored
file paths; print the short name the user can pass to `/dev-docs:new`
(the file name without `.md`, for example `prd`, `adr-madr`, `runbook`).

After the tables, add two lines:

- "Not sure which one? Describe the situation, or see the decision table."
  Then summarise the five most common rows from
  `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/choosing.md`.
- "Create one with `/dev-docs:new <name> <subject>`."

Do not create any files.
