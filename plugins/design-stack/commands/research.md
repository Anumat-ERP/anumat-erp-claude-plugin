---
description: Load the canonical structure and design-system conventions for a given screen type.
argument-hint: <screen type, e.g. settings, data table, onboarding>
---

Research the canonical structure for: **$ARGUMENTS**

This command is **read-only**. It proposes; it does not build. Do not write or
edit application code.

## Steps

**1. Check the project first.** Follow `systems/STORYBOOKS.md` Part 1: look for
`.storybook/`, `*.stories.*`, a component package, or a token file. If the
project has its own inventory, report what already exists and can be reused —
this outranks every external reference below.

**2. Map the request to a playbook.** Use the routing table in
`skills/design-evidence/SKILL.md`.

If nothing matches, do not invent. Follow the skill's three-step fallback: say
plainly that no playbook covers this, name the nearest structural analogue and
why, and use that — flagging the places it does not fit. A stated gap is
useful; a silent one is the failure this plugin exists to prevent.

**3. Read the playbook.** All six sections.

**4. Pick a design system** from `systems/CHOOSING.md`, with one sentence of
justification. If the project already has one, use it and say so.

## Report

**Canonical structure** — the section order from the playbook, with the reason
it holds. Adapt it to this project's specifics and say where you adapted it.

**Variant** — which one applies here, and the condition that selected it.

**Design system** — which, and why in one sentence.

**Existing components** — what the project already has that this screen should
use, and any gap that would need filling. Name the gap explicitly; adding to a
design system is a decision, not a detail.

**The six states** — all six from the playbook, concrete for this screen. Not
the generic definitions: what *this* screen shows when it is empty, loading,
failing, restricted, overflowing, and offline.

**Known failure modes** — the playbook's common-failures list, narrowed to the
ones that plausibly apply here.

**Reference products** — the playbook's study targets. Say plainly that these
are for the user to browse; do not imply you have looked at them. If current
screenshots would help, ask the user to browse Mobbin or Refero and paste some
— see `reference/sources.md`.

## Then stop

Ask whether to proceed to a brief (`/design-stack:brief`) or straight to
building. Do not start building on your own.
