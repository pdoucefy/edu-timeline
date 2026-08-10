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
    text-align: center;
    gap: ${theme.spacing.lg};
  `,
);

const Subtitle = styled.div`
  max-width: 540px;
`;

const Home = () => {
  const t = useTranslations('home');

  return (
    <HeroSection>
      <Typography $variant="h1">{t('heroTitle')}</Typography>
      <Subtitle>
        <Typography $variant="light" $centered>
          {t('heroSubtitle')}
        </Typography>
      </Subtitle>
      <div />
      <Button $variant="link" href="/select">
        {t('startButton')}
      </Button>
    </HeroSection>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
