import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/theme.ts';
import type { Event } from '@/types/event.ts';

// eslint-disable-next-line import/order
import { EventCard } from './EventCard.tsx';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

const baseEvent: Event = {
  id: 1,
  name: 'Bataille de Vouillé',
  date: new Date('507'),
  fileName: 'battle.jpg',
};

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('EventCard', () => {
  it('renders the event name', () => {
    renderWithTheme(<EventCard event={baseEvent} revealed={false} />);
    expect(screen.getByText('Bataille de Vouillé')).toBeInTheDocument();
  });

  it('hides the year when not revealed', () => {
    renderWithTheme(<EventCard event={baseEvent} revealed={false} />);
    expect(screen.getByText('?')).toBeInTheDocument();
    expect(screen.queryByText('507')).not.toBeInTheDocument();
  });

  it('shows the year when revealed', () => {
    renderWithTheme(<EventCard event={baseEvent} revealed />);
    expect(screen.getByText(/507/)).toBeInTheDocument();
    expect(screen.queryByText('?')).not.toBeInTheDocument();
  });

  it('shows only the year — not the full date — when revealed', () => {
    renderWithTheme(<EventCard event={baseEvent} revealed />);
    const dateText = screen.getByText(/yearLabel/);
    expect(dateText).toHaveTextContent(/yearLabel\s+507/);
  });

  it('falls back to the placeholder image on error and logs a warning', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());

    renderWithTheme(<EventCard event={baseEvent} revealed={false} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);

    expect(warn).toHaveBeenCalledWith(
      'Failed to load image for event "Bataille de Vouillé": battle.jpg',
    );
    warn.mockRestore();
  });

  it('uses a translated alt text from the catalog', () => {
    renderWithTheme(<EventCard event={baseEvent} revealed={false} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'missingImageAlt');
  });

  it('translates alt to placeholder text when image fails', () => {
    renderWithTheme(<EventCard event={baseEvent} revealed={false} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(img).toHaveAttribute('alt', 'imagePlaceholder');
  });
});
