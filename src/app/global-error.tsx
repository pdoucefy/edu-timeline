'use client';

import { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import frMessages from '@/i18n/messages/fr.json';
import { theme as appTheme } from '@/styles/theme.ts';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const t = (key: keyof typeof frMessages.errors) => frMessages.errors[key];

const StyledBody = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
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
      <ThemeProvider theme={appTheme}>
        <StyledBody>
          <ErrorTitle>{t('dataLoadFailure')}</ErrorTitle>
          <ErrorDescription>{t('dataLoadFailureDescription')}</ErrorDescription>
          <RetryButton onClick={reset} type="button">
            {t('retryLabel')}
          </RetryButton>
        </StyledBody>
      </ThemeProvider>
    </html>
  );
};

// eslint-disable-next-line import/no-default-export
export default GlobalError;
