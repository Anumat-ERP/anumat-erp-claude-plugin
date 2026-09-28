import { test, assert, assertEqual, run } from './self-test.mjs';
import { pickVersion, parseMajor } from './versions.mjs';

test('parseMajor reads the major out of a range', () => {
  assertEqual(parseMajor('^19.2.0'), 19);
  assertEqual(parseMajor('~4.1.0'), 4);
  assertEqual(parseMajor('5.9.2'), 5);
  assertEqual(parseMajor('>=22'), 22);
});

test('pickVersion stays inside the pinned major by default', () => {
  // A scaffold that silently moves React 19 -> 20 hands you a migration on
  // day one. Staying in-major is the safe default.
  const available = ['19.0.0', '19.4.1', '20.0.0', '20.1.0'];
  assertEqual(pickVersion('^19.2.0', available, { allowMajorBumps: false }), '^19.4.1');
});

test('pickVersion crosses majors only when explicitly asked', () => {
  const available = ['19.0.0', '19.4.1', '20.1.0'];
  assertEqual(pickVersion('^19.2.0', available, { allowMajorBumps: true }), '^20.1.0');
});

test('pickVersion ignores prereleases', () => {
  const available = ['19.4.1', '19.5.0-canary.3', '19.5.0-rc.1'];
  assertEqual(pickVersion('^19.0.0', available, { allowMajorBumps: false }), '^19.4.1');
});

test('pickVersion preserves the range prefix it was given', () => {
  const available = ['4.1.0', '4.3.2'];
  assertEqual(pickVersion('~4.1.0', available, { allowMajorBumps: false }), '~4.3.2');
  assertEqual(pickVersion('4.1.0', available, { allowMajorBumps: false }), '4.3.2');
});

test('pickVersion keeps the original when nothing newer exists', () => {
  assertEqual(pickVersion('^19.9.9', ['19.0.0'], { allowMajorBumps: false }), '^19.9.9');
});

test('pickVersion keeps the original when the registry gave nothing', () => {
  // Offline must degrade to the curated pins, never to undefined.
  assertEqual(pickVersion('^19.2.0', [], { allowMajorBumps: false }), '^19.2.0');
});

test('pickVersion sorts numerically, not lexically', () => {
  // '9' > '10' as strings; this is the bug that ships a two-major-old pin.
  const available = ['19.9.0', '19.10.0'];
  assertEqual(pickVersion('^19.0.0', available, { allowMajorBumps: false }), '^19.10.0');
});

test('pickVersion respects the 0.x rule where minor is the breaking axis', () => {
  // Under semver ^0.5.0 means >=0.5.0 <0.6.0. Treating 0 as "the major" made
  // the in-major filter a no-op and bumped across breaking boundaries.
  assertEqual(pickVersion('^0.5.0', ['0.5.1', '0.9.3', '0.12.0'], { allowMajorBumps: false }), '^0.5.1');
  assertEqual(pickVersion('~0.5.0', ['0.5.4', '0.9.3'], { allowMajorBumps: false }), '~0.5.4');
});

test('pickVersion leaves non-semver ranges completely alone', () => {
  for (const range of ['workspace:*', 'catalog:', 'latest', '*', 'file:../x', 'npm:pkg@1.0.0']) {
    assertEqual(pickVersion(range, ['1.0.0', '2.0.0'], { allowMajorBumps: true }), range);
  }
});

test('pickVersion does not tighten an open or upper-bounded range', () => {
  assertEqual(pickVersion('>=22', ['22.14.0'], { allowMajorBumps: false }), '>=22');
  assertEqual(pickVersion('<5.0.0', ['4.9.9'], { allowMajorBumps: false }), '<5.0.0');
});

run();
