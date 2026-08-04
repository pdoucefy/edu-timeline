'use client';

import { useTranslations } from 'next-intl';
import styled, { css } from 'styled-components';

import { Button } from '@/components/common/Button.tsx';
import { Typography } from '@/components/common/Typography.tsx';

export type EndOfGameScreenProps = {
  score: number;
  total: number;
  onPlayAgain?: () => void;
} & (
  | {
      outcome: 'success';
    }
  | {
      outcome: 'failure';
      placedCount: number;
      remainingCount: number;
      misplacedEventName: string;
      misplacedEventYear: number;
    }
);

const Container = styled.section(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.xl};
    text-align: center;
  `,
);

const Message = styled.div(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing.xl};
    max-width: 480px;
  `,
);

const StatsList = styled.ul(
  ({ theme }) => css`
    list-style: none;
    padding: 0;
    margin: 0 0 ${theme.spacing.xl};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
  `,
);

const StatItem = styled.li(
  ({ theme }) => css`
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text};
  `,
);

const ButtonGroup = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.md};
    flex-wrap: wrap;
    justify-content: center;
  `,
);

export const EndOfGameScreen = (props: EndOfGameScreenProps) => {
  const t = useTranslations('endGame');
  const { score, total, outcome, onPlayAgain } = props;

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
      <Container>
        <Typography $variant="h1">{t('successTitle')}</Typography>
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
      <Typography $variant="h1">{t('failureTitle')}</Typography>
      <Message>
        <Typography $variant="light">
          {t(score === 1 ? 'failureMessage' : 'failureMessagePlural', { score, total })}
        </Typography>
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
