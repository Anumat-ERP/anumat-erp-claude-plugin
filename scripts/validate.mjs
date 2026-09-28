#!/usr/bin/env node
/**
 * Structural validator for the chamrong plugin marketplace.
 *
 * Run from anywhere:  node scripts/validate.mjs
 * Exit 0 = all checks pass. Exit 1 = at least one failure.
 */
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** @type {string[]} */
const ERRORS = [];
/** @type {string[]} */
const PASSED = [];

const fail = (check, message) => ERRORS.push(`FAIL: ${check}: ${message}`);
const ok = (check) => PASSED.push(check);
const rel = (path) => relative(ROOT, path).split('\\').join('/');
const clean = (check) => !ERRORS.some((e) => e.startsWith(`FAIL: ${check}:`));
const isDir = (path) => existsSync(path) && statSync(path).isDirectory();

const subdirs = (path) =>
  isDir(path)
    ? readdirSync(path, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => join(path, d.name))
        .sort()
    : [];

const mdFiles = (path) =>
  isDir(path)
    ? readdirSync(path, { withFileTypes: true })
        .filter((d) => d.isFile() && d.name.endsWith('.md'))
        .map((d) => join(path, d.name))
        .sort()
    : [];

function loadJson(path, check) {
  if (!existsSync(path)) {
    fail(check, `missing file ${rel(path)}`);
    return null;
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    fail(check, `invalid JSON in ${rel(path)}: ${err.message}`);
    return null;
  }
}

/**
 * Validate marketplace.json and every plugin.json it points at.
 * @returns {string[]} plugin directories found, for later checks.
 */
function checkManifests() {
  const check = 'manifests';
  const pluginDirs = [];

  const market = loadJson(join(ROOT, '.claude-plugin', 'marketplace.json'), check);
  if (market === null) return pluginDirs;

  for (const field of ['name', 'owner', 'plugins']) {
    if (!(field in market)) {
      fail(check, `marketplace.json missing required field '${field}'`);
    }
  }
  if (market.name !== 'chamrong') {
    fail(check, `marketplace name must be 'chamrong', got ${JSON.stringify(market.name)}`);
  }

  for (const entry of market.plugins ?? []) {
    const name = entry.name ?? '<unnamed>';
    const source = entry.source;
    if (typeof source !== 'string') {
      fail(check, `plugin ${name}: 'source' must be a relative path string`);
      continue;
    }
    if (source.includes('\\')) {
      fail(check, `plugin ${name}: 'source' must use forward slashes, got ${JSON.stringify(source)}`);
      continue;
    }
    if (!source.startsWith('./')) {
      fail(check, `plugin ${name}: 'source' must start with './', got ${JSON.stringify(source)}`);
      continue;
    }

    const pdir = resolve(ROOT, source.slice(2));
    if (!isDir(pdir)) {
      fail(check, `plugin ${name}: source dir ${source} does not exist`);
      continue;
    }
    pluginDirs.push(pdir);

    const manifest = loadJson(join(pdir, '.claude-plugin', 'plugin.json'), check);
    if (manifest === null) continue;
    if (manifest.name !== name) {
      fail(
        check,
        `plugin ${name}: plugin.json name is ${JSON.stringify(manifest.name)}, ` +
          `must match marketplace entry`,
      );
    }
    if (manifest.version !== entry.version) {
      fail(
        check,
        `plugin ${name}: version mismatch — marketplace ` +
          `${JSON.stringify(entry.version)} vs plugin.json ${JSON.stringify(manifest.version)}`,
      );
    }
  }

  if (clean(check)) ok(check);
  return pluginDirs;
}

function main() {
  checkManifests();

  for (const line of ERRORS) console.log(line);
  if (ERRORS.length) {
    console.log(`\n${ERRORS.length} error(s)`);
    return 1;
  }
  console.log(`${PASSED.length} check(s) passed: ${PASSED.join(', ')}`);
  return 0;
}

process.exit(main());
