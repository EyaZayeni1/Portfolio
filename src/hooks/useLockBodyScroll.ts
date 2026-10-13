import { useLayoutEffect } from 'react';

/**
 * Locks body scroll while `locked` is true — used for the mobile menu and modals.
 * A layout effect so the lock is released synchronously when `locked` turns false;
 * otherwise a scroll requested right after closing (e.g. an in-page link) is swallowed.
 */
export function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}
