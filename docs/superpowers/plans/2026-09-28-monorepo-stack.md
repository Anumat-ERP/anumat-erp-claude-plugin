# monorepo-stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `plugins/monorepo-stack/` — a Bun + Turborepo monorepo scaffolder with Storybook as a first-class layer, plus the conventions that let Claude extend a generated repo correctly later.

**Architecture:** Five commands over five Node scripts and a directory of real file templates, backed by one skill with eight reference files. Brownfield commands (`add-storybook`, `audit`) detect the package manager and do not assume Bun. The acceptance test is executable: generate into a temp directory and actually run `bun install && bun run build && bun run test && bun run storybook:build`.

**Tech Stack:** Bun 1.3.5 (installed), Turborepo 2, Next 16 App Router, React 19, TypeScript 5.9, Tailwind 4, Vitest + Testing Library + MSW, Playwright, Storybook 9. Plugin scripts are Node `.mjs`, stdlib only, matching `scripts/validate.mjs`.

**Spec:** `docs/superpowers/specs/2026-09-28-monorepo-stack-design.md`

## Global Constraints

Copied from spec §2, §3 and §7. Every task's requirements include these.

- **Generic.** Banned substrings, case-insensitive, anywhere under `plugins/`: `fueni`, `nazounki`, `fueni-api`, `fueni-apps`.
- **Templates are real files**, never strings inside scripts. A template you can open is a template that gets maintained.
- **Reasoned, not asserted.** Every convention states why, including why the rejected alternative was rejected.
- **Honest about friction.** Where Bun, Next, Turbo or Storybook interact badly, say so and give the workaround. Silence reads as "this works perfectly".
- **No design guidance.** Appearance and screen structure belong to `design-stack` and `frontend-design`.
- **Brownfield commands never assume Bun** — detect from the lockfile.
- **Path convention:** every routed path is anchored `${CLAUDE_PLUGIN_ROOT}/skills/<skill>/<dir>/<file>.md`. The `refs` check rejects the bare form.
- **Pinned versions:** Bun 1.3, Turborepo 2, Next 16, React 19, TypeScript 5.9, Tailwind 4, Storybook 9, Node >=22.
- **Internal naming:** `@repo/*`. Internal deps use `workspace:*`; shared external deps use `catalog:` or `catalog:<name>`.
- **Plugin version** `0.1.0`, MIT, author `Chamrong Thor <thorchamrong.dev@gmail.com>`.

## Review Focus

Five failure modes the spec implies that no happy path exercises. Each has a test assigned to the task that owns it.

1. **The scaffold does not build.** Templates that look right and fail on `bun install` or `bun run build` — the single most likely failure, and the whole plugin is worthless if it happens. → Task 4, Step 5 (real execution).
2. **Second app collides with the first.** Same dev port, or `add-app` overwrites shared root config. Silent until someone runs both. → Task 6, Steps 4–5.
3. **Brownfield command assumes Bun.** `add-storybook` run on a pnpm repo emits `bun.lock` expectations or the wrong install command. → Task 7, Step 4 (run against a real pnpm workspace).
4. **`audit` writes.** A read-only command that modifies the repo it inspects, on someone's real codebase. → Task 8, Step 4 (checksum the tree before and after).
5. **Validator silently skips the new skill.** `SKILL_BODY_MAX` is keyed by skill name, so an unlisted skill has no body cap and progressive disclosure goes unenforced. → Task 2, Step 2.

---

## File Structure

```
plugins/monorepo-stack/
├── .claude-plugin/plugin.json        T1
├── README.md                          T9
├── commands/
│   ├── init.md                        T5
│   ├── add-app.md                     T6
│   ├── add-package.md                 T6
│   ├── add-storybook.md               T7
│   └── audit.md                       T8
├── scripts/
│   ├── lib/workspace.mjs              T3  detection, paths, JSON edit, ports
│   ├── lib/template.mjs               T3  copy + token substitution
│   ├── init.mjs                       T4
│   ├── add-app.mjs                    T6
│   ├── add-package.mjs                T6
│   ├── add-storybook.mjs              T7
│   └── audit.mjs                      T8
├── templates/
│   ├── root/                          T4
│   ├── config/{eslint,typescript,test}-config/  T4
│   ├── testing-package/               T4
│   ├── ui-package/                    T4
│   ├── storybook/                     T4
│   ├── app/                           T4
│   ├── package/                       T6
│   └── e2e-package/                   T6
└── skills/monorepo-stack/
    ├── SKILL.md                       T2
    └── reference/
        ├── 01-workspace.md            T10
        ├── 02-turborepo.md            T10
        ├── 03-app-anatomy.md          T10
        ├── 04-shared-packages.md      T11
        ├── 05-storybook.md            T11
        ├── 06-testing.md              T11
        ├── 07-conventions.md          T12
        └── 08-brownfield.md           T12
```

**Responsibility split:** `lib/workspace.mjs` owns everything that reads or edits an existing workspace — package-manager detection, workspace root discovery, JSON mutation, port allocation — so the four generator scripts contain only their own composition logic. `lib/template.mjs` owns copying and token substitution. Reference files are written last (Tasks 10–12) because Task 4's real execution is what determines which friction is worth documenting.

---

## Task 1: Plugin skeleton

**Files:**
- Create: `plugins/monorepo-stack/.claude-plugin/plugin.json`
- Modify: `.claude-plugin/marketplace.json`

**Interfaces:**
- Consumes: the `manifests` check in `scripts/validate.mjs`, which requires `source` to be a `./`-prefixed forward-slash path and `version` to match between both manifests.
- Produces: a second entry in `marketplace.json`, proving the marketplace works with more than one plugin.

- [ ] **Step 1: Run the validator to establish the green baseline**

Run: `cd "E:/Chamrong/Project/claude-plugins" && node scripts/validate.mjs`
Expected: exit 0, `8 check(s) passed`.

- [ ] **Step 2: Add the marketplace entry, and watch it fail**

Append to the `plugins` array in `.claude-plugin/marketplace.json`:

```json
{
  "name": "monorepo-stack",
  "description": "Scaffold and maintain a Bun + Turborepo monorepo: several apps, shared packages, and Storybook as a first-class layer, with the conventions to extend it correctly.",
  "source": "./plugins/monorepo-stack",
  "category": "productivity",
  "version": "0.1.0",
  "author": {
    "name": "Chamrong Thor",
    "email": "thorchamrong.dev@gmail.com"
  },
  "tags": ["monorepo", "bun", "turborepo", "storybook", "scaffolding", "nextjs"]
}
```

Run: `node scripts/validate.mjs`
Expected: exit 1, `FAIL: manifests: plugin monorepo-stack: source dir ./plugins/monorepo-stack does not exist`

- [ ] **Step 3: Create the plugin manifest**

Create `plugins/monorepo-stack/.claude-plugin/plugin.json`:

```json
{
  "name": "monorepo-stack",
  "description": "Scaffold and maintain a Bun + Turborepo monorepo: several apps, shared packages, and Storybook as a first-class layer, with the conventions to extend it correctly.",
  "version": "0.1.0",
  "author": {
    "name": "Chamrong Thor",
    "email": "thorchamrong.dev@gmail.com"
  },
  "homepage": "https://github.com/thorchamrong/claude-plugins"
}
```

No `skills` or `commands` keys — the directories are at their default locations, and no official plugin declares them there.

- [ ] **Step 4: Run the validator**

Run: `node scripts/validate.mjs`
Expected: exit 1, now `FAIL: frontmatter: plugins/monorepo-stack has no skills/ directory`. The manifests check passes; the skill is Task 2.

