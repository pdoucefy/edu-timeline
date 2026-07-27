import { render, screen } from '@testing-library/react';

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/theme.ts';

import { EndOfGameScreen } from './EndOfGameScreen.tsx';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock('@/i18n/navigation.ts', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('EndOfGameScreen', () => {
  describe('success variant', () => {
    it('renders the success title', () => {
      renderWithTheme(<EndOfGameScreen outcome="success" score={5} total={5} />);
      expect(screen.getByText('successTitle')).toBeInTheDocument();
    });

    it('renders the success message', () => {
      renderWithTheme(<EndOfGameScreen outcome="success" score={5} total={5} />);
      expect(screen.getByText((content) => content.includes('successMessage'))).toBeInTheDocument();
    });

    it('renders the perfect score message when score equals total', () => {
      renderWithTheme(<EndOfGameScreen outcome="success" score={5} total={5} />);
      expect(screen.getByText((content) => content.includes('perfectScore'))).toBeInTheDocument();
    });

    it('does not render the perfect score message when score is less than total', () => {
      renderWithTheme(<EndOfGameScreen outcome="success" score={3} total={5} />);
      expect(screen.queryByText('perfectScore')).not.toBeInTheDocument();
    });

    it('renders the back-to-home button linking to /', () => {
      renderWithTheme(<EndOfGameScreen outcome="success" score={5} total={5} />);
      const button = screen.getByText('backToHome');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', '/');
    });
  });

  describe('failure variant', () => {
    it('renders the failure title', () => {
      renderWithTheme(
        <EndOfGameScreen
          outcome="failure"
          score={3}
          total={5}
          placedCount={3}
          remainingCount={2}
          misplacedEventName="Bataille de Vouillé"
          misplacedEventYear={507}
        />,
      );
      expect(screen.getByText('failureTitle')).toBeInTheDocument();
    });

    it('renders the failure message', () => {
      renderWithTheme(
        <EndOfGameScreen
          outcome="failure"
          score={3}
          total={5}
          placedCount={3}
          remainingCount={2}
          misplacedEventName="Bataille de Vouillé"
          misplacedEventYear={507}
        />,
      );
      expect(screen.getByText('failureMessage')).toBeInTheDocument();
    });

    it('renders the placed count stat', () => {
      renderWithTheme(
        <EndOfGameScreen
          outcome="failure"
          score={3}
          total={5}
          placedCount={3}
          remainingCount={2}
          misplacedEventName="Bataille de Vouillé"
          misplacedEventYear={507}
        />,
      );
      expect(screen.getByText('eventsPlaced')).toBeInTheDocument();
    });

    it('renders the remaining count stat', () => {
      renderWithTheme(
        <EndOfGameScreen
          outcome="failure"
          score={3}
          total={5}
          placedCount={3}
          remainingCount={2}
          misplacedEventName="Bataille de Vouillé"
          misplacedEventYear={507}
        />,
      );
      expect(screen.getByText('eventsRemaining')).toBeInTheDocument();
    });

    it('renders the misplaced event info', () => {
      renderWithTheme(
        <EndOfGameScreen
          outcome="failure"
          score={3}
          total={5}
          placedCount={3}
          remainingCount={2}
          misplacedEventName="Bataille de Vouillé"
          misplacedEventYear={507}
        />,
      );
      expect(screen.getByText('misplacedEvent')).toBeInTheDocument();
    });

    it('renders the back-to-home button linking to /', () => {
      renderWithTheme(
        <EndOfGameScreen
          outcome="failure"
          score={3}
          total={5}
          placedCount={3}
          remainingCount={2}
          misplacedEventName="Bataille de Vouillé"
          misplacedEventYear={507}
        />,
      );
      const button = screen.getByText('backToHome');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', '/');
    });
  });
});
