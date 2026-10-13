import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Code2,
  Database,
  LayoutTemplate,
  Server,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { skillCategories } from '../../data/portfolio';
import { SectionHeading } from '../ui/SectionHeading';
import { TechIcon } from '../ui/TechIcon';

const categoryIconMap: Record<string, LucideIcon> = {
  Code2,
  LayoutTemplate,
  Server,
  BrainCircuit,
  Database,
  Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="section-padding relative bg-surface-muted/40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with"
          description="A snapshot of the languages, frameworks and tools I use to design, build and ship software."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, catIndex) => {
            const CategoryIcon = categoryIconMap[category.icon] ?? Code2;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: catIndex * 0.06, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border-subtle bg-surface-elevated p-6 transition-colors hover:border-accent-500/30"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                    <CategoryIcon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-muted px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent-500/30 hover:text-text-primary"
                    >
                      <TechIcon icon={skill.icon} className="h-3.5 w-3.5" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
