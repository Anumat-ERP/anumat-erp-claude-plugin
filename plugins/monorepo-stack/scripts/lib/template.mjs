import { readdirSync, statSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const substitute = (text, tokens) =>
  Object.entries(tokens).reduce(
    (acc, [key, value]) => (key === '__FORCE__' ? acc : acc.split(key).join(value)),
    text,
  );

/**
 * Copy a template tree, substituting __TOKEN__ in file contents and in file
 * and directory names.
 *
 * Refuses to overwrite unless tokens.__FORCE__ is set: a scaffolder that
 * clobbers is a scaffolder nobody runs twice.
 */
export function renderTree(srcDir, destDir, tokens) {
  const written = [];
  mkdirSync(destDir, { recursive: true });

  for (const entry of readdirSync(srcDir)) {
    const from = join(srcDir, entry);
    const to = join(destDir, substitute(entry, tokens));

    if (statSync(from).isDirectory()) {
      written.push(...renderTree(from, to, tokens));
      continue;
    }
    if (existsSync(to) && !tokens.__FORCE__) {
      throw new Error(`refusing to overwrite ${to}`);
    }
    writeFileSync(to, substitute(readFileSync(from, 'utf8'), tokens));
    written.push(to);
  }
  return written;
}
