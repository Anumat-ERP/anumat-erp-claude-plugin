/**
 * UI surface this module contributes.
 *
 * Kept separate from the root export so an app that only needs the use cases
 * — a route handler, a job, a CLI — does not pull React into its bundle.
 */
export { RecordList } from './components/record-list.js';
export { RecordListRoute } from './routes/record-list-route.js';
