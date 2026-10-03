'use client';

import clsx from 'clsx';
import { motion, useReducedMotion } from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';

type TileProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index for the entrance animation. */
  index?: number;
  id?: string;
  label?: string;
};

// Tracks the cursor only to position the CSS glow (.tile::before/::after); the tile itself never moves.
const trackGlow = (e: PointerEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

export function Tile({ children, className, index = 0, id, label }: TileProps) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      aria-label={label}
      // The hero is the LCP element: don't hide it behind hydration.
      initial={reduce || index === 0 ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={trackGlow}
      className={clsx('tile overflow-hidden', className)}
    >
      {children}
    </motion.section>
  );
}

export function TileHeader({ icon, title, action }: { icon?: ReactNode; title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="eyebrow flex items-center gap-2">
        {icon && <span className="text-accent">{icon}</span>}
        {title}
      </h2>
      {action}
    </div>
  );
}
