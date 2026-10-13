import { ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImagePlaceholderProps {
  label: string;
  className?: string;
  variant?: 'project' | 'avatar' | 'certificate' | 'logo';
  /** Real image URL (e.g. an imported file from `src/assets/`). When set, it's rendered instead of the placeholder. */
  src?: string;
  alt?: string;
  /** Extra classes for the rendered <img> (e.g. hover zoom). */
  imgClassName?: string;
  /** Use 'eager' for above-the-fold images. */
  loading?: 'lazy' | 'eager';
}

/**
 * Elegant stand-in for a real image — until `src` is provided, in which case
 * it renders that image instead. This means a component never needs to
 * change: just pass a real `src` from `src/data/portfolio.ts` once you have
 * your visuals ready (see `src/assets/README.md`).
 */
export function ImagePlaceholder({
  label,
  className,
  variant = 'project',
  src,
  alt,
  imgClassName,
  loading = 'lazy',
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-2xl border border-border-subtle bg-surface-muted',
          variant === 'avatar' && 'rounded-full',
          className
        )}
      >
        <img
          src={src}
          alt={alt ?? label}
          loading={loading}
          decoding="async"
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex select-none items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border-strong bg-surface-muted',
        variant === 'avatar' && 'rounded-full',
        className
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute -inset-8 opacity-40 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, var(--color-accent-500), transparent 55%), radial-gradient(circle at 75% 70%, var(--color-accent2-500), transparent 50%)',
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <ImageIcon
          className="h-6 w-6 text-text-tertiary"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
          {label}
        </span>
      </div>
    </div>
  );
}
