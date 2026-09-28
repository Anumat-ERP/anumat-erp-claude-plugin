import type { NextConfig } from 'next';

const config: NextConfig = {
  // Traces exactly the files the app needs, so the Docker runtime stage is not
  // the whole monorepo. The Dockerfile depends on this.
  output: 'standalone',
  // Compile the workspace UI package from source rather than expecting a build
  // step: one less task in the graph, and stack traces point at real files.
  transpilePackages: ['@repo/ui'],
};

export default config;
