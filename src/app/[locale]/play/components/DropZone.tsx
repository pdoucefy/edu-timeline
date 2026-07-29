'use client';

import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';
import styled from 'styled-components';

export type DropZoneProps = {
  index: number;
  isActive?: boolean;
  onClick?: (index: number) => void;
  'data-testid'?: string;
  /**
   * Optional ref setter injected by a drag-and-drop wrapper
   * (e.g. dnd-kit's `useDroppable().setNodeRef`). Left undefined for the plain
   * timeline so the base component stays drag-free.
   */
  dropRef?: (element: HTMLElement | null) => void;
  /**
   * Optional extra DOM attributes injected by a drag-and-drop wrapper
   * (e.g. `data-droppable-id`). Spread onto the slot only when provided.
   */
  dropAttributes?: Record<string, unknown>;
};

const SlotContainer = styled.div<{ $isActive?: boolean }>`
  min-width: 2.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  border-radius: ${({ theme }) => theme.radii.md};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primaryMuted : 'transparent'};
  border: 2px dashed
    ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : theme.colors.border)};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

export const DropZone = React.memo((props: DropZoneProps) => {
  const { index, isActive, onClick, 'data-testid': dataTestId, dropRef, dropAttributes } = props;
  const t = useTranslations('game');

  const handleClick = useCallback(() => {
    onClick?.(index);
  }, [onClick, index]);

  return (
    <SlotContainer
      ref={dropRef}
      $isActive={isActive}
      onClick={handleClick}
      data-slot-index={index}
      data-testid={dataTestId ?? `slot-${index}`}
      role="button"
      aria-label={`${t('dropZone')} ${index}`}
      tabIndex={onClick ? 0 : -1}
      {...dropAttributes}
    />
  );
});

DropZone.displayName = 'DropZone';
