# Product-market fit survey

Based on Sean Ellis's "very disappointed" question, with follow-ups in the
style of Rahul Vohra's Superhuman write-up. The 40% line is a heuristic.
Reading the results: `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/pmf.md`.

**Who to send it to:** active users only, meaning people who used the core
value recently (for example at least twice in the last two weeks). Aim for at
least 30-40 responses in one segment before drawing conclusions.

## Questions

1. **How would you feel if you could no longer use [product]?**
   - Very disappointed
   - Somewhat disappointed
   - Not disappointed (it isn't that useful)
   - N/A, I no longer use [product]

2. **What type of people do you think would most benefit from [product]?**
   (open text)

3. **What is the main benefit you get from [product]?** (open text)

4. **How can we improve [product] for you?** (open text)

5. **What would you use instead if [product] were no longer available?**
   (open text)

6. **Segment questions** (keep to 2-3): role, company size, how long a user,
   how often used.

## Scoring sheet

| Segment | Responses | Very disappointed | % very disappointed | Main benefit (top theme) |
|---|---|---|---|---|
| All | | | | |
| [segment A] | | | | |
| [segment B] | | | | |

## Reading it

- Look at the segment with the highest % very disappointed. That is who to
  build for.
- Read question 3 answers from the "very disappointed" group: that is the value
  to double down on.
- Read question 4 answers from "somewhat disappointed" users whose main benefit
  matches: that is what may convert them.
- Ignore "not disappointed" users' feature requests for now.
- Re-run on a regular cadence (for example quarterly) and track the trend.
