#!/usr/bin/env node
/**
 * Structural validator for the chamrong plugin marketplace.
 *
 * Run from anywhere:  node scripts/validate.mjs
 * Exit 0 = all checks pass. Exit 1 = at least one failure.
 */
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Body-length caps, in lines. Progressive disclosure: detail lives in reference files. */
const SKILL_BODY_MAX = { 'design-stack': 150, 'design-evidence': 80 };

/**
 * Matches reference/foo.md, patterns/foo.md, systems/FOO.md in skill bodies,
 * whether written bare, in backticks, or as a markdown link target.
 */
const REF_PATTERN = /(?:reference|patterns|systems)\/[A-Za-z0-9._-]+\.md/g;

/** Directories inside a skill that hold routed content files. */
const CONTENT_DIRS = ['reference', 'patterns', 'systems'];

/**
 * Vocabulary that belongs to the frontend-design skill, not this one.
 * Substring match, case-insensitive, over the design-stack skill only.
 */
const AESTHETIC_TERMS = [
  'premium feel',
  'modern look',
  'beautiful',
  'sleek',
  'eye-catching',
  'visually stunning',
  'gorgeous',
  'aesthetically pleasing',
];

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

/**
 * Split a markdown file into its YAML frontmatter and its body.
 * @returns {{front: Record<string,string>, body: string} | null}
 */
function parseFrontmatter(path, check) {
  const text = readFileSync(path, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(text);
  if (!match) {
    fail(check, `${rel(path)} has no YAML frontmatter block`);
    return null;
  }
  /** @type {Record<string,string>} */
  const front = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (/^[ \t]/.test(line) || !line.includes(':')) continue;
    const idx = line.indexOf(':');
    front[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { front, body: match[2] };
}

/**
 * Validate every skill's frontmatter, body length, and outbound references.
 *
 * References resolve against ANY skill directory in the same plugin: the
 * design-stack pipeline deliberately routes to patterns/ and systems/ files
 * that live in the design-evidence skill, and a plugin's skills ship together.
 */
function checkSkills(pluginDirs) {
  const fmCheck = 'frontmatter';
  const lenCheck = 'length';
  const refCheck = 'refs';
  let foundAny = false;

  for (const pdir of pluginDirs) {
    const skillsRoot = join(pdir, 'skills');
    if (!isDir(skillsRoot)) {
      fail(fmCheck, `${rel(pdir)} has no skills/ directory`);
      continue;
    }
    const skillDirs = subdirs(skillsRoot);

    for (const skillDir of skillDirs) {
      foundAny = true;
      const name = basename(skillDir);
      const skillMd = join(skillDir, 'SKILL.md');
      if (!existsSync(skillMd)) {
        fail(fmCheck, `${rel(skillDir)} has no SKILL.md`);
        continue;
      }

      const parsed = parseFrontmatter(skillMd, fmCheck);
      if (parsed === null) continue;
      const { front, body } = parsed;

      for (const field of ['name', 'description']) {
        if (!front[field]) {
          fail(fmCheck, `${rel(skillMd)} frontmatter missing '${field}'`);
        }
      }
      if (front.name !== name) {
        fail(
          fmCheck,
          `${rel(skillMd)} frontmatter name ${JSON.stringify(front.name)} ` +
            `must match directory name ${JSON.stringify(name)}`,
        );
      }
      const desc = front.description ?? '';
      if (desc.length < 40) {
        fail(
          fmCheck,
          `${rel(skillMd)} description is too short to trigger reliably ` +
            `(${desc.length} chars, need 40+)`,
        );
      }

      const cap = SKILL_BODY_MAX[name];
      const bodyLines = body.trim().split(/\r?\n/).length;
      if (cap !== undefined && bodyLines > cap) {
        fail(
          lenCheck,
          `${rel(skillMd)} body is ${bodyLines} lines, cap is ${cap} ` +
            `— move detail into a reference file`,
        );
      }

      const refs = [...new Set(body.match(REF_PATTERN) ?? [])].sort();
      for (const ref of refs) {
        if (!skillDirs.some((d) => existsSync(join(d, ref)))) {
          fail(refCheck, `${rel(skillMd)} routes to ${ref}, which exists in no skill of this plugin`);
        }
      }
    }
  }

  if (!foundAny) fail(fmCheck, 'no skills found in any plugin');
  for (const check of [fmCheck, lenCheck, refCheck]) {
    if (clean(check)) ok(check);
  }
}

/**
 * The design-stack skill constrains structure, not appearance. Aesthetic
 * vocabulary here would contradict the frontend-design skill when both are
 * loaded into the same context.
 */
function checkAesthetics(pluginDirs) {
  const check = 'aesthetics';
  for (const pdir of pluginDirs) {
    const skillDir = join(pdir, 'skills', 'design-stack');
    if (!isDir(skillDir)) continue;
    const files = [join(skillDir, 'SKILL.md'), ...CONTENT_DIRS.flatMap((d) => mdFiles(join(skillDir, d)))];
    for (const md of files) {
      if (!existsSync(md)) continue;
      const lowered = readFileSync(md, 'utf8').toLowerCase();
      for (const term of AESTHETIC_TERMS) {
        if (lowered.includes(term)) {
          fail(
            check,
            `${rel(md)} contains aesthetic term "${term}" — ` +
              `appearance guidance belongs to the frontend-design skill`,
          );
        }
      }
    }
  }
  if (clean(check)) ok(check);
}

function main() {
  const pluginDirs = checkManifests();
  checkSkills(pluginDirs);
  checkAesthetics(pluginDirs);

  for (const line of ERRORS) console.log(line);
  if (ERRORS.length) {
    console.log(`\n${ERRORS.length} error(s)`);
    return 1;
  }
  console.log(`${PASSED.length} check(s) passed: ${PASSED.join(', ')}`);
  return 0;
}

process.exit(main());
