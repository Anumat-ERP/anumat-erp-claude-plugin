---
description: Write or update a standard operating procedure (SOP), with a process map and a register entry.
argument-hint: <process> — e.g. "approve customer refunds" or "update SOP-004 for the new billing system"
---

Write or update an SOP for: **$ARGUMENTS**

## 1. Check it should be an SOP

Use the decision table in
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/sops.md`.

- One role, one task, no decisions → a work instruction
  (`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/work-instruction.md`).
- A trained person who needs a memory aid → a checklist
  (`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/checklist.md`).
- Operating a system during an incident or maintenance → a runbook, which
  belongs to the `dev-docs` plugin. Say so and stop.
- Rules without steps → a policy. Offer to write the SOP that carries it out.

Tell the user which document you chose and why, in one sentence.

## 2. Look for an existing one

Search the repo or the folder the user names for an SOP register, `SOP-`
IDs, or a document with the same process. If one exists, update it: raise
the version, add a revision-history row, and keep its ID.

## 3. Gather

Read what exists first: current documents, tickets, chat exports, tool
screens the user shares. Then ask only what you cannot find, one question at
a time:

- What starts the process, and what is the end state?
- Which roles take part? Who owns the process (the accountable role)?
- Where are the decisions, and what are the criteria?
- What records does it produce, and how long are they kept?

Anything else: fill in and mark as an assumption.

## 4. Fill

Read `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sop.md` now. Do not
work from memory of it.

- Follow the writing rules in
  `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/sops.md`: numbered
  imperative steps, one action per step, roles not names, decisions as
  explicit branches, warnings before the step.
- If there are three or more roles or any decision, draw the map from
  `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/process-map.md`
  using `${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/process-maps.md`.
- Move click-level detail into a linked work instruction.
- Status `Draft`, version `0.1` (or the next version), today's date.
- Do not invent approval limits, response times or retention periods. Use
  `TBD — <role>`.

## 5. Check

- [ ] One procedure; the title is verb + object.
- [ ] Every step has a role and an output.
- [ ] Every decision has both branches.
- [ ] Every role in the steps appears in the roles section and the map.
- [ ] Records section lists what is kept, where and for how long.
- [ ] Next review date is set.

## 6. Register and train

Offer to add or update the row in the SOP register
(`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/sop-register.md`) and
to start a training log
(`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/training-log.md`).

## 7. Report

Write the file. Tell the user the path, every `TBD` and assumption, and the
approval and training steps still needed before the effective date. Do not
commit.
