/**
 * Permissions this module defines.
 *
 * They live with the module because the module is the only thing that knows
 * what actions exist on its capability. A central permissions file in a repo
 * with twenty modules goes stale on the first change nobody remembers to
 * propagate, and stale permissions fail open far more often than closed.
 */
export const PERMISSIONS = {
  read: '__MODULE_NAME__:read',
  write: '__MODULE_NAME__:write',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Suggested role mapping. The app owns the final assignment — a module cannot
 * know what a role means across a whole product — but shipping a default
 * means a newly installed module is not silently unreachable.
 */
export const DEFAULT_ROLE_GRANTS: Readonly<Record<string, readonly Permission[]>> = {
  viewer: [PERMISSIONS.read],
  editor: [PERMISSIONS.read, PERMISSIONS.write],
  admin: [PERMISSIONS.read, PERMISSIONS.write],
} as const;
