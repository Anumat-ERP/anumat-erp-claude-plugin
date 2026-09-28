# monorepo-stack — Design Spec

**Date:** 2026-09-28
**Status:** Approved for planning
**Repo:** `E:\Chamrong\Project\claude-plugins` (marketplace `chamrong`), plugin #2
**Branch:** `feat/monorepo-stack` from `8c6bd07`

---

## 1. Purpose

Scaffold and maintain a Bun + Turborepo monorepo holding several apps and
shared packages, with Storybook as a first-class layer rather than an
afterthought.

Two halves, both required:

- **Generation** — scripts and templates that create a working workspace, a new
  app, a new shared package, or a Storybook setup.
- **Conventions** — reference files explaining why each decision was made, so
  Claude extends the repo correctly in six months when the templates are no
  longer being read.

Generation alone rots: the moment someone adds app #6 by hand, the conventions
have to live somewhere other than the template that produced app #1.

### Success criteria

1. `/monorepo-stack:init` produces a workspace where `bun install`,
   `bun run build`, `bun run test`, and `bun run storybook:build` all succeed.
2. `/monorepo-stack:add-app` adds an app to that workspace and the same four
   commands still succeed.
3. `/monorepo-stack:add-storybook` works on a repo the plugin did not create,
   including one still on pnpm.
4. `/monorepo-stack:audit` reports real deviations on an existing monorepo
   without modifying it.

Criterion 1 is the acceptance test and it is executed, not reasoned about.

---

## 2. Non-goals

- **Not micro-frontends.** "Several apps in one repo, separately deployed,
  sharing packages" — no Module Federation, no runtime composition, no
  independently versioned fragments.
- **Not a migration tool.** The existing pnpm repo is out of scope. Brownfield
  commands (`add-storybook`, `audit`) work on it; conversion does not happen.
- **Not stack-agnostic.** This plugin commits to one stack. That is the
  opposite of `design-stack`'s rule and is deliberate — an init skill that
  refuses to choose is worthless.
- **Not a design plugin.** No component design guidance, no visual direction.
  `design-stack` owns that; this plugin owns where files live and how the
  workspace is wired.
- **No project-specific content.** Generic. Banned substrings, case-insensitive:
  `fueni`, `nazounki`, `fueni-api`, `fueni-apps`. The reference repo informed
  the conventions; its names appear nowhere.

---

## 3. The stack, pinned

| Layer | Choice | Why this and not the alternative |
|---|---|---|
| Package manager, runtime | **Bun 1.3** | Install speed; native `catalog`/`catalogs`; `bun pm scan` replaces hand-maintained CVE pins |
| Task runner | **Turborepo 2** | `bun run --filter` runs scripts in parallel but has no task graph and no caching. At several apps plus several packages, `dependsOn: ["^build"]` and cache hits are most of CI time |
| Framework | **Next 16**, App Router | — |
| UI | **React 19**, **Tailwind 4** | — |
| Language | **TypeScript 5.9** | — |
| Unit and component tests | **Vitest + Testing Library + MSW** | `bun test` is faster, but Testing Library, jsdom, MSW and Next all assume Vitest or Jest. Test-infrastructure failures are expensive to debug; the speed is not worth the novelty here |
| End-to-end | **Playwright** | — |
| Component isolation | **Storybook 9** | The layer the reference repo lacked entirely |

**Bun is doing install and script-running, not bundling.** Next runs its own
toolchain. This is a real constraint, not a detail: if a generated app hits a
Bun-specific Next problem, the Task 1 acceptance test surfaces it and the
workaround gets documented in `08-brownfield.md`. It does not get papered over.

### What Bun changes from a pnpm workspace

| pnpm | Bun |
|---|---|
| `pnpm-workspace.yaml` | `workspaces: { packages, catalog, catalogs }` in root `package.json` |
| `catalog:` only | `catalog:` plus **named** catalogs — `catalog:testing`, `catalog:build` |
| `.npmrc` with `virtual-store-dir-max-length` | **Not applicable.** That guard exists because pnpm symlinks a deeply nested virtual store past the Windows 260-char limit. Bun does not. Config moves to `bunfig.toml` |
| Hand-maintained `overrides` CVE pins | `bun pm scan`; `overrides` reserved for genuine forced resolutions |
| `pnpm-lock.yaml` | `bun.lock`, text format, committed and reviewable |

