# Synthesis: from notes to decisions

Interviews are raw material. Synthesis turns them into a short list of
problems you believe, the evidence for each, and a decision.

Do it weekly, as a team, within a few days of the interviews. Board:
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/synthesis-board.md`.

## 1. Pull out observations

From each notes sheet, write one observation per card (or row): a fact, a
quote, a workaround, a cost, a trigger event. Tag each with the interview ID
and segment. Keep facts and interpretations on separate cards.

## 2. Affinity mapping

Group cards that describe the same thing, bottom-up. Do not start with
categories; let them emerge. Name each group with a sentence in the customer's
terms ("I never know what's in the back room"), not yours ("inventory
visibility"). Then count how many distinct interviews each group draws from.
A group backed by one talkative person is one data point.

## 3. Pain frequency x intensity

Place each problem group on two axes:

- **Frequency**: how often it happens for a typical person in the segment.
- **Intensity**: how much it costs when it does (money, hours, risk, stress),
  judged by evidence such as workarounds and spend.

```
            high intensity
                  |
   occasional     |   FOCUS HERE
   but severe     |   frequent and painful
  ----------------+-----------------
   ignore         |   frequent annoyance;
                  |   hard to charge for
            low intensity
  rare <----------+----------> frequent
```

Frequent and intense problems with existing spend are the ones people pay to
fix.

## 4. Quote bank

Keep exact quotes, tagged with interview ID, segment, and problem group. Quotes
keep the team honest when memory drifts, and later become the customer's own
words for your positioning. Never attribute a quote publicly without consent.

## 5. Persona, only from evidence

If you write a persona, every line must point to interviews. "Mid-size clinic
manager, 35-50" with no source is fiction. A useful persona says: the job, the
trigger events, the workaround, the spend, the objections, and the quotes that
support each. Mark anything unsupported as an assumption.

## 6. Check against the hypotheses

For each hypothesis on the board, write: supported, contradicted, or still
unknown, with the evidence count. Update the assumption map in
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/hypotheses-board.md`.

## 7. Decide, and log it

Every synthesis ends with a decision: persevere, pivot (name the single element
changing), or kill; plus the next riskiest assumption and the next test. Log
it in `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/decision-log.md`.

The log is a list of dated entries: the decision, the evidence, who decided,
what would change our mind. It stops a team from re-arguing old decisions from
memory and shows investors and new hires how you got here.

## Bias checks

- **Confirmation bias:** are you counting the quotes that agree and forgetting
  the ones that do not? Count both.
- **Loudest voice:** one articulate interviewee can dominate the board.
  Count interviews, not cards.
- **Sampling:** did everyone come through one channel or one friend?
- **Pitch contamination:** discount interviews where you pitched early.
