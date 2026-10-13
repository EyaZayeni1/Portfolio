import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '../../data/portfolio';
import { SectionHeading } from '../ui/SectionHeading';

export function Certifications() {
  // Nothing to show yet — render no empty section.
  if (certifications.length === 0) return null;

  return (
    <section className="section-padding relative bg-surface-muted/40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Certifications"
          title="Licenses & certifications"
          description="A few certifications that back up specific skills and areas of focus."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="group flex flex-col rounded-2xl border border-border-subtle bg-surface-elevated p-6 transition-colors hover:border-accent-500/30"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                <Award className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold text-text-primary">{cert.name}</h3>
              <p className="mt-1.5 text-sm text-text-secondary">{cert.organization}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono text-xs text-text-tertiary">{cert.year}</span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-500">
                  View Certificate
                  <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
