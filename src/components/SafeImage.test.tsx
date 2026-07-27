import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';

import { SafeImage } from '@/components/SafeImage.tsx';

const warnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn());

describe('SafeImage', () => {
  const baseProps = {
    src: '/events/battle.jpg',
    alt: 'Bataille de Vouillé',
    width: 100,
    height: 100,
    imageName: 'battle.jpg',
  };

  afterEach(() => {
    warnSpy.mockClear();
  });

  it('renders the image with the given src', () => {
    render(<SafeImage {...baseProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Bataille de Vouillé');
  });

  it('falls back to placeholder on error and logs a warning', () => {
    render(<SafeImage {...baseProps} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);

    expect(warnSpy).toHaveBeenCalledWith('Failed to load image "battle.jpg": /events/battle.jpg');
  });

  it('calls onFallback callback on error', () => {
    const onFallback = jest.fn();
    render(<SafeImage {...baseProps} onFallback={onFallback} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);

    expect(onFallback).toHaveBeenCalled();
  });

  it('uses a custom fallbackSrc when provided', () => {
    const customFallback = '/custom-fallback.png';
    render(<SafeImage {...baseProps} fallbackSrc={customFallback} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);

    expect(img).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(customFallback)));
  });
});
