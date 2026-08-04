'use client';

import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  width: 100%;

  &[data-failed='true'] {
    border: 2px solid ${({ theme }) => theme.colors.error};
    box-shadow: 0 0 12px ${({ theme }) => theme.colors.errorMuted};
  }
`;
