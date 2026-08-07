'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { SafeImage } from './common/SafeImage.tsx';

const HeaderContainer = styled.header(
  ({ theme }) => css`
    height: 64px;
    display: flex;
    align-items: center;
    background-color: ${theme.colors.surface};
    border-bottom: 1px solid ${theme.colors.border};
    box-shadow: ${theme.shadows.sm};
    position: sticky;
    top: 0;
    z-index: ${theme.zIndex.sticky};
  `,
);

const StyledLink = styled(Link)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    transition: opacity 0.2s ease;
    height: 100%;
    padding: ${theme.spacing.sm};

    &:hover {
      opacity: 0.5;
      background-color: ${theme.colors.surfaceActive};
    }
  `,
);

const LogoLink = styled(StyledLink)(
  ({ theme }) => css`
    border-right: 1px solid ${theme.colors.border};
  `,
);

const LogoText = styled.span(
  ({ theme }) => css`
    margin-left: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary};
  `,
);

export const Header = () => {
  const t = useTranslations('common');

  return (
    <HeaderContainer>
      <LogoLink href="https://coopcvm.com/" target="_blank" rel="noopener noreferrer">
        <SafeImage
          src="/logo-coopcvm.png"
          alt={t('logoText')}
          title={t('logoText')}
          width={40}
          height={40}
          preload
        />
      </LogoLink>
      <StyledLink href="/" rel="noopener noreferrer">
        <LogoText>{t('appName')}</LogoText>
      </StyledLink>
    </HeaderContainer>
  );
};
