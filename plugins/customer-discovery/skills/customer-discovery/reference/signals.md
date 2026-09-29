# Reading signals

After an interview the question is not "did they like it?" but "what did it
cost them to show interest?". The cost is the signal.

## Commitment currencies

Following *The Mom Test*, a real commitment spends one of three currencies:

| Currency | Examples |
|---|---|
| **Time** | a second meeting with more people; a trial using their real data; filling in a detailed survey; a site visit |
| **Reputation** | an intro to their boss or a peer; agreeing to be a public reference or case study; championing you internally |
| **Money** | a deposit; a pre-order; a paid pilot; a signed letter of intent with a price; an invoice paid |

The more of a currency spent, the stronger the signal. Money beats reputation
beats time, in general, but a CFO giving you two hours is not weak.

## Strong vs weak signals

| Weak (mostly noise) | Strong (evidence) |
|---|---|
| "That's a great idea." | "Can you send me the contract?" |
| "I would definitely use it." | They use a rough version every week without being reminded. |
| "Would you pay 20 dollars?" "Yes." | They paid 20 dollars, or signed a pre-order. |
| "Keep me posted." | "Can we meet on Thursday with my ops lead?" |
| "Lots of people have this problem." | "Last month it cost me three days and a customer." |
| A long list of feature requests | A detailed description of a workaround they built and maintain |
| Interest at a conference booth | A follow-up email from them, unprompted |
| Survey says 80% "interested" | 8 of 50 people put down a deposit |
| A friend's enthusiasm | A stranger's introduction to another stranger |

## Red flags

Treat these as a sign that the conversation produced no evidence:

- **Compliments.** Pleasant, informative about nothing.
- **"I would definitely use it" / "I'd buy that."** Future promises are free to
  make.
- **Feature requests without pain.** Someone who wants features but cannot
  describe a recent, costly occurrence of the problem is designing your product
  for fun.
- **No workaround.** If they have not tried to solve it, it probably does not
  hurt enough.
- **"It would be nice to have."** Nice to have means will not pay for.
- **Deflecting the ask.** "Maybe later", "send me something", "after the
  budget cycle" with no date.
- **You did most of the talking.** Discount everything positive.

## Scoring an interview

Rate each interview on a small scale, the same way every time, using
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/interview-scorecard.md`:

- pain: recent, specific, costly occurrence? (0-2)
- workaround: have they spent time or money trying to fix it? (0-2)
- fit: do they match the ICP and early-adopter traits? (0-2)
- commitment: did they spend time, reputation, or money at the end? (0-3)
- interviewer discipline: did we avoid pitching and hypotheticals? (0-1)

The scores are for comparing interviews against each other, not an absolute
measure. Their value is in forcing you to name *why* an interview felt good.
