# __APP_NAME__

Dev port: **__PORT__**. Run with `bun run dev` from the repo root (all apps) or
`bun run dev --filter __APP_NAME__` (this one).

## Where things go

| Directory | Holds | Test |
|---|---|---|
| `app/` | routes, layouts, route handlers | Next App Router conventions |
| `core/` | infrastructure wired once: env, auth, i18n, stores, proxy | would be meaningless in another app |
| `shared/` | app-local reuse: `component/`, `hook/`, `lib/` | used more than once *here*, not yet wanted elsewhere |

Anything a second app would want belongs in `packages/`, not in `shared/`.
`shared/` is the waiting room, not the destination — if a second app has grown
its own copy of something here, that thing should have been extracted.

## Shared code

Import from workspace packages by name: `@repo/ui`, `@repo/testing`. Never
reach across into another app's directory, and never use a relative path that
climbs out of this app.
