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

const runScript = (args, opts = {}) =>
  execFileSync(process.execPath, [join(HERE, 'add-storybook.mjs'), ...args], {
    encoding: 'utf8',
    ...opts,
  });

test('add-storybook works on a pnpm workspace and never emits bun commands', () => {
  const dir = pnpmWorkspace();
  const out = runScript(['--cwd', dir]);

  assert(existsSync(join(dir, 'packages/ui/.storybook/main.ts')), 'config written');
  assert(out.includes('pnpm'), 'instructions must use the detected package manager');
  assert(!/\bbun\b/.test(out), `must not mention bun on a pnpm repo:\n${out}`);
  rmSync(dir, { recursive: true, force: true });
});

test('add-storybook adds scripts without discarding existing ones', () => {
  const dir = pnpmWorkspace();
  const manifestPath = join(dir, 'packages/ui/package.json');
  writeFileSync(
    manifestPath,
    JSON.stringify({ name: '@repo/ui', version: '1.0.0', scripts: { lint: 'eslint .' } }),
  );

  runScript(['--cwd', dir]);

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
    runScript(['--cwd', dir], { stdio: 'pipe' });
  } catch {
    threw = true;
  }
  assert(threw, 'must refuse rather than overwrite an existing setup');
  rmSync(dir, { recursive: true, force: true });
});

test('add-storybook reports npm install syntax on an npm workspace', () => {
  const dir = pnpmWorkspace();
  rmSync(join(dir, 'pnpm-lock.yaml'));
  writeFileSync(join(dir, 'package-lock.json'), '{}');
  writeFileSync(
    join(dir, 'package.json'),
    JSON.stringify({ name: 'legacy', private: true, workspaces: ['packages/*'] }),
  );
  rmSync(join(dir, 'pnpm-workspace.yaml'));

  const out = runScript(['--cwd', dir]);
  assert(out.includes('npm'), `expected npm instructions:\n${out}`);
  assert(!/\bbun\b/.test(out), 'must not mention bun on an npm repo');
  rmSync(dir, { recursive: true, force: true });
});

test('add-storybook explains itself when no UI package can be found', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mrs-noui-'));
  writeFileSync(join(dir, 'pnpm-lock.yaml'), '');
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'x', workspaces: ['packages/*'] }));
  let message = '';
  try {
    runScript(['--cwd', dir], { stdio: 'pipe' });
  } catch (err) {
    message = String(err.stderr ?? '');
  }
  assert(message.includes('--package'), `should suggest --package:\n${message}`);
  rmSync(dir, { recursive: true, force: true });
});

run();
