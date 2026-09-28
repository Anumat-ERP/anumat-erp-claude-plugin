import { describe, expect, it } from 'vitest';
import { __PKG_NAME___PLACEHOLDER } from './index.js';

describe('@repo/__PKG_NAME__', () => {
  it('exports its public surface', () => {
    expect(__PKG_NAME___PLACEHOLDER).toBe(true);
  });
});
