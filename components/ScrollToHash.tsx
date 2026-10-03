'use client';

import { useEffect } from 'react';

/** Scrolls the role named in the URL hash into view and briefly highlights it. */
export function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.animate(
        [{ backgroundColor: 'rgba(139,92,246,0.18)' }, { backgroundColor: 'rgba(139,92,246,0)' }],
        { duration: 1600, easing: 'ease-out' },
      );
    }, 250);
    return () => clearTimeout(t);
  }, []);
  return null;
}
