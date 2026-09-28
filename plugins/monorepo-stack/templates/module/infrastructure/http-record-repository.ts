import { RecordSchema, type DomainRecord } from '../domain/__MODULE_NAME__.js';
import type { RecordRepository } from '../application/ports.js';

/**
 * An adapter: implements a port the module owns, against something it does not.
 *
 * This is the only file in the module that knows the API exists. Swapping the
 * transport — REST to GraphQL, live to local-first — is a change here and
 * nowhere else, which is the entire point of the port living in application/.
 *
 * Responses are parsed, not cast. `as DomainRecord` would move the failure from this
 * line to some component three screens away.
 */
export function httpRecordRepository(baseUrl: string, fetchImpl = fetch): RecordRepository {
  const url = (path: string) => `${baseUrl.replace(/\/$/, '')}${path}`;

  const parse = (value: unknown): DomainRecord =>
    RecordSchema.parse({
      ...(value as object),
      createdAt: new Date((value as { createdAt: string }).createdAt),
    });

  async function request(path: string, init?: RequestInit) {
    const response = await fetchImpl(url(path), {
      headers: { 'content-type': 'application/json' },
      ...init,
    });
    if (!response.ok) {
      throw new Error(`__MODULE_NAME__ request failed: ${response.status} ${path}`);
    }
    return response;
  }

  return {
    async list(query) {
      const params = new URLSearchParams();
      if (query?.status) params.set('status', query.status);
      if (query?.search) params.set('search', query.search);
      const suffix = params.size ? `?${params}` : '';
      const body = (await (await request(`/__MODULE_NAME__${suffix}`)).json()) as unknown[];
      return body.map(parse);
    },

    async get(id) {
      const response = await fetchImpl(url(`/__MODULE_NAME__/${id}`));
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`__MODULE_NAME__ request failed: ${response.status}`);
      return parse(await response.json());
    },

    async save(record) {
      const response = await request(`/__MODULE_NAME__/${record.id}`, {
        method: 'PUT',
        body: JSON.stringify(record),
      });
      return parse(await response.json());
    },

    async remove(id) {
      await request(`/__MODULE_NAME__/${id}`, { method: 'DELETE' });
    },
  };
}
