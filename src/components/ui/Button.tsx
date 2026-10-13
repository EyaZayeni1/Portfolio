import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'sm';
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  iconPosition = 'right',
  target,
  rel,
  type = 'button',
}: ButtonProps) {
  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    size === 'md' ? 'px-6 py-3 text-sm' : 'px-4 py-2 text-xs',
    variant === 'primary' &&
      'bg-text-primary text-surface hover:bg-accent-600 hover:text-white dark:bg-white dark:text-black dark:hover:bg-accent-500 dark:hover:text-white',
    variant === 'secondary' &&
      'border border-border-strong bg-transparent text-text-primary hover:border-accent-500 hover:text-accent-500',
    variant === 'ghost' && 'text-text-secondary hover:text-text-primary',
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} className={classes} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {content}
    </motion.button>
  );
}
