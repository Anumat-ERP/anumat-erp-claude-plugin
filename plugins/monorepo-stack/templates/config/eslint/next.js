import base from './base.js';
import reactHooks from 'eslint-plugin-react-hooks';

/** The base config plus the React rules that catch real bugs. */
export default [
  ...base,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