- [ ] **Step 5: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add .claude-plugin/marketplace.json plugins/monorepo-stack/.claude-plugin/plugin.json
git commit -m "feat(monorepo-stack): plugin manifest and marketplace entry"
```

---

## Task 2: The skill body and its length cap

**Files:**
- Create: `plugins/monorepo-stack/skills/monorepo-stack/SKILL.md`
- Modify: `scripts/validate.mjs` — add `monorepo-stack: 120` to `SKILL_BODY_MAX`

**Interfaces:**
- Consumes: `SKILL_BODY_MAX` from `scripts/validate.mjs`; the anchored path convention.
- Produces: the reference index that Tasks 10–12 must match filename-for-filename, and the `refs` red state listing the eight unwritten reference files.

- [ ] **Step 1: Write the failing test — cap the new skill's body**

The `length` check reads `SKILL_BODY_MAX[skillName]` and does nothing when the name is absent, so a new skill is silently uncapped. (Review Focus item 5.)

In `scripts/validate.mjs`, change:

```js
const SKILL_BODY_MAX = { 'design-stack': 150, 'design-evidence': 80 };
```

to:

```js
const SKILL_BODY_MAX = {
  'design-stack': 150,
  'design-evidence': 80,
  'monorepo-stack': 120,
};
```

- [ ] **Step 2: Prove the cap is live before writing the real body**

Create `plugins/monorepo-stack/skills/monorepo-stack/SKILL.md` with valid frontmatter and a deliberately over-long body:

```bash
cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack/skills/monorepo-stack"
{
  printf -- '---\n'
  printf 'name: monorepo-stack\n'
  printf 'description: Placeholder description long enough to clear the forty character minimum imposed by the frontmatter check.\n'
  printf -- '---\n\n'
  for i in $(seq 1 130); do printf 'filler line %s\n' "$i"; done
} > SKILL.md
cd "E:/Chamrong/Project/claude-plugins" && node scripts/validate.mjs
```

Expected: `FAIL: length: plugins/monorepo-stack/skills/monorepo-stack/SKILL.md body is 130 lines, cap is 120 — move detail into a reference file`

Without this step the cap could be wrong — a typo in the key would leave the skill uncapped and the check would still report green.

- [ ] **Step 3: Write the real SKILL.md**

Replace the file entirely. Frontmatter:

```yaml
---
name: monorepo-stack
description: Use when setting up a monorepo or workspace, adding an app or shared package to one, wiring Turborepo tasks, or setting up Storybook — including requests phrased as "start a new project", "add another app", "share this between apps", or "we need a component library". Scaffolds a Bun + Turborepo workspace with Next, Vitest and Storybook, and supplies the conventions to extend it. Not for feature work inside an app that already exists.
---
```

Body — **≤ 120 lines**, in this order:

1. **One paragraph** on what the plugin is for: a monorepo is cheap to start and expensive to restructure, so the early decisions — where code lives, what is shared, how tasks depend on each other — are worth making deliberately once.
2. **The stack table**, verbatim from spec §3 including the *why not the alternative* column. Six rows minimum: Bun, Turborepo, Next, Vitest, Playwright, Storybook.
3. **The Bun caveat**, stated plainly: Bun does install and script-running; Next runs its own toolchain. Point at `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/08-brownfield.md` for known friction.
4. **The generated layout** as a fenced tree, from spec §4.
5. **`core/` vs `shared/`** — the one-line test: if it would be meaningless in another app it is `core/`; if another app would want it, it belongs in `packages/`; `shared/` is the waiting room. Full detail in `03-app-anatomy.md`.
6. **Commands table** — the five, one line each, marking which work on repos this plugin did not create.
7. **Boundary** — this plugin owns where files live and how the workspace is wired; `design-stack` owns what a screen contains. Where they touch (`packages/ui` and its Storybook) this plugin creates the structure and `design-stack` reads it.
8. **Reference index** — a table of the eight files with a *read this when* trigger, paths anchored so `refs` sees them.
9. **When not to use this skill** — feature work inside an existing app, a single-package repo that has no reason to become a monorepo, a styling change.

- [ ] **Step 4: Run the validator**

Run: `node scripts/validate.mjs`
Expected: exit 1, `length` now passes, and eight `FAIL: refs:` lines for the unwritten reference files. That is the correct red state and it is Tasks 10–12's to-do list.

- [ ] **Step 5: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add scripts/validate.mjs plugins/monorepo-stack/skills/monorepo-stack/SKILL.md
git commit -m "feat(monorepo-stack): skill body, and cap it in the validator

Proved the cap fires before writing the real body: a 130-line filler body
produced the expected length failure."
```

---

## Task 3: Script library

**Files:**
- Create: `plugins/monorepo-stack/scripts/lib/workspace.mjs`
- Create: `plugins/monorepo-stack/scripts/lib/template.mjs`
- Create: `plugins/monorepo-stack/scripts/lib/self-test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces, from `workspace.mjs`:
  - `detectPackageManager(root) -> 'bun' | 'pnpm' | 'npm' | 'yarn' | null` — from the lockfile, never from `packageManager` alone
  - `findWorkspaceRoot(startDir) -> string | null` — walks up for a `package.json` with a `workspaces` field or a `pnpm-workspace.yaml`
  - `readJson(path) -> object`, `writeJson(path, obj) -> void` — two-space indent, trailing newline
  - `listWorkspacePackages(root) -> {name, dir, manifest}[]`
  - `nextFreePort(root, base = 3000) -> number` — scans every app's `dev` script for `--port <n>`
  - `installCommand(pm) -> string`, `runCommand(pm, script) -> string`
- Produces, from `template.mjs`:
  - `renderTree(srcDir, destDir, tokens) -> string[]` — copies recursively, substitutes `__TOKEN__` in file contents *and* in file and directory names, returns written paths. Refuses to overwrite an existing file unless `tokens.__FORCE__` is set.
- Produces, from `self-test.mjs`: a dependency-free test runner — `test(name, fn)`, `assert(cond, msg)`, `assertEqual(a, b, msg)`, and `run()` which prints `ok`/`not ok` per test and exits non-zero on any failure.

`self-test.mjs` exists because these scripts need unit tests and the plugin has no test framework. Adding Vitest to the plugin repo to test a scaffolder would be heavier than the fifteen lines this takes.

- [ ] **Step 1: Write the failing test**

Create `plugins/monorepo-stack/scripts/lib/workspace.test.mjs`:

```js
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { test, assertEqual, run } from './self-test.mjs';
import {
  detectPackageManager,
  findWorkspaceRoot,
  nextFreePort,
  readJson,
  writeJson,
} from './workspace.mjs';

const fixture = () => mkdtempSync(join(tmpdir(), 'mrs-'));

test('detectPackageManager reads the lockfile, not the packageManager field', () => {
  const dir = fixture();
  writeFileSync(join(dir, 'bun.lock'), '');
  writeFileSync(join(dir, 'package.json'), '{"packageManager":"pnpm@9.0.0"}');
  assertEqual(detectPackageManager(dir), 'bun', 'lockfile wins over packageManager');
  rmSync(dir, { recursive: true, force: true });
});

test('detectPackageManager recognises a pnpm workspace', () => {
  const dir = fixture();
  writeFileSync(join(dir, 'pnpm-lock.yaml'), '');
  assertEqual(detectPackageManager(dir), 'pnpm');
  rmSync(dir, { recursive: true, force: true });
});

test('detectPackageManager returns null when there is no lockfile', () => {
  const dir = fixture();
  assertEqual(detectPackageManager(dir), null);
  rmSync(dir, { recursive: true, force: true });
});

test('findWorkspaceRoot walks up from a nested directory', () => {
  const dir = fixture();
  writeFileSync(join(dir, 'package.json'), '{"workspaces":["apps/*"]}');
  const nested = join(dir, 'apps', 'web', 'src');
  mkdirSync(nested, { recursive: true });
  assertEqual(findWorkspaceRoot(nested), dir);
  rmSync(dir, { recursive: true, force: true });
});

test('findWorkspaceRoot finds a pnpm workspace with no workspaces field', () => {
  const dir = fixture();
  writeFileSync(join(dir, 'package.json'), '{"name":"root"}');
  writeFileSync(join(dir, 'pnpm-workspace.yaml'), 'packages:\n  - "apps/*"\n');
  assertEqual(findWorkspaceRoot(dir), dir);
  rmSync(dir, { recursive: true, force: true });
});

test('nextFreePort skips ports already taken by existing apps', () => {
  const dir = fixture();
  writeFileSync(join(dir, 'package.json'), '{"workspaces":["apps/*"]}');
  for (const [app, port] of [['a', 3000], ['b', 3001], ['c', 3003]]) {
    const appDir = join(dir, 'apps', app);
    mkdirSync(appDir, { recursive: true });
    writeFileSync(
      join(appDir, 'package.json'),
      JSON.stringify({ name: app, scripts: { dev: `next dev --port ${port}` } }),
    );
  }
  assertEqual(nextFreePort(dir, 3000), 3002, 'fills the gap before extending');
  rmSync(dir, { recursive: true, force: true });
});

test('writeJson round-trips and ends with a newline', () => {
  const dir = fixture();
  const p = join(dir, 'x.json');
  writeJson(p, { b: 1, a: 2 });
  assertEqual(readJson(p).a, 2);
  assertEqual(readFileSync(p, 'utf8').endsWith('\n'), true);
  rmSync(dir, { recursive: true, force: true });
});

run();
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/lib/workspace.test.mjs`
Expected: FAIL — `Cannot find module './self-test.mjs'`

- [ ] **Step 3: Write `self-test.mjs`**

```js
/** Dependency-free test runner for the scaffolder scripts. */
const TESTS = [];
let failures = 0;

export const test = (name, fn) => TESTS.push([name, fn]);

export function assert(cond, msg = 'assertion failed') {
  if (!cond) throw new Error(msg);
}

export function assertEqual(actual, expected, msg = '') {
  if (actual !== expected) {
    throw new Error(`${msg}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`);
  }
}

