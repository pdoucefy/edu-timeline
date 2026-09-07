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

export const SafeImage = ({
  fallbackSrc = PLACEHOLDER_IMAGE_PATH,
  alt = '',
  imageName,
  onFallback,
  ...props
}: SafeImageProps) => {
  const [hasError, setHasError] = useState(false);

  const originalSrc = typeof props.src === 'string' ? props.src : fallbackSrc;
  const src = hasError ? fallbackSrc : props.src;

  const handleError = useCallback(() => {
    console.warn(`Failed to load image "${imageName || alt || 'unknown'}": ${originalSrc}`);
    setHasError(true);
    onFallback?.();
  }, [alt, imageName, onFallback, originalSrc]);

  return <Image {...props} alt={alt} src={src} onError={handleError} />;
};
