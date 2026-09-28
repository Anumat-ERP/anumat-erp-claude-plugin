# Components

*Read this when building or composing any interactive component, or deciding
where one component ends and the next begins.*

A component is defined by its anatomy — the parts it must have — and its
behaviour — what it must do when operated by keyboard, pointer, and screen
reader. Appearance is neither; that belongs to `frontend-design`.

## Interactive states

Every interactive element needs all seven. These are **per-control** states and
are distinct from the six **per-screen** states in `patterns/states.md` —
conflating the two lists is a common error, and neither substitutes for the
other.

| State | Must convey |
|---|---|
| `default` | that it is interactive at all |
| `hover` | that the pointer is over *this* target |
| `active` | that the press registered |
| `focus-visible` | where keyboard focus is |
| `disabled` | that it is unavailable, and ideally why |
| `loading` | that the action is in flight |
| `error` | that this control is the problem |

**Why `focus-visible` and not `focus`.** Plain `:focus` fires on mouse click
too, which is why developers remove focus rings and break keyboard use for
everyone. `:focus-visible` fires only when the browser judges a focus ring is
warranted — keyboard, not mouse. Style that, and never set `outline: none`
without a replacement.

**Why `loading` is a state of the control, not a replacement for it.** Swapping
a button for a spinner loses its position, its label, and its size, so the
layout shifts and the user loses the thing they just clicked. Keep the control,
disable it, and show progress inside it.

**Disabled needs a reason.** A disabled control with no explanation is a dead
end — the user cannot tell whether it is broken, whether they lack permission,
or whether a prerequisite is missing. Give it a tooltip, helper text, or
prefer an enabled control that explains the problem on activation.

## Anatomy and behaviour

**Button.** Label, optional leading icon, optional loading indicator. The label
is a verb phrase naming the outcome (`Save changes`, not `Submit`). Activates
on `Enter` and `Space`. An icon-only button needs an accessible name.

**Input.** Label, the field, optional helper text, optional error text, all
programmatically associated. The label is always present — see
`reference/05-forms.md` on why a placeholder is not a label.

**Select.** A native `select` unless you need multi-select, search, or rich
options. A custom one owes you: type-ahead, arrow navigation, `Escape` to
close, focus return to the trigger, and correct `role`/`aria-expanded`. This
is the component most often rebuilt badly — prefer an accessible primitive.

**Modal.** Title, body, actions, and a close affordance. Focus moves in on
open and returns to the trigger on close; focus is trapped while open;
`Escape` closes; the background is inert, not merely covered. Modals interrupt
— use one when the task must be finished or abandoned, not to show detail.

**Toast.** Message, optional action, dismissal. Never put the only path to an
action in a toast, because it disappears. Errors that matter belong in the
page, not in something that auto-dismisses. Announce politely to screen
readers.

**Tooltip.** Supplementary text on hover *and* focus. Never the only source of
information, because touch users may never see it. Not interactive — if it
needs a button, it is a popover.

**Tabs.** Tab list, tabs, panels. Arrow keys move between tabs, `Tab` moves
into the panel. The selected tab is `aria-selected`. Use tabs for alternate
views of one subject, not for steps — steps are a wizard.

**Card.** A container that groups content about one subject. If the whole card
is clickable, it is a link and must be one element, not a div with a handler.
Nested interactive elements inside a clickable card create ambiguous targets —
pick one.

**Badge.** A short status or count. Colour alone must not carry meaning; pair
it with text or an icon so it survives colour blindness and greyscale.

**Menu.** Trigger, list, items. Arrow navigation, `Escape` closes, focus
returns to the trigger, `aria-expanded` on the trigger. Destructive items are
separated and marked.

## Decomposition

Where one component ends and the next begins is a real decision, and guessing
at it produces either a sprawl of one-off components or a handful of
over-configured ones.

The composition ladder:

```
primitive  → button, input, icon            no domain knowledge
field      → label + input + error          knows about forms
composite  → search box, date range         combines fields
pattern    → data table, settings section   knows about a screen type
page       → assembled, routed              knows about the app
```

**A component earns its existence** by being used in two places, or by
encapsulating a decision that must stay consistent. One-off markup that appears
once is not a component; extracting it adds a layer of indirection and buys
nothing.

Push knowledge *down* the ladder as rarely as possible. A primitive that knows
about your domain — a `Button` with an `isCheckoutStep` prop — has stopped
being a primitive and will accumulate more such props forever.

Rather than reasoning about decomposition in the abstract, read a real
inventory: `systems/STORYBOOKS.md` covers how to read a Storybook's component
tree, which is a mature team's answer to exactly this question.

## Common failures

- **`outline: none` with no replacement.** Removes the keyboard user's only
  position indicator.
- **Styling `:focus` instead of `:focus-visible`.** Either rings on mouse
  clicks, or rings removed and keyboard broken.
- **Spinner replacing the button.** Layout shift, lost label, lost position.
- **Disabled with no reason.** A dead end the user cannot diagnose.
- **Custom select without keyboard support.** The single most common
  accessibility failure in application UI.
- **Modal without focus management.** Keyboard users tab into the page behind
  it and cannot find their way back.
- **The only undo living in a toast.** It disappears; the action does not.
- **Colour-only status.** Invisible to colour-blind users and in greyscale.
- **Clickable card wrapping other clickable things.** Ambiguous targets,
  unpredictable activation.
- **Components extracted before a second use.** Indirection with no payoff.
