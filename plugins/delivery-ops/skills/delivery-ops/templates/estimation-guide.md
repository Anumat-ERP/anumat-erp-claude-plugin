<!--
Template: Estimation guide and planning-poker cheat sheet
Basis: relative sizing with a Fibonacci-like scale; planning poker (James
Grenning, 2002; popularised by Mike Cohn). Background in
${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/estimation.md.
Use when: teaching a team how it estimates, or restarting after estimates
drifted.
Rules: points are relative and belong to one team; forecast in ranges;
never use velocity as a performance target.
Remove this comment in the finished document.
-->

# How <Team> estimates

| Field | Value |
|---|---|
| Team | <team> |
| Scale | <1, 2, 3, 5, 8, 13, ?> |
| Split threshold | <13: must split before a sprint> |
| Agreed on | <YYYY-MM-DD> |

## What a point means here

Points measure effort, complexity and uncertainty together, relative to our
reference stories. They are not hours.

## Reference stories

| Points | Reference story | Why this size |
|---|---|---|
| 1 | <PROJ-88: change a label and its translation> | <tiny, well known> |
| 3 | <PROJ-102: add a filter to an existing list> | <known pattern, one screen, some tests> |
| 5 | <PROJ-117: new form with validation and API call> | <several parts, some unknowns> |
| 8 | <PROJ-131: new report with export> | <many parts or real uncertainty> |
| 13 | <Split it.> | <too uncertain to commit> |

## Planning poker

1. Product owner reads the story; team asks questions (2 min).
2. Everyone picks a card privately.
3. Reveal together.
4. Highest and lowest explain.
5. Re-vote once. If the spread is still wide, park it: it needs a spike or a split.
6. Agree the number. If between two adjacent cards, take the higher.

Cards: `1 2 3 5 8 13 ?` — `?` means "I do not understand the story".
Coffee card means "we need a break".

## What we do not point

- <Spikes: time-boxed instead.>
- <Sub-tasks: optional hours.>
- <Bugs: <pointed / not pointed>. Decide once.>

## Epics

T-shirt sizes: XS (< 1 sprint), S (1–2), M (2–4), L (1–2 quarters), XL
(must split). Re-size as stories are estimated.

## Forecasting

- Velocity range from the last <3–6> sprints: <low> to <high>.
- Forecast = remaining points ÷ velocity range → a range of sprints.
- Say it as "<N> to <M> sprints", never a single date.
- Re-forecast every sprint; show scope changes on a burn-up.
