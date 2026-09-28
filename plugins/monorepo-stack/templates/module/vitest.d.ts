/**
 * jest-dom's matchers are registered at runtime by @repo/testing/setup/msw,
 * which lives in another package, so this module's `tsc --noEmit` never sees
 * the global augmentation. This side-effect import pulls it in for
 * type-checking only.
 */
import '@testing-library/jest-dom/vitest';
