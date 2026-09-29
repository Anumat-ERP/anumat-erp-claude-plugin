# Product-market fit signals

Product-market fit is when a well-defined market pulls the product out of your
hands. No single number proves it. Look for several signals agreeing.

## The Sean Ellis survey

Ask active users (people who used the product recently, typically at least
twice): "How would you feel if you could no longer use this product?"
Answers: very disappointed, somewhat disappointed, not disappointed, no longer
use it.

Sean Ellis observed that products reaching strong growth often had **around
40% or more** answering "very disappointed". Treat 40% as a **heuristic**, not a
law: small samples swing wildly, and the number depends on who you ask. Aim for
at least 30-40 responses from active users in one segment before reading much
into it.

Rahul Vohra's approach at Superhuman adds follow-up questions to turn the
survey into a roadmap: who benefits most, what is the main benefit, and how
could it be improved. Focus on the users who answer "very disappointed" and on
the "somewhat disappointed" users whose main benefit matches theirs.

Survey: `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/pmf-survey.md`.

## Retention curves

Plot, for each monthly cohort, the share still active in week (or month) 1, 2,
3, and on. The shape matters more than the starting point:

- **Falling to zero:** no fit yet; people try it and leave.
- **Flattening:** a stable core keeps using it. That core is your real segment.
  Study them.
- **Newer cohorts flatter than older ones:** you are getting closer.

Define "active" by the action that delivers the value, not by logins.

## Organic pull

- users arrive through word of mouth or search without you chasing each one;
- customers ask for more seats, more locations, or features that deepen use;
- people complain loudly when it breaks (they depend on it);
- inbound requests from your ICP outnumber your outbound pushes.

## Sales-cycle signals

- the sales cycle shortens over time;
- prospects arrive already knowing what the product does;
- fewer discounts are needed to close;
- objections move from "why would we need this" to "how fast can we start".

## B2B specifics

**Champion, buyer, and user are often different people.**

| Role | What they care about | Signal from them |
|---|---|---|
| **User** | Does it make my day easier? | Weekly use without reminders |
| **Champion** | Will this make me look good? Can I sell it internally? | Spends reputation: brings you to meetings, defends the budget |
| **Economic buyer** | Does it save or make money? Is the risk low? | Signs and pays |

Interview all three. A product users love that the buyer does not see value in
stalls at renewal; a product the buyer bought but users avoid churns.

**Pilot to paid conversion.** Track the share of pilots that convert to a paid
contract, and how long conversion takes. A pilot programme where most pilots
end "we'll think about it" is telling you the success criteria were not met, or
were never set. See
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/experiments.md`.

Other B2B signals: expansion revenue (more seats, more sites) from existing
customers; customers giving references without being asked twice; procurement
starting before you ask.

## Reading the signals together

| Signal | Weak | Strong |
|---|---|---|
| Ellis survey | Under ~25% very disappointed | ~40%+ (heuristic), in one segment |
| Retention | Falls toward zero | Flattens for recent cohorts |
| Acquisition | Every customer chased by founders | Referrals and inbound from ICP |
| Sales | Long cycles, heavy discounts | Shortening cycles, fewer discounts |
| B2B pilots | Pilots drift, few convert | Most pilots convert on agreed criteria |

If the signals are strong in one segment only, narrow the company to that
segment before trying to widen.
