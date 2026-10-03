'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { categoryLabels, projects } from '@/content/projects';
import type { Project, ProjectCategory } from '@/content/types';
import { ChevronLeft, ChevronRight, Layers } from '../icons';
import { Tile, TileHeader } from './Tile';

const filters: (ProjectCategory | 'all')[] = ['all', 'data', 'ai', 'fullstack', 'mobile', 'hardware'];

export function ProjectsTile({ index }: { index: number }) {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const railRef = useRef<HTMLDivElement>(null);
  const visible = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));

  const scroll = (dir: 1 | -1) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Tile index={index} label="Projects" id="projects" className="md:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-3">
      <div className="flex h-full min-h-[400px] flex-col p-5 fit:min-h-0">
        <TileHeader
          title={`Projects · ${projects.length}`}
          icon={<Layers size={14} />}
          action={
            <div className="hidden gap-1 sm:flex">
              <RailButton label="Scroll projects left" onClick={() => scroll(-1)}>
                <ChevronLeft size={15} />
              </RailButton>
              <RailButton label="Scroll projects right" onClick={() => scroll(1)}>
                <ChevronRight size={15} />
              </RailButton>
            </div>
          }
        />

        <div className="scroll-thin -mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                railRef.current?.scrollTo({ left: 0 });
              }}
              className={clsx(
                'relative shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs transition pointer-coarse:px-4 pointer-coarse:py-2.5 pointer-coarse:text-sm',
                filter === f ? 'text-[#0b0b12]' : 'text-muted hover:text-ink',
              )}
            >
              {filter === f && (
                <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c4b5fd] to-[#67e8f9]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{f === 'all' ? 'All' : categoryLabels[f]}</span>
            </button>
          ))}
        </div>

        <div
          ref={railRef}
          className="scroll-thin -mx-5 mt-3 grid flex-1 snap-x snap-mandatory auto-cols-[78%] grid-flow-col grid-rows-1 gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 sm:auto-cols-[minmax(200px,1fr)] sm:grid-rows-2 lg:auto-cols-[calc((100%-1.5rem)/3)]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="snap-start"
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Tile>
  );
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="corner-pill corner-pill-icon">
      {children}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [from, to] = project.accent;
  return (
    <Link
      href={`/projects/${project.slug}`}
      scroll={false}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/[0.03] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="relative min-h-24 flex-1 overflow-hidden sm:min-h-12" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
        {project.cover ? (
          <Image src={project.cover.src} alt="" fill sizes="240px" className="object-cover opacity-90" />
        ) : (
          <span aria-hidden="true" className="absolute bottom-1 left-3 select-none text-3xl font-bold tracking-tighter text-white/25 transition-colors duration-500 group-hover:text-white/40">
            {project.title.split(/[\s—-]/)[0]}
          </span>
        )}
        {project.status && <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[0.7rem] text-amber-200 backdrop-blur">{project.status}</span>}
      </div>
      <div className="flex shrink-0 flex-col px-3 py-2.5">
        <p className="text-sm font-semibold leading-tight text-ink">{project.title}</p>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted lg:line-clamp-1">{project.tagline}</p>
        <p className="truncate pt-1.5 font-mono text-[0.7rem] text-faint lg:hidden">{project.tags.slice(0, 3).join(' · ')}</p>
      </div>
    </Link>
  );
}
