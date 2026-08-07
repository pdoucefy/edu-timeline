'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

import { SafeImage } from '@/components/common/SafeImage.tsx';
import { PLACEHOLDER_IMAGE_PATH, resolveImagePath } from '@/data/loader.ts';
import type { Event } from '@/types/event.ts';

type EventCardProps = {
  event: Event;
  revealed: boolean;
  isFailed?: boolean;
};

const ImageWrapper = styled.div(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    background-color: ${theme.colors.surfaceHover};
  `,
);

const Content = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.xs};
    justify-content: center;
  `,
);

const EventName = styled.h3(
  ({ theme }) => css`
    margin: 0;
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text};
    line-height: ${theme.typography.lineHeight.tight};
  `,
);

const DateLabel = styled.span(
  ({ theme }) => css`
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
);

const imageStyle = {
  objectFit: 'cover' as const,
  userSelect: 'none' as const,
  pointerEvents: 'none' as const,
};

const Card = styled.div<{ $failed?: boolean }>(
  ({ theme, $failed }) => css`
    display: flex;
    flex-direction: column;
    border-radius: ${theme.radii.lg};
    background-color: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    box-shadow: ${theme.shadows.sm};
    padding: ${theme.spacing.lg};
    gap: ${theme.spacing.md};
    overflow: hidden;
    width: 280px;

    ${$failed &&
    css`
      border: 2px solid ${theme.colors.error};
      box-shadow: 0 0 12px ${theme.colors.errorMuted};
    `}
  `,
);

export const EventCard = ({ event, revealed, isFailed }: EventCardProps) => {
  const t = useTranslations('game');
  const errorsT = useTranslations('errors');
  const [isFallback, setIsFallback] = useState(false);

  const handleImageError = useCallback(() => {
    console.warn(`Failed to load image for event "${event.name}": ${event.fileName}`);
    setIsFallback(true);
  }, [event.name, event.fileName]);

  const altText = isFallback
    ? errorsT('imagePlaceholder')
    : errorsT('missingImageAlt', { eventName: event.name });

  return (
    <Card $failed={isFailed}>
      <ImageWrapper>
        <SafeImage
          src={resolveImagePath(event.fileName)}
          fallbackSrc={PLACEHOLDER_IMAGE_PATH}
          alt={altText}
          fill
          imageName={event.name}
          onFallback={handleImageError}
          style={imageStyle}
        />
      </ImageWrapper>
      <Content>
        <EventName>{event.name}</EventName>
        <DateLabel>{revealed ? `${t('yearLabel')} ${event.date.getFullYear()}` : '?'}</DateLabel>
      </Content>
    </Card>
  );
};
