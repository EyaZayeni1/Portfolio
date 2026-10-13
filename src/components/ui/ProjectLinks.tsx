import { ExternalLink, PlayCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { cn } from '../../lib/utils';

interface ProjectLinksProps {
  name: string;
  githubUrl: string;
  liveUrl: string;
  /** Shows a "Watch Demo" button when provided. */
  onWatchDemo?: () => void;
  className?: string;
}

const linkClasses =
  'inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-text-secondary transition-colors hover:text-accent-500';

/** Code / Live / Demo links for a project — only the ones that actually exist are rendered. */
export function ProjectLinks({ name, githubUrl, liveUrl, onWatchDemo, className }: ProjectLinksProps) {
  if (!githubUrl && !liveUrl && !onWatchDemo) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-3', className)}>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} source code on GitHub`}
          className={linkClasses}
        >
          <FaGithub className="h-4 w-4" aria-hidden="true" />
          Code
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} live site`}
          className={linkClasses}
        >
          <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          Live Site
        </a>
      )}
      {onWatchDemo && (
        <button type="button" onClick={onWatchDemo} className={linkClasses}>
          <PlayCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          Watch Demo
        </button>
      )}
    </div>
  );
}
