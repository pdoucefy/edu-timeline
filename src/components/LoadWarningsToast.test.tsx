import { render, screen } from '@testing-library/react';

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { LoadWarningsToast } from '@/components/LoadWarningsToast.tsx';
import { getLoadWarnings } from '@/data/loader.ts';
import { theme } from '@/styles/theme.ts';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock('@/data/loader.ts', () => ({
  getLoadWarnings: jest.fn(),
  PLACEHOLDER_IMAGE_PATH: '/events/placeholder.svg',
  resolveImagePath: jest.fn((fileName: string) => `/events/${fileName}`),
  load: jest.fn(),
}));

describe('LoadWarningsToast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the toast when warnings are present', () => {
    (getLoadWarnings as jest.Mock).mockReturnValue([
      { type: 'invalid_date', eventId: 99, eventName: 'Bad Event', reason: 'bad' },
    ]);

    renderWithTheme(<LoadWarningsToast />);
    expect(screen.getByRole('status')).toHaveTextContent('someEventsNotLoaded');
  });

  it('does not render when there are no warnings', () => {
    (getLoadWarnings as jest.Mock).mockReturnValue([]);

    renderWithTheme(<LoadWarningsToast />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('does not render if the loader is uninitialized', () => {
    (getLoadWarnings as jest.Mock).mockImplementation(() => {
      throw new Error('Loader not initialized');
    });

    renderWithTheme(<LoadWarningsToast />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
