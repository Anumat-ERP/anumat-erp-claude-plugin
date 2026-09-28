---
description: Print the curated design source stack, split by what Claude can fetch and what only a human can browse.
---

Read `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/sources.md` and present it to the user.

Keep the **agent-fetchable / human-only** split explicit and prominent. That
division is the point of the file: one half Claude can read on request, the
other half it cannot open at all.

Lead with the note that the project's own Storybook, component library, or
token file — if it has one — outranks everything on the list. Check for one and
say what you found.

Present the fetchable half grouped by category, with a line on what each source
is good for, and offer to fetch any of them.

Present the human-only half separately, under a heading that says plainly that
Claude cannot open them. For these, offer only to explain what each is good for
and to work from screenshots the user pastes. **Do not offer to fetch them, and
never summarise one as though you had read it.**

If the user asked about a specific design question rather than for the whole
list, narrow to the relevant sources rather than printing everything.
