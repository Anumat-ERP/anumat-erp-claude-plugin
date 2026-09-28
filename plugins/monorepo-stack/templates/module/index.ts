/**
 * The module's public surface.
 *
 * This is the ONLY path other modules and apps may import from. Deep imports
 * — `@repo/module-x/domain/thing` — are what turn modules back into folders:
 * once one exists, the module can no longer change its internals without
 * breaking a consumer it does not know about.
 *
 * Export the use cases, the types, the manifest and the UI entry points.
 * Do not export repositories, adapters, or anything under infrastructure/.
 */

// Domain types and rules consumers legitimately need
export {
  RecordSchema,
  StatusValues,
  canTransition,
  transition,
  IllegalTransitionError,
  type DomainRecord,
  type Status,
} from './domain/__MODULE_NAME__.js';

// Use cases — the operations this module offers
export {
  archiveRecord,
  PermissionDeniedError,
  RecordNotFoundError,
} from './application/archive-record.js';

// Ports, so the host can supply its own implementation
export type { ModuleContext, RecordRepository } from './application/ports.js';

// The default adapter, offered but not imposed
export { httpRecordRepository } from './infrastructure/http-record-repository.js';

// Security surface
export { PERMISSIONS, DEFAULT_ROLE_GRANTS, type Permission } from './security/permissions.js';

// Manifest — how the app discovers what this module contributes
export { manifest } from './module.config.js';
