'use client';

import { useTranslations } from 'next-intl';
import styled, { css } from 'styled-components';

import { SafeImage } from './common/SafeImage.tsx';

const HeaderContainer = styled.header(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.md};
    background-color: ${theme.colors.surface};
    border-bottom: 1px solid ${theme.colors.border};
    box-shadow: ${theme.shadows.sm};
    position: sticky;
    top: 0;
    z-index: ${theme.zIndex.sticky};
  `,
);

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoText = styled.span(
  ({ theme }) => css`
    margin-left: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary};
  `,
);

export const Header = () => {
  const t = useTranslations('header');

  return (
    <HeaderContainer>
      <LogoLink href="https://coopcvm.com/" target="_blank" rel="noopener noreferrer">
        <SafeImage src="/logo-coopcvm.png" alt={t('logoAlt')} width={40} height={40} priority />
        <LogoText>{t('logoText')}</LogoText>
      </LogoLink>
    </HeaderContainer>
  );
};
