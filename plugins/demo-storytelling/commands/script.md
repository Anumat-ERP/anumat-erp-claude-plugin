---
description: Write the timed run-of-show for a demo or pitch, a table of Time, Step, Who, Say, Do and Backup, sized to the slot and designed around a scripted golden path.
argument-hint: [slot length, e.g. 3 min] [event]
---

Write the run-of-show for: **$ARGUMENTS**

Read:
- `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/time-budgets.md` for the structure and word budget
- `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/demo-design.md` for the golden path and setup
- `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/speaking.md` for the opener, signposts and pauses

Use `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/run-of-show.md`.

If there is no agreed story yet, run `/demo-storytelling:story` first or ask
for the persona, the three ideas, the wow and the ask.

## Steps

**1. Size it.** Take the slot length; script to 90% of it. Pick the 1-, 3-,
5- or 10-minute structure and state the word budget for the Say column.

**2. Walk the product.** If the product is in this repo, read the routes,
screens and seed data to find the exact controls on the golden path. Every Do
cell names a real control, field or tab. If you cannot find one, mark it
`[CHECK]` rather than guessing.

**3. Write Say lines to be spoken.** Short sentences. The persona's name. No
UI narration ("I click…"). Mark `[pause]` after the pain, the wow, the number
and the ask. The first two lines must work without any screen.

**4. Choose talk-while-clicking or click-then-talk** per row, and say which
in the Who column when there is a separate driver.

**5. Backup column.** Every row says what to do if it fails: retry, skip to
row n, or the backup video at a time stamp. Follow the ladder in
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/recovery.md`.

**6. Cut line and checkpoints.** Mark the row to drop if behind, and fill the
timekeeper's checkpoint table.

**7. Setup list.** List what must be true before row 1: seed data, reset
command, pre-filled forms, tabs in order, zoom, accounts, backup video.

**8. Hackathon.** Fill `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/judging-map.md` and make sure every
criterion points to a row. Read `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/hackathon.md`.

**9. Cue cards.** Derive one `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/cue-card.md` per speaker from the
finished script.

## Checks

- Count the Say words and report the total against the budget.
- Exactly one wow row; it sits at about two-thirds of the time.
- The last Say line is the ask.
- Nothing in the Do column requires typing more than a few characters.

## Output

The run-of-show table, the setup list, the cue card(s), and the word count.
Next: `/demo-storytelling:rehearse`.
