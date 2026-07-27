'use client';

import React, { useCallback } from 'react';
import styled from 'styled-components';

export type DropZoneProps = {
  index: number;
  isActive?: boolean;
  onClick?: (index: number) => void;
  'data-testid'?: string;
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
  const { index, isActive, onClick, 'data-testid': dataTestId } = props;

  const handleClick = useCallback(() => {
    onClick?.(index);
  }, [onClick, index]);

  return (
    <SlotContainer
      $isActive={isActive}
      onClick={handleClick}
      data-slot-index={index}
      data-testid={dataTestId ?? `slot-${index}`}
      role="button"
      aria-label={`Insertion slot ${index}`}
      tabIndex={onClick ? 0 : -1}
    />
  );
});

DropZone.displayName = 'DropZone';
