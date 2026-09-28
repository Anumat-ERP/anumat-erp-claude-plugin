#!/usr/bin/env node
/** Add an app to an existing workspace. Usage: node add-app.mjs <name> [--cwd <dir>] */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTree } from './lib/template.mjs';
import { findWorkspaceRoot, nextFreePort } from './lib/workspace.mjs';
import { parseArgs, resolveCwd, validateName } from './lib/args.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const { positionals, flags } = parseArgs(process.argv.slice(2));
const name = positionals[0];

const nameError = validateName(name, 'app');
if (nameError) {
  console.error(nameError);
  process.exit(1);
}

const { dir: start, error } = resolveCwd(flags, 'app');
if (error) {
  console.error(error);
  process.exit(1);
}

const root = findWorkspaceRoot(start);
if (!root) {
  console.error(`no workspace root found from ${start}`);
  process.exit(1);
}

const dest = join(root, 'apps', name);
if (existsSync(dest)) {
  console.error(`app already exists: ${dest}`);
  process.exit(1);
}

const port = nextFreePort(root, 3000);
renderTree(join(HERE, '..', 'templates', 'app'), dest, {
  __APP_NAME__: name,
  __PORT__: String(port),
});

// The apps/* glob already covers the new directory, so the root manifest is
// deliberately left alone — rewriting it would churn the lockfile for nothing.
console.log(`added app "${name}" on port ${port}`);
console.log('next: bun install');
