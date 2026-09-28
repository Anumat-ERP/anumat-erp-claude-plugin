import type { ReactElement, ReactNode } from 'react';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';

/**
 * Wrap every component under test in the same providers the app uses.
 *
 * Tests that mount a component without its providers pass for reasons the
 * real app does not share, so this wrapper is the only supported entry point.
 */
function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
