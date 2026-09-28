# Shared Packages

*Read this when extracting shared code or designing a package's public surface.*

A **package** holds technical capability with no business knowledge: a logger,
a date helper, a UI primitive, a test harness. The moment it needs to know
what a customer or an invoice is, it has become a business capability and
belongs in `modules/` — see
`${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/12-modules.md`.

## When to extract

**The two-consumer rule: extract on the second real consumer, not the first
anticipated one.**

A package with one consumer is indirection with a version boundary attached.
You pay a directory, a manifest, an install entry, a public surface to
maintain, and an extra hop for every reader — and you buy nothing, because
there is still exactly one place the code is used.

Extracting too early is also *worse* than extracting late, because the first
consumer's needs get baked into the API before you know which parts generalise.
The second consumer is what tells you where the real seam is.

The exception: extract immediately when the point is **enforcing consistency**
rather than avoiding duplication. `@repo/eslint-config` has one rule set by
design; having it in a package is what stops each app drifting.

## Exports maps

Declare the public surface explicitly:

```json
"exports": {
  ".": "./src/index.ts",
  "./components/*": "./src/components/*.tsx",
  "./globals.css": "./src/styles/globals.css"
}
```

Anything not listed is unreachable, which is the point: an exports map is how
you keep the freedom to move internals.

**A barrel that re-exports everything defeats this.** Importing one helper
pulls the whole module graph into the consumer's build, tree-shaking gets
harder the moment any of it has side effects, and every consumer now depends
on every part — so nothing can be changed without checking all of them.

Subpath exports (`./components/*`) keep imports specific and the surface
honest.

## Peer dependencies

A UI package declares React as a **peer**, not a dependency:

```json
"peerDependencies": { "react": "catalog:", "react-dom": "catalog:" }
```

If it declares React as a regular dependency, a resolution that installs a
second copy gives you two Reacts in one tree. The symptoms are bizarre —
hooks throwing "invalid hook call", context silently returning defaults,
`instanceof` failing — and the cause is invisible from the error. Peer
dependencies say "the host provides this", which is true.

Same for any library with module-level state: a state manager, a router, an
i18n runtime.

## The `config/*` trio

`eslint-config`, `typescript-config`, `test-config` live under
`packages/config/` as real packages, not root files, so each consumer opts in
explicitly and a package can deviate when it genuinely must.

Two things learned the hard way:

- **The root `tsconfig.json` must depend on `@repo/typescript-config` if it
  extends it.** An `extends` pointing at a package the manifest does not
  declare resolves in some tools and not others, and the error names a file
  rather than the missing dependency.
- **Keep preset nesting shallow.** A preset that extends another preset that
  extends a third resolves differently under different tools' config readers.
  One level is reliable.

## Naming

`@repo/*` for every internal package. Scoping prevents a name colliding with a
registry package, and the prefix makes an internal import obvious on sight.

Name for what it does, not where it sits: `@repo/logger`, not `@repo/utils`. A
package called `utils` accretes everything and has no reason to reject
anything — it is the packages equivalent of a repo-wide `constants.ts`.

## Common failures

- **Extracting on the first consumer.** Indirection with no payoff, and the
  API is shaped by a single case.
- **A barrel re-exporting everything.** Kills tree-shaking, couples every
  consumer to every part.
- **React as a dependency rather than a peer.** Two copies; inexplicable
  errors.
- **`@repo/utils`.** Accretes forever, means nothing.
- **A tsconfig extending an undeclared package.** Resolves in some tools only.
- **Deeply nested config presets.** Fragile across config readers.
- **Business logic in a package.** Cannot declare dependencies, permissions or
  navigation — it should be a module.
