# Onboarding

## What this screen is for

Getting a new user to their first real success. Not to a completed profile, not
through a tour — to the moment the product does the thing they came for.

## Canonical structure

```
1. Value confirmation      remind them what they came for; do not re-sell
2. Minimum to start        only what is genuinely required before step 3
3. First meaningful action the real thing, with real data
4. Progressive disclosure  everything else, later, in context
```

**Why this order.** Every step before the first success is a place to lose
someone. The user has already decided to try the product; each additional
question before they see it work is a chance to reconsider. Ordering by "what
does step 3 actually require" rather than "what does our schema want" is the
whole discipline.

**Step 3 is the point.** An onboarding that ends with a completed profile and
an empty product has succeeded at its own metrics and failed at its job. The
user should finish onboarding looking at something that is theirs and that
works.

## What may be deferred

Almost everything. Genuinely cannot defer: authentication, and anything without
which the first action is impossible.

| Can defer | Ask for it |
|---|---|
| Profile photo, display name | when they first appear to others |
| Team invites | after they have something worth sharing |
| Integrations | when they reach the feature that uses them |
| Billing | at the limit, not at the door |
| Preferences | with sensible defaults, changed in settings |

Each deferred question costs you nothing and buys a user who is already
invested when you ask.

## Variants

| Variant | Shape |
|---|---|
| **Self-serve** | minimal, fast, defer everything possible; the user is alone and impatient |
| **Sales-assisted** | can be longer; someone is helping and context is being gathered anyway |
| **Individual → team** | start solo, invite later; inviting before there is anything to see wastes the invitation |
| **Workspace seeding** | templates, samples, or import — solves the empty product directly |

**Seeding is underrated.** A new workspace containing a sample project the user
can poke at, clearly marked as a sample and easy to delete, teaches more than
any tour and produces a product that is not empty. Import from a competitor is
the strongest form of this where it applies.

## Progress and skipping

Show which step, how many total, and what is ahead. An unbounded sequence feels
longer than a numbered one of the same length.

**Allow skipping**, unless a step is genuinely required. A forced step produces
junk data from users who would rather type anything than answer, and that junk
is worse than a blank field. Make it easy to return.

**The checklist pattern** — a persistent list of setup tasks with progress —
works when the items are genuinely valuable and the list can be dismissed. It
condescends when it contains items like "read the documentation" or cannot be
got rid of.

## Re-entry

Users abandon and return. Save progress, resume where they left off, and do not
restart the sequence from the top. A user who completed four of six steps and
is shown step one on return will not complete it twice.

## The six states

| State | This screen |
|---|---|
| **empty** | this *is* the empty state of the product — the highest-value screen you have, with full attention and no competing content. Say what the thing is for, show what filled looks like, offer one action. |
| **loading** | account provisioning can take real time. Show progress and what is happening; a spinner with no explanation during signup reads as a failure. |
| **error** | an error here loses the user permanently. Never discard entered data. Email already registered → offer sign-in, not a scolding. Be specific and offer a path. |
| **permission** | invited users onboard differently from workspace creators — they join something that exists. Do not show a creator flow to an invitee. |
| **overflow** | very long names, huge imports, a team invite list of 200. Imports need progress and a partial-failure report. |
| **offline** | detect it before a multi-step form silently fails. Losing onboarding input loses the user. |

Definitions: `patterns/states.md`.

## Common failures

- **Asking everything up front.** Each question before first success loses
  users.
- **Ending on a completed profile, not a working product.**
- **A tour instead of a first action.** Nobody remembers a tour; they remember
  doing the thing.
- **No skip.** Produces junk data and resentment.
- **Restarting on return.** Abandoned progress discarded.
- **An empty product after onboarding.** Seed it or explain it.
- **Inviting a team before there is anything to see.** Wastes the invitation
  and the inviter's credibility.
- **Onboarding that cannot be re-entered.** Users want to revisit what they
  skipped.
- **Undismissable checklists.** Condescending and permanent.
- **Errors that scold.** "Email already exists" with no sign-in link.

## Reference products

| Product | Look at |
|---|---|
| **Linear** | minimal setup, straight into a seeded workspace |
| **Notion** | template selection as seeding |
| **Figma** | first-file-as-onboarding; you are designing within a minute |
| **Stripe** | progressive activation — test mode first, real details at the point they are needed |
| **Duolingo** | commitment before account creation; the value is felt first |

For current flows, ask the user to browse Page Flows or Mobbin — Claude cannot
open them. See `reference/sources.md`.
