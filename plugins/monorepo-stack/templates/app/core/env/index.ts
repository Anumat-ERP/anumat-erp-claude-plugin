/**
 * Parse and validate environment once, here, at the edge of the app.
 *
 * Reading process.env from a component means a missing variable surfaces as a
 * runtime undefined somewhere deep in a render. Parsing at startup means it
 * surfaces as a clear failure before anything is served.
 */
export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
} as const;
