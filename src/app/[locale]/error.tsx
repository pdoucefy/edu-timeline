'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/common/Button.tsx';
import { Typography } from '@/components/common/Typography.tsx';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ErrorDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 480px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * We intentionally use a single clear localized message for all error-boundary
 * scenarios because, in this statically-built application, runtime errors are
 * rare and distinguishing "data load" vs "network resource" failures would
 * require brittle heuristic parsing of Next.js opaque error objects. The
 * generic message ("Échec du chargement des données") covers both cases and
 * maps to the catalog key `errors.dataLoadFailure`.
 */
const ErrorBoundary = ({ error, reset }: ErrorBoundaryProps) => {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error('Localized error boundary caught an error:', error);
  }, [error]);

  return (
    <ErrorContainer role="alert">
      <Typography $variant="h1" $color="error">
        {t('dataLoadFailure')}
      </Typography>
      <ErrorDescription>{t('dataLoadFailureDescription')}</ErrorDescription>
      <Button $variant="primary" onClick={reset} type="button">
        {t('retryLabel')}
      </Button>
    </ErrorContainer>
  );
};

// eslint-disable-next-line import/no-default-export
export default ErrorBoundary;
