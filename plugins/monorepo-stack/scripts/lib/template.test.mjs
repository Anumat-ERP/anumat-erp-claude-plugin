import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { test, assert, assertEqual, run } from './self-test.mjs';
import { renderTree } from './template.mjs';

test('renderTree substitutes tokens in contents, filenames and directory names', () => {
  const src = mkdtempSync(join(tmpdir(), 'mrs-src-'));
  const dest = mkdtempSync(join(tmpdir(), 'mrs-dst-'));
  mkdirSync(join(src, '__NAME__-dir'));
  writeFileSync(join(src, '__NAME__-dir', '__NAME__.txt'), 'hello __NAME__ on port __PORT__');

  renderTree(src, dest, { __NAME__: 'web', __PORT__: '3001' });

  const out = join(dest, 'web-dir', 'web.txt');
  assert(existsSync(out), 'token applied to directory and file names');
  assertEqual(readFileSync(out, 'utf8'), 'hello web on port 3001');
  rmSync(src, { recursive: true, force: true });
  rmSync(dest, { recursive: true, force: true });
});

test('renderTree refuses to overwrite an existing file', () => {
  const src = mkdtempSync(join(tmpdir(), 'mrs-src-'));
  const dest = mkdtempSync(join(tmpdir(), 'mrs-dst-'));
  writeFileSync(join(src, 'a.txt'), 'new');
  writeFileSync(join(dest, 'a.txt'), 'existing');

  let threw = false;
  try {
    renderTree(src, dest, {});
  } catch {
    threw = true;
  }
  assert(threw, 'must refuse rather than clobber');
  assertEqual(readFileSync(join(dest, 'a.txt'), 'utf8'), 'existing');
  rmSync(src, { recursive: true, force: true });
  rmSync(dest, { recursive: true, force: true });
});

run();
