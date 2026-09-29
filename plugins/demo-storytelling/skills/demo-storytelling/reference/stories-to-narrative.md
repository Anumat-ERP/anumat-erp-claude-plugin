# From user stories to a narrative

A backlog of user stories is not a story. "As a manager I want to export a
report" has a character and a want, but no pain, no stakes, and no ending.
This file turns the backlog into one narrative a room can follow.

Fill in `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/story-canvas.md`
as you go.

## The six steps

### 1. Pick one persona

Read every user story and list the roles. Pick the **one** whose pain is
easiest for this audience to feel and whose path touches the most valuable
part of the product.

- Give them a first name and one line of context: "Mia, runs a 12-seat café".
- If the product has several roles, they appear only as people the persona
  meets in their day. The story stays theirs.
- For a hackathon, pick the persona the judges are most likely to be, or
  most likely to know.

### 2. Pick one job-to-be-done

From that persona's stories, pick the single job that matters most. Write it
as a JTBD statement: *When* [situation], *I want to* [motivation], *so I can*
[outcome].

"When stock is running low, I want to reorder without counting, so I can serve
customers instead of doing admin."

Every other story is cut from the demo. List them in the "cut" column of the
canvas so the team can see the decision was made on purpose.

### 3. Build tension from the pain

The audience only cares about the solution as much as they felt the problem.

- Show the pain as a **specific moment**, not a category. "Friday, 7 a.m.,
  she's out of oat milk" beats "inventory management is hard".
- State the **stakes**: what it costs in time, money, customers, or stress.
  One number if you have it.
- Use "it shouldn't be this way": the moment the audience agrees the status
  quo is wrong.
- Keep it short: 15 to 20% of the time budget. Tension that drags becomes
  complaining.

### 4. Run the happy path live

The **turn** is the moment the persona meets the product. From here, the demo
*is* the story.

- Follow one path through the product, start to end, at the persona's pace.
- Narrate intent, not interface: "Mia wants to know what's running out", not
  "I click the Inventory tab".
- Each step answers the pain from step 3 directly. If a step doesn't, cut it.

### 5. Land one "wow" moment

One moment where the audience reacts: something they did not expect was
possible, or a hard thing becomes instant.

- Put it at about two-thirds of the time, after context is set and before the
  ask.
- Set it up: say what is about to happen. Then do it. Then **pause** and let
  the screen speak for two seconds.
- It must be the product's core value. A clever animation is not a wow; the
  problem disappearing is.

### 6. Show the proof, then ask

- **Proof**: why the audience should believe it works beyond this demo. Pilot
  results, a user quote, a number, a technical fact that makes it real.
  See the data storytelling section of
  `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/frameworks.md`.
- **Ask**: the specific thing you want. Close the loop to the persona: "Mia
  gets her Friday mornings back. We want…"

## Checks before moving on

- Can someone who watched it retell the story in one sentence, with the
  persona's name?
- Is the pain a moment, not a category?
- Does every demo step answer the pain?
- Is there exactly one wow moment?
- Does the proof survive a sceptical question?
- Is the ask something the room can actually do?

If any answer is no, fix the canvas before writing the script.
