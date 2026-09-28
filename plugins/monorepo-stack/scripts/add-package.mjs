#!/usr/bin/env node
/**
 * Add a shared package. Usage: node add-package.mjs <name> [--cwd <dir>]
 *
 * A package holds technical capability with no business knowledge. If it
 * needs to know what a customer or an invoice is, it is a module — use
 * add-module.mjs instead.
 */
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTree } from './lib/template.mjs';
import { findWorkspaceRoot } from './lib/workspace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

const FLAGS_WITH_VALUES = new Set(['--cwd']);
const name = args.find(
  (a, i) => !a.startsWith('--') && !(i > 0 && FLAGS_WITH_VALUES.has(args[i - 1])),
);
const cwdIndex = args.indexOf('--cwd');
const start = cwdIndex === -1 ? process.cwd() : resolve(args[cwdIndex + 1]);

if (!name) {
  console.error('usage: add-package.mjs <name> [--cwd <dir>]');
  process.exit(1);
}
if (!/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error(`invalid package name "${name}": use lowercase kebab-case, starting with a letter`);
  process.exit(1);
}

const root = findWorkspaceRoot(start);
if (!root) {
  console.error(`no workspace root found from ${start}`);
  process.exit(1);
}

const dest = join(root, 'packages', name);
if (existsSync(dest)) {
  console.error(`package already exists: ${dest}`);
  process.exit(1);
}

renderTree(join(HERE, '..', 'templates', 'package', 'generic'), dest, { __PKG_NAME__: name });

console.log(`added package "@repo/${name}"`);
console.log('');
console.log('consume it with:');
console.log(`  "@repo/${name}": "workspace:*"`);
console.log(`  import { ... } from '@repo/${name}';`);
console.log('');
console.log('next: bun install');
