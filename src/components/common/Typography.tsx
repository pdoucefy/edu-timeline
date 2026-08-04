'use client';

import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

import { theme as appTheme } from '@/styles/theme.ts';

type TypographyVariant = 'h1';

const StyledH1 = styled.h1<Omit<TypographyProps, 'children'>>(
  ({ theme, $color }) => css`
    font-size: ${theme.typography.fontSize.xxxl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors[$color ?? 'text']};
    margin-bottom: ${theme.spacing.md};
  `,
);

type TypographyProps = PropsWithChildren<{
  $variant: TypographyVariant;
  $color?: keyof typeof appTheme.colors;
}>;

// TODO: add different elements in "as" prop like Button.tsx?
export const Typography = ({ children, ...props }: TypographyProps) => {
  switch (props.$variant) {
    case 'h1':
      return <StyledH1 {...props}>{children}</StyledH1>;
    default:
      return null;
  }
};