export function run() {
  for (const [name, fn] of TESTS) {
    try {
      fn();
      console.log(`ok   ${name}`);
    } catch (err) {
      failures++;
      console.log(`NOT OK ${name}\n  ${err.message}`);
    }
  }
  console.log(`\n${TESTS.length - failures}/${TESTS.length} passed`);
  process.exit(failures ? 1 : 0);
}
```

- [ ] **Step 4: Write `workspace.mjs`**

```js
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const LOCKFILES = [
  ['bun.lock', 'bun'],
  ['bun.lockb', 'bun'],
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  ['package-lock.json', 'npm'],
];

/** Detect the package manager from the lockfile. The lockfile is what the repo
 *  actually installed with; `packageManager` is an intention that may be stale. */
export function detectPackageManager(root) {
  for (const [file, pm] of LOCKFILES) {
    if (existsSync(join(root, file))) return pm;
  }
  return null;
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function writeJson(path, obj) {
  writeFileSync(path, `${JSON.stringify(obj, null, 2)}\n`);
}

/** Walk up looking for a workspace root: a package.json with a `workspaces`
 *  field, or a pnpm-workspace.yaml beside one. */
export function findWorkspaceRoot(startDir) {
  let dir = resolve(startDir);
  for (;;) {
    const manifest = join(dir, 'package.json');
    if (existsSync(manifest)) {
      if (existsSync(join(dir, 'pnpm-workspace.yaml'))) return dir;
      try {
        if (readJson(manifest).workspaces) return dir;
      } catch {
        /* unreadable manifest: keep walking */
      }
    }
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

const dirsIn = (path) =>
  existsSync(path)
    ? readdirSync(path).filter((n) => statSync(join(path, n)).isDirectory())
    : [];

export function listWorkspacePackages(root) {
  const out = [];
  for (const group of ['apps', 'packages']) {
    for (const name of dirsIn(join(root, group))) {
      const manifest = join(root, group, name, 'package.json');
      if (!existsSync(manifest)) continue;
      out.push({ name, dir: join(root, group, name), manifest: readJson(manifest) });
    }
  }
  return out;
}

/** Lowest free dev port at or above `base`, reading every app's dev script.
 *  Two apps on one port is silent until someone runs both. */
export function nextFreePort(root, base = 3000) {
  const taken = new Set();
  for (const pkg of listWorkspacePackages(root)) {
    const dev = pkg.manifest.scripts?.dev ?? '';
    const match = /--port[= ](\d+)/.exec(dev);
    if (match) taken.add(Number(match[1]));
  }
  let port = base;
  while (taken.has(port)) port++;
  return port;
}

export const installCommand = (pm) => `${pm ?? 'bun'} install`;

export const runCommand = (pm, script) =>
  pm === 'npm' ? `npm run ${script}` : `${pm ?? 'bun'} run ${script}`;
```

- [ ] **Step 5: Run the tests**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/lib/workspace.test.mjs`
Expected: `7/7 passed`, exit 0.

- [ ] **Step 6: Write `template.mjs` and its failing test**

Create `plugins/monorepo-stack/scripts/lib/template.test.mjs`:

```js
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { test, assert, assertEqual, run } from './self-test.mjs';
import { renderTree } from './template.mjs';

test('renderTree substitutes tokens in contents, filenames and directory names', () => {
  const src = mkdtempSync(join(tmpdir(), 'mrs-src-'));
  const dest = mkdtempSync(join(tmpdir(), 'mrs-dst-'));
  mkdirSync(join(src, '__NAME__-dir'));
  writeFileSync(join(src, '__NAME__-dir', '__NAME__.txt'), 'hello __NAME__ on port __PORT__');

  renderTree(src, dest, { __NAME__: 'web', __PORT__: '3001' });

  const out = join(dest, 'web-dir', 'web.txt');
  assert(existsSync(out), 'token applied to directory and file names');
  assertEqual(readFileSync(out, 'utf8'), 'hello web on port 3001');
  rmSync(src, { recursive: true, force: true });
  rmSync(dest, { recursive: true, force: true });
});

test('renderTree refuses to overwrite an existing file', () => {
  const src = mkdtempSync(join(tmpdir(), 'mrs-src-'));
  const dest = mkdtempSync(join(tmpdir(), 'mrs-dst-'));
  writeFileSync(join(src, 'a.txt'), 'new');
  writeFileSync(join(dest, 'a.txt'), 'existing');

  let threw = false;
  try {
    renderTree(src, dest, {});
  } catch {
    threw = true;
  }
  assert(threw, 'must refuse rather than clobber');
  assertEqual(readFileSync(join(dest, 'a.txt'), 'utf8'), 'existing');
  rmSync(src, { recursive: true, force: true });
  rmSync(dest, { recursive: true, force: true });
});

run();
```

Run: `node scripts/lib/template.test.mjs`
Expected: FAIL — `Cannot find module './template.mjs'`

- [ ] **Step 7: Write `template.mjs`**

```js
import { readdirSync, statSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const substitute = (text, tokens) =>
  Object.entries(tokens).reduce(
    (acc, [key, value]) => (key === '__FORCE__' ? acc : acc.split(key).join(value)),
    text,
  );

/**
 * Copy a template tree, substituting __TOKEN__ in file contents and in file
 * and directory names. Refuses to overwrite unless tokens.__FORCE__ is set:
 * a scaffolder that clobbers is a scaffolder nobody runs twice.
 */
export function renderTree(srcDir, destDir, tokens) {
  const written = [];
  mkdirSync(destDir, { recursive: true });

  for (const entry of readdirSync(srcDir)) {
    const from = join(srcDir, entry);
    const to = join(destDir, substitute(entry, tokens));

    if (statSync(from).isDirectory()) {
      written.push(...renderTree(from, to, tokens));
      continue;
    }
    if (existsSync(to) && !tokens.__FORCE__) {
      throw new Error(`refusing to overwrite ${to}`);
    }
    writeFileSync(to, substitute(readFileSync(from, 'utf8'), tokens));
    written.push(to);
  }
  return written;
}
```

- [ ] **Step 8: Run both test files**

Run:
```bash
cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack"
node scripts/lib/workspace.test.mjs && node scripts/lib/template.test.mjs
```
Expected: `7/7 passed` then `2/2 passed`, exit 0.

- [ ] **Step 9: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/monorepo-stack/scripts/lib/
git commit -m "feat(monorepo-stack): script library with dependency-free tests

detectPackageManager reads the lockfile rather than the packageManager
field, because brownfield commands must not assume Bun."
```

---

## Task 4: `init` — templates and the executable acceptance test

**Files:**
- Create: `plugins/monorepo-stack/templates/root/**`
- Create: `plugins/monorepo-stack/templates/config/{eslint-config,typescript-config,test-config}/**`
- Create: `plugins/monorepo-stack/templates/testing-package/**`
- Create: `plugins/monorepo-stack/templates/ui-package/**`
- Create: `plugins/monorepo-stack/templates/storybook/**`
- Create: `plugins/monorepo-stack/templates/app/**`
- Create: `plugins/monorepo-stack/templates/e2e-package/**`
- Create: `plugins/monorepo-stack/scripts/init.mjs`

**Interfaces:**
- Consumes: `renderTree`, `nextFreePort`, `writeJson` from Task 3.
- Produces: `node scripts/init.mjs <targetDir> [--app <name>]` creating a workspace. Tasks 6–8 assume the layout it generates: `apps/<name>/`, `packages/ui`, `packages/testing`, `packages/config/*`, root `package.json` with `workspaces.packages`, `workspaces.catalog`, `workspaces.catalogs`.

This is the task that decides whether the plugin is worth anything. Its test is not a unit test — it runs the real toolchain.

- [ ] **Step 1: Write the acceptance test**

Create `plugins/monorepo-stack/scripts/acceptance.mjs`:

```js
/**
 * Generates a workspace into a temp dir and runs the real toolchain against it.
 * A scaffold that does not build is worthless, and nothing short of running it
 * proves otherwise.
 *
 *   node scripts/acceptance.mjs            generate, verify, delete
 *   node scripts/acceptance.mjs --keep     leave the directory for inspection
 */
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KEEP = process.argv.includes('--keep');
const target = mkdtempSync(join(tmpdir(), 'mrs-acceptance-'));

const step = (label, cmd, cwd) => {
  process.stdout.write(`\n=== ${label} ===\n${cmd}\n`);
  execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, CI: '1' } });
};

