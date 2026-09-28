# Billing

## What this screen is for

Answering *what am I paying, for what, and when does it change* — and letting
the user act on the answer without contacting support.

Billing is where trust is won or lost. A confusing billing page produces
support tickets, chargebacks, and cancellations that were really about
confusion rather than value.

**Payment integration is a question for your payment processor, not a design
one.** This playbook
covers the screen.

## Canonical structure

```
1. Current plan           name, price, billing period, next charge date
2. Usage against limits   where limits exist, with headroom shown
3. Payment method         with expiry visible
4. Invoice history        downloadable, with addresses
5. Change plan            upgrade and downgrade paths
6. Cancellation           findable, honest — not hidden
```

**Why this order.** Descending frequency: people check what they pay far more
often than they change it, and change it far more often than they cancel.

**The next charge date is the most-looked-for fact on the page** and is
routinely omitted. "$49/month" does not tell the user whether they are about to
be charged. Show the amount and the date together.

## Usage and limits

Show usage **against** the limit, not in isolation. "8,400 API calls" means
nothing; "8,400 of 10,000" means the user should act.

**Warn before the wall, not at it.** A user who hits a hard limit mid-workflow
with no warning experiences an outage. Notify at a threshold — 80% is
conventional — through a channel they will actually see, and say what happens
when the limit is reached: is it a hard stop, throttling, or overage billing?
Those are three very different products and the user must know which they
bought.

For metered billing, show the current period's accrued cost, not only the
units. Units do not tell people what they will be charged.

## Plan changes

**Explain proration in plain language at the moment of change**, with the
actual number: "You'll be charged $23.40 today, then $79/month from 1 March."
Proration is the single most confusing part of subscription billing and the
most common source of billing support tickets.

For **upgrades**: immediate effect, prorated charge, state it before
confirming.

For **downgrades**: say what is lost and when. If the downgrade takes effect at
period end, say so — users expect an immediate refund otherwise. If data will
be deleted or made inaccessible, say exactly what and give them a chance to
export first. This is the most damaging thing to get wrong on this screen.

Show plan comparison at the point of decision. Making the user navigate to a
pricing page and back loses them.

## Failed payment and dunning

An expired card should not silently end someone's service.

- **In-product banner**, persistent, not a dismissible toast.
- **Say what happens and when**: "We'll retry on 3 March. Service continues
  until 10 March."
- **One-click path to update the card**, from the banner itself.
- **Grace period stated explicitly**, so the user knows how much time they have.
- **Show the failure reason** where the processor gives one — an expired card
  and an insufficient-funds decline need different actions from the user.

## Cancellation

**Make it findable.** Hiding cancellation produces chargebacks, which cost more
than the retained subscription, and reviews that cost more still.

Be honest about what happens:

- When access actually ends — usually period end, not immediately.
- What happens to data: retained for how long, exportable, or deleted.
- Whether it can be reactivated, and what is preserved if so.
- Whether any refund applies.

Offering a pause, a downgrade, or a discount at the cancellation step is
legitimate **once**. Requiring a phone call, burying the button, or repeated
interception is a dark pattern, increasingly unlawful, and it converts a
cancellation into a complaint.

**Offer data export before deletion**, always.

## Invoices

Downloadable as PDF, listing the correct billing entity, address, and tax
identifiers. Businesses need these for accounting and will file a support
ticket for every one that is wrong. Let users edit billing details and
regenerate.

## The six states

| State | This screen |
|---|---|
| **empty** | free plan with no payment method, or no invoices yet. Explain the current state rather than showing a blank section — "You're on the Free plan. No payment method needed." |
| **loading** | billing data often comes from an external processor and can be slow. Skeleton the sections; never render a stale or placeholder amount, which users will screenshot and quote. |
| **error** | if the processor is unreachable, say that explicitly — a billing page that fails silently makes users think their subscription lapsed. Never show $0 on failure. |
| **permission** | most team members cannot see or change billing. Say who can: "Only the workspace owner can change billing. Contact Dana Whitfield." A blank section produces a support ticket. |
| **overflow** | 200 invoices, very long company names, multi-currency, many line items. Paginate invoice history. |
| **offline** | disable all payment actions with a reason. Never accept card details you cannot submit. |

Definitions: `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/states.md`.

## Common failures

- **No next charge date.** The most-looked-for fact, routinely absent.
- **Usage without limits.** A number with no meaning.
- **No warning before a hard limit.** Experienced as an outage.
- **Proration unexplained.** The top billing support ticket.
- **Downgrade data loss unstated.** The most damaging error here.
- **Failed payment as a dismissible toast.** Missed, then service ends.
- **Cancellation hidden.** Produces chargebacks and bad reviews.
- **No export before deletion.**
- **Invoices with wrong billing details.** A ticket every time.
- **Billing section blank for non-owners.** Say who can.
- **$0 or a stale amount rendered on failure.**

## Reference products

| Product | Look at |
|---|---|
| **Stripe** | billing portal — the reference implementation for most of this |
| **Vercel** | usage against limits, overage explained clearly |
| **Linear** | seat-based billing, proration explained at the point of change |
| **GitHub** | mixed seat and metered billing, spending limits |
| **Notion** | plan comparison at the decision point |
