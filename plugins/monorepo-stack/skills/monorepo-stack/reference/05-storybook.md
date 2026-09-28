# Storybook

*Read this when setting up Storybook or writing stories.*

## One Storybook, in the UI package

Not one per app. A fragmented catalogue cannot be read as one thing — by a
person deciding whether a component already exists, or by tooling trying to
learn the inventory. The whole value is that there is a single answer to "what
do we have".

Components that are genuinely app-specific do not belong in the catalogue at
all; they belong in that app's `shared/`. Components a module contributes get
storied from the module, under `PRODUCT` in the taxonomy below.

## Use `@storybook/react-vite`, not the Next framework

A UI package is framework-agnostic React. Pointing its Storybook at
`@storybook/nextjs` drags Next's entire build pipeline into a package that
does not use Next — and as of Storybook 9.1 with Next 16 it does not even work:
the Next preset patches an SWC API (`swc.isWasm`) that Next 16 removed.

`react-vite` is faster, simpler, and correctly scoped.

**The constraint this implies is a feature:** a component using `next/image`,
`next/link` or `next/navigation` cannot live in `packages/ui`. That is the
right boundary. Framework-coupled components belong in an app or in a module's
`ui/`, where the framework is already a given.

## The taxonomy

A Storybook without a shape becomes a pile of buttons. Organise by level of
composition, because that is the order in which things are built and the order
in which someone looks for them:

```
FOUNDATIONS   colours · typography · spacing · radius · shadows · icons · motion
PRIMITIVES    button · input · checkbox · radio · select · switch · tooltip
COMPONENTS    form · modal · drawer · table · tabs · pagination · toast · command palette
PATTERNS      search · filter · sort · upload · auth · empty · error · loading · permission
PRODUCT       dashboard · settings · billing · user management · domain-specific
```

Set `title` to match: `'primitives/Button'`, `'patterns/EmptyState'`,
`'product/Billing/PlanCard'`.

**FOUNDATIONS earns its place** even though it holds no components. A page
showing the actual spacing scale, the actual type ramp and the actual palette
is the only way anyone checks whether a new value already exists before adding
a near-duplicate.

**PATTERNS is the level most catalogues skip**, and it maps exactly onto the
six interface states — an empty state, an error state and a permission state
are reusable patterns, not one-offs to reinvent per screen.

## Which states to story

Every interface state, not just the happy path:

```
empty · loading · error · permission · overflow · offline
```

Plus, for interactive elements, the control states: `default`, `hover`,
`active`, `focus-visible`, `disabled`, `loading`, `error`.

These are exactly the states that are awkward to reach in a running app —
which is why they go unreviewed, and why they are the ones that embarrass you
in production. A story makes each one a link somebody can open.

`empty` needs **three** stories, not one: first-run, filtered-empty, and
cleared. They need different words and different actions, and showing "create
your first record" to someone whose search returned nothing reads as though
their data is gone.

## Writing stories so the inventory is machine-readable

This is the part that is not obvious, and it is why the conventions below are
worth the extra lines.

The `design-stack` plugin reads this Storybook to learn what already exists
before designing anything new. The difference between a catalogue that says
*"there is a Button"* and one that says *"there is a Button with three
variants, three sizes, a loading state and a documented rule about primary
actions"* is the difference between it guessing and it knowing.

Four conventions make that work:

1. **Declare `argTypes` rather than relying on inference.** Include `control`,
   `description`, and `table.type`. Inference gets prop names; it does not get
   the allowed values or what they mean.
2. **Give every component a `Default` story.** It is the baseline everything
   else is read against.
3. **Set `title` to the taxonomy path**, so the sidebar tree *is* the
   inventory.
4. **Write a `Docs` description saying when to use it and when not to.** The
   "when not to" is what stops a component being misapplied, and it is almost
   always missing.

Turn on `reactDocgen: 'react-docgen-typescript'` so real prop types are
extracted rather than guessed.

## Accessibility

Include `@storybook/addon-a11y`. It catches contrast, missing labels and role
problems per story, at the point where they are cheap to fix.

It is not a substitute for keyboard testing — an automated checker cannot tell
you the tab order is illogical — but it removes the whole class of problems
that are embarrassing to find later.

## Common failures

- **One Storybook per app.** Nobody can answer "do we have this".
- **`@storybook/nextjs` for a component library.** Unnecessary coupling, and
  broken on Next 16.
- **No taxonomy.** An alphabetical pile of buttons.
- **Only the happy path storied.** The states that matter go unreviewed.
- **One `empty` story for three different situations.**
- **Inferred `argTypes`.** Names without meanings; the inventory is not
  readable by tooling.
- **No "when not to use it".** The component gets misapplied.
- **Stories that fetch.** A story that needs a backend is not isolated; pass
  data in.
- **The catalogue treated as documentation to write later.** Written later
  means never.
