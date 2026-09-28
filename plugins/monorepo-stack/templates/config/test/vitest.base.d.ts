import type { UserConfig } from 'vitest/config';

/**
 * Hand-written types because the implementation is plain JS: without this,
 * `provider: 'v8'` widens to `string` and every consumer's `tsc --noEmit`
 * fails on the coverage union.
 */
export declare function baseTestConfig(options?: { setupFiles?: string[] }): UserConfig;
