import { readFileSync, writeFileSync } from 'node:fs';

/**
 * Resolve catalog versions from the npm registry at scaffold time.
 *
 * Templates carry curated majors, not exact versions. A scaffolder pinned to
 * whatever its author typed is wrong within weeks, and silently so — the
 * generated repo looks current and is two minors behind on everything.
 *
 * What the template DOES own is the major. "Newest" and "works together" are
 * different questions: Storybook 9 with Next 16 with Vitest 3 is a combination
 * that has been tested, and resolving each dependency to its own independent
 * latest is how you get a workspace that installs but does not build.
 */

/** Major from a range like `^19.2.0`, `~4.1.0`, `5.9.2`, `>=22`. */
export function parseMajor(range) {
  const match = /(\d+)/.exec(String(range));
  return match ? Number(match[1]) : 0;
}

const PREFIX = /^[\^~>=<\s]*/;

const compare = (a, b) => {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    // Numeric, not lexical: '19.9.0' must sort below '19.10.0'.
    if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
  }
  return 0;
};

/**
 * Newest available version compatible with `range`, keeping its prefix.
 * Returns `range` unchanged when nothing better is available — including when
 * the registry could not be reached, so offline degrades to the curated pins.
 */
export function pickVersion(range, available, { allowMajorBumps = false } = {}) {
  const prefix = (PREFIX.exec(range)?.[0] ?? '').trim();
  const currentMajor = parseMajor(range);
  const current = range.replace(PREFIX, '');

  const candidates = available
    .filter((v) => /^\d+\.\d+\.\d+$/.test(v)) // stable only: no canary, rc, beta
    .filter((v) => allowMajorBumps || parseMajor(v) === currentMajor)
    .sort(compare);

  const newest = candidates.at(-1);
  if (!newest || compare(newest, current) <= 0) return range;
  return `${prefix}${newest}`;
}

async function fetchVersions(name) {
  try {
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, {
      headers: { accept: 'application/vnd.npm.install-v1+json' },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return [];
    const body = await response.json();
    return Object.keys(body.versions ?? {});
  } catch {
    return [];
  }
}

/**
 * Resolve every `catalog` and `catalogs` entry in a generated root manifest,
 * printing what changed. Silent resolution would be worse than none: the whole
 * point is that you can see what you are getting before `bun install` runs.
 */
export async function resolveCatalog(manifestPath, { allowMajorBumps = false } = {}) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const groups = [
    ['catalog', manifest.workspaces?.catalog],
    ...Object.entries(manifest.workspaces?.catalogs ?? {}).map(([n, g]) => [`catalogs.${n}`, g]),
  ].filter(([, group]) => group);

  const names = [...new Set(groups.flatMap(([, group]) => Object.keys(group)))];
  process.stdout.write(`resolving ${names.length} catalog versions from the npm registry…\n`);

  const resolved = new Map(
    await Promise.all(names.map(async (name) => [name, await fetchVersions(name)])),
  );

  const unreachable = names.filter((n) => resolved.get(n).length === 0);
  const changes = [];

  for (const [label, group] of groups) {
    for (const [name, range] of Object.entries(group)) {
      const next = pickVersion(range, resolved.get(name) ?? [], { allowMajorBumps });
      if (next !== range) {
        changes.push({ group: label, name, from: range, to: next });
        group[name] = next;
      }
    }
  }

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  if (changes.length) {
    process.stdout.write('\n  updated:\n');
    for (const c of changes) {
      process.stdout.write(`    ${c.name.padEnd(32)} ${c.from}  ->  ${c.to}\n`);
    }
  } else {
    process.stdout.write('  all catalog pins already current\n');
  }

  if (unreachable.length) {
    // Loud, because a silent fallback looks identical to a successful resolve.
    process.stdout.write(
      `\n  WARNING: could not reach the registry for ${unreachable.length} package(s); ` +
        `kept the template pins for:\n    ${unreachable.join(', ')}\n`,
    );
  }
  if (!allowMajorBumps) {
    process.stdout.write('\n  majors held at the template pins. Use --latest to cross majors.\n');
  }

  return { changes, unreachable };
}
