# Brownfield

*Read this when adopting any of this in a repository that already exists, and
for the known friction in this stack.*

## Adopt in this order

Ordered by blast radius. Never all at once — a big-bang migration gets
abandoned halfway, leaving a repo in two states at once, which is worse than
either.

| Step | Changes | Risk |
|---|---|---|
| 1. Config packages | nothing at runtime | lowest — pure refactor |
| 2. Storybook | additive only | low — nothing existing breaks |
| 3. `modules/` for **new** capabilities | new code only | low — leave existing code alone |
| 4. Turborepo | CI and local task running | medium — caching can mislead |
| 5. Package manager | everything | highest — do it alone, on its own branch |

Steps 1–3 are safe enough to do incrementally alongside feature work. Step 4
changes how builds are invoked. Step 5 changes the lockfile, the layout and
the CI image, and deserves to be the only thing in its pull request.

**Do not retrofit `modules/` onto existing code as a migration project.** Use
it for the next capability, and extract an old one only when you are already
changing it for another reason. A mass reorganisation produces an enormous
diff, no behaviour change, and a fortnight of merge conflicts for everyone.

## Adding Storybook to a repo that is not Bun

`/monorepo-stack:add-storybook` detects the package manager from the lockfile
and prints the install command for it. It works on pnpm, npm and yarn
workspaces.

It finds the UI package by name (`ui`, `design-system`, `components`) or takes
`--package packages/<dir>`. It refuses if `.storybook/` already exists rather
than overwriting.

This is usually the highest-value first step in an existing monorepo: purely
additive, and it makes the component inventory legible — to people deciding
whether something already exists, and to the `design-stack` plugin, which
reads it before designing anything new.

## Reading an audit report

`/monorepo-stack:audit` never writes and always exits 0.

Fix in this order:

1. **`no-lockfile`** — installs are not reproducible; nothing else can be
   trusted until this is true.
2. **`port-collision`** — two apps cannot run together, and the symptom is
   confusing enough to waste an afternoon.
3. **`module-missing-dependency`** — composition breaks at runtime rather than
   at install.
4. **`internal-not-workspace`** — a range can silently resolve to a published
   copy instead of the local package.
5. Everything else, when convenient.

`no-modules` and `no-adr` are reported as minor on purpose. They are worth
doing and neither is urgent.

## Known friction

Findings from actually running this stack, not from reading changelogs. Tested
2026-09-28 with Bun 1.3.5, Node 22.13.1, Next 16.3.6, Storybook 9.1.20,
Turborepo 2.11.5, on Windows 11.

### Turborepo cannot spawn Bun on Windows

```
x Unable to find package manager binary: cannot find binary path
```

Ruled out: the `packageManager` field, `devEngines.packageManager`, an
extensionless `bun` shim on a real Windows path, and Turbo 2.3.4 / 2.5.8 /
2.11.5. The same repository with `packageManager: "npm@10.9.2"` runs tasks
fine, so it is specific to Turbo → Bun → Windows.

**Workaround, and what the templates ship:** root scripts use
`bun run --filter`, which works everywhere and respects dependency order.
`turbo.json` and `turbo:*` scripts remain for macOS, Linux and CI — which is
usually Linux, and where the caching matters most.

### `@storybook/nextjs` 9.1 is incompatible with Next 16

```
TypeError: swc.isWasm is not a function
```

The Next framework preset patches Next's SWC loader and calls an API Next 16
removed.

**Workaround, and the better design anyway:** the UI package uses
`@storybook/react-vite`. A component library is framework-agnostic React and
has no reason to pull in Next's build pipeline. The constraint this creates —
components using `next/image` or `next/navigation` cannot live in
`packages/ui` — is the correct boundary.

### A root `tsconfig.json` that extends an undeclared package

A root config extending `@repo/typescript-config/base.json` without declaring
that package in the root `devDependencies` resolves under plain `tsc` and
fails under Storybook's Next TS CLI, with `TS6053: File ... not found`. The
error names the file, not the missing dependency.

**Fix:** declare it. The templates do.

### jest-dom matchers untyped across a package boundary

`toBeInTheDocument` does not typecheck when the setup file that registers it
lives in another workspace package: `tsc` never sees the global augmentation.

**Fix:** a local `vitest.d.ts` in each consuming package containing
`import '@testing-library/jest-dom/vitest';`.

### Bun's `--filter` is not a Turborepo replacement

It runs scripts across the workspace in dependency order, which is enough for
correctness. It does **not** cache. On Windows that is what you have; in CI,
prefer Turbo.

## What this plugin will not do

- Migrate a package manager. The commands detect and adapt; they do not
  convert.
- Convert a build system.
- Restructure an existing app's internals.
- Retrofit `modules/` across a codebase.

Each is a project with its own risk, and bundling one into a scaffolder is how
a helpful tool becomes one nobody dares run.

## Common failures

- **Big-bang migration.** Abandoned halfway; repo in two states.
- **Package manager changed first.** Highest risk, done before anything is
  proven.
- **Mass retrofit of `modules/`.** Huge diff, no behaviour change, endless
  conflicts.
- **Turbo adopted on Windows with Bun.** It does not work.
- **Treating the audit as a gate.** It reports; a gate gets disabled.
