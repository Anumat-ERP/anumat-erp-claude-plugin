# Application Architecture

*Read this when deciding where logic lives inside an app or a module.*

## Dependency direction

```
ui  →  application  →  domain
              ↑
       infrastructure
```

`ui` calls use cases. Use cases call domain rules and talk to **ports**.
`infrastructure` implements those ports. Nothing points back — `domain`
imports nothing, and no layer imports `ui`.

The inversion at the bottom is the part people skip. The port is declared in
`application` and implemented in `infrastructure`, so the dependency arrow
points *inward* even though the data flows outward. That is what lets the
inside be tested without the outside existing.

## Business logic does not live in components

The rule people nod at and then break. It has a concrete payoff.

A rule inside a component can only be reached by rendering that component. The
same rule in `domain/` can be called from a page, a route handler, a
background job, a CLI, and a test — and gives the same answer to all of them.
The first time you need server-side validation of a rule that lives in a form
component, you write it twice, and the two copies immediately begin to
disagree.

A component's job is: read state, render, dispatch events. If it is deciding
*what is allowed*, that decision belongs below it.

The test: could you answer this question without a DOM? If yes, it belongs in
`domain/`.

## The server/client boundary is architectural

In the App Router, `'use client'` is not a detail — it is where your program
splits into two programs with different capabilities, different security
properties and different bundles.

Treat it as a boundary you design rather than one you discover:

- **Server by default.** Add `'use client'` at the leaf that genuinely needs
  interactivity, not at the top of the tree for convenience. A `'use client'`
  near the root drags everything below it into the browser bundle.
- **Secrets and privileged calls stay server-side.** Anything a client
  component imports is shippable to the browser — including, transitively, a
  module that reads a key.
- **Permission checks belong on the server.** A hidden button is a courtesy;
  the check that matters is the one an HTTP request cannot skip. Check in the
  use case, not only in the UI.
- **Serialisation is a real constraint.** Only serialisable data crosses the
  boundary. A class instance or a function silently does not survive.

## Where validation goes

At every boundary data crosses, not once:

| Boundary | Validates |
|---|---|
| Form | shape and format, for immediate feedback |
| Use case | business rules — is this transition legal |
| API handler | shape again, because the client is not trusted |
| Domain | invariants that must always hold |

This is not duplication. They answer different questions, and the form check
exists for feedback while the server check exists for correctness. Sharing the
schema between form and handler is fine; sharing the *trust* is not.

## Module boundaries inside an app

`core/` is a set of concerns, not a dumping ground. `core/auth`, `core/env`,
`core/i18n` each own one thing and expose a narrow surface.

When `core/` starts holding something with business meaning, that is a module
trying to be born. See
`${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/12-modules.md`.

## State: pick the narrowest thing that works

1. **Local `useState`** — most state. Start here.
2. **URL** — anything that should survive reload or be shareable: filters,
   tabs, pagination, the open record. Putting these in a store is the most
   common state mistake, and it breaks the back button.
3. **Server cache** (React Query and similar) — anything fetched. It is not
   client state; it is a cache of someone else's state, and treating it as
   client state means writing invalidation by hand.
4. **Global store** — genuinely cross-cutting client state. Rarer than it
   looks once the three above are used properly.

Most "we need a state manager" moments are actually server cache plus URL
state.

## Common failures

- **Business rules in components.** Cannot be reused server-side; gets written
  twice and diverges.
- **`'use client'` near the root.** Drags the tree into the browser bundle.
- **Permission checks only in the UI.** A hidden button stops nobody.
- **Secrets imported transitively into a client component.**
- **Fetched data in a global store.** Hand-written invalidation, forever.
- **Filters and tabs in a store instead of the URL.** Breaks sharing and the
  back button.
- **Validation only at the form.** The API is the boundary that matters.
- **`core/` as a dumping ground.** Each concern owns one thing.
- **Layers imported in the wrong direction.** Once `domain` imports `ui`, the
  fast tests are gone.
