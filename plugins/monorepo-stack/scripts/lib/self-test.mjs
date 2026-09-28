/**
 * Dependency-free test runner for the scaffolder scripts.
 *
 * These scripts need tests, and adding Vitest to the plugin repo purely to
 * test a scaffolder would be heavier than the few lines below.
 */
const TESTS = [];
let failures = 0;

export const test = (name, fn) => TESTS.push([name, fn]);

export function assert(cond, msg = 'assertion failed') {
  if (!cond) throw new Error(msg);
}

export function assertEqual(actual, expected, msg = '') {
  if (actual !== expected) {
    throw new Error(
      `${msg}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`,
    );
  }
}

export function run() {
  for (const [name, fn] of TESTS) {
    try {
      fn();
      console.log(`ok   ${name}`);
    } catch (err) {
      failures++;
      console.log(`NOT OK ${name}\n  ${err.message}`);
    }
  }
  console.log(`\n${TESTS.length - failures}/${TESTS.length} passed`);
  process.exit(failures ? 1 : 0);
}
