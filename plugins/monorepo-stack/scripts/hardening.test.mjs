/**
 * Regression tests for defects found in the whole-branch review.
 * Each one reproduces a specific finding.
 */
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { test, assert, assertEqual, run } from './lib/self-test.mjs';
import { detectPackageManager, nextFreePort } from './lib/workspace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

const node = (script, args, opts = {}) =>
  execFileSync(process.execPath, [join(HERE, script), ...args], { encoding: 'utf8', ...opts });

const refuses = (script, args) => {
  try {
    node(script, args, { stdio: 'pipe' });
    return false;
  } catch {
    return true;
  }
};

function workspace() {
  const dir = mkdtempSync(join(tmpdir(), 'mrs-hard-'));
  writeFileSync(
    join(dir, 'package.json'),
    JSON.stringify({ name: 'ws', workspaces: { packages: ['apps/*', 'modules/*', 'packages/*'] } }),
  );
  mkdirSync(join(dir, 'apps'), { recursive: true });
  return dir;
}

// --- Finding 4: add-app had no name validation; a ../ name escaped the repo ---

test('add-app refuses a name that escapes the workspace', () => {
  const dir = workspace();
  // A unique name, so a leftover from an earlier run cannot fail this test.
  const escapee = `ESCAPEE-${process.pid}-${Date.now()}`;
  assert(refuses('add-app.mjs', [`../../${escapee}`, '--cwd', dir]), 'must refuse traversal');
  assert(!existsSync(join(dir, '..', escapee)), 'nothing written outside the workspace');
  assert(!existsSync(join(dir, '..', '..', escapee)), 'nothing written two levels up either');
  rmSync(dir, { recursive: true, force: true });
});

test('add-app refuses a nested or non-kebab name', () => {
  const dir = workspace();
  for (const bad of ['a/b/c', 'Web', 'web_app', '1web', '']) {
    assert(refuses('add-app.mjs', [bad, '--cwd', dir]), `should have refused "${bad}"`);
  }
  rmSync(dir, { recursive: true, force: true });
});

// --- Finding 13: a trailing --cwd crashed with a raw stack trace ---

test('every add-* script reports usage rather than crashing on a trailing --cwd', () => {
  for (const script of ['add-app.mjs', 'add-package.mjs', 'add-module.mjs']) {
    let stderr = '';
    try {
      node(script, ['thing', '--cwd'], { stdio: 'pipe' });
    } catch (err) {
      stderr = String(err.stderr ?? '');
    }
    assert(!stderr.includes('ERR_INVALID_ARG_TYPE'), `${script} leaked a stack trace:\n${stderr}`);
  }
});

// --- Finding 14: add-app used indexOf(value), dropping a repeated positional ---

test('add-app finds the positional even when it repeats the --cwd value', () => {
  const dir = workspace();
  node('add-app.mjs', ['--cwd', dir, 'admin']);
  assert(existsSync(join(dir, 'apps', 'admin')), 'positional after --cwd was found');
  rmSync(dir, { recursive: true, force: true });
});

// --- Finding 6: no lockfile + a packageManager field fell back to bun ---

test('detectPackageManager falls back to the packageManager field before bun', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mrs-pm-'));
  writeFileSync(join(dir, 'package.json'), '{"packageManager":"pnpm@9.15.0"}');
  assertEqual(detectPackageManager(dir), 'pnpm', 'the only evidence available must be used');
  rmSync(dir, { recursive: true, force: true });
});

test('detectPackageManager still prefers the lockfile when both exist', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mrs-pm2-'));
  writeFileSync(join(dir, 'bun.lock'), '');
  writeFileSync(join(dir, 'package.json'), '{"packageManager":"pnpm@9.0.0"}');
  assertEqual(detectPackageManager(dir), 'bun');
  rmSync(dir, { recursive: true, force: true });
});

// --- Finding 12: nextFreePort ignored framework-default ports ---

test('nextFreePort treats a dev script with no explicit port as claiming 3000', () => {
  const dir = workspace();
  const appDir = join(dir, 'apps', 'legacy');
  mkdirSync(appDir, { recursive: true });
  writeFileSync(
    join(appDir, 'package.json'),
    JSON.stringify({ name: 'legacy', scripts: { dev: 'next dev' } }),
  );
  assertEqual(nextFreePort(dir, 3000), 3001, 'next dev with no flag occupies 3000');
  rmSync(dir, { recursive: true, force: true });
});

test('nextFreePort reads a PORT= environment prefix', () => {
  const dir = workspace();
  const appDir = join(dir, 'apps', 'legacy');
  mkdirSync(appDir, { recursive: true });
  writeFileSync(
    join(appDir, 'package.json'),
    JSON.stringify({ name: 'legacy', scripts: { dev: 'PORT=3001 next dev' } }),
  );
  assertEqual(nextFreePort(dir, 3001), 3002);
  rmSync(dir, { recursive: true, force: true });
});

// --- Finding 5: audit crashed on a malformed manifest, breaking its contract ---

test('audit survives a malformed package.json and still exits 0', () => {
  const dir = workspace();
  const pkgDir = join(dir, 'packages', 'broken');
  mkdirSync(pkgDir, { recursive: true });
  writeFileSync(join(pkgDir, 'package.json'), '{ this is not json');

  let code = 0;
  let out = '';
  try {
    out = node('audit.mjs', ['--cwd', dir, '--json']);
  } catch (err) {
    code = err.status ?? 1;
  }
  assertEqual(code, 0, 'audit must never throw on a repo it inspects');
  assert(JSON.parse(out).findings.some((f) => f.id === 'unreadable-manifest'), 'reports it');
  rmSync(dir, { recursive: true, force: true });
});

// --- Finding 8: --package . wrote .storybook into the workspace root ---

test('add-storybook refuses a --package that is the workspace root or escapes it', () => {
  const dir = workspace();
  writeFileSync(join(dir, 'pnpm-lock.yaml'), '');
  for (const bad of ['.', '..', '../elsewhere']) {
    assert(refuses('add-storybook.mjs', ['--cwd', dir, '--package', bad]), `refused ${bad}`);
  }
  assert(!existsSync(join(dir, '.storybook')), 'nothing written to the workspace root');
  rmSync(dir, { recursive: true, force: true });
});

run();
