'use client';

import React from 'react';
import styled from 'styled-components';

import type { Event } from '@/types/event.ts';

import { DropZone } from './DropZone.tsx';
import { EventCard } from './EventCard.tsx';

export type TimelineProps = {
  events: Event[];
  activeSlotIndex?: number | null;
  onSlotClick?: (index: number) => void;
};

const TimelineContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const TimelineTrack = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: min-content;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Timeline = React.memo((props: TimelineProps) => {
  const { events, activeSlotIndex, onSlotClick } = props;
  const slotsCount = events.length + 1;

  return (
    <TimelineContainer data-testid="timeline-container">
      <TimelineTrack data-testid="timeline-track">
        {Array.from({ length: slotsCount }, (_, i) => (
          <React.Fragment key={`slot-${i}`}>
            <DropZone
              index={i}
              isActive={activeSlotIndex === i}
              onClick={onSlotClick}
              data-testid={`slot-${i}`}
            />
            {events[i] && <EventCard key={`event-${events[i].id}`} event={events[i]} revealed />}
          </React.Fragment>
        ))}
      </TimelineTrack>
    </TimelineContainer>
  );
});

Timeline.displayName = 'Timeline';