let failed = null;
try {
  step('generate', `node "${join(HERE, 'init.mjs')}" "${target}" --app web`, HERE);
  step('install', 'bun install', target);
  step('build', 'bun run build', target);
  step('test', 'bun run test', target);
  step('storybook:build', 'bun run storybook:build', target);

  for (const path of ['package.json', 'turbo.json', 'bunfig.toml', 'apps/web', 'packages/ui/.storybook']) {
    if (!existsSync(join(target, path))) throw new Error(`missing generated path: ${path}`);
  }
  console.log('\nACCEPTANCE PASS');
} catch (err) {
  failed = err;
  console.error(`\nACCEPTANCE FAIL: ${err.message}`);
} finally {
  if (KEEP) console.log(`\nkept: ${target}`);
  else rmSync(target, { recursive: true, force: true });
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/acceptance.mjs`
Expected: `ACCEPTANCE FAIL`, exit 1 — `Cannot find module .../init.mjs`

- [ ] **Step 3: Write the templates**

Token convention: `__APP_NAME__`, `__PORT__`, `__PKG_NAME__`, `__REPO_NAME__`.

**`templates/root/`**

`package.json`:
```json
{
  "name": "__REPO_NAME__",
  "private": true,
  "type": "module",
  "workspaces": {
    "packages": ["apps/*", "packages/*", "packages/config/*"],
    "catalog": {
      "next": "16.3.3",
      "react": "^19.2.0",
      "react-dom": "^19.2.0",
      "typescript": "5.9.2",
      "tailwindcss": "^4",
      "@tailwindcss/postcss": "^4.3.0",
      "@types/node": "^22.15.3",
      "@types/react": "19.2.2",
      "@types/react-dom": "19.2.2",
      "zod": "^4.4.3"
    },
    "catalogs": {
      "testing": {
        "vitest": "^4.1.11",
        "@vitest/coverage-v8": "^4.1.11",
        "@testing-library/react": "^16.3.2",
        "@testing-library/jest-dom": "^6.9.1",
        "@testing-library/user-event": "^14.6.1",
        "jsdom": "^29.1.1",
        "msw": "^2.14.6"
      },
      "storybook": {
        "storybook": "^9.0.0",
        "@storybook/nextjs": "^9.0.0",
        "@storybook/addon-a11y": "^9.0.0"
      }
    }
  },
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "check-types": "turbo run check-types",
    "test": "turbo run test",
    "test:ci": "turbo run test:ci",
    "coverage": "turbo run coverage",
    "e2e": "turbo run e2e",
    "storybook": "turbo run storybook",
    "storybook:build": "turbo run storybook:build",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "prettier": "^3.7.4",
    "turbo": "^2.9.18",
    "typescript": "catalog:"
  },
  "engines": { "node": ">=22" }
}
```

`turbo.json`:
```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": { "cache": false, "persistent": true },
    "lint": { "dependsOn": ["^build"] },
    "check-types": { "dependsOn": ["^build"] },
    "test": { "dependsOn": ["^build"] },
    "test:ci": { "dependsOn": ["^build"], "outputs": ["coverage/**"] },
    "coverage": { "dependsOn": ["^build"], "outputs": ["coverage/**"] },
    "e2e": { "dependsOn": ["^build"], "cache": false },
    "storybook": { "cache": false, "persistent": true },
    "storybook:build": { "dependsOn": ["^build"], "outputs": ["storybook-static/**"] }
  }
}
```

`bunfig.toml`:
```toml
[install]
# Peer dependencies are installed by default; kept explicit so the intent
# survives a Bun default change.
peer = true

[test]
coverage = false
```

`.gitignore`: `node_modules`, `.next`, `dist`, `coverage`, `storybook-static`, `.turbo`, `*.log`, `.env*.local`
`.nvmrc`: `22`
`tsconfig.json`: `{ "extends": "@repo/typescript-config/base.json", "include": [], "files": [] }`
`.prettierrc.json`: `{ "semi": true, "singleQuote": true, "trailingComma": "all" }`
`README.md`: the workspace layout, the five commands, how to add an app.

**`templates/config/typescript-config/`** — `package.json` naming it `@repo/typescript-config`, plus `base.json` (strict, `moduleResolution: "bundler"`, `target: "ES2022"`), `nextjs.json` (extends base, `jsx: "preserve"`, the Next plugin), `react-library.json` (extends base, `jsx: "react-jsx"`).

**`templates/config/eslint-config/`** — `@repo/eslint-config` with a flat config exporting a base and a Next variant.

**`templates/config/test-config/`** — `@repo/test-config` exporting a shared Vitest config factory: jsdom environment, the setup files from `@repo/testing`, v8 coverage.

**`templates/testing-package/`** — `@repo/testing`, exports map exactly:
```json
"exports": {
  "./render": "./src/render/render.tsx",
  "./msw/server": "./src/msw/server.ts",
  "./setup/msw": "./src/setup/msw.ts"
}
```
with a Testing Library `render` wrapper, an MSW node server, and a setup file registering it.

**`templates/ui-package/`** — `@repo/ui`, `react` and `react-dom` as `peerDependencies` (a UI package that depends on React directly risks two copies in the tree), subpath exports, one real `Button` component with its test and its story, `src/styles/globals.css` with Tailwind 4's `@import "tailwindcss"`.

**`templates/storybook/`** — `.storybook/main.ts` (framework `@storybook/nextjs`, stories glob `../src/**/*.stories.@(ts|tsx)`, a11y addon) and `.storybook/preview.ts` importing `globals.css`. Rendered into `packages/ui/`.

**`templates/app/`** — a Next App Router app:
```
apps/__APP_NAME__/
├── app/{layout.tsx,page.tsx,globals.css}
├── core/{env/index.ts,stores/.gitkeep}
├── shared/{component/.gitkeep,hook/.gitkeep,lib/.gitkeep}
├── package.json          dev script pinned to --port __PORT__
├── next.config.ts
├── tsconfig.json         extends @repo/typescript-config/nextjs.json
├── vitest.config.ts      from @repo/test-config
├── postcss.config.mjs
├── Dockerfile
└── CLAUDE.md             what this app is, its port, its internal layout
```
`app/page.tsx` imports `Button` from `@repo/ui` so the workspace link is exercised by the build rather than merely declared.

**`templates/e2e-package/`** — `@repo/e2e` with `playwright.config.ts` and
`tests/smoke.spec.ts`. Installing `@playwright/test` does not download browsers
— that needs a separate `playwright install` — so including this package costs
the acceptance test nothing, and `bun run e2e` is deliberately not one of the
four commands it runs.

- [ ] **Step 4: Write `init.mjs`**

```js
#!/usr/bin/env node
/** Create a Bun + Turborepo workspace. Usage: node init.mjs <dir> [--app <name>] */
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTree } from './lib/template.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const TEMPLATES = join(HERE, '..', 'templates');

const args = process.argv.slice(2);
const target = resolve(args.find((a) => !a.startsWith('--')) ?? '.');
const appIndex = args.indexOf('--app');
const appName = appIndex === -1 ? 'web' : args[appIndex + 1];

if (existsSync(target) && readdirSync(target).length > 0) {
  console.error(`refusing to scaffold into a non-empty directory: ${target}`);
  process.exit(1);
}
mkdirSync(target, { recursive: true });

const tokens = {
  __REPO_NAME__: basename(target),
  __APP_NAME__: appName,
  __PORT__: '3000',
  __PKG_NAME__: 'ui',
};

renderTree(join(TEMPLATES, 'root'), target, tokens);
for (const cfg of ['eslint-config', 'typescript-config', 'test-config']) {
  renderTree(join(TEMPLATES, 'config', cfg), join(target, 'packages', 'config', cfg), tokens);
}
renderTree(join(TEMPLATES, 'testing-package'), join(target, 'packages', 'testing'), tokens);
renderTree(join(TEMPLATES, 'ui-package'), join(target, 'packages', 'ui'), tokens);
renderTree(join(TEMPLATES, 'storybook'), join(target, 'packages', 'ui'), tokens);
renderTree(join(TEMPLATES, 'e2e-package'), join(target, 'packages', 'e2e'), tokens);
renderTree(join(TEMPLATES, 'app'), join(target, 'apps', appName), tokens);

console.log(`scaffolded ${basename(target)} with app "${appName}" on port 3000`);
console.log('next: bun install && bun run dev');
```

- [ ] **Step 5: Run the acceptance test — the real toolchain**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/acceptance.mjs`
Expected: `ACCEPTANCE PASS`, exit 0, having actually completed `bun install`, `bun run build`, `bun run test`, and `bun run storybook:build`.

**This will not pass first time.** Version conflicts, a missing peer, a Storybook and Next mismatch, or a Bun-specific Next issue are all likely. Each failure is fixed in the templates, not worked around in the script, and **each one that is genuinely Bun-, Turbo- or Storybook-specific gets written down for `08-brownfield.md` in Task 12** — that friction log is one of the more valuable things this task produces. Re-run until it passes. (Review Focus item 1.)

If a failure proves to be an upstream incompatibility with no reasonable workaround, record it as a ruling, pin the last working version in the catalog, and state the constraint in the template's README rather than leaving it undocumented.

- [ ] **Step 6: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/monorepo-stack/templates plugins/monorepo-stack/scripts/init.mjs plugins/monorepo-stack/scripts/acceptance.mjs
git commit -m "feat(monorepo-stack): templates and init, verified by real execution

Acceptance test runs bun install, build, test and storybook:build against
a generated workspace."
```

---

## Task 5: The `init` command

**Files:**
- Create: `plugins/monorepo-stack/commands/init.md`

**Interfaces:**
- Consumes: `scripts/init.mjs` from Task 4, invoked as `${CLAUDE_PLUGIN_ROOT}/scripts/init.mjs`.
- Produces: `/monorepo-stack:init`.

- [ ] **Step 1: Write the command**

```markdown
---
description: Scaffold a new Bun + Turborepo monorepo with Next, Vitest and Storybook.
argument-hint: [target directory] [app name]
---

