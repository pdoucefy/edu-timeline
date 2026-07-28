'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { SafeImage } from '@/components/SafeImage.tsx';
import { PLACEHOLDER_IMAGE_PATH, resolveImagePath } from '@/data/loader.ts';
import type { Event } from '@/types/event.ts';

type EventCardProps = {
  event: Event;
  revealed: boolean;
  isFailed?: boolean;
};

const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  width: 100%;
  max-width: 280px;

  &[data-failed='true'] {
    border: 2px solid ${({ theme }) => theme.colors.error};
    box-shadow: 0 0 12px ${({ theme }) => theme.colors.errorMuted};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
`;

const EventName = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const DateLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const imageStyle = { objectFit: 'cover' as const };

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
    <CardContainer data-failed={isFailed}>
      <ImageWrapper>
        <SafeImage
          src={resolveImagePath(event.fileName)}
          fallbackSrc={PLACEHOLDER_IMAGE_PATH}
          alt={altText}
          fill
          imageName={event.name}
          onFallback={handleImageError}
          sizes="280px"
          style={imageStyle}
        />
      </ImageWrapper>
      <Content>
        <EventName>{event.name}</EventName>
        <DateLabel>{revealed ? `${t('yearLabel')} ${event.date.getFullYear()}` : '?'}</DateLabel>
      </Content>
    </CardContainer>
  );
};
