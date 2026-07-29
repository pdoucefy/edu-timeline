'use client';

import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line import/order
import type { Event } from '@/types/event.ts';

import { DropZone } from './DropZone.tsx';
import { EventCard } from './EventCard.tsx';

export type SlotInjection = {
  dropRef?: (element: HTMLElement | null) => void;
  dropAttributes?: Record<string, unknown>;
};

export type TimelineProps = {
  events: Event[];
  activeSlotIndex?: number | null;
  onSlotClick?: (index: number) => void;
  /**
   * Optional per-slot props supplied by a drag-and-drop wrapper
   * (e.g. {@link DragDropTimeline}) to register each slot as a droppable.
   * When omitted, the timeline renders as a plain, drag-free component.
   */
  getSlotProps?: (index: number) => SlotInjection;
  /** If provided, the event with this id is rendered as the failed (misplaced) card. */
  failedEventId?: number;
};

const TimelineContainer = styled.div`
  display: flex;
  justify-content: center;
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
  const { events, activeSlotIndex, onSlotClick, getSlotProps, failedEventId } = props;
  const slotsCount = events.length + 1;

  return (
    <TimelineContainer data-testid="timeline-container">
      <TimelineTrack data-testid="timeline-track">
        {Array.from({ length: slotsCount }, (_, i) => {
          const injected = getSlotProps?.(i);
          return (
            <React.Fragment key={`slot-${i}`}>
              <DropZone
                index={i}
                isActive={activeSlotIndex === i}
                onClick={onSlotClick}
                data-testid={`slot-${i}`}
                dropRef={injected?.dropRef}
                dropAttributes={injected?.dropAttributes}
              />
              {events[i] && (
                <EventCard
                  key={`event-${events[i].id}`}
                  event={events[i]}
                  revealed
                  isFailed={events[i].id === failedEventId}
                />
              )}
            </React.Fragment>
          );
        })}
      </TimelineTrack>
    </TimelineContainer>
  );
});

Timeline.displayName = 'Timeline';
