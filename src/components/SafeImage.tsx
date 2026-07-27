'use client';

import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { useCallback, useState } from 'react';

import { PLACEHOLDER_IMAGE_PATH } from '@/data/loader.ts';

type SafeImageProps = Omit<ImageProps, 'onError'> & {
  fallbackSrc?: string;
  imageName?: string;
  onFallback?: () => void;
};

/**
 * Wrapper around Next.js `<Image>` that falls back to a placeholder on error.
 * It logs a console warning and optionally calls a callback so consumers can
 * react (e.g. swap alt text to a placeholder description).
 */
export const SafeImage = ({
  fallbackSrc = PLACEHOLDER_IMAGE_PATH,
  alt = '',
  imageName,
  onFallback,
  ...props
}: SafeImageProps) => {
  const originalSrc = typeof props.src === 'string' ? props.src : fallbackSrc;
  const [src, setSrc] = useState<string | typeof props.src>(props.src);

  const handleError = useCallback(() => {
    console.warn(`Failed to load image "${imageName || alt || 'unknown'}": ${originalSrc}`);
    setSrc(fallbackSrc);
    onFallback?.();
  }, [alt, fallbackSrc, imageName, onFallback, originalSrc]);

  return <Image {...props} alt={alt} src={src} onError={handleError} />;
};
