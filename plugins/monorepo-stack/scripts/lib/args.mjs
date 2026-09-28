import { resolve, relative, isAbsolute } from 'node:path';

/**
 * Shared argument handling for the add-* scripts.
 *
 * These were hand-rolled three times and diverged three ways: one crashed on a
 * trailing `--cwd`, one found the wrong positional when it repeated a flag
 * value, and one had no name validation at all and would write outside the
 * workspace. One implementation, one set of behaviours.
 */

/**
 * Parse `<positional> [--flag value]...`.
 * @param {string[]} argv
 * @param {string[]} valueFlags flags that consume the next argument
 */
export function parseArgs(argv, valueFlags = ['--cwd']) {
  const flags = {};
  const positionals = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      positionals.push(arg);
      continue;
    }
    if (valueFlags.includes(arg)) {
      // A trailing flag with no value is a usage error, not a crash.
      flags[arg] = i + 1 < argv.length ? argv[++i] : null;
      continue;
    }
    flags[arg] = true;
  }
  return { positionals, flags };
}

/** Names become directories, package names, permission prefixes and routes. */
const NAME = /^[a-z][a-z0-9-]*$/;

export function validateName(name, kind) {
  if (!name) return `usage: add-${kind}.mjs <name> [--cwd <dir>]`;
  if (!NAME.test(name)) {
    return (
      `invalid ${kind} name "${name}": use lowercase kebab-case, starting with a letter.\n` +
      `The name becomes a directory, a package name and a route segment, so it is ` +
      `constrained once here rather than spelled four ways.`
    );
  }
  return null;
}

/** Resolve a --cwd, reporting a missing value rather than throwing. */
export function resolveCwd(flags, kind) {
  const raw = flags['--cwd'];
  if (raw === null) return { error: `--cwd was given with no value\nusage: add-${kind}.mjs <name> [--cwd <dir>]` };
  return { dir: resolve(typeof raw === 'string' ? raw : process.cwd()) };
}

/**
 * True when `candidate` is strictly inside `root`.
 * Used to stop a `--package .` or `../` writing into or above the workspace.
 */
export function isInside(root, candidate) {
  const rel = relative(resolve(root), resolve(candidate));
  return rel !== '' && !rel.startsWith('..') && !isAbsolute(rel);
}
