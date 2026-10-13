import type { IconType } from 'react-icons';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiFastapi,
  SiNodedotjs,
  SiDjango,
  SiGraphql,
  SiPytorch,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiGit,
  SiDocker,
  SiLinux,
  SiPhp,
  SiC,
  SiNestjs,
  SiSymfony,
  SiOdoo,
  SiScikitlearn,
  SiSupabase,
  SiQdrant,
  SiGithubactions,
} from 'react-icons/si';
import { FaJava, FaAws, FaHtml5, FaCss3Alt } from 'react-icons/fa6';
import {
  Activity,
  Bot,
  Cloud,
  Cpu,
  Globe,
  Layers,
  Lightbulb,
  Network,
  ScanEye,
  Search,
  TrendingUp,
  Trees,
  Workflow,
} from 'lucide-react';
import { cn } from '../../lib/utils';

/** Icons rendered from lucide-react instead of react-icons (no brand mark exists). */
const lucideIconMap: Record<string, typeof Cpu> = {
  ml: Cpu,
  deeplearning: Layers,
  llm: Bot,
  rag: Search,
  cv: ScanEye,
  cicd: Workflow,
  api: Globe,
  cloud: Cloud,
  embeddings: Network,
  xai: Lightbulb,
  'anomaly detection': Activity,
  prophet: TrendingUp,
  lightgbm: Trees,
};

const brandIconMap: Record<string, IconType> = {
  python: SiPython,
  java: FaJava,
  javascript: SiJavascript,
  typescript: SiTypescript,
  cpp: SiCplusplus,
  react: SiReact,
  tailwind: SiTailwindcss,
  nextjs: SiNextdotjs,
  html5: FaHtml5,
  css3: FaCss3Alt,
  fastapi: SiFastapi,
  nodejs: SiNodedotjs,
  django: SiDjango,
  graphql: SiGraphql,
  pytorch: SiPytorch,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  redis: SiRedis,
  git: SiGit,
  docker: SiDocker,
  linux: SiLinux,
  aws: FaAws,
  php: SiPhp,
  c: SiC,
  'nest.js': SiNestjs,
  nestjs: SiNestjs,
  symfony: SiSymfony,
  odoo: SiOdoo,
  owl: SiOdoo,
  'scikit-learn': SiScikitlearn,
  supabase: SiSupabase,
  'vector stores': SiQdrant,
  'github-actions': SiGithubactions,
};

interface TechIconProps {
  icon: string;
  className?: string;
}

export function TechIcon({ icon, className }: TechIconProps) {
  // Keys in the data file aren't consistently cased ('LightGBM', 'Owl', ...).
  const key = icon.toLowerCase();
  const LucideIcon = lucideIconMap[key];
  if (LucideIcon) {
    return <LucideIcon className={cn('h-5 w-5', className)} strokeWidth={1.75} aria-hidden="true" />;
  }

  const BrandIcon = brandIconMap[key];
  if (BrandIcon) {
    return <BrandIcon className={cn('h-5 w-5', className)} aria-hidden="true" />;
  }

  return <Cpu className={cn('h-5 w-5', className)} strokeWidth={1.75} aria-hidden="true" />;
}
