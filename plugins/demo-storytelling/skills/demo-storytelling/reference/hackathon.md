# Hackathon specifics

Hackathon judges score a rubric, often in the few minutes you are on stage,
often after watching twenty other teams. Make every criterion easy to tick by
putting a visible moment for it in the script.

Read the event's actual rubric first. The criteria below are the common ones;
names and weights vary. Fill in
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/judging-map.md`.

## Mapping criteria to script moments

| Criterion | What judges look for | Where it goes in the script | What to say or show |
|---|---|---|---|
| **Innovation / originality** | Something they haven't seen twenty times today | The wow moment | Name what's new in one line: "Nobody else does X; we do it with Y" |
| **Technical difficulty** | Real engineering, not a wrapper | A short "under the hood" beat after the wow, 10 to 15 seconds | One diagram or one sentence: the hard part and how you solved it. Save the rest for Q&A |
| **Impact / usefulness** | A real problem, real users, scale | The hook and the proof | The persona's pain with stakes; one number; who else has this problem |
| **Design / UX** | Easy to use, coherent flow | The golden path itself | Let the persona finish a task in few steps; point out one decision you made for the user |
| **Completeness / execution** | It works end to end | The full golden path, live, no slides for the core flow | Run it start to finish; name what's real and what's stubbed if asked |
| **Presentation** | Clear, on time, compelling | The whole run | Hook, signposts, one ask, finish under time |
| **Theme / sponsor fit** (if any) | Uses the track or sponsor tech | One explicit line | "Built on [sponsor API], which lets us…" |

If a criterion has no moment in your script, you are leaving points on the
table. If one moment covers three criteria, that is the moment to rehearse
most.

## Team roles

Assign roles before the first rehearsal and keep them.

| Role | Does | Doesn't |
|---|---|---|
| **Speaker** | Owns the room: hook, story, ask. Faces the audience | Touch the laptop |
| **Driver** | Clicks exactly the Do column, on cue. Owns the reset and the backup switch | Talk, except to hand over on a scripted line |
| **Timekeeper** | Sits in the front row. Holds up cards at fixed checkpoints ("1:00", "0:30", "CUT") | Signal anything else |
| **Q&A lead** (often the speaker) | Takes each question first, routes it to the right person | Answer everything alone |

Two people: speaker plus driver; the driver also watches a phone timer. Solo:
you do all of it, so script click-then-talk and use a timer visible on the
laptop.

Everyone on the team should appear on stage or be named. Judges often score
"team" informally.

## The Q&A split

Decide who answers what before you go on, so there is no pause while the
team looks at each other.

| Topic | Owner |
|---|---|
| Problem, users, market, business model | Speaker |
| Architecture, stack, AI and data, scaling | Technical lead |
| Design and UX decisions | Designer or driver |
| What's next, roadmap | Speaker |

The Q&A lead repeats the question briefly, names the owner ("Sam built that
part"), and the owner answers in 20 seconds. One voice per answer; others
add only if something important was missed. Prepare with
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/qa.md`.

## "Is this real?"

Judges ask this, or its cousins: "Is that hard-coded?", "Is the AI actually
running?", "Did you build this in the hackathon?"

- **Be exact about what's real.** "Everything you saw is live, except the
  supplier emails, which are simulated because we don't have supplier
  accounts." Honesty scores; a caught exaggeration costs every other point.
- **Offer proof.** "You can try it on your phone right now: the link is on
  the last slide." Or: "Give us an input and we'll run it now."
- **Know the rules.** If pre-existing code is allowed, say what you brought in
  and what you built this weekend.
- **Seeded data is fine; say so.** "The data is seeded so the demo is
  repeatable. The logic running on it is live."
- **Prepare the sentence in advance** and put it on the Q&A prep sheet.

## Hackathon timeline adjustments

A hackathon compresses the T-7 countdown into hours. Use the compressed plan
in `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/prep-plan.md`:
freeze the golden path early, and stop feature work several hours before the
final.
