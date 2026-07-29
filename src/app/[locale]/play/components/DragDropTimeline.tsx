'use client';

import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line import/order
import type { Event } from '@/types/event.ts';

import { EndOfGameScreen } from './EndOfGameScreen.tsx';
import { EventCard } from './EventCard.tsx';
import { type SlotInjection, Timeline } from './Timeline.tsx';

/**
 * dnd-kit id for the single draggable current event. There is only ever one
 * current event on the surface, so a constant id is sufficient.
 */
const DRAGGABLE_ID = 'current-event';

/** Builds the dnd-kit droppable id for insertion slot `index`. */
const slotDroppableId = (index: number): string => `slot-${index}`;

/** Parses an insertion index back out of a droppable id, or null if it is not a slot. */
const parseSlotIndex = (overId: string | number | null | undefined): number | null => {
  if (overId === null || overId === undefined) return null;
  const id = String(overId);
  if (!id.startsWith('slot-')) return null;
  const index = Number(id.slice('slot-'.length));
  return Number.isInteger(index) ? index : null;
};

const DraggableWrapper = styled.div<{ $isDragging: boolean }>`
  cursor: grab;
  touch-action: none;
  /* Hide the source while dragging; the DragOverlay renders the moving copy. */
  opacity: ${({ $isDragging }) => ($isDragging ? 0 : 1)};

  &:active {
    cursor: grabbing;
  }
`;

const CurrentEventArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TimelineArea = styled.section`
  width: 100%;
`;

/**
 * Registers a single insertion slot as a dnd-kit droppable and returns the
 * ref/attributes to inject into the underlying {@link Timeline} slot.
 *
 * Rendered once per slot as an invisible registrar so the hook count is stable
 * for a given slot; when a placement changes the slot count, React remounts the
 * registrar list, which is safe.
 */
const SlotDroppable = ({
  index,
  onReady,
}: {
  index: number;
  onReady: (index: number, injection: SlotInjection) => void;
}) => {
  const { setNodeRef } = useDroppable({ id: slotDroppableId(index), data: { index } });
  onReady(index, {
    dropRef: setNodeRef,
    dropAttributes: { 'data-droppable-id': slotDroppableId(index) },
  });
  return null;
};

/**
 * Wraps {@link EventCard} in a dnd-kit draggable. The card itself is untouched
 * so it can still be reused (revealed) inside the timeline.
 */
const DraggableEventCard = ({ event }: { event: Event }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: DRAGGABLE_ID });

  return (
    <DraggableWrapper ref={setNodeRef} $isDragging={isDragging} {...listeners} {...attributes}>
      <EventCard event={event} revealed={false} />
    </DraggableWrapper>
  );
};

type DragDropTimelineProps = {
  /** Events already placed on the timeline, chronologically ordered. */
  events: Event[];
  /** The event the player is currently placing (rendered as the draggable). Null when the game is over. */
  currentEvent: Event | null;
  /**
   * Called with the chosen insertion index (0..events.length) when the current event is dropped onto a slot, or when a slot is clicked.
   * This layer only produces the index — validation and state transitions live elsewhere (the game reducer).
   */
  onPlace: (index: number) => void;
  /** Game status so the timeline can render end-of-game state inline. */
  gameStatus?: 'playing' | 'won' | 'lost';
  /** Failure details shown when the game is lost. */
  failure?: {
    misplacedEvent: Event;
    placedCount: number;
    remainingCount: number;
    attemptedIndex: number;
  } | null;
  /** Callback to restart the game; rendered as a play-again button on end-of-game. */
  onPlayAgain?: () => void;
};

/**
 * Drag-and-drop surface for timeline placement.
 *
 * Wraps the current event as a dnd-kit draggable and each timeline insertion
 * slot as a droppable, mapping every drop to its insertion index and surfacing
 * it via {@link DragDropTimelineProps.onPlace}. The active slot is highlighted
 * during a drag, and a Framer Motion {@link DragOverlay} gives smooth movement
 * and settling feedback. Clicking a slot remains supported as a fallback.
 *
 * No validation or win/lose logic lives here — the drag layer only reports the
 * chosen index, keeping the game-loop decision decoupled.
 */
