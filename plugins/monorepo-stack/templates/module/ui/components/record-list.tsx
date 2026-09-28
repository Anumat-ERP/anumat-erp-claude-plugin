import { Button } from '@repo/ui/components/button';
import type { Record } from '../../domain/__MODULE_NAME__.js';

export interface RecordListProps {
  records: Record[];
  /** Distinguishes "no records yet" from "the filter matched nothing". */
  isFiltered?: boolean;
  isLoading?: boolean;
  error?: string | null;
  canWrite?: boolean;
  onArchive?: (id: string) => void;
  onClearFilters?: () => void;
  onCreate?: () => void;
}

/**
 * Presentational only: it is handed data and callbacks, and owns no fetching.
 * That is what lets every state below be a Storybook story rather than a
 * situation you have to reproduce against a live backend.
 *
 * The six interface states are all handled here on purpose — the happy path
 * alone is the single largest gap between generated UI and shipped UI.
 */
export function RecordList({
  records,
  isFiltered = false,
  isLoading = false,
  error = null,
  canWrite = false,
  onArchive,
  onClearFilters,
  onCreate,
}: RecordListProps) {
  if (isLoading) {
    return (
      <ul className="space-y-2" aria-busy="true" aria-label="Loading records">
        {[0, 1, 2].map((i) => (
          <li key={i} className="h-14 animate-pulse rounded-lg bg-neutral-100" />
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="font-medium text-red-900">Could not load records</p>
        <p className="mt-1 text-sm text-red-800">{error}</p>
      </div>
    );
  }

  if (records.length === 0) {
    // Filtered-empty and first-run empty need different words and different
    // actions. Showing "create your first record" to someone whose search
    // returned nothing reads as though their data is gone.
    return isFiltered ? (
      <div className="rounded-lg border border-neutral-200 p-8 text-center">
        <p className="font-medium">No records match these filters</p>
        <p className="mt-1 text-sm text-neutral-600">Try widening or clearing them.</p>
        {onClearFilters && (
          <div className="mt-4">
            <Button variant="secondary" onClick={onClearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    ) : (
      <div className="rounded-lg border border-neutral-200 p-8 text-center">
        <p className="font-medium">No records yet</p>
        <p className="mt-1 text-sm text-neutral-600">
          Records track __MODULE_LABEL__ through draft, active and archived.
        </p>
        {canWrite && onCreate && (
          <div className="mt-4">
            <Button onClick={onCreate}>Create a record</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200">
      {records.map((record) => (
        <li key={record.id} className="flex items-center justify-between gap-4 p-4">
          <div className="min-w-0">
            {/* truncate: a long name must not push the action off-screen */}
            <p className="truncate font-medium" title={record.name}>
              {record.name}
            </p>
            <p className="text-sm text-neutral-600">{record.status}</p>
          </div>
          {record.status === 'active' && canWrite && onArchive && (
            <Button variant="secondary" size="sm" onClick={() => onArchive(record.id)}>
              Archive
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
