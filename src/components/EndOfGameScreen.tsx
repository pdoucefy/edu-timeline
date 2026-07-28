'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Link } from '@/i18n/navigation.ts';

export type EndOfGameScreenProps =
  | {
      outcome: 'success';
      score: number;
      total: number;
      onPlayAgain?: () => void;
    }
  | {
      outcome: 'failure';
      score: number;
      total: number;
      placedCount: number;
      remainingCount: number;
      misplacedEventName: string;
      misplacedEventYear: number;
      onPlayAgain?: () => void;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
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

const PlayAgainButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xxl}`};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryMuted};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
  }
`;

export const EndOfGameScreen = (props: EndOfGameScreenProps) => {
  const t = useTranslations('endGame');
  const { score, total, outcome, onPlayAgain } = props;

  const actionButtons = (
    <ButtonGroup>
      {onPlayAgain && (
        <PlayAgainButton type="button" onClick={onPlayAgain}>
          {t('playAgain')}
        </PlayAgainButton>
      )}
      <BackButton href="/select">{t('backToHome')}</BackButton>
    </ButtonGroup>
  );

  if (outcome === 'success') {
    return (
      <Container>
        <Title>{t('successTitle')}</Title>
        <Message>
          {t(score === 1 ? 'successMessage' : 'successMessagePlural', { score, total })}
          {score === total && <> {t('perfectScore')}</>}
        </Message>
        {actionButtons}
      </Container>
    );
  }

  const { placedCount, remainingCount, misplacedEventName, misplacedEventYear } = props;

  return (
    <Container>
      <Title>{t('failureTitle')}</Title>
      <Message>
        {t(score === 1 ? 'failureMessage' : 'failureMessagePlural', { score, total })}
      </Message>
      <StatsList>
        <StatItem>
          {t(placedCount === 1 ? 'eventsPlaced' : 'eventsPlacedPlural', { count: placedCount })}
        </StatItem>
        <StatItem>
          {t(remainingCount === 1 ? 'eventsRemaining' : 'eventsRemainingPlural', {
            count: remainingCount,
          })}
        </StatItem>
        <StatItem>
          {t('misplacedEvent', {
            eventName: misplacedEventName,
            eventYear: misplacedEventYear,
          })}
        </StatItem>
      </StatsList>
      {actionButtons}
    </Container>
  );
};
