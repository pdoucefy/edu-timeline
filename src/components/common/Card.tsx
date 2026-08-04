'use client';

import styled, { css } from 'styled-components';

export const Card = styled.div<{ $failed?: boolean }>(
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
    width: 100%;

    ${$failed &&
    css`
      border: 2px solid ${theme.colors.error};
      box-shadow: 0 0 12px ${theme.colors.errorMuted};
    `}
  `,
);
