import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/theme.ts';

// eslint-disable-next-line import/order
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

    it('renders the success message (plural) when score is not 1', () => {
      renderWithTheme(<EndOfGameScreen outcome="success" score={5} total={5} />);
      expect(
        screen.getByText((content) => content.includes('successMessagePlural')),
      ).toBeInTheDocument();
    });

    it('renders the singular success message when score is 1', () => {
      renderWithTheme(<EndOfGameScreen outcome="success" score={1} total={5} />);
      expect(
        screen.getByText(
          (content) => content.includes('successMessage') && !content.includes('Plural'),
        ),
      ).toBeInTheDocument();
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
      expect(button).toHaveAttribute('href', '/select');
    });

    it('does not render the play-again button when onPlayAgain is omitted', () => {
      renderWithTheme(<EndOfGameScreen outcome="success" score={5} total={5} />);
      expect(screen.queryByText('playAgain')).not.toBeInTheDocument();
    });

    it('renders the play-again button when onPlayAgain is provided', () => {
      renderWithTheme(
        <EndOfGameScreen outcome="success" score={5} total={5} onPlayAgain={jest.fn()} />,
      );
      expect(screen.getByText('playAgain')).toBeInTheDocument();
    });

    it('calls onPlayAgain when the play-again button is clicked', async () => {
      const onPlayAgain = jest.fn();
      renderWithTheme(
        <EndOfGameScreen outcome="success" score={5} total={5} onPlayAgain={onPlayAgain} />,
      );
      await userEvent.click(screen.getByText('playAgain'));
      expect(onPlayAgain).toHaveBeenCalledTimes(1);
    });
  });

  describe('failure variant', () => {
    const failureProps = {
      outcome: 'failure' as const,
      score: 3,
      total: 5,
      placedCount: 3,
      remainingCount: 2,
      misplacedEventName: 'Bataille de Vouillé',
      misplacedEventYear: 507,
    };

    it('renders the failure title', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} />);
      expect(screen.getByText('failureTitle')).toBeInTheDocument();
    });

    it('renders the failure message (plural) when score is not 1', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} />);
      expect(
        screen.getByText((content) => content.includes('failureMessagePlural')),
      ).toBeInTheDocument();
    });

    it('renders the singular failure message when score is 1', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} score={1} />);
      expect(
        screen.getByText(
          (content) => content.includes('failureMessage') && !content.includes('Plural'),
        ),
      ).toBeInTheDocument();
    });

    it('renders the placed count stat (plural) when placedCount is not 1', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} />);
      expect(screen.getByText('eventsPlacedPlural')).toBeInTheDocument();
    });

    it('renders the singular placed count stat when placedCount is 1', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} placedCount={1} />);
      expect(screen.getByText('eventsPlaced')).toBeInTheDocument();
    });

    it('renders the remaining count stat (plural) when remainingCount is not 1', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} />);
      expect(screen.getByText('eventsRemainingPlural')).toBeInTheDocument();
    });

    it('renders the singular remaining count stat when remainingCount is 1', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} remainingCount={1} placedCount={3} />);
      expect(screen.getByText('eventsRemaining')).toBeInTheDocument();
    });

    it('renders the misplaced event info', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} />);
      expect(screen.getByText('misplacedEvent')).toBeInTheDocument();
    });

    it('renders the back-to-home button linking to /', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} />);
      const button = screen.getByText('backToHome');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', '/select');
    });

    it('does not render the play-again button when onPlayAgain is omitted', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} />);
      expect(screen.queryByText('playAgain')).not.toBeInTheDocument();
    });

    it('renders the play-again button when onPlayAgain is provided', () => {
      renderWithTheme(<EndOfGameScreen {...failureProps} onPlayAgain={jest.fn()} />);
      expect(screen.getByText('playAgain')).toBeInTheDocument();
    });

    it('calls onPlayAgain when the play-again button is clicked', async () => {
      const onPlayAgain = jest.fn();
      renderWithTheme(<EndOfGameScreen {...failureProps} onPlayAgain={onPlayAgain} />);
      await userEvent.click(screen.getByText('playAgain'));
      expect(onPlayAgain).toHaveBeenCalledTimes(1);
    });
  });
});
