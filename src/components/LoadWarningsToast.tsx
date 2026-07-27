'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { Toast } from '@/components/Toast.tsx';
import { type LoadWarning, getLoadWarnings } from '@/data/loader.ts';

const readWarnings = (): LoadWarning[] => {
  try {
    return getLoadWarnings();
  } catch {
    // Loader not initialized yet — nothing to show.
    return [];
  }
};

export const LoadWarningsToast = () => {
  const t = useTranslations('errors');
  const [dismissed, setDismissed] = useState(false);
  const [warnings] = useState<LoadWarning[]>(readWarnings);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  if (warnings.length === 0 || dismissed) return null;

  return <Toast message={t('someEventsNotLoaded')} onClose={handleDismiss} />;
};
