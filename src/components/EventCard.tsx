'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import { PLACEHOLDER_IMAGE_PATH, resolveImagePath } from '@/data/loader.ts';
import type { Event } from '@/types/event.ts';

type EventCardProps = {
  event: Event;
  revealed: boolean;
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
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
`;

const StyledImage = styled(Image)`
  object-fit: cover;
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

export const EventCard = ({ event, revealed }: EventCardProps) => {
  const t = useTranslations('game');
  const errorsT = useTranslations('errors');
  const [imgSrc, setImgSrc] = useState(resolveImagePath(event.fileName));

  const handleImageError = () => {
    console.warn(`Failed to load image for event "${event.name}": ${event.fileName}`);
    setImgSrc(PLACEHOLDER_IMAGE_PATH);
  };

  const altText =
    imgSrc === PLACEHOLDER_IMAGE_PATH
      ? errorsT('imagePlaceholder')
      : errorsT('missingImageAlt', { eventName: event.name });

  return (
    <CardContainer>
      <ImageWrapper>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <StyledImage src={imgSrc} alt={altText} fill sizes="280px" onError={handleImageError} />
      </ImageWrapper>
      <Content>
        <EventName>{event.name}</EventName>
        <DateLabel>{revealed ? `${t('yearLabel')} ${event.date.getFullYear()}` : '?'}</DateLabel>
      </Content>
    </CardContainer>
  );
};
