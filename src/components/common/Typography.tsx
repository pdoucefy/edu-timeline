'use client';

import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

import { theme as appTheme } from '@/styles/theme.ts';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'light';

const StyledHeader = styled.h1<TypographyProps>(
  ({ theme, $color = 'text', $variant, $centered }) => {
    let fontSize: keyof typeof appTheme.typography.fontSize = 'xxxl';
    if ($variant === 'h2') {
      fontSize = 'xxl';
    } else if ($variant === 'h3') {
      fontSize = 'xl';
    }

    let color: keyof typeof appTheme.colors = $color;
    if ($variant === 'h2') color = 'textMuted';

    return css`
      font-size: ${theme.typography.fontSize[fontSize]};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors[color]};
      text-align: ${$centered ? 'center' : 'left'};
    `;
  },
);

const StyledP = styled.p<TypographyProps>(
  ({ theme, $color = 'text', $variant, $centered }) => css`
    font-size: ${theme.typography.fontSize.md};
    color: ${theme.colors[$color ?? ($variant === 'light' ? 'textMuted' : 'text')]};
    line-height: ${theme.typography.lineHeight.relaxed};
    text-align: ${$centered ? 'center' : 'left'};
  `,
);

type TypographyProps = PropsWithChildren<{
  $variant: TypographyVariant;
  $color?: keyof typeof appTheme.colors;
  $centered?: boolean;
}>;

// TODO: add different elements in "as" prop like Button.tsx?
export const Typography = ({ children, ...props }: TypographyProps) => {
  switch (props.$variant) {
    case 'h1':
      return <StyledHeader {...props}>{children}</StyledHeader>;
    case 'h2':
      return (
        <StyledHeader as="h2" {...props}>
          {children}
        </StyledHeader>
      );
    case 'h3':
      return (
        <StyledHeader as="h3" {...props}>
          {children}
        </StyledHeader>
      );
    case 'light':
      return <StyledP {...props}>{children}</StyledP>;
    default:
      return null;
  }
};
