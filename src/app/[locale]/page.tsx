'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Link } from '@/i18n/navigation.ts';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 73px);
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 720px;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 540px;
`;

const StartButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xxl}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryActive};
  }
`;

const Home = () => {
  const t = useTranslations('home');

  return (
    <HeroSection>
      <Title>{t('heroTitle')}</Title>
      <Subtitle>{t('heroSubtitle')}</Subtitle>
      <StartButton href="/select">{t('startButton')}</StartButton>
    </HeroSection>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
