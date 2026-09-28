import { describe, expect, it } from 'vitest';
import { render, screen } from '@repo/testing/render';
import Page from './page.js';

describe('home page', () => {
  it('renders the app heading', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the shared Button, proving the workspace link resolves', () => {
    render(<Page />);
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });
});
