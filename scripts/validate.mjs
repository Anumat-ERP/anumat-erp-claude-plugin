#!/usr/bin/env node
/**
 * Structural validator for the anumat-erp plugin marketplace.
 *
 * Run from anywhere:  node scripts/validate.mjs
 * Exit 0 = all checks pass. Exit 1 = at least one failure.
 */
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Body-length caps, in lines. Progressive disclosure: detail lives in reference files. */
/** Applies to any skill without an explicit entry, so a new skill is never
 *  silently uncapped. Keying the cap purely by name meant adding a row fixed
 *  one skill rather than the hole. */
const DEFAULT_SKILL_BODY_MAX = 150;

const SKILL_BODY_MAX = {
  'design-stack': 150,
  'design-evidence': 80,
  'monorepo-stack': 120,
};

/**
 * The one path form allowed in skill and command content.
 *
 * Anchored to ${CLAUDE_PLUGIN_ROOT} because nothing else resolves reliably:
 * a command runs with cwd set to the USER'S project, and a bare `patterns/x.md`
 * inside a nested content file is relative to a directory the reader has to
 * guess. One absolute form works identically from every file.
 */
const REF_PATTERN = /\$\{CLAUDE_PLUGIN_ROOT\}\/[A-Za-z0-9._/-]+\.md/g;

/**
 * The ambiguous form this plugin used to use. Matched so it can be rejected —
 * these paths look correct, pass a naive existence check against the owning
 * skill, and resolve to nothing at runtime.
 */
const BARE_REF_PATTERN =
  /(?<![\w/$}-])(?:reference|patterns|systems|templates)\/[A-Za-z0-9._-]+\.md/g;

/** Directories inside a skill that hold routed content files. */
const CONTENT_DIRS = ['reference', 'patterns', 'systems', 'templates'];

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

/** Every .md file under `path`, nested folders included, sorted. A content
 *  file in a subfolder is still content: skipping it hid broken refs and orphans. */
const mdFiles = (path) =>
  isDir(path)
    ? readdirSync(path, { withFileTypes: true })
        .flatMap((d) =>
          d.isDirectory()
            ? mdFiles(join(path, d.name))
            : d.isFile() && d.name.endsWith('.md')
              ? [join(path, d.name)]
              : [],
        )
        .sort()
    : [];

/** A plugin whose manifest lists dependencies and ships no skills or commands. */
function isBundle(pdir) {
  try {
    const m = JSON.parse(readFileSync(join(pdir, '.claude-plugin', 'plugin.json'), 'utf8'));
    return Array.isArray(m.dependencies) && m.dependencies.length > 0 && !isDir(join(pdir, 'skills')) && !isDir(join(pdir, 'commands'));
  } catch {
    return false;
  }
}

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
  if (market.name !== 'anumat-erp') {
    fail(check, `marketplace name must be 'anumat-erp', got ${JSON.stringify(market.name)}`);
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

  // A bundle's dependencies must be plugins this marketplace ships.
  const names = new Set((market.plugins ?? []).map((p) => p.name));
  for (const pdir of pluginDirs) {
    const path = join(pdir, '.claude-plugin', 'plugin.json');
    if (!existsSync(path)) continue;
    let deps = [];
    try {
      deps = JSON.parse(readFileSync(path, 'utf8')).dependencies ?? [];
    } catch {
      continue;
    }
    for (const dep of deps) {
      const depName = typeof dep === 'string' ? dep.split('@')[0] : dep?.name;
      if (!names.has(depName)) fail(check, `${rel(path)} depends on ${JSON.stringify(depName)}, which is not in marketplace.json`);
    }
  }

  if (clean(check)) ok(check);
  return pluginDirs;
}

/** Strip the ${CLAUDE_PLUGIN_ROOT}/ prefix to get a plugin-relative path. */
const stripRoot = (ref) => ref.replace('${CLAUDE_PLUGIN_ROOT}/', '');

/**
 * Every routed path in one file: anchored ones must resolve from the plugin
 * root, and bare ones are rejected outright as unresolvable-at-runtime.
 */
