---
description: Break a PRD, functional spec or idea into initiative → epics → stories → tasks, with acceptance criteria, estimates, dependencies and an optional Jira/Linear/GitHub import file.
argument-hint: <path to PRD/spec, or a one-line idea> [csv] [jira|linear|github] — e.g. "docs/product/prd-bulk-export.md csv jira"
---

Break down: **$ARGUMENTS**

## 1. Read the source

If the argument is a file path, read the whole file. A PRD or functional
spec (often written with the `dev-docs` plugin) should give goals,
requirements with IDs, and non-goals. Note every requirement ID.

If the argument is an idea with no document:

- Small (fits in one epic) → go ahead and state your assumptions.
- Large or vague → suggest writing a PRD first with the `dev-docs` plugin,
  and offer a rough first cut at epic level only.

If requirements have no IDs, assign temporary ones (`R-01`, `R-02`) and say
so.

## 2. Ask only what changes the output

One question at a time, and only if the source does not say: sprint length,
team or teams, tracker, estimation scale, whether a velocity range is known.

## 3. Break down

Follow `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/work-hierarchy.md`.

1. **Initiative**: one, unless the source spans several bets.
2. **Epics** by capability or journey stage, not by system layer. Each has
   an outcome, requirement IDs and a T-shirt size.
3. **Stories** as vertical slices, using
   `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/splitting.md`. First
   story in each new epic is a walking skeleton. Every story passes INVEST.
4. **Spikes** wherever a story cannot be estimated; the story depends on it.
5. **Tasks** for technical work with no user-visible result. Sub-tasks only
   if the user asks; teams usually add them at sprint planning.
6. **Acceptance criteria** for every story: happy path, one failure, and
   permissions if roles exist. See
   `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/quality-gates.md`.
7. **Estimates**: story points on stories, T-shirt sizes on epics, time boxes
   on spikes. See
   `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/estimation.md`. These
   are suggestions for the team to re-estimate; say so.
8. **Dependencies**: between stories, and on other teams, vendors or
   decisions.

Avoid the anti-patterns in the work-hierarchy reference: layer stories,
"as a developer" stories, tasks written as stories, epics with no end.

## 4. Check coverage

Every in-scope requirement ID maps to at least one story. List gaps and
anything the source marks out of scope.

## 5. Output

Read `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/breakdown-output.md`
and produce the tree, the table, story details, coverage, dependencies and
totals. Give a forecast range only if the user supplied a velocity range.

If the user asked for an import file:

- **Jira**: follow
  `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/jira-import-csv.md`
  and `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/tool-jira.md`.
  Ask which parent-linking style their Jira uses if unknown; default to the
  Parent Id form and warn that column names depend on their version.
- **Linear or GitHub Projects**: follow
  `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/tool-others.md`. For
  GitHub, write a `gh` CLI script rather than a CSV.

## 6. Report

Write the breakdown (and the CSV or script) to files the user names, or to
`docs/delivery/breakdown-<slug>.md` next to the source. Tell the user:

- counts: epics, stories, tasks, spikes; total points and unestimated items,
- coverage gaps,
- assumptions to confirm,
- that estimates are a starting point for team planning poker.

Do not commit and do not create tickets in any tracker.
