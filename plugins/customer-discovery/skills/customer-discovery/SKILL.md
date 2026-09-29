---
name: customer-discovery
description: Use when a founding team needs to find customers, plan or run customer interviews, validate a startup or product idea, or answer "is anyone going to pay for this?". Covers riskiest assumptions, the ideal customer profile (ICP) and early adopters, outreach to the first people to talk to, interview guides and note synthesis, pilot customers, letters of intent, pre-sales, pricing tests, and product-market fit signals. Not for marketing copy, growth at scale, or usability testing of a finished UI.
---

# Customer Discovery

Most early products fail for a boring reason: the team built something nobody
needed badly enough to change their behaviour or pay for. The fix is also
boring. Before building much, go and find the people with the problem, learn
how they deal with it today, and ask for a real commitment before you believe
anything they say.

This skill runs that loop. It draws on Steve Blank's customer development,
Rob Fitzpatrick's *The Mom Test*, Jobs-to-be-Done, and lean experiments. Full
credits are in `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/sources.md`.

## Three rules that override everything else

1. **Opinions are not evidence. Past behaviour and commitments are.** "I would
   use that" is worth nothing. "Last month I spent six hours and 200 dollars
   on this" is worth a lot. "Here is a deposit" is worth the most.
2. **Talk about their life, not your idea.** Pitch at the very end, if at all.
3. **Set the pass threshold before you run the test.** A threshold chosen after
   the result is a story, not a test.

## The loop

```
HYPOTHESES  → write the riskiest assumptions down; rank by importance x evidence
WHO         → ICP, early-adopter segment, anti-ICP, trigger events
OUTREACH    → reach 30-50 people; ask for learning, never a sale
INTERVIEW   → Mom Test rules; the last time it happened; workarounds and spend
SYNTHESIZE  → patterns, quotes, pain frequency x intensity
DECIDE      → persevere, pivot, or kill; write it in the decision log
VALIDATE    → a test that costs the customer time, reputation, or money
REPEAT      → the next riskiest assumption
```

Full description of each stage and its exit criteria:
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/loop.md`.

## Stage gates

Do not skip a gate because the team is excited. Excitement is not evidence.

| Gate | You have passed it when |
|---|---|
| **Problem-solution fit** | One segment describes the same painful problem, unprompted, in most interviews; they already spend time or money on a workaround; and several have made a real commitment (pilot, LOI, deposit) for your proposed solution. |
| **Product-market fit** | Retention flattens instead of falling to zero, users pull the product rather than you pushing it, and the Sean Ellis survey (a heuristic) shows a strong share of "very disappointed" users. See `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/pmf.md`. |

Before problem-solution fit, build as little as possible: a spreadsheet, a
concierge service, a clickable mock. After it, build the smallest thing the
committed customers will actually use.

## Routing

| The team wants to | Command | Read |
|---|---|---|
| Write down what must be true | `/customer-discovery:hypotheses` | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/assumptions.md` |
| Decide who to talk to | `/customer-discovery:icp` | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/icp.md` |
| Find and reach people | `/customer-discovery:find` | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/finding-people.md` |
| Prepare an interview | `/customer-discovery:interview` | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/mom-test.md`, `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/jtbd.md` |
| Judge what an interview meant | `/customer-discovery:synthesize` | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/signals.md` |
| Turn notes into decisions | `/customer-discovery:synthesize` | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/synthesis.md` |
| Test with a real commitment | `/customer-discovery:validate` | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/experiments.md` |
| Know whether it is working | `/customer-discovery:pmf` | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/pmf.md` |
| Stay honest with the people they talk to | any | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/ethics.md` |

## Templates

| Template | File |
|---|---|
| Hypotheses and riskiest-assumptions board | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/hypotheses-board.md` |
| Lean canvas | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/lean-canvas.md` |
| ICP and anti-ICP sheet | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/icp-sheet.md` |
| Outreach messages | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/outreach-messages.md` |
| Problem interview guide | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/problem-interview-guide.md` |
| JTBD switch interview guide | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/jtbd-switch-guide.md` |
| Interview notes sheet | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/interview-notes.md` |
| Interview scorecard | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/interview-scorecard.md` |
| Synthesis board and affinity map | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/synthesis-board.md` |
| Validation experiment card | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/experiment-card.md` |
| Pilot agreement outline | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/pilot-agreement.md` |
| Letter of intent outline | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/letter-of-intent.md` |
| PMF survey | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/pmf-survey.md` |
| Weekly customer-learning review | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/weekly-review.md` |
| Decision log | `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/decision-log.md` |

## How to behave

- **Push back on fake validation.** When the team reports "everyone loved it",
  ask what anyone committed. If nobody gave time, reputation, or money, say
  plainly that the assumption is still untested.
- **Ask for specifics.** Which segment, which person, what date, how much.
  Replace "customers" with a named role at a named kind of company.
- **Keep the team honest about numbers.** Interview counts, survey thresholds,
  and saturation points in this skill are heuristics, not laws. Say so when
  you use them.
- **Write things down.** Every stage ends in a filled template or a line in the
  decision log. A learning that lives only in someone's head is lost by Friday.
- **Stay small.** Suggest the cheapest test that could prove the assumption
  wrong. A landing page before an app; a concierge service before automation.
- **Protect the people you talk to.** Consent to record, private notes, and no
  pretending the product exists when it does not. See the ethics reference.

## When not to use this skill

Skip it for usability testing of a built interface, brand or marketing copy,
paid acquisition at scale, or investor pitch design. Those come after the
problem, the customer, and the willingness to pay are known.
