'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoText = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Header = () => {
  const t = useTranslations('header');

  return (
    <HeaderContainer>
      <LogoLink href="https://coopcvm.com/" target="_blank" rel="noopener noreferrer">
        <Image src="/logo-coopcvm.svg" alt={t('logoAlt')} width={40} height={40} priority />
        <LogoText>{t('logoText')}</LogoText>
      </LogoLink>
    </HeaderContainer>
  );
};
