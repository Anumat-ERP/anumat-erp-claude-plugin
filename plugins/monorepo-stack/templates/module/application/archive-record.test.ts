import { describe, expect, it } from 'vitest';
import { IllegalTransitionError, type DomainRecord } from '../domain/__MODULE_NAME__.js';
import {
  PermissionDeniedError,
  RecordNotFoundError,
  archiveRecord,
} from './archive-record.js';
import type { ModuleContext, RecordRepository } from './ports.js';

/**
 * An in-memory double, not a mock. Because the module owns the port, the test
 * implements it directly — no mocking framework, and the test breaks if the
 * interface changes, which is exactly when it should.
 */
function inMemory(seed: DomainRecord[] = []): RecordRepository {
  const store = new Map(seed.map((r) => [r.id, r]));
  return {
    async list() {
      return [...store.values()];
    },
    async get(id) {
      return store.get(id) ?? null;
    },
    async save(record) {
      store.set(record.id, record);
      return record;
    },
    async remove(id) {
      store.delete(id);
    },
  };
}

const record = (status: DomainRecord['status']): DomainRecord => ({
  id: 'r1',
  name: 'Example',
  status,
  createdAt: new Date('2020-01-01'),
});

const ctx = (records: RecordRepository, allowed = true): ModuleContext => ({
  records,
  can: () => allowed,
});

describe('archiveRecord', () => {
  it('archives an active record', async () => {
    const repo = inMemory([record('active')]);
    const result = await archiveRecord(ctx(repo), 'r1');
    expect(result.status).toBe('archived');
    expect((await repo.get('r1'))?.status).toBe('archived');
  });

  it('refuses without the write permission, and does not touch the store', async () => {
    const repo = inMemory([record('active')]);
    await expect(archiveRecord(ctx(repo, false), 'r1')).rejects.toBeInstanceOf(
      PermissionDeniedError,
    );
    expect((await repo.get('r1'))?.status).toBe('active');
  });

  it('reports a missing record rather than failing obscurely', async () => {
    await expect(archiveRecord(ctx(inMemory()), 'nope')).rejects.toBeInstanceOf(
      RecordNotFoundError,
    );
  });

  it('enforces the domain transition rule', async () => {
    const repo = inMemory([record('draft')]);
    await expect(archiveRecord(ctx(repo), 'r1')).rejects.toBeInstanceOf(IllegalTransitionError);
  });
});
