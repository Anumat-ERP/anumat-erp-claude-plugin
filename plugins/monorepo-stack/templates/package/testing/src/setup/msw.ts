import { afterAll, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { server } from '../msw/server.js';

/**
 * Intercept at the network boundary rather than mocking the HTTP client.
 * `onUnhandledRequest: 'error'` is deliberate: a request nobody stubbed is a
 * test that is quietly talking to the outside world.
 */
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
