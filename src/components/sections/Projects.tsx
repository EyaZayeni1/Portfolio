import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../../data/portfolio';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { Badge } from '../ui/Badge';
import { ProjectLinks } from '../ui/ProjectLinks';
import { ProjectMedia } from '../ui/ProjectMedia';
import { VideoModal } from '../ui/VideoModal';
import { cn } from '../../lib/utils';

type Filter = ProjectCategory | 'All';

// Derived from the data so every filter always matches at least one project.
const filters: Array<{ id: Filter; count: number }> = [
  { id: 'All', count: projects.length },
  ...Array.from(new Set(projects.map((project) => project.category))).map((category) => ({
    id: category,
    count: projects.filter((project) => project.category === category).length,
  })),
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section aria-labelledby="other-projects-title" className="relative pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-500">
              <span className="h-px w-6 bg-accent-500" />
              More Work
            </span>
            <h3 id="other-projects-title" className="mt-3 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
              Other Projects
            </h3>
          </div>

          {filters.length > 2 && (
            <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const active = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors',
                      active
                        ? 'border-accent-600 bg-accent-600 text-white'
                        : 'border-border-subtle text-text-secondary hover:border-accent-500/40 hover:text-text-primary'
                    )}
                  >
                    {filter.id}
                    <span
                      className={cn(
                        'font-mono text-[10px]',
                        active ? 'text-white/75' : 'text-text-tertiary'
                      )}
                    >
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated transition-[border-color,box-shadow] hover:border-accent-500/30 hover:shadow-xl hover:shadow-accent-500/5"
              >
                <ProjectCardContent project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/** Card body — its own component so each card can hold its demo-video state. */
function ProjectCardContent({ project }: { project: Project }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = () => setDemoOpen(true);

  return (
    <>
      <ProjectMedia
        name={project.name}
        image={project.image}
        placeholder={project.imagePlaceholder ?? project.name}
        demoVideo={project.demoVideo}
        onOpenDemo={openDemo}
        className="aspect-video w-full rounded-none border-0"
        imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <Badge variant="outline">{project.category}</Badge>
        </div>

        <h4 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-accent-500">
          {project.name}
        </h4>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-surface-muted px-2 py-1 font-mono text-[11px] text-text-tertiary"
            >
              {tech}
            </span>
          ))}
        </div>

        <ProjectLinks
          name={project.name}
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
          onWatchDemo={project.demoVideo ? openDemo : undefined}
          className="mt-6 border-t border-border-subtle pt-5"
        />
      </div>

      {project.demoVideo && (
        <VideoModal
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          src={project.demoVideo}
          title={project.name}
        />
      )}
    </>
  );
}
