import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const LOCKFILES = [
  ['bun.lock', 'bun'],
  ['bun.lockb', 'bun'],
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  ['package-lock.json', 'npm'],
];

/**
 * Detect the package manager from the lockfile.
 *
 * The lockfile is what the repo actually installed with; the `packageManager`
 * field is an intention that may be stale or aspirational. Brownfield commands
 * depend on getting this right — telling a pnpm user to run `bun install` is
 * how a helpful command becomes a broken one.
 */
export function detectPackageManager(root) {
  for (const [file, pm] of LOCKFILES) {
    if (existsSync(join(root, file))) return pm;
  }
  // No lockfile: the packageManager field is now the only evidence available.
  // Preferring it over a guess is the whole point of not assuming Bun.
  const declared = safeReadJson(join(root, 'package.json'))?.packageManager;
  const name = typeof declared === 'string' ? declared.split('@')[0] : null;
  return ['bun', 'pnpm', 'npm', 'yarn'].includes(name) ? name : null;
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/** readJson that returns null instead of throwing. For inspecting repos we do
 *  not control, where a malformed file is data rather than a crash. */
export function safeReadJson(path) {
  try {
    return readJson(path);
  } catch {
    return null;
  }
}

export function writeJson(path, obj) {
  writeFileSync(path, `${JSON.stringify(obj, null, 2)}\n`);
}

/**
 * Walk up looking for a workspace root: a package.json with a `workspaces`
 * field, or a pnpm-workspace.yaml beside one.
 */
export function findWorkspaceRoot(startDir) {
  let dir = resolve(startDir);
  for (;;) {
    const manifest = join(dir, 'package.json');
    if (existsSync(manifest)) {
      if (existsSync(join(dir, 'pnpm-workspace.yaml'))) return dir;
      try {
        if (readJson(manifest).workspaces) return dir;
      } catch {
        /* unreadable manifest: keep walking */
      }
    }
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

const dirsIn = (path) =>
  existsSync(path)
    ? readdirSync(path, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];

export function listWorkspacePackages(root, unreadable = []) {
  const out = [];
  for (const group of ['apps', 'packages']) {
    for (const name of dirsIn(join(root, group))) {
      const manifestPath = join(root, group, name, 'package.json');
      if (!existsSync(manifestPath)) continue;
      const manifest = safeReadJson(manifestPath);
      if (manifest === null) {
        unreadable.push(`${group}/${name}/package.json`);
        continue;
      }
      out.push({ name, dir: join(root, group, name), manifest });
    }
  }
  return out;
}

/**
 * Lowest free dev port at or above `base`, read from every app's dev script.
 * Two apps on one port is silent until somebody runs both, which is why this
 * is computed rather than left to whoever adds the app.
 */
/** Framework defaults, for dev scripts that never name a port. */
const DEFAULT_PORTS = [
  [/\bnext\b/, 3000],
  [/\bvite\b/, 5173],
  [/\bremix\b/, 3000],
  [/\bnuxt\b/, 3000],
  [/\bastro\b/, 4321],
];

/** The port a dev script will actually bind, explicit or implied. */
export function portOf(devScript) {
  const explicit = /(?:--port[= ]|PORT=)(\d+)/.exec(devScript);
  if (explicit) return Number(explicit[1]);
  // A script with no flag still occupies the framework's default. Ignoring
  // that is how add-app hands out a port an existing app is already using —
  // the exact silent collision this function exists to prevent.
  for (const [pattern, port] of DEFAULT_PORTS) {
    if (pattern.test(devScript)) return port;
  }
  return null;
}

export function nextFreePort(root, base = 3000) {
  const taken = new Set();
  for (const pkg of listWorkspacePackages(root)) {
    const port = portOf(pkg.manifest.scripts?.dev ?? '');
    if (port !== null) taken.add(port);
  }
  let port = base;
  while (taken.has(port)) port++;
  return port;
}

export const installCommand = (pm) => `${pm ?? 'bun'} install`;

export const runCommand = (pm, script) =>
  pm === 'npm' ? `npm run ${script}` : `${pm ?? 'bun'} run ${script}`;
