/**
 * The contract every module manifest satisfies.
 *
 * This type is the whole reason modules compose: an app can read a list of
 * manifests and derive load order, navigation and the permission set without
 * knowing anything about what any individual module does.
 */

export interface NavigationEntry {
  /** Stable id. Used for ordering and overrides; never shown to a user. */
  id: string;
  label: string;
  /** Path fragment the app mounts this module under. */
  path: string;
  /** Permission required to see the entry at all. */
  requires?: string;
  /** Lower sorts earlier. Unset sorts last, in declaration order. */
  order?: number;
  icon?: string;
}

export interface ModuleManifest {
  /** Unique, lowercase, kebab-case. Matches the directory name. */
  name: string;
  version: string;
  summary: string;
  /** Names of modules that must be installed for this one to work. */
  depends: readonly string[];
  /** Permissions this module defines. */
  permissions: readonly string[];
  /** Navigation this module contributes. */
  navigation?: readonly NavigationEntry[];
  /** Whether a fresh installation enables it. Default false. */
  enabledByDefault?: boolean;
}
