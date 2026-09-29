# Estimation, forecasting, dependencies and roadmaps

This is guidance, not a method to impose. Match what the team already does
unless it is causing harm.

## Story points: relative sizing

A story point is a relative measure of effort, complexity and uncertainty
together, compared with other stories the team has done. It is not hours.

- **Pick a reference story** the whole team knows and call it a 3 (or a 2).
  Size everything else relative to it: "twice as big", "about the same".
- **Use a Fibonacci-like scale**: 1, 2, 3, 5, 8, 13, and sometimes 20, 40,
  100 or `?`. The gaps grow with size because uncertainty grows with size.
  You cannot tell a 9 from a 10, so do not offer the choice.
- **13 or more means split it** for most teams. It will not fit in a sprint
  with confidence.
- **Points belong to one team.** Do not compare points between teams or sum
  them across teams; each team's scale is its own.
- **Do not estimate sub-tasks in points.** Estimate the story; hours on
  sub-tasks are optional.
- **Bugs and spikes**: spikes are time-boxed, not pointed. Bugs are pointed
  or not by team convention; decide once and write it down.

## T-shirt sizes for epics and initiatives

At epic level, precision is false. Use T-shirt sizes with an agreed rough
meaning, for example:

| Size | Rough meaning (agree your own) |
|---|---|
| XS | Under a sprint |
| S | 1 to 2 sprints |
| M | 2 to 4 sprints |
| L | 1 to 2 quarters of one team; consider splitting |
| XL | Bigger than that; must split before committing |

Re-size the epic as stories are written and estimated.

## Planning poker

Based on planning poker (James Grenning, 2002; popularised by Mike Cohn).

1. The product owner reads the story and answers questions.
2. Each estimator privately picks a card.
3. Everyone reveals at once, so nobody anchors on the first number.
4. The highest and lowest explain their reasoning.
5. Discuss briefly, then vote again. Stop after two or three rounds; take the
   larger of two adjacent numbers, or park the story if the spread is still
   wide (it usually needs a spike or a split).

Time-box each story to a few minutes. A long argument means missing
information, not a missing number. A cheat sheet is in
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/estimation-guide.md`.

## #NoEstimates, briefly

The #NoEstimates movement (associated with Woody Zuill and Vasco Duarte)
argues that if stories are split to roughly similar small sizes, counting
them forecasts as well as pointing them, at lower cost. It suits teams with
stable throughput and a habit of small slices. It is not "no planning"; it
replaces estimating each item with counting finished items.

## Velocity and forecasting

- **Velocity** = points completed (meeting the DoD) per sprint. Partly done
  work counts zero.
- Use the **last 3 to 6 sprints**, not one. Note the range, not only the mean.
- **Forecast in ranges with confidence**, never a single date:
  "Remaining backlog is 120 to 150 points. At 25 to 35 points per sprint,
  that is 4 to 6 sprints." A throughput-based Monte Carlo simulation gives
  statements like "85% chance of finishing within 7 sprints".
- **Velocity is a planning tool, not a performance target.** Using it to
  compare or push teams inflates the points and destroys the forecast.
- **Re-forecast** every sprint. Scope grows; show that on a burn-up chart
  (a scope line plus a done line), not a burn-down.
- Do not convert a forecast into a committed date on the user's behalf.
  Present the range and let the owner decide.

## Dependencies

Record dependencies at story and epic level:

| Type | Example | Record as |
|---|---|---|
| Blocks / is blocked by | Story B needs A's API | A tracker link ("blocks") |
| External team | Platform team must provision a queue | A ticket in their backlog, linked |
| External party | Vendor must enable a feature | A task with an owner and a date to chase |
| Decision | Pricing not agreed | A DACI record, linked |

Rules:

- Every blocking dependency has an owner and a date to check.
- Minimise them by splitting: a story blocked by another team can often be
  split so the unblocked part ships now.
- Show cross-team dependencies on the roadmap, not only in tickets.

## Now / Next / Later roadmap

Adapted from the Now/Next/Later format popularised by Janna Bastow (ProdPad).
Three columns replace a date-based Gantt chart:

| Column | Holds | Certainty |
|---|---|---|
| **Now** | Being built this cycle or quarter; epics with stories | High |
| **Next** | Shaped and roughly sized; starting soon | Medium |
| **Later** | Problems and opportunities worth solving; not yet shaped | Low |

Items move left as they become clearer. Each item is an outcome or problem,
not a feature list. Template:
`${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/templates/roadmap-now-next-later.md`.
