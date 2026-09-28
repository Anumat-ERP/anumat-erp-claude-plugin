import { transition } from '../domain/__MODULE_NAME__.js';
import type { ModuleContext } from './ports.js';

export class PermissionDeniedError extends Error {
  constructor(readonly permission: string) {
    super(`Missing permission: ${permission}`);
    this.name = 'PermissionDeniedError';
  }
}

export class RecordNotFoundError extends Error {
  constructor(readonly id: string) {
    super(`No record with id ${id}`);
    this.name = 'RecordNotFoundError';
  }
}

/**
 * A use case: one business operation, start to finish.
 *
 * It orchestrates — check permission, load, apply the domain rule, persist —
 * and holds no business rules of its own. The rule about which transitions
 * are legal lives in domain/, so a route handler, a background job and a
 * component all get the same answer.
 *
 * Permission is checked here rather than in the UI. A hidden button is a
 * courtesy; the check that matters is the one an HTTP request cannot skip.
 */
export async function archiveRecord(ctx: ModuleContext, id: string) {
  if (!ctx.can('__MODULE_NAME__:write')) {
    throw new PermissionDeniedError('__MODULE_NAME__:write');
  }

  const existing = await ctx.records.get(id);
  if (!existing) throw new RecordNotFoundError(id);

  return ctx.records.save(transition(existing, 'archived'));
}