Scaffold a monorepo at: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/01-workspace.md` before
running anything, so you can explain what is being created rather than only
creating it.

## Before scaffolding

Confirm with the user: the target directory, the first app's name, and that
Bun is available (`bun --version`). If the directory exists and is not empty,
the script refuses — say so rather than suggesting `--force`, which does not
exist.

## Run

    node "${CLAUDE_PLUGIN_ROOT}/scripts/init.mjs" <target> --app <name>

Then, in the target directory:

    bun install
    bun run build

## Report

What was created, the app's dev port, and the four commands that now work:
`bun run dev`, `bun run test`, `bun run storybook`, `bun run build`.

Point at `/monorepo-stack:add-app` and `/monorepo-stack:add-package` for what
comes next. Do not add application features — this command sets up a workspace
and stops.
```

- [ ] **Step 2: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && node scripts/validate.mjs`
Expected: exit 1 with only the eight `refs` failures from Task 2 for unwritten reference files, plus a `commands` failure for `01-workspace.md` not existing. No frontmatter failure.

- [ ] **Step 3: Commit**

```bash
git add plugins/monorepo-stack/commands/init.md
git commit -m "feat(monorepo-stack): init command"
```

---

## Task 6: `add-app` and `add-package`

**Files:**
- Create: `plugins/monorepo-stack/templates/package/**`
- Create: `plugins/monorepo-stack/scripts/add-app.mjs`
- Create: `plugins/monorepo-stack/scripts/add-package.mjs`
- Create: `plugins/monorepo-stack/commands/add-app.md`
- Create: `plugins/monorepo-stack/commands/add-package.md`

**Interfaces:**
- Consumes: `findWorkspaceRoot`, `nextFreePort`, `readJson`, `writeJson`, `renderTree`.
- Produces: `node scripts/add-app.mjs <name> [--cwd <dir>]` and `node scripts/add-package.mjs <name> [--cwd <dir>]`.

- [ ] **Step 1: Write the failing test**

Create `plugins/monorepo-stack/scripts/add.test.mjs`:

```js
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { test, assert, assertEqual, run } from './lib/self-test.mjs';
import { readJson } from './lib/workspace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const node = (script, args, cwd) =>
  execFileSync(process.execPath, [join(HERE, script), ...args], { cwd, encoding: 'utf8' });

function scaffold() {
  const dir = mkdtempSync(join(tmpdir(), 'mrs-add-'));
  rmSync(dir, { recursive: true, force: true });
  node('init.mjs', [dir, '--app', 'web'], HERE);
  return dir;
}

test('add-app gives the second app a different port', () => {
  const dir = scaffold();
  node('add-app.mjs', ['admin', '--cwd', dir], HERE);

  const first = readJson(join(dir, 'apps/web/package.json')).scripts.dev;
  const second = readJson(join(dir, 'apps/admin/package.json')).scripts.dev;
  const port = (s) => Number(/--port[= ](\d+)/.exec(s)[1]);

  assertEqual(port(first), 3000);
  assertEqual(port(second), 3001, 'second app must not collide with the first');
  rmSync(dir, { recursive: true, force: true });
});

test('add-app leaves the root package.json workspaces untouched', () => {
  const dir = scaffold();
  const before = readFileSync(join(dir, 'package.json'), 'utf8');
  node('add-app.mjs', ['admin', '--cwd', dir], HERE);
  assertEqual(readFileSync(join(dir, 'package.json'), 'utf8'), before,
    'apps/* glob already covers a new app — root must not be rewritten');
  rmSync(dir, { recursive: true, force: true });
});

test('add-app refuses a name that already exists', () => {
  const dir = scaffold();
  let threw = false;
  try {
    node('add-app.mjs', ['web', '--cwd', dir], HERE);
  } catch {
    threw = true;
  }
  assert(threw, 'must refuse rather than clobber an existing app');
  rmSync(dir, { recursive: true, force: true });
});

test('add-package creates a package with an exports map', () => {
  const dir = scaffold();
  node('add-package.mjs', ['logger', '--cwd', dir], HERE);
  const manifest = readJson(join(dir, 'packages/logger/package.json'));
  assertEqual(manifest.name, '@repo/logger');
  assert(manifest.exports, 'package needs an exports map');
  assert(existsSync(join(dir, 'packages/logger/src/index.ts')));
  rmSync(dir, { recursive: true, force: true });
});

run();
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/add.test.mjs`
Expected: FAIL — `Cannot find module .../add-app.mjs`

- [ ] **Step 3: Write the templates and scripts**

`templates/package/` — `package.json` named `@repo/__PKG_NAME__` with `"exports": { ".": "./src/index.ts" }`, the config trio as devDependencies, `src/index.ts`, `src/index.test.ts`, `tsconfig.json` extending `react-library.json`, `vitest.config.ts`.

`scripts/add-app.mjs`:

```js
#!/usr/bin/env node
/** Add an app to an existing workspace. Usage: node add-app.mjs <name> [--cwd <dir>] */
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTree } from './lib/template.mjs';
import { findWorkspaceRoot, nextFreePort } from './lib/workspace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith('--'));
const cwdIndex = args.indexOf('--cwd');
const start = cwdIndex === -1 ? process.cwd() : resolve(args[cwdIndex + 1]);

if (!name) {
  console.error('usage: add-app.mjs <name> [--cwd <dir>]');
  process.exit(1);
}

const root = findWorkspaceRoot(start);
if (!root) {
  console.error(`no workspace root found from ${start}`);
  process.exit(1);
}

const dest = join(root, 'apps', name);
if (existsSync(dest)) {
  console.error(`app already exists: ${dest}`);
  process.exit(1);
}

const port = nextFreePort(root, 3000);
renderTree(join(HERE, '..', 'templates', 'app'), dest, {
  __APP_NAME__: name,
  __PORT__: String(port),
});

// The apps/* glob already covers the new directory, so the root manifest is
// deliberately left alone — rewriting it would churn the lockfile for nothing.
console.log(`added app "${name}" on port ${port}`);
console.log('next: bun install');
```

`scripts/add-package.mjs` — the same shape, rendering `templates/package` into `packages/<name>`, with `__PKG_NAME__` set and no port allocation.

- [ ] **Step 4: Run the tests**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/add.test.mjs`
Expected: `4/4 passed`. The port test is Review Focus item 2.

- [ ] **Step 5: Re-run the acceptance test with a second app**

Run:
```bash
cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack"
node scripts/acceptance.mjs
```
Then extend `acceptance.mjs` to add a second app before the install step:

```js
step('add second app', `node "${join(HERE, 'add-app.mjs')}" admin --cwd "${target}"`, HERE);
```
placed immediately after the `generate` step, and run it again.
Expected: `ACCEPTANCE PASS` — two apps, both building. This is what proves Review Focus item 2 beyond the unit test.

- [ ] **Step 6: Write both command files**

`commands/add-app.md` — frontmatter `description: Add an app to an existing monorepo, with its own dev port.` and `argument-hint: <app name>`. Body: find the workspace root, run the script, report the allocated port, remind the user to `bun install`. State that it does not touch the root manifest.

`commands/add-package.md` — frontmatter `description: Add a shared package to an existing monorepo, with an exports map.` and `argument-hint: <package name>`. Body: run the script, then explain how to consume it — `"@repo/<name>": "workspace:*"` in the consumer, and the subpath-exports rule from `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/04-shared-packages.md`.

- [ ] **Step 7: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/monorepo-stack/templates/package plugins/monorepo-stack/templates/e2e-package plugins/monorepo-stack/scripts plugins/monorepo-stack/commands
git commit -m "feat(monorepo-stack): add-app and add-package

Port allocation tested: the second app gets 3001, and the acceptance
test builds a two-app workspace."
```

---

## Task 7: `add-storybook` — the brownfield command

**Files:**
- Create: `plugins/monorepo-stack/scripts/add-storybook.mjs`
- Create: `plugins/monorepo-stack/commands/add-storybook.md`

**Interfaces:**
- Consumes: `detectPackageManager`, `findWorkspaceRoot`, `readJson`, `writeJson`, `renderTree`, `installCommand`, `runCommand`.
- Produces: `node scripts/add-storybook.mjs [--cwd <dir>] [--package <dir>]`, which must work on a workspace this plugin did not create, including a pnpm one.

- [ ] **Step 1: Write the failing test**

Create `plugins/monorepo-stack/scripts/add-storybook.test.mjs`:

```js
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { test, assert, run } from './lib/self-test.mjs';
import { readJson } from './lib/workspace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

