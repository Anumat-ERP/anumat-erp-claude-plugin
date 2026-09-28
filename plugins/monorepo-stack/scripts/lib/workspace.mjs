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
  return null;
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
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
    ? readdirSync(path).filter((n) => statSync(join(path, n)).isDirectory())
    : [];

export function listWorkspacePackages(root) {
  const out = [];
  for (const group of ['apps', 'packages']) {
    for (const name of dirsIn(join(root, group))) {
      const manifest = join(root, group, name, 'package.json');
      if (!existsSync(manifest)) continue;
      out.push({ name, dir: join(root, group, name), manifest: readJson(manifest) });
    }
  }
  return out;
}

/**
 * Lowest free dev port at or above `base`, read from every app's dev script.
 * Two apps on one port is silent until somebody runs both, which is why this
 * is computed rather than left to whoever adds the app.
 */
export function nextFreePort(root, base = 3000) {
  const taken = new Set();
  for (const pkg of listWorkspacePackages(root)) {
    const dev = pkg.manifest.scripts?.dev ?? '';
    const match = /--port[= ](\d+)/.exec(dev);
    if (match) taken.add(Number(match[1]));
  }
  let port = base;
  while (taken.has(port)) port++;
  return port;
}

export const installCommand = (pm) => `${pm ?? 'bun'} install`;

export const runCommand = (pm, script) =>
  pm === 'npm' ? `npm run ${script}` : `${pm ?? 'bun'} run ${script}`;
