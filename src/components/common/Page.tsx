'use client';

import styled, { css } from 'styled-components';

export const Page = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.lg};
    width: 100%;
    height: 100%;
  `,
);
