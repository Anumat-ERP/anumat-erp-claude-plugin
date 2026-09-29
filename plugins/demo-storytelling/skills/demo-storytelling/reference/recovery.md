# Recovering from failures on stage

Plan as if something will go wrong, because often it does. The audience forgives the
failure; they judge the recovery. A calm switch to the backup reads as
preparation. Visible panic reads as a product that doesn't work.

## The recovery ladder

Go down one rung at a time. Decide the time limits now, not on stage.

| Rung | Trigger | Action | Say |
|---|---|---|---|
| 1. Wait | Page slow, spinner | Keep talking, about the story, not the spinner. Up to 10 seconds | "While that loads, here's why this matters to Mia…" |
| 2. Retry once | Click did nothing, error toast | One refresh or one retry of the same step | "Let's try that once more." |
| 3. Skip ahead | One step broken, the rest fine | Jump to the next scripted step or tab | "I'll skip ahead to the part Mia cares about." |
| 4. Backup video | App down, network down, laptop frozen | Switch to `BACKUP-demo.mp4`, narrate it exactly as the live script | "Let me show you the recording so you see the whole flow." |
| 5. Tell it | Nothing will display | Describe the persona's path with gestures and the one number; go to the ask | "Picture Mia's screen…" |

Never skip rung 4 because of pride. A narrated video of a working product
beats a live product that isn't working.

## Specific failures

**Laptop freezes.** Stop clicking. Say the rung-1 line. If 10 seconds pass,
the second team member moves to the spare laptop or the video on USB while
the speaker keeps talking. Rehearse this handover once.

**Network drops.** Switch to the phone hotspot if the step can wait 15
seconds; otherwise video. This is why you learned which steps need the
network.

**Wrong data on screen** (someone else's test run, yesterday's state). Don't
explain it. Carry on if the story still works; otherwise skip to a tab that is
correct. Reset between every rehearsal and after the last one.

**Projector fails or shows the wrong screen.** Ask the organiser once,
calmly. Meanwhile, tell the story; your hook and pain need no screen.

**You forget your line.** Pause, look at the cue card, take a breath. A
three-second silence looks like a deliberate pause. Pick up at the next
signpost, not where you stopped.

**You run out of time.** Jump straight to the ask. The ask is more valuable
than any remaining step. The script's cut line tells you where; see
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/time-budgets.md`.

**A notification pops up.** Dismiss it, say nothing, carry on. If it was
embarrassing, a light "My phone is excited too" once, then move on.

## What not to say

- "It worked five minutes ago." (Everyone has heard it; it sounds like an
  excuse.)
- "Sorry, sorry…" more than once.
- "Let me just check something" followed by opening a terminal.
- Anything that blames the venue, the Wi-Fi or a teammate.

## After a failure

In Q&A, own it in one line if asked: "The network dropped, so you saw the
recording; the live version is at [link] and you're welcome to try it after."
Then offer a live run at the table. For hackathons, see the "is this real?"
section of `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/hackathon.md`.

Log every failure in the retro, with the fix, using
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/retro.md`.
