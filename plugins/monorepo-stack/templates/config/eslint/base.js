import js from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * Shared flat config.
 *
 * Deliberately small. Rules a team would argue about get argued once here
 * rather than per package — but a config that only ignores files is worse than
 * none, because it looks like linting is happening.
 */
export default [
  {
    ignores: ['**/dist/**', '**/.next/**', '**/coverage/**', '**/storybook-static/**', '**/node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // An unused import is usually a deleted feature nobody finished removing.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // `any` defeats the reason for using TypeScript; warn rather than error
      // so an escape hatch stays available under deadline.
      '@typescript-eslint/no-explicit-any': 'warn',
      // Relative paths climbing out of a package mean the boundary is not real.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../../*'],
              message:
                'Import across package boundaries by package name (@repo/...), not by a relative path.',
            },
          ],
        },
      ],
    },
  },
];
