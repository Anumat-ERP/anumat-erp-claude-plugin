/**
 * jest-dom's matchers are registered at runtime by @repo/testing/setup/msw,
 * but that setup file lives in another package, so this app's `tsc --noEmit`
 * never sees the global augmentation. This side-effect import pulls it in for
 * type-checking only.
 */
import '@testing-library/jest-dom/vitest';
