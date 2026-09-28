#!/usr/bin/env node
/**
 * Generates a workspace into a temp dir and runs the real toolchain against it.
 * A scaffold that does not build is worthless, and nothing short of running it
 * proves otherwise.
 *
 *   node scripts/acceptance.mjs            generate, verify, delete
 *   node scripts/acceptance.mjs --keep     leave the directory for inspection
 *
 * Commands run via execFileSync with argument arrays rather than a shell
 * string: no shell means a temp path containing a space cannot split an
 * argument, which it can and does on Windows.
 */
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KEEP = process.argv.includes('--keep');
const target = mkdtempSync(join(tmpdir(), 'mrs-acceptance-'));

const step = (label, file, args, cwd) => {
  process.stdout.write(`\n=== ${label} ===\n${file} ${args.join(' ')}\n`);
  execFileSync(file, args, { cwd, stdio: 'inherit', env: { ...process.env, CI: '1' } });
};

let failed = null;
try {
  rmSync(target, { recursive: true, force: true });

  step('generate', process.execPath, [join(HERE, 'init.mjs'), target, '--app', 'web'], HERE);
  step('add second app', process.execPath, [join(HERE, 'add-app.mjs'), 'admin', '--cwd', target], HERE);
  step('add module', process.execPath, [join(HERE, 'add-module.mjs'), 'inventory', '--cwd', target], HERE);
  step('install', 'bun', ['install'], target);
  step('build', 'bun', ['run', 'build'], target);
  step('test', 'bun', ['run', 'test'], target);
  step('storybook:build', 'bun', ['run', 'storybook:build'], target);

  for (const path of [
    'package.json',
    'turbo.json',
    'bunfig.toml',
    'apps/web',
    'apps/admin',
    'packages/ui/.storybook',
    'packages/module-kit',
    'modules/inventory/module.config.ts',
    'docs/adr',
  ]) {
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
