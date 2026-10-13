// ============================================================================
// Central type definitions for all portfolio content.
// Every shape here is mirrored by the data in `src/data/portfolio.ts`.
// ============================================================================

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'email' | 'twitter';
}

export interface PersonalInfo {
  name: string;
  initials: string;
  role: string;
  roles: string[];
  tagline: string;
  location: string;
  email: string;
  availability: string;
  avatarPlaceholder: string;
  /** Optional real photo — import it from `src/assets/` and assign it here. Leave undefined to keep the placeholder. */
  avatarImage?: string;
  /** Short tech list shown in the Hero's animated code card (keep it to ~4 short entries). */
  heroStack: string[];
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export type SkillCategoryId =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'ai-ml'
  | 'databases'
  | 'tools';

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  icon: string;
  skills: Skill[];
}

export type ProjectCategory =
  | 'AI'
  | 'AI & DevOps'
  | 'ML'
  | 'Full-Stack'
  | 'Web'
  | 'Backend'
  | 'Mobile'
  | 'Other';

export interface FeaturedProject {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  technologies: string[];
  /** Repository URL — leave empty ('') to hide the "Code" link. */
  githubUrl: string;
  /** Deployed app URL — leave empty ('') when the project isn't deployed. */
  liveUrl: string;
  /** Optional demo recording — import it from `src/assets/` (opens in a video modal). */
  demoVideo?: string;
  imagePlaceholder: string;
  /** Optional real screenshot — import it from `src/assets/` and assign it here. Leave undefined to keep the placeholder. */
  image?: string;
  category: ProjectCategory;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  /** Repository URL — leave empty ('') to hide the "Code" link. */
  githubUrl: string;
  /** Deployed app URL — leave empty ('') when the project isn't deployed. */
  liveUrl: string;
  /** Optional demo recording — import it from `src/assets/` (opens in a video modal). */
  demoVideo?: string;
  category: ProjectCategory;
  /** Optional thumbnail label shown while no real image is set. Defaults to the project name if omitted. */
  imagePlaceholder?: string;
  /** Optional real screenshot — import it from `src/assets/` and assign it here. Leave undefined to keep the placeholder. */
  image?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  description: string;
  missions: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  location: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  year: string;
  credentialUrl: string;
}

export interface ResumeOption {
  id: string;
  /** BCP 47 language of the CV, e.g. 'fr' or 'en'. */
  lang: 'fr' | 'en';
  label: string;
  /** File name inside `src/assets/cv/`. If the file is missing the option is shown as unavailable. */
  file: string;
  /** File name the visitor's browser saves the download as. */
  downloadName: string;
}

export interface NavLink {
  label: string;
  href: string;
}
