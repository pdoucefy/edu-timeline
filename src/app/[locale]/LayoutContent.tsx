'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';

const LayoutContentWrapper = styled.main`
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 120px 60px;
`;

export const LayoutContent = ({ children }: { children: ReactNode }) => (
  <LayoutContentWrapper>{children}</LayoutContentWrapper>
);