export const DragDropTimeline = ({
  events,
  currentEvent,
  onPlace,
  gameStatus = 'playing',
  failure = null,
  onPlayAgain,
}: DragDropTimelineProps) => {
  const t = useTranslations('game');
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Injection map: slot index → { dropRef, dropAttributes }, populated by the
  // SlotDroppable registrars and read back by the Timeline via getSlotProps.
  const [injections] = useState(() => new Map<number, SlotInjection>());

  // Build a display timeline that includes the misplaced event at the
  // attempted slot index when the game is lost, so it appears on the timeline
  // in red where the player tried to drop it.
  const displayEvents = useMemo(() => {
    if (gameStatus === 'lost' && failure) {
      return [
        ...events.slice(0, failure.attemptedIndex),
        failure.misplacedEvent,
        ...events.slice(failure.attemptedIndex),
      ];
    }
    return events;
  }, [events, failure, gameStatus]);

  const displaySlotCount = displayEvents.length + 1;

  // A pointer activation constraint lets a plain click through (fallback) while
  // still starting a drag once the pointer moves a few pixels. The keyboard
  // sensor provides basic keyboard drag support out of the box.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const registerInjection = useCallback(
    (index: number, injection: SlotInjection) => {
      injections.set(index, injection);
    },
    [injections],
  );

  const getSlotProps = useCallback(
    (index: number): SlotInjection => injections.get(index) ?? {},
    [injections],
  );

  const handleSlotClick = useCallback(
    (index: number) => {
      if (gameStatus !== 'playing') return;
      onPlace(index);
    },
    [onPlace, gameStatus],
  );

  const handleDragStart = useCallback((_event: DragStartEvent) => {
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setActiveSlotIndex(parseSlotIndex(event.over?.id));
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const index = parseSlotIndex(event.over?.id);
      setActiveSlotIndex(null);
      setIsDragging(false);
      // Dropped outside any slot → cancel with no state change.
      if (index !== null) {
        onPlace(index);
      }
    },
    [onPlace],
  );

  const handleDragCancel = useCallback(() => {
    setActiveSlotIndex(null);
    setIsDragging(false);
  }, []);

  const registrars = useMemo(
    () =>
      Array.from({ length: displaySlotCount }, (_, i) => (
        <SlotDroppable key={`droppable-${i}`} index={i} onReady={registerInjection} />
      )),
    [displaySlotCount, registerInjection],
  );

  return (
    <DndContext
      id="timeline-dnd"
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {registrars}
      <CurrentEventArea aria-label={t('dragToTimeline')}>
        {gameStatus === 'playing' && currentEvent && <DraggableEventCard event={currentEvent} />}
        {gameStatus === 'won' && (
          <EndOfGameScreen
            outcome="success"
            score={events.length - 1}
            total={events.length - 1}
            isCompact
            onPlayAgain={onPlayAgain}
          />
        )}
        {gameStatus === 'lost' && failure && (
          <EndOfGameScreen
            outcome="failure"
            score={failure.placedCount}
            total={failure.placedCount + failure.remainingCount}
            placedCount={failure.placedCount}
            remainingCount={failure.remainingCount}
            misplacedEventName={failure.misplacedEvent.name}
            misplacedEventYear={failure.misplacedEvent.date.getFullYear()}
            isCompact
            onPlayAgain={onPlayAgain}
          />
        )}
      </CurrentEventArea>
      <TimelineArea>
        <Timeline
          events={displayEvents}
          activeSlotIndex={activeSlotIndex}
          onSlotClick={handleSlotClick}
          getSlotProps={getSlotProps}
          failedEventId={failure?.misplacedEvent.id}
        />
      </TimelineArea>
      <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
        <AnimatePresence>
          {isDragging && currentEvent ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05, rotate: -2 }}
              exit={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{ cursor: 'grabbing' }}
            >
              <EventCard event={currentEvent} revealed={false} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </DragOverlay>
    </DndContext>
  );
};
