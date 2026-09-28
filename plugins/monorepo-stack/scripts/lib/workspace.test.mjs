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
  for (const [app, port] of [
    ['a', 3000],
    ['b', 3001],
    ['c', 3003],
  ]) {
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
