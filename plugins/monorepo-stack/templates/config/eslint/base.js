/** Shared flat config. Kept intentionally small: rules a team disagrees about
 *  get argued once here rather than per package. */
export default [
  {
    ignores: ['**/dist/**', '**/.next/**', '**/coverage/**', '**/storybook-static/**'],
  },
];
