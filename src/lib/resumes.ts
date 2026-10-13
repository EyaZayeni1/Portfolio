import { resumes } from '../data/portfolio';
import type { ResumeOption } from '../types/portfolio';

// Every PDF in `src/assets/cv/` is emitted by Vite with a hashed, production-safe
// URL. Dropping a new file there (e.g. CV_French.pdf) enables its option automatically.
const cvUrls = import.meta.glob<string>('../assets/cv/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
});

export interface ResolvedResume extends ResumeOption {
  /** Undefined when the PDF referenced by `file` doesn't exist. */
  href?: string;
}

export const resumeOptions: ResolvedResume[] = resumes.map((resume) => {
  const href = cvUrls[`../assets/cv/${resume.file}`];
  if (!href && import.meta.env.DEV) {
    console.warn(
      `[CV] Missing src/assets/cv/${resume.file} — the "${resume.label}" option is shown as unavailable.`
    );
  }
  return { ...resume, href };
});
