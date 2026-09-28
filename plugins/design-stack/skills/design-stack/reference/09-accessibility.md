# Accessibility

*Read this always, before calling any interface done.*

Accessibility is not a category of user. It is the set of conditions under
which an interface still works — a broken trackpad, bright sunlight, a noisy
room, a hand holding a coffee, a screen reader, sixty-year-old eyes. Designing
for the edge produces a better centre.

The authoritative reference is the **WAI-ARIA Authoring Practices Guide**
(<https://www.w3.org/WAI/ARIA/apg/>), which is fetchable and gives keyboard
interaction contracts for every common pattern. Read it before building any
custom widget.

## Semantics first

Use the element that means what you mean. A `<button>` is focusable, activates
on `Enter` and `Space`, announces as a button, and works with every assistive
technology ever written. A `<div>` with a click handler has none of that, and
no amount of CSS supplies it.

The most common version of this failure:

```html
<!-- broken: not focusable, not announced, no keyboard activation -->
<div class="btn" onclick="save()">Save</div>

<!-- correct -->
<button type="button" onclick="save()">Save</button>
```

Headings form the document outline screen-reader users navigate by. One `h1`
per page, no skipped levels, and chosen for structure rather than for size —
size comes from `reference/03-typography.md`.

Landmarks — `header`, `nav`, `main`, `aside`, `footer` — let users jump
directly to a region. One `main` per page.

Lists are lists, tables are tables. A table used for layout announces phantom
rows and columns; a list of items built from `div`s does not announce its
length, which is information a sighted user gets for free.

## The keyboard path

**Every action reachable by mouse must be reachable by keyboard.** This is not
negotiable and it is the fastest thing to test: put the mouse down and try to
use the feature.

- **Tab order follows visual order.** A positive `tabindex` breaks this; never
  use one. `tabindex="0"` to add something to the order, `tabindex="-1"` to
  make it focusable only programmatically.
- **Focus is trapped inside modals** while open, and returns to the trigger on
  close. See `reference/04-components.md`.
- **A skip link** to `main` is the first focusable element, so keyboard users
  are not made to tab through the nav on every page.
- **Nothing traps focus unintentionally.** A widget the user can tab into but
  not out of ends their session.
- **`Escape` closes** anything that opened over the page.

## Focus visibility

Style `:focus-visible`, never remove focus indication. The indicator needs
3:1 contrast against its background and should not be so subtle it is lost.

```css
:focus-visible {
  outline: 2px solid var(--intent-accent);
  outline-offset: 2px;
}
```

A focus ring that only barely differs from the border is the polite version of
removing it. If keyboard users cannot instantly see where they are, they cannot
use the product.

## Contrast

| Content | Minimum ratio |
|---|---|
| Body text | 4.5:1 |
| Large text (18pt+, or 14pt+ bold) | 3:1 |
| UI components, borders, icons carrying meaning | 3:1 |
| Focus indicators | 3:1 |

Disabled controls are exempt by the letter of the standard, which is a trap:
users still need to read them to know what is unavailable. Do not take the
exemption as licence to make disabled text invisible.

**Colour must never be the only carrier of meaning.** Error states get an icon
and text, not just red. Chart series get labels or patterns, not just hue.
Required fields get a word. Roughly one man in twelve has a colour vision
deficiency, and everyone is affected in bright sunlight.

## ARIA, only where semantics fall short

**The first rule of ARIA: do not use ARIA.** If a native element does the job,
use it. Incorrect ARIA is worse than none — it overrides the accurate native
semantics with a wrong claim.

Legitimate uses: `aria-label` for an icon-only control, `aria-describedby` to
tie helper or error text to a field, `aria-expanded` on a disclosure trigger,
`aria-live` for dynamic content, and full role/state sets on genuinely custom
widgets built to the APG contract.

An `aria-label` overrides the visible text for screen-reader users. If they
differ, a user reading the label aloud to a colleague describes something the
colleague cannot find.

## Announcing change

Content that appears without a page load is invisible to a screen reader unless
you announce it.

| Region | Use for |
|---|---|
| `aria-live="polite"` | almost everything — waits for a pause |
| `aria-live="assertive"` | genuine interruptions only; it cuts the user off |
| `role="status"` | status messages; implies polite |
| `role="alert"` | errors needing immediate attention; implies assertive |

The live region must exist in the DOM **before** the content is inserted. A
region added at the same moment as its message is not announced — this is the
most common reason live regions "do not work".

Announce: form errors, search result counts, async save confirmations, toasts,
and anything appearing outside the user's focus.

## Forms

Every input has a programmatically associated label — `<label for>`, or
wrapping. Placeholders are not labels; see `reference/05-forms.md`.

Errors are tied to their field with `aria-describedby`, and the field is marked
`aria-invalid`. Related controls — a radio group, a date's three fields — are
wrapped in a `fieldset` with a `legend`. Use `autocomplete` attributes so
password managers and browser autofill work, which helps everyone and
disproportionately helps users with motor or memory impairments.

## Ten-minute test

Run this before calling anything done. It catches the large majority of real
failures.

1. **Unplug the mouse.** Complete the main task with the keyboard alone.
2. **Tab through.** Is focus always visible? Does the order match the layout?
3. **Open a modal.** Is focus trapped? Does `Escape` close it? Does focus
   return?
4. **Zoom to 200%.** Does anything overlap, clip, or scroll horizontally?
5. **Check contrast** on the lowest-contrast text and on borders.
6. **Greyscale the screen.** Is any meaning lost?
7. **Trigger an error.** Is it announced, associated, and actionable?
8. **Read the heading outline.** Does it describe the page?
9. **Turn on a screen reader** for the primary flow. Even five minutes finds
   things nothing else does.
10. **Resize to 320px wide.** Is everything still reachable?

## Common failures

- **`div` with a click handler.** Not focusable, not announced, no keyboard.
- **`outline: none` with no replacement.** Keyboard users lose their position.
- **Colour as the only signal.** Fails for colour blindness and in greyscale.
- **Placeholder as label.** See `reference/05-forms.md`.
- **Modal without focus management.** Tabbing lands behind the overlay.
- **Live region created with its message.** Never announced.
- **`aria-label` contradicting visible text.** Two products, one screen.
- **Positive `tabindex`.** Breaks tab order in ways that compound.
- **Headings chosen for size.** Destroys the outline users navigate by.
- **Icon-only buttons with no accessible name.** Announced as "button".
