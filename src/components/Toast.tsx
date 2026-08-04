'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const ToastRoot = styled.div<{ $open: boolean }>(
  ({ theme, $open }) => css`
    position: fixed;
    bottom: ${theme.spacing.xl};
    left: 50%;
    transform: translateX(-50%);
    z-index: ${theme.zIndex.toast};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    padding: ${`${theme.spacing.md} ${theme.spacing.lg}`};
    background-color: ${theme.colors.warningMuted};
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.warning};
    border-radius: ${theme.radii.lg};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    box-shadow: ${theme.shadows.md};
    opacity: ${$open ? 1 : 0};
    pointer-events: ${$open ? 'auto' : 'none'};
    transition: opacity 0.3s ease;
    max-width: min(90vw, 480px);
  `,
);

const DismissButton = styled.button(
  ({ theme }) => css`
    background: transparent;
    border: none;
    color: ${theme.colors.textMuted};
    cursor: pointer;
    font-size: ${theme.typography.fontSize.md};
    line-height: 1;
    padding: ${theme.spacing.xs};

    &:hover {
      color: ${theme.colors.text};
    }
  `,
);

type ToastProps = {
  message: string;
  open?: boolean;
  duration?: number;
  onClose?: (value?: boolean) => void;
};

export const Toast = ({ message, open = true, duration = 5000, onClose }: ToastProps) => {
  const t = useTranslations('common');

  const [visible, setVisible] = useState(open);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible || duration <= 0) return undefined;

    timerRef.current = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, duration, onClose]);

  const handleDismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setVisible(false);
    onClose?.();
  }, [onClose]);

  return (
    <ToastRoot $open={visible} role="status" aria-live="polite">
      <span>{message}</span>
      <DismissButton onClick={handleDismiss} aria-label={t('dismiss')} type="button">
        ×
      </DismissButton>
    </ToastRoot>
  );
};
