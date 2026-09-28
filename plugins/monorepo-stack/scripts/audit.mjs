#!/usr/bin/env node
/**
 * Report deviations from the monorepo-stack conventions.
 *
 *   node audit.mjs [--cwd <dir>] [--json]
 *
 * READ-ONLY. This runs on somebody's real repository; it never writes, and it
 * always exits 0 — an audit is information, not a gate. A crash on real-world
 * input is worse than a missed finding, so every probe degrades rather than
 * throws.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  detectPackageManager,
  findWorkspaceRoot,
  listWorkspacePackages,
} from './lib/workspace.mjs';

const args = process.argv.slice(2);
const opt = (flag) => {
  const i = args.indexOf(flag);
  return i === -1 ? null : args[i + 1];
};

const start = resolve(opt('--cwd') ?? process.cwd());
const root = findWorkspaceRoot(start);
if (!root) {
  console.error(`no workspace root found from ${start}`);
  process.exit(0);
}

const findings = [];
const finding = (id, severity, message, fix) => findings.push({ id, severity, message, fix });

const pm = detectPackageManager(root);
const packages = listWorkspacePackages(root);
const uiPackage = packages.find((p) => /^(ui|design-system|components)$/.test(p.name));

if (pm === null) {
  finding('no-lockfile', 'critical', 'No lockfile: installs are not reproducible.',
    'Commit the lockfile your package manager produces.');
}

if (!existsSync(join(root, 'turbo.json'))) {
  finding('no-turbo', 'important',
    'No turbo.json: no task graph and no build caching.',
    'Add turbo.json with dependsOn ["^build"] and cache outputs.');
}

if (!uiPackage) {
  finding('no-ui-package', 'important',
    'No shared UI package under packages/: components are likely duplicated per app.',
    'Create one, then run /monorepo-stack:add-storybook.');
} else if (!existsSync(join(uiPackage.dir, '.storybook'))) {
  finding('no-storybook', 'important',
    `UI package "${uiPackage.name}" has no Storybook: the component inventory is not browsable, and design tooling cannot read what already exists.`,
    'Run /monorepo-stack:add-storybook.');
}

// Two apps on one port is silent until somebody runs both.
const ports = new Map();
for (const pkg of packages) {
  const match = /--port[= ](\d+)/.exec(pkg.manifest.scripts?.dev ?? '');
  if (!match) continue;
  const port = match[1];
  if (ports.has(port)) {
    finding('port-collision', 'critical',
      `Apps "${ports.get(port)}" and "${pkg.name}" both use port ${port}.`,
      'Give each app a distinct dev port.');
  }
  ports.set(port, pkg.name);
}

for (const pkg of packages) {
  const all = { ...pkg.manifest.dependencies, ...pkg.manifest.devDependencies };
  for (const [dep, range] of Object.entries(all)) {
    if (dep.startsWith('@repo/') && !String(range).startsWith('workspace:')) {
      finding('internal-not-workspace', 'important',
        `${pkg.name} depends on ${dep} with "${range}" instead of "workspace:*".`,
        'Use workspace:* so the local package is always linked.');
    }
  }
}

/**
 * Modules, read from their manifests.
 *
 * Parsed with a regex rather than imported: this is a read-only audit of a
 * repo whose dependencies may not even be installed, and executing someone
 * else's TypeScript to inspect it would be both fragile and rude.
 */
const modulesDir = join(root, 'modules');
const moduleNames = existsSync(modulesDir)
  ? readdirSync(modulesDir).filter((n) => statSync(join(modulesDir, n)).isDirectory())
  : [];

const declared = new Map();
for (const name of moduleNames) {
  const manifestPath = join(modulesDir, name, 'module.config.ts');
  if (!existsSync(manifestPath)) {
    finding('module-no-manifest', 'important',
      `Module "${name}" has no module.config.ts, so nothing can discover what it depends on or contributes.`,
      'Add a manifest declaring name, depends, permissions and navigation.');
    continue;
  }
  const source = readFileSync(manifestPath, 'utf8');
  const depends = [...(/depends:\s*\[([^\]]*)\]/.exec(source)?.[1] ?? '').matchAll(/['"]([^'"]+)['"]/g)]
    .map((m) => m[1]);
  declared.set(name, depends);
}

for (const [name, depends] of declared) {
  for (const dep of depends) {
    if (!declared.has(dep)) {
      finding('module-missing-dependency', 'critical',
        `Module "${name}" declares a dependency on "${dep}", which is not installed.`,
        `Add the "${dep}" module, or remove it from ${name}'s depends.`);
    }
  }
}

if (moduleNames.length === 0 && packages.length > 4) {
  finding('no-modules', 'minor',
    'No modules/ directory: business capabilities are probably living inside apps, which makes them unshareable.',
    'Extract a capability with /monorepo-stack:add-module.');
}

if (!existsSync(join(root, 'docs', 'adr'))) {
  finding('no-adr', 'minor',
    'No docs/adr/: architectural decisions are not being recorded, so the reasoning is lost and gets re-litigated.',
    'Add docs/adr/ and record decisions that constrain what others can do.');
}

const report = { root, packageManager: pm, packages: packages.length, modules: moduleNames.length, findings };

if (args.includes('--json')) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

console.log(`Workspace:       ${root}`);
console.log(`Package manager: ${pm ?? 'unknown'}`);
console.log(`Packages:        ${packages.length}`);
console.log(`Modules:         ${moduleNames.length}\n`);

if (!findings.length) {
  console.log('No deviations found.');
  process.exit(0);
}

const order = { critical: 0, important: 1, minor: 2 };
for (const f of findings.sort((a, b) => order[a.severity] - order[b.severity])) {
  console.log(`[${f.severity.toUpperCase()}] ${f.id}`);
  console.log(`  ${f.message}`);
  console.log(`  fix: ${f.fix}\n`);
}
console.log('Nothing was modified.');
process.exit(0);
