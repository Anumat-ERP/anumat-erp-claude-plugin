import { describe, expect, it } from 'vitest';
import {
  IllegalTransitionError,
  RecordSchema,
  canTransition,
  transition,
  type DomainRecord,
} from './__MODULE_NAME__.js';

const record = (status: DomainRecord['status']): DomainRecord => ({
  id: 'r1',
  name: 'Example',
  status,
  createdAt: new Date('2020-01-01'),
});

describe('transitions', () => {
  it('allows draft to active', () => {
    expect(transition(record('draft'), 'active').status).toBe('active');
  });

  it('refuses to reopen an archived record', () => {
    expect(() => transition(record('archived'), 'active')).toThrow(IllegalTransitionError);
  });

  it('refuses to skip straight from draft to archived', () => {
    expect(canTransition('draft', 'archived')).toBe(false);
  });

  it('does not mutate the record it was given', () => {
    const original = record('draft');
    transition(original, 'active');
    expect(original.status).toBe('draft');
  });
});

describe('validation', () => {
  it('rejects an empty name with a message a user can act on', () => {
    const result = RecordSchema.safeParse({ ...record('draft'), name: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Name is required');
    }
  });
});
