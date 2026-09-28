import type { ModuleManifest } from '@repo/module-kit';

/**
 * The module manifest.
 *
 * A module is a business capability, not a folder. This file is what makes
 * the difference: it declares what the module depends on, what permissions it
 * defines, and what navigation it contributes, so an app can compose modules
 * instead of importing into their internals.
 *
 * `depends` is load-bearing. Dependency order is derived from it, cycles are
 * detected from it, and a module that reaches into another module without
 * declaring it here is a bug the tooling can catch.
 */
export const manifest: ModuleManifest = {
  name: '__MODULE_NAME__',
  version: '0.0.0',
  summary: '__MODULE_SUMMARY__',

  /**
   * Other modules this one needs. Declared, not implied by imports.
   * Keep it minimal: every entry here is a module that cannot be removed
   * from an installation without removing this one too.
   */
  depends: [],

  /**
   * Permissions this module defines. They live here rather than in a central
   * file because the module that owns the capability is the only thing that
   * knows what actions exist on it — a central permission list goes stale the
   * moment a module changes and nobody remembers to update it.
   */
  permissions: ['__MODULE_NAME__:read', '__MODULE_NAME__:write'],

  /**
   * Navigation this module contributes. The app composes these; it does not
   * hardcode a menu that has to be edited every time a module is added.
   */
  navigation: [
    {
      id: '__MODULE_NAME__',
      label: '__MODULE_LABEL__',
      path: '/__MODULE_NAME__',
      requires: '__MODULE_NAME__:read',
    },
  ],

  /**
   * Off by default so a half-built module can be merged without being
   * reachable. Delete once the module is real.
   */
  enabledByDefault: false,
};

export default manifest;
