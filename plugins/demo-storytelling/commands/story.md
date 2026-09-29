---
description: Turn a product and its user stories into one demo narrative by choosing a storytelling framework, a persona, the pain, the wow moment, the proof and the ask.
argument-hint: [product, audience, or path to user stories]
---

Build the demo story for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/stories-to-narrative.md` and
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/frameworks.md`. Fill in
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/story-canvas.md`.

This command produces a story, not a script. No time stamps and no clicks yet.

## Steps

**1. Gather the raw material.** Read what exists: user stories, the README,
product docs, a backlog, recent demo notes. List the roles and jobs you found.
If there are no written stories, draft three from the product and ask the user
to confirm.

**2. Audience.** Who is in the room and what they decide. Ask if unknown; it
changes the framework.

**3. Framework.** Pick one from the choosing table in the frameworks file and
give one sentence of why. For a pitch with slides, also fill
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/pitch-outline.md`.

**4. Persona and job.** One named persona, one job-to-be-done. List every other
story in the cut list with a reason.

**5. Pain, stakes, turn.** Write the pain as a specific moment. Give one
number for the stakes if the project has one; if not, flag it as missing
rather than inventing it.

**6. Three ideas and the wow.** Name the three ideas the demo will show, one
per minute of a 3-minute slot, and which one is the wow.

**7. Proof and ask.** Proof must be something true today. The ask must be
something this room can do.

**8. One-sentence pitch.** The formula version, then the one-breath spoken
version.

## Checks before handing back

Run the checks at the end of the stories-to-narrative reference. Report any
that fail.

## Output

The filled story canvas. Ask the user to confirm the persona, the wow and the
ask before scripting. Next: `/demo-storytelling:script`.