/** A pnpm workspace this plugin did not create. */
function pnpmWorkspace() {
  const dir = mkdtempSync(join(tmpdir(), 'mrs-pnpm-'));
  writeFileSync(join(dir, 'pnpm-lock.yaml'), '');
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'legacy', private: true }));
  writeFileSync(join(dir, 'pnpm-workspace.yaml'), 'packages:\n  - "packages/*"\n');
  const ui = join(dir, 'packages', 'ui', 'src', 'components');
  mkdirSync(ui, { recursive: true });
  writeFileSync(
    join(dir, 'packages', 'ui', 'package.json'),
    JSON.stringify({ name: '@repo/ui', version: '1.0.0', scripts: {} }),
  );
  writeFileSync(join(ui, 'button.tsx'), 'export const Button = () => null;\n');
  return dir;
}

test('add-storybook works on a pnpm workspace and never emits bun commands', () => {
  const dir = pnpmWorkspace();
  const out = execFileSync(
    process.execPath,
    [join(HERE, 'add-storybook.mjs'), '--cwd', dir],
    { encoding: 'utf8' },
  );

  assert(existsSync(join(dir, 'packages/ui/.storybook/main.ts')), 'config written');
  assert(out.includes('pnpm'), 'instructions must use the detected package manager');
  assert(!/\bbun\b/.test(out), `must not mention bun on a pnpm repo:\n${out}`);
  rmSync(dir, { recursive: true, force: true });
});

test('add-storybook adds scripts without discarding existing ones', () => {
  const dir = pnpmWorkspace();
  const manifestPath = join(dir, 'packages/ui/package.json');
  const before = readJson(manifestPath);
  before.scripts = { lint: 'eslint .' };
  writeFileSync(manifestPath, JSON.stringify(before));

  execFileSync(process.execPath, [join(HERE, 'add-storybook.mjs'), '--cwd', dir]);

  const after = readJson(manifestPath);
  assert(after.scripts.lint === 'eslint .', 'existing script preserved');
  assert(after.scripts.storybook, 'storybook script added');
  assert(after.scripts['storybook:build'], 'storybook:build script added');
  rmSync(dir, { recursive: true, force: true });
});

test('add-storybook refuses when Storybook is already configured', () => {
  const dir = pnpmWorkspace();
  mkdirSync(join(dir, 'packages/ui/.storybook'), { recursive: true });
  writeFileSync(join(dir, 'packages/ui/.storybook/main.ts'), '');
  let threw = false;
  try {
    execFileSync(process.execPath, [join(HERE, 'add-storybook.mjs'), '--cwd', dir], { stdio: 'pipe' });
  } catch {
    threw = true;
  }
  assert(threw, 'must refuse rather than overwrite an existing setup');
  rmSync(dir, { recursive: true, force: true });
});

run();
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/add-storybook.test.mjs`
Expected: FAIL — `Cannot find module .../add-storybook.mjs`

- [ ] **Step 3: Write `add-storybook.mjs`**

```js
#!/usr/bin/env node
/**
 * Add Storybook to the UI package of an existing workspace.
 *
 * Deliberately package-manager agnostic: this runs on repos this plugin did
 * not create, and telling a pnpm user to run `bun install` is how a helpful
 * command becomes a broken one.
 */
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTree } from './lib/template.mjs';
import {
  detectPackageManager,
  findWorkspaceRoot,
  installCommand,
  readJson,
  runCommand,
  writeJson,
} from './lib/workspace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = (flag) => {
  const i = args.indexOf(flag);
  return i === -1 ? null : args[i + 1];
};

const start = resolve(opt('--cwd') ?? process.cwd());
const root = findWorkspaceRoot(start);
if (!root) {
  console.error(`no workspace root found from ${start}`);
  process.exit(1);
}

/** The UI package: named explicitly, or the first packages/* dir that looks like one. */
function findUiPackage() {
  const explicit = opt('--package');
  if (explicit) return resolve(root, explicit);
  const packages = join(root, 'packages');
  if (!existsSync(packages)) return null;
  const candidates = readdirSync(packages).filter((n) => /^(ui|design-system|components)$/.test(n));
  return candidates.length ? join(packages, candidates[0]) : null;
}

const uiDir = findUiPackage();
if (!uiDir || !existsSync(join(uiDir, 'package.json'))) {
  console.error('no UI package found. Pass --package <relative dir>.');
  process.exit(1);
}
if (existsSync(join(uiDir, '.storybook'))) {
  console.error(`Storybook already configured at ${join(uiDir, '.storybook')}`);
  process.exit(1);
}

renderTree(join(HERE, '..', 'templates', 'storybook'), uiDir, { __PKG_NAME__: 'ui' });

const manifestPath = join(uiDir, 'package.json');
const manifest = readJson(manifestPath);
manifest.scripts = {
  ...manifest.scripts,
  storybook: 'storybook dev -p 6006',
  'storybook:build': 'storybook build',
};
writeJson(manifestPath, manifest);

const pm = detectPackageManager(root) ?? 'bun';
const deps = ['storybook@^9', '@storybook/nextjs@^9', '@storybook/addon-a11y@^9'];

console.log(`Storybook config written to ${join(uiDir, '.storybook')}`);
console.log(`Detected package manager: ${pm}`);
console.log('\nNext:');
console.log(`  ${pm} add -D ${deps.join(' ')}`.replace('npm add', 'npm install'));
console.log(`  ${installCommand(pm)}`);
console.log(`  ${runCommand(pm, 'storybook')}`);
```

- [ ] **Step 4: Run the tests**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/add-storybook.test.mjs`
Expected: `3/3 passed`. The first test is Review Focus item 3 — it asserts the word `bun` never appears in output for a pnpm repo.

- [ ] **Step 5: Write the command**

`commands/add-storybook.md` — `description: Add Storybook to the UI package of an existing monorepo, whatever its package manager.`

Body: read `${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/05-storybook.md` first. Run the script. Report the detected package manager and the exact install command for it. Then explain what to story, per that reference — including that stories make the component inventory machine-readable, which is what `design-stack`'s INVENTORY stage reads. Offer to write stories for the existing components, one at a time, starting with the most-used.

- [ ] **Step 6: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/monorepo-stack/scripts/add-storybook.mjs plugins/monorepo-stack/scripts/add-storybook.test.mjs plugins/monorepo-stack/commands/add-storybook.md
git commit -m "feat(monorepo-stack): add-storybook, package-manager agnostic

Tested against a synthetic pnpm workspace: asserts the word 'bun' never
appears in the output."
```

---

## Task 8: `audit` — read-only

**Files:**
- Create: `plugins/monorepo-stack/scripts/audit.mjs`
- Create: `plugins/monorepo-stack/commands/audit.md`

**Interfaces:**
- Consumes: `findWorkspaceRoot`, `detectPackageManager`, `listWorkspacePackages`, `readJson`.
- Produces: `node scripts/audit.mjs [--cwd <dir>] [--json]` printing findings and exiting 0 always — an audit is information, not a gate.

- [ ] **Step 1: Write the failing test**

Create `plugins/monorepo-stack/scripts/audit.test.mjs`:

```js
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { test, assert, assertEqual, run } from './lib/self-test.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

/** Hash every file path and its contents, so any write is detected. */
function treeHash(dir) {
  const hash = createHash('sha256');
  const walk = (d) => {
    for (const entry of readdirSync(d).sort()) {
      const p = join(d, entry);
      if (statSync(p).isDirectory()) walk(p);
      else {
        hash.update(relative(dir, p));
        hash.update(readFileSync(p));
      }
    }
  };
  walk(dir);
  return hash.digest('hex');
}

function repo() {
  const dir = mkdtempSync(join(tmpdir(), 'mrs-audit-'));
  writeFileSync(join(dir, 'pnpm-lock.yaml'), '');
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'legacy', workspaces: ['packages/*'] }));
  const ui = join(dir, 'packages', 'ui');
  mkdirSync(ui, { recursive: true });
  writeFileSync(join(ui, 'package.json'), JSON.stringify({ name: '@repo/ui', scripts: {} }));
  return dir;
}

test('audit does not modify the repo it inspects', () => {
  const dir = repo();
  const before = treeHash(dir);
  execFileSync(process.execPath, [join(HERE, 'audit.mjs'), '--cwd', dir], { encoding: 'utf8' });
  assertEqual(treeHash(dir), before, 'audit must be read-only');
  rmSync(dir, { recursive: true, force: true });
});

test('audit reports a missing Storybook and a missing turbo.json', () => {
  const dir = repo();
  const out = execFileSync(process.execPath, [join(HERE, 'audit.mjs'), '--cwd', dir, '--json'], {
    encoding: 'utf8',
  });
  const ids = JSON.parse(out).findings.map((f) => f.id);
  assert(ids.includes('no-storybook'), `expected no-storybook in ${ids}`);
  assert(ids.includes('no-turbo'), `expected no-turbo in ${ids}`);
  rmSync(dir, { recursive: true, force: true });
});

