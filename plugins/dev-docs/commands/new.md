---
description: Create one development document (PRD, ADR, design doc, runbook, and others) from a dev-docs template.
argument-hint: <type> <subject> — e.g. "prd bulk invoice export" or "adr use postgres"
---

Create a document for: **$ARGUMENTS**

## 1. Pick the type

If the first word of the arguments names a type, match it to a template in
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/catalogue.md`. Common
aliases: `rfc` → design doc, `adr` → the repo's existing ADR format (Nygard
if none), `madr` → MADR, `stories` → user stories, `pm` or `incident` →
postmortem, `pr` → pull request template.

If no type is given, or the type does not fit the situation, use the decision
table in `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/choosing.md`.
Tell the user which type you chose and why, in one sentence. If two fit,
pick the smaller one.

## 2. Locate

Look for an existing `docs/` tree and for a document of the same type about
the same subject. If one exists, propose updating it instead, and stop for
the user's answer.

Choose the path and file name from
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/lifecycle.md`, or follow
the repo's own convention if it has one. For an ADR, find the highest
existing number and use the next one. Match the format of existing ADRs.

## 3. Gather

Read what the repo can tell you before asking: code, package manifests,
existing docs, the README, open issues, recent commits in the affected area.
Ask the user only what you cannot find, one question at a time, and only
where the answer changes the document. Everything else, fill in and mark as
an assumption for the user to check.

## 4. Fill

Read the template file now. Do not work from memory of it.

- Keep the section order.
- Replace every placeholder in `<angle brackets>`.
- A section you cannot fill: `N/A — <reason>` or `TBD — <owner>, <date>`.
- Do not invent numbers, dates, names, or targets. Use `TBD`.
- Remove the template's header comment; keep the status block with status
  `Draft`, the owner, and today's date.
- Follow `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/writing-style.md`.

## 5. Check

Run sections 1 to 3 of
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/review-checklist.md`
and the row for this type in its type-specific table. Fix what fails.

## 6. Report

Write the file. Then tell the user:

- the path,
- the type and why,
- every `TBD` and assumption that needs their input, as a short list,
- related documents they may need next (for example: a design doc usually
  produces ADRs; a new alert needs a runbook).

Do not commit.
