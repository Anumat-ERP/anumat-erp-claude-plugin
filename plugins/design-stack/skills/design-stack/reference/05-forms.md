# Forms

*Read this for any form: field selection and order, labels, validation, errors,
saving, and destructive confirmation.*

Forms are where products ask users to do work. Most of the craft is in removing
work rather than styling it.

The patterns here draw heavily on the **GOV.UK Design System**
(<https://design-system.service.gov.uk/patterns/>), which is fetchable and is
the most rigorously user-tested public source on forms and error handling.

## Fields and their order

**Ask for less.** Every field is a cost paid by every user forever. A field
that is nice to have is a field that should not exist. If you cannot say what
decision a field's answer changes, remove it.

**Order by the user's mental model, not the database schema.** Group related
fields adjacently and separate groups with space, not just headings — see
`reference/02-layout.md` on proximity as the strongest grouping signal.

**One thing per page for long or unfamiliar flows.** Splitting a long form into
short steps reduces abandonment, makes errors easier to place, and makes
progress legible. It costs more clicks, and users consistently prefer it.

**Field length should signal expected input.** A postcode field the width of
the page suggests the answer is long. Sizing fields to their content is a
usable hint, given free.

## Labels

**Every field has a visible label, always.** Placeholder-as-label fails in five
separate ways: it disappears when typing starts, so the user cannot check what
they answered; it fails contrast requirements at most implementations; it is
unreliably announced by screen readers; it makes a filled field
indistinguishable from an empty one at a glance; and it leaves no room for a
hint.

Place labels **above** the field. Left-aligned labels beside fields cost
horizontal space, wrap badly, and slow vertical scanning.

Use placeholders only for a **format example** (`e.g. 07700 900123`), and
prefer persistent helper text under the label for anything that must remain
visible while typing.

## Required and optional

Mark whichever is **rarer**. If most fields are required, mark the optional
ones; if most are optional, mark the required ones. Marking every field with an
asterisk conveys nothing, because a signal on everything is a signal on
nothing.

Prefer the word `(optional)` over an asterisk. An asterisk requires a legend,
which the user must find, read, and remember.

## Validation timing

| When | Validate |
|---|---|
| While typing | nothing — validating a half-typed email is telling the user they are wrong before they have finished |
| On blur | format and syntax of the field just left |
| On submit | everything, including cross-field rules that cannot be checked earlier |
| After server response | anything only the server knows — uniqueness, availability |

The exception that earns its keep: **positive** feedback while typing, like a
password-strength meter or a username-availability check, where the user is
making a choice and wants guidance. Even then, do not show a red error state
until they leave the field.

## Errors

**Every error says what happened and what to do next.** "Invalid input" fails
both tests. "Enter a date after 1 January 2020" passes both.

For a form of any length, show errors in **both** places:

- **Inline**, next to the field, programmatically associated so screen readers
  announce it when focus reaches the field.
- **In a summary at the top**, listing every error as a link to its field.

Both are needed because they solve different problems. Inline tells you what is
wrong with the field you are looking at; the summary tells you how many
problems exist and where they are, which inline errors cannot do when they are
scrolled off screen.

Move focus to the summary on failed submit. Never rely on colour alone — pair
red with an icon and text. Preserve everything the user typed; discarding valid
input on a failed submit is the most resented failure in forms.

## Saving

| Model | Right when | Must show |
|---|---|---|
| **Explicit save** | changes are consequential, reviewable, or batched | a disabled-until-dirty button, and an unsaved-changes warning on navigation |
| **Autosave** | changes are low-risk and incremental | a persistent saved/saving/failed indicator, and recovery on failure |

Never mix models within one screen — the user cannot tell which of their
changes are safe. Settings that affect security, billing, or other people
should be explicit-save regardless of what the rest of the page does.

Autosave without a visible failure state is worse than no autosave: the user
believes their work is safe and it is not.

## Destructive confirmation

A confirmation is meaningful only if it can actually be failed. "Are you sure?"
with an OK button is answered reflexively and prevents nothing.

Scale the friction to the consequence:

| Consequence | Friction |
|---|---|
| Reversible (undo available) | none — just do it, and offer undo |
| Irreversible, low value | a confirmation naming the specific item |
| Irreversible, high value | type the name to confirm |
| Irreversible, affects others | type to confirm, plus state who is affected |

**Prefer undo over confirmation** wherever it is technically possible. Undo
costs the user nothing when they meant it and saves them entirely when they did
not; confirmation costs everyone a click and saves only the inattentive.

Name the specific thing in the confirmation. "Delete this item?" is weaker than
"Delete invoice INV-2041?" — the second lets the user catch having the wrong
row selected, which is the actual failure mode.

## Multi-step forms

Show progress: which step, how many total, and what is ahead. Allow going back
without losing input. Validate each step on leaving it, not all at the end.
Save partial progress if the flow is long enough that a user might leave.

Do not use tabs for steps — tabs mean alternate views of one thing, steps mean
sequence. See `reference/04-components.md`.

## Common failures

- **Placeholder as label.** Fails five ways at once.
- **Asterisks on everything.** A signal on every field is no signal.
- **Validating while typing.** Tells users they are wrong mid-word.
- **"Invalid input."** Says neither what happened nor what to do.
- **Inline errors only, on a long form.** The user cannot find the ones
  scrolled off screen.
- **Input discarded on failed submit.** The most resented form failure there
  is.
- **Autosave with no failure state.** False confidence about lost work.
- **Reflexive confirmation dialogs.** Cost a click, prevent nothing.
- **Fields nobody can justify.** Every one is a cost paid forever.
- **Colour-only error indication.** Invisible to a substantial minority.
