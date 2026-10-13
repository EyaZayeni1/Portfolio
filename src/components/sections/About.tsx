import { motion } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';
import { aboutText, personalInfo, stats } from '../../data/portfolio';
import { SectionHeading } from '../ui/SectionHeading';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="About" title={aboutText.title} />

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] border border-border-subtle" />
            <ImagePlaceholder
              label={personalInfo.avatarPlaceholder}
              src={personalInfo.avatarImage}
              alt={personalInfo.name}
              variant="avatar"
              className="aspect-square w-full"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="glass absolute -right-4 -top-4 flex items-center gap-2 rounded-xl border border-border-subtle px-3 py-2 shadow-lg shadow-black/5"
            >
              <Code2 className="h-4 w-4 text-accent-500" />
              <span className="font-mono text-xs font-medium text-text-primary">
                Clean Code
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="glass absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border border-border-subtle px-3 py-2 shadow-lg shadow-black/5"
            >
              <Sparkles className="h-4 w-4 text-accent2-500" />
              <span className="font-mono text-xs font-medium text-text-primary">
                AI Enthusiast
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="space-y-4">
              {aboutText.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-balance text-base leading-relaxed text-text-secondary sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-border-subtle bg-surface-elevated p-4 text-center transition-colors hover:border-accent-500/30"
                >
                  <p className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
