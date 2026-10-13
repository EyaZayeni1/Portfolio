import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the navbar can highlight the
 * active link. The active section is the last one whose top has scrolled past
 * a "reading line" at `offsetRatio` of the viewport height. Once the page is
 * scrolled to the bottom, the last section wins (it may be too short to ever
 * reach the line). Pass a stable array (e.g. defined at module level).
 */
export function useActiveSection(sectionIds: readonly string[], offsetRatio = 0.35) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * offsetRatio;
      const present = sectionIds.filter((id) => document.getElementById(id));
      let current = present[0] ?? '';

      for (const id of present) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && present.length > 0) current = present[present.length - 1];

      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [sectionIds, offsetRatio]);

  return activeId;
}
