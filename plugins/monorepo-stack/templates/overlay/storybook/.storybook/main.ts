import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  typescript: {
    // Reading real prop types is what makes the inventory machine-readable.
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
