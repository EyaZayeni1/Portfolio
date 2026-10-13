import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ImagePlaceholder } from './ImagePlaceholder';

interface ProjectMediaProps {
  name: string;
  /** Screenshot — used as the video poster, or shown alone when there's no demo. */
  image?: string;
  placeholder: string;
  demoVideo?: string;
  /** Opens the full demo (with sound and controls). */
  onOpenDemo: () => void;
  className?: string;
  imgClassName?: string;
}

/**
 * Project cover: a muted, looping demo preview when the project has a demo
 * video, otherwise the screenshot. The preview only plays while on screen,
 * never autoplays for visitors who prefer reduced motion, and falls back to
 * the screenshot if the video can't be loaded.
 */
export function ProjectMedia({
  name,
  image,
  placeholder,
  demoVideo,
  onOpenDemo,
  className,
  imgClassName,
}: ProjectMediaProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  // Set by the pause button; keeps the preview paused even when scrolled back into view.
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const showVideo = Boolean(demoVideo) && !failed;
  const autoplay = showVideo && !reduceMotion && !userPaused;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!autoplay) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if interrupted by a pause — harmless here.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

  if (!showVideo) {
    return (
      <ImagePlaceholder
        label={placeholder}
        src={image}
        alt={name}
        className={className}
        imgClassName={imgClassName}
      />
    );
  }

  return (
    <div
      className={cn(
        'group/media relative overflow-hidden rounded-2xl border border-border-subtle bg-surface-muted',
        className
      )}
    >
      <video
        ref={videoRef}
        src={demoVideo}
        poster={image}
        muted
        loop
        playsInline
        // Without a poster, load metadata so the first frame shows instead of a black box.
        preload={image ? 'none' : 'metadata'}
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        className={cn('h-full w-full object-cover object-top', imgClassName)}
      />

      {/* Whole cover opens the full demo. */}
      <button
        type="button"
        onClick={onOpenDemo}
        aria-label={`Watch the ${name} demo video`}
        className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/25 focus-visible:bg-black/25"
      >
        <span
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-all duration-300',
            playing
              ? 'scale-90 opacity-0 group-hover/media:scale-100 group-hover/media:opacity-100'
              : 'opacity-100'
          )}
        >
          <Play className="ml-0.5 h-6 w-6" fill="currentColor" aria-hidden="true" />
        </span>
      </button>

      <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
        <span
          aria-hidden="true"
          className={cn('h-1.5 w-1.5 rounded-full', playing ? 'animate-pulse bg-emerald-400' : 'bg-white/60')}
        />
        Demo preview
      </span>

      {!reduceMotion && (
        <button
          type="button"
          onClick={() => setUserPaused((paused) => !paused)}
          aria-label={userPaused ? `Play the ${name} preview` : `Pause the ${name} preview`}
          aria-pressed={userPaused}
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
        >
          {userPaused ? (
            <Play className="ml-px h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
          ) : (
            <Pause className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