`workspace:*` and `@repo/*` internal naming carry over unchanged. Turborepo
detects Bun from the lockfile; the task graph is unaffected.

The `.npmrc` note matters enough to state in `01-workspace.md`: a reader
migrating from pnpm will look for that guard and must be told why it is gone,
rather than concluding it was forgotten.

---

## 4. Repository layout

```
plugins/monorepo-stack/
├── .claude-plugin/plugin.json
├── README.md
├── commands/
│   ├── init.md              /monorepo-stack:init
│   ├── add-app.md           /monorepo-stack:add-app
│   ├── add-package.md       /monorepo-stack:add-package
│   ├── add-storybook.md     /monorepo-stack:add-storybook
│   └── audit.md             /monorepo-stack:audit
├── scripts/                 Node .mjs, no dependencies
│   ├── init.mjs
│   ├── add-app.mjs
│   ├── add-package.mjs
│   ├── add-storybook.mjs
│   ├── audit.mjs
│   └── lib/                 shared: workspace detection, templating, port allocation
├── templates/
│   ├── root/                package.json, turbo.json, bunfig.toml, tsconfig, .gitignore…
│   ├── app/                 Next app: app/ core/ shared/, configs, Dockerfile
│   ├── package/             generic shared package with an exports map
│   ├── ui-package/          the UI package, Storybook-ready
│   ├── storybook/           .storybook/ config and a sample story
│   ├── testing-package/     render helper, MSW server, Vitest setup files
│   ├── e2e-package/         Playwright config and one smoke spec
│   └── config/              eslint-config, typescript-config, test-config
└── skills/monorepo-stack/
    ├── SKILL.md
    └── reference/
        ├── 01-workspace.md
        ├── 02-turborepo.md
        ├── 03-app-anatomy.md
        ├── 04-shared-packages.md
        ├── 05-storybook.md
        ├── 06-testing.md
        ├── 07-conventions.md
        └── 08-brownfield.md
```

### Generated workspace shape

```
<repo>/
├── package.json             workspaces + catalog + catalogs; scripts delegate to turbo
├── turbo.json               build · dev · lint · check-types · test · test:ci · coverage · e2e · storybook:build
├── bunfig.toml
├── bun.lock                 committed
├── tsconfig.json
├── apps/
│   └── <app>/
│       ├── app/             routes — Next App Router
│       ├── core/            app infrastructure: auth, env, i18n, stores, proxy
│       ├── shared/          app-local reuse: component, hook, lib
│       └── …                next.config.ts, vitest.config.ts, Dockerfile, CLAUDE.md
└── packages/
    ├── ui/                  components + .storybook/ + stories
    ├── testing/             render helper, MSW server, setup files
    ├── e2e/                 Playwright
    └── config/
        ├── eslint-config/
        ├── typescript-config/   base · nextjs · react-library
        └── test-config/
```

**`core/` versus `shared/` is the distinction worth encoding.** `core/` is app
infrastructure wired once — auth, env parsing, i18n setup, stores, proxy.
`shared/` is app-local reuse — a component used on three routes. The test: if
it would be meaningless in another app, it is `core/`; if another app would
want it, it belongs in `packages/`, and `shared/` is the waiting room for
things not yet extracted.

---

## 5. Commands

| Command | Does | Brownfield |
|---|---|---|
| `/monorepo-stack:init` | Creates the workspace: root config, `packages/config/*`, `packages/ui` with Storybook, `packages/testing`, one app | no — new only |
| `/monorepo-stack:add-app <name>` | Adds an app, allocates a dev port, wires internal deps, extends turbo and Docker | works on any workspace matching the conventions |
| `/monorepo-stack:add-package <name>` | Adds a shared package with an exports map and the config trio wired | same |
| `/monorepo-stack:add-storybook` | Adds Storybook to the UI package of an existing repo | **yes — including a pnpm repo** |
| `/monorepo-stack:audit` | Reports deviations from the conventions. Read-only, never writes | **yes** |

`add-storybook` and `audit` must not assume Bun. They detect the package
manager from the lockfile and adapt. This is the difference between a plugin
that helps on Monday and one that helps on a repo that does not exist yet.

### Port allocation

`add-app` assigns the next free dev port from a base, recorded in the app's
`package.json` `dev` script and in `07-conventions.md`. Two apps silently
sharing a port is the most common and most confusing failure when adding the
second app.

---

## 6. The skill

