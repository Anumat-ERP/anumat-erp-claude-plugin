---
description: Build a RACI (or RASCI, RACI-VS, DACI) for a project or process, and check it against the rules.
argument-hint: <project or process> [rasci|raci-vs|daci] — e.g. "monthly release process" or "choose a CRM daci"
---

Build a responsibility matrix for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/raci.md` first.

## 1. Pick the variant

- An ongoing process or project → RACI.
- Support teams keep being mistaken for owners → RASCI.
- A distinct check-and-sign step is required → RACI-VS.
- One decision → DACI, using
  `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/daci-decision.md`.
  Skip to step 5.

If the user named a variant, use it unless it clearly does not fit; then
say why in one sentence.

## 2. List activities

Take them from, in order of preference: an existing SOP's steps, a project
plan or breakdown, a process map, or the user's description. Write each as
verb + object with a clear output. Aim for 10 to 25 rows; group if more.

## 3. List roles

Roles, not people. Include only roles that do, own, are asked or are told.
Put the role → person mapping in its own table.

## 4. Fill the matrix

Read `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/raci-matrix.md`.
Fill A first for every row, then R, then C, then I. Where you cannot tell
who is accountable, do not guess: mark the row `A: TBD` and list it under
open disputes with the options.

## 5. Check

Run the analysis checklist from the reference, both ways:

- **Horizontal (per activity):** exactly one A; at least one R; no row with
  only C and I; three or fewer Cs.
- **Vertical (per role):** every role has a letter; no role holds most of
  the As; Rs are realistic; only-I roles move to a communication plan.

Also list any smells from the reference's table that apply.

## 6. Report

Write the file. Then show the user:

- the matrix,
- a findings list: each failed check, the row or column, and a suggested fix,
- the open disputes and who should decide each,
- a suggestion to review it in a short workshop with one person per role,
  following the workshop steps in the reference.

Do not commit.
