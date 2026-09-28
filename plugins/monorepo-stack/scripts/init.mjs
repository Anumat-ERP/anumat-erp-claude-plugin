#!/usr/bin/env node
/**
 * Create a Bun + Turborepo workspace.
 *
 *   node init.mjs <dir> [--app <name>] [--latest]
 *
 * Template layout is grouped by what each template produces:
 *   workspace/   the repo root
 *   app/         a deployable application
 *   module/      a business capability
 *   package/*    shared packages (generic, ui, testing, e2e, module-kit)
 *   config/*     the shared config packages
 *   overlay/*    files applied INTO an existing target, not a package
 */
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTree } from './lib/template.mjs';
import { resolveCatalog } from './lib/versions.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const TEMPLATES = join(HERE, '..', 'templates');

/**
 * Turborepo refuses to resolve a workspace without `packageManager` in the
 * root manifest. Pin it to the Bun that is actually installed, so the
 * generated repo matches the machine that made it rather than a version
 * hardcoded in a template that will go stale.
 */
function bunVersion() {
  try {
    return execFileSync('bun', ['--version'], { encoding: 'utf8' }).trim();
  } catch {
    return '1.3.5';
  }
}

const args = process.argv.slice(2);
const target = resolve(args.find((a) => !a.startsWith('--')) ?? '.');
const appIndex = args.indexOf('--app');
const appName = appIndex === -1 ? 'web' : args[appIndex + 1];
const allowMajorBumps = args.includes('--latest');

if (existsSync(target) && readdirSync(target).length > 0) {
  console.error(`refusing to scaffold into a non-empty directory: ${target}`);
  process.exit(1);
}
mkdirSync(target, { recursive: true });

const tokens = {
  __REPO_NAME__: basename(target),
  __APP_NAME__: appName,
  __PORT__: '3000',
  __BUN_VERSION__: bunVersion(),
  __TODAY__: new Date().toISOString().slice(0, 10),
};

renderTree(join(TEMPLATES, 'workspace'), target, tokens);

for (const cfg of ['eslint', 'typescript', 'test']) {
  renderTree(join(TEMPLATES, 'config', cfg), join(target, 'packages', 'config', `${cfg}-config`), tokens);
}
for (const pkg of ['module-kit', 'testing', 'ui', 'e2e']) {
  renderTree(join(TEMPLATES, 'package', pkg), join(target, 'packages', pkg), tokens);
}
renderTree(join(TEMPLATES, 'overlay', 'storybook'), join(target, 'packages', 'ui'), tokens);
renderTree(join(TEMPLATES, 'app'), join(target, 'apps', appName), tokens);

mkdirSync(join(target, 'modules'), { recursive: true });

await resolveCatalog(join(target, 'package.json'), { allowMajorBumps });

console.log(`\nscaffolded ${basename(target)} with app "${appName}" on port 3000`);
console.log('next: bun install && bun run dev');
console.log('add a business capability with: add-module <name>');
