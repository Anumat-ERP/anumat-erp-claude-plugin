# customer-discovery

Most early products fail because the team built something nobody needed badly
enough to change their behaviour or pay for. This plugin helps a founding team
find that out cheaply, before building much: find the people with the problem,
talk to them honestly, test the riskiest assumptions with real commitments, and
turn what they learn into decisions.

It is the customer-development loop (Steve Blank's customer discovery and
customer validation), run with honest interviews (Rob Fitzpatrick's *The Mom
Test*), Jobs-to-be-Done switch interviews, and lightweight experiments. The
frameworks are summarised in our own words, with full credits in the skill's
sources reference.

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

Two stage gates: **problem-solution fit** (one segment, a painful problem,
existing spend on workarounds, real commitments) and then **product-market
fit** (retention flattens, organic pull, a strong "very disappointed" share).

## Three rules

1. Opinions are not evidence. Past behaviour and commitments are.
2. Talk about their life, not your idea.
3. Set the pass threshold before you run the test.

## What ships

**1 skill, 12 reference files, 15 templates, 7 commands.**

- Reference: the loop and gates, riskiest assumptions and the lean canvas, ICP
  and early adopters, finding people, interview craft, JTBD switch interviews,
  signals, validation experiments and pricing, synthesis, PMF (with B2B
  specifics), ethics, and sources.
- Templates: hypotheses board, lean canvas, ICP sheet, outreach messages,
  problem interview guide, JTBD switch guide, interview notes, interview
  scorecard, synthesis board, experiment card, pilot agreement outline, letter
  of intent outline, PMF survey, weekly review, decision log.

## Commands

| Command | Does |
|---|---|
| `/customer-discovery:hypotheses <idea>` | Lean canvas, testable hypotheses, the assumption map, and the cheapest test for the top three. |
| `/customer-discovery:icp <product>` | Candidate segments scored, the first segment, ICP sheet, trigger events, early-adopter profile, and anti-ICP. |
| `/customer-discovery:find <segment>` | A plan to reach the first 30-50 people: warm intro ladder, communities, local routes, honest messages, tracking. |
| `/customer-discovery:interview <segment> [problem\|switch]` | A problem or JTBD switch interview guide with the questions to avoid. |
| `/customer-discovery:synthesize <notes>` | Scorecards, affinity groups, pain ranking, quote bank, signals, and a persevere, pivot, or kill recommendation. |
| `/customer-discovery:validate <assumption>` | An experiment card with a pass threshold set in advance, plus pilot or LOI outlines where needed. |
| `/customer-discovery:pmf <product>` | The Sean Ellis survey, retention, organic pull, sales-cycle and B2B pilot conversion signals, and a verdict. |

## On numbers

The numbers in this plugin (about 5-10 interviews per segment before patterns
repeat, the 40% "very disappointed" line, example pass thresholds) are
heuristics from practice. The skill says so when it uses them, and asks the
team to set thresholds from what their own business needs.

## On ethics

Be honest about your stage, use no fake scarcity, ask consent before
recording, and keep interview notes private. The skill treats these as rules,
not suggestions.
