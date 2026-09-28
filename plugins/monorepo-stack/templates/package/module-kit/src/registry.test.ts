import { describe, expect, it } from 'vitest';
import type { ModuleManifest } from './manifest.js';
import {
  CircularDependencyError,
  MissingDependencyError,
  collectNavigation,
  collectPermissions,
  resolveOrder,
} from './registry.js';

const mod = (
  name: string,
  depends: string[] = [],
  extra: Partial<ModuleManifest> = {},
): ModuleManifest => ({
  name,
  version: '0.0.0',
  summary: name,
  depends,
  permissions: [`${name}:read`],
  ...extra,
});

describe('resolveOrder', () => {
  it('places dependencies before the modules that need them', () => {
    const order = resolveOrder([mod('sales', ['catalog']), mod('catalog'), mod('crm', ['sales'])]);
    const names = order.map((m) => m.name);
    expect(names.indexOf('catalog')).toBeLessThan(names.indexOf('sales'));
    expect(names.indexOf('sales')).toBeLessThan(names.indexOf('crm'));
  });

  it('names the cycle rather than overflowing the stack', () => {
    expect(() => resolveOrder([mod('a', ['b']), mod('b', ['a'])])).toThrow(
      CircularDependencyError,
    );
  });

  it('reports which dependency is missing, and who wanted it', () => {
    try {
      resolveOrder([mod('sales', ['catalog'])]);
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(MissingDependencyError);
      expect((error as MissingDependencyError).missing).toBe('catalog');
      expect((error as MissingDependencyError).module).toBe('sales');
    }
  });

  it('includes each module once even when several depend on it', () => {
    const order = resolveOrder([mod('a', ['base']), mod('b', ['base']), mod('base')]);
    expect(order.map((m) => m.name).filter((n) => n === 'base')).toHaveLength(1);
  });
});

describe('collectPermissions', () => {
  it('deduplicates and sorts', () => {
    const result = collectPermissions([
      mod('b', [], { permissions: ['x:read', 'shared'] }),
      mod('a', [], { permissions: ['a:read', 'shared'] }),
    ]);
    expect(result).toEqual(['a:read', 'shared', 'x:read']);
  });
});

describe('collectNavigation', () => {
  const manifests = [
    mod('sales', [], {
      navigation: [{ id: 'sales', label: 'Sales', path: '/sales', requires: 'sales:read', order: 2 }],
    }),
    mod('admin', [], {
      navigation: [{ id: 'admin', label: 'Admin', path: '/admin', requires: 'admin:write', order: 1 }],
    }),
  ];

  it('hides entries the viewer cannot use', () => {
    const nav = collectNavigation(manifests, (p) => p === 'sales:read');
    expect(nav.map((e) => e.id)).toEqual(['sales']);
  });

  it('sorts by order, not declaration', () => {
    const nav = collectNavigation(manifests, () => true);
    expect(nav.map((e) => e.id)).toEqual(['admin', 'sales']);
  });

  it('sorts entries without an order last', () => {
    const nav = collectNavigation(
      [...manifests, mod('z', [], { navigation: [{ id: 'z', label: 'Z', path: '/z' }] })],
      () => true,
    );
    expect(nav.at(-1)?.id).toBe('z');
  });
});
