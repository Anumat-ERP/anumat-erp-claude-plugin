# App Anatomy

*Read this when placing a file inside an app, or adding an app.*

## The three directories

```
app/       routes, layouts, route handlers — Next App Router conventions
core/      infrastructure wired once: env, auth, i18n, stores, proxy
shared/    app-local reuse: component/, hook/, lib/
```

## `core/` versus `shared/`, decided

Apply in order:

1. **Would it be meaningless in another app?** → `core/`. Auth wiring, env
   parsing, the store instance, the API proxy. These are *this application's*
   plumbing; another app has its own.
2. **Would another app want it?** → it does not belong in this app at all.
   Technical capability goes to `packages/`; anything carrying business
   meaning goes to a module.
3. **Neither yet?** → `shared/`.

`shared/` is a waiting room, not a destination. Something that has sat there
while a second app grew its own copy of it is something that should have been
extracted — and the duplicate has by now drifted, which is the expensive part.

The common mistake is the reverse: putting a genuinely app-specific thing in
`packages/` "to be tidy". Now it has a version boundary, a public surface, and
a second consumer nobody wanted, for no benefit.

## What goes in `core/`

| Directory | Holds |
|---|---|
| `env/` | parse and validate environment **once**, at startup |
| `auth/` | session handling, the current-user accessor |
| `i18n/` | locale setup and message loading |
| `stores/` | client state instances |
| `proxy/` | server-side request forwarding, header handling |

**Environment is parsed at the edge, not read in a component.** A component
reading `process.env` turns a missing variable into an undefined deep inside a
render; parsing at startup turns it into a clear failure before anything is
served.

## Per-app configuration

Each app owns its `next.config.ts`, `vitest.config.ts`, `tsconfig.json`,
`postcss.config.mjs` and `Dockerfile`. They extend shared presets from
`packages/config/*` rather than duplicating settings, but the files exist per
app because apps genuinely differ — different ports, different transpiled
packages, different environment.

A single root config that every app is forced to share breaks the first time
one app needs something the others do not, and the workaround is always worse
than the duplication would have been.

## Ports

Every app has a distinct dev port, written into its `dev` script. `add-app`
allocates the lowest free one by reading the existing scripts.

Two apps on one port is silent until somebody runs both — and then the second
appears to start and serves the first one's pages, which is confusing enough
to lose real time to. `/monorepo-stack:audit` reports collisions as critical.

Record the allocation in `docs/standards/` once you have more than about three
apps, so somebody adding one by hand does not have to grep.

## The per-app `CLAUDE.md`

Each app gets one, stating: what the app is, its port, what goes in `core/`
versus `shared/`, and that shared code is imported by package name rather than
by a relative path climbing out of the app.

It is short on purpose. A long one does not get read, and its value is being
present in context when something is being edited — not being comprehensive.

## Composing modules

An app mounts business capability from `modules/` rather than growing its own.
It owns routing, layout and data loading; a module contributes route
fragments, components, permissions and navigation entries.

The test that an app has taken on too much: a capability in `apps/admin` that
`apps/web` now also needs. That should have been a module from the start, and
extracting it after both apps have their own version is several times the
work. See `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/12-modules.md`.

## Common failures

- **`process.env` read in a component.** A config error becomes a render
  crash.
- **`shared/` as a permanent home.** Two apps, two drifting copies.
- **App-specific code hoisted to `packages/`.** A version boundary bought for
  nothing.
- **A shared root config forced on every app.** Breaks at the first genuine
  difference.
- **Port collisions.** Silent, and confusing when found.
- **Relative imports climbing out of an app.** Import by package name, or the
  boundary is not real.
- **Business capability grown inside an app.** The second app needing it pays
  several times over.
