---
name: monorepo-stack
description: Use when setting up a monorepo or workspace, adding an app or shared package to one, wiring Turborepo tasks, or setting up Storybook — including requests phrased as "start a new project", "add another app", "share this between apps", or "we need a component library". Scaffolds a Bun + Turborepo workspace with Next, Vitest and Storybook, and supplies the conventions to extend it. Not for feature work inside an app that already exists.
---

# Monorepo Stack

A monorepo is cheap to start and expensive to restructure. The decisions made
in the first hour — where code lives, what is shared, how tasks depend on one
another, whether components can be looked at in isolation — are the ones every
later commit paves over. This plugin makes those decisions once, deliberately,
and then keeps making them the same way.

## The stack

| Layer | Choice | Why this and not the alternative |
|---|---|---|
| Package manager, runtime | Bun 1.3 | Install speed; native `catalog`/`catalogs`; `bun pm scan` replaces hand-maintained CVE pins |
| Task runner | Turborepo 2 | `bun run --filter` runs scripts in parallel but has no task graph and no caching. Across several apps and packages, `dependsOn: ["^build"]` and cache hits are most of CI time |
| Framework | Next 16, App Router | — |
| UI | React 19, Tailwind 4 | — |
| Language | TypeScript 5.9 | — |
| Unit and component tests | Vitest + Testing Library + MSW | `bun test` is faster, but Testing Library, jsdom, MSW and Next all assume Vitest or Jest. Test-infrastructure failures are expensive to debug |
| End-to-end | Playwright | — |
| Component isolation | Storybook 10 | The layer most monorepos skip, and the one that makes the component inventory legible |

**Bun does install and script-running, not bundling.** Next runs its own
toolchain underneath. This matters when something breaks: the failure is
usually Next's, not Bun's. Known friction is recorded in
`${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/08-brownfield.md`.

## Generated layout

```
<repo>/
├── package.json          workspaces + catalog + catalogs; scripts use bun --filter
├── turbo.json            build · dev · lint · check-types · test · coverage · e2e · storybook
├── bunfig.toml
├── bun.lock              committed
├── apps/
│   └── <app>/
│       ├── app/          routes — Next App Router
│       ├── core/         app infrastructure: auth, env, i18n, stores, proxy
│       └── shared/       app-local reuse: component, hook, lib
├── modules/              business capabilities, composed by apps
│   └── <capability>/     domain · application · infrastructure · ui · security
└── packages/
    ├── ui/               components + .storybook/ + stories
    ├── module-kit/       manifest contract; load order, permissions, navigation
    ├── testing/          render helper, MSW server, setup files
    ├── e2e/              Playwright
    └── config/           eslint-config · typescript-config · test-config
```

## `core/` versus `shared/`

The test, applied to any file you are about to place:

- Would it be **meaningless in another app**? It is `core/` — auth wiring, env
  parsing, i18n setup, the store, the proxy.
- Would **another app want it**? It belongs in `packages/`.
- Neither yet? `shared/` is the waiting room.

`shared/` is explicitly temporary. Something that sat there while a second app
grew its own copy is something that should have been extracted. Detail in
`${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/03-app-anatomy.md`.

## Commands

| Command | Does | Works on an existing repo |
|---|---|---|
| `/monorepo-stack:init` | Creates the workspace, one app, and the shared packages | no — new only |
| `/monorepo-stack:add-app` | Adds an app and allocates a free dev port | yes |
| `/monorepo-stack:add-module` | Adds a business capability: domain, use cases, UI, permissions | yes |
| `/monorepo-stack:add-package` | Adds a shared technical package with an exports map | yes |
| `/monorepo-stack:add-storybook` | Adds Storybook to a UI package | yes — any package manager |
| `/monorepo-stack:audit` | Reports deviations. Read-only, never writes | yes |

## Boundary

This plugin owns **where files live and how the workspace is wired**. The
`design-stack` plugin owns **what a screen contains and how it behaves**;
`frontend-design` owns how it looks.

They touch at `packages/ui` and its Storybook: this plugin creates that
structure, and `design-stack` reads it to learn which components already exist
before designing anything new. That is why stories here are written to be
machine-readable, not only human-browsable.

## Reference index

| Read this when | File |
|---|---|
| Setting up the workspace, catalogs, or lockfile policy | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/01-workspace.md` |
| Wiring or debugging Turborepo tasks and caching | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/02-turborepo.md` |
| Placing a file inside an app, or adding an app | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/03-app-anatomy.md` |
| Extracting shared code, or designing an exports map | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/04-shared-packages.md` |
| Setting up Storybook or writing stories | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/05-storybook.md` |
| Deciding what to test and at which layer | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/06-testing.md` |
| Naming, versioning, ports, ADRs, commit conventions | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/07-conventions.md` |
| Adopting any of this in a repo that already exists | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/08-brownfield.md` |
| **Implementing a feature** — constants, naming, functions, types | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/09-code-quality.md` |
| Deciding where logic lives, or crossing the server/client line | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/10-app-architecture.md` |
| Reaching for a design pattern — and checking you need one | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/11-patterns.md` |
| Adding a business capability, or module vs package | `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/12-modules.md` |

## When not to use this skill

Feature work inside an app that already exists — routes, components, business
logic — is ordinary development and needs none of this. A single-package repo
with no second consumer in sight does not need to become a monorepo; the
structure costs real overhead and repays it only when something is genuinely
shared. Styling changes belong to `frontend-design`.

The test: **are you changing where code lives, or what the code does?** Where
it lives is this skill. What it does is not.