test('audit exits 0 even with findings', () => {
  const dir = repo();
  let code = 0;
  try {
    execFileSync(process.execPath, [join(HERE, 'audit.mjs'), '--cwd', dir], { stdio: 'pipe' });
  } catch (err) {
    code = err.status;
  }
  assertEqual(code, 0, 'an audit reports, it does not gate');
  rmSync(dir, { recursive: true, force: true });
});

run();
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/audit.test.mjs`
Expected: FAIL — `Cannot find module .../audit.mjs`

- [ ] **Step 3: Write `audit.mjs`**

```js
#!/usr/bin/env node
/**
 * Report deviations from the monorepo-stack conventions.
 *
 * READ-ONLY. This runs on somebody's real repository; it never writes, and it
 * always exits 0 — an audit is information, not a gate.
 */
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  detectPackageManager,
  findWorkspaceRoot,
  listWorkspacePackages,
  readJson,
} from './lib/workspace.mjs';

const args = process.argv.slice(2);
const opt = (flag) => {
  const i = args.indexOf(flag);
  return i === -1 ? null : args[i + 1];
};

const start = resolve(opt('--cwd') ?? process.cwd());
const root = findWorkspaceRoot(start);
if (!root) {
  console.error(`no workspace root found from ${start}`);
  process.exit(0);
}

const findings = [];
const finding = (id, severity, message, fix) =>
  findings.push({ id, severity, message, fix });

const pm = detectPackageManager(root);
const packages = listWorkspacePackages(root);
const uiPackage = packages.find((p) => /^(ui|design-system|components)$/.test(p.name));

if (!existsSync(join(root, 'turbo.json'))) {
  finding('no-turbo', 'important', 'No turbo.json: no task graph and no build caching.',
    'Add turbo.json with dependsOn ["^build"] and cache outputs.');
}
if (!uiPackage) {
  finding('no-ui-package', 'important', 'No shared UI package found under packages/.',
    'Run /monorepo-stack:add-package ui, or pass --package to add-storybook.');
} else if (!existsSync(join(uiPackage.dir, '.storybook'))) {
  finding('no-storybook', 'important',
    `UI package "${uiPackage.name}" has no Storybook: the component inventory is not browsable, and design tooling cannot read it.`,
    'Run /monorepo-stack:add-storybook.');
}
if (pm === null) {
  finding('no-lockfile', 'critical', 'No lockfile: installs are not reproducible.',
    'Commit the lockfile your package manager produces.');
}

const ports = new Map();
for (const pkg of packages) {
  const match = /--port[= ](\d+)/.exec(pkg.manifest.scripts?.dev ?? '');
  if (!match) continue;
  const port = match[1];
  if (ports.has(port)) {
    finding('port-collision', 'critical',
      `Apps "${ports.get(port)}" and "${pkg.name}" both use port ${port}.`,
      'Give each app a distinct dev port.');
  }
  ports.set(port, pkg.name);
}

for (const pkg of packages) {
  const all = { ...pkg.manifest.dependencies, ...pkg.manifest.devDependencies };
  for (const [dep, range] of Object.entries(all)) {
    if (dep.startsWith('@repo/') && !String(range).startsWith('workspace:')) {
      finding('internal-not-workspace', 'important',
        `${pkg.name} depends on ${dep} with "${range}" instead of "workspace:*".`,
        'Use workspace:* so the local package is always linked.');
    }
  }
}

if (opt('--json') !== null || args.includes('--json')) {
  console.log(JSON.stringify({ root, packageManager: pm, findings }, null, 2));
  process.exit(0);
}

console.log(`Workspace: ${root}`);
console.log(`Package manager: ${pm ?? 'unknown'}`);
console.log(`Packages: ${packages.length}\n`);

if (!findings.length) {
  console.log('No deviations found.');
  process.exit(0);
}
const order = { critical: 0, important: 1, minor: 2 };
for (const f of findings.sort((a, b) => order[a.severity] - order[b.severity])) {
  console.log(`[${f.severity.toUpperCase()}] ${f.id}\n  ${f.message}\n  fix: ${f.fix}\n`);
}
process.exit(0);
```

- [ ] **Step 4: Run the tests**

Run: `cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack" && node scripts/audit.test.mjs`
Expected: `3/3 passed`. The first test hashes every path and byte before and after, which is Review Focus item 4.

- [ ] **Step 5: Run audit against a real repository, read-only**

Run it against any existing monorepo on the machine to confirm it survives a repo it did not create:

```bash
cd "E:/Chamrong/Project/claude-plugins/plugins/monorepo-stack"
node scripts/audit.mjs --cwd <path to an existing monorepo>
```

Expected: findings printed, exit 0, nothing modified. If it throws on real-world input, fix the script — a crash on somebody's repo is worse than a missed finding.

- [ ] **Step 6: Write the command**

`commands/audit.md` — `description: Report where an existing monorepo deviates from the monorepo-stack conventions. Read-only.`

Body: run the script, present findings grouped by severity, and for each one explain *what it costs* rather than only naming the rule. State plainly that nothing was modified. Offer to fix the top finding as a separate, explicit step — never as part of the audit.

- [ ] **Step 7: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/monorepo-stack/scripts/audit.mjs plugins/monorepo-stack/scripts/audit.test.mjs plugins/monorepo-stack/commands/audit.md
git commit -m "feat(monorepo-stack): audit, verified read-only by tree hash"
```

---

## Task 9: Plugin README and a script test runner

**Files:**
- Create: `plugins/monorepo-stack/README.md`
- Create: `plugins/monorepo-stack/scripts/test.mjs`
- Modify: `README.md` (marketplace root) — add the plugin row

**Interfaces:**
- Consumes: every test file from Tasks 3, 6, 7, 8.
- Produces: `node plugins/monorepo-stack/scripts/test.mjs` running all script tests in one command, for use in Task 13.

- [ ] **Step 1: Write the runner**

```js
#!/usr/bin/env node
/** Run every *.test.mjs under scripts/. Exits non-zero if any file fails. */
import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const files = [
  ...readdirSync(join(HERE, 'lib')).filter((f) => f.endsWith('.test.mjs')).map((f) => join('lib', f)),
  ...readdirSync(HERE).filter((f) => f.endsWith('.test.mjs')),
].sort();

let failed = 0;
for (const file of files) {
  process.stdout.write(`\n--- ${file} ---\n`);
  try {
    execFileSync(process.execPath, [join(HERE, file)], { stdio: 'inherit' });
  } catch {
    failed++;
  }
}
console.log(`\n${files.length - failed}/${files.length} test files passed`);
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Run it**

Run: `cd "E:/Chamrong/Project/claude-plugins" && node plugins/monorepo-stack/scripts/test.mjs`
Expected: `5/5 test files passed` (`lib/template.test.mjs`, `lib/workspace.test.mjs`, `add.test.mjs`, `add-storybook.test.mjs`, `audit.test.mjs`), exit 0.

- [ ] **Step 3: Write `plugins/monorepo-stack/README.md`**

Sections: what it is in three sentences · the stack table with the *why not the alternative* column · the generated layout · the five commands with which work brownfield · the Bun caveat (install and scripts, not bundling) · how to run the tests (`node scripts/test.mjs`) and the acceptance test (`node scripts/acceptance.mjs`) · how it relates to `design-stack` — this plugin creates `packages/ui` and its Storybook, `design-stack` reads them.

- [ ] **Step 4: Add the row to the marketplace README**

In the root `README.md` Plugins table, after the `design-stack` row:

```
| **monorepo-stack** | Scaffold and maintain a Bun + Turborepo monorepo: several apps, shared packages, and Storybook as a first-class layer. | `/plugin install monorepo-stack@chamrong` |
```

- [ ] **Step 5: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/monorepo-stack/README.md plugins/monorepo-stack/scripts/test.mjs README.md
git commit -m "docs(monorepo-stack): plugin README and script test runner"
```

---

## Task 10: Reference — workspace, Turborepo, app anatomy

**Files:**
- Create: `plugins/monorepo-stack/skills/monorepo-stack/reference/01-workspace.md`
- Create: `plugins/monorepo-stack/skills/monorepo-stack/reference/02-turborepo.md`
- Create: `plugins/monorepo-stack/skills/monorepo-stack/reference/03-app-anatomy.md`

**Interfaces:**
- Consumes: the reference index in `SKILL.md` — filenames must match exactly; the friction log from Task 4 Step 5.
- Produces: three of the eight files the `refs` check is waiting on.

Each file: `# Title`, a one-line *read this when*, `##` sections, closing `## Common failures`. Target 120–200 lines. Anchored paths only.

- [ ] **Step 1: Write `01-workspace.md`**

Sections: Bun workspaces in `package.json` — `packages`, `catalog`, `catalogs` · when a **named** catalog earns its keep versus the default one (group deps that must move together: the testing stack, the Storybook stack) · `workspace:*` for internal deps and why a version range there is a bug · `bunfig.toml` · committing `bun.lock` and why the text format matters for review · `bun pm scan` versus hand-maintained `overrides`, and when `overrides` is still correct · **why there is no Bun equivalent of pnpm's `.npmrc` `virtual-store-dir-max-length` guard** — that guard exists because pnpm symlinks a deeply nested virtual store past the Windows 260-character limit and Bun does not, so a reader migrating from pnpm looking for it must be told it is gone rather than concluding it was forgotten · `## Common failures`.

