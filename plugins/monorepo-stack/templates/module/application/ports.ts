import type { DomainRecord } from '../domain/__MODULE_NAME__.js';

/**
 * Ports: what this module needs from the outside world, stated as interfaces
 * it owns.
 *
 * The direction matters. The module defines the interface and infrastructure
 * implements it, so the module never imports a concrete client and can be
 * tested against an in-memory double with no mocking framework at all.
 */
export interface RecordRepository {
  list(query?: { status?: DomainRecord['status']; search?: string }): Promise<DomainRecord[]>;
  get(id: string): Promise<DomainRecord | null>;
  save(record: DomainRecord): Promise<DomainRecord>;
  remove(id: string): Promise<void>;
}

/** Everything a use case needs, passed in rather than imported. */
export interface ModuleContext {
  records: RecordRepository;
  can(permission: string): boolean;
}
