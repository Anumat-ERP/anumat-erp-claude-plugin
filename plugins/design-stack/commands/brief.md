---
description: Run strategy and UX architecture for a screen or feature before any UI is built.
argument-hint: [screen or feature to brief]
---

Produce a written design brief for: **$ARGUMENTS**

This command does **not** write code. Its output is a brief the user approves
before anything is built. If you find yourself opening a component file, stop.

Read `skills/design-evidence/SKILL.md` to find the matching playbook, and
`skills/design-stack/reference/` as each section needs it.

Ask the user only what you genuinely cannot determine from the codebase or the
request — one question at a time, and only where different answers would change
the design. Everything else, propose and let them correct.

## Produce these sections, in order

**1. Problem.** What is broken or missing today, in one paragraph. Not the
feature — the problem the feature is a response to.

**2. User and context.** Who does this, how often, with what expertise, on what
device, under what pressure. An expert in a tool all day and a novice twice a
year need different designs, and this section is where that gets decided.

**3. Out of scope.** Explicit. This section is the one people skip and the one
that prevents the most rework — an unstated boundary gets crossed.

**4. Success measure.** What observable change means this worked. Not "users
like it" — something you could check.

**5. Inventory.** What the project already has. Check for `.storybook/`,
`*.stories.*`, a component directory, and a token file, following
`systems/STORYBOOKS.md` Part 1. List the components that already exist and can
be reused, and name any gap that would have to be filled. The house system
outranks anything imported.

**6. Design system.** Which one, from `systems/CHOOSING.md`, and one sentence
of why. If the project already has its own, say so and use it.

**7. Information architecture.** What is on this screen, grouped, in order.
Cite the playbook you took the canonical structure from, and flag anywhere you
deviated from it and why.

**8. Task flow.** The main path, step by step — and the error path beside it.
Both, always. A flow with only the success path is half a flow.

**9. The six-state matrix.** The table from `patterns/states.md`, filled in for
this screen. Every row answered. "Not applicable" needs a stated reason.

**10. Open questions.** What is still undecided and who decides it.

## Then stop

End by asking the user to confirm the brief before any building begins. Say
plainly that nothing has been built yet.
