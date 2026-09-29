---
name: demo-storytelling
description: Use when a team is preparing or delivering a product demo, pitch, or presentation — hackathon finals, investor pitches, customer demos, sprint reviews, demo days. Triggers on "demo", "pitch", "presentation", "hackathon final", "how do I present", "write the demo script", "judges", "run of show", "rehearse", "nervous about speaking", "stage fright", "what if the demo breaks", "Q&A prep". Covers turning user stories into a narrative, storytelling frameworks, a T-7 to T-0 prep countdown, the timed script, how to speak, a pre-demo warm-up and tech check, Q&A, recovering from failures, judging criteria, and the retro. Not for building the product itself or designing slides visually.
---

# Demo Storytelling

A demo fails for three reasons, and only one of them is the software. The
team shows **features instead of a story**, so the audience has nothing to
follow. The team **improvises the clicks and the words**, so the three minutes
become five and the best moment gets cut by the timer. And the team **walks on
cold**: no warm-up, no tech check, no plan for the moment the Wi-Fi drops.

This skill fixes all three. The story comes first, the script is written and
timed, and the day-of routine is a checklist you run, not advice you remember.

## What this skill does not do

| Not this | Whose job |
|---|---|
| Building or fixing the product being demoed | the project's own code and skills |
| Slide appearance, palette, typefaces | the `frontend-design` skill, or a slides tool |
| Charts shown in the pitch | the `dataviz` skill |

This skill decides **what is said, shown, and in what order**, and how the
team prepares and delivers it.

## The pipeline

```
PLAN      → the event, the audience, the time limit, the countdown T-7 → T-0
STORY     → one persona, one job, one pain, one turn, one proof, one ask
SCRIPT    → timed run-of-show: Time | Step | Who | Say | Do | Backup
DEMO      → design the golden path: seeded data, reset, scripted clicks
REHEARSE  → timed runs, recorded, scored against the rubric
WARM UP   → 15 minutes: breath, body, voice, mind, then the tech check
DELIVER   → speak it: opener, signposts, pauses, end on the ask
Q&A       → answer → evidence → bridge back, in 20 seconds
RETRO     → what worked, what broke, what changes next time
```

Each stage has a command and a reference file. Run them in order for a first
demo; jump to the stage you need when the team is further along.

| Stage | Command | Read |
|---|---|---|
| PLAN | `/demo-storytelling:plan` | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/prep-plan.md` |
| STORY | `/demo-storytelling:story` | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/frameworks.md`, `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/stories-to-narrative.md` |
| SCRIPT | `/demo-storytelling:script` | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/time-budgets.md` |
| DEMO | `/demo-storytelling:script` | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/demo-design.md` |
| REHEARSE | `/demo-storytelling:rehearse` | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/rehearsal.md` |
| WARM UP | `/demo-storytelling:warmup` | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/warmup.md` |
| DELIVER | — | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/speaking.md`, `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/recovery.md` |
| Q&A | `/demo-storytelling:qa` | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/qa.md` |
| RETRO | `/demo-storytelling:retro` | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/retro.md` |

For a hackathon, also read
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/hackathon.md` before
SCRIPT: the judging criteria decide what the script must show.

## Route by what the user says

| The user says | Go to |
|---|---|
| "We present on Friday, where do we start?" | PLAN |
| "What's our story?" / "How do we explain this?" | STORY |
| "Write the demo script" / "We have 3 minutes" | SCRIPT |
| "What should we show?" / "Too many features" | DEMO |
| "Can you watch our run-through?" | REHEARSE |
| "I'm nervous" / "My voice shakes" / "I talk too fast" | WARM UP, then `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/speaking.md` |
| "What if the laptop freezes?" | `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/recovery.md` |
| "What will the judges ask?" | Q&A |
| "How did it go?" / "What do we fix?" | RETRO |

## Five rules that hold at every stage

1. **One persona, one job, one story.** A demo about everyone is about no one.
   Name the user. Use the name every time.
2. **One idea per minute.** A 3-minute demo carries three ideas. Everything
   else is cut, however good it is.
3. **Nothing is improvised.** Every click is scripted, every form is
   pre-filled, every tab is already open in order, and the data resets with
   one action.
4. **There is always a backup.** A recorded video of the golden path, on a USB
   stick and in the cloud. Switching to it is a scripted step, not a failure.
5. **End on the ask.** The last sentence says what you want from the room.
   "Thank you" comes after it, not instead of it.

## Output rules

- Scripts are tables, using
  `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/run-of-show.md`.
  Every row has a time stamp, a Say line in quotes, and a Do line that names
  the exact control clicked.
- Say lines are written to be spoken: short sentences, the persona's name, no
  jargon the audience has not heard yet. Read each line aloud before keeping it.
- Word count is checked against time. At 130 to 150 words per minute, a
  3-minute demo holds about 300 spoken words once clicks and pauses take their
  share, not 450.
- Keep product specifics in the user's project. Nothing in this plugin assumes
  a particular product.

## Templates

| Template | Used by |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/prep-plan.md` | PLAN |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/story-canvas.md` | STORY |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/pitch-outline.md` | STORY, for a pitch with slides |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/run-of-show.md` | SCRIPT |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/judging-map.md` | SCRIPT, for a hackathon |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/cue-card.md` | SCRIPT, then DELIVER |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/rehearsal-rubric.md` | REHEARSE |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/warmup-checklist.md` | WARM UP |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/tech-check.md` | WARM UP |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/qa-prep.md` | Q&A |
| `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/retro.md` | RETRO |
