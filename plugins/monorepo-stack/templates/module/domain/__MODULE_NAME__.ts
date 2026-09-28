import { z } from 'zod';

/**
 * The domain layer: business rules, expressed in plain TypeScript.
 *
 * Nothing here imports React, a fetch client, or a database driver. That is
 * not purism — it is what lets these rules be tested in milliseconds, reused
 * from a route handler as easily as from a component, and read by someone who
 * does not know the framework.
 *
 * If a rule needs the network to run, it is not a domain rule. Move it to
 * application/ and give it a port.
 */

export const StatusValues = ['draft', 'active', 'archived'] as const;
export type Status = (typeof StatusValues)[number];

export const RecordSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Name is required').max(200),
  status: z.enum(StatusValues),
  createdAt: z.date(),
});

export type DomainRecord = z.infer<typeof RecordSchema>;

/**
 * Legal transitions, declared as data.
 *
 * A transition table is checkable, printable, and testable; the same rules
 * scattered through `if` statements in components are none of those. This is
 * the state pattern as TypeScript actually wants it written.
 */
const TRANSITIONS: Readonly<Record<Status, readonly Status[]>> = {
  draft: ['active'],
  active: ['archived'],
  archived: [],
} as const;

export function canTransition(from: Status, to: Status): boolean {
  return TRANSITIONS[from].includes(to);
}

export class IllegalTransitionError extends Error {
  constructor(
    readonly from: Status,
    readonly to: Status,
  ) {
    super(`Cannot move a record from "${from}" to "${to}".`);
    this.name = 'IllegalTransitionError';
  }
}

/** Returns a new record; never mutates. Callers compare old and new freely. */
export function transition(record: DomainRecord, to: Status): DomainRecord {
  if (!canTransition(record.status, to)) {
    throw new IllegalTransitionError(record.status, to);
  }
  return { ...record, status: to };
}
