#!/usr/bin/env node
/**
 * Add Storybook to the UI package of an existing workspace.
 *
 *   node add-storybook.mjs [--cwd <dir>] [--package <relative dir>]
 *
 * Deliberately package-manager agnostic: this runs on repos this plugin did
 * not create, and telling a pnpm user to run `bun install` is how a helpful
 * command becomes a broken one.
 */
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTree } from './lib/template.mjs';
import {
  detectPackageManager,
  findWorkspaceRoot,
  installCommand,
  readJson,
  runCommand,
  writeJson,
} from './lib/workspace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = (flag) => {
  const i = args.indexOf(flag);
  return i === -1 ? null : args[i + 1];
};

const start = resolve(opt('--cwd') ?? process.cwd());
const root = findWorkspaceRoot(start);
if (!root) {
  console.error(`no workspace root found from ${start}`);
  process.exit(1);
}

/** The UI package: named explicitly, or the first packages/* dir that looks like one. */
function findUiPackage() {
  const explicit = opt('--package');
  if (explicit) return resolve(root, explicit);
  const packages = join(root, 'packages');
  if (!existsSync(packages)) return null;
  const match = readdirSync(packages).find((n) => /^(ui|design-system|components)$/.test(n));
  return match ? join(packages, match) : null;
}

const uiDir = findUiPackage();
if (!uiDir || !existsSync(join(uiDir, 'package.json'))) {
  console.error('No UI package found under packages/. Pass --package <relative dir>.');
  process.exit(1);
}
if (existsSync(join(uiDir, '.storybook'))) {
  console.error(`Storybook is already configured at ${join(uiDir, '.storybook')}`);
  process.exit(1);
}

renderTree(join(HERE, '..', 'templates', 'overlay', 'storybook'), uiDir, {});

const manifestPath = join(uiDir, 'package.json');
const manifest = readJson(manifestPath);
manifest.scripts = {
  ...manifest.scripts,
  storybook: 'storybook dev -p 6006',
  'storybook:build': 'storybook build',
};
writeJson(manifestPath, manifest);

const pm = detectPackageManager(root) ?? 'bun';
const deps = ['storybook@^9', '@storybook/react-vite@^9', '@storybook/addon-a11y@^9', 'vite@^7'];
const addCmd = pm === 'npm' ? `npm install -D ${deps.join(' ')}` : `${pm} add -D ${deps.join(' ')}`;

console.log(`Storybook config written to ${join(uiDir, '.storybook')}`);
console.log(`Detected package manager: ${pm}`);
console.log('');
console.log('Next:');
console.log(`  ${addCmd}`);
console.log(`  ${installCommand(pm)}`);
console.log(`  ${runCommand(pm, 'storybook')}`);
console.log('');
console.log('The react-vite framework is used rather than the Next one: a UI package is');
console.log('framework-agnostic React, and coupling its Storybook to Next drags an entire');
console.log('build pipeline into a package that does not use it.');
