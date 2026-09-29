# The customer-development loop

Steve Blank split the early life of a company into two search steps:
**customer discovery** (is there a real problem, for a real group, that our
idea addresses?) and **customer validation** (will that group commit, and can
we reach more of them in a repeatable way?). Only after both does it make sense
to spend on scale. This file turns that idea into a weekly loop.

## The stages

### 1. Hypotheses
Write down what must be true for the business to work: who has the problem,
how painful it is, what they do today, what they would pay, and how you will
reach them. Rank them by how much the plan depends on each and how little
evidence you have. Test the top one first.
Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/assumptions.md`.
**Exit:** a ranked list with one test per top-three assumption.

### 2. Who to talk to
Pick one segment narrow enough that you could list 50 real people in it. Name
the trigger event that makes the problem urgent, the early-adopter traits, and
who you will deliberately not target.
Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/icp.md`.
**Exit:** a filled ICP and anti-ICP sheet.

### 3. Outreach
Build a list of 30-50 names and reach them through the warmest route you have.
Ask for 20-30 minutes to learn, not to sell.
Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/finding-people.md`.
**Exit:** interviews booked for the coming week.

### 4. Interviews
Ask about the last time the problem happened, what they did, what it cost.
Pitch last or not at all. End by asking for a commitment or two intros.
Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/mom-test.md`.
**Exit:** notes and a scorecard for every conversation, written the same day.

### 5. Synthesis
Group what you heard, rate pains by how often and how badly they hurt, and
keep exact quotes. Separate strong signals from polite noise.
Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/synthesis.md` and
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/signals.md`.
**Exit:** a synthesis board with the top three pains and their evidence.

### 6. Decide
Three options, and "keep interviewing" is not one of them unless you name what
you expect to learn:
- **Persevere:** the evidence supports the hypothesis. Move to a harder test.
- **Pivot:** change one thing (segment, problem, solution, price, channel) and
  keep the rest. Write down which one and why.
- **Kill:** the problem is not painful enough for anyone you can reach. Stop
  and free the team for the next idea. This is a good outcome if it is cheap.
Record it in `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/decision-log.md`.

### 7. Validate with commitment
Ask for something that costs the customer: time (a pilot with real data),
reputation (an intro to their boss, a public quote), or money (a deposit, a
paid pilot, a signed order).
Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/experiments.md`.
**Exit:** an experiment card with a result against a threshold set in advance.

### 8. Repeat
Go back to the board. The riskiest assumption has probably changed.

## Cadence

One loop a week is a good default for a small team: book on Monday, interview
Tuesday to Thursday, synthesize and decide on Friday using
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/weekly-review.md`.

## Stage gates

**Problem-solution fit.** Passed when, for one segment:
- most interviews describe the same problem without prompting;
- people already spend time or money on a workaround;
- the pain is frequent or intense enough that they would switch;
- several people committed to trying your solution (pilot, LOI, deposit).

**Product-market fit.** Passed when retention curves flatten, new users arrive
without you pushing each one, sales cycles shorten, and a strong share of
active users would be very disappointed to lose the product. Detail in
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/pmf.md`.

## Common ways the loop breaks

- **Building during discovery.** Code feels like progress; it hides that nobody
  has committed. Cap build work until problem-solution fit.
- **Talking to friends only.** Friends are kind. Kindness is not data.
- **Changing everything at once.** A pivot changes one element. Changing all of
  them means starting over, which is fine, but call it that.
- **Never deciding.** A loop without a decision is just a calendar of calls.
