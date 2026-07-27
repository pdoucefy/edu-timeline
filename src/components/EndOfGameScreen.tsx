'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Link } from '@/i18n/navigation.ts';

export type EndOfGameScreenProps =
  | {
      outcome: 'success';
      score: number;
      total: number;
    }
  | {
      outcome: 'failure';
      score: number;
      total: number;
      placedCount: number;
      remainingCount: number;
      misplacedEventName: string;
      misplacedEventYear: number;
    };

const Container = styled.section`
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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 480px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StatItem = styled.li`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
`;

const BackButton = styled(Link)`
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

export const EndOfGameScreen = (props: EndOfGameScreenProps) => {
  const t = useTranslations('endGame');
  const { outcome } = props;

  if (outcome === 'success') {
    const { score, total } = props;
    return (
      <Container>
        <Title>{t('successTitle')}</Title>
        <Message>
          {t('successMessage', { score, total })}
          {score === total && <> {t('perfectScore')}</>}
        </Message>
        <BackButton href="/">{t('backToHome')}</BackButton>
      </Container>
    );
  }

  const { score, total, placedCount, remainingCount, misplacedEventName, misplacedEventYear } =
    props;
  return (
    <Container>
      <Title>{t('failureTitle')}</Title>
      <Message>{t('failureMessage', { score, total })}</Message>
      <StatsList>
        <StatItem>{t('eventsPlaced', { count: placedCount })}</StatItem>
        <StatItem>{t('eventsRemaining', { count: remainingCount })}</StatItem>
        <StatItem>
          {t('misplacedEvent', {
            eventName: misplacedEventName,
            expectedYear: misplacedEventYear,
            actualYear: misplacedEventYear,
          })}
        </StatItem>
      </StatsList>
      <BackButton href="/">{t('backToHome')}</BackButton>
    </Container>
  );
};
