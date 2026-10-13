import { useEffect, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, personalInfo, socialLinks } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import type { Theme } from '../hooks/useTheme';
import { cn, externalLinkProps } from '../lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { CvDownload } from './ui/CvDownload';
import { SocialIcon } from './ui/SocialIcon';

// Module-level so the array identity is stable across renders.
const sectionIds = navLinks.map((link) => link.href.replace('#', ''));
const DESKTOP_QUERY = '(min-width: 1024px)';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useLockBodyScroll(menuOpen);

  // Close the mobile menu with Escape, or when the viewport grows to desktop size.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => desktop.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The page can't scroll while the menu holds the scroll lock, so close the menu
  // first and scroll once the lock is released (CSS decides smooth vs. instant).
  function handleMobileLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    setMenuOpen(false);
    window.requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView();
      window.history.pushState(null, '', href);
    });
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || menuOpen ? 'py-3' : 'py-5'
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-6',
          scrolled || menuOpen
            ? 'glass border border-border-subtle shadow-sm shadow-black/[0.03]'
            : 'border border-transparent'
        )}
      >
        <a
          href="#home"
          aria-label={`${personalInfo.name} — home`}
          className="py-2 font-mono text-lg font-semibold tracking-tight text-text-primary"
        >
          {personalInfo.initials}
          <span className="text-accent-500">.</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-3 py-2 text-sm font-medium transition-colors xl:px-3.5',
                  isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-accent-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="hidden items-center gap-1 border-r border-border-subtle pr-3 xl:flex">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                {...externalLinkProps(social.href)}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-accent-500"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <CvDownload variant="nav" align="right" />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-primary"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mx-4 mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-border-subtle bg-surface-elevated/95 shadow-xl shadow-black/10 backdrop-blur-xl sm:mx-6 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleMobileLinkClick(event, link.href)}
                  aria-current={activeId === link.href.replace('#', '') ? 'true' : undefined}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className={cn(
                    'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    activeId === link.href.replace('#', '')
                      ? 'bg-accent-500/10 text-accent-600 dark:text-accent-300'
                      : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle px-4 pt-4">
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      {...externalLinkProps(social.href)}
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-accent-500"
                    >
                      <SocialIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                    CV
                  </span>
                  <CvDownload variant="inline" />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