- [ ] **Step 2: Write `02-turborepo.md`**

Sections: the task graph and `dependsOn: ["^build"]` — what the caret means · `inputs` and `outputs`, and what a wrong `outputs` costs (a cache that returns stale artifacts is worse than no cache) · `cache: false` for `dev` and `e2e`, and why · `persistent` · `globalEnv` and why an unlisted env var silently poisons the cache · why Turbo is kept when `bun run --filter` exists — filter runs scripts in parallel with no task graph and no caching · `## Common failures`.

- [ ] **Step 3: Write `03-app-anatomy.md`**

Sections: `app/` `core/` `shared/` and the test — if it would be meaningless in another app it is `core/`; if another app would want it, it belongs in `packages/`; `shared/` is the waiting room · what actually goes in `core/` (auth, env parsing, i18n setup, stores, proxy) · per-app config files and why each app owns its own `vitest.config.ts` and `next.config.ts` · **port allocation**, the registry, and why two apps on one port is silent until someone runs both · the per-app `CLAUDE.md` and what belongs in it · `## Common failures`.

- [ ] **Step 4: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && node scripts/validate.mjs`
Expected: exit 1, with the `refs` failures for `01`, `02`, `03` gone. Five remain.

- [ ] **Step 5: Commit**

```bash
git add plugins/monorepo-stack/skills/monorepo-stack/reference/
git commit -m "docs(monorepo-stack): workspace, turborepo, and app anatomy reference"
```

---

## Task 11: Reference — packages, Storybook, testing

**Files:**
- Create: `plugins/monorepo-stack/skills/monorepo-stack/reference/04-shared-packages.md`
- Create: `plugins/monorepo-stack/skills/monorepo-stack/reference/05-storybook.md`
- Create: `plugins/monorepo-stack/skills/monorepo-stack/reference/06-testing.md`

**Interfaces:**
- Consumes: the `core`/`shared` rule from `03-app-anatomy.md`.
- Produces: `05-storybook.md`, which `add-storybook.md` (Task 7) routes to and which specifies the machine-readable-inventory requirement.

- [ ] **Step 1: Write `04-shared-packages.md`**

Sections: when to extract from `shared/` to `packages/` — the two-consumer rule, and the cost of extracting too early (a package with one consumer is indirection with a version boundary) · exports maps and subpath exports, and why a barrel file defeats tree-shaking · `peerDependencies` for React in a UI package, and what two copies of React in the tree actually breaks · the `config/*` trio and why config is packages rather than root files · naming with `@repo/*` · `## Common failures`.

- [ ] **Step 2: Write `05-storybook.md`**

Sections:

- **One Storybook, in the UI package.** Not per-app. A fragmented inventory cannot be read as one thing, by a person or by tooling.
- **Setup** — `.storybook/main.ts`, the stories glob, the a11y addon, importing the app's global stylesheet in `preview.ts` so components render as they will in the app.
- **Story file conventions** — colocated beside the component, one file per component, named exports as stories.
- **Which states to story** — tie to the six in `design-stack`: `empty · loading · error · permission · overflow · offline`, plus the seven control states from its components reference. A component whose loading and error stories do not exist has states nobody has looked at.
- **Writing stories so the inventory is machine-readable** — this section is the reason the file has a second job. Explicit `argTypes` with types rather than inferred; a `Default` story on every component; `title` matching the component's import path; a `Docs` block stating when to use the component and when not to. This is what `design-stack`'s INVENTORY stage reads when it checks what already exists, and it is the difference between "there is a Button" and "there is a Button with three variants, two sizes, and a loading state".
- `## Common failures`.

Cross-reference `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/STORYBOOKS.md` — note it lives in the other plugin, so name it in prose rather than as a routed path, since the `refs` check resolves within one plugin.

- [ ] **Step 3: Write `06-testing.md`**

Sections: the four layers and what belongs at each — Vitest for pure logic, Testing Library for component behaviour, MSW for the network boundary, Playwright for the flows that cross app boundaries · the shared `@repo/testing` package and its three exports · why MSW at the network boundary rather than mocking the client · coverage, and why a coverage number is a smoke alarm not a goal · **why `bun test` was not chosen** — faster, but Testing Library, jsdom, MSW and Next all assume Vitest or Jest, and test-infrastructure failures are expensive to debug · `## Common failures`.

- [ ] **Step 4: Run the validator**

Run: `node scripts/validate.mjs`
Expected: exit 1, two `refs` failures remaining (`07`, `08`).

- [ ] **Step 5: Commit**

```bash
git add plugins/monorepo-stack/skills/monorepo-stack/reference/
git commit -m "docs(monorepo-stack): packages, storybook, and testing reference"
```

---

## Task 12: Reference — conventions and brownfield

**Files:**
- Create: `plugins/monorepo-stack/skills/monorepo-stack/reference/07-conventions.md`
- Create: `plugins/monorepo-stack/skills/monorepo-stack/reference/08-brownfield.md`

**Interfaces:**
- Consumes: the friction log recorded during Task 4 Step 5.
- Produces: the last two reference files; `refs` goes green.

- [ ] **Step 1: Write `07-conventions.md`**

Sections: `@repo/*` naming and why scoping internal packages prevents registry collisions · versioning — why `private: true` and a single version is right until you publish · the port registry · branch and commit conventions · per-app `CLAUDE.md` and `AGENTS.md`, what belongs in each · what goes in `docs/` — architecture decisions, contribution, reviews · `## Common failures`.

- [ ] **Step 2: Write `08-brownfield.md`**

Sections:

- **Adopting this incrementally** — the order that minimises risk: config trio first (no runtime effect), then Storybook (additive), then Turbo (changes CI), then package manager (changes everything). Never all at once.
- **Adding Storybook to a workspace that is not Bun** — what `add-storybook` does, and the install command per package manager.
- **Reading an `audit` report** — what to fix first and what to leave.
- **Known friction**, written from Task 4's log: every Bun + Next, Turbo + Storybook, or version-pin problem hit during the acceptance test, with the workaround. If the acceptance test passed clean, say so explicitly and date it — "no friction found as of 2026-09-28 with Bun 1.3.5, Next 16, Storybook 9" is useful information, and an empty section is not.
- **What this plugin will not do** — migrate a package manager, convert a build system, restructure an existing app's internals.
- `## Common failures`.

- [ ] **Step 3: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && node scripts/validate.mjs`
Expected: **exit 0**, all checks passing with two plugins present.

- [ ] **Step 4: Commit**

```bash
git add plugins/monorepo-stack/skills/monorepo-stack/reference/
git commit -m "docs(monorepo-stack): conventions and brownfield reference

Validator green with two plugins in the marketplace."
```

---

## Task 13: Full verification

**Files:** none created — this task is verification.

**Interfaces:**
- Consumes: everything.
- Produces: the evidence that the plugin works.

- [ ] **Step 1: Validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && node scripts/validate.mjs`
Expected: exit 0, all checks passed.

- [ ] **Step 2: Script tests**

Run: `node plugins/monorepo-stack/scripts/test.mjs`
Expected: `5/5 test files passed`, exit 0.

- [ ] **Step 3: Acceptance test — the real toolchain**

Run: `cd plugins/monorepo-stack && node scripts/acceptance.mjs`
Expected: `ACCEPTANCE PASS` — generate, add a second app, `bun install`, `bun run build`, `bun run test`, `bun run storybook:build`, all green.

- [ ] **Step 4: Banned terms**

Run:
```bash
cd "E:/Chamrong/Project/claude-plugins"
grep -rniE "fueni|nazounki" --include="*.md" --include="*.json" --include="*.mjs" plugins/ README.md
```
Expected: no matches. Matches under `docs/` are expected — that is where the prohibition is written.

- [ ] **Step 5: Both plugins install**

Interactive session:
```
/plugin marketplace add E:\Chamrong\Project\claude-plugins
/plugin install monorepo-stack@chamrong
```
Expected: succeeds, and `design-stack` still installs. If this cannot be run in the session, say so plainly and hand it to the user — do not claim it passed.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "test(monorepo-stack): full verification pass"
```

---

## Done when

- `node scripts/validate.mjs` exits 0 with both plugins present.
- `node plugins/monorepo-stack/scripts/test.mjs` reports 5/5 test files passing.
- `node plugins/monorepo-stack/scripts/acceptance.mjs` reports `ACCEPTANCE PASS`, having really run `bun install`, `bun run build`, `bun run test` and `bun run storybook:build` on a generated two-app workspace.
- No banned term appears under `plugins/`.
- `08-brownfield.md` either lists the friction found during Task 4 or states explicitly that none was found, with the date and versions.
- 13 tasks, each leaving the repo in a coherent state.
