#!/usr/bin/env node
/** Run every *.test.mjs under scripts/. Exits non-zero if any file fails. */
import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const files = [
  ...readdirSync(join(HERE, 'lib'))
    .filter((f) => f.endsWith('.test.mjs'))
    .map((f) => join('lib', f)),
  ...readdirSync(HERE).filter((f) => f.endsWith('.test.mjs')),
].sort();

let failed = 0;
for (const file of files) {
  process.stdout.write(`\n--- ${file} ---\n`);
  try {
    execFileSync(process.execPath, [join(HERE, file)], { stdio: 'inherit' });
  } catch {
    failed++;
  }
}
console.log(`\n${files.length - failed}/${files.length} test files passed`);
process.exit(failed ? 1 : 0);
