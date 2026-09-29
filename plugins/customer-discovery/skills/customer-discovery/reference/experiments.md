# Validation experiments

An experiment asks the customer to do something that costs them, and measures
whether they do it. Every experiment has, written **before** it runs:

- the hypothesis being tested;
- the method;
- the metric;
- the **pass threshold**, and what you will do if it fails;
- the decision date.

Card: `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/experiment-card.md`.
The broader catalogue of experiments in *Testing Business Ideas* (David Bland
and Alex Osterwalder) is a good next read.

## Choosing an experiment

| Experiment | Effort | What it proves | What it does not prove | Example pass threshold (set your own) |
|---|---|---|---|---|
| Landing-page smoke test | Low: a day | People in a channel will act on the promise (sign up, click "buy") | That they will pay or keep using it | 10%+ of targeted visitors leave an email; 2%+ click a priced "buy" button |
| Concierge MVP | Medium: your time per customer | The outcome is valuable when delivered by hand; what the real workflow is | That software can deliver it at your cost | 3 of 5 customers use it every week for 4 weeks |
| Wizard of Oz | Medium: a front end, humans behind it | People use the interface and value the result as if automated | That automation is feasible | 60%+ of pilot users return in week 3 |
| Letter of intent | Low for you, some for them | A buyer will put their name and a price to a conditional commitment | That they will actually pay | 5 signed LOIs with a price from ICP companies in 6 weeks |
| Pilot with success criteria | High: weeks | The product solves the problem in their real setting; conversion path | Scale economics | Pilot hits the agreed metric and 2 of 3 convert to paid |
| Pre-sale / deposit | Medium | Willingness to pay, now | That you can deliver | 10 deposits of the stated amount before building |
| Pricing test | Low to medium | The price range and who balks at which price | Long-term retention at that price | See below |

The thresholds above are illustrations to show the form, not benchmarks. Pick
yours from what the business needs to work: if you need 20% conversion to
cover acquisition cost, the threshold is 20%, not what "seems normal".

## Concierge and Wizard of Oz

- **Concierge:** you do the job by hand, openly. The customer knows a person is
  doing it. You learn the real workflow in detail.
- **Wizard of Oz:** the customer sees a product interface; people do the work
  behind it. Be honest if asked; do not claim automation that does not exist in
  sales material or contracts. See
  `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/ethics.md`.

## Pilots

A pilot without success criteria becomes a free, endless trial. Agree in
writing before starting:

- the problem and the metric that shows it is solved;
- the baseline today;
- the target and the date;
- what each side provides (data, people, time);
- what happens on success: price and start date of the paid contract.

Outline: `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/pilot-agreement.md`.
Prefer paid pilots, even at a discount. A buyer who pays pays attention.

## Letters of intent

An LOI is a non-binding statement that a buyer intends to purchase if you
deliver something specific by a date, ideally at a stated price. It is weaker
than money but stronger than words because it carries a name, a signature, and
some reputation. Outline:
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/letter-of-intent.md`.
Have a lawyer review anything that becomes binding.

## Pre-sales and deposits

Ask for money before the product exists, openly: "We are building X, delivery
in Q3. A refundable deposit of Y reserves a place and a founding-customer
price." Refundable deposits are fair and still strong signal. Make the refund
terms clear and honour them.

## Landing-page smoke tests

A page that describes the offer and asks for an action. Rules:

- drive traffic from the channel you plan to use, targeted at your ICP;
- measure a real action (email, booking a call, clicking a priced button);
- if a button leads to "not available yet", say so on the next screen and offer
  to notify them; do not collect card details for a product that does not exist;
- small numbers mislead; decide the sample size in advance.

## Pricing tests

- **"Would you pay X?" is weak.** People say yes to be kind or no to bargain.
- **An invoice is strong.** A paid invoice at a price is the only proof.
- **Van Westendorp price sensitivity** (four questions: too cheap, a bargain,
  getting expensive, too expensive) gives a rough acceptable range. Use it as a
  starting point for which prices to test, not as proof of willingness to pay.
- **Test real prices on real offers**: quote different prices to comparable
  prospects and watch which close. Ask what they pay for the workaround today;
  that is an anchor you did not invent.
- Price against the value of the outcome and the cost of the workaround, not
  your cost to build.

## After the result

Record pass or fail against the threshold you set, not a new one. Write the
decision in `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/decision-log.md`.
A failed test that was cheap is a good test.
