import { personalInfo, socialLinks } from '../data/portfolio';
import { externalLinkProps } from '../lib/utils';
import { SocialIcon } from './ui/SocialIcon';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <a href="#home" className="font-mono text-base font-semibold text-text-primary">
            {personalInfo.name}
          </a>
          <p className="mt-0.5 text-sm text-text-secondary">{personalInfo.role}</p>
        </div>

        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              {...externalLinkProps(social.href)}
              aria-label={social.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-accent-500/40 hover:text-accent-500"
            >
              <SocialIcon icon={social.icon} />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border-subtle py-5 text-center">
        <p className="font-mono text-xs text-text-tertiary">
          © {year} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
