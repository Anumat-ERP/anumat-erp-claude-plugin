# Riskiest assumptions

Every plan rests on guesses. The skill is to find the guess that would sink the
plan if wrong, and test it before building on top of it.

## Write the plan on one page: the lean canvas

Ash Maurya adapted the business model canvas for early-stage teams into the
lean canvas. Nine boxes, filled in rough, in this order:

1. **Customer segments**, and the early adopters within them.
2. **Problem**: the top one to three problems, plus existing alternatives.
3. **Unique value proposition**: one clear sentence on why you are different.
4. **Solution**: the smallest feature set for each problem.
5. **Channels**: how you reach customers.
6. **Revenue streams**: price and model.
7. **Cost structure**: what it costs to run and to acquire a customer.
8. **Key metrics**: the few numbers that say whether it is working.
9. **Unfair advantage**: something that cannot be easily copied or bought.
   Leaving it blank is honest and common.

Every box is a hypothesis. Template:
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/lean-canvas.md`.

## Turn boxes into testable statements

A useful hypothesis names who, what, and a number:

- Weak: "Small shops struggle with inventory."
- Testable: "Owners of single-location hardware shops with 500+ SKUs lose at
  least 2 hours a week reconciling stock, and at least 3 in 10 already pay for
  a workaround."

Group hypotheses into four kinds so none is forgotten:

| Kind | The question |
|---|---|
| Problem | Is this painful, frequent, and already costing them something? |
| Customer | Who exactly has it, and can we find them? |
| Solution / value | Does our approach remove the pain better than their workaround? |
| Business | Will they pay enough, and can we reach them at a cost that works? |

## The assumption map

Plot each hypothesis on two axes (a practice popularised by David Bland and
Alex Osterwalder's *Testing Business Ideas*):

- **Importance**: if this is wrong, does the plan die?
- **Evidence**: how much real, observed evidence do we have today?

```
             high importance
                   |
   test these      |   TEST FIRST
   next            |   (important, no evidence)
  -----------------+------------------
   ignore for now  |   watch; confirm
                   |   cheaply
             low importance
  have evidence <--+--> no evidence
```

The top-right quadrant holds the riskiest assumptions. Pick the single riskiest
one to test this week.

## The riskiest-assumption test

Instead of building a minimum viable product, ask: what is the smallest,
fastest thing that could prove the riskiest assumption wrong? That is the
riskiest-assumption test. It is often not a product at all:

| Assumption | Cheapest test that could kill it |
|---|---|
| The problem is painful | 8-10 problem interviews asking about the last occurrence |
| They will pay | Ask for a deposit or a paid pilot; count yes answers with money |
| We can reach them | Send 50 outreach messages; measure reply and booking rate |
| Our solution works | Deliver it by hand (concierge) to 3 customers |

For each test write, before running it: the hypothesis, the method, the metric,
the pass threshold, and the date you will decide. Use
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/experiment-card.md`
and track the board in
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/hypotheses-board.md`.

## Traps

- **Testing the comfortable assumption.** Teams test what they expect to pass.
  The board exists to force the uncomfortable one to the top.
- **Assumptions with no number.** Without a number, any result counts as a pass.
- **Treating the canvas as finished.** Update it every week; date each version.
