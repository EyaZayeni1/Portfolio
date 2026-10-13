import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollIndicators } from '../components/ScrollIndicators';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { Projects } from '../components/sections/Projects';
import { Experience } from '../components/sections/Experience';
import { Education } from '../components/sections/Education';
import { Certifications } from '../components/sections/Certifications';
import { Contact } from '../components/sections/Contact';
import type { Theme } from '../hooks/useTheme';

interface HomeProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Home({ theme, onToggleTheme }: HomeProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-surface">
      <a
        href="#about"
        className="sr-only z-[70] rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollIndicators />
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
