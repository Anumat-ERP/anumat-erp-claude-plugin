import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecordList } from './record-list.js';
import type { Record } from '../../domain/__MODULE_NAME__.js';

const record = (id: string, name: string, status: Record['status']): Record => ({
  id,
  name,
  status,
  createdAt: new Date('2020-01-01'),
});

/**
 * Every interface state gets a story. A state with no story is a state nobody
 * has looked at — and these are the ones that are awkward to reach in a
 * running app, which is exactly why they go unreviewed otherwise.
 *
 * Lives under PATTERNS in the Storybook taxonomy: this is a screen-level
 * pattern composed of primitives, not a primitive itself.
 */
const meta = {
  title: 'patterns/__MODULE_LABEL__/RecordList',
  component: RecordList,
  parameters: {
    docs: {
      description: {
        component:
          'The list surface for __MODULE_LABEL__. Presentational: it receives data and ' +
          'callbacks and owns no fetching, so every state below is reachable here.',
      },
    },
  },
  argTypes: {
    isFiltered: {
      control: 'boolean',
      description: 'Changes the empty state from first-run to filtered-empty.',
    },
    isLoading: { control: 'boolean' },
    error: { control: 'text' },
    canWrite: { control: 'boolean', description: 'Gates the archive and create actions.' },
  },
  args: { records: [], canWrite: true },
} satisfies Meta<typeof RecordList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    records: [
      record('1', 'First record', 'active'),
      record('2', 'Second record', 'draft'),
      record('3', 'Third record', 'archived'),
    ],
  },
};

export const EmptyFirstRun: Story = { args: { records: [] } };
export const EmptyFiltered: Story = { args: { records: [], isFiltered: true } };
export const Loading: Story = { args: { isLoading: true } };
export const ErrorState: Story = { args: { error: 'The service did not respond.' } };

/** Permission state: read-only users see the data and none of the actions. */
export const ReadOnly: Story = {
  args: { records: [record('1', 'First record', 'active')], canWrite: false },
};

/** Overflow: a name long enough to test truncation rather than assume it. */
export const Overflow: Story = {
  args: {
    records: [
      record('1', 'A record name long enough to need truncating in any sane column width', 'active'),
    ],
  },
};
