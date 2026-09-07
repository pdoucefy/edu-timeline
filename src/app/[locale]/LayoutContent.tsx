'use client';

import type { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

import { DataProvider } from '@/data/DataProvider.tsx';

const LayoutContentWrapper = styled.main(
  ({ theme }) => css`
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.background};
    padding: 0px 60px;
  `,
);

export const LayoutContent = ({ children }: PropsWithChildren) => (
  <DataProvider>
    <LayoutContentWrapper>{children}</LayoutContentWrapper>
  </DataProvider>
);
