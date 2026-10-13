import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/portfolio';
import { externalLinkProps } from '../../lib/utils';
import { CvDownload } from '../ui/CvDownload';
import { SocialIcon } from '../ui/SocialIcon';
import { TerminalCard } from './TerminalCard';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_55%_at_50%_20%,black,transparent)]" />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-30 blur-[110px] dark:opacity-40"
        style={{
          background:
            'radial-gradient(circle, var(--color-accent-500), var(--color-accent2-500) 70%, transparent 100%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-muted px-3.5 py-1.5 font-mono text-xs font-medium text-text-secondary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {personalInfo.availability}
          </motion.div>

          <motion.p variants={item} className="mb-3 text-lg text-text-secondary">
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-[3.5rem] xl:text-7xl"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-xl font-semibold text-gradient sm:text-2xl">
              {personalInfo.roles[0]}
            </p>
            <span aria-hidden="true" className="hidden h-1.5 w-1.5 rounded-full bg-border-strong sm:inline-block" />
            <p className="text-xl font-semibold text-text-secondary sm:text-2xl">
              {personalInfo.roles[1]}
            </p>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={item} className="relative z-30 mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3.5 text-sm font-semibold text-surface transition-colors hover:bg-accent-600 hover:text-white dark:bg-white dark:text-black dark:hover:bg-accent-500 dark:hover:text-white"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:border-accent-500 hover:text-accent-500"
            >
              Contact Me
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
            <CvDownload variant="hero" />
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
              Find me on
            </span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...externalLinkProps(social.href)}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-all hover:-translate-y-0.5 hover:border-accent-500/40 hover:text-accent-500"
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="relative hidden lg:block"
        >
          <TerminalCard />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-tertiary">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-border-strong p-1"
        >
          <span className="h-1.5 w-1 rounded-full bg-text-tertiary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