**Frontmatter description** must fire on: setting up a monorepo or workspace,
adding an app or shared package to one, questions about workspace layout or
Turborepo tasks, and setting up Storybook. It must NOT fire on ordinary feature
work inside an app that already exists.

**Body:** under ~120 lines. States the stack, the layout, the decision rules,
and routes to `reference/`. Detail lives in the reference files.

**Boundary, stated in the body:** this plugin owns where files live and how the
workspace is wired. `design-stack` owns what a screen contains and how it
behaves. Where they touch — `packages/ui` and its Storybook — this plugin
creates the structure and `design-stack` reads it.

### Reference files

| File | Contains |
|---|---|
| `01-workspace.md` | Bun workspaces, `catalog` vs `catalogs` and when a named catalog earns its keep, `workspace:*`, `bunfig.toml`, committing `bun.lock`, `bun pm scan` vs `overrides`, and why the pnpm `.npmrc` virtual-store guard has no Bun equivalent |
| `02-turborepo.md` | The task graph, `dependsOn: ["^build"]`, cache `inputs`/`outputs` and what a wrong `outputs` costs, `globalEnv`, why Turbo is kept alongside `bun --filter` |
| `03-app-anatomy.md` | `app/` `core/` `shared/`, the core-vs-shared test, per-app config files, port allocation, per-app `CLAUDE.md` |
| `04-shared-packages.md` | When to extract from `shared/` to `packages/`, exports maps and subpath exports, `peerDependencies` for React in a UI package, the `config/*` trio, and the cost of extracting too early |
| `05-storybook.md` | One Storybook in the UI package and why not per-app; story file conventions; which states to story — tied to the six in `design-stack`; **writing stories so the inventory is machine-readable**, which is what `design-stack`'s INVENTORY stage consumes |
| `06-testing.md` | The layering: Vitest unit, Testing Library component, MSW network, Playwright e2e — what belongs at each level; the shared `testing` package; coverage; why `bun test` was not chosen |
| `07-conventions.md` | `@repo/*` naming, versioning, port registry, branch and commit conventions, per-app agent files, what goes in `docs/` |
| `08-brownfield.md` | Adopting pieces of this in a repo that exists: adding Storybook to a pnpm workspace, adopting the config trio incrementally, what `audit` reports and what to fix first. Also the home for any Bun + Next friction found during Task 1 |

---

## 7. Content rules

1. **Generic.** No project names. Banned substrings as in §2.
2. **Templates are real files**, not strings inside scripts. A template you can
   open and read is a template that gets maintained.
3. **Reasoned, not asserted.** Every convention states why, including why the
   rejected alternative was rejected.
4. **Honest about friction.** Where Bun, Next, Turbo or Storybook interact
   badly, say so and give the workaround. Silence reads as "this works
   perfectly" and costs the reader a day.
5. **No design guidance.** Appearance and screen structure belong to
   `design-stack` and `frontend-design`.
6. **Brownfield commands never assume Bun.**

---

## 8. Verification

**Structural** — the existing `node scripts/validate.mjs` must stay green with
a second plugin present. Its `length` and `contrast` checks are keyed to
`design-stack`'s skill names and will simply not apply here; `manifests`,
`frontmatter`, `refs`, `aesthetics`, `commands`, and `orphans` all must pass.
The new skill needs a `SKILL_BODY_MAX` entry so `length` covers it too.

**Functional — the acceptance test.** Bun 1.3.5 is installed. Generate into a
temp directory and run for real:

```
bun install
bun run build
bun run test
bun run storybook:build
```

All four must succeed. Then `add-app`, and all four again. A scaffold that does
not build is worthless, and nothing short of running it proves otherwise. The
temp directory is removed afterwards.

**Brownfield** — `audit` runs read-only against an existing pnpm monorepo on
this machine and produces findings without modifying it. This proves the
package-manager detection works on a repo the plugin did not create. The repo
is a *test target only*: nothing about it, including its name, enters any
shipped file (§2).

**Skill length** — `scripts/validate.mjs` gains a `SKILL_BODY_MAX` entry of
`120` for `monorepo-stack`, so the `length` check covers the new skill rather
than skipping it silently.

---

## 9. Open questions

None. Settled during brainstorming: Bun + Turborepo, not Bun alone; Vitest, not
`bun test`; several apps rather than micro-frontends; new repos only, with
brownfield commands still working on existing ones; one Storybook in the UI
package.
