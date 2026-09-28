#!/usr/bin/env node
/**
 * Add a shared package. Usage: node add-package.mjs <name> [--cwd <dir>]
 *
 * A package holds technical capability with no business knowledge. If it
 * needs to know what a customer or an invoice is, it is a module — use
 * add-module.mjs instead.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTree } from './lib/template.mjs';
import { findWorkspaceRoot } from './lib/workspace.mjs';
import { parseArgs, resolveCwd, validateName } from './lib/args.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const { positionals, flags } = parseArgs(process.argv.slice(2));
const name = positionals[0];

const nameError = validateName(name, 'package');
if (nameError) {
  console.error(nameError);
  process.exit(1);
}

const { dir: start, error } = resolveCwd(flags, 'package');
if (error) {
  console.error(error);
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
