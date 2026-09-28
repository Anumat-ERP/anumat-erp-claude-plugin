# Design Patterns

*Read this when reaching for a pattern — and to check whether you need one.*

## Most of the catalogue is already in the language

The Gang of Four patterns were solutions to problems in 1994 C++ and Java:
no first-class functions, no structural typing, no modules, no algebraic types.
Modern TypeScript has all four, and it subsumes most of the catalogue:

| Pattern | What replaces it |
|---|---|
| Strategy | a function parameter |
| Command | a closure |
| Template Method | composition, or a callback |
| Decorator | a higher-order function, or JSX composition |
| Singleton | a module — it is already one instance |
| Observer | an event emitter, or a store subscription |
| Iterator | `for...of` and generators |
| Visitor | a discriminated union with an exhaustive `switch` |
| Factory | usually just a function that returns a thing |

Reaching for the pattern name here adds a class, a file and a vocabulary
lookup, and buys nothing the language does not already give you.

## The anti-pattern, stated plainly

**Applying a pattern to demonstrate that you know it.**

A pattern is a response to a pressure the code is already under. Applied
before that pressure exists it is pure cost: indirection to read through,
abstraction to maintain, and a shape that constrains the code in a direction
nobody has needed yet. "We might need to swap this later" is not a pressure;
it is a guess, and the guess is usually wrong about *which* axis will need to
vary.

Write the direct version. When the second case arrives, the right seam is
visible rather than imagined.

## The ones that still earn their place

### State — for a genuine mode machine

When an object moves between modes with **illegal transitions**: an editor, a
wizard, an order, a payment.

In TypeScript the right expression is almost never a class hierarchy. Use a
discriminated union and a transition table:

```ts
const TRANSITIONS = {
  draft:    ['active'],
  active:   ['archived'],
  archived: [],
} as const satisfies Record<Status, readonly Status[]>;
```

This gives you something a class hierarchy cannot: the compiler proves you
handled every state, and the legal transitions are **data** — printable,
testable, reviewable in a diff — rather than scattered across methods.

A `switch` over the discriminant with a `never` check in the default is an
exhaustiveness proof. Add a state, and every place that must handle it fails
to compile.

Use it when transitions are constrained. Do not use it for a boolean with a
nice name.

### Adapter — at a third-party boundary

Wrap an external service in an interface **you** own, so a vendor change is
one file. This is the `infrastructure/` layer in a module: the port is yours,
the adapter implements it, and nothing else knows the vendor exists.

Worth it when the dependency is genuinely likely to change, or when the
vendor's API is awkward enough that you do not want it spread through the
codebase. Not worth it for a wrapper around `JSON.parse`.

### Strategy — when selection is genuinely at runtime

Three or more algorithms, chosen at runtime, each non-trivial. Tax
calculation per jurisdiction, pricing per plan.

In TypeScript this is a `Record<Key, Fn>`, not a class hierarchy. If there are
two and the choice is known at compile time, it is an `if`.

### Factory — when construction is conditional or complex

Assembling an object needs several decisions, or a dependency graph. A
function returning the constructed thing is enough; it does not need a class
called `ThingFactory`.

## Composition over inheritance, and why it is not just taste

Inheritance couples a subclass to its parent's *implementation*, not just its
interface — a change to a protected method breaks subclasses that never
referenced it, and the compiler cannot warn you because nothing about the
signature changed.

Composition couples to an interface you chose. In React this is settled:
components take children and props; there is no component inheritance and
nobody misses it.

The rare case for inheritance is a genuine is-a with shared invariants —
custom `Error` subclasses being the common one, because `instanceof` is the
point.

## Common failures

- **A pattern applied before the pressure exists.** Cost with no benefit, and
  the guessed axis is usually wrong.
- **`ThingFactory`, `ThingManager`, `AbstractThingStrategy`.** The name of the
  pattern is not the name of the thing.
- **A class hierarchy for state in TypeScript.** Loses exhaustiveness
  checking; the transitions stop being inspectable.
- **Strategy for two compile-time-known cases.** That is an `if`.
- **Singleton as a class.** A module already is one.
- **Adapter around something that will never change.** Indirection for its own
  sake.
- **Inheritance for code reuse.** Couples to implementation; use composition.
- **Boolean pairs where a union belongs.** See
  `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/09-code-quality.md`.
