import type { NextConfig } from 'next';

const config: NextConfig = {
  // Compile the workspace UI package from source rather than expecting a build
  // step: one less task in the graph, and stack traces point at real files.
  transpilePackages: ['@repo/ui'],
};

export default config;
