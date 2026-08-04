'use client';

import { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Button } from '@/components/common/Button.tsx';
import { Typography } from '@/components/common/Typography.tsx';
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

const ErrorDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 480px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
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
          <Typography $variant="h1" $color="error">
            {t('dataLoadFailure')}
          </Typography>
          <ErrorDescription>{t('dataLoadFailureDescription')}</ErrorDescription>
          <Button $variant="primary" onClick={reset} type="button">
            {t('retryLabel')}
          </Button>
        </StyledBody>
      </ThemeProvider>
    </html>
  );
};

// eslint-disable-next-line import/no-default-export
export default GlobalError;
