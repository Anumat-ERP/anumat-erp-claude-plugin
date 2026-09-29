---
description: Run a structured demo rehearsal with timing, recording, a scored feedback rubric and one change per run, from table read to dress rehearsal.
argument-hint: [run type: table-read | click-through | full | disaster | dress]
---

Run a rehearsal: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/rehearsal.md` and score with
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/rehearsal-rubric.md`.

## Steps

**1. Which run.** If the argument names a run type, use it. Otherwise ask how
many runs the team has done and pick the next one in the protocol order.

**2. Brief the team** on this run's purpose in one line, and what to record:
stopwatch time, checkpoint times, a phone recording from the judges' seats.

**3. During the run** (if the user is reporting live or pastes a transcript):
- For a transcript: count words, estimate words per minute, count filler
  words, and mark where `[pause]` lines were skipped.
- For a timed report: compare checkpoint times against the script.

**4. Score** every rubric row the run type covers. A table read skips the demo
and delivery sections; a click-through skips story and delivery.

**5. Feedback.** Exactly one thing that worked and one thing to change. Pick
the change with the most effect on the outcome, not the easiest one.

**6. Time decision.** If this is the third full run over 90% of the slot,
recommend a specific row to cut from the script. Don't recommend talking
faster.

**7. Disaster run.** Name the failure to inject (Wi-Fi off, tab closed,
wrong data) and check the team follows
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/recovery.md`.

**8. Q&A drill** after the dress rehearsal: five questions from
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/qa-prep.md`, each answer timed to 20 seconds.

## Output

The filled rubric, the one change, and the next run to do. After the dress
rehearsal, point to `/demo-storytelling:warmup` for the day.
