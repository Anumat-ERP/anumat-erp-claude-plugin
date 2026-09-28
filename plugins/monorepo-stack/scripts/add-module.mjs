#!/usr/bin/env node
/**
 * Add a business capability module.
 *
 *   node add-module.mjs <name> [--label "Human Label"] [--summary "..."] [--cwd <dir>]
 *
 * A module is not a folder of related files: it declares its dependencies,
 * the permissions it defines and the navigation it contributes, so apps
 * compose it instead of importing into its internals.
 */
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTree } from './lib/template.mjs';
import { findWorkspaceRoot } from './lib/workspace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const FLAGS_WITH_VALUES = new Set(['--label', '--summary', '--cwd']);
const name = args.find(
  (a, i) => !a.startsWith('--') && !(i > 0 && FLAGS_WITH_VALUES.has(args[i - 1])),
);

if (!name) {
  console.error('usage: add-module.mjs <name> [--label "Label"] [--summary "..."] [--cwd <dir>]');
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(name)) {
  // The name becomes a directory, a package name, a permission prefix and a
  // route segment. Constraining it once here avoids four inconsistent spellings.
  console.error(`invalid module name "${name}": use lowercase kebab-case, starting with a letter`);
  process.exit(1);
}

const start = resolve(flag('--cwd') ?? process.cwd());
const root = findWorkspaceRoot(start);
if (!root) {
  console.error(`no workspace root found from ${start}`);
  process.exit(1);
}

const dest = join(root, 'modules', name);
if (existsSync(dest)) {
  console.error(`module already exists: ${dest}`);
  process.exit(1);
}

const label =
  flag('--label') ?? name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

mkdirSync(join(root, 'modules'), { recursive: true });
renderTree(join(HERE, '..', 'templates', 'module'), dest, {
  __MODULE_NAME__: name,
  __MODULE_LABEL__: label,
  __MODULE_SUMMARY__: flag('--summary') ?? `${label} capability.`,
});

console.log(`added module "${name}" (@repo/module-${name})`);
console.log(`  domain/         business rules — no React, no fetch`);
console.log(`  application/    use cases and the ports they need`);
console.log(`  infrastructure/ adapters implementing those ports`);
console.log(`  ui/             components and route fragments`);
console.log(`  security/       permissions this module defines`);
console.log('');
console.log('next: bun install, then declare it in the app that should mount it.');
console.log(`  modules/${name}/module.config.ts is the manifest — depends, permissions, navigation.`);
