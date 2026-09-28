# monorepo-stack

Scaffolds and maintains a Bun + Turborepo monorepo: several apps, business
capability modules, shared packages, and Storybook as a first-class layer.

A monorepo is cheap to start and expensive to restructure. This plugin makes
the early decisions once — where code lives, what is shared, how tasks depend
on each other — and then keeps making them the same way.

## The stack

| Layer | Choice | Why this and not the alternative |
|---|---|---|
| Package manager, runtime | Bun 1.3 | Install speed; native `catalog`/`catalogs`; `bun pm scan` replaces hand-maintained CVE pins |
| Task runner | Turborepo 2 | `bun --filter` has no task graph and no caching. See the Windows caveat below |
| Framework | Next 16, App Router | — |
| UI | React 19, Tailwind 4 | — |
| Language | TypeScript 5.9 | — |
| Tests | Vitest + Testing Library + MSW | `bun test` is faster, but Testing Library, jsdom, MSW and Next all assume Vitest or Jest |
| End-to-end | Playwright | — |
| Component isolation | Storybook 9 (`react-vite`) | Not the Next framework: a UI package is framework-agnostic React |

## Three layers

```
apps/       deployable. Compose modules; own routing, layout, data loading.
modules/    business capability. Own domain rules, permissions, data.
packages/   technical capability. No business knowledge.
```

**Dependencies point one way: `apps → modules → packages`.** A package that
knows what an invoice is has become a module.

Modules are the Odoo idea translated: the unit of modularity is the business
capability, and a module declares what it depends on, the permissions it
defines and the navigation it contributes — so apps compose modules instead of
importing into their internals.

## Commands

| Command | Does | Works on an existing repo |
|---|---|---|
| `/monorepo-stack:init` | Creates the workspace, one app, shared packages | no — new only |
| `/monorepo-stack:add-app` | Adds an app, allocates a free dev port | yes |
| `/monorepo-stack:add-module` | Adds a business capability with all its layers | yes |
| `/monorepo-stack:add-package` | Adds a technical package with an exports map | yes |
| `/monorepo-stack:add-storybook` | Adds Storybook to a UI package | yes — any package manager |
| `/monorepo-stack:audit` | Reports deviations. Read-only, never writes | yes |

## Version resolution

`init` resolves catalog versions from the npm registry rather than shipping
whatever the template author typed — hardcoded pins are wrong within weeks,
and silently so.

By default it stays **inside the major the template pins**. The template owns
the majors on purpose: "newest" and "works together" are different questions,
and resolving each dependency to its own latest is how you get a workspace
that installs but does not build. `--latest` crosses majors deliberately. If
the registry is unreachable it keeps the template pins and says so loudly.

## Two caveats, stated up front

**Turborepo cannot spawn Bun on Windows.** Tested, not assumed: 2.3.4, 2.5.8
and 2.11.5 all fail; the same repo with npm declared works fine. Generated
root scripts therefore use `bun run --filter`, which works everywhere and
respects dependency order. `turbo.json` and `turbo:*` scripts ship for macOS,
Linux and CI.

**Bun does install and script-running, not bundling.** Next runs its own
toolchain. When something breaks in a build, it is usually Next's, not Bun's.

Both, with the full diagnosis, are in `reference/08-brownfield.md`.

## Templates

Grouped by what each produces:

```
templates/
├── workspace/   the repo root
├── app/         a deployable Next app
├── module/      a business capability
├── package/     generic · ui · testing · e2e · module-kit
├── config/      eslint · typescript · test
└── overlay/     storybook — applied INTO a package, not a package itself
```

The `overlay` distinction matters: Storybook config is files dropped into an
existing package, and grouping it beside real packages was misleading.

## Reference

Twelve files under `skills/monorepo-stack/reference/`, covering the workspace,
Turborepo, app anatomy, shared packages, Storybook, testing, conventions,
brownfield adoption, code quality, application architecture, design patterns,
and modules.

`09-code-quality.md`, `10-app-architecture.md` and `11-patterns.md` are about
the code inside the files rather than where the files go — when a literal
earns a name, where business logic lives, and which design patterns modern
TypeScript has already subsumed.

## Verifying

```
node scripts/test.mjs         # 6 test files, 37 tests, no dependencies
node scripts/acceptance.mjs   # generates a workspace and runs the real toolchain
```

The acceptance test is the one that matters: it scaffolds into a temp
directory, adds a second app and a module, then runs `bun install`,
`bun run build`, `bun run test` and `bun run storybook:build` for real. A
scaffold that does not build is worthless, and nothing short of running it
proves otherwise. It found four genuine defects during development.

## How it relates to `design-stack`

This plugin creates `packages/ui` and its Storybook. The `design-stack` plugin
**reads** them, to learn what components already exist before designing
anything new.

That is why `05-storybook.md` asks for declared `argTypes` and a `Docs` block:
it is the difference between a catalogue saying "there is a Button" and one
saying "there is a Button with three variants, three sizes and a loading
state".

## Licence

MIT.
