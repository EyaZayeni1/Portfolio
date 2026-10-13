import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'outline';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium',
        variant === 'default' &&
          'border border-border-subtle bg-surface-muted text-text-secondary',
        variant === 'accent' &&
          'border border-accent-500/20 bg-accent-500/10 text-accent-600 dark:text-accent-300',
        variant === 'outline' && 'border border-border-strong text-text-secondary',
        className
      )}
    >
      {children}
    </span>
  );
}
