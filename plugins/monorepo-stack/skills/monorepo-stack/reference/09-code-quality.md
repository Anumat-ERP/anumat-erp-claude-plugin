# Code Quality

*Read this when implementing a feature — naming, constants, function shape.*

## Constants: when a literal needs a name

The rule is not "magic numbers are bad". Plenty of literals are clearer inline.

**Name it when:**

1. **It appears twice and the occurrences must change together.** This is the
   real test. Two `3`s that mean different things are not duplication, and
   giving them one name creates a coupling that did not exist — now changing
   the retry count also changes the column span.
2. **Its meaning is not readable at the use site.** `setTimeout(fn, 300)` says
   nothing; `setTimeout(fn, DEBOUNCE_MS)` says why.
3. **It encodes a business rule someone will go looking for.** A free-tier
   limit, a retry count, a maximum upload size. Someone will ask "where is
   that set" and the answer should be findable.
4. **It belongs to a set that should be enumerated.** Statuses, roles, event
   names — as a `const` object or a union, so the compiler knows the set.

**Leave it inline when:**

1. **Used once, in the place it means something.** `slice(0, 1)` does not need
   `FIRST_ITEM`.
2. **Structural or mathematical.** `index + 1`, `width / 2`, `* 100` for a
   percentage.
3. **The name would restate the value.** `const ZERO = 0` adds a lookup and no
   information.
4. **It is in a test.** A test's literals *are* its specification. Extracting
   `EXPECTED_TOTAL` hides what is being asserted and lets the fixture and the
   assertion drift into agreeing with each other while both are wrong.

**Where it lives matters as much as whether it exists.** Same file if one file
uses it. A package-level `constants.ts` only when genuinely shared across that
package. **Never a repo-wide `constants.ts`** — it has no cohesion, every file
imports it, it never rejects anything, and it becomes the place values go to
be forgotten.

## Naming

Name for what a thing *is* or *does*, not how it is implemented.
`activeSubscriptions` beats `filteredArray`; `hasExpired()` beats
`checkDate()`.

Length should scale with scope. `i` inside a three-line loop is fine; a module
export called `data` is not. The reader of a short-scoped name has the context
in view; the reader of an exported one does not.

Booleans read as assertions: `isActive`, `hasPermission`, `canArchive`. A
boolean called `status` or `flag` forces the reader to find the definition to
know which way round it is.

Avoid `utils`, `helpers`, `common`, `misc`, `manager`, `data`. They accept
anything, so they accumulate everything and communicate nothing. If you cannot
name the module for what it holds, you have not decided what it holds.

## Functions

**Early return over nesting.** Guard clauses at the top, the real work
unindented at the bottom. Three levels of nested `if` is usually two guards
and a body.

**A boolean parameter is usually two functions.** `render(true)` is unreadable
at the call site, and the body is two functions sharing a name with an `if`
between them. `renderCompact()` and `renderFull()` are clearer for both reader
and caller.

**Size is a symptom, not a rule.** A 60-line function doing one linear thing
is fine; a 15-line one making three unrelated decisions is not. The useful
question is whether you can name it without "and".

**One level of abstraction per function.** A function that both orchestrates
steps and does string manipulation forces the reader to change altitude
mid-read. Push the detail down.

## Types

**Parse, don't cast.** `as Record` moves the failure from the boundary to
somewhere unrelated, and the stack trace points at the victim rather than the
cause. Validate at the edge — where data enters from the network, a file, or a
form — and the inside of the program can trust its types.

**Name a type when it has meaning beyond its shape.** `type UserId = string`
earns its place because it stops you passing an order id. `type Props = {...}`
inline in a component does not need extracting.

**Prefer unions to booleans for state.** `status: 'idle' | 'loading' | 'error'`
makes illegal combinations unrepresentable; `isLoading` plus `hasError`
permits both true at once and somebody will eventually produce it.

**`readonly` and `as const` by default** for data that should not change.
Cheap, and it turns a class of bugs into compile errors.

## Comments

Comment **why**, not what. The code says what. A comment restating it goes
stale the moment the code changes and then actively misleads.

Worth writing: why the obvious approach was rejected, what invariant must
hold, where a workaround comes from and what would let it be removed. A
comment naming the upstream issue behind a workaround is worth a great deal to
whoever finds it later.

## Common failures

- **Extracting every literal.** `const ONE = 1`; noise, no information.
- **One constant for two unrelated uses.** Invents a coupling.
- **A repo-wide `constants.ts`.** No cohesion; everything imports it.
- **Extracted constants in tests.** Hides the specification.
- **`utils`, `helpers`, `manager`.** Accept anything, mean nothing.
- **Boolean parameters.** Unreadable at the call site.
- **Deep nesting where guards would do.**
- **`as` instead of parsing.** Failure surfaces far from the cause.
- **Boolean pairs for state.** Illegal combinations become representable.
- **Comments restating the code.** Go stale, then mislead.
