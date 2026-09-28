import type { ModuleManifest, NavigationEntry } from './manifest.js';

export class MissingDependencyError extends Error {
  constructor(
    readonly module: string,
    readonly missing: string,
  ) {
    super(`Module "${module}" depends on "${missing}", which is not installed.`);
    this.name = 'MissingDependencyError';
  }
}

export class CircularDependencyError extends Error {
  constructor(readonly cycle: readonly string[]) {
    super(`Circular module dependency: ${cycle.join(' -> ')}`);
    this.name = 'CircularDependencyError';
  }
}

/**
 * Resolve installation order from the declared `depends` graph.
 *
 * Depth-first with an explicit visiting set, so a cycle is reported as the
 * path that formed it rather than as a stack overflow. Getting the cycle
 * named is most of the work of fixing it.
 */
export function resolveOrder(manifests: readonly ModuleManifest[]): ModuleManifest[] {
  const byName = new Map(manifests.map((m) => [m.name, m]));
  const ordered: ModuleManifest[] = [];
  const done = new Set<string>();
  const visiting = new Set<string>();

  const visit = (name: string, path: readonly string[]) => {
    if (done.has(name)) return;
    if (visiting.has(name)) throw new CircularDependencyError([...path, name]);

    const manifest = byName.get(name);
    if (!manifest) throw new MissingDependencyError(path.at(-1) ?? '<root>', name);

    visiting.add(name);
    for (const dep of manifest.depends) visit(dep, [...path, name]);
    visiting.delete(name);

    done.add(name);
    ordered.push(manifest);
  };

  for (const manifest of manifests) visit(manifest.name, []);
  return ordered;
}

/** Every permission across the installation, deduplicated and sorted. */
export function collectPermissions(manifests: readonly ModuleManifest[]): string[] {
  return [...new Set(manifests.flatMap((m) => m.permissions))].sort();
}

/**
 * Navigation for one viewer, filtered by permission and sorted by `order`.
 *
 * Entries the viewer cannot use are removed rather than disabled: a menu is a
 * map of where you can go, and a permanently dead entry is a map with a road
 * drawn on it that does not exist.
 */
export function collectNavigation(
  manifests: readonly ModuleManifest[],
  can: (permission: string) => boolean,
): NavigationEntry[] {
  return manifests
    .flatMap((m) => m.navigation ?? [])
    .filter((entry) => !entry.requires || can(entry.requires))
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
}
