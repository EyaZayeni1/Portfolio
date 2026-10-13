import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import type { SocialLink } from '../../types/portfolio';
import { cn } from '../../lib/utils';

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  email: Mail,
};

interface SocialIconProps {
  icon: SocialLink['icon'];
  className?: string;
}

export function SocialIcon({ icon, className }: SocialIconProps) {
  const Icon = iconMap[icon];
  return <Icon className={cn('h-[18px] w-[18px]', className)} aria-hidden="true" />;
}
