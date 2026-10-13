import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import { experience } from '../../data/portfolio';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';

export function Experience() {
  return (
    <section id="experience" className="section-padding relative bg-surface-muted/40">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="Internships and hands-on roles that shaped how I build software."
        />

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border-subtle sm:left-[23px]" />

          <div className="flex flex-col gap-10">
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                className="relative flex gap-6 pl-0 sm:gap-8"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated text-accent-500 sm:h-12 sm:w-12">
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>

                <div className="flex-1 rounded-2xl border border-border-subtle bg-surface-elevated p-6 transition-colors hover:border-accent-500/30">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-text-primary">{item.role}</h3>
                    <span className="rounded-full bg-accent-500/10 px-3 py-1 font-mono text-xs font-medium text-accent-600 dark:text-accent-300">
                      {item.period}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary">
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-text-primary underline-offset-4 transition-colors hover:text-accent-500 hover:underline"
                      >
                        {item.company}
                      </a>
                    ) : (
                      <span className="font-medium text-text-primary">{item.company}</span>
                    )}
                    <span className="flex items-center gap-1 text-text-tertiary">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {item.missions.map((mission) => (
                      <li
                        key={mission}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                        {mission}
                      </li>
                    ))}
                  </ul>

                  {item.technologies.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
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
