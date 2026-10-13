import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/** Thin reading-progress bar at the top of the page + a "back to top" button. */
export function ScrollIndicators() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);

  // Only re-render when crossing the threshold, not on every scroll frame.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const shouldShow = y > window.innerHeight * 0.8;
    setShowTop((prev) => (prev === shouldShow ? prev : shouldShow));
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent-500 to-accent2-500"
      />
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#home"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="glass fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-text-secondary shadow-lg shadow-black/10 transition-colors hover:border-accent-500/40 hover:text-accent-500 sm:bottom-8 sm:right-8"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2} />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
