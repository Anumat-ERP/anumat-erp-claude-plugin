import { setupServer } from 'msw/node';
import type { RequestHandler } from 'msw';

/** The shared MSW server. Handlers are registered per test file. */
export const server = setupServer();

export const useHandlers = (...handlers: RequestHandler[]) => server.use(...handlers);
