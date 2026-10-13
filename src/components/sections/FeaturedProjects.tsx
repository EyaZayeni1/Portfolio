import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { featuredProjects } from '../../data/portfolio';
import type { FeaturedProject } from '../../types/portfolio';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { ProjectLinks } from '../ui/ProjectLinks';
import { ProjectMedia } from '../ui/ProjectMedia';
import { VideoModal } from '../ui/VideoModal';

export function FeaturedProjects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Featured Work"
          title="Selected Projects"
          description="A closer look at a few projects I'm proud of — from idea, to architecture, to a shipped product."
        />

        <div className="flex flex-col gap-24 sm:gap-28">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const reversed = index % 2 === 1;
  const openDemo = () => setDemoOpen(true);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14"
    >
      <div className={reversed ? 'lg:order-2' : ''}>
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="group relative"
        >
          <div
            className="absolute -inset-3 -z-10 rounded-[1.75rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
            style={{
              background:
                'linear-gradient(135deg, var(--color-accent-500), var(--color-accent2-500))',
            }}
          />
          <ProjectMedia
            name={project.name}
            image={project.image}
            placeholder={project.imagePlaceholder}
            demoVideo={project.demoVideo}
            onOpenDemo={openDemo}
            className="aspect-[16/10] w-full shadow-lg shadow-black/5"
          />
        </motion.div>
      </div>

      <div className={reversed ? 'lg:order-1' : ''}>
        <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-accent-500">
          Featured Project {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-4 text-balance leading-relaxed text-text-secondary">
          {project.longDescription}
        </p>

        <ul className="mt-5 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2.5 text-sm text-text-secondary">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2} />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="accent">
              {tech}
            </Badge>
          ))}
        </div>

        <ProjectLinks
          name={project.name}
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
          onWatchDemo={project.demoVideo ? openDemo : undefined}
          className="mt-7 border-t border-border-subtle pt-6"
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
    </motion.article>
  );
}
