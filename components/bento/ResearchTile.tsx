'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { paper } from '@/content/research';
import { ArrowUpRight, Flask, Play } from '../icons';
import { Tile } from './Tile';

export function ResearchTile({ index }: { index: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % paper.stats.length), 3200);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const stat = paper.stats[i];

  return (
    <Tile index={index} label="Research" className="md:col-span-2 lg:col-start-3 lg:row-start-2">
      <div className="grid h-full gap-4 p-5 sm:grid-cols-[1.25fr_1fr]">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <Flask size={20} className="text-accent" />
              Research
            </h2>
            <span className="eyebrow">{paper.venue}</span>
          </div>
          <h3 className="mt-2 text-base font-semibold leading-snug">{paper.title}</h3>
          <p className="text-sm text-muted">{paper.subtitle}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            <Link href="/projects/tiny-recursive-models" scroll={false} className="btn btn-ghost py-1.5 text-xs">
              Summary
            </Link>
            <a href={paper.arxiv} target="_blank" rel="noopener noreferrer" className="btn btn-ghost py-1.5 text-xs">
              arXiv <ArrowUpRight size={13} />
            </a>
            <Link href="/research" className="btn btn-blog py-1.5 text-xs font-semibold">
              <Play size={11} /> Tech blog
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setI((n) => (n + 1) % paper.stats.length)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          title="Next result"
          className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-accent-strong/15 via-transparent to-accent-2/10 p-4 text-left"
        >
          <span className="flex items-center justify-between">
            <span className="eyebrow">Key result</span>
            <span className="chip py-0 text-[0.7rem]">{paper.citations} citations</span>
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.35 }}
              className="block"
            >
              <span className="text-gradient block text-3xl font-semibold tracking-tight">{stat.value}</span>
              <span className="mt-1 block text-xs leading-snug text-muted">{stat.label}</span>
            </motion.span>
          </AnimatePresence>
          <span className="flex gap-1" aria-hidden="true">
            {paper.stats.map((_, n) => (
              <span key={n} className={`h-0.5 flex-1 rounded-full transition-colors ${n === i ? 'bg-accent' : 'bg-white/10'}`} />
            ))}
          </span>
        </button>
      </div>
    </Tile>
  );
}
