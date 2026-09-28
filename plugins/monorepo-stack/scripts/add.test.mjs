import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { test, assert, assertEqual, run } from './lib/self-test.mjs';
import { readJson } from './lib/workspace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

const node = (script, args, opts = {}) =>
  execFileSync(process.execPath, [join(HERE, script), ...args], { encoding: 'utf8', ...opts });

/**
 * A workspace shaped like init's output, built directly rather than by running
 * init — these tests must not depend on the network, and init resolves catalog
 * versions from the registry.
 */
function workspace() {
  const dir = mkdtempSync(join(tmpdir(), 'mrs-add-'));
  writeFileSync(
    join(dir, 'package.json'),
    JSON.stringify({ name: 'ws', private: true, workspaces: { packages: ['apps/*', 'modules/*', 'packages/*'] } }),
  );
  mkdirSync(join(dir, 'apps', 'web'), { recursive: true });
  writeFileSync(
    join(dir, 'apps', 'web', 'package.json'),
    JSON.stringify({ name: 'web', scripts: { dev: 'next dev --port 3000' } }),
  );
  return dir;
}

const port = (script) => Number(/--port[= ](\d+)/.exec(script)[1]);

test('add-app gives the second app a different port', () => {
  const dir = workspace();
  node('add-app.mjs', ['admin', '--cwd', dir]);
  assertEqual(port(readJson(join(dir, 'apps/web/package.json')).scripts.dev), 3000);
  assertEqual(
    port(readJson(join(dir, 'apps/admin/package.json')).scripts.dev),
    3001,
    'second app must not collide with the first',
  );
  rmSync(dir, { recursive: true, force: true });
});

test('add-app leaves the root manifest untouched', () => {
  const dir = workspace();
  const before = readFileSync(join(dir, 'package.json'), 'utf8');
  node('add-app.mjs', ['admin', '--cwd', dir]);
  assertEqual(
    readFileSync(join(dir, 'package.json'), 'utf8'),
    before,
    'the apps/* glob already covers a new app — rewriting root churns the lockfile',
  );
  rmSync(dir, { recursive: true, force: true });
});

test('add-app refuses a name that already exists', () => {
  const dir = workspace();
  let threw = false;
  try {
    node('add-app.mjs', ['web', '--cwd', dir], { stdio: 'pipe' });
  } catch {
    threw = true;
  }
  assert(threw, 'must refuse rather than clobber an existing app');
  rmSync(dir, { recursive: true, force: true });
});

test('add-package creates a package with an exports map', () => {
  const dir = workspace();
  node('add-package.mjs', ['logger', '--cwd', dir]);
  const manifest = readJson(join(dir, 'packages/logger/package.json'));
  assertEqual(manifest.name, '@repo/logger');
  assert(manifest.exports, 'package needs an exports map');
  assert(existsSync(join(dir, 'packages/logger/src/index.ts')));
  rmSync(dir, { recursive: true, force: true });
});

test('add-module creates every layer and a manifest', () => {
  const dir = workspace();
  node('add-module.mjs', ['inventory', '--cwd', dir]);
  for (const path of [
    'modules/inventory/module.config.ts',
    'modules/inventory/index.ts',
    'modules/inventory/domain/inventory.ts',
    'modules/inventory/application/ports.ts',
    'modules/inventory/infrastructure/http-record-repository.ts',
    'modules/inventory/ui/components/record-list.tsx',
    'modules/inventory/security/permissions.ts',
  ]) {
    assert(existsSync(join(dir, path)), `missing ${path}`);
  }
  assertEqual(readJson(join(dir, 'modules/inventory/package.json')).name, '@repo/module-inventory');
  rmSync(dir, { recursive: true, force: true });
});

test('add-module derives a human label and substitutes it everywhere', () => {
  const dir = workspace();
  node('add-module.mjs', ['stock-control', '--cwd', dir]);
  const manifest = readFileSync(join(dir, 'modules/stock-control/module.config.ts'), 'utf8');
  assert(manifest.includes("name: 'stock-control'"), 'module name substituted');
  assert(manifest.includes('Stock Control'), 'kebab-case turned into a readable label');
  assert(!manifest.includes('__MODULE_'), 'no unsubstituted tokens left behind');
  rmSync(dir, { recursive: true, force: true });
});

test('add-module rejects a name that is not kebab-case', () => {
  const dir = workspace();
  // The name becomes a directory, a package name, a permission prefix and a
  // route segment. One spelling, enforced once.
  for (const bad of ['Inventory', 'stock_control', '1inventory']) {
    let threw = false;
    try {
      node('add-module.mjs', [bad, '--cwd', dir], { stdio: 'pipe' });
    } catch {
      threw = true;
    }
    assert(threw, `should have rejected "${bad}"`);
  }
  rmSync(dir, { recursive: true, force: true });
});

test('add-module refuses to overwrite an existing module', () => {
  const dir = workspace();
  node('add-module.mjs', ['inventory', '--cwd', dir]);
  let threw = false;
  try {
    node('add-module.mjs', ['inventory', '--cwd', dir], { stdio: 'pipe' });
  } catch {
    threw = true;
  }
  assert(threw, 'must refuse rather than clobber');
  rmSync(dir, { recursive: true, force: true });
});

run();
