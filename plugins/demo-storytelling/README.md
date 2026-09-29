# demo-storytelling

A demo fails for three reasons, and only one of them is the software. The
team shows features instead of a story. The team improvises the clicks and
the words, so the best moment gets cut by the timer. And the team walks on
cold, with no warm-up, no tech check, and no plan for the moment the Wi-Fi
drops.

This plugin helps a team prepare and deliver a product demo or pitch:
hackathon finals, investor pitches, customer demos, sprint reviews. The story
comes first, the script is written and timed, and the day-of routine is a
checklist you run.

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

## Commands

| Command | Does |
|---|---|
| `/demo-storytelling:plan` | Brief plus a T-7 to T-0 countdown (or an hours-based plan for a hackathon), with owners, a code freeze, risks and a kit list |
| `/demo-storytelling:story` | Turns the product and its user stories into one narrative: framework, persona, pain, wow, proof, ask |
| `/demo-storytelling:script` | The timed run-of-show with Say and Do columns, a backup per row, a cut line, and cue cards |
| `/demo-storytelling:rehearse` | A rehearsal protocol: five run types, timing, a scored rubric, one change per run |
| `/demo-storytelling:warmup` | The day-of tech check and 15-minute warm-up, run as a live checklist |
| `/demo-storytelling:qa` | Top 10 likely questions with 20-second answers, hard questions, and "is this real?" |
| `/demo-storytelling:retro` | A blameless post-demo retro with actions and follow-ups |

The skill also triggers on its own when someone asks how to present, says
they are nervous about speaking, or mentions a demo, pitch or hackathon
final.

## What's inside

```
skills/demo-storytelling/
  SKILL.md                    router: pipeline, routing table, five rules
  reference/
    prep-plan.md              brief, T-7 to T-0 countdown, hackathon plan, kit
    frameworks.md             nine storytelling frameworks, each with an example
    stories-to-narrative.md   user stories → persona, pain, turn, wow, proof, ask
    demo-design.md            one idea per minute, golden path, setup rules
    time-budgets.md           words per minute; 1-, 3-, 5- and 10-minute shapes
    speaking.md               openers, signposts, pauses, pace, eyes, hands, nerves
    warmup.md                 breathing, body, voice, mind, and the tech warm-up
    rehearsal.md              five run types, timing, feedback
    recovery.md               the recovery ladder for on-stage failures
    hackathon.md              judging criteria → script moments; team roles
    qa.md                     top 10 questions, 20-second answers, hard questions
  templates/
    prep-plan.md  story-canvas.md  pitch-outline.md  run-of-show.md
    judging-map.md  cue-card.md  rehearsal-rubric.md  warmup-checklist.md
    tech-check.md  qa-prep.md  retro.md
```

## What it does not do

It does not build or fix the product being demoed, and it does not decide how
slides look. For appearance, use the `frontend-design` skill or your slides
tool; for charts in a pitch, the `dataviz` skill.

## Notes on the evidence

The warm-up cites research where it exists and says where it doesn't hold
up. Power posing is included as optional: its hormonal claims did not
replicate, though some people find it steadying. The physiological sigh
comes from a 2023 randomised study of cyclic sighing. Reappraising nerves as
excitement comes from Brooks (2014).
