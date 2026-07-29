import { render, screen } from '@testing-library/react';

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/theme.ts';
import type { Event } from '@/types/event.ts';

// eslint-disable-next-line import/order
import { Timeline } from './Timeline.tsx';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} src={props.src} alt={props.alt ?? ''} />
  ),
}));

const events: Event[] = [
  { id: 1, name: 'First Event', date: new Date(1000, 0, 1), fileName: 'first.jpg' },
  { id: 2, name: 'Second Event', date: new Date(1500, 0, 1), fileName: 'second.jpg' },
  { id: 3, name: 'Third Event', date: new Date(2000, 0, 1), fileName: 'third.jpg' },
];

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Timeline', () => {
  it('renders N cards and N+1 slots with expected identifiers', () => {
    renderWithTheme(<Timeline events={events} />);

    // 3 cards
    expect(screen.getByText('First Event')).toBeInTheDocument();
    expect(screen.getByText('Second Event')).toBeInTheDocument();
    expect(screen.getByText('Third Event')).toBeInTheDocument();

    // 4 slots (indices 0..3)
    for (let i = 0; i <= events.length; i++) {
      const slot = screen.getByTestId(`slot-${i}`);
      expect(slot).toBeInTheDocument();
      expect(slot).toHaveAttribute('data-slot-index', String(i));
    }
  });

  it('renders cards in left-to-right order', () => {
    renderWithTheme(<Timeline events={events} />);

    const track = screen.getByTestId('timeline-track');
    const cards = track.querySelectorAll('article');

    expect(cards[0]).toHaveTextContent('First Event');
    expect(cards[1]).toHaveTextContent('Second Event');
    expect(cards[2]).toHaveTextContent('Third Event');
  });

  it('renders EventCard with revealed=true', () => {
    renderWithTheme(<Timeline events={events} />);

    // EventCard shows the year when revealed; we check year labels are visible
    expect(screen.getByText(/1000/)).toBeInTheDocument();
    expect(screen.getByText(/1500/)).toBeInTheDocument();
    expect(screen.getByText(/2000/)).toBeInTheDocument();
  });

  it('handles empty events array with a single slot', () => {
    renderWithTheme(<Timeline events={[]} />);

    expect(screen.getByTestId('slot-0')).toBeInTheDocument();
    expect(screen.queryByTestId('slot-1')).not.toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('allows horizontal overflow scrolling', () => {
    renderWithTheme(<Timeline events={events} />);

    const container = screen.getByTestId('timeline-container');
    expect(container).toHaveStyle('overflow-x: auto');
  });

  it('exposes stable slot identifiers for dnd-kit and game loop', () => {
    renderWithTheme(<Timeline events={events} />);

    for (let i = 0; i <= events.length; i++) {
      const slot = screen.getByTestId(`slot-${i}`);
      expect(slot).toHaveAttribute('data-slot-index', String(i));
      expect(slot).toHaveAttribute('role', 'button');
    }
  });

  it('highlights the active slot when activeSlotIndex is provided', () => {
    renderWithTheme(<Timeline events={events} activeSlotIndex={1} />);

    const slot0 = screen.getByTestId('slot-0');
    const slot1 = screen.getByTestId('slot-1');
    const slot2 = screen.getByTestId('slot-2');

    expect(slot0).not.toHaveStyle('border-color: #60A5FA');
    expect(slot1).toHaveStyle('border-color: #60A5FA');
    expect(slot2).not.toHaveStyle('border-color: #60A5FA');
  });

  it('calls onSlotClick with the slot index when a slot is clicked', () => {
    const onSlotClick = jest.fn();
    renderWithTheme(<Timeline events={events} onSlotClick={onSlotClick} />);

    screen.getByTestId('slot-2').click();
    expect(onSlotClick).toHaveBeenCalledWith(2);
  });

  it('does not render any drag-and-drop logic', () => {
    renderWithTheme(<Timeline events={events} />);

    // dnd-kit adds data-droppable-id and data-draggable-id attributes
    const container = screen.getByTestId('timeline-track');
    expect(container.querySelector('[data-droppable-id]')).not.toBeInTheDocument();
    expect(container.querySelector('[data-draggable-id]')).not.toBeInTheDocument();
  });
});
