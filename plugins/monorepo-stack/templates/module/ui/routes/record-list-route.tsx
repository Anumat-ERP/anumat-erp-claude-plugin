import { RecordList, type RecordListProps } from '../components/record-list.js';

export interface RecordListRouteProps extends Omit<RecordListProps, 'records'> {
  records: RecordListProps['records'];
  title?: string;
}

/**
 * The route fragment this module contributes.
 *
 * A fragment, not a page: the app owns routing, layout and data loading, and
 * mounts this at whatever path its manifest declares. A module that owned its
 * own routing could not be mounted twice, or mounted under a different prefix
 * in a different app.
 */
export function RecordListRoute({ title = '__MODULE_LABEL__', ...props }: RecordListRouteProps) {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <RecordList {...props} />
    </section>
  );
}
