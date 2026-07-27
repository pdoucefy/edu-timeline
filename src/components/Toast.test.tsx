import { render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Toast } from '@/components/Toast.tsx';
import { theme } from '@/styles/theme.ts';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Toast', () => {
  it('renders the localized message when open', () => {
    renderWithTheme(<Toast message="someEventsNotLoaded" open />);
    expect(screen.getByRole('status')).toHaveTextContent('someEventsNotLoaded');
  });

  it('is hidden when open is false', () => {
    renderWithTheme(<Toast message="someEventsNotLoaded" open={false} />);
    expect(screen.getByRole('status')).toHaveStyle('opacity: 0');
  });

  it('calls onClose when dismissed', async () => {
    const onClose = jest.fn();
    renderWithTheme(<Toast message="someEventsNotLoaded" open onClose={onClose} />);

    const dismissBtn = screen.getByRole('button', { name: /dismiss/i });
    dismissBtn.click();

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('auto-dismisses after the specified duration', async () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    renderWithTheme(<Toast message="someEventsNotLoaded" open duration={1000} onClose={onClose} />);

    expect(screen.getByRole('status')).toHaveStyle('opacity: 1');

    jest.advanceTimersByTime(1100);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });
});
