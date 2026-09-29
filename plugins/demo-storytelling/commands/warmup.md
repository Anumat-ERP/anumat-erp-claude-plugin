---
description: Run the day-of warm-up as a live checklist, the tech check first and then about 15 minutes of breathing, body, voice and mind exercises before going on stage.
argument-hint: [minutes until the slot]
---

Run the warm-up. Time until the slot: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/warmup.md`. Use
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/tech-check.md` and
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/warmup-checklist.md`.

## Steps

**1. Work out the schedule** from the time given:
- More than 60 minutes: tech check now, then rest, then the personal
  warm-up starting 25 minutes before the slot.
- 30 to 60 minutes: tech check now, personal warm-up straight after.
- Under 30 minutes: the critical tech items only (power, display, Do Not
  Disturb, reset, backup video on the desktop), then a 5-minute warm-up:
  box breathing, shoulder rolls, lip trills, first two lines, one
  physiological sigh.

Print the schedule with clock times if the user gives the current time.

**2. Tech check.** Present the tech-check checklist one section at a time and
wait for the user to confirm each before moving on. Any unchecked item gets a
fix or an explicit "accept the risk".

**3. Personal warm-up.** Present one block at a time (breathing, body, voice,
mind) with the timing, and give the instructions for each exercise in one or
two lines so the user can follow along without reading the reference. Be
honest about power posing: optional, may help people feel steady, the
hormonal claims did not replicate.

**4. Last minute.** Ask for the first two lines of the script and have the
user say them aloud. Remind them of the one delivery goal. End with the
physiological sigh.

If the user says they are nervous, keep it short and practical: reframe as
excitement, the sigh, the first two lines. Pull from
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/speaking.md` (the nerves section) only if they ask for more.

## Output

The schedule, then the checklists presented section by section as a
conversation. Nothing long.
