import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button.js';

/**
 * argTypes are declared rather than inferred so the inventory is
 * machine-readable: tooling reading this Storybook learns that Button has
 * three variants, three sizes and a loading state, not merely that a Button
 * exists.
 */
const meta = {
  title: 'components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The primary interactive control. Use exactly one primary button per view; ' +
          'everything else is secondary or ghost. Label it with the outcome ' +
          '("Save changes"), never "Submit".',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual weight. One primary per view.',
      table: { type: { summary: 'primary | secondary | ghost' }, defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { type: { summary: 'sm | md | lg' }, defaultValue: { summary: 'md' } },
    },
    loading: {
      control: 'boolean',
      description: 'Disables the control and announces aria-busy, keeping its size.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: { control: 'boolean' },
  },
  args: { children: 'Save changes', variant: 'primary', size: 'md' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
