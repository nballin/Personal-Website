'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { X } from './icons';

/** Overlay used by intercepted routes. Closing = router.back(), so the URL stays honest. */
export function Modal({ children, label }: { children: ReactNode; label: string }) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={label}>
      <motion.button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="tile scroll-thin relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-b-none bg-[#0c0c14]/95 outline-none sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="sticky top-3 z-10 float-right mr-3 mt-3 grid size-9 place-items-center rounded-full border border-line bg-black/50 text-muted backdrop-blur transition hover:text-ink"
        >
          <X size={16} />
        </button>
        <div className="p-6 pt-5 sm:p-10 sm:pt-8">{children}</div>
      </motion.div>
    </div>
  );
}
