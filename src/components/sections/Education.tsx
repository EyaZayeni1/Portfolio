import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { education } from '../../data/portfolio';
import { SectionHeading } from '../ui/SectionHeading';

export function Education() {
  return (
    <section id="education" className="section-padding relative">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          description="The foundation behind the engineering — degrees, schools and what I focused on."
        />

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border-subtle sm:left-[23px]" />

          <div className="flex flex-col gap-10">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                className="relative flex gap-6 sm:gap-8"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated text-accent2-500 sm:h-12 sm:w-12">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>

                <div className="flex-1 rounded-2xl border border-border-subtle bg-surface-elevated p-6 transition-colors hover:border-accent-500/30">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-text-primary">{item.degree}</h3>
                    <span className="rounded-full bg-accent-500/10 px-3 py-1 font-mono text-xs font-medium text-accent-600 dark:text-accent-300">
                      {item.period}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">{item.school}</span>
                    <span className="flex items-center gap-1 text-text-tertiary">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                  </div>

                  {item.description && (
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
