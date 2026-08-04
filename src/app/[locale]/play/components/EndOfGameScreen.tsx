'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Button } from '@/components/common/Button.tsx';

export type EndOfGameScreenProps =
  | {
      outcome: 'success';
      score: number;
      total: number;
      onPlayAgain?: () => void;
      isCompact?: boolean;
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
      isCompact?: boolean;
    };

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  &[data-compact='false'] {
    min-height: calc(100vh - 73px);
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  [data-compact='true'] & {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
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

export const EndOfGameScreen = (props: EndOfGameScreenProps) => {
  const t = useTranslations('endGame');
  const { score, total, outcome, onPlayAgain, isCompact } = props;

  const actionButtons = (
    <ButtonGroup>
      {onPlayAgain && (
        <Button $variant="secondary" type="button" onClick={onPlayAgain}>
          {t('playAgain')}
        </Button>
      )}
      <Button $variant="link" href="/select">
        {t('backToHome')}
      </Button>
    </ButtonGroup>
  );

  if (outcome === 'success') {
    return (
      <Container data-compact={String(isCompact)}>
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
    <Container data-compact={String(isCompact)}>
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
