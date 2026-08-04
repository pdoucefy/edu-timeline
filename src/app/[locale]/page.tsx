'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Button } from '@/components/common/Button.tsx';
import { Typography } from '@/components/common/Typography.tsx';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 73px);
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 540px;
`;

const Home = () => {
  const t = useTranslations('home');

  return (
    <HeroSection>
      <Typography $variant="h1">{t('heroTitle')}</Typography>
      <Subtitle>{t('heroSubtitle')}</Subtitle>
      <Button $variant="link" href="/select">
        {t('startButton')}
      </Button>
    </HeroSection>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
