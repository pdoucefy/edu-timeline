'use client';

import { ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components';

import { Link } from '@/i18n/navigation.ts';

type ButtonVariant = 'primary' | 'secondary' | 'link';
type StyledButtonProps = { $variant: ButtonVariant };

const StyledButton = styled.button<StyledButtonProps>(
  ({ theme, $variant }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.md} ${theme.spacing.xxl};
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    border-radius: ${theme.radii.lg};
    background-color: ${$variant === 'secondary' ? 'transparent' : theme.colors.primary};
    color: ${$variant === 'secondary' ? theme.colors.primary : theme.colors.textInverse};
    border: ${$variant === 'secondary' ? `1px solid ${theme.colors.primary}` : 'none'};
    text-decoration: none;
    transition: background-color 0.2s ease;
    cursor: pointer;

    &:hover {
      background-color: ${$variant === 'secondary'
        ? theme.colors.primaryMuted
        : theme.colors.primaryHover};
    }

    &:active {
      background-color: ${$variant === 'secondary'
        ? theme.colors.primaryMuted
        : theme.colors.primaryActive};
      ${$variant === 'secondary' &&
      css`
        color: ${theme.colors.textInverse};
      `}
    }

    &:disabled {
      background: ${theme.colors.borderStrong};
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
  `,
);

type ButtonProps =
  | ({
      $variant: 'link';
    } & Omit<ComponentPropsWithoutRef<typeof Link>, 'as'>)
  | ({
      $variant: Exclude<ButtonVariant, 'link'>;
    } & ButtonHTMLAttributes<HTMLButtonElement>);

export const Button = ({ $variant, ...rest }: ButtonProps) => {
  if ($variant === 'link') {
    const props = rest as Omit<ComponentPropsWithoutRef<typeof Link>, 'as'>;
    return <StyledButton as={Link} $variant={$variant} {...props} />;
  }

  const props = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return <StyledButton $variant={$variant} {...props} />;
};
