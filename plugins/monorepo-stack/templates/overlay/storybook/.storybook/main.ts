import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Both layouts, because a repo this plugin did not create may not use src/.
    '../src/**/*.stories.@(ts|tsx)',
    '../components/**/*.stories.@(ts|tsx)',
    // Modules contribute stories too; without this they are dead code.
    '../../../modules/*/ui/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  typescript: {
    // Reading real prop types is what makes the inventory machine-readable.
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
