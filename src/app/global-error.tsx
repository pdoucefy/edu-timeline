'use client';

import { useEffect } from 'react';

import frMessages from '@/i18n/messages/fr.json';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const t = (key: keyof typeof frMessages.errors) => frMessages.errors[key];

/**
 * Global error boundary lives outside the locale layout, so we import the
 * French catalog directly to ensure localized copy is still served.
 */
const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    console.error('Global error boundary caught an error:', error);
  }, [error]);

  return (
    <html lang="fr">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          backgroundColor: '#F8FAFC',
          color: '#0F172A',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1
          style={{
            color: '#EF4444',
            marginBottom: '1rem',
            fontSize: '2.5rem',
          }}
        >
          {t('dataLoadFailure')}
        </h1>
        <p
          style={{
            color: '#475569',
            marginBottom: '2rem',
            maxWidth: '480px',
            lineHeight: 1.75,
            fontSize: '1.125rem',
          }}
        >
          {t('dataLoadFailureDescription')}
        </p>
        <button
          onClick={reset}
          type="button"
          style={{
            padding: '1rem 3rem',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            fontSize: '1.25rem',
            fontWeight: 600,
            border: 'none',
            borderRadius: '0.75rem',
            cursor: 'pointer',
          }}
        >
          {t('retryLabel')}
        </button>
      </body>
    </html>
  );
};

// eslint-disable-next-line import/no-default-export
export default GlobalError;
