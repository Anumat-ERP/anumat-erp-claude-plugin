# Turborepo

*Read this when wiring or debugging tasks and caching.*

## Read this first: Turbo cannot drive Bun on Windows

Turborepo fails to spawn the Bun binary on Windows:

```
x Unable to find package manager binary: cannot find binary path
```

This was tested, not assumed. Turbo 2.3.4, 2.5.8 and 2.11.5 all fail
identically; `packageManager`, `devEngines.packageManager`, and an
extensionless `bun` shim on a real Windows path make no difference; the same
repository with `packageManager: "npm@10.9.2"` runs tasks fine. It is specific
to Turbo → Bun → Windows.

So the generated root scripts use `bun run --filter`, which works on every
platform and respects workspace dependency order. `turbo.json` and `turbo:*`
scripts still ship, for macOS, Linux and CI — which is usually Linux, and
where the caching is most valuable anyway.

Nothing below is wasted if you only ever run Turbo in CI. But do not spend an
afternoon trying to make `turbo:build` work on a Windows laptop.

## The task graph

```json
"build": { "dependsOn": ["^build"], "outputs": [".next/**", "!.next/cache/**"] }
```

`^build` means *build in every dependency first*. The caret is the whole
point: without it, `build` in one package can start before the package it
imports has produced anything.

`dependsOn: ["build"]` without the caret means a task in the **same** package.
Both forms are legitimate and they are easy to confuse.

## Inputs and outputs

`inputs` decides what invalidates the cache. `outputs` decides what is
restored on a hit.

**A wrong `outputs` is worse than no cache at all.** Too narrow and a cache hit
restores an incomplete build that fails downstream in a way that looks like a
source problem. Too broad and you cache `node_modules` or a `.cache` directory
and the restore is slower than rebuilding.

Exclusions matter: `"!.next/cache/**"` keeps the framework's own cache out of
the artifact. Without it you cache a cache.

## `cache: false` and `persistent`

`dev` and `e2e` set `cache: false`: a dev server has no output to restore, and
a cached e2e run is a test that did not happen. `dev` also sets
`persistent: true`, which tells Turbo the task never exits and nothing may
depend on it.

## `globalEnv`

Environment variables that affect the build must be listed in `globalEnv`.

**An unlisted variable silently poisons the cache.** Turbo hashes inputs to
decide whether to restore; if `API_URL` is not part of the hash, a build made
with the staging URL is served as a cache hit for production. Everything looks
fine and the wrong value ships. This is the most damaging Turbo
misconfiguration and it produces no error.

## Why keep Turbo when `bun --filter` exists

`bun run --filter '*' build` runs scripts across the workspace in dependency
order. It is enough for a small repo, and on Windows it is what you have.

What it does not do: cache. At several apps and a dozen packages, most CI time
is spent rebuilding things that did not change, and a remote cache shared
across CI and developers removes it. That is worth one configuration file.

The honest summary: **`--filter` for correctness, Turbo for speed.** Use
`--filter` as the default so the repo works everywhere, and Turbo where it
runs.

## Common failures

- **Unlisted `globalEnv`.** Cache hits serve builds made with different
  configuration. Silent and severe.
- **`dependsOn: ["build"]` where `["^build"]` was meant.** Packages build
  before their dependencies.
- **`outputs` too narrow.** Cache hits restore incomplete builds.
- **`outputs` too broad.** Caching `node_modules`; restores slower than
  building.
- **Cached `e2e` or `dev`.** A cached test is not a test.
- **Fighting Turbo on Windows with Bun.** It does not work; use `--filter`.
- **Turbo added to a three-package repo.** The caching does not pay for the
  configuration yet.