function checkRefsIn(src, text, pdir, check) {
  for (const ref of [...new Set(text.match(REF_PATTERN) ?? [])].sort()) {
    if (!existsSync(join(pdir, stripRoot(ref)))) {
      fail(check, `${rel(src)} routes to ${ref}, which does not exist`);
    }
  }
  for (const bare of [...new Set(text.match(BARE_REF_PATTERN) ?? [])].sort()) {
    fail(
      check,
      `${rel(src)} uses the bare path "${bare}" — ambiguous at runtime. ` +
        `Anchor it: \${CLAUDE_PLUGIN_ROOT}/skills/<skill>/${bare}`,
    );
  }
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
      // A bundle plugin only lists dependencies; it has no skills of its own.
      if (isBundle(pdir)) continue;
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

      const cap = SKILL_BODY_MAX[name] ?? DEFAULT_SKILL_BODY_MAX;
      const bodyLines = body.trim().split(/\r?\n/).length;
      if (bodyLines > cap) {
        fail(
          lenCheck,
          `${rel(skillMd)} body is ${bodyLines} lines, cap is ${cap} ` +
            `— move detail into a reference file`,
        );
      }

      // Outbound references, from the skill body AND from its content files:
      // a dangling link inside a reference file strands the reader just as
      // surely as one in SKILL.md.
      const sources = [skillMd, ...CONTENT_DIRS.flatMap((d) => mdFiles(join(skillDir, d)))];
      for (const src of sources) {
        checkRefsIn(src, src === skillMd ? body : readFileSync(src, 'utf8'), pdir, refCheck);
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
    for (const skillDir of subdirs(join(pdir, 'skills'))) {
      const files = [
        join(skillDir, 'SKILL.md'),
        ...CONTENT_DIRS.flatMap((d) => mdFiles(join(skillDir, d))),
      ];
      for (const md of [...files, ...mdFiles(join(pdir, 'commands'))]) {
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
  }
  if (clean(check)) ok(check);
}

/**
 * Commands are content too: they route to skill files and they need a
 * description to appear in the slash-command list.
 */
function checkCommands(pluginDirs) {
  const check = 'commands';
  for (const pdir of pluginDirs) {
    const cmdDir = join(pdir, 'commands');
    if (!isDir(cmdDir)) continue;
    for (const md of mdFiles(cmdDir)) {
      const parsed = parseFrontmatter(md, check);
      if (parsed === null) continue;
      if (!parsed.front.description) {
        fail(check, `${rel(md)} frontmatter missing 'description'`);
      }
      checkRefsIn(md, parsed.body, pdir, check);
    }
  }
  if (clean(check)) ok(check);
}

/**
 * A content file nothing routes to is invisible at runtime: Claude never
 * learns it exists, so the plugin looks like it is working while having no
 * evidence to read. Mentions count from any skill in the plugin.
 */
function checkOrphans(pluginDirs) {
  const check = 'orphans';
  for (const pdir of pluginDirs) {
    const skillsRoot = join(pdir, 'skills');
    if (!isDir(skillsRoot)) continue;
    const skillDirs = subdirs(skillsRoot);

    const mentioned = new Set();
    for (const skillDir of skillDirs) {
      const corpus = [
        join(skillDir, 'SKILL.md'),
        ...CONTENT_DIRS.flatMap((d) => mdFiles(join(skillDir, d))),
      ];
      for (const md of corpus) {
        if (!existsSync(md)) continue;
        for (const ref of readFileSync(md, 'utf8').match(REF_PATTERN) ?? []) {
          mentioned.add(stripRoot(ref));
        }
      }
    }
    for (const md of mdFiles(join(pdir, 'commands'))) {
      for (const ref of readFileSync(md, 'utf8').match(REF_PATTERN) ?? []) {
        mentioned.add(stripRoot(ref));
      }
    }

    for (const skillDir of skillDirs) {
      for (const sub of CONTENT_DIRS) {
        for (const md of mdFiles(join(skillDir, sub))) {
          const key = `skills/${basename(skillDir)}/${sub}/${basename(md)}`;
          if (!mentioned.has(key)) {
            fail(
              check,
              `${rel(md)} is never referenced by any skill in this plugin — ` +
                `unroutable files are invisible at runtime`,
            );
          }
        }
      }
    }
  }
  if (clean(check)) ok(check);
}

/** WCAG relative luminance. */
function luminance(hex) {
  const channels = [1, 3, 5]
    .map((i) => parseInt(hex.substr(i, 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** WCAG contrast ratio between two hex colours. */
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * The token example in 01-foundations.md is presented as "the minimum set any
 * project needs", so people will copy it. It must satisfy the thresholds this
 * plugin's own review checklist calls BLOCKING — a reference that fails its
 * own audit teaches the wrong thing twice.
 */
const TOKEN_MINIMA = [
  ['--text-primary', 4.5],
  ['--text-secondary', 4.5],
  ['--border-interactive', 3],
  ['--intent-accent', 3],
  ['--intent-danger', 3],
  ['--intent-warning', 3],
  ['--intent-success', 3],
];

function checkTokenContrast(pluginDirs) {
  const check = 'contrast';
  for (const pdir of pluginDirs) {
    const md = join(pdir, 'skills', 'design-stack', 'reference', '01-foundations.md');
    if (!existsSync(md)) continue;
    const text = readFileSync(md, 'utf8');
    const value = (name) => new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`).exec(text)?.[1];

    const base = value('--surface-base');
    if (!base) {
      fail(check, `${rel(md)} has no --surface-base token to measure against`);
      continue;
    }
    for (const [token, minimum] of TOKEN_MINIMA) {
      const hex = value(token);
      if (!hex) {
        fail(check, `${rel(md)} is missing the ${token} token`);
        continue;
      }
      const ratio = contrast(hex, base);
      if (ratio < minimum) {
        fail(
          check,
          `${rel(md)}: ${token} (${hex}) is ${ratio.toFixed(2)}:1 against ` +
            `--surface-base (${base}), below the ${minimum}:1 this plugin requires`,
        );
      }
    }
  }
  if (clean(check)) ok(check);
}

function main() {
  const pluginDirs = checkManifests();
  checkSkills(pluginDirs);
  checkAesthetics(pluginDirs);
  checkCommands(pluginDirs);
  checkTokenContrast(pluginDirs);
  checkOrphans(pluginDirs);

  for (const line of ERRORS) console.log(line);
  if (ERRORS.length) {
    console.log(`\n${ERRORS.length} error(s)`);
    return 1;
  }
  console.log(`${PASSED.length} check(s) passed: ${PASSED.join(', ')}`);
  return 0;
}

process.exit(main());
