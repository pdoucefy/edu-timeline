'use client';

import { useTranslations } from 'next-intl';
import styled, { css } from 'styled-components';

import { Button } from '@/components/common/Button.tsx';
import { Typography } from '@/components/common/Typography.tsx';

const HeroSection = styled.section(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 73px);
    padding: ${theme.spacing.xl};
    text-align: center;
  `,
);

const Subtitle = styled.div(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing.xxl};
    max-width: 540px;
  `,
);

const Home = () => {
  const t = useTranslations('home');

  return (
    <HeroSection>
      <Typography $variant="h1">{t('heroTitle')}</Typography>
      <Subtitle>
        <Typography $variant="light">{t('heroSubtitle')}</Typography>
      </Subtitle>
      <Button $variant="link" href="/select">
        {t('startButton')}
      </Button>
    </HeroSection>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
