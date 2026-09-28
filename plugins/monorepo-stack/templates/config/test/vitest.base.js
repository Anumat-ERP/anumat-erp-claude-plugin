/**
 * Shared Vitest configuration.
 *
 * Every package calls this rather than copying a config, so the jsdom
 * environment, the setup files and the coverage provider stay identical —
 * a package whose test environment quietly differs is a package whose
 * failures cannot be compared with anyone else's.
 */
export function baseTestConfig({ setupFiles = [] } = {}) {
  return {
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles,
      coverage: {
        provider: /** @type {const} */ ('v8'),
        reporter: ['text', 'lcov'],
      },
    },
  };
}
