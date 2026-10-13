import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Loader2, X } from 'lucide-react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
}

/**
 * Demo-video player built on the native <dialog> element, which gives us focus
 * trapping, Escape-to-close and top-layer rendering for free. The <video> only
 * mounts while open, so nothing is downloaded until the visitor asks for it.
 */
export function VideoModal({ open, onClose, src, title }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useLockBodyScroll(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setState('loading');
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the backdrop target the <dialog> itself.
        if (event.target === event.currentTarget) onClose();
      }}
      aria-label={`${title} — demo video`}
      className="m-auto w-[min(64rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated p-0 text-text-primary shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-4 py-3 sm:px-5">
        <p className="truncate text-sm font-semibold">{title}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative aspect-video bg-black">
        {open && state !== 'error' && (
          <video
            src={src}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onLoadedData={() => setState('ready')}
            onError={() => setState('error')}
            className="h-full w-full"
          />
        )}
        {state === 'loading' && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-sm text-white/70">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading video…
          </div>
        )}
        {state === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-white/80">
            <AlertCircle className="h-6 w-6 text-red-400" />
            The demo video couldn&apos;t be loaded. Please try again later.
          </div>
        )}
      </div>
    </dialog>
  );
}
