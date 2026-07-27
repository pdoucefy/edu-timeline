'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import styled from 'styled-components';

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

const ErrorTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ErrorDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 480px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const RetryButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xxl}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryActive};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
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
      <ErrorTitle>{t('dataLoadFailure')}</ErrorTitle>
      <ErrorDescription>{t('dataLoadFailureDescription')}</ErrorDescription>
      <RetryButton onClick={reset} type="button">
        {t('retryLabel')}
      </RetryButton>
    </ErrorContainer>
  );
};

// eslint-disable-next-line import/no-default-export
export default ErrorBoundary;
