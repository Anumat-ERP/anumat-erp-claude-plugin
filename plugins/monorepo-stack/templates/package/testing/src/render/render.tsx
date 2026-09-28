import type { ReactElement, ReactNode } from 'react';
import {
  render as rtlRender,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';

/**
 * Wrap every component under test in the same providers the app uses.
 *
 * Tests that mount a component without its providers pass for reasons the
 * real app does not share, so this wrapper is the only supported entry point.
 */
function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// The return type is annotated rather than inferred: inferring it names a path
// inside the package manager's store, which TypeScript rejects as non-portable
// (TS2742) the moment another package consumes this one.
export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  return rtlRender(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
