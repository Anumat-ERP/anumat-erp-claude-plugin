# Workspace

*Read this when setting up the workspace, managing shared dependency versions,
or deciding what the lockfile policy is.*

## Bun workspaces

Bun declares workspaces inside the root `package.json`, not a separate file:

```json
{
  "workspaces": {
    "packages": ["apps/*", "modules/*", "packages/*", "packages/config/*"],
    "catalog": { "react": "^19.2.0" },
    "catalogs": { "testing": { "vitest": "^3.2.4" } }
  }
}
```

`packages/config/*` is listed separately because a glob does not recurse —
`packages/*` matches the `config` directory itself, not the packages inside
it.

## `catalog` versus `catalogs`

A **catalog entry** is a version declared once and referenced everywhere:

```json
{ "dependencies": { "react": "catalog:", "vitest": "catalog:testing" } }
```

Use the default `catalog` for things every package might need — React,
TypeScript, Zod. Use a **named** catalog when a set of packages must move
together: the testing stack, the Storybook stack. Bumping Vitest without
bumping `@vitest/coverage-v8` produces a failure whose message names neither,
and a named catalog makes them one edit.

The rule: **a named catalog earns its keep when the versions inside it are
coupled.** Grouping by vague theme just adds a name to remember.

Internal dependencies use `workspace:*`, never a version range. A range can
resolve to a published copy from the registry instead of the local package,
and the resulting "why is my change not taking effect" is genuinely hard to
diagnose. `/monorepo-stack:audit` reports this.

## `bunfig.toml`

Bun's own configuration. Install behaviour, test defaults, registry settings.

**There is no Bun equivalent of pnpm's `.npmrc` `virtual-store-dir-max-length`
guard, and you do not need one.** That setting exists because pnpm symlinks a
deeply nested virtual store whose paths exceed the Windows 260-character limit
for tools that are not long-path aware. Bun does not use that layout. If you
are migrating from pnpm and looking for where that guard went: it is gone, and
its absence is not an oversight.

## The lockfile

**Commit `bun.lock`.** It is text, so it reviews in a diff — a dependency
appearing in a PR is visible rather than buried in a binary blob.

Use `bun install --frozen-lockfile` in CI. Without it, CI silently resolves a
different tree from the one that was tested, which is the failure mode
lockfiles exist to prevent.

## `bun pm scan` versus `overrides`

`bun pm scan` checks the installed tree against advisory databases. Run it in
CI and before a release.

Hand-maintained `overrides` pinning transitive dependencies for CVEs is a
pattern worth retiring: the list grows, nothing tells you when an entry is
obsolete, and stale pins hold packages *below* a version that fixed something
else. Keep `overrides` for genuine forced resolutions — a package needing a
peer it declares wrongly — and let scanning handle vulnerabilities.

## Version resolution at scaffold time

`init` resolves catalog versions from the registry rather than shipping
whatever the template author typed, because hardcoded pins are wrong within
weeks and silently so — the repo looks current and is several minors behind.

By default it stays **inside the major the template pins**. The template owns
the majors on purpose: "newest" and "works together" are different questions,
and resolving every dependency to its own latest is how you get a workspace
that installs but does not build. `--latest` crosses majors deliberately.

If the registry is unreachable it keeps the template pins and says so loudly.
A silent fallback looks identical to a successful resolve, which is worse than
failing.

## Common failures

- **A version range for an internal dependency.** Can resolve to a published
  copy; changes appear not to take effect.
- **`packages/*` expected to match `packages/config/*`.** Globs do not recurse.
- **Lockfile not committed, or CI without `--frozen-lockfile`.** CI tests a
  tree nobody else has.
- **Bumping one member of a coupled set.** Use a named catalog.
- **Porting pnpm's `.npmrc` guards to Bun.** They address a layout Bun does
  not use.
- **`overrides` as a CVE list.** Grows forever, goes stale silently, and
  eventually holds packages back.
- **Catalog entries hardcoded at scaffold time.** Wrong within weeks.
