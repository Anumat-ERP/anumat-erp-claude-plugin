# __REPO_NAME__

A Bun + Turborepo monorepo.

## Layout

```
apps/        one directory per deployable app
packages/    shared code: ui, testing, e2e, config/*
```

`core/` inside an app is infrastructure wired once (auth, env, stores).
`shared/` is app-local reuse. Anything a second app wants belongs in
`packages/`.

## Commands

| Command | Does |
|---|---|
| `bun run dev` | every app in parallel |
| `bun run build` | build everything, respecting the task graph |
| `bun run test` | unit and component tests |
| `bun run storybook` | the component library, in isolation |
| `bun run e2e` | Playwright (run `bunx playwright install` once first) |
| `bun run check-types` | type-check every package |
| `bun run lint` | lint every package |

## Adding to it

Internal dependencies use `workspace:*`. Shared external versions live in the
root `workspaces.catalog` and are referenced as `catalog:`, or
`catalog:testing` / `catalog:storybook` for the grouped ones — so a version
bump happens in exactly one place.

Each app owns a distinct dev port. Check the existing `dev` scripts before
assigning a new one.
