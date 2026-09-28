import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { test, assert, assertEqual, run } from './lib/self-test.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

/** Hash every path and every byte, so any write at all is detected. */
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
  writeFileSync(
    join(dir, 'package.json'),
    JSON.stringify({ name: 'legacy', workspaces: ['packages/*'] }),
  );
  const ui = join(dir, 'packages', 'ui');
  mkdirSync(ui, { recursive: true });
  writeFileSync(join(ui, 'package.json'), JSON.stringify({ name: '@repo/ui', scripts: {} }));
  return dir;
}

const audit = (args, opts = {}) =>
  execFileSync(process.execPath, [join(HERE, 'audit.mjs'), ...args], {
    encoding: 'utf8',
    ...opts,
  });

test('audit does not modify the repo it inspects', () => {
  const dir = repo();
  const before = treeHash(dir);
  audit(['--cwd', dir]);
  assertEqual(treeHash(dir), before, 'audit must be read-only');
  rmSync(dir, { recursive: true, force: true });
});

test('audit reports a missing Storybook and a missing turbo.json', () => {
  const dir = repo();
  const ids = JSON.parse(audit(['--cwd', dir, '--json'])).findings.map((f) => f.id);
  assert(ids.includes('no-storybook'), `expected no-storybook in ${ids}`);
  assert(ids.includes('no-turbo'), `expected no-turbo in ${ids}`);
  rmSync(dir, { recursive: true, force: true });
});

test('audit exits 0 even with findings', () => {
  const dir = repo();
  let code = 0;
  try {
    audit(['--cwd', dir], { stdio: 'pipe' });
  } catch (err) {
    code = err.status;
  }
  assertEqual(code, 0, 'an audit reports, it does not gate');
  rmSync(dir, { recursive: true, force: true });
});

test('audit flags two apps sharing a dev port', () => {
  const dir = repo();
  for (const name of ['web', 'admin']) {
    const appDir = join(dir, 'apps', name);
    mkdirSync(appDir, { recursive: true });
    writeFileSync(
      join(appDir, 'package.json'),
      JSON.stringify({ name, scripts: { dev: 'next dev --port 3000' } }),
    );
  }
  const findings = JSON.parse(audit(['--cwd', dir, '--json'])).findings;
  const collision = findings.find((f) => f.id === 'port-collision');
  assert(collision, 'port collision must be reported');
  assertEqual(collision.severity, 'critical');
  rmSync(dir, { recursive: true, force: true });
});

test('audit flags an internal dependency not using workspace:*', () => {
  const dir = repo();
  writeFileSync(
    join(dir, 'packages/ui/package.json'),
    JSON.stringify({ name: '@repo/ui', dependencies: { '@repo/testing': '^1.0.0' } }),
  );
  const ids = JSON.parse(audit(['--cwd', dir, '--json'])).findings.map((f) => f.id);
  assert(ids.includes('internal-not-workspace'), `expected internal-not-workspace in ${ids}`);
  rmSync(dir, { recursive: true, force: true });
});

test('audit flags a module whose dependency is not installed', () => {
  const dir = repo();
  const mod = join(dir, 'modules', 'sales');
  mkdirSync(mod, { recursive: true });
  writeFileSync(join(mod, 'package.json'), JSON.stringify({ name: '@repo/module-sales' }));
  writeFileSync(
    join(mod, 'module.config.ts'),
    "export const manifest = { name: 'sales', depends: ['catalog'], permissions: [] };\n",
  );
  const findings = JSON.parse(audit(['--cwd', dir, '--json'])).findings;
  const missing = findings.find((f) => f.id === 'module-missing-dependency');
  assert(missing, `expected module-missing-dependency in ${findings.map((f) => f.id)}`);
  assert(missing.message.includes('catalog'), 'names the missing dependency');
  rmSync(dir, { recursive: true, force: true });
});

test('audit survives a repo with no packages directory at all', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mrs-bare-'));
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'bare', workspaces: ['x/*'] }));
  // A crash on somebody's real repo is worse than a missed finding.
  const out = audit(['--cwd', dir, '--json']);
  assert(JSON.parse(out).findings.length >= 0, 'produced a report rather than throwing');
  rmSync(dir, { recursive: true, force: true });
});

run();
