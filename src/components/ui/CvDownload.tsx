import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Download } from 'lucide-react';
import { resumeOptions, type ResolvedResume } from '../../lib/resumes';
import { cn } from '../../lib/utils';

interface CvDownloadProps {
  /**
   * `hero` — large outlined button with a dropdown menu.
   * `nav` — compact pill with a dropdown menu.
   * `inline` — the language options side by side (for containers that would clip a dropdown).
   */
  variant?: 'hero' | 'nav' | 'inline';
  /** Which edge of the trigger the dropdown aligns to. */
  align?: 'left' | 'right';
  className?: string;
}

const FEEDBACK_MS = 2500;

/** "Download CV" control that lets visitors pick the French or English PDF. */
export function CvDownload({ variant = 'hero', align = 'left', className }: CvDownloadProps) {
  const [open, setOpen] = useState(false);
  const [downloaded, setDownloaded] = useState<ResolvedResume | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const pendingFocus = useRef<'first' | 'last' | null>(null);
  const menuId = useId();

  // Close when clicking/tapping anywhere outside the component.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Move focus into the menu once it has rendered.
  useEffect(() => {
    if (!open || !pendingFocus.current) return;
    const index = pendingFocus.current === 'first' ? 0 : resumeOptions.length - 1;
    pendingFocus.current = null;
    itemRefs.current[index]?.focus();
  }, [open]);

  // Reset the "Download started" feedback after a moment.
  useEffect(() => {
    if (!downloaded) return;
    const timeout = window.setTimeout(() => setDownloaded(null), FEEDBACK_MS);
    return () => window.clearTimeout(timeout);
  }, [downloaded]);

  function openMenu(focus: 'first' | 'last') {
    pendingFocus.current = focus;
    setOpen(true);
  }

  function closeMenu({ restoreFocus }: { restoreFocus: boolean }) {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }

  function handleSelect(resume: ResolvedResume) {
    setDownloaded(resume);
    if (variant !== 'inline') closeMenu({ restoreFocus: true });
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu(event.key === 'ArrowDown' ? 'first' : 'last');
    }
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = itemRefs.current.filter((item): item is HTMLElement => item !== null);
    const current = items.indexOf(document.activeElement as HTMLElement);
    const focusAt = (index: number) => items[(index + items.length) % items.length]?.focus();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusAt(current + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusAt(current - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusAt(0);
        break;
      case 'End':
        event.preventDefault();
        focusAt(items.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        break;
      case 'Tab':
        closeMenu({ restoreFocus: false });
        break;
    }
  }

  const status = (
    <span role="status" aria-live="polite" className="sr-only">
      {downloaded ? `Downloading ${downloaded.label}` : ''}
    </span>
  );

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {resumeOptions.map((resume) => (
          <ResumeLink
            key={resume.id}
            resume={resume}
            compact
            selected={downloaded?.id === resume.id}
            onSelect={handleSelect}
          />
        ))}
        {status}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <motion.button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? closeMenu({ restoreFocus: false }) : openMenu('first'))}
        onKeyDown={handleTriggerKeyDown}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'group inline-flex items-center gap-2 rounded-full font-semibold transition-colors',
          variant === 'hero' &&
            'border border-border-strong px-6 py-3.5 text-sm text-text-primary hover:border-accent-500 hover:text-accent-500',
          variant === 'nav' &&
            'bg-text-primary px-4 py-2 text-xs text-surface hover:bg-accent-600 hover:text-white dark:bg-white dark:text-black dark:hover:bg-accent-500 dark:hover:text-white',
          open && variant === 'hero' && 'border-accent-500 text-accent-500'
        )}
      >
        {downloaded ? (
          <Check className={variant === 'nav' ? 'h-3.5 w-3.5' : 'h-4 w-4'} strokeWidth={2.25} />
        ) : (
          <Download className={variant === 'nav' ? 'h-3.5 w-3.5' : 'h-4 w-4'} strokeWidth={2} />
        )}
        {downloaded ? 'Download started' : 'Download CV'}
        <ChevronDown
          className={cn(
            'transition-transform duration-200',
            variant === 'nav' ? 'h-3.5 w-3.5' : 'h-4 w-4',
            open && 'rotate-180'
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Choose CV language"
            onKeyDown={handleMenuKeyDown}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={cn(
              'absolute top-full z-40 mt-2 w-64 origin-top rounded-2xl border border-border-subtle bg-surface-elevated p-1.5 shadow-xl shadow-black/10',
              align === 'left' ? 'left-0' : 'right-0'
            )}
          >
            {resumeOptions.map((resume, index) => (
              <ResumeLink
                key={resume.id}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                resume={resume}
                role="menuitem"
                selected={downloaded?.id === resume.id}
                onSelect={handleSelect}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {status}
    </div>
  );
}

interface ResumeLinkProps {
  resume: ResolvedResume;
  selected: boolean;
  onSelect: (resume: ResolvedResume) => void;
  role?: 'menuitem';
  compact?: boolean;
  ref?: (element: HTMLElement | null) => void;
}

function ResumeLink({ resume, selected, onSelect, role, compact, ref }: ResumeLinkProps) {
  const inMenu = role === 'menuitem';
  const base = cn(
    'group/item flex items-center gap-3 font-medium outline-none transition-colors',
    compact
      ? 'rounded-full border border-border-subtle px-3 py-2 text-xs'
      : 'w-full rounded-xl px-3 py-2.5 text-left text-sm'
  );

  if (!resume.href) {
    return (
      <span
        ref={ref}
        role={role}
        tabIndex={inMenu ? -1 : undefined}
        aria-disabled="true"
        title="This CV isn't available yet"
        className={cn(base, 'cursor-not-allowed text-text-tertiary focus-visible:bg-surface-muted')}
      >
        <span className="flex-1">
          <span lang={resume.lang} className="block">
            {compact ? resume.lang.toUpperCase() : resume.label}
          </span>
          {!compact && <span className="block text-xs font-normal">Coming soon</span>}
        </span>
      </span>
    );
  }

  return (
    <a
      ref={ref}
      role={role}
      tabIndex={inMenu ? -1 : undefined}
      href={resume.href}
      download={resume.downloadName}
      type="application/pdf"
      onClick={() => onSelect(resume)}
      aria-label={compact ? `Download ${resume.label} (PDF)` : undefined}
      className={cn(
        base,
        'text-text-primary hover:bg-accent-500/10 hover:text-accent-600 focus-visible:bg-accent-500/10 focus-visible:text-accent-600 dark:hover:text-accent-300 dark:focus-visible:text-accent-300',
        compact && 'hover:border-accent-500/40',
        selected && 'text-accent-600 dark:text-accent-300'
      )}
    >
      <span className="flex-1">
        <span lang={resume.lang} className="block">
          {compact ? resume.lang.toUpperCase() : resume.label}
        </span>
        {!compact && (
          <span className="block text-xs font-normal text-text-tertiary">
            {selected ? 'Download started' : 'PDF'}
          </span>
        )}
      </span>
      {selected ? (
        <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.25} aria-hidden="true" />
      ) : (
        <Download
          className="h-4 w-4 text-text-tertiary transition-transform group-hover/item:translate-y-0.5 group-hover/item:text-current"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </a>
  );
}
