'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ToggleSwitchProps = {
  ariaLabel: string;
  title: string;
  onClick: () => void;
  leftContent: ReactNode;
  rightContent: ReactNode;
  thumbActive: boolean;
  buttonClassName?: string;
  trackClassName?: string;
  leftContentClassName?: string;
  rightContentClassName?: string;
  thumbClassName?: string;
};

export function ToggleSwitch({ ariaLabel, title, onClick, leftContent, rightContent, thumbActive, buttonClassName, trackClassName, leftContentClassName, rightContentClassName, thumbClassName }: ToggleSwitchProps) {
  return (
    <button type="button" className={cn('inline-flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-1', buttonClassName)} onClick={onClick} aria-label={ariaLabel} title={title}>
      <span className={cn('relative inline-flex h-6 w-10.5 items-center justify-between border-2 border-foreground px-1 leading-none', trackClassName)} aria-hidden="true">
        <span className={cn('relative z-10 inline-flex items-center justify-center self-center transition-opacity duration-300', leftContentClassName)}>{leftContent}</span>
        <span className={cn('relative z-10 inline-flex items-center justify-center self-center transition-opacity duration-300', rightContentClassName)}>{rightContent}</span>
        <span className={cn('absolute left-0.5 z-0 block h-4 w-4 bg-foreground duration-300', thumbActive && 'translate-x-4.5', thumbClassName)} />
      </span>
    </button>
  );
}
